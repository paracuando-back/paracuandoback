'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return queryInterface.bulkInsert('publications_types', [{
      id: 0,
      name: 'Brands and Stores',
      description: 'Which famous artist would you ask to perform in your town?',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 1,
      name: 'Artists and Concerts',
      description: 'Which famous artist would you ask a public performance in your town?',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 2,
      name: 'Tournaments and Events',
      description: 'Which international competition or sporting event do you want to be held in your town?',
      created_at: new Date(),
      updated_at: new Date()
    }])
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('publications_types', null, {})
  }
}
