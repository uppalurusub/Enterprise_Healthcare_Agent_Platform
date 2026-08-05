"""
router/healthcare_router.py

Enterprise Healthcare Agent Platform
FastAPI Router Layer

Responsibilities
----------------
1. Receive API Requests
2. Validate Request
3. Invoke Service Layer
4. Return Response
"""

from fastapi import APIRouter, HTTPException, status
from fastapi.responses import JSONResponse

from app.models.request_model import HealthcareRequest
from app.services.healthcare_service import HealthcareService
from app.utils.helper import Helper
from app.utils.logger import logger



router = APIRouter(
    prefix="/agents",
    tags=["Enterprise Healthcare Agent Platform"]
)

service = HealthcareService()


# ---------------------------------------------------------------------
# Health Check
# ---------------------------------------------------------------------
@router.get(
    "/health",
    summary="Health Check",
    description="Checks whether the Enterprise Healthcare Agent Platform is running."
)
async def health_check():

    return {
        "status": "UP",
        "service": "Enterprise Healthcare Agent Platform",
        "timestamp": Helper.utc_now()
    }


# ---------------------------------------------------------------------
# Execute Multi-Agent Workflow
# ---------------------------------------------------------------------
@router.post(
    "/enterprise-healthcare-platform",
    summary="Enterprise Healthcare Multi-Agent Execution",
    description="Executes the Clinical, Financial, Research, Compliance, and Executive AutoGen agents."
)
async def execute_platform(request: HealthcareRequest):

    request_id = Helper.generate_request_id()

    logger.info(f"Request Received : {request_id}")

    try:

        # ----------------------------
        # Validation
        # ----------------------------
        if not Helper.validate_patient_case(request.patient_case):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="patient_case cannot be empty."
            )

        if not Helper.validate_objective(request.objective):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="objective cannot be empty."
            )

        logger.info("Validation Successful")

        # ----------------------------
        # Call Service Layer
        # ----------------------------
        response = await service.execute(
            request=request
            
        )

        logger.info(f"Execution Completed : {request_id}")

        return response

        

    except HTTPException as ex:

        logger.error(str(ex.detail))

        raise ex

    except Exception as ex:

        logger.exception(ex)

        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content=Helper.error_response(
                error=str(ex),
                request_id=request_id
            )
        )


# ---------------------------------------------------------------------
# Platform Information
# ---------------------------------------------------------------------
@router.get(
    "/info",
    summary="Platform Information"
)
async def platform_info():

    return {
        "application": "Enterprise Healthcare Agent Platform",
        "version": "1.0.0",
        "framework": "FastAPI",
        "multi_agent_framework": "Microsoft AutoGen",
        "architecture": "Router -> Service -> Implementation",
        "agents": [
            "Clinical Agent",
            "Financial Agent",
            "Research Agent",
            "Compliance Agent",
            "Executive Agent"
        ],
        "skills": [
            "Agent Orchestration",
            "Human-in-the-Loop"
        ]
    }


# ---------------------------------------------------------------------
# List Available Agents
# ---------------------------------------------------------------------
@router.get(
    "/agents",
    summary="Available Agents"
)
async def available_agents():

    return {
        "total_agents": 5,
        "agents": [
            {
                "name": "Clinical Agent",
                "role": "Clinical Decision Support"
            },
            {
                "name": "Financial Agent",
                "role": "Healthcare Finance"
            },
            {
                "name": "Research Agent",
                "role": "Medical Research"
            },
            {
                "name": "Compliance Agent",
                "role": "Healthcare Compliance"
            },
            {
                "name": "Executive Agent",
                "role": "Executive Decision Support"
            }
        ]
    }