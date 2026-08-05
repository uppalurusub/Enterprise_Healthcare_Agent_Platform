"""
implementation/executive_agent.py

Enterprise Healthcare Agent Platform
Executive Agent

Author : Enterprise Healthcare Agent Platform
"""

from __future__ import annotations

import time
from typing import Dict, Optional

from app.utils.logger import logger

from autogen_agentchat.agents import AssistantAgent
from autogen_ext.models.openai import OpenAIChatCompletionClient

from app.config.llm_config import get_model_client
from app.prompts.executive_prompt import ExecutivePrompt


class ExecutiveAgent:
    """
    Enterprise Executive AI Agent

    Responsibilities
    ----------------
    • Executive Decision Support
    • Strategic Planning
    • Risk Prioritization
    • Business Impact Assessment
    • Clinical Impact Assessment
    • Financial Impact Assessment
    • Compliance Assessment
    • Operational Recommendations
    • KPI Identification
    • Executive Summary Generation
    """

    def __init__(self) -> None:
        """Initialize Executive Agent."""

        logger.info("Initializing Executive Agent...")

        self.model_client = get_model_client()

        self.agent = AssistantAgent(
            name="ExecutiveAgent",
            model_client=self.model_client,
            system_message=ExecutivePrompt.get_system_prompt(),
            reflect_on_tool_use=True,
            model_client_stream=False,
        )

        logger.success("Executive Agent initialized successfully.")

    async def analyze(
        self,
        clinical_analysis: str,
        financial_analysis: str,
        research_summary: str,
        compliance_review: str,
        objective: str,
        additional_context: Optional[str] = None,
    ) -> Dict:
        """
        Generate an executive decision report.

        Args:
            clinical_analysis: Clinical Agent output
            financial_analysis: Financial Agent output
            research_summary: Research Agent output
            compliance_review: Compliance Agent output
            objective: Business objective
            additional_context: Optional supporting context

        Returns:
            Executive analysis dictionary
        """

        logger.info("Executive analysis started.")

        start_time = time.perf_counter()

        try:

            prompt = ExecutivePrompt.build_prompt(
                clinical_analysis=clinical_analysis,
                financial_analysis=financial_analysis,
                research_summary=research_summary,
                compliance_review=compliance_review,
                objective=objective,
                additional_context=additional_context,
            )

            logger.debug("Executing Executive Agent...")

            result = await self.agent.run(task=prompt)

            execution_time = round(
                time.perf_counter() - start_time,
                3,
            )

            response = ""

            if result.messages:
                response = result.messages[-1].content

            logger.success(
                f"Executive analysis completed "
                f"in {execution_time:.3f} seconds."
            )

            return {
                "agent_name": "Executive Agent",
                "summary": response,
                "execution_time_seconds": execution_time,
            }

        except Exception as ex:

            logger.exception(
                f"Executive Agent execution failed: {ex}"
            )
            raise

    async def close(self) -> None:
        """
        Close model client resources.
        """

        logger.info("Closing Executive Agent...")

        await self.model_client.close()

        logger.success("Executive Agent closed successfully.")