import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  render,
  screen,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import PlatformAnalysisForm from "../components/healthcare/PlatformAnalysisForm";

describe("PlatformAnalysisForm", () => {
  const onSubmit = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders page title", () => {
    render(
      <PlatformAnalysisForm
        onSubmit={onSubmit}
      />
    );

    expect(
      screen.getByText(
        "🏥 Enterprise Healthcare Platform Analysis"
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        /Submit a healthcare case/i
      )
    ).toBeInTheDocument();
  });

  it("renders all input fields", () => {
    render(
      <PlatformAnalysisForm
        onSubmit={onSubmit}
      />
    );

    expect(
      screen.getByLabelText(/Patient Case/i)
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText(/Objective/i)
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText(/Additional Context/i)
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText(/Session Id/i)
    ).toBeInTheDocument();
  });

  it("updates patient case", async () => {
    const user = userEvent.setup();

    render(
      <PlatformAnalysisForm
        onSubmit={onSubmit}
      />
    );

    const textbox =
      screen.getByLabelText(/Patient Case/i);

    await user.type(
      textbox,
      "Patient has chest pain"
    );

    expect(textbox).toHaveValue(
      "Patient has chest pain"
    );
  });

  it("updates objective", async () => {
    const user = userEvent.setup();

    render(
      <PlatformAnalysisForm
        onSubmit={onSubmit}
      />
    );

    const textbox =
      screen.getByLabelText(/Objective/i);

    await user.clear(textbox);

    await user.type(
      textbox,
      "New Objective"
    );

    expect(textbox).toHaveValue(
      "New Objective"
    );
  });

  it("updates additional context", async () => {
    const user = userEvent.setup();

    render(
      <PlatformAnalysisForm
        onSubmit={onSubmit}
      />
    );

    const textbox =
      screen.getByLabelText(
        /Additional Context/i
      );

    await user.type(
      textbox,
      "Additional notes"
    );

    expect(textbox).toHaveValue(
      "Additional notes"
    );
  });

  it("updates session id", async () => {
    const user = userEvent.setup();

    render(
      <PlatformAnalysisForm
        onSubmit={onSubmit}
      />
    );

    const textbox =
      screen.getByLabelText(/Session Id/i);

    await user.type(textbox, "SESSION-1");

    expect(textbox).toHaveValue(
      "SESSION-1"
    );
  });

  it("toggles human review", async () => {
    const user = userEvent.setup();

    render(
      <PlatformAnalysisForm
        onSubmit={onSubmit}
      />
    );

    //const checkbox = screen.getByRole("checkbox");
    const humanReview = screen.getByRole("switch", {
        name: /Require Human Review/i,
    });

    expect(humanReview).toBeChecked();

    await user.click(humanReview);

    expect(humanReview).not.toBeChecked();

    
  });

  it("updates request summary", async () => {
    const user = userEvent.setup();

    render(
      <PlatformAnalysisForm
        onSubmit={onSubmit}
      />
    );

    await user.type(
      screen.getByLabelText(
        /Patient Case/i
      ),
      "ABCDE"
    );

    expect(
      screen.getByText(
        /Patient Case Length: 5 characters/i
      )
    ).toBeInTheDocument();
  });

  it("shows Auto Generated session initially", () => {
    render(
      <PlatformAnalysisForm
        onSubmit={onSubmit}
      />
    );

    expect(
      screen.getByText(
        /Auto Generated/i
      )
    ).toBeInTheDocument();
  });

  it("updates session summary", async () => {
    const user = userEvent.setup();

    render(
      <PlatformAnalysisForm
        onSubmit={onSubmit}
      />
    );

    await user.type(
      screen.getByLabelText(/Session Id/i),
      "ABC123"
    );

    expect(
      screen.getByText(
        /Session: ABC123/i
      )
    ).toBeInTheDocument();
  });

  it("Analyze button disabled initially", () => {
    render(
      <PlatformAnalysisForm
        onSubmit={onSubmit}
      />
    );

    expect(
      screen.getByRole("button", {
        name: /Analyze/i,
      })
    ).toBeDisabled();
  });

  it("enables Analyze button", async () => {
    const user = userEvent.setup();

    render(
      <PlatformAnalysisForm
        onSubmit={onSubmit}
      />
    );

    await user.type(
      screen.getByLabelText(
        /Patient Case/i
      ),
      "Patient"
    );

    expect(
      screen.getByRole("button", {
        name: /Analyze/i,
      })
    ).toBeEnabled();
  });

  it("calls onSubmit", async () => {
    const user = userEvent.setup();

    render(
      <PlatformAnalysisForm
        onSubmit={onSubmit}
      />
    );

    await user.type(
      screen.getByLabelText(
        /Patient Case/i
      ),
      "Patient"
    );

    await user.click(
      screen.getByRole("button", {
        name: /Analyze/i,
      })
    );

    expect(onSubmit).toHaveBeenCalledTimes(1);

    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        patient_case: "Patient",
      })
    );
  });

  it("resets form", async () => {
    const user = userEvent.setup();

    render(
      <PlatformAnalysisForm
        onSubmit={onSubmit}
      />
    );

    await user.type(
      screen.getByLabelText(
        /Patient Case/i
      ),
      "Patient"
    );

    await user.click(
      screen.getByRole("button", {
        name: /Reset/i,
      })
    );

    expect(
      screen.getByLabelText(
        /Patient Case/i
      )
    ).toHaveValue("");

    expect(
      screen.getByText(
        /Patient Case Length: 0 characters/i
      )
    ).toBeInTheDocument();
  });

  it("shows loading state", () => {
    render(
      <PlatformAnalysisForm
        loading
        onSubmit={onSubmit}
      />
    );

    expect(
      screen.getByRole("button", {
        name: /Analyzing/i,
      })
    ).toBeDisabled();
  });

  it("does not submit while loading", () => {
    render(
        <PlatformAnalysisForm
            loading
            onSubmit={onSubmit}
        />
    );

    const button = screen.getByRole("button", {
        name: /Analyzing/i,
    });

    expect(button).toBeDisabled();

    expect(onSubmit).not.toHaveBeenCalled();
    });
  
});