from unittest.mock import patch

from api.healthcare_api import (
    health,
    platform_info,
    available_agents,
    execute,
)


@patch("api.healthcare_api.APIClient.get")
def test_health(mock_get):

    mock_get.return_value = {"status": "healthy"}

    result = health()

    assert result["status"] == "healthy"

    mock_get.assert_called_once()


@patch("api.healthcare_api.APIClient.post")
def test_execute(mock_post):

    payload = {
        "patient_case": "Chest Pain",
        "objective": "Diagnosis"
    }

    mock_post.return_value = {
        "status": "completed"
    }

    result = execute(payload)

    assert result["status"] == "completed"