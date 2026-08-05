import pytest
from unittest.mock import AsyncMock, MagicMock

from app.agents.clinical_agent import ClinicalAgent


@pytest.fixture
def agent(monkeypatch):

    class FakeResult:
        messages = [
            MagicMock(content="Clinical summary")
        ]

    async def fake_run(task):
        return FakeResult()

    fake_assistant = MagicMock()
    fake_assistant.run = AsyncMock(side_effect=fake_run)

    fake_client = AsyncMock()

    monkeypatch.setattr(
        "app.agents.clinical_agent.get_model_client",
        lambda: fake_client,
    )

    monkeypatch.setattr(
        "app.agents.clinical_agent.AssistantAgent",
        lambda **kwargs: fake_assistant,
    )

    return ClinicalAgent()


@pytest.mark.asyncio
async def test_analyze(agent):

    result = await agent.analyze(
        patient_case="Chest pain",
        objective="Diagnosis",
    )

    assert result["agent_name"] == "Clinical Agent"

    assert result["summary"] == "Clinical summary"

    assert result["execution_time_seconds"] >= 0


@pytest.mark.asyncio
async def test_close(agent):

    await agent.close()

    agent.model_client.close.assert_awaited_once()
@pytest.mark.asyncio
async def test_initialization(agent):

    assert agent.agent is not None

    assert agent.model_client is not None

@pytest.mark.asyncio
async def test_prompt_called(monkeypatch, agent):

    called = False

    def fake_prompt(**kwargs):
        nonlocal called
        called = True
        return "PROMPT"

    monkeypatch.setattr(
        "app.prompts.clinical_prompt.ClinicalPrompt.build_prompt",
        fake_prompt,
    )

    class Result:
        messages = [MagicMock(content="ok")]

    agent.agent.run = AsyncMock(return_value=Result())

    await agent.analyze(
        patient_case="Chest pain",
        objective="Diagnosis",
    )

    assert called

@pytest.mark.asyncio
async def test_empty_messages(agent):

    class Result:
        messages = []

    agent.agent.run = AsyncMock(return_value=Result())

    result = await agent.analyze(
        "Chest pain",
        "Diagnosis",
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
            "Diagnosis",
        )

@pytest.mark.asyncio
async def test_large_case(agent):

    class Result:
        messages = [
            MagicMock(content="ok")
        ]

    agent.agent.run = AsyncMock(return_value=Result())

    result = await agent.analyze(
        "Chest pain " * 3000,
        "Diagnosis",
    )

    assert result["summary"] == "ok"