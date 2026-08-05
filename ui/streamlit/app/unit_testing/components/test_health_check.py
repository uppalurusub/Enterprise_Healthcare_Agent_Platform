from unittest.mock import patch

from app.components.health_check import render


@patch("app.components.health_check.health")
@patch("app.components.health_check.st.button")
def test_health_render(
    mock_button,
    mock_health,
):

    mock_button.return_value = True

    mock_health.return_value = {
        "status": "healthy",
        "service": "Healthcare",
        "timestamp": "today",
    }

    render()

    mock_health.assert_called_once()