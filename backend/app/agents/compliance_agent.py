"""
implementation/compliance_agent.py

Enterprise Healthcare Agent Platform
Compliance Agent

Author : Enterprise Healthcare Agent Platform
"""

from __future__ import annotations

import time
from typing import Dict, Optional

from app.utils.logger import logger

from autogen_agentchat.agents import AssistantAgent
from autogen_ext.models.openai import OpenAIChatCompletionClient

from app.config.llm_config import get_model_client
from app.prompts.compliance_prompt import CompliancePrompt


class ComplianceAgent:
    """
    Enterprise Healthcare Compliance AI Agent

    Responsibilities
    ----------------
    • HIPAA Compliance
    • HITECH Compliance
    • FDA Regulations
    • CMS Compliance
    • GCP Compliance
    • Clinical Documentation Review
    • Coding & Billing Compliance
    • Regulatory Risk Assessment
    • PHI Protection
    • Audit Readiness
    """

    def __init__(self) -> None:
        """Initialize Compliance Agent."""

        logger.info("Initializing Compliance Agent...")

        self.model_client = get_model_client()

        self.agent = AssistantAgent(
            name="ComplianceAgent",
            model_client=self.model_client,
            system_message=CompliancePrompt.get_system_prompt(),
            reflect_on_tool_use=True,
            model_client_stream=False,
        )

        logger.success("Compliance Agent initialized successfully.")

    async def analyze(
        self,
        patient_case: str,
        objective: str,
        additional_context: Optional[str] = None,
    ) -> Dict:
        """
        Perform healthcare compliance analysis.

        Args:
            patient_case: Clinical case
            objective: Compliance objective
            additional_context: Additional business context

        Returns:
            Compliance analysis dictionary
        """

        logger.info("Compliance analysis started.")

        start_time = time.perf_counter()

        try:

            prompt = CompliancePrompt.build_prompt(
                patient_case=patient_case,
                objective=objective,
                additional_context=additional_context,
            )

            logger.debug("Executing Compliance Agent...")

            result = await self.agent.run(task=prompt)

            execution_time = round(
                time.perf_counter() - start_time,
                3,
            )

            response = ""

            if result.messages:
                response = result.messages[-1].content

            logger.success(
                f"Compliance analysis completed "
                f"in {execution_time:.3f} seconds."
            )

            return {
                "agent_name": "Compliance Agent",
                "summary": response,
                "execution_time_seconds": execution_time,
            }

        except Exception as ex:

            logger.exception(
                f"Compliance Agent execution failed: {ex}"
            )

            raise

    async def close(self) -> None:
        """
        Close model client resources.
        """

        logger.info("Closing Compliance Agent...")

        await self.model_client.close()

        logger.success("Compliance Agent closed successfully.")