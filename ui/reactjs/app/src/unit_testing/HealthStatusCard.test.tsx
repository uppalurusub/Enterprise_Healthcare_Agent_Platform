import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";

import HealthStatusCard from "../components/healthcare/HealthStatusCard";

describe("HealthStatusCard", () => {

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  const healthData = {
    status: "UP",
    service: "Enterprise Healthcare Platform",
    timestamp: "2026-07-20T10:30:00.000Z",
  };

  it("returns null when data is null", () => {

    const { container } = render(
      <HealthStatusCard data={null as any} />
    );

    expect(container.firstChild).toBeNull();

  });

  it("renders page title", () => {

    render(<HealthStatusCard data={healthData} />);

    expect(
      screen.getByText("🏥 System Health Status")
    ).toBeInTheDocument();

  });

  it("renders Status label", () => {

    render(<HealthStatusCard data={healthData} />);

    expect(
      screen.getByText("Status")
    ).toBeInTheDocument();

  });

  it("renders status value", () => {

    render(<HealthStatusCard data={healthData} />);

    expect(
      screen.getByText("UP")
    ).toBeInTheDocument();

  });

  it("renders Service label", () => {

    render(<HealthStatusCard data={healthData} />);

    expect(
      screen.getByText("Service")
    ).toBeInTheDocument();

  });

  it("renders service value", () => {

    render(<HealthStatusCard data={healthData} />);

    expect(
      screen.getByText("Enterprise Healthcare Platform")
    ).toBeInTheDocument();

  });

  it("renders Last Checked label", () => {

    render(<HealthStatusCard data={healthData} />);

    expect(
      screen.getByText("Last Checked")
    ).toBeInTheDocument();

  });

  it("formats timestamp", () => {

    const spy = vi
      .spyOn(Date.prototype, "toLocaleString")
      .mockReturnValue("20 Jul 2026, 10:30 AM");

    render(<HealthStatusCard data={healthData} />);

    expect(
      screen.getByText("20 Jul 2026, 10:30 AM")
    ).toBeInTheDocument();

    expect(spy).toHaveBeenCalled();

  });

  it("renders success chip for UP status", () => {

    render(<HealthStatusCard data={healthData} />);

    expect(
      screen.getByText("UP")
    ).toBeInTheDocument();

  });

  it("renders DOWN status", () => {

    render(
      <HealthStatusCard
        data={{
          ...healthData,
          status: "DOWN",
        }}
      />
    );

    expect(
      screen.getByText("DOWN")
    ).toBeInTheDocument();

  });

  it("renders all three labels", () => {

    render(<HealthStatusCard data={healthData} />);

    expect(
      screen.getByText("Status")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Service")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Last Checked")
    ).toBeInTheDocument();

  });

  it("renders exactly three information cards", () => {

    render(<HealthStatusCard data={healthData} />);

    expect(
      screen.getAllByText(
        /Status|Service|Last Checked/
      )
    ).toHaveLength(4);

  });

  it("renders different services", () => {

    render(
      <HealthStatusCard
        data={{
          ...healthData,
          service: "Clinical Decision Support",
        }}
      />
    );

    expect(
      screen.getByText(
        "Clinical Decision Support"
      )
    ).toBeInTheDocument();

  });

  it("renders any health status", () => {

    render(
      <HealthStatusCard
        data={{
          ...healthData,
          status: "UNKNOWN",
        }}
      />
    );

    expect(
      screen.getByText("UNKNOWN")
    ).toBeInTheDocument();

  });

});