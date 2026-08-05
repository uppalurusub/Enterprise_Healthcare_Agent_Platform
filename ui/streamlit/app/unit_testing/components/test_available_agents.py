from unittest.mock import patch

from app.components.available_agents import render


@patch("app.components.available_agents.available_agents")
@patch("app.components.available_agents.st.button")
def test_agents(mock_button, mock_agents):

    mock_button.return_value = True

    mock_agents.return_value = {
        "total_agents": 3,
        "agents": []
    }

    render()

    mock_agents.assert_called_once()