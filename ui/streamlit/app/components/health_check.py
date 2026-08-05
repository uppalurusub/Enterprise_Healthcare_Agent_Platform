import streamlit as st

from api.healthcare_api import health


def render():
    """
    Display Enterprise Healthcare Platform health status.
    """

    st.header("🏥 Health Check")

    st.write(
        "Verify that the Enterprise Healthcare Agent Platform is running."
    )

    if st.button(
        "Check Health",
        type="primary",
        use_container_width=True,
    ):

        with st.spinner("Checking platform health..."):

            try:
                response = health()

                status = response.get("status", "UNKNOWN")
                service = response.get("service", "-")
                timestamp = response.get("timestamp", "-")

                # ---------------------------------------------------
                # Status
                # ---------------------------------------------------

                if status.upper() == "UP":
                    st.success("✅ Platform is Healthy")
                else:
                    st.error("❌ Platform is Not Available")

                st.divider()

                # ---------------------------------------------------
                # Metrics
                # ---------------------------------------------------

                col1, col2, col3 = st.columns(3)

                with col1:
                    st.metric(
                        "Status",
                        status
                    )

                with col2:
                    st.metric(
                        "Service",
                        service
                    )

                with col3:
                    st.metric(
                        "Timestamp",
                        timestamp
                    )

                st.divider()

                # ---------------------------------------------------
                # Raw Response
                # ---------------------------------------------------

                with st.expander("View Raw Response"):
                    st.json(response)

            except Exception as ex:

                st.error(
                    f"Health check failed.\n\n{str(ex)}"
                )