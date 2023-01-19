'use strict'
const { v4: uuid4 } = require('uuid')

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
    return queryInterface.bulkInsert('users', [{
      id: uuid4(),
      first_name: 'Eduardo',
      last_name: 'Helfer',
      email: 'eduardohelfer@gmx.net',
      username: 'ehelfer',
      password: '12341234rewq',
      email_verified: new Date(),
      token: '12341234rewq',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: uuid4(),
      first_name: 'Nelly',
      last_name: 'Segura',
      email: 'oficialchala@gmail.com',
      username: 'nesa',
      password: '12341234rewq',
      email_verified: new Date(),
      token: '12341234rewq',
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
    return queryInterface.bulkDelete('users', null, {})

  }
}
