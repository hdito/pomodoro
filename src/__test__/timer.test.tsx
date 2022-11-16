import timerSlice from "@/features/store/timerSlice";
import Timer from "@/pages/index";
import { renderWithRedux } from "@/utils/renderWithRedux";
import { getStore } from "@/utils/store";
import "@testing-library/jest-dom";
import { cleanup, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Timer initial interface", () => {
  beforeEach(() => {
    renderWithRedux(<Timer />, getStore(timerSlice));

    return cleanup;
  });

  const { getByRole } = screen;

  test("Timer has start button", () => {
    getByRole("button", { name: "Start" });
  });

  test("Timer has stop button", () => {
    getByRole("button", { name: "Stop" });
  });

  test("Timer has focus button", () => {
    getByRole("button", { name: "Focus" });
  });

  test("Timer has break button", () => {
    getByRole("button", { name: "Break" });
  });

  test("Timer has long break button", () => {
    getByRole("button", { name: "Long break" });
  });

  test("Timer has settings menu", () => {
    getByRole("button", { name: "Settings" });
  });
});

describe("Timer interactions", () => {
  beforeEach(() => {
    renderWithRedux(<Timer />, getStore(timerSlice));
  });
  afterEach(cleanup);

  const { click } = userEvent.setup();
  const { getByRole, findByRole, queryByRole, debug } = screen;

  test("Timer starts after click on start button", async () => {
    await click(getByRole("button", { name: "Start" }));
    expect(queryByRole("button", { name: "Start" })).not.toBeInTheDocument();
    expect(getByRole("button", { name: "Pause" })).toBeInTheDocument();
    expect(await findByRole("heading", { name: "24:59" })).toBeInTheDocument();
  });

  test("Timer updates time", async () => {
    await click(getByRole("button", { name: "Start" }));
    await findByRole("heading", { name: "25:00" });
    await findByRole("heading", { name: "24:59" });
    await findByRole("heading", { name: "24:58" });
  });
});
