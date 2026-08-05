import pytest
import responses

from app.api.api_client import APIClient


@responses.activate
def test_get_success():

    responses.add(
        responses.GET,
        "http://test/api",
        json={"status": "ok"},
        status=200,
    )

    result = APIClient.get("http://test/api")

    assert result == {"status": "ok"}


@responses.activate
def test_post_success():

    responses.add(
        responses.POST,
        "http://test/api",
        json={"message": "success"},
        status=200,
    )

    result = APIClient.post(
        "http://test/api",
        {"name": "John"},
    )

    assert result["message"] == "success"


@responses.activate
def test_post_error():

    responses.add(
        responses.POST,
        "http://test/api",
        json={"detail": "Bad Request"},
        status=400,
    )

    with pytest.raises(Exception):
        APIClient.post(
            "http://test/api",
            {}
        )