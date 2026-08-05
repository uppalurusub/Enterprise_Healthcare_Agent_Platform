from unittest.mock import patch

from app.components.response_view import show_response


@patch("app.components.response_view.st.success")
def test_show_response(mock_success):

    response = {
        "status": "completed",
        "overall_summary": "Everything OK",
        "agent_responses": [],
    }

    show_response(response)

    mock_success.assert_called_once()