import json
from datetime import datetime

import streamlit as st


def initialize_session_state():
    """
    Initialize Streamlit session state variables.
    """

    defaults = {
        "response": None,
        "request": None,
    }

    for key, value in defaults.items():
        if key not in st.session_state:
            st.session_state[key] = value


def show_api_error(ex: Exception):
    """
    Display API errors consistently.
    """

    st.error(f"❌ {str(ex)}")


def format_execution_time(seconds):
    """
    Format execution time.
    """

    if seconds is None:
        return "-"

    try:
        return f"{float(seconds):.2f} sec"
    except Exception:
        return str(seconds)


def format_timestamp(timestamp):
    """
    Format timestamp for display.
    """

    if not timestamp:
        return "-"

    try:
        dt = datetime.fromisoformat(
            timestamp.replace("Z", "+00:00")
        )
        return dt.strftime("%d-%b-%Y %H:%M:%S UTC")
    except Exception:
        return timestamp


def safe_value(value, default="-"):
    """
    Return default when value is None or empty.
    """

    if value in [None, "", [], {}, ()]:
        return default

    return value


def get_status_color(status):
    """
    Return Streamlit color emoji based on status.
    """

    if not status:
        return "⚪"

    status = status.lower()

    if status in ["success", "up", "approved", "completed"]:
        return "🟢"

    if status in ["warning", "pending"]:
        return "🟡"

    if status in ["failed", "error", "down", "rejected"]:
        return "🔴"

    return "⚪"


def render_status(status):
    """
    Render status with emoji.
    """

    return f"{get_status_color(status)} {status}"


def json_download(response):
    """
    Convert response to downloadable JSON.
    """

    return json.dumps(
        response,
        indent=4,
        ensure_ascii=False
    )


def display_json_download(response, filename="response.json"):
    """
    Display JSON download button.
    """

    st.download_button(
        label="📥 Download JSON",
        data=json_download(response),
        file_name=filename,
        mime="application/json",
        use_container_width=True,
    )


def horizontal_rule():
    """
    Display a divider.
    """

    st.divider()


def section_header(title):
    """
    Display a standardized section header.
    """

    st.markdown(f"## {title}")


def display_key_value(key, value):
    """
    Display a key-value pair.
    """

    col1, col2 = st.columns([1, 3])

    with col1:
        st.markdown(f"**{key}**")

    with col2:
        st.write(safe_value(value))