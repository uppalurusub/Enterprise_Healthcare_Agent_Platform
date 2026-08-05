import pytest
from unittest.mock import AsyncMock, MagicMock

from app.agents.financial_agent import FinancialAgent


@pytest.fixture
def agent(monkeypatch):
    class FakeResult:
        messages = [
            MagicMock(content="Financial analysis completed successfully.")
        ]

    async def fake_run(task):
        return FakeResult()

    fake_assistant = MagicMock()
    fake_assistant.run = AsyncMock(side_effect=fake_run)

    fake_client = AsyncMock()

    monkeypatch.setattr(
        "app.agents.financial_agent.get_model_client",
        lambda: fake_client,
    )

    monkeypatch.setattr(
        "app.agents.financial_agent.AssistantAgent",
        lambda **kwargs: fake_assistant,
    )

    return FinancialAgent()


@pytest.mark.asyncio
async def test_initialization(agent):

    assert agent.agent is not None
    assert agent.model_client is not None


@pytest.mark.asyncio
async def test_analyze(agent):

    result = await agent.analyze(
        patient_case="65-year-old diabetic patient admitted with chest pain.",
        objective="Generate financial analysis.",
        additional_context="Insurance: Medicare",
    )

    assert result["agent_name"] == "Financial Agent"
    assert result["summary"] == "Financial analysis completed successfully."
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
        "app.prompts.finance_prompt.FinancePrompt.build_prompt",
        fake_prompt,
    )

    class Result:
        messages = [
            MagicMock(content="ok")
        ]

    agent.agent.run = AsyncMock(return_value=Result())

    await agent.analyze(
        patient_case="Chest pain",
        objective="Financial analysis",
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
        "Financial analysis",
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
        "Financial analysis",
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
            "Financial analysis",
        )




@pytest.mark.asyncio
async def test_large_patient_case(agent):

    class Result:
        messages = [
            MagicMock(content="Large financial note processed")
        ]

    agent.agent.run = AsyncMock(return_value=Result())

    result = await agent.analyze(
        "Medical History " * 3000,
        "Financial analysis",
    )

    assert result["summary"] == "Large financial note processed"


@pytest.mark.asyncio
async def test_response_keys(agent):

    class Result:
        messages = [
            MagicMock(content="Complete")
        ]

    agent.agent.run = AsyncMock(return_value=Result())

    result = await agent.analyze(
        "Chest pain",
        "Financial analysis",
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
        "Financial analysis",
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
        "Financial analysis",
    )

    assert isinstance(result["execution_time_seconds"], float)