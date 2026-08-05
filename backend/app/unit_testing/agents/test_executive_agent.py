import pytest
from unittest.mock import AsyncMock, MagicMock

from app.agents.executive_agent import ExecutiveAgent


@pytest.fixture
def agent(monkeypatch):
    class FakeResult:
        messages = [
            MagicMock(content="Executive summary generated successfully.")
        ]

    async def fake_run(task):
        return FakeResult()

    fake_assistant = MagicMock()
    fake_assistant.run = AsyncMock(side_effect=fake_run)

    fake_client = AsyncMock()

    monkeypatch.setattr(
        "app.agents.executive_agent.get_model_client",
        lambda: fake_client,
    )

    monkeypatch.setattr(
        "app.agents.executive_agent.AssistantAgent",
        lambda **kwargs: fake_assistant,
    )

    return ExecutiveAgent()


@pytest.mark.asyncio
async def test_initialization(agent):

    assert agent.agent is not None
    assert agent.model_client is not None


@pytest.mark.asyncio
async def test_analyze(agent):

    result = await agent.analyze(
        clinical_analysis="AMI diagnosed.",
        financial_analysis="Estimated treatment cost: $25,000.",
        research_summary="Recent evidence recommends PCI.",
        compliance_review="HIPAA compliant.",
        objective="Generate executive summary.",
        additional_context="CEO dashboard",
    )

    assert result["agent_name"] == "Executive Agent"
    assert result["summary"] == "Executive summary generated successfully."
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

        assert kwargs["clinical_analysis"] == "Chest pain"
        assert kwargs["financial_analysis"] == "Financial analysis"
        assert kwargs["research_summary"] == "Research summary"
        assert kwargs["compliance_review"] == "Compliance review"
        assert kwargs["objective"] == "Executive summary"
        return "PROMPT"

    monkeypatch.setattr(
        "app.prompts.executive_prompt.ExecutivePrompt.build_prompt",
        fake_prompt,
    )

    class Result:
        messages = [
            MagicMock(content="ok")
        ]

    agent.agent.run = AsyncMock(return_value=Result())

    await agent.analyze(
        clinical_analysis="Chest pain",
        financial_analysis="Financial analysis",
        research_summary="Research summary",
        compliance_review="Compliance review",
        objective="Executive summary",
    )

    assert called
    agent.agent.run.assert_awaited_once_with(task="PROMPT")


@pytest.mark.asyncio
async def test_empty_messages(agent):

    class Result:
        messages = []

    agent.agent.run = AsyncMock(return_value=Result())

    result = await agent.analyze(
        clinical_analysis="Chest pain",
        financial_analysis="Financial",
        research_summary="Research",
        compliance_review="Compliance",
        objective="Executive summary",
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
        clinical_analysis="Chest pain",
        financial_analysis="Financial",
        research_summary="Research",
        compliance_review="Compliance",
        objective="Executive summary",
    )

    assert result["summary"] == ""


@pytest.mark.asyncio
async def test_runtime_error(agent):

    agent.agent.run = AsyncMock(
        side_effect=RuntimeError("LLM failure")
    )

    with pytest.raises(RuntimeError):
        await agent.analyze(
            clinical_analysis="Chest pain",
            financial_analysis="Financial",
            research_summary="Research",
            compliance_review="Compliance",
            objective="Executive summary",
        )




@pytest.mark.asyncio
async def test_large_patient_case(agent):

    class Result:
        messages = [
            MagicMock(content="Large note processed")
        ]

    agent.agent.run = AsyncMock(return_value=Result())

    result = await agent.analyze(
        clinical_analysis="Executive Summary " * 3000,
        financial_analysis="Financial",
        research_summary="Research",
        compliance_review="Compliance",
        objective="Executive summary",
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
        clinical_analysis="Chest pain",
        financial_analysis="Financial",
        research_summary="Research",
        compliance_review="Compliance",
        objective="Executive summary",
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
        clinical_analysis="Chest pain",
        financial_analysis="Financial",
        research_summary="Research",
        compliance_review="Compliance",
        objective="Executive summary",
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
        clinical_analysis="Chest pain",
        financial_analysis="Financial",
        research_summary="Research",
        compliance_review="Compliance",
        objective="Executive summary",
    )

    assert isinstance(result["execution_time_seconds"], float)