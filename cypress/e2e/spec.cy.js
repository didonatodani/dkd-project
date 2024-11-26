describe('template spec', () => {
  it('create a movie', () => {
    cy.visit('https://watch-vault.netlify.app/')
    // cy.get(".primary-button").contains("New Movie +").click();
    // cy.get('input[name="title"]').type('Dani Movie Test');
    // cy.get('input[id="watched"]').click();
    // cy.get("#release_date").type("2000-04-24");
    // cy.get("#rotten_tomatoes").type("67");
    // cy.get("#audience_rating").type("87");
    // cy.get('input[value="Action"]').click()
    // cy.get('input[value="Drama"]').click();
    // cy.get("#description").type("this is my movieeeee");
    // cy.get("#image").type("https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg",  { force: true });
    // cy.get(".primary-button").contains("Save").click();


    // cy.get(".movie-card").contains("DANI MOVIE TEST").click()
    // cy.get(".delete-button").click()
    // cy.get("button").contains("Delete").click()

    cy.get(".movie-card").contains("DANI MOVIE TEST").click();
    cy.get(".primary-button").contains("Edit").click();
    cy.get("#description").type("This is not my movie anymore")
    cy.get(".primary-button").contains("Save").click();

    cy.get(".back-button").click()

  })
  

})