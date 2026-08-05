import json
import streamlit as st


def _agent_card(title: str, agent: dict):
    """Display an individual agent response."""

    with st.expander(f"🧠 {title}", expanded=True):

        col1, col2 = st.columns([3, 1])

        with col1:
            st.markdown(f"**Agent:** {agent.get('agent_name', '-')}")
            st.markdown("#### Summary")
            st.write(agent.get("summary", ""))

        with col2:
            st.metric(
                "Execution Time",
                f"{agent.get('execution_time_seconds', 0):.2f} sec"
            )


def show_response(response: dict):
    """
    Display HealthcareResponse.
    """

    st.success("Enterprise Healthcare Analysis Completed")

    # ------------------------------------------------------------------
    # Status
    # ------------------------------------------------------------------

    st.header("Execution Status")

    col1, col2 = st.columns(2)

    with col1:
        st.metric(
            "Status",
            response.get("status", "")
        )

    with col2:
        st.metric(
            "Message",
            response.get("message", "")
        )

    st.divider()

    # ------------------------------------------------------------------
    # Metadata
    # ------------------------------------------------------------------

    metadata = response.get("metadata", {})

    st.header("Metadata")

    c1, c2 = st.columns(2)

    with c1:

        st.write("**Request ID**")
        st.code(metadata.get("request_id", "-"))

        st.write("**Session ID**")
        st.code(metadata.get("session_id", "-"))

    with c2:

        st.write("**Generated At**")
        st.code(metadata.get("generated_at", "-"))

        st.metric(
            "Total Execution",
            f"{metadata.get('total_execution_time_seconds',0):.2f} sec"
        )

    st.divider()

    # ------------------------------------------------------------------
    # Agent Responses
    # ------------------------------------------------------------------

    st.header("Multi-Agent Analysis")

    _agent_card(
        "Clinical Analysis",
        response.get("clinical_analysis", {})
    )

    _agent_card(
        "Financial Analysis",
        response.get("financial_analysis", {})
    )

    _agent_card(
        "Research Summary",
        response.get("research_summary", {})
    )

    _agent_card(
        "Compliance Review",
        response.get("compliance_review", {})
    )

    _agent_card(
        "Executive Summary",
        response.get("executive_summary", {})
    )

    st.divider()

    # ------------------------------------------------------------------
    # Human Review
    # ------------------------------------------------------------------

    review = response.get("human_review", {})

    st.header("Human Review")

    col1, col2 = st.columns(2)

    with col1:

        st.metric(
            "Required",
            "Yes" if review.get("required") else "No"
        )

    with col2:

        st.metric(
            "Status",
            review.get("status", "-")
        )

    comments = review.get("reviewer_comments")

    if comments:
        st.info(comments)

    st.divider()

    # ------------------------------------------------------------------
    # Raw JSON
    # ------------------------------------------------------------------

    with st.expander("Raw JSON Response"):

        st.code(
            json.dumps(response, indent=4),
            language="json"
        )

        st.download_button(
            label="Download JSON",
            data=json.dumps(response, indent=4),
            file_name="healthcare_response.json",
            mime="application/json"
        )