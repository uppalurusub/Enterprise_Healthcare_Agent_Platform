import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import Dashboard from "../pages/Dashboard";

let platformHealthMock: any;
let agentsMock: any;
let agentsInfoMock: any;
let analysisMock: any;

// --------------------
// Hook mocks
// --------------------

const loadHealth = vi.fn();
const loadAgents = vi.fn();
const loadAgentsInfo = vi.fn();
const execute = vi.fn();

vi.mock("../hooks/usePlatformHealth", () => ({
  usePlatformHealth: () => platformHealthMock,
}));

vi.mock("../hooks/useAgents", () => ({
  useAgents: () => agentsMock,
}));

vi.mock("../hooks/useAgentsInfo", () => ({
  useAgentsInfo: () => agentsInfoMock,
}));

vi.mock("../hooks/usePlatformAnalysis", () => ({
  usePlatformAnalysis: () => analysisMock,
}));

beforeEach(() => {
  vi.clearAllMocks();

  platformHealthMock = {
    health: { status: "UP" },
    loading: false,
    error: null,
    loadHealth,
  };

  agentsMock = {
    agents: [],
    loading: false,
    error: null,
    loadAgents,
  };

  agentsInfoMock = {
    info: {},
    loading: false,
    error: null,
    loadAgentsInfo,
  };

  analysisMock = {
    result: null,
    loading: false,
    error: null,
    execute,
  };
});

{/* 
vi.mock("../hooks/usePlatformHealth", () => ({
  usePlatformHealth: () => ({
    health: { status: "UP" },
    loading: false,
    error: null,
    loadHealth,
  }),
}));

vi.mock("../hooks/useAgents", () => ({
  useAgents: () => ({
    agents: { total_agents: 2 },
    loading: false,
    error: null,
    loadAgents,
  }),
}));

vi.mock("../hooks/useAgentsInfo", () => ({
  useAgentsInfo: () => ({
    info: {
      application: "Healthcare Platform",
    },
    loading: false,
    error: null,
    loadAgentsInfo,
  }),
}));

vi.mock("../hooks/usePlatformAnalysis", () => ({
  usePlatformAnalysis: () => ({
    result: {},
    loading: false,
    error: null,
    execute,
  }),
}));

*/}

// --------------------
// Component mocks
// --------------------


vi.mock("../components/healthcare/PlatformAnalysisDashboard", () => ({
  default: () => (
    <div data-testid="analysis-dashboard">
      Analysis Dashboard
    </div>
  ),
}));

it("renders Platform Analysis", () => {
    render(<Dashboard selectedMenu="dashboard" />);

    expect(
      screen.getByTestId("analysis-form")
    ).toBeInTheDocument();

    expect(
      screen.getByTestId("analysis-dashboard")
    ).toBeInTheDocument();
});

vi.mock("../components/healthcare/HealthStatusCard", () => ({
  default: () => (
    <div data-testid="health-card">
      Health Card
    </div>
  ),
}));

it("renders Health card", () => {
    render(<Dashboard selectedMenu="health" />);

    expect(
      screen.getByTestId("health-card")
    ).toBeInTheDocument();

    expect(loadHealth).toHaveBeenCalledTimes(1);
});

vi.mock("../components/healthcare/AgentsCard", () => ({
  default: () => (
    <div data-testid="agents-card">
      Agents Card
    </div>
  ),
}));

it("renders Agents card", () => {
    render(<Dashboard selectedMenu="agents" />);

    expect(
      screen.getByTestId("agents-card")
    ).toBeInTheDocument();

    expect(loadAgents).toHaveBeenCalledTimes(1);
});

vi.mock("../components/healthcare/AgentsInfoCard", () => ({
  default: () => (
    <div data-testid="agents-info-card">
      Agents Info Card
    </div>
  ),
}));

it("renders Agents Info card", () => {
    render(<Dashboard selectedMenu="agents-info" />);

    expect(
      screen.getByTestId("agents-info-card")
    ).toBeInTheDocument();

    expect(loadAgentsInfo).toHaveBeenCalledTimes(1);
});

vi.mock("../components/healthcare/PlatformAnalysisForm", () => ({
  default: () => (
    <div data-testid="analysis-form">
      Analysis Form
    </div>
  ),
}));

it("shows Health error", () => {

    platformHealthMock.error = "Health Error";

    render(<Dashboard selectedMenu="health" />);

    expect(
        screen.getByText("Health Error")
    ).toBeInTheDocument();
});

    

it("shows Agents error", () => {

    agentsMock.error = "Agents Error";

    render(<Dashboard selectedMenu="agents" />);

    expect(
        screen.getByText("Agents Error")
    ).toBeInTheDocument();
 });

    

it("shows Agents Info error", () => {

  agentsInfoMock.error = "Info Error";

  render(<Dashboard selectedMenu="agents-info" />);

  expect(
    screen.getByText("Info Error")
  ).toBeInTheDocument();
});

    

it("does not call any loader for unknown menu", () => {
    render(<Dashboard selectedMenu="unknown" />);

    expect(loadHealth).not.toHaveBeenCalled();
    expect(loadAgents).not.toHaveBeenCalled();
    expect(loadAgentsInfo).not.toHaveBeenCalled();
});

//});