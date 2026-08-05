"""
implementation/research_agent.py

Enterprise Healthcare Agent Platform
Research Agent

Author : Enterprise Healthcare Agent Platform
"""

from __future__ import annotations

import time
from typing import Dict, Optional

from app.utils.logger import logger

from autogen_agentchat.agents import AssistantAgent
from autogen_ext.models.openai import OpenAIChatCompletionClient

from app.config.llm_config import get_model_client
from app.prompts.research_prompt import ResearchPrompt


class ResearchAgent:
    """
    Enterprise Healthcare Research AI Agent

    Responsibilities
    ----------------
    • Evidence-Based Medicine
    • Clinical Guideline Review
    • Medical Literature Review
    • Clinical Trial Identification
    • Comparative Effectiveness Analysis
    • Emerging Therapy Identification
    • Research Gap Analysis
    """

    def __init__(self) -> None:
        """Initialize the Research Agent."""

        logger.info("Initializing Research Agent...")

        self.model_client = get_model_client()

        self.agent = AssistantAgent(
            name="ResearchAgent",
            model_client=self.model_client,
            system_message=ResearchPrompt.get_system_prompt(),
            reflect_on_tool_use=True,
            model_client_stream=False,
        )

        logger.success("Research Agent initialized successfully.")

    async def analyze(
        self,
        patient_case: str,
        objective: str,
        additional_context: Optional[str] = None,
    ) -> Dict:
        """
        Perform evidence-based research analysis.

        Args:
            patient_case: Clinical case
            objective: Research objective
            additional_context: Optional supporting information

        Returns:
            Dictionary containing research analysis
        """

        logger.info("Research analysis started.")

        start_time = time.perf_counter()

        try:

            prompt = ResearchPrompt.build_prompt(
                patient_case=patient_case,
                objective=objective,
                additional_context=additional_context,
            )

            logger.debug("Executing Research Agent...")

            result = await self.agent.run(task=prompt)

            execution_time = round(
                time.perf_counter() - start_time,
                3,
            )

            response = ""

            if result.messages:
                response = result.messages[-1].content

            logger.success(
                f"Research analysis completed in "
                f"{execution_time:.3f} seconds."
            )

            return {
                "agent_name": "Research Agent",
                "summary": response,
                "execution_time_seconds": execution_time,
            }

        except Exception as ex:

            logger.exception(
                f"Research Agent execution failed: {ex}"
            )
            raise

    async def close(self) -> None:
        """
        Close the underlying model client.
        """

        logger.info("Closing Research Agent...")

        await self.model_client.close()

        logger.success("Research Agent closed successfully.")