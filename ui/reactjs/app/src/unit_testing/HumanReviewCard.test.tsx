import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";

import HumanReviewCard from "../components/healthcare/HumanReviewCard";

// --------------------------------------------------------
// Mock ReactMarkdown
// --------------------------------------------------------

vi.mock("react-markdown", () => ({
  default: ({ children }: any) => (
    <div data-testid="markdown">
      {children}
    </div>
  ),
}));

describe("HumanReviewCard", () => {

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  const review = {
    required: true,
    status: "Approved",
    reviewer: "Dr. John Smith",
    reviewed_at: "2026-07-20T10:30:00Z",
    comments:
      "Patient is clinically stable.\n\nContinue monitoring.",

    recommendations: [
      "Continue treatment",
      "Schedule follow-up visit",
    ],
  };

  it("returns null when data is null", () => {

    const { container } = render(
      <HumanReviewCard data={null as any} />
    );

    expect(container.firstChild).toBeNull();

  });

  it("renders page title", () => {

    render(
      <HumanReviewCard data={review} />
    );

    expect(
      screen.getByText("👨‍⚕️ Human Review")
    ).toBeInTheDocument();

  });

  it("shows Required chip", () => {

    render(
      <HumanReviewCard data={review} />
    );

    expect(
      screen.getByText("Required")
    ).toBeInTheDocument();

  });

  it("shows Not Required", () => {

    render(
      <HumanReviewCard
        data={{
          ...review,
          required: false,
        }}
      />
    );

    expect(
      screen.getByText("Not Required")
    ).toBeInTheDocument();

  });

  it("shows Approved status", () => {

    render(
      <HumanReviewCard data={review} />
    );

    expect(
      screen.getByText("Approved")
    ).toBeInTheDocument();

  });

  it("shows Rejected status", () => {

    render(
      <HumanReviewCard
        data={{
          ...review,
          status: "Rejected",
        }}
      />
    );

    expect(
      screen.getByText("Rejected")
    ).toBeInTheDocument();

  });

  it("shows Pending when status missing", () => {

    render(
      <HumanReviewCard
        data={{
          ...review,
          status: undefined,
        }}
      />
    );

    expect(
      screen.getByText("Pending")
    ).toBeInTheDocument();

  });

  it("renders reviewer", () => {

    render(
      <HumanReviewCard data={review} />
    );

    expect(
      screen.getByText("Dr. John Smith")
    ).toBeInTheDocument();

  });

  it("shows Awaiting Assignment", () => {

    render(
      <HumanReviewCard
        data={{
          ...review,
          reviewer: undefined,
        }}
      />
    );

    expect(
      screen.getByText(
        "Awaiting Assignment"
      )
    ).toBeInTheDocument();

  });

  it("renders review date", () => {

    vi.spyOn(
      Date.prototype,
      "toLocaleString"
    ).mockReturnValue(
      "20 Jul 2026 10:30 AM"
    );

    render(
      <HumanReviewCard data={review} />
    );

    expect(
      screen.getByText("Review Date")
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "20 Jul 2026 10:30 AM"
      )
    ).toBeInTheDocument();

  });

  it("does not render review date section", () => {

    render(
      <HumanReviewCard
        data={{
          ...review,
          reviewed_at: undefined,
        }}
      />
    );

    expect(
      screen.queryByText(
        "Review Date"
      )
    ).not.toBeInTheDocument();

  });

  it("renders reviewer comments", () => {

    render(
      <HumanReviewCard data={review} />
    );

    expect(
      screen.getByText(
        "Reviewer Comments"
      )
    ).toBeInTheDocument();

    expect(
      screen.getByTestId(
        "markdown"
      )
    ).toBeInTheDocument();

  });

  it("does not render comments section", () => {

    render(
      <HumanReviewCard
        data={{
          ...review,
          comments: undefined,
        }}
      />
    );

    expect(
      screen.queryByText(
        "Reviewer Comments"
      )
    ).not.toBeInTheDocument();

  });

  it("renders recommendations", () => {

    render(
      <HumanReviewCard data={review} />
    );

    expect(
      screen.getByText(
        "Recommendations"
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "Continue treatment"
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "Schedule follow-up visit"
      )
    ).toBeInTheDocument();

  });

  it("does not render recommendations when empty", () => {

    render(
      <HumanReviewCard
        data={{
          ...review,
          recommendations: [],
        }}
      />
    );

    expect(
      screen.queryByText(
        "Recommendations"
      )
    ).not.toBeInTheDocument();

  });

  it("does not render recommendations when undefined", () => {

    render(
      <HumanReviewCard
        data={{
          ...review,
          recommendations: undefined,
        }}
      />
    );

    expect(
      screen.queryByText(
        "Recommendations"
      )
    ).not.toBeInTheDocument();

  });

  it("renders mandatory fields only", () => {

    render(
      <HumanReviewCard
        data={{
          required: false,
        }}
      />
    );

    expect(
      screen.getByText(
        "Not Required"
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText("Pending")
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "Awaiting Assignment"
      )
    ).toBeInTheDocument();

    expect(
      screen.queryByText(
        "Review Date"
      )
    ).not.toBeInTheDocument();

    expect(
      screen.queryByText(
        "Reviewer Comments"
      )
    ).not.toBeInTheDocument();

    expect(
      screen.queryByText(
        "Recommendations"
      )
    ).not.toBeInTheDocument();

  });

});