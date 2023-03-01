describe("TodoLister", () => {
  it("should add new element to Todolister", () => {
    cy.visit("https://elizpn.github.io/todo-list/");

    cy.contains("Todolister");
    cy.get("[data-testid=add-item-textfield]").type(
      "Add Cypress to thr project"
    );
    cy.get("[data-testid=add-button]").click()

    cy.get("[data-testid=ckeck-box-list]").contains(
      "Add Cypress to thr project"
    );
  });
});
