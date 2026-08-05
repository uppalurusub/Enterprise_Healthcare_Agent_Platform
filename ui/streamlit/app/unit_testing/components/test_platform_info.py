from unittest.mock import patch

from app.components.platform_info import render


@patch("app.components.platform_info.platform_info")
@patch("app.components.platform_info.st.button")
def test_platform(mock_button, mock_info):

    mock_button.return_value = True

    mock_info.return_value = {
        "application": "Healthcare",
        "version": "1.0"
    }

    render()

    mock_info.assert_called_once()