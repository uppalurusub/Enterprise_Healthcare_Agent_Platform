import streamlit as st

from components.sidebar import render_sidebar
from components.request_form import request_form
from components.response_view import show_response
from components.health_check import render as health_check
from components.platform_info import render as platform_info
from components.available_agents import render as available_agents

from api.healthcare_api import execute

from utils.helpers import (
    initialize_session_state,
    show_api_error,
)

# -------------------------------------------------------------------
# Streamlit Page Configuration
# -------------------------------------------------------------------

st.set_page_config(
    page_title="Enterprise Healthcare Agent Platform",
    page_icon="🏥",
    layout="wide",
    initial_sidebar_state="expanded",
)

# -------------------------------------------------------------------
# Initialize Session State
# -------------------------------------------------------------------

initialize_session_state()

# -------------------------------------------------------------------
# Header
# -------------------------------------------------------------------

st.title("🏥 Enterprise Healthcare Agent Platform")

st.markdown(
    """
Enterprise AI platform for generating multidisciplinary healthcare
recommendations using multiple AI agents.

**Clinical • Financial • Research • Compliance • Executive**
"""
)

st.divider()

# -------------------------------------------------------------------
# Sidebar Navigation
# -------------------------------------------------------------------

page = render_sidebar()

# -------------------------------------------------------------------
# Execute Platform
# -------------------------------------------------------------------

if page == "Execute Platform":

    request, submitted = request_form()

    if submitted:

        with st.spinner("Executing Enterprise Healthcare Platform..."):

                try:

                    response = execute(request)

                    st.session_state.request = request
                    st.session_state.response = response

                except Exception as ex:

                    show_api_error(ex)

    if st.session_state.response:

        show_response(st.session_state.response)

# -------------------------------------------------------------------
# Health Check
# -------------------------------------------------------------------

elif page == "Health Check":

    health_check()

# -------------------------------------------------------------------
# Platform Information
# -------------------------------------------------------------------

elif page == "Platform Information":

    platform_info()

# -------------------------------------------------------------------
# Available Agents
# -------------------------------------------------------------------

elif page == "Available Agents":

    available_agents()

# -------------------------------------------------------------------
# Footer
# -------------------------------------------------------------------

st.divider()

st.caption(
    "Enterprise Healthcare Agent Platform | "
    "FastAPI • Streamlit • Microsoft AutoGen"
)