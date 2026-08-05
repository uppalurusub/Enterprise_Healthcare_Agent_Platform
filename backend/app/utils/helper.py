"""
utils/helper.py

Reusable helper utilities for the Enterprise Healthcare Agent Platform.
"""

from __future__ import annotations

import json
import uuid
import hashlib
import time
from datetime import datetime, timezone
from typing import Any, Dict, List, Optional


class Helper:
    """Common helper methods used throughout the application."""

    # ------------------------------------------------------------------
    # UUID
    # ------------------------------------------------------------------

    @staticmethod
    def generate_request_id() -> str:
        """Generate a unique request ID."""
        return str(uuid.uuid4())

    @staticmethod
    def generate_session_id() -> str:
        """Generate a unique session ID."""
        return str(uuid.uuid4())

    # ------------------------------------------------------------------
    # Timestamp
    # ------------------------------------------------------------------

    @staticmethod
    def utc_now() -> str:
        """Return current UTC timestamp in ISO-8601 format."""
        return datetime.now(timezone.utc).isoformat()

    @staticmethod
    def current_timestamp() -> int:
        """Return Unix timestamp."""
        return int(time.time())

    # ------------------------------------------------------------------
    # JSON Helpers
    # ------------------------------------------------------------------

    @staticmethod
    def to_json(data: Any, indent: int = 4) -> str:
        """Convert Python object to JSON string."""
        return json.dumps(data, indent=indent, default=str)

    @staticmethod
    def from_json(data: str) -> Dict:
        """Convert JSON string into dictionary."""
        return json.loads(data)

    # ------------------------------------------------------------------
    # Hashing
    # ------------------------------------------------------------------

    @staticmethod
    def sha256(text: str) -> str:
        """Generate SHA256 hash."""
        return hashlib.sha256(text.encode()).hexdigest()

    # ------------------------------------------------------------------
    # Prompt Helpers
    # ------------------------------------------------------------------

    @staticmethod
    def build_prompt(
        patient_case: str,
        objective: str,
        additional_context: Optional[str] = None,
    ) -> str:
        """Build standardized prompt for AutoGen agents."""

        prompt = f"""
Patient Case:
{patient_case}

Objective:
{objective}
"""

        if additional_context:
            prompt += f"""

Additional Context:
{additional_context}
"""

        return prompt.strip()

    # ------------------------------------------------------------------
    # Response Formatter
    # ------------------------------------------------------------------

    @staticmethod
    def success_response(
        data: Any,
        message: str = "Success",
        request_id: Optional[str] = None,
    ) -> Dict:

        return {
            "status": "success",
            "message": message,
            "request_id": request_id,
            "timestamp": Helper.utc_now(),
            "data": data,
        }

    @staticmethod
    def error_response(
        error: str,
        request_id: Optional[str] = None,
    ) -> Dict:

        return {
            "status": "error",
            "error": error,
            "request_id": request_id,
            "timestamp": Helper.utc_now(),
        }

    # ------------------------------------------------------------------
    # Agent Utilities
    # ------------------------------------------------------------------

    @staticmethod
    def merge_agent_outputs(outputs: List[Dict]) -> Dict:
        """
        Merge multiple agent outputs into one dictionary.
        """

        merged = {}

        for output in outputs:
            merged.update(output)

        return merged

    @staticmethod
    def clean_text(text: str) -> str:
        """Clean whitespace from agent responses."""

        return " ".join(text.split())

    # ------------------------------------------------------------------
    # Human Review
    # ------------------------------------------------------------------

    @staticmethod
    def review_required(flag: bool) -> str:

        return "Required" if flag else "Not Required"

    # ------------------------------------------------------------------
    # Validation
    # ------------------------------------------------------------------

    @staticmethod
    def validate_patient_case(case: str) -> bool:

        return bool(case and case.strip())

    @staticmethod
    def validate_objective(objective: str) -> bool:

        return bool(objective and objective.strip())

    # ------------------------------------------------------------------
    # Execution Metrics
    # ------------------------------------------------------------------

    @staticmethod
    def execution_time(start_time: float) -> float:
        """Calculate execution time in seconds."""

        return round(time.time() - start_time, 3)

    # ------------------------------------------------------------------
    # Metadata
    # ------------------------------------------------------------------

    @staticmethod
    def build_metadata(
        agent_name: str,
        execution_time: float,
        request_id: str,
    ) -> Dict:

        return {
            "agent": agent_name,
            "request_id": request_id,
            "execution_time_seconds": execution_time,
            "generated_at": Helper.utc_now(),
        }