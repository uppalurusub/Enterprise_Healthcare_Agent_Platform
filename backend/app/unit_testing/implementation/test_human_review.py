import pytest
from unittest.mock import AsyncMock

from app.implementation.human_review import HumanReviewer


@pytest.fixture
def reviewer():

    return HumanReviewer()


@pytest.mark.asyncio
async def test_review_success(
    reviewer,
):

    reviewer.agent = AsyncMock()

    reviewer.agent.run.return_value.messages = []

    result = await reviewer.review(
        executive_summary="Executive Summary",
        require_review=True,
        reviewer_name="Dr. Smith",
        decision="approved",
        comments="Approved for execution",
    )

    assert result is not None






@pytest.mark.asyncio
async def test_large_review(
    reviewer,
):

    reviewer.agent = AsyncMock()

    reviewer.agent.run.return_value.messages = []

    large = "Clinical " * 5000

    result = await reviewer.review(
        executive_summary=large,
        require_review=True,
        reviewer_name="QA",
        decision="approved",
        comments=large,
    )

    assert result is not None