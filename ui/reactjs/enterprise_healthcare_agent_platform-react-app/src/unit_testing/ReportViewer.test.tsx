import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import ReportViewer from "../components/common/ReportViewer";

describe("ReportViewer", () => {

  it("renders nothing for empty string", () => {

    const { container } = render(
      <ReportViewer content="" />
    );

    expect(container).toBeInTheDocument();

  });

  it("renders H1 heading", () => {

    render(
      <ReportViewer
        content={"### Executive Decision Report"}
      />
    );

    expect(
      screen.getByRole("heading", {
        level: 4,
        name: "Executive Decision Report",
      })
    ).toBeInTheDocument();

  });

  it("renders H2 heading", () => {

    render(
      <ReportViewer
        content={"#### Executive Summary"}
      />
    );

    expect(
      screen.getByRole("heading", {
        level: 5,
        name: "Executive Summary",
      })
    ).toBeInTheDocument();

  });

  it("renders H3 heading", () => {

    render(
      <ReportViewer
        content={"##### Findings"}
      />
    );

    expect(
      screen.getByRole("heading", {
        level: 6,
        name: "Findings",
      })
    ).toBeInTheDocument();

  });

  it("renders paragraph", () => {

    render(
      <ReportViewer
        content={"Normal paragraph"}
      />
    );

    expect(
      screen.getByText("Normal paragraph")
    ).toBeInTheDocument();

  });

  it("renders bullet list using dash", () => {

    render(
      <ReportViewer
        content={"- First Item"}
      />
    );

    expect(
      screen.getByText("First Item")
    ).toBeInTheDocument();

  });

  it("renders bullet list using star", () => {

    render(
      <ReportViewer
        content={"* Second Item"}
      />
    );

    expect(
      screen.getByText("Second Item")
    ).toBeInTheDocument();

  });

  it("renders numbered heading", () => {

    render(
      <ReportViewer
        content={"1. Executive Summary"}
      />
    );

    expect(
      screen.getByText("1. Executive Summary")
    ).toBeInTheDocument();

  });

  it("renders divider using ---", () => {

    const { container } = render(
      <ReportViewer
        content={"---"}
      />
    );

    expect(
      container.querySelector("hr")
    ).toBeInTheDocument();

  });

  it("renders divider using ***", () => {

    const { container } = render(
      <ReportViewer
        content={"***"}
      />
    );

    expect(
      container.querySelector("hr")
    ).toBeInTheDocument();

  });

  it("renders bold markdown", () => {

    render(
      <ReportViewer
        content={"This is **Important** text"}
      />
    );

    expect(
      screen.getByText("Important")
    ).toContainHTML("strong");

  });

  it("renders numbered section with auto bullets", () => {

    render(
      <ReportViewer
        content={`
1. Recommendations
Take aspirin
Visit doctor
`}
      />
    );

    expect(
      screen.getByText("Take aspirin")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Visit doctor")
    ).toBeInTheDocument();

  });

  it("renders multiple paragraphs", () => {

    render(
      <ReportViewer
        content={`
Paragraph One

Paragraph Two
`}
      />
    );

    expect(
      screen.getByText("Paragraph One")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Paragraph Two")
    ).toBeInTheDocument();

  });

  it("renders complete markdown report", () => {

    render(
      <ReportViewer
        content={`
### Healthcare Report

#### Executive Summary

Patient is stable.

---

##### Findings

- BP Normal
- Pulse Normal

1. Recommendations
Continue medication
Increase exercise

**Overall Status:** Stable
`}
      />
    );

    expect(
      screen.getByText(
        "Healthcare Report"
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "Executive Summary"
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "Findings"
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "BP Normal"
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "Pulse Normal"
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "Continue medication"
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "Increase exercise"
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "Overall Status:"
      )
    ).toContainHTML("strong");

    expect(
      screen.getByText("Stable")
    ).toBeInTheDocument();

  });

  it("renders blank lines without crashing", () => {

    render(
      <ReportViewer
        content={"A\n\n\nB"}
      />
    );

    expect(
      screen.getByText("A")
    ).toBeInTheDocument();

    expect(
      screen.getByText("B")
    ).toBeInTheDocument();

  });

});