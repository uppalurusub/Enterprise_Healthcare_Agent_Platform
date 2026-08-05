import pytest
from unittest.mock import AsyncMock

from app.services.healthcare_service import HealthcareService
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
def service():

    service = HealthcareService()

    service.implementation = AsyncMock()

    service.implementation.execute.return_value = {
        "status": "success",
        "message": "Healthcare analysis completed successfully.",
    }

    return service


@pytest.mark.asyncio
async def test_execute_success(
    service,
    sample_request,
):

    result = await service.execute(sample_request)

    assert result["status"] == "success"


@pytest.mark.asyncio
async def test_calls_implementation(
    service,
    sample_request,
):

    await service.execute(sample_request)

    service.implementation.execute.assert_awaited_once_with(request=sample_request)


@pytest.mark.asyncio
async def test_runtime_error(
    service,
    sample_request,
):

    service.implementation.execute.side_effect = RuntimeError(
        "Implementation failure"
    )

    with pytest.raises(RuntimeError):
        await service.execute(sample_request)




@pytest.mark.asyncio
async def test_large_sample_request(
    service,
    sample_request,
):

    sample_request.patient_case = "Chest Pain " * 3000

    result = await service.execute(sample_request)

    assert result["status"] == "success"


@pytest.mark.asyncio
async def test_none_response(
    service,
    sample_request,
):

    service.implementation.execute.return_value = None

    result = await service.execute(sample_request)

    assert result is None


@pytest.mark.asyncio
async def test_empty_response(
    service,
    sample_request,
):

    service.implementation.execute.return_value = {}

    result = await service.execute(sample_request)

    assert result == {}


@pytest.mark.asyncio
async def test_response_type(
    service,
    sample_request,
):

    result = await service.execute(sample_request)

    assert isinstance(result, dict)


@pytest.mark.asyncio
async def test_execute_called_once(
    service,
    sample_request,
):

    await service.execute(sample_request)

    assert service.implementation.execute.await_count == 1


@pytest.mark.asyncio
async def test_multiple_sample_requests(
    service,
    sample_request,
):

    await service.execute(sample_request)
    await service.execute(sample_request)

    assert service.implementation.execute.await_count == 2