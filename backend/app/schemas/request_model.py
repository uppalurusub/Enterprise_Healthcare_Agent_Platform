"""
models/request_model.py

Request models for Enterprise Healthcare Agent Platform
"""

from typing import Optional

from pydantic import BaseModel, Field, ConfigDict


class HealthcareRequest(BaseModel):
    """
    Request model for executing the Enterprise Healthcare
    Multi-Agent workflow.
    """

    model_config = ConfigDict(
        json_schema_extra={
            "example": {
                "patient_case": (
                    "65-year-old male with Type 2 Diabetes, "
                    "Stage 3 CKD, Hypertension, and elevated HbA1c."
                ),
                "objective": (
                    "Generate multidisciplinary clinical, financial, "
                    "research, compliance, and executive recommendations."
                ),
                "additional_context": (
                    "Patient has Medicare coverage and a history of "
                    "medication non-adherence."
                ),
                "require_human_review": True,
                "session_id": "session-001"
            }
        }
    )

    patient_case: str = Field(
        ...,
        min_length=10,
        max_length=10000,
        description="Detailed patient case or clinical scenario."
    )

    objective: str = Field(
        ...,
        min_length=5,
        max_length=1000,
        description="Objective or task for the multi-agent platform."
    )

    additional_context: Optional[str] = Field(
        default=None,
        max_length=5000,
        description="Optional supporting clinical or operational context."
    )

    require_human_review: bool = Field(
        default=False,
        description="Whether the final response requires Human-in-the-Loop approval."
    )

    session_id: Optional[str] = Field(
        default=None,
        description="Optional client session identifier."
    )