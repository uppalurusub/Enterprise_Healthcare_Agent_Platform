import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";

import AgentAnalysisCard from "../components/healthcare/AgentAnalysisCard";

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

const analysis = {
  agent_name: "Clinical Agent",

  summary: "Patient is stable.",

  execution_time_seconds: 2.5,

  confidence_score: 96,

  recommendations: [
    "Monitor blood pressure",
    "Repeat laboratory tests"
  ],

  references: [
    "WHO Guidelines",
    "ACC/AHA 2025"
  ],
};

describe("AgentAnalysisCard", () => {

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns null when data is missing", () => {

    const { container } = render(

      <AgentAnalysisCard
        title="Clinical Analysis"
        data={null as any}
      />

    );

    expect(container.firstChild).toBeNull();

  });

  it("renders title", () => {

    render(
      <AgentAnalysisCard
        title="Clinical Analysis"
        data={analysis}
      />
    );

    expect(
      screen.getByText("Clinical Analysis")
    ).toBeInTheDocument();

  });

  it("renders agent name", () => {

    render(
      <AgentAnalysisCard
        title="Clinical Analysis"
        data={analysis}
      />
    );

    expect(
      screen.getByText("Clinical Agent")
    ).toBeInTheDocument();

  });

  it("renders execution time", () => {

    render(
      <AgentAnalysisCard
        title="Clinical Analysis"
        data={analysis}
      />
    );

    expect(
      screen.getByText("2.5 sec")
    ).toBeInTheDocument();

  });

  it("renders ReportViewer", () => {

    render(
      <AgentAnalysisCard
        title="Clinical Analysis"
        data={analysis}
      />
    );

    expect(
      screen.getByTestId("report-viewer")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Patient is stable.")
    ).toBeInTheDocument();

  });

  it("renders recommendations", () => {

    render(
      <AgentAnalysisCard
        title="Clinical Analysis"
        data={analysis}
      />
    );

    expect(
      screen.getByText("Recommendations")
    ).toBeInTheDocument();

    expect(
      screen.getByText("• Monitor blood pressure")
    ).toBeInTheDocument();

    expect(
      screen.getByText("• Repeat laboratory tests")
    ).toBeInTheDocument();

  });

  it("renders references", () => {

    render(
      <AgentAnalysisCard
        title="Clinical Analysis"
        data={analysis}
      />
    );

    expect(
      screen.getByText("References")
    ).toBeInTheDocument();

    expect(
      screen.getByText("WHO Guidelines")
    ).toBeInTheDocument();

    expect(
      screen.getByText("ACC/AHA 2025")
    ).toBeInTheDocument();

  });

  it("does not render recommendations section", () => {

    render(
      <AgentAnalysisCard
        title="Clinical Analysis"
        data={{
          ...analysis,
          recommendations: [],
        }}
      />
    );

    expect(
      screen.queryByText("Recommendations")
    ).not.toBeInTheDocument();

  });

  it("does not render references section", () => {

    render(
      <AgentAnalysisCard
        title="Clinical Analysis"
        data={{
          ...analysis,
          references: [],
        }}
      />
    );

    expect(
      screen.queryByText("References")
    ).not.toBeInTheDocument();

  });

  it("renders only mandatory fields", () => {

    render(
      <AgentAnalysisCard
        title="Clinical Analysis"
        data={{
          agent_name: "Clinical Agent",
          summary: "Normal",
          execution_time_seconds: 1,
        }}
      />
    );

    expect(
      screen.getByText("Clinical Agent")
    ).toBeInTheDocument();

    expect(
      screen.getByText("1 sec")
    ).toBeInTheDocument();

    expect(
      screen.queryByText("Recommendations")
    ).not.toBeInTheDocument();

    expect(
      screen.queryByText("References")
    ).not.toBeInTheDocument();

  });

});