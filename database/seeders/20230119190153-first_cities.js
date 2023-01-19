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
    return queryInterface.bulkInsert('city', [{
      id: 0,
      name: 'Querétaro',
      country_id: 0,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 1,
      name: 'Pitorreal',
      country_id: 0,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 2,
      name: 'La Verija',
      country_id: 0,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 3,
      name: 'Salsipuedes',
      country_id: 0,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 4,
      name: 'Válgame Dios',
      country_id: 0,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 5,
      name: 'Callao',
      country_id: 1,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 6,
      name: 'Chachapoyas',
      country_id: 1,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 7,
      name: 'Chota',
      country_id: 1,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 8,
      name: 'Tarapoto',
      country_id: 1,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 9,
      name: 'Catacaos',
      country_id: 1,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 10,
      name: 'Chulucanas',
      country_id: 1,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 11,
      name: 'Mala',
      country_id: 1,
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
    return queryInterface.bulkDelete('city', null, {})
  }
};
