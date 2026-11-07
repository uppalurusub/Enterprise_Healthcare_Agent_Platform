"""
services/healthcare_service.py

Service Layer for Enterprise Healthcare Agent Platform

Responsibilities
----------------
1. Receive validated request from Router
2. Log request lifecycle
3. Invoke Implementation layer
4. Measure execution time
5. Return response
"""

from time import perf_counter
from typing import Dict

from app.implementation.healthcare_impl import HealthcareImplementation
from app.schemas.request_model import HealthcareRequest
from app.utils.helper import Helper

from app.config.settings import (
    settings,
    usage_capture,
    INPUT_PRICE_PER_1M,
    OUTPUT_PRICE_PER_1M,
)
logger = settings.get_logger()

import mlflow
from datetime import datetime
import time

mlflow.set_tracking_uri(
    "http://localhost:5000"
)

mlflow.set_experiment(
    "Enterprise_Healthcare_Agent_Platform_Interface"
)

class HealthcareService:
    """Service layer for Enterprise Healthcare Agent Platform."""

    def __init__(self) -> None:
        self.implementation = HealthcareImplementation()

    async def execute(
        self,
        request: HealthcareRequest,        
    ) -> Dict:
        """
        Execute Enterprise Healthcare Multi-Agent workflow.

        Args:
            request: HealthcareRequest
            request_id: Unique request identifier

        Returns:
            Dict containing multi-agent analysis results.
        """

        logger.info("=" * 80)
        logger.info("Healthcare Service Execution Started")
        #logger.info(f"Request ID : {request_id}")
        logger.info(f"Objective  : {request.objective}")
        logger.info(f"Human Review Required : {request.require_human_review}")

        start_time = perf_counter()

        try:
            start_time = datetime.now()
            start_ts = time.perf_counter()

            with mlflow.start_run(
                run_name=
                f"Enterprise_Healthcare_Agent_Platform_Execute_{datetime.now().strftime('%Y%m%d_%H%M%S')}"
            ):
                mlflow.log_param("start_time", start_time.isoformat())
                mlflow.set_tag("source", "FastAPI")
                mlflow.set_tag("endpoint", "monitoring/analyze")
                mlflow.set_tag("llm_provider", "OpenRouter")

                with usage_capture() as usage:

                    response = await self.implementation.execute(
                        request=request
                        
                    )

                execution_time = time.perf_counter() - start_ts
                usage_values = usage.as_dict()

                # Log configuration and actual usage separately.
                mlflow.log_param("llm_model", usage_values["model"])
                mlflow.log_param(
                    "input_price_per_1m_usd", INPUT_PRICE_PER_1M
                )
                mlflow.log_param(
                    "output_price_per_1m_usd", OUTPUT_PRICE_PER_1M
                )
                mlflow.log_param("input", request)
                mlflow.log_param("output", response)
                mlflow.log_param("execution_time", execution_time)

                metric_names = (
                    "input_tokens",
                    "output_tokens",
                    "total_tokens",
                    "input_cost_usd",
                    "output_cost_usd",
                    "total_cost_usd",
                    "llm_call_count",
                    "usage_reported_call_count",
                )
                for metric_name in metric_names:
                    mlflow.log_metric(
                        metric_name,
                        float(usage_values[metric_name])
                    )

                mlflow.log_metric(
                    "execution_time_seconds",
                    round(execution_time, 4)
                )

                mlflow.set_tag("llm_usage_source", usage_values["source"])
                mlflow.log_param("end_time", datetime.now().isoformat())

                logger.info(
                    "LLM usage captured: "
                    f"model={usage_values['model']}, "
                    f"input_tokens={usage_values['input_tokens']}, "
                    f"output_tokens={usage_values['output_tokens']}, "
                    f"total_tokens={usage_values['total_tokens']}, "
                    f"input_cost_usd={usage_values['input_cost_usd']:.15f}, "
                    f"output_cost_usd={usage_values['output_cost_usd']:.15f}, "
                    f"total_cost_usd={usage_values['total_cost_usd']:.15f}, "
                    f"llm_call_count={usage_values['llm_call_count']}, "
                    f"usage_reported_call_count="
                    f"{usage_values['usage_reported_call_count']}"
                )

                if usage_values["usage_reported_call_count"] == 0:
                    logger.warning(
                        "No token usage was reported by the AutoGen model "
                        "client. Check that MonitoringImplementation uses "
                        "settings.get_model_client() and that the provider "
                        "returns usage metadata."
                    )

            logger.success(
                f"Healthcare Service completed successfully "
                f"in {execution_time:.3f} seconds."
            )

            return response

        except Exception as ex:

            logger.exception(
                f"Healthcare Service execution failed. "
                #f"Request ID={request_id}"
            )

            raise ex

        finally:

            logger.info(
                f"Service execution completed"
            )

            logger.info("=" * 80)