import streamlit as st


def render_sidebar():

    st.sidebar.title("Enterprise Healthcare")

    return st.sidebar.radio(
        "Navigation",
        [
            "Execute Platform",
            "Health Check",
            "Platform Info",
            "Available Agents"
        ]
    )