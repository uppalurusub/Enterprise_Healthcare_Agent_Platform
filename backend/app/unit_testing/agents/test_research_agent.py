import pytest
from unittest.mock import AsyncMock, MagicMock

from app.agents.research_agent import ResearchAgent


@pytest.fixture
def agent(monkeypatch):
    class FakeResult:
        messages = [
            MagicMock(
                content="Evidence-based recommendations generated successfully."
            )
        ]

    async def fake_run(task):
        return FakeResult()

    fake_assistant = MagicMock()
    fake_assistant.run = AsyncMock(side_effect=fake_run)

    fake_client = AsyncMock()

    monkeypatch.setattr(
        "app.agents.research_agent.get_model_client",
        lambda: fake_client,
    )

    monkeypatch.setattr(
        "app.agents.research_agent.AssistantAgent",
        lambda **kwargs: fake_assistant,
    )

    return ResearchAgent()


@pytest.mark.asyncio
async def test_initialization(agent):

    assert agent.agent is not None
    assert agent.model_client is not None


@pytest.mark.asyncio
async def test_analyze(agent):

    result = await agent.analyze(
        patient_case="65-year-old male with chest pain and elevated troponin.",
        objective="Provide evidence-based recommendations.",
        additional_context="Use ACC/AHA and ESC guidelines.",
    )

    assert result["agent_name"] == "Research Agent"
    assert result["summary"] == (
        "Evidence-based recommendations generated successfully."
    )
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
        "app.prompts.research_prompt.ResearchPrompt.build_prompt",
        fake_prompt,
    )

    class Result:
        messages = [MagicMock(content="ok")]

    agent.agent.run = AsyncMock(return_value=Result())

    await agent.analyze(
        patient_case="Chest pain",
        objective="Evidence review",
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
        "Evidence review",
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
        "Evidence review",
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
            "Evidence review",
        )




@pytest.mark.asyncio
async def test_large_patient_case(agent):

    class Result:
        messages = [
            MagicMock(content="Large research review completed")
        ]

    agent.agent.run = AsyncMock(return_value=Result())

    result = await agent.analyze(
        "Acute Chest Pain " * 3000,
        "Evidence review",
    )

    assert result["summary"] == "Large research review completed"


@pytest.mark.asyncio
async def test_response_keys(agent):

    class Result:
        messages = [
            MagicMock(content="Complete")
        ]

    agent.agent.run = AsyncMock(return_value=Result())

    result = await agent.analyze(
        "Chest pain",
        "Evidence review",
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
        "Evidence review",
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
        "Evidence review",
    )

    assert isinstance(result["execution_time_seconds"], float)