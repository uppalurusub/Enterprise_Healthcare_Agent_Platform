import streamlit as st

from api.healthcare_api import available_agents


def render():
    """
    Display available Enterprise Healthcare agents.
    """

    st.header("🤖 Available AI Agents")

    st.write(
        "View the AI agents participating in the Enterprise Healthcare "
        "Multi-Agent Platform."
    )

    if st.button(
        "Load Available Agents",
        type="primary",
        use_container_width=True,
    ):

        with st.spinner("Loading agents..."):

            try:
                response = available_agents()

                total_agents = response.get("total_agents", 0)
                agents = response.get("agents", [])

                # --------------------------------------------------
                # Summary
                # --------------------------------------------------

                st.metric(
                    "Total Agents",
                    total_agents
                )

                st.divider()

                # --------------------------------------------------
                # Agent Cards
                # --------------------------------------------------

                cols = st.columns(2)

                for index, agent in enumerate(agents):

                    with cols[index % 2]:

                        with st.container(border=True):

                            st.subheader(f"🤖 {agent.get('name', '-')}")

                            st.markdown(
                                f"**Role**  \n"
                                f"{agent.get('role', '-')}"
                            )

                st.divider()

                # --------------------------------------------------
                # Raw Response
                # --------------------------------------------------

                with st.expander("View Raw JSON"):

                    st.json(response)

            except Exception as ex:

                st.error(
                    f"Unable to load available agents.\n\n{str(ex)}"
                )