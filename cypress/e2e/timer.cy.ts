import { MS_IN_MINUTE, MS_IN_SECOND } from "./../../src/utils/constants";
import "@testing-library/cypress/add-commands";

describe("Timer", () => {
  it("Switch modes after timer runs out", () => {
    cy.clock(new Date().getTime(), ["setInterval"]);
    cy.visit("");
    cy.findByRole("timer").contains("25:00");
    cy.findByRole("button", { name: "Focus" }).should(
      "have.attr",
      "aria-current",
      "step"
    );
    cy.findByRole("button", { name: "Break" }).should(
      "not.have.attr",
      "aria-current",
      "step"
    );
    cy.findByRole("button", { name: "Long break" }).should(
      "not.have.attr",
      "aria-current",
      "step"
    );
    cy.findByRole("button", { name: "Start" }).click();
    cy.tick(12.5 * MS_IN_MINUTE);
    cy.findByRole("timer").contains("12:30");
    cy.tick(12.5 * MS_IN_MINUTE);
    cy.findByRole("button", { name: "Focus" }).should(
      "not.have.attr",
      "aria-current",
      "step"
    );
    cy.findByRole("button", { name: "Break" }).should(
      "have.attr",
      "aria-current",
      "step"
    );
    cy.findByRole("button", { name: "Long break" }).should(
      "not.have.attr",
      "aria-current",
      "step"
    );
    cy.findByRole("timer").contains("05:00");
  });

  it("Update paused time after changing settings", () => {
    cy.visit("");
    cy.findByRole("button", { name: "Settings" }).click();
    cy.findByRole("spinbutton", { name: "Focus" }).type(
      "{backspace}{backspace}3"
    );
    cy.findByRole("spinbutton", { name: "Break" }).type(
      "{backspace}{backspace}7"
    );
    cy.findByRole("spinbutton", { name: "Long break" }).type(
      "{backspace}{backspace}10"
    );
    cy.findByRole("button", { name: "Save" }).click();
    cy.findByRole("timer").contains("03:00");
    cy.findByRole("button", { name: "Break" }).click();
    cy.findByRole("timer").contains("07:00");
    cy.findByRole("button", { name: "Long break" }).click();
    cy.findByRole("timer").contains("10:00");
  });

  it.only("Resets timer after stop", () => {
    cy.clock(new Date().getTime(), ["setInterval"]);
    cy.visit("");

    cy.findByRole("button", { name: "Start" }).click();
    cy.tick(5 * MS_IN_MINUTE);
    cy.findByRole("timer").contains("20:00");
    cy.findByRole("button", { name: "Stop" }).click();
    cy.findByRole("timer").contains("25:00");

    cy.findByRole("button", { name: "Settings" }).click();
    cy.findByRole("spinbutton", { name: "Focus" }).type(
      "{backspace}{backspace}1"
    );
    cy.findByRole("button", { name: "Save" }).click();

    cy.findByRole("timer").contains("01:00");
    cy.findByRole("button", { name: "Start" }).click();

    cy.tick(MS_IN_SECOND);

    cy.findByRole("button", { name: "Stop" }).click();
    cy.findByRole("timer").contains("01:00");
  });
});
