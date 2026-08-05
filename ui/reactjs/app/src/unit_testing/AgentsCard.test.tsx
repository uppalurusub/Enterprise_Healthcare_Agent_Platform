import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import AgentsCard from "../components/healthcare/AgentsCard";

const agentsResponse = {
  total_agents: 3,

  agents: [
    {
      name: "Infrastructure Agent",
      role: "Infrastructure Analysis",
    },
    {
      name: "Security Agent",
      role: "Security Analysis",
    },
    {
      name: "Performance Agent",
      role: "Performance Analysis",
    },
  ],
};

describe("AgentsCard", () => {
  it("returns null when data is null", () => {
    const { container } = render(
      <AgentsCard data={null} />
    );

    expect(container.firstChild).toBeNull();
  });

  it("renders heading", () => {
    render(<AgentsCard data={agentsResponse} />);

    expect(
      screen.getByText("👥 Available Agents")
    ).toBeInTheDocument();
  });

  it("renders total agents", () => {
    render(<AgentsCard data={agentsResponse} />);

    expect(
      screen.getByText("Total Agents : 3")
    ).toBeInTheDocument();
  });

  it("renders all agent names", () => {
    render(<AgentsCard data={agentsResponse} />);

    expect(
      screen.getByText("Infrastructure Agent")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Security Agent")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Performance Agent")
    ).toBeInTheDocument();
  });

  it("renders all agent roles", () => {
    render(<AgentsCard data={agentsResponse} />);

    expect(
      screen.getByText("Infrastructure Analysis")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Security Analysis")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Performance Analysis")
    ).toBeInTheDocument();
  });

  it("renders correct number of agent cards", () => {
    render(<AgentsCard data={agentsResponse} />);

    expect(
      screen.getAllByText(/Agent$/)
    ).toHaveLength(3);
  });

  it("renders one chip for each role", () => {
    render(<AgentsCard data={agentsResponse} />);

    expect(
      screen.getAllByText(/Analysis$/)
    ).toHaveLength(3);
  });

  it("renders empty agent list", () => {
    render(
      <AgentsCard
        data={{
          total_agents: 0,
          agents: [],
        }}
      />
    );

    expect(
      screen.getByText("Total Agents : 0")
    ).toBeInTheDocument();

    expect(
      screen.queryByText("Infrastructure Agent")
    ).not.toBeInTheDocument();
  });

  it("renders single agent", () => {
    render(
      <AgentsCard
        data={{
          total_agents: 1,
          agents: [
            {
              name: "Clinical Agent",
              role: "Clinical Analysis",
            },
          ],
        }}
      />
    );

    expect(
      screen.getByText("Clinical Agent")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Clinical Analysis")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Total Agents : 1")
    ).toBeInTheDocument();
  });

  it("matches total_agents with rendered agents", () => {
    render(<AgentsCard data={agentsResponse} />);

    expect(
      screen.getAllByRole("heading", {
        level: 6,
      })
    ).toHaveLength(3);
  });
});