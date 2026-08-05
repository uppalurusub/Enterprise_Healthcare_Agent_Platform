"""
Unit tests for app.utils.helper
"""

import re
import uuid

from app.utils.helper import Helper


def test_generate_request_id():
    rid = Helper.generate_request_id()

    assert isinstance(rid, str)

    uuid.UUID(rid)


def test_generate_session_id():
    sid = Helper.generate_session_id()

    assert isinstance(sid, str)

    uuid.UUID(sid)


def test_utc_now():

    value = Helper.utc_now()

    assert isinstance(value, str)

    assert "T" in value


def test_current_timestamp():

    ts = Helper.current_timestamp()

    assert isinstance(ts, int)

    assert ts > 1700000000


def test_to_json():

    data = {"a": 1}

    text = Helper.to_json(data)

    assert '"a"' in text


def test_from_json():

    data = Helper.from_json('{"x":10}')

    assert data["x"] == 10


def test_sha256():

    digest = Helper.sha256("hello")

    assert len(digest) == 64

    assert re.fullmatch(r"[0-9a-f]{64}", digest)


def test_build_prompt_without_context():

    prompt = Helper.build_prompt(
        patient_case="Chest pain",
        objective="Diagnosis"
    )

    assert "Patient Case" in prompt
    assert "Objective" in prompt
    assert "Chest pain" in prompt
    assert "Diagnosis" in prompt


def test_build_prompt_with_context():

    prompt = Helper.build_prompt(
        patient_case="Chest pain",
        objective="Diagnosis",
        additional_context="Diabetic"
    )

    assert "Additional Context" in prompt

    assert "Diabetic" in prompt


def test_success_response():

    result = Helper.success_response(
        data={"ok": True},
        message="Done",
        request_id="REQ001"
    )

    assert result["status"] == "success"

    assert result["message"] == "Done"

    assert result["request_id"] == "REQ001"

    assert result["data"]["ok"] is True

    assert "timestamp" in result


def test_error_response():

    result = Helper.error_response(
        error="Failure",
        request_id="REQ001"
    )

    assert result["status"] == "error"

    assert result["error"] == "Failure"

    assert result["request_id"] == "REQ001"

    assert "timestamp" in result


def test_merge_agent_outputs():

    merged = Helper.merge_agent_outputs([
        {"clinical": "ok"},
        {"financial": "ok"},
        {"research": "ok"},
    ])

    assert merged["clinical"] == "ok"

    assert merged["financial"] == "ok"

    assert merged["research"] == "ok"




def test_large_prompt():

    case = "Chest pain " * 1000

    prompt = Helper.build_prompt(
        patient_case=case,
        objective="Diagnosis"
    )

    assert len(prompt) > 10000