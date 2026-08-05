import pytest
from unittest.mock import AsyncMock, MagicMock

from app.implementation.healthcare_impl import HealthcareImplementation
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
def implementation():

    impl = HealthcareImplementation()

    impl.orchestrator = AsyncMock()

    impl.orchestrator.execute.return_value = {
        "clinical_analysis": {
            "agent_name": "Clinical Agent",
            "summary": "Clinical Summary",
            "execution_time_seconds": 0.1,
        },
        "financial_analysis": {
            "agent_name": "Financial Agent",
            "summary": "Financial Summary",
            "execution_time_seconds": 0.1,
        },
        "research_summary": {
            "agent_name": "Research Agent",
            "summary": "Research Summary",
            "execution_time_seconds": 0.1,
        },
        "compliance_review": {
            "agent_name": "Compliance Agent",
            "summary": "Compliance Summary",
            "execution_time_seconds": 0.1,
        },
        "executive_summary": {
            "agent_name": "Executive Agent",
            "summary": "Executive Summary",
            "execution_time_seconds": 0.1,
        },
    }

    impl.human_reviewer.review = AsyncMock(
        return_value={
            "required": False,
            "status": "Not Required",
            "comments": None,
        }
    )

    return impl


@pytest.mark.asyncio
async def test_execute_success(
    implementation,
    sample_request,
):

    result = await implementation.execute(
        sample_request
    )

    assert result.status == "success"


@pytest.mark.asyncio
async def test_all_agents_called(
    implementation,
    sample_request,
):

    await implementation.execute(
        sample_request
    )

    implementation.orchestrator.execute.assert_awaited_once()
    implementation.human_reviewer.review.assert_awaited_once()


@pytest.mark.asyncio
async def test_runtime_error(
    implementation,
    sample_request,
):
    implementation.orchestrator.execute.side_effect = RuntimeError("Failure")

    with pytest.raises(RuntimeError):
        await implementation.execute(sample_request)




@pytest.mark.asyncio
async def test_large_request(
    implementation,
    sample_request,
):

    sample_request.patient_case = "Chest Pain " * 3000

    result = await implementation.execute(
        sample_request
    )

    assert result.status == "success"


@pytest.mark.asyncio
async def test_human_review_enabled(
    implementation,
    sample_request,
):

    sample_request.require_human_review = True

    implementation.human_reviewer.review = AsyncMock(
        return_value={
            "required": False,
            "status": "Not Required",
            "reviewer_comments": None,
        }
    )

    result = await implementation.execute(
        sample_request
    )

    implementation.human_reviewer.review.assert_awaited_once()


@pytest.mark.asyncio
async def test_execution_metadata(
    implementation,
    sample_request,
):

    result = await implementation.execute(
        sample_request
    )

    assert result.metadata is not None


@pytest.mark.asyncio
async def test_execution_time_positive(
    implementation,
    sample_request,
):

    result = await implementation.execute(
        sample_request
    )

    assert result.metadata.total_execution_time_seconds >= 0