describe("template spec", () => {
  it("passes", () => {
    cy.visit("http://localhost:5173/signin");
    cy.get("#email").type("aaa111233@aaa.com");
    cy.get("#password").type("11111111");
    cy.get("#submit").click();
  });
});
