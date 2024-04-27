describe("template spec", () => {
  it("passes", () => {
    cy.visit("http://localhost:5173/signin");
    // メールアドレスの形式が違う
    cy.get("#email").type("false@example.com");
    cy.get("#password").type("aaaaaaaa");
    cy.get("#submit").click();
  });
});
