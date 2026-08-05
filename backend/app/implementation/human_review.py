"""
implementation/human_review.py

Enterprise Healthcare Agent Platform
Human Review (Human-in-the-Loop)

Author : Enterprise Healthcare Agent Platform
"""

from __future__ import annotations

import time
from typing import Dict, Optional

from app.utils.logger import logger


class HumanReviewer:
    """
    Human-in-the-Loop (HITL) Review Component.

    Responsibilities
    ----------------
    • Human Approval
    • Human Rejection
    • Request for Revision
    • Audit Logging
    """

    VALID_DECISIONS = {
        "approved",
        "rejected",
        "needs_revision",
        "pending",
    }

    def __init__(self) -> None:

        logger.info("Initializing Human Reviewer...")

        logger.success("Human Reviewer initialized successfully.")

    async def review(
        self,
        executive_summary: str,
        require_review: bool,
        reviewer_name: Optional[str] = None,
        decision: Optional[str] = None,
        comments: Optional[str] = None,
    ) -> Dict:
        """
        Review executive recommendation.

        Args:
            executive_summary: Executive Agent output
            require_review: Whether review is required
            reviewer_name: Reviewer name
            decision: approved | rejected | needs_revision
            comments: Reviewer comments

        Returns:
            Human review result
        """

        logger.info("Human review started.")

        start = time.perf_counter()

        try:

            if not require_review:

                logger.info("Human review skipped.")

                return {
                    "required": False,
                    "status": "Not Required",
                    "reviewer": None,
                    "comments": None,
                    "execution_time_seconds": 0.0,
                }

            logger.debug("Executive summary received for review.")

            if decision is None:
                decision = "pending"

            decision = decision.lower()

            if decision not in self.VALID_DECISIONS:
                raise ValueError(
                    f"Invalid decision '{decision}'. "
                    f"Allowed values: {sorted(self.VALID_DECISIONS)}"
                )

            execution_time = round(
                time.perf_counter() - start,
                3,
            )

            logger.success(
                f"Human review completed "
                f"with status '{decision}'."
            )

            return {
                "required": True,
                "status": decision.title().replace("_", " "),
                "reviewer": reviewer_name,
                "comments": comments,
                "reviewed_summary": executive_summary,
                "execution_time_seconds": execution_time,
            }

        except Exception as ex:

            logger.exception(
                f"Human review failed : {ex}"
            )

            raise