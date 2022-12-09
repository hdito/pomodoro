import { MS_IN_MINUTE, MS_IN_SECOND } from "./../../src/utils/constants";
import "@testing-library/cypress/add-commands";

describe("Timer", () => {
  it("Timer ticks", () => {
    cy.visit("");

    cy.findByRole("timer").contains("25:00");
    cy.findByRole("button", { name: "Start" }).click();
    cy.findByRole("timer").contains("24:59");
    cy.findByRole("timer").contains("24:58");
    cy.findByRole("timer").contains("24:57");
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

  it("Resets timer after stop", () => {
    cy.visit("");

    cy.findByRole("button", { name: "Start" }).click();
    cy.findByRole("timer").contains("24:59");
    cy.findByRole("button", { name: "Stop" }).click();
    cy.findByRole("timer").contains("25:00");
  });
});
