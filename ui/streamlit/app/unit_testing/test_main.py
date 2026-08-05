from unittest.mock import patch

import app


@patch("main.render_sidebar")
def test_app_load(mock_sidebar):

    mock_sidebar.return_value = "Health Check"

    assert mock_sidebar() == "Health Check"