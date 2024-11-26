describe('template spec', () => {
  it('create movie', () => {
    cy.visit('https://watch-vault.netlify.app/')
    cy.get('.primary-button').contains("New Movie +").click()
    cy.get('input[name="title"]').type('Arcane season 2');
    cy.get('#watched').click();
    cy.get('#release_date').type("2024-11-11")
    cy.get('#rotten_tomatoes').type("90").get('#audience_rating').type("99")
    cy.get('input[value="Action"]').click().get('input[value="Drama"]').click()
    cy.get('#description').type("The origins of two iconic League champions, set in the utopian Piltover and the oppressed underground of Zaun.")
    cy.get('#image').type('https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.instagram.com%2Fella_purnell%2Fp%2FC8PqikavgjC%2F&psig=AOvVaw3iO3r_dqftyoHWdpFZeOL3&ust=1732719078614000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCPCn8Nyf-okDFQAAAAAdAAAAABAE', {force: true})
    cy.get('.primary-button').click()
}) 
  it('edit a movie', () => {
    cy.visit('https://watch-vault.netlify.app/')
    cy.get('.movie-card').contains('ARCANE SEASON 2').click()
    cy.get('.primary-button').click()
    cy.get('#description').type("Set in Utopian Piltover and the oppressed underground of Zaun, the story follows the origins of two iconic League of Legends champions and the power that will tear them apart.")
    cy.get('.primary-button').click()
  })
  it('delete  a movie', () =>{
    cy.visit('https://watch-vault.netlify.app/')
    cy.get('.movie-card').contains('ARCANE SEASON 2').click()
    cy.get('.delete-button').click()
    cy.get('.delete-button-popup').click()
  })
})
  