import { Settings } from "@/components/settings";
import timerSlice from "@/features/store/timerSlice";
import { renderWithRedux } from "@/utils/renderWithRedux";
import { getStore } from "@/utils/store";
import { screen, within } from "@testing-library/dom";
import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Settings initial interface", () => {
  beforeEach(() => {
    renderWithRedux(<Settings />, getStore(timerSlice));

    return cleanup;
  });

  const { getByRole, queryByRole } = screen;

  test("By default settings are closed", () => {
    getByRole("button", { name: "Settings" });
    expect(
      queryByRole("heading", { name: "Settings" })
    ).not.toBeInTheDocument();
  });
});

describe("Opened settings interface", () => {
  beforeEach(async () => {
    renderWithRedux(<Settings />, getStore(timerSlice));
    await click(getByRole("button", { name: "Settings" }));

    return cleanup;
  });

  const { getByRole } = screen;
  const { click } = userEvent.setup();

  test("Settings have focus time input", () => {
    getByRole("spinbutton", { name: "Focus" });
  });

  test("Settings have break time input", () => {
    getByRole("spinbutton", { name: "Break" });
  });

  test("Settings have long break time input", () => {
    getByRole("spinbutton", { name: "Long break" });
  });

  test("Settings have long break time input", () => {
    getByRole("spinbutton", { name: "Long break" });
  });

  test("Settings have cycles till the long break break input", () => {
    getByRole("spinbutton", { name: "Cycles till the long break" });
  });

  test("Settings have autostart timers switch", () => {
    getByRole("switch", { name: "Autostart timers" });
  });

  test("Settings have save button", () => {
    getByRole("button", { name: "Save" });
  });

  test("Settings have cancel button", () => {
    getByRole("button", { name: "Cancel" });
  });
});

describe("Changes in settings are saved", () => {
  beforeEach(async () => {
    renderWithRedux(<Settings />, getStore(timerSlice));
    await click(getByRole("button", { name: "Settings" }));

    return cleanup;
  });

  const { getByRole } = screen;
  const { click, type } = userEvent.setup();

  test("Changes in focus time input are saved", async () => {
    await type(
      getByRole("spinbutton", { name: "Focus" }),
      "{backspace}{backspace}5"
    );
    await click(getByRole("button", { name: "Save" }));
    await click(getByRole("button", { name: "Settings" }));
    expect(getByRole("spinbutton", { name: "Focus" })).toHaveValue(5);
  });

  test("Changes in break time input are saved", async () => {
    await type(
      getByRole("spinbutton", { name: "Break" }),
      "{backspace}{backspace}3"
    );
    await click(getByRole("button", { name: "Save" }));
    await click(getByRole("button", { name: "Settings" }));
    expect(getByRole("spinbutton", { name: "Break" })).toHaveValue(3);
  });

  test("Changes in long break time input are saved", async () => {
    await type(
      getByRole("spinbutton", { name: "Long break" }),
      "{backspace}{backspace}5"
    );
    await click(getByRole("button", { name: "Save" }));
    await click(getByRole("button", { name: "Settings" }));
    expect(getByRole("spinbutton", { name: "Long break" })).toHaveValue(5);
  });
});

describe("Show errors", () => {
  beforeEach(async () => {
    renderWithRedux(<Settings />, getStore(timerSlice));
    await click(getByRole("button", { name: "Settings" }));

    return cleanup;
  });

  const { getByRole } = screen;
  const { click, type } = userEvent.setup();

  test("Show error for empty text in focus time input", async () => {
    const focusField = document.querySelector(
      'label[for="focusTime"]'
    ) as HTMLElement;
    expect(within(focusField).queryByRole("alert")).not.toBeInTheDocument();
    await type(
      getByRole("spinbutton", { name: "Focus" }),
      "{backspace}{backspace}"
    );
    await click(getByRole("button", { name: "Save" }));
    within(focusField).getByRole("alert");
  });

  test("Show error for value larger than 59 in focus time input", async () => {
    const focusField = document.querySelector(
      'label[for="focusTime"]'
    ) as HTMLElement;
    expect(within(focusField).queryByRole("alert")).not.toBeInTheDocument();
    await type(
      getByRole("spinbutton", { name: "Focus" }),
      "{backspace}{backspace}60"
    );
    await click(getByRole("button", { name: "Save" }));
    within(focusField).getByRole("alert");
  });

  test("Show error for value 0 in focus time input", async () => {
    const focusField = document.querySelector(
      'label[for="focusTime"]'
    ) as HTMLElement;
    expect(within(focusField).queryByRole("alert")).not.toBeInTheDocument();
    await type(
      getByRole("spinbutton", { name: "Focus" }),
      "{backspace}{backspace}0"
    );
    await click(getByRole("button", { name: "Save" }));
    within(focusField).getByRole("alert");
  });
});
