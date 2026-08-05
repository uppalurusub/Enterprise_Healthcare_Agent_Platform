import streamlit as st


def request_form():
    """
    Streamlit form for HealthcareRequest.
    """

    with st.form("healthcare_request_form", clear_on_submit=False):

        st.subheader("🩺 Patient Case Information")

        patient_case = st.text_area(
            label="Patient Case *",
            value="",
            height=220,
            max_chars=10000,
            placeholder=(
                "Example:\n"
                "65-year-old male with Type 2 Diabetes, "
                "Stage 3 CKD, Hypertension, elevated HbA1c..."
            ),
            help="Detailed patient case or clinical scenario."
        )

        objective = st.text_area(
            label="Objective *",
            value="",
            height=120,
            max_chars=1000,
            placeholder=(
                "Generate multidisciplinary clinical, financial, research, "
                "compliance, and executive recommendations."
            ),
            help="Objective or task for the multi-agent platform."
        )

        additional_context = st.text_area(
            label="Additional Context",
            value="",
            height=150,
            max_chars=5000,
            placeholder=(
                "Patient has Medicare coverage and a history of "
                "medication non-adherence."
            ),
            help="Optional supporting clinical or operational context."
        )

        col1, col2 = st.columns(2)

        with col1:
            require_human_review = st.checkbox(
                "Require Human Review",
                value=False,
                help="Enable Human-in-the-Loop approval."
            )

        with col2:
            session_id = st.text_input(
                "Session ID",
                value="",
                placeholder="session-001",
                help="Optional client session identifier."
            )

        submitted = st.form_submit_button(
            "🚀 Execute Enterprise Healthcare Platform",
            use_container_width=True
        )

    request = {
        "patient_case": patient_case.strip(),
        "objective": objective.strip(),
        "additional_context": (
            additional_context.strip()
            if additional_context.strip()
            else None
        ),
        "require_human_review": require_human_review,
        "session_id": (
            session_id.strip()
            if session_id.strip()
            else None
        )
    }

    return request, submitted