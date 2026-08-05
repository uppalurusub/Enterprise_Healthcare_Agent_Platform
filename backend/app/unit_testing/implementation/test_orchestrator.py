import pytest
from unittest.mock import AsyncMock

from app.implementation.orchestrator import HealthcareOrchestrator
from app.models.request_model import HealthcareRequest


@pytest.fixture
def sample_request():
    return HealthcareRequest(
        patient_case="65-year-old diabetic patient with chest pain.",
        objective="Generate multidisciplinary recommendations.",
        additional_context="History of hypertension.",
        require_human_review=False,
    )


@pytest.fixture
def orchestrator():

    orchestrator = HealthcareOrchestrator()

    orchestrator.clinical_agent = AsyncMock()
    orchestrator.financial_agent = AsyncMock()
    orchestrator.research_agent = AsyncMock()
    orchestrator.compliance_agent = AsyncMock()
    orchestrator.executive_agent = AsyncMock()

    orchestrator.clinical_agent.analyze.return_value = {
        "agent_name": "Clinical Agent",
        "summary": "Clinical Summary",
        "execution_time_seconds": 0.12,
    }

    orchestrator.financial_agent.analyze.return_value = {
        "agent_name": "Financial Agent",
        "summary": "Financial Summary",
        "execution_time_seconds": 0.15,
    }

    orchestrator.research_agent.analyze.return_value = {
        "agent_name": "Research Agent",
        "summary": "Research Summary",
        "execution_time_seconds": 0.11,
    }

    orchestrator.compliance_agent.analyze.return_value = {
        "agent_name": "Compliance Agent",
        "summary": "Compliance Summary",
        "execution_time_seconds": 0.08,
    }

    orchestrator.executive_agent.analyze.return_value = {
        "agent_name": "Executive Agent",
        "summary": "Executive Summary",
        "execution_time_seconds": 0.10,
    }

    return orchestrator


@pytest.mark.asyncio
async def test_orchestrate_success(
    orchestrator,
    sample_request,
):

    result = await orchestrator.execute(
        patient_case=sample_request.patient_case,
        objective=sample_request.objective,
        additional_context=sample_request.additional_context
    )

    assert result is not None


@pytest.mark.asyncio
async def test_all_agents_called(
    orchestrator,
    sample_request,
):

    await orchestrator.execute(
        patient_case=sample_request.patient_case,
        objective=sample_request.objective,
        additional_context=sample_request.additional_context
    )

    orchestrator.clinical_agent.analyze.assert_awaited_once()
    orchestrator.financial_agent.analyze.assert_awaited_once()
    orchestrator.research_agent.analyze.assert_awaited_once()
    orchestrator.compliance_agent.analyze.assert_awaited_once()
    orchestrator.executive_agent.analyze.assert_awaited_once()


@pytest.mark.asyncio
async def test_clinical_failure(
    orchestrator,
    sample_request,
):

    orchestrator.clinical_agent.analyze.side_effect = RuntimeError(
        "Clinical failure"
    )

    with pytest.raises(RuntimeError):
        await orchestrator.execute(
            patient_case=sample_request.patient_case,
            objective=sample_request.objective,
            additional_context=sample_request.additional_context
        )


@pytest.mark.asyncio
async def test_financial_failure(
    orchestrator,
    sample_request,
):

    orchestrator.financial_agent.analyze.side_effect = RuntimeError(
        "Financial failure"
    )

    with pytest.raises(RuntimeError):
        await orchestrator.execute(
            patient_case=sample_request.patient_case,
            objective=sample_request.objective,
            additional_context=sample_request.additional_context
        )


@pytest.mark.asyncio
async def test_research_failure(
    orchestrator,
    sample_request,
):

    orchestrator.research_agent.analyze.side_effect = RuntimeError(
        "Research failure"
    )

    with pytest.raises(RuntimeError):
        await orchestrator.execute(
            patient_case=sample_request.patient_case,
            objective=sample_request.objective,
            additional_context=sample_request.additional_context
        )


@pytest.mark.asyncio
async def test_compliance_failure(
    orchestrator,
    sample_request,
):

    orchestrator.compliance_agent.analyze.side_effect = RuntimeError(
        "Compliance failure"
    )

    with pytest.raises(RuntimeError):
        await orchestrator.execute(
            patient_case=sample_request.patient_case,
            objective=sample_request.objective,
            additional_context=sample_request.additional_context
        )


@pytest.mark.asyncio
async def test_executive_failure(
    orchestrator,
    sample_request,
):

    orchestrator.executive_agent.analyze.side_effect = RuntimeError(
        "Executive failure"
    )

    with pytest.raises(RuntimeError):
        await orchestrator.execute(
            patient_case=sample_request.patient_case,
            objective=sample_request.objective,
            additional_context=sample_request.additional_context
        )




@pytest.mark.asyncio
async def test_large_patient_case(
    orchestrator,
    sample_request,
):

    sample_request.patient_case = "Chest Pain " * 3000

    result = await orchestrator.execute(
        patient_case=sample_request.patient_case,
        objective=sample_request.objective,
        additional_context=sample_request.additional_context
    )

    assert result is not None


@pytest.mark.asyncio
async def test_agent_execution_count(
    orchestrator,
    sample_request,
):

    await orchestrator.execute(
        patient_case=sample_request.patient_case,
        objective=sample_request.objective,
        additional_context=sample_request.additional_context
    )

    assert orchestrator.clinical_agent.analyze.await_count == 1
    assert orchestrator.financial_agent.analyze.await_count == 1
    assert orchestrator.research_agent.analyze.await_count == 1
    assert orchestrator.compliance_agent.analyze.await_count == 1
    assert orchestrator.executive_agent.analyze.await_count == 1


@pytest.mark.asyncio
async def test_response_contains_all_sections(
    orchestrator,
    sample_request,
):

    result = await orchestrator.execute(
        patient_case=sample_request.patient_case,
        objective=sample_request.objective,
        additional_context=sample_request.additional_context
    )

    assert result is not None

    if isinstance(result, dict):
        assert "clinical_analysis" in result
        assert "financial_analysis" in result
        assert "research_summary" in result
        assert "compliance_review" in result
        assert "executive_summary" in result