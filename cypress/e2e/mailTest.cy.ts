describe("template spec", () => {
  it("passes", () => {
    cy.visit("http://localhost:5173/emailcheck");
    cy.get("#email").type("example@example.com");
    cy.get("#submit").click();
  });
});
