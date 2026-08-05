from unittest.mock import patch

from app.components.sidebar import render_sidebar


@patch("app.components.sidebar.st.sidebar.radio")
@patch("app.components.sidebar.st.sidebar.title")
def test_sidebar(mock_title, mock_radio):

    mock_radio.return_value = "Health Check"

    result = render_sidebar()

    assert result == "Health Check"

    mock_title.assert_called_once()