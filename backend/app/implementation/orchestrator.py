"""
implementation/orchestrator.py

Enterprise Healthcare Agent Platform
AutoGen Agent Orchestrator

Author : Enterprise Healthcare Agent Platform
"""

from __future__ import annotations

import asyncio
import time
from typing import Dict

from app.utils.logger import logger

from app.agents.clinical_agent import ClinicalAgent
from app.agents.financial_agent import FinancialAgent
from app.agents.research_agent import ResearchAgent
from app.agents.compliance_agent import ComplianceAgent
from app.agents.executive_agent import ExecutiveAgent


class HealthcareOrchestrator:
    """
    Enterprise Healthcare Multi-Agent Orchestrator

    Responsibilities
    ----------------
    • Coordinate all AI agents
    • Execute independent agents concurrently
    • Aggregate results
    • Invoke Executive Agent
    • Manage agent lifecycle
    """

    def __init__(self) -> None:

        logger.info("Initializing Healthcare Orchestrator...")

        self.clinical_agent = ClinicalAgent()
        self.financial_agent = FinancialAgent()
        self.research_agent = ResearchAgent()
        self.compliance_agent = ComplianceAgent()
        self.executive_agent = ExecutiveAgent()

        logger.success("Healthcare Orchestrator initialized successfully.")

    async def execute(
        self,
        patient_case: str,
        objective: str,
        additional_context: str | None = None,
    ) -> Dict:
        """
        Execute complete multi-agent workflow.

        Returns
        -------
        Dict
            Aggregated results from all agents.
        """

        logger.info("Healthcare orchestration started.")

        start_time = time.perf_counter()

        try:

            logger.info(
                "Executing Clinical, Financial, Research "
                "and Compliance agents concurrently..."
            )

            (
                clinical_result,
                financial_result,
                research_result,
                compliance_result,
            ) = await asyncio.gather(

                self.clinical_agent.analyze(
                    patient_case,
                    objective,
                    additional_context,
                ),

                self.financial_agent.analyze(
                    patient_case,
                    objective,
                    additional_context,
                ),

                self.research_agent.analyze(
                    patient_case,
                    objective,
                    additional_context,
                ),

                self.compliance_agent.analyze(
                    patient_case,
                    objective,
                    additional_context,
                ),
            )

            logger.info("Generating executive summary...")

            executive_result = await self.executive_agent.analyze(

                clinical_analysis=clinical_result["summary"],

                financial_analysis=financial_result["summary"],

                research_summary=research_result["summary"],

                compliance_review=compliance_result["summary"],

                objective=objective,

                additional_context=additional_context,
            )

            total_execution = round(
                time.perf_counter() - start_time,
                3,
            )

            logger.success(
                f"Healthcare orchestration completed "
                f"in {total_execution:.3f} seconds."
            )

            return {

                "clinical_analysis": clinical_result,

                "financial_analysis": financial_result,

                "research_summary": research_result,

                "compliance_review": compliance_result,

                "executive_summary": executive_result,

                "execution_time_seconds": total_execution,
            }

        except Exception as ex:

            logger.exception(
                f"Healthcare orchestration failed: {ex}"
            )

            raise

    async def close(self) -> None:
        """
        Close all AutoGen model clients.
        """

        logger.info("Closing all agents...")

        await asyncio.gather(

            self.clinical_agent.close(),

            self.financial_agent.close(),

            self.research_agent.close(),

            self.compliance_agent.close(),

            self.executive_agent.close(),
        )

        logger.success("All agents closed successfully.")