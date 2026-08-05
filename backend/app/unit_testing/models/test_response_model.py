import pytest
from app.models.response_model import (
    AgentResponse,
    Metadata,
    HumanReview,
    HealthcareResponse,
)


def agent(name):
    return AgentResponse(
        agent_name=name,
        summary=f"{name} summary",
        execution_time_seconds=0.45,
    )


def metadata():
    return Metadata(
        request_id="REQ001",
        session_id="SESSION001",
        generated_at="2026-07-23T10:00:00Z",
        total_execution_time_seconds=2.5,
    )


def review():
    return HumanReview(
        required=True,
        status="Approved",
        reviewer_comments="Looks good",
    )


def response():
    return HealthcareResponse(
        status="success",
        message="Completed",
        metadata=metadata(),
        clinical_analysis=agent("Clinical"),
        financial_analysis=agent("Financial"),
        research_summary=agent("Research"),
        compliance_review=agent("Compliance"),
        executive_summary=agent("Executive"),
        human_review=review(),
    )


def test_agent_response():
    a = agent("Clinical")

    assert a.agent_name == "Clinical"
    assert a.execution_time_seconds == 0.45


def test_metadata():
    m = metadata()

    assert m.request_id == "REQ001"
    assert m.total_execution_time_seconds == 2.5


def test_human_review():
    r = review()

    assert r.required is True
    assert r.status == "Approved"


def test_create_response():
    r = response()

    assert r.status == "success"
    assert r.metadata.request_id == "REQ001"


def test_nested_models():
    r = response()

    assert r.clinical_analysis.agent_name == "Clinical"
    assert r.financial_analysis.agent_name == "Financial"
    assert r.research_summary.agent_name == "Research"
    assert r.compliance_review.agent_name == "Compliance"
    assert r.executive_summary.agent_name == "Executive"


def test_model_dump():
    dumped = response().model_dump()

    assert dumped["status"] == "success"
    assert dumped["metadata"]["request_id"] == "REQ001"


def test_model_dump_json():
    text = response().model_dump_json()

    assert "clinical_analysis" in text
    assert "financial_analysis" in text
    assert "executive_summary" in text


def test_optional_fields():
    m = Metadata(
        request_id="REQ002",
        session_id=None,
        generated_at="2026-07-23",
        total_execution_time_seconds=1.2,
    )

    assert m.session_id is None


def test_human_review_optional_comments():
    r = HumanReview(
        required=False,
        status="Not Required",
        reviewer_comments=None,
    )

    assert r.reviewer_comments is None