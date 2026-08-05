import streamlit as st

from api.healthcare_api import platform_info


def render():
    """
    Display Enterprise Healthcare Platform information.
    """

    st.header("🏥 Enterprise Healthcare Platform Information")

    if st.button(
        "Load Platform Information",
        type="primary",
        use_container_width=True,
    ):

        with st.spinner("Loading platform information..."):

            try:
                response = platform_info()

                # ----------------------------------------------------
                # Basic Information
                # ----------------------------------------------------

                st.subheader("Application Details")

                col1, col2 = st.columns(2)

                with col1:

                    st.metric(
                        "Application",
                        response.get("application", "-"),
                    )

                    st.metric(
                        "Version",
                        response.get("version", "-"),
                    )

                with col2:

                    st.metric(
                        "Framework",
                        response.get("framework", "-"),
                    )

                    st.metric(
                        "Architecture",
                        response.get("architecture", "-"),
                    )

                st.divider()

                # ----------------------------------------------------
                # Multi-Agent Framework
                # ----------------------------------------------------

                st.subheader("AI Framework")

                st.info(
                    response.get(
                        "multi_agent_framework",
                        "-"
                    )
                )

                st.divider()

                # ----------------------------------------------------
                # Available Agents
                # ----------------------------------------------------

                st.subheader("Available Agents")

                agents = response.get("agents", [])

                cols = st.columns(2)

                for index, agent in enumerate(agents):
                    with cols[index % 2]:
                        st.success(agent)

                st.divider()

                # ----------------------------------------------------
                # Platform Skills
                # ----------------------------------------------------

                st.subheader("Platform Skills")

                skills = response.get("skills", [])

                for skill in skills:
                    st.write(f"✅ {skill}")

                # ----------------------------------------------------
                # Raw JSON
                # ----------------------------------------------------

                with st.expander("View Raw JSON"):
                    st.json(response)

            except Exception as ex:
                st.error(f"Unable to load platform information.\n\n{ex}")