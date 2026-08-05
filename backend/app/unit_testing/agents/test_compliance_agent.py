import pytest
from unittest.mock import AsyncMock, MagicMock

from app.agents.compliance_agent import ComplianceAgent


@pytest.fixture
def agent(monkeypatch):
    class FakeResult:
        messages = [
            MagicMock(content="Compliance review completed successfully.")
        ]

    async def fake_run(task):
        return FakeResult()

    fake_assistant = MagicMock()
    fake_assistant.run = AsyncMock(side_effect=fake_run)

    fake_client = AsyncMock()

    monkeypatch.setattr(
        "app.agents.compliance_agent.get_model_client",
        lambda: fake_client,
    )

    monkeypatch.setattr(
        "app.agents.compliance_agent.AssistantAgent",
        lambda **kwargs: fake_assistant,
    )

    return ComplianceAgent()


@pytest.mark.asyncio
async def test_initialization(agent):
    assert agent.agent is not None
    assert agent.model_client is not None


@pytest.mark.asyncio
async def test_analyze(agent):

    result = await agent.analyze(
        patient_case="65-year-old diabetic patient admitted with chest pain.",
        objective="Perform compliance review.",
        additional_context="Check HIPAA compliance.",
    )

    assert result["agent_name"] == "Compliance Agent"
    assert result["summary"] == "Compliance review completed successfully."
    assert isinstance(result["execution_time_seconds"], float)
    assert result["execution_time_seconds"] >= 0


@pytest.mark.asyncio
async def test_close(agent):

    await agent.close()

    agent.model_client.close.assert_awaited_once()


@pytest.mark.asyncio
async def test_prompt_called(monkeypatch, agent):

    called = False

    def fake_prompt(**kwargs):
        nonlocal called
        called = True
        return "PROMPT"

    monkeypatch.setattr(
        "app.prompts.compliance_prompt.CompliancePrompt.build_prompt",
        fake_prompt,
    )

    class Result:
        messages = [
            MagicMock(content="ok")
        ]

    agent.agent.run = AsyncMock(return_value=Result())

    await agent.analyze(
        patient_case="Chest pain",
        objective="Compliance review",
    )

    assert called
    agent.agent.run.assert_awaited_once_with(task="PROMPT")


@pytest.mark.asyncio
async def test_empty_messages(agent):

    class Result:
        messages = []

    agent.agent.run = AsyncMock(return_value=Result())

    result = await agent.analyze(
        "Chest pain",
        "Compliance review",
    )

    assert result["summary"] == ""


@pytest.mark.asyncio
async def test_empty_message_content(agent):

    class Result:
        messages = [
            MagicMock(content="")
        ]

    agent.agent.run = AsyncMock(return_value=Result())

    result = await agent.analyze(
        "Chest pain",
        "Compliance review",
    )

    assert result["summary"] == ""


@pytest.mark.asyncio
async def test_runtime_error(agent):

    agent.agent.run = AsyncMock(
        side_effect=RuntimeError("LLM failure")
    )

    with pytest.raises(RuntimeError):
        await agent.analyze(
            "Chest pain",
            "Compliance review",
        )




@pytest.mark.asyncio
async def test_large_patient_case(agent):

    class Result:
        messages = [
            MagicMock(content="Large note processed")
        ]

    agent.agent.run = AsyncMock(return_value=Result())

    result = await agent.analyze(
        "Medical History " * 3000,
        "Compliance review",
    )

    assert result["summary"] == "Large note processed"


@pytest.mark.asyncio
async def test_response_keys(agent):

    class Result:
        messages = [
            MagicMock(content="Complete")
        ]

    agent.agent.run = AsyncMock(return_value=Result())

    result = await agent.analyze(
        "Chest pain",
        "Compliance review",
    )

    assert set(result.keys()) == {
        "agent_name",
        "summary",
        "execution_time_seconds",
    }


@pytest.mark.asyncio
async def test_run_called_once(agent):

    class Result:
        messages = [
            MagicMock(content="Done")
        ]

    agent.agent.run = AsyncMock(return_value=Result())

    await agent.analyze(
        "Chest pain",
        "Compliance review",
    )

    agent.agent.run.assert_awaited_once()


@pytest.mark.asyncio
async def test_execution_time_type(agent):

    class Result:
        messages = [
            MagicMock(content="Done")
        ]

    agent.agent.run = AsyncMock(return_value=Result())

    result = await agent.analyze(
        "Chest pain",
        "Compliance review",
    )

    assert isinstance(result["execution_time_seconds"], float)