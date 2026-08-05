import pytest
from pydantic import ValidationError

from app.models.request_model import HealthcareRequest


def valid_data():
    return {
        "patient_case": "65-year-old male with diabetes and hypertension.",
        "objective": "Generate multidisciplinary recommendations.",
        "additional_context": "History of CKD.",
        "require_human_review": True,
        "session_id": "session-001",
    }


def test_create_request():
    model = HealthcareRequest(**valid_data())

    assert model.patient_case.startswith("65-year")
    assert model.require_human_review is True
    assert model.session_id == "session-001"


def test_defaults():
    data = valid_data()
    data.pop("require_human_review")
    data.pop("session_id")

    model = HealthcareRequest(**data)

    assert model.require_human_review is False
    assert model.session_id is None


def test_patient_case_required():
    data = valid_data()
    data.pop("patient_case")

    with pytest.raises(ValidationError):
        HealthcareRequest(**data)


def test_objective_required():
    data = valid_data()
    data.pop("objective")

    with pytest.raises(ValidationError):
        HealthcareRequest(**data)


def test_patient_case_min_length():
    data = valid_data()
    data["patient_case"] = "short"

    with pytest.raises(ValidationError):
        HealthcareRequest(**data)


def test_objective_min_length():
    data = valid_data()
    data["objective"] = "abc"

    with pytest.raises(ValidationError):
        HealthcareRequest(**data)


def test_patient_case_max_length():
    data = valid_data()
    data["patient_case"] = "A" * 10001

    with pytest.raises(ValidationError):
        HealthcareRequest(**data)


def test_objective_max_length():
    data = valid_data()
    data["objective"] = "A" * 1001

    with pytest.raises(ValidationError):
        HealthcareRequest(**data)


def test_additional_context_optional():
    data = valid_data()
    data.pop("additional_context")

    model = HealthcareRequest(**data)

    assert model.additional_context is None


def test_model_dump():
    model = HealthcareRequest(**valid_data())

    dumped = model.model_dump()

    assert dumped["session_id"] == "session-001"


def test_model_dump_json():
    model = HealthcareRequest(**valid_data())

    text = model.model_dump_json()

    assert "patient_case" in text
    assert "objective" in text




def test_large_valid_case():
    data = valid_data()
    data["patient_case"] = "Chest pain " * 900

    model = HealthcareRequest(**data)

    assert len(model.patient_case) > 5000