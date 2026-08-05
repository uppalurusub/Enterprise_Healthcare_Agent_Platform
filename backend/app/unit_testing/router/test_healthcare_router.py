"""
tests/router/test_healthcare_router.py
"""

from unittest.mock import AsyncMock, patch

import pytest
from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)

#from app.services.healthcare_service import HealthcareService

#healthcare_service = HealthcareService()

# ---------------------------------------------------------
# Sample Request
# ---------------------------------------------------------

VALID_REQUEST = {
    "patient_case": """
    65-year-old male with diabetes and hypertension
    presenting with chest pain.
    """,
    "objective": "Clinical decision support",
    "additional_context": "No known allergies"
}


# ---------------------------------------------------------
# Success
# ---------------------------------------------------------

@patch(
    "app.router.healthcare_router.service.execute",
    new_callable=AsyncMock,
)
def test_analyze_success(mock_process):

    mock_process.return_value = {
        "status": "SUCCESS",
        "message": "Analysis completed",
        "request_id": "REQ-001",
        "data": {
            "clinical_summary": "Possible ACS"
        }
    }

    response = client.post(
        "/api/v1/agents/enterprise-healthcare-platform",
        json=VALID_REQUEST,
    )

    assert response.status_code == 200

    body = response.json()

    assert body["status"] == "SUCCESS"

    assert body["message"] == "Analysis completed"

    assert body["request_id"] == "REQ-001"

    mock_process.assert_awaited_once()


# ---------------------------------------------------------
# Empty Patient Case
# ---------------------------------------------------------

def test_empty_patient_case():

    payload = VALID_REQUEST.copy()

    payload["patient_case"] = ""

    response = client.post(
        "/api/v1/agents/enterprise-healthcare-platform",
        json=payload,
    )

    assert response.status_code in [400, 422]


# ---------------------------------------------------------
# Missing Patient Case
# ---------------------------------------------------------

def test_missing_patient_case():

    payload = VALID_REQUEST.copy()

    del payload["patient_case"]

    response = client.post(
        "/api/v1/agents/enterprise-healthcare-platform",
        json=payload,
    )

    assert response.status_code == 422


# ---------------------------------------------------------
# Missing Objective
# ---------------------------------------------------------

def test_missing_objective():

    payload = VALID_REQUEST.copy()

    del payload["objective"]

    response = client.post(
        "/api/v1/agents/enterprise-healthcare-platform",
        json=payload,
    )

    assert response.status_code == 422


# ---------------------------------------------------------
# Invalid Payload
# ---------------------------------------------------------

def test_invalid_payload():

    response = client.post(

        "/api/v1/agents/enterprise-healthcare-platform",

        json={}

    )

    assert response.status_code == 422


# ---------------------------------------------------------
# Service Raises Exception
# ---------------------------------------------------------

@patch(
    "app.router.healthcare_router.service.execute",
    new_callable=AsyncMock,
)
def test_service_exception(mock_process):

    mock_process.side_effect = Exception(
        "Unexpected error"
    )

    response = client.post(
        "/api/v1/agents/enterprise-healthcare-platform",
        json=VALID_REQUEST,
    )

    assert response.status_code == 500


# ---------------------------------------------------------
# Service Returns Failure
# ---------------------------------------------------------

@patch(
    "app.router.healthcare_router.service.execute",
    new_callable=AsyncMock,
)
def test_service_failure(mock_process):

    mock_process.return_value = {
        "status": "FAILED",
        "message": "Workflow failed"
    }

    response = client.post(
        "/api/v1/agents/enterprise-healthcare-platform",
        json=VALID_REQUEST,
    )

    assert response.status_code == 200

    body = response.json()

    assert body["status"] == "FAILED"


# ---------------------------------------------------------
# Large Clinical Note
# ---------------------------------------------------------

def test_large_patient_case():

    payload = VALID_REQUEST.copy()

    payload["patient_case"] = "Chest pain " * 5000

    response = client.post(
        "/api/v1/agents/enterprise-healthcare-platform",
        json=payload,
    )

    assert response.status_code in [200, 400, 413, 422]


# ---------------------------------------------------------
# Unicode Characters
# ---------------------------------------------------------

def test_unicode_request():

    payload = VALID_REQUEST.copy()

    payload[
        "patient_case"
    ] = "Patient complains of fever 🤒 and cough."

    response = client.post(
        "/api/v1/agents/enterprise-healthcare-platform",
        json=payload,
    )

    assert response.status_code in [200, 400]


# ---------------------------------------------------------
# Special Characters
# ---------------------------------------------------------

def test_special_characters():

    payload = VALID_REQUEST.copy()

    payload[
        "patient_case"
    ] = "<script>alert(1)</script>"

    response = client.post(
        "/api/v1/agents/enterprise-healthcare-platform",
        json=payload,
    )

    assert response.status_code in [200, 400, 500]


# ---------------------------------------------------------
# Unsupported Content Type
# ---------------------------------------------------------

def test_invalid_content_type():

    response = client.post(
        "/api/v1/agents/enterprise-healthcare-platform",
        data="invalid",
        headers={
            "Content-Type": "text/plain"
        },
    )

    assert response.status_code in [400, 415, 422]


# ---------------------------------------------------------
# OPTIONS Request
# ---------------------------------------------------------

def test_options():

    response = client.options(
        "/api/v1/agents/enterprise-healthcare-platform"
    )

    assert response.status_code in [200, 204, 405]


# ---------------------------------------------------------
# GET Not Allowed
# ---------------------------------------------------------

def test_get_not_allowed():

    response = client.get(
        "/api/v1/agents/enterprise-healthcare-platform"
    )

    assert response.status_code == 405


# ---------------------------------------------------------
# Invalid URL
# ---------------------------------------------------------

def test_invalid_url():

    response = client.post(
        "/api/v1/healthcare/xyz",
        json=VALID_REQUEST,
    )

    assert response.status_code == 404