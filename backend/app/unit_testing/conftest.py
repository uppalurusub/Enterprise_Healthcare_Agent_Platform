"""
conftest.py

Shared pytest fixtures for Enterprise Healthcare Agent Platform
"""

from unittest.mock import AsyncMock, MagicMock

import pytest
from fastapi.testclient import TestClient

from app.main import app
from app.models.request_model import HealthcareRequest


# ---------------------------------------------------------
# FastAPI Test Client
# ---------------------------------------------------------

@pytest.fixture(scope="session")
def client():
    """
    FastAPI TestClient
    """
    with TestClient(app) as client:
        yield client


# ---------------------------------------------------------
# Valid Request Payload (dict)
# ---------------------------------------------------------

@pytest.fixture
def valid_payload():
    """
    Valid JSON payload for API testing.
    """
    return {
        "patient_case": (
            "65-year-old male with uncontrolled diabetes, "
            "hypertension, chest pain and elevated troponin."
        ),
        "objective": (
            "Provide diagnosis, financial review, "
            "research evidence and executive summary."
        ),
        "additional_context": "History of CABG 5 years ago.",
        "require_human_review": False,
        "session_id": "pytest-session-001",
    }


# ---------------------------------------------------------
# Valid HealthcareRequest model
# ---------------------------------------------------------

@pytest.fixture
def healthcare_request(valid_payload):
    """
    Pydantic request model.
    """
    return HealthcareRequest(**valid_payload)


# ---------------------------------------------------------
# Mock Agent Response
# ---------------------------------------------------------

@pytest.fixture
def mock_agent_result():
    """
    Mock response returned by every AI agent.
    """
    return {
        "status": "SUCCESS",
        "summary": "Analysis completed.",
        "recommendations": [
            "Recommendation 1",
            "Recommendation 2",
        ],
        "confidence": 0.97,
    }


# ---------------------------------------------------------
# Mock Orchestrator
# ---------------------------------------------------------

@pytest.fixture
def mock_orchestrator(monkeypatch):
    """
    Mock HealthcareOrchestrator.execute()
    """
    from app.implementation.orchestrator import HealthcareOrchestrator

    mocked = AsyncMock(
        return_value={
            "clinical": {"summary": "Clinical"},
            "financial": {"summary": "Financial"},
            "research": {"summary": "Research"},
            "compliance": {"summary": "Compliance"},
            "executive": {"summary": "Executive"},
        }
    )

    monkeypatch.setattr(
        HealthcareOrchestrator,
        "execute",
        mocked,
    )

    return mocked


# ---------------------------------------------------------
# Mock Human Reviewer
# ---------------------------------------------------------

@pytest.fixture
def mock_human_review(monkeypatch):
    """
    Mock HumanReviewer.review()
    """
    from app.implementation.human_review import HumanReviewer

    mocked = MagicMock(
        return_value={
            "approved": True,
            "comments": "Approved by pytest.",
        }
    )

    monkeypatch.setattr(
        HumanReviewer,
        "review",
        mocked,
    )

    return mocked


# ---------------------------------------------------------
# Mock Healthcare Implementation
# ---------------------------------------------------------

@pytest.fixture
def mock_healthcare_impl(monkeypatch):
    """
    Mock HealthcareImplementation.execute()
    """
    from app.implementation.healthcare_impl import HealthcareImplementation

    mocked = AsyncMock(
        return_value={
            "success": True,
            "request_id": "REQ-001",
            "clinical": {},
            "financial": {},
            "research": {},
            "compliance": {},
            "executive": {},
        }
    )

    monkeypatch.setattr(
        HealthcareImplementation,
        "execute",
        mocked,
    )

    return mocked


# ---------------------------------------------------------
# Mock Healthcare Service
# ---------------------------------------------------------

@pytest.fixture
def mock_service(monkeypatch):
    """
    Mock HealthcareService.execute()
    """
    from app.services.healthcare_service import HealthcareService

    mocked = AsyncMock(
        return_value={
            "success": True,
            "request_id": "REQ-001",
        }
    )

    monkeypatch.setattr(
        HealthcareService,
        "execute",
        mocked,
    )

    return mocked


# ---------------------------------------------------------
# Common Invalid Payloads
# ---------------------------------------------------------

@pytest.fixture
def empty_patient_payload(valid_payload):
    payload = valid_payload.copy()
    payload["patient_case"] = ""
    return payload


@pytest.fixture
def empty_objective_payload(valid_payload):
    payload = valid_payload.copy()
    payload["objective"] = ""
    return payload


@pytest.fixture
def unicode_payload(valid_payload):
    payload = valid_payload.copy()
    payload["patient_case"] = (
        "🤒 患者出现胸痛 with severe hypertension and diabetes."
    )
    return payload


@pytest.fixture
def large_payload(valid_payload):
    payload = valid_payload.copy()
    payload["patient_case"] = "Chest pain " * 5000
    return payload


# ---------------------------------------------------------
# Async Event Loop
# ---------------------------------------------------------

@pytest.fixture(scope="session")
def event_loop():
    """
    Session-wide asyncio event loop.
    """
    import asyncio

    loop = asyncio.new_event_loop()
    yield loop
    loop.close()