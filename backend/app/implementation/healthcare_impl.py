"""
implementation/healthcare_impl.py

Enterprise Healthcare Agent Platform

Implementation Layer

Responsibilities
----------------
1. Coordinate the complete healthcare workflow
2. Invoke AutoGen Healthcare Orchestrator
3. Perform Human Review (optional)
4. Build HealthcareResponse
5. Generate execution metadata
6. Handle exceptions
7. Cleanup AutoGen resources

Compatible with:
    • AutoGen AgentChat 0.7.5
    • FastAPI
    • Pydantic v2
    • Loguru
"""

from __future__ import annotations

import time
from datetime import datetime, timezone
from typing import Optional

from app.utils.logger import logger

from app.implementation.orchestrator import HealthcareOrchestrator
from app.implementation.human_review import HumanReviewer

from app.models.request_model import HealthcareRequest

from app.models.response_model import (
    AgentResponse,
    HealthcareResponse,
    HumanReview,
    Metadata,
)

from app.utils.helper import Helper
import traceback

class HealthcareImplementation:
    """
    Enterprise Healthcare Implementation Layer.

    This class is responsible for coordinating the
    entire enterprise healthcare workflow.

    Workflow
    --------
        Request

            │

            ▼

        Healthcare Orchestrator

            │

            ▼

      Clinical Agent
      Financial Agent
      Research Agent
      Compliance Agent

            │

            ▼

       Executive Agent

            │

            ▼

      Human Review (Optional)

            │

            ▼

      HealthcareResponse
    """

    def __init__(self) -> None:
        """
        Initialize implementation layer.
        """

        logger.info(
            "Initializing Healthcare Implementation..."
        )

        self.orchestrator = HealthcareOrchestrator()

        self.human_reviewer = HumanReviewer()

        logger.success(
            "Healthcare Implementation initialized successfully."
        )

    async def execute(
        self,
        request: HealthcareRequest,
    ) -> HealthcareResponse:
        """
        Execute complete enterprise healthcare workflow.

        Parameters
        ----------
        request : HealthcareRequest

        Returns
        -------
        HealthcareResponse
        """

        start_time = time.perf_counter()

        request_id = Helper.generate_request_id()

        logger.info(
            f"Healthcare Request Started | Request ID={request_id}"
        )

        logger.debug(
            f"Patient Case: {request.patient_case[:200]}"
        )

        try:

            #
            # Orchestration starts here...
            #
            logger.info(
                "Executing Healthcare Orchestrator..."
            )

            orchestration_result = await self.orchestrator.execute(
                patient_case=request.patient_case,
                objective=request.objective,
                additional_context=request.additional_context,
            )

            logger.success(
                "Healthcare orchestration completed successfully."
            )

            logger.info(
                "Processing Human Review..."
            )

            human_review_result = await self.human_reviewer.review(
                executive_summary=orchestration_result[
                    "executive_summary"
                ]["summary"],
                require_review=request.require_human_review,
                reviewer_name=None,
                decision="pending"
                if request.require_human_review
                else None,
                comments=None,
            )

            logger.success(
                "Human review workflow completed."
            )

            execution_time = round(
                time.perf_counter() - start_time,
                3,
            )

            logger.info(
                f"Total execution time: "
                f"{execution_time:.3f} seconds"
            )

            logger.debug(
                "Preparing HealthcareResponse..."
            )

            clinical_agent = AgentResponse(
                agent_name=orchestration_result[
                    "clinical_analysis"
                ]["agent_name"],
                summary=orchestration_result[
                    "clinical_analysis"
                ]["summary"],
                execution_time_seconds=orchestration_result[
                    "clinical_analysis"
                ]["execution_time_seconds"],
            )

            financial_agent = AgentResponse(
                agent_name=orchestration_result[
                    "financial_analysis"
                ]["agent_name"],
                summary=orchestration_result[
                    "financial_analysis"
                ]["summary"],
                execution_time_seconds=orchestration_result[
                    "financial_analysis"
                ]["execution_time_seconds"],
            )

            research_agent = AgentResponse(
                agent_name=orchestration_result[
                    "research_summary"
                ]["agent_name"],
                summary=orchestration_result[
                    "research_summary"
                ]["summary"],
                execution_time_seconds=orchestration_result[
                    "research_summary"
                ]["execution_time_seconds"],
            )

            compliance_agent = AgentResponse(
                agent_name=orchestration_result[
                    "compliance_review"
                ]["agent_name"],
                summary=orchestration_result[
                    "compliance_review"
                ]["summary"],
                execution_time_seconds=orchestration_result[
                    "compliance_review"
                ]["execution_time_seconds"],
            )

            executive_agent = AgentResponse(
                agent_name=orchestration_result[
                    "executive_summary"
                ]["agent_name"],
                summary=orchestration_result[
                    "executive_summary"
                ]["summary"],
                execution_time_seconds=orchestration_result[
                    "executive_summary"
                ]["execution_time_seconds"],
            )

            logger.success(
                "Agent response objects created successfully."
            )

                    #
            # ---------------------------------------------------------
            # Human Review Model
            # ---------------------------------------------------------
            #

            

            human_review = HumanReview(
                required=human_review_result["required"],
                status=human_review_result["status"],
                reviewer_comments=human_review_result.get("comments")
            )

            logger.debug(
                "HumanReview model created successfully."
            )

            #
            # ---------------------------------------------------------
            # Metadata
            # ---------------------------------------------------------
            #

            
            metadata = Metadata(
                request_id=request_id,
                session_id=request.session_id,
                generated_at=datetime.now(timezone.utc).isoformat(),
                total_execution_time_seconds=execution_time,
            )

            logger.debug(
                "Metadata generated successfully."
            )

            #
            # ---------------------------------------------------------
            # Build HealthcareResponse
            # ---------------------------------------------------------
            #

            response = HealthcareResponse(

                #success=True,
                status="success",

                message=(
                    "Enterprise healthcare analysis "
                    "completed successfully."
                ),

                metadata=metadata,

                clinical_analysis=clinical_agent,

                financial_analysis=financial_agent,

                research_summary=research_agent,

                compliance_review=compliance_agent,

                executive_summary=executive_agent,

                human_review=human_review,
            )

            logger.success(
                "HealthcareResponse created successfully."
            )

            logger.info(
                f"Healthcare request completed "
                f"| Request ID={request_id}"
            )

            #
            # ---------------------------------------------------------
            # Cleanup AutoGen Resources
            # ---------------------------------------------------------
            #

            logger.info(
                "Closing AutoGen model clients..."
            )

            await self.orchestrator.close()

            logger.success(
                "All AutoGen resources released."
            )

            
            

            execution_time = round(
                time.perf_counter() - start_time,
                3,
            )

            return response
            
        except Exception as ex:

            traceback.print_exc()

            status="Failed",

            logger.exception("Exception Occurred: ",ex.__str__)

            logger.exception(
                            "Healthcare workflow failed "
                            f"| Request ID={request_id}"
                        )
            #raise
            return Helper.error_response(
                error=str(ex)
            )
        

        except Exception as cleanup_error:

            status="Failed",

            logger.warning(
                "Error during orchestrator cleanup: "
                f"{cleanup_error}"
            )

        finally:

                logger.info(
                    "Starting HealthcareImplementation cleanup..."
                )                