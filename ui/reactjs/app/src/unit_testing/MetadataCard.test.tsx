import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";

import MetadataCard from "../components/healthcare/MetadataCard";

describe("MetadataCard", () => {

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  const metadata = {
    request_id: "REQ-1001",
    session_id: "SESSION-5001",
    status: "Completed",
    generated_at: "2026-07-20T10:30:00Z",
    total_execution_time_seconds: 2.567,
  };

  it("returns null when data is null", () => {

    const { container } = render(
      <MetadataCard data={null as any} />
    );

    expect(container.firstChild).toBeNull();

  });

  it("renders page title", () => {

    render(
      <MetadataCard data={metadata} />
    );

    expect(
      screen.getByText("📋 Request Metadata")
    ).toBeInTheDocument();

  });

  it("renders request id", () => {

    render(
      <MetadataCard data={metadata} />
    );

    expect(
      screen.getByText("REQ-1001")
    ).toBeInTheDocument();

  });

  it("renders session id", () => {

    render(
      <MetadataCard data={metadata} />
    );

    expect(
      screen.getByText("SESSION-5001")
    ).toBeInTheDocument();

  });

  it("renders status", () => {

    render(
      <MetadataCard data={metadata} />
    );

    expect(
      screen.getByText("Completed")
    ).toBeInTheDocument();

  });

  it("formats generated date", () => {

    vi.spyOn(
      Date.prototype,
      "toLocaleString"
    ).mockReturnValue(
      "20 Jul 2026 10:30 AM"
    );

    render(
      <MetadataCard data={metadata} />
    );

    expect(
      screen.getByText(
        "20 Jul 2026 10:30 AM"
      )
    ).toBeInTheDocument();

  });

  it("formats execution time", () => {

    render(
      <MetadataCard data={metadata} />
    );

    expect(
      screen.getByText("2.57 sec")
    ).toBeInTheDocument();

  });

  it("shows FAILED status", () => {

    render(
      <MetadataCard
        data={{
          ...metadata,
          status: "FAILED",
        }}
      />
    );

    expect(
      screen.getByText("FAILED")
    ).toBeInTheDocument();

  });

  it("renders default Completed status", () => {

    render(
      <MetadataCard
        data={{
          ...metadata,
          status: undefined,
        }}
      />
    );

    expect(
      screen.getByText("Completed")
    ).toBeInTheDocument();

  });

  it("renders default Request ID", () => {

    render(
      <MetadataCard
        data={{
          ...metadata,
          request_id: undefined,
        }}
      />
    );

    expect(
      screen.getByText("N/A")
    ).toBeInTheDocument();

  });

  it("renders default Session ID", () => {

    render(
      <MetadataCard
        data={{
          ...metadata,
          session_id: undefined,
        }}
      />
    );

    expect(
      screen.getAllByText("N/A")
    ).toHaveLength(1);

  });

  it("renders default generated date", () => {

    render(
      <MetadataCard
        data={{
          ...metadata,
          generated_at: undefined,
        }}
      />
    );

    expect(
      screen.getAllByText("N/A")
    ).toHaveLength(1);

  });

  it("renders default execution time", () => {

    render(
      <MetadataCard
        data={{
          ...metadata,
          total_execution_time_seconds:
            undefined,
        }}
      />
    );

    expect(
      screen.getAllByText("N/A")
    ).toHaveLength(1);

  });

  it("renders all metadata labels", () => {

    render(
      <MetadataCard data={metadata} />
    );

    expect(
      screen.getByText("Request ID")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Session ID")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Status")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Generated At")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Execution Time")
    ).toBeInTheDocument();

  });

  it("renders five cards", () => {

    render(
      <MetadataCard data={metadata} />
    );

    expect(
      screen.getAllByText(
        /Request ID|Session ID|Status|Generated At|Execution Time/
      )
    ).toHaveLength(5);

  });

  it("formats execution time to two decimals", () => {

    render(
      <MetadataCard
        data={{
          ...metadata,
          total_execution_time_seconds:
            8,
        }}
      />
    );

    expect(
      screen.getByText("8.00 sec")
    ).toBeInTheDocument();

  });

});