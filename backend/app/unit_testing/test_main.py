"""
test_main.py

Unit Tests for app/main.py
"""

from unittest.mock import patch

from fastapi import HTTPException


# ---------------------------------------------------------
# Root Endpoint
# ---------------------------------------------------------

def test_root(client):
    response = client.get("/")

    assert response.status_code == 200

    data = response.json()

    assert data["application"] == "Enterprise Healthcare Agent Platform"
    assert data["status"] == "Running"
    assert data["framework"] == "FastAPI"
    assert data["version"] == "1.0.0"


# ---------------------------------------------------------
# Health Endpoint
# ---------------------------------------------------------

def test_health(client):
    response = client.get("/health")

    assert response.status_code == 200

    data = response.json()

    assert data["status"] == "Healthy"
    assert data["application"] == "Enterprise Healthcare Agent Platform"


# ---------------------------------------------------------
# Ready Endpoint
# ---------------------------------------------------------

def test_ready(client):
    response = client.get("/ready")

    assert response.status_code == 200
    assert response.json()["status"] == "Ready"


# ---------------------------------------------------------
# Live Endpoint
# ---------------------------------------------------------

def test_live(client):
    response = client.get("/live")

    assert response.status_code == 200
    assert response.json()["status"] == "Alive"


# ---------------------------------------------------------
# Swagger UI
# ---------------------------------------------------------

def test_docs(client):
    response = client.get("/docs")

    assert response.status_code == 200
    assert "text/html" in response.headers["content-type"]


# ---------------------------------------------------------
# ReDoc
# ---------------------------------------------------------

def test_redoc(client):
    response = client.get("/redoc")

    assert response.status_code == 200
    assert "text/html" in response.headers["content-type"]


# ---------------------------------------------------------
# OpenAPI
# ---------------------------------------------------------

def test_openapi(client):
    response = client.get("/openapi.json")

    assert response.status_code == 200

    schema = response.json()

    assert schema["info"]["title"] == "Enterprise Healthcare Agent Platform"
    assert schema["info"]["version"] == "1.0.0"


# ---------------------------------------------------------
# Invalid Route
# ---------------------------------------------------------

def test_invalid_route(client):
    response = client.get("/this-route-does-not-exist")

    assert response.status_code == 404


# ---------------------------------------------------------
# Router Health Endpoint
# ---------------------------------------------------------

def test_router_health(client):
    response = client.get("/api/v1/agents/health")

    assert response.status_code == 200

    data = response.json()

    assert data["status"] == "UP"


# ---------------------------------------------------------
# Platform Info
# ---------------------------------------------------------

def test_platform_info(client):
    response = client.get("/api/v1/agents/info")

    assert response.status_code == 200

    data = response.json()

    assert data["application"] == "Enterprise Healthcare Agent Platform"

    assert "agents" in data
    assert len(data["agents"]) == 5


# ---------------------------------------------------------
# Available Agents
# ---------------------------------------------------------

def test_available_agents(client):
    response = client.get("/api/v1/agents/agents")

    assert response.status_code == 200

    data = response.json()

    assert data["total_agents"] == 5

    assert len(data["agents"]) == 5


# ---------------------------------------------------------
# CORS Preflight
# ---------------------------------------------------------

def test_cors_options(client):
    response = client.options(
        "/health",
        headers={
            "Origin": "http://localhost",
            "Access-Control-Request-Method": "GET",
        },
    )

    assert response.status_code in (200, 204)


# ---------------------------------------------------------
# Unsupported Method
# ---------------------------------------------------------

def test_method_not_allowed(client):
    response = client.post("/health")

    assert response.status_code == 405


# ---------------------------------------------------------
# Exception Handler
# ---------------------------------------------------------

def test_global_exception_handler(client, monkeypatch):
    """
    Force router service to raise an exception
    and verify the global exception response.
    """

    async def raise_error(*args, **kwargs):
        raise RuntimeError("Forced Failure")

    from app.router import healthcare_router

    monkeypatch.setattr(
        healthcare_router.service,
        "execute",
        raise_error,
    )

    payload = {
        "patient_case": "Chest pain",
        "objective": "Diagnosis",
        "additional_context": "",
        "require_human_review": False,
        "session_id": "pytest",
    }

    response = client.post(
        "/api/v1/agents/enterprise-healthcare-platform",
        json=payload,
    )

    # Router catches exceptions and returns HTTP 500
    assert response.status_code == 500


# ---------------------------------------------------------
# Invalid Payload
# ---------------------------------------------------------

def test_validation_failure(client):
    response = client.post(
        "/api/v1/agents/enterprise-healthcare-platform",
        json={},
    )

    assert response.status_code == 422


# ---------------------------------------------------------
# Empty Patient Case
# ---------------------------------------------------------

def test_empty_patient_case(client):
    payload = {
        "patient_case": "",
        "objective": "Diagnosis",
        "additional_context": "",
        "require_human_review": False,
        "session_id": "pytest",
    }

    response = client.post(
        "/api/v1/agents/enterprise-healthcare-platform",
        json=payload,
    )

    assert response.status_code == 422


# ---------------------------------------------------------
# Empty Objective
# ---------------------------------------------------------

def test_empty_objective(client):
    payload = {
        "patient_case": "Chest pain",
        "objective": "",
        "additional_context": "",
        "require_human_review": False,
        "session_id": "pytest",
    }

    response = client.post(
        "/api/v1/agents/enterprise-healthcare-platform",
        json=payload,
    )

    assert response.status_code == 422