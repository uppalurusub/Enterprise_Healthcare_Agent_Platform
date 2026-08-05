import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";

import AgentsInfoCard from "../components/healthcare/AgentsInfoCard";

// ---------------------------------------------------------
// Mock MarkdownCard
// ---------------------------------------------------------

vi.mock("../components/common/MarkCard", () => ({
  default: ({ title, markdown }: any) => (
    <div data-testid="markdown-card">
      <h2>{title}</h2>
      <pre>{markdown}</pre>
    </div>
  ),
}));

// ---------------------------------------------------------

const infoResponse = {
  application: "Enterprise Healthcare Platform",
  version: "2.0.0",
  framework: "FastAPI",
  multi_agent_framework: "LangGraph",
  architecture: "Microservices",

  agents: [
    "Clinical Agent",
    "Financial Agent",
    "Research Agent",
    "Compliance Agent",
    "Executive Agent",
  ],

  skills: [
    "Agent Orchestration",
    "Human-in-the-Loop",
  ],
};

describe("AgentsInfoCard", () => {

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns null when data is null", () => {
    const { container } = render(
      <AgentsInfoCard data={null} />
    );

    expect(container.firstChild).toBeNull();
  });

  it("renders markdown card", () => {
    render(<AgentsInfoCard data={infoResponse} />);

    expect(
      screen.getByTestId("markdown-card")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Platform Information")
    ).toBeInTheDocument();
  });

  it("renders platform information", () => {
    render(<AgentsInfoCard data={infoResponse} />);

    expect(
      screen.getByText(/Enterprise Healthcare Platform/)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/FastAPI/)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/LangGraph/)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/Microservices/)
    ).toBeInTheDocument();
  });

  it("renders Available Agents section", () => {
    render(<AgentsInfoCard data={infoResponse} />);

    expect(
      screen.getByText("👥 Available Agents")
    ).toBeInTheDocument();
  });

  it("renders all agents", () => {
    render(<AgentsInfoCard data={infoResponse} />);

    expect(
      screen.getByText("Clinical Agent")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Financial Agent")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Research Agent")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Compliance Agent")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Executive Agent")
    ).toBeInTheDocument();
  });

  it("renders mapped agent roles", () => {
    render(<AgentsInfoCard data={infoResponse} />);

    expect(
      screen.getByText("Clinical Decision Support")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Healthcare Finance")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Medical Research")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Healthcare Compliance")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Executive Decision Support")
    ).toBeInTheDocument();
  });

  it("uses default role for unknown agent", () => {
    render(
      <AgentsInfoCard
        data={{
          ...infoResponse,
          agents: ["Unknown Agent"],
        }}
      />
    );

    expect(
      screen.getByText("Unknown Agent")
    ).toBeInTheDocument();

    expect(
      screen.getByText("AI Healthcare Agent")
    ).toBeInTheDocument();
  });

  it("renders Platform Skills section", () => {
    render(<AgentsInfoCard data={infoResponse} />);

    expect(
      screen.getByText("🚀 Platform Skills")
    ).toBeInTheDocument();
  });

  it("renders all skills", () => {
    render(<AgentsInfoCard data={infoResponse} />);

    expect(
      screen.getByText("Agent Orchestration")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Human-in-the-Loop")
    ).toBeInTheDocument();
  });

  it("renders mapped skill descriptions", () => {
    render(<AgentsInfoCard data={infoResponse} />);

    expect(
      screen.getByText(
        "Coordinates Multiple AI Agents"
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "Expert Review Workflow"
      )
    ).toBeInTheDocument();
  });

  it("uses default description for unknown skill", () => {
    render(
      <AgentsInfoCard
        data={{
          ...infoResponse,
          skills: ["Unknown Skill"],
        }}
      />
    );

    expect(
      screen.getByText("Unknown Skill")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Platform Capability")
    ).toBeInTheDocument();
  });

  it("renders empty lists", () => {
    render(
      <AgentsInfoCard
        data={{
          ...infoResponse,
          agents: [],
          skills: [],
        }}
      />
    );

    expect(
      screen.getByText("👥 Available Agents")
    ).toBeInTheDocument();

    expect(
      screen.getByText("🚀 Platform Skills")
    ).toBeInTheDocument();

    expect(
      screen.queryByText("Clinical Agent")
    ).not.toBeInTheDocument();

    expect(
      screen.queryByText("Agent Orchestration")
    ).not.toBeInTheDocument();
  });
});