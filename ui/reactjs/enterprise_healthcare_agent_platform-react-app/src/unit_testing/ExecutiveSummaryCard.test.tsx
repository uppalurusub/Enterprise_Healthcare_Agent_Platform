import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";

import ExecutiveSummaryCard from "../components/healthcare/ExecutiveSummaryCard";
import { formatReport } from "../utils/reportFormatter";

// ----------------------------------------------------------------
// Mock formatter
// ----------------------------------------------------------------

vi.mock("../utils/reportFormatter", () => ({
  formatReport: vi.fn((text: string) => text),
}));

// ----------------------------------------------------------------
// Mock ReportViewer
// ----------------------------------------------------------------

vi.mock("../components/common/ReportViewer", () => ({
  default: ({ content }: any) => (
    <div data-testid="report-viewer">
      {content}
    </div>
  ),
}));

// ----------------------------------------------------------------

const executiveSummary = {
  agent_name: "Executive Agent",

  summary:
    "Patient is clinically stable with moderate financial risk.",

  execution_time_seconds: 2.35,

  confidence_score: 0.96,

  recommendations: [
    "Continue monitoring",
    "Review medications",
  ],
};

describe("ExecutiveSummaryCard", () => {

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns null when data is null", () => {

    const { container } = render(
      <ExecutiveSummaryCard data={null as any} />
    );

    expect(container.firstChild).toBeNull();

  });

  it("renders page heading", () => {

    render(
      <ExecutiveSummaryCard
        data={executiveSummary}
      />
    );

    expect(
      screen.getByText("🎯 Executive Summary")
    ).toBeInTheDocument();

  });

  it("renders agent information", () => {
    render(
        <ExecutiveSummaryCard
            data={executiveSummary}
        />
    );

    expect(
        screen.getAllByText("Executive Agent")
    ).toHaveLength(2);
  });

  it("renders execution time", () => {

    render(
      <ExecutiveSummaryCard
        data={executiveSummary}
      />
    );

    expect(
      screen.getByText("2.35 sec")
    ).toBeInTheDocument();

  });

  it("renders confidence score", () => {

    render(
      <ExecutiveSummaryCard
        data={executiveSummary}
      />
    );

    expect(
      screen.getByText("96%")
    ).toBeInTheDocument();

  });

  it("shows N/A when confidence is missing", () => {

    render(
      <ExecutiveSummaryCard
        data={{
          ...executiveSummary,
          confidence_score: undefined,
        }}
      />
    );

    expect(
      screen.getByText("N/A")
    ).toBeInTheDocument();

  });

  it("renders Executive Assessment section", () => {

    render(
      <ExecutiveSummaryCard
        data={executiveSummary}
      />
    );

    expect(
      screen.getByText("Executive Assessment")
    ).toBeInTheDocument();

  });

  it("renders ReportViewer", () => {

    render(
      <ExecutiveSummaryCard
        data={executiveSummary}
      />
    );

    expect(
      screen.getByTestId("report-viewer")
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        executiveSummary.summary
      )
    ).toBeInTheDocument();

  });

  it("calls formatReport", () => {

    render(
      <ExecutiveSummaryCard
        data={executiveSummary}
      />
    );

    expect(formatReport).toHaveBeenCalledTimes(1);

    expect(formatReport).toHaveBeenCalledWith(
      executiveSummary.summary
    );

  });

  it("renders recommendations section", () => {

    render(
      <ExecutiveSummaryCard
        data={executiveSummary}
      />
    );

    expect(
      screen.getByText("Recommendations")
    ).toBeInTheDocument();

    expect(
      screen.getByText("• Continue monitoring")
    ).toBeInTheDocument();

    expect(
      screen.getByText("• Review medications")
    ).toBeInTheDocument();

  });

  it("does not render recommendations when empty", () => {

    render(
      <ExecutiveSummaryCard
        data={{
          ...executiveSummary,
          recommendations: [],
        }}
      />
    );

    expect(
      screen.queryByText("Recommendations")
    ).not.toBeInTheDocument();

  });

  it("does not render recommendations when undefined", () => {

    render(
      <ExecutiveSummaryCard
        data={{
          ...executiveSummary,
          recommendations: undefined,
        }}
      />
    );

    expect(
      screen.queryByText("Recommendations")
    ).not.toBeInTheDocument();

  });

  it("renders mandatory fields only", () => {

    render(
        <ExecutiveSummaryCard
            data={{
                agent_name: "Executive Agent",
                summary: "Summary",
                execution_time_seconds: 1,
            }}
        />
      );

    expect(
        screen.getAllByText("Executive Agent")
    ).toHaveLength(2);

    expect(
        screen.getByText("1 sec")
    ).toBeInTheDocument();

    expect(
        screen.getByText("N/A")
    ).toBeInTheDocument();

    expect(
        screen.queryByText("Recommendations")
    ).not.toBeInTheDocument();

  });

});