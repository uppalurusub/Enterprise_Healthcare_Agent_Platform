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
from app.models.request_model import HealthcareRequest
from app.utils.helper import Helper
from app.utils.logger import logger
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
            start_time1 = datetime.now()
            #start_ts = time.time()

            with mlflow.start_run(
                run_name=
                f"Enterprise_Healthcare_Agent_Platform_Execute_{datetime.now().strftime('%Y%m%d_%H%M%S')}"
            ):
                # Log to MLflow
                mlflow.log_param(
                    "start_time",
                    start_time1.strftime("%Y-%m-%d %H:%M:%S")
                )
                mlflow.log_param(
                    "input_text",
                    request
                )

                response = await self.implementation.execute(
                    request=request
                    
                )

                mlflow.log_param(
                    "response",
                    response
                )

                mlflow.set_tag(
                    "source",
                    "FastAPI"
                )

                mlflow.set_tag(
                    "endpoint",
                    "agents/enterprise-healthcare-platform"
                )



                end_time = datetime.now()
                #end_ts = time.time()

                #execution_time = end_ts - start_ts
                execution_time = Helper.execution_time(start_time)

                mlflow.log_param(
                    "end_time",
                    end_time.strftime("%Y-%m-%d %H:%M:%S")
                )

                mlflow.log_metric(
                    "execution_time_seconds",
                    round(execution_time, 4)
                )

            #execution_time = Helper.execution_time(start_time)

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