from unittest.mock import patch

from app.components.request_form import request_form


@patch("app.components.request_form.st.form_submit_button")
@patch("app.components.request_form.st.text_area")
@patch("app.components.request_form.st.selectbox")
def test_request_form(
    mock_selectbox,
    mock_textarea,
    mock_submit,
):

    mock_textarea.return_value = "Patient Case"

    mock_selectbox.return_value = "Executive"

    mock_submit.return_value = True

    request = request_form()

    assert request is not None