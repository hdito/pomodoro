import "@testing-library/cypress/add-commands";

describe("Tasks", () => {
  it("Tasks appear after user adds them", () => {
    cy.visit("");
    cy.findByRole("button", { name: "Add task" }).click();

    cy.findByRole("textbox", { name: "Task" }).type("New task 1");
    cy.findByRole("button", { name: "Add" }).click();
    cy.findByRole("textbox", { name: "Task" }).type("New task 2");
    cy.findByRole("button", { name: "Add" }).click();
    cy.findByRole("textbox", { name: "Task" }).type("New task 3");
    cy.findByRole("button", { name: "Add" }).click();

    cy.findByRole("checkbox", { name: "New task 1" });
    cy.findByRole("checkbox", { name: "New task 2" });
    cy.findByRole("checkbox", { name: "New task 3" });
  });
  it("User can toggle added tasks", () => {
    cy.visit("");
    cy.findByRole("button", { name: "Add task" }).click();

    cy.findByRole("textbox", { name: "Task" }).type("New task 1");
    cy.findByRole("button", { name: "Add" }).click();
    cy.findByRole("textbox", { name: "Task" }).type("New task 2");
    cy.findByRole("button", { name: "Add" }).click();
    cy.findByRole("textbox", { name: "Task" }).type("New task 3");
    cy.findByRole("button", { name: "Add" }).click();

    cy.findByRole("checkbox", { name: "New task 1" }).click();
    cy.findByRole("checkbox", { name: "New task 2" });
    cy.findByRole("checkbox", { name: "New task 3" }).click();

    cy.findByRole("checkbox", { name: "New task 1" }).should("be.checked");
    cy.findByRole("checkbox", { name: "New task 2" }).should("not.be.checked");
    cy.findByRole("checkbox", { name: "New task 3" }).should("be.checked");
  });

  it.only("User can delete tasks", () => {
    cy.visit("");
    cy.findByRole("button", { name: "Add task" }).click();

    cy.findByRole("textbox", { name: "Task" }).type("New task 1");
    cy.findByRole("button", { name: "Add" }).click();
    cy.findByRole("textbox", { name: "Task" }).type("New task 2");
    cy.findByRole("button", { name: "Add" }).click();
    cy.findByRole("textbox", { name: "Task" }).type("New task 3");
    cy.findByRole("button", { name: "Add" }).click();

    cy.findByRole("checkbox", { name: "New task 3" })
      .parent()
      .parent()
      .findAllByRole("button", { name: "Delete" })
      .click();

    cy.findByRole("checkbox", { name: "New task 1" }).should("exist");
    cy.findByRole("checkbox", { name: "New task 2" }).should("exist");
    cy.findByRole("checkbox", { name: "New task 3" }).should("not.exist");
  });
});
