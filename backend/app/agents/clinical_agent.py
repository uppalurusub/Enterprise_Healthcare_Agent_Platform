"""
implementation/clinical_agent.py

Enterprise Healthcare Agent Platform
Clinical Agent

Author : Enterprise Healthcare Agent Platform
"""

from __future__ import annotations

import time
from typing import Dict, Optional

from app.utils.logger import logger

from autogen_agentchat.agents import AssistantAgent
from autogen_ext.models.openai import OpenAIChatCompletionClient

from app.config.llm_config import get_model_client
from app.prompts.clinical_prompt import ClinicalPrompt


class ClinicalAgent:
    """
    Enterprise Clinical AI Agent

    Responsibilities
    ----------------
    • Clinical Assessment
    • Differential Diagnosis
    • Risk Assessment
    • Treatment Recommendations
    • Medication Review
    • Clinical Decision Support
    • Preventive Care
    """

    def __init__(self) -> None:
        """Initialize Clinical Agent."""

        logger.info("Initializing Clinical Agent...")

        self.model_client = get_model_client()

        self.agent = AssistantAgent(
            name="ClinicalAgent",
            model_client=self.model_client,
            system_message=ClinicalPrompt.get_system_prompt(),
            reflect_on_tool_use=True,
            model_client_stream=False,
        )

        logger.success("Clinical Agent initialized successfully.")

    async def analyze(
        self,
        patient_case: str,
        objective: str,
        additional_context: Optional[str] = None,
    ) -> Dict:
        """
        Perform clinical analysis.

        Args:
            patient_case: Clinical scenario
            objective: Analysis objective
            additional_context: Optional supporting information

        Returns:
            Dictionary containing agent response
        """

        logger.info("Clinical analysis started.")

        start_time = time.perf_counter()

        try:

            prompt = ClinicalPrompt.build_prompt(
                patient_case=patient_case,
                objective=objective,
                additional_context=additional_context,
            )

            logger.debug("Executing Clinical Agent...")

            result = await self.agent.run(task=prompt)

            execution_time = round(
                time.perf_counter() - start_time,
                3,
            )

            response = ""

            if result.messages:
                response = result.messages[-1].content

            logger.success(
                f"Clinical analysis completed in "
                f"{execution_time:.3f} seconds."
            )

            return {
                "agent_name": "Clinical Agent",
                "summary": response,
                "execution_time_seconds": execution_time,
            }

        except Exception as ex:

            logger.exception(
                f"Clinical Agent execution failed : {ex}"
            )

            raise

    async def close(self) -> None:
        """
        Close the underlying model client.
        """

        logger.info("Closing Clinical Agent...")

        await self.model_client.close()

        logger.success("Clinical Agent closed successfully.")