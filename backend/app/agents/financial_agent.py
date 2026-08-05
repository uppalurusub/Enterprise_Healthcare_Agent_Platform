"""
implementation/financial_agent.py

Enterprise Healthcare Agent Platform
Financial Agent

Author: Enterprise Healthcare Agent Platform
"""

from __future__ import annotations

import time
from typing import Dict

from app.utils.logger import logger

from autogen_agentchat.agents import AssistantAgent
from autogen_ext.models.openai import OpenAIChatCompletionClient

from app.config.llm_config import get_model_client
from app.prompts.finance_prompt import FinancePrompt


class FinancialAgent:
    """
    Enterprise Financial AI Agent

    Responsibilities
    ----------------
    • Treatment Cost Estimation
    • Insurance Coverage Analysis
    • Revenue Cycle Assessment
    • Financial Risk Analysis
    • Resource Utilization
    • ROI Analysis
    """

    def __init__(self) -> None:

        logger.info("Initializing Financial Agent...")

        self.model_client = get_model_client()

        self.agent = AssistantAgent(
            name="FinancialAgent",
            model_client=self.model_client,
            system_message=FinancePrompt.get_system_prompt(),
            reflect_on_tool_use=True,
            model_client_stream=False,
        )

        logger.success("Financial Agent initialized successfully.")

    async def analyze(
        self,
        patient_case: str,
        objective: str,
        additional_context: str | None = None,
    ) -> Dict:
        """
        Execute Financial Analysis.

        Args:
            patient_case: Clinical case
            objective: Business objective
            additional_context: Optional context

        Returns:
            Financial analysis dictionary
        """

        logger.info("Financial analysis started.")

        start = time.perf_counter()

        try:

            prompt = FinancePrompt.build_prompt(
                patient_case=patient_case,
                objective=objective,
                additional_context=additional_context,
            )

            logger.debug("Running Financial Agent...")

            result = await self.agent.run(task=prompt)

            execution_time = round(
                time.perf_counter() - start,
                3,
            )

            response = ""

            if result.messages:
                response = result.messages[-1].content

            logger.success(
                f"Financial analysis completed in "
                f"{execution_time:.3f} seconds."
            )

            return {
                "agent_name": "Financial Agent",
                "summary": response,
                "execution_time_seconds": execution_time,
            }

        except Exception as ex:

            logger.exception(
                f"Financial Agent execution failed : {ex}"
            )

            raise

    async def close(self) -> None:
        """
        Close model client.
        """

        logger.info("Closing Financial Agent...")

        await self.model_client.close()

        logger.success("Financial Agent closed successfully.")