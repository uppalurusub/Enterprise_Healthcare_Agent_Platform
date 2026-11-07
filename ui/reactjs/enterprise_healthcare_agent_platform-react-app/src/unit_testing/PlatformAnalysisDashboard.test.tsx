import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";

import PlatformAnalysisDashboard from "../components/healthcare/PlatformAnalysisDashboard";

// ------------------------------------------------------------------
// Child component mocks
// ------------------------------------------------------------------

vi.mock("../components/healthcare/MetadataCard", () => ({
  default: ({ data }: any) => (
    <div data-testid="metadata-card">
      Metadata {JSON.stringify(data)}
    </div>
  ),
}));

vi.mock("../components/healthcare/ExecutiveSummaryCard", () => ({
  default: ({ data }: any) => (
    <div data-testid="executive-card">
      Executive {JSON.stringify(data)}
    </div>
  ),
}));

vi.mock("../components/healthcare/AgentAnalysisCard", () => ({
  default: ({ title }: any) => (
    <div data-testid="agent-card">
      {title}
    </div>
  ),
}));

vi.mock("../components/healthcare/HumanReviewCard", () => ({
  default: ({ data }: any) => (
    <div data-testid="human-review-card">
      Human Review {JSON.stringify(data)}
    </div>
  ),
}));

// ------------------------------------------------------------------

const response = {
  metadata: {
    id: "CASE-001",
  },

  executive_summary: {
    summary: "Executive Summary",
  },

  clinical_analysis: {
    score: 90,
  },

  financial_analysis: {
    cost: 1000,
  },

  research_summary: {
    evidence: [],
  },

  compliance_review: {
    status: "PASS",
  },

  human_review: {
    reviewer: "Doctor",
  },
};

describe("PlatformAnalysisDashboard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders loading state", () => {
    render(<PlatformAnalysisDashboard loading />);

    expect(
      screen.getByText(
        /Running Enterprise Healthcare Analysis/i
      )
    ).toBeInTheDocument();

    expect(
      screen.getByRole("progressbar")
    ).toBeInTheDocument();
  });

  it("renders error state", () => {
    render(
      <PlatformAnalysisDashboard
        error="Something went wrong"
      />
    );

    expect(
      screen.getByText("Something went wrong")
    ).toBeInTheDocument();
  });

  it("renders empty state", () => {
    render(<PlatformAnalysisDashboard />);

    expect(
      screen.getByText(
        /Submit a patient case/i
      )
    ).toBeInTheDocument();
  });

  it("renders page heading", () => {
    render(
      <PlatformAnalysisDashboard
        response={response}
      />
    );

    expect(
      screen.getByText(
        "🏥 Enterprise Healthcare Platform Analysis"
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        /Comprehensive multi-agent healthcare analysis dashboard/i
      )
    ).toBeInTheDocument();
  });

  it("renders metadata card", () => {
    render(
      <PlatformAnalysisDashboard
        response={response}
      />
    );

    expect(
      screen.getByTestId("metadata-card")
    ).toBeInTheDocument();
  });

  it("renders executive summary", () => {
    render(
      <PlatformAnalysisDashboard
        response={response}
      />
    );

    expect(
      screen.getByTestId("executive-card")
    ).toBeInTheDocument();
  });

  it("renders all analysis cards", () => {
    render(
      <PlatformAnalysisDashboard
        response={response}
      />
    );

    expect(
      screen.getByText("🩺 Clinical Analysis")
    ).toBeInTheDocument();

    expect(
      screen.getByText("💰 Financial Analysis")
    ).toBeInTheDocument();

    expect(
      screen.getByText("🔬 Research Summary")
    ).toBeInTheDocument();

    expect(
      screen.getByText("⚖️ Compliance Review")
    ).toBeInTheDocument();

    expect(
      screen.getAllByTestId("agent-card")
    ).toHaveLength(4);
  });

  it("renders human review", () => {
    render(
      <PlatformAnalysisDashboard
        response={response}
      />
    );

    expect(
      screen.getByTestId("human-review-card")
    ).toBeInTheDocument();
  });

  it("does not render optional cards when response sections are missing", () => {
    render(
      <PlatformAnalysisDashboard
        response={{}}
      />
    );

    expect(
      screen.queryByTestId("metadata-card")
    ).not.toBeInTheDocument();

    expect(
      screen.queryByTestId("executive-card")
    ).not.toBeInTheDocument();

    expect(
      screen.queryByTestId("agent-card")
    ).not.toBeInTheDocument();

    expect(
      screen.queryByTestId("human-review-card")
    ).not.toBeInTheDocument();
  });

  it("renders only metadata when only metadata exists", () => {
    render(
      <PlatformAnalysisDashboard
        response={{
          metadata: {
            id: "1",
          },
        }}
      />
    );

    expect(
      screen.getByTestId("metadata-card")
    ).toBeInTheDocument();

    expect(
      screen.queryByTestId("executive-card")
    ).not.toBeInTheDocument();

    expect(
      screen.queryByTestId("agent-card")
    ).not.toBeInTheDocument();

    expect(
      screen.queryByTestId("human-review-card")
    ).not.toBeInTheDocument();
  });
});