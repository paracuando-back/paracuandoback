'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.createTable('publications', {
        id: {
          allowNull: false,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
          type: Sequelize.UUID
        },
        profile_id: {
          type: Sequelize.UUID,
          allowNull: false,
          foreignKey: true,
          references: {
            model: 'profiles',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'RESTRICT'
        },
        publication_type_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          foreignKey: true,
          references: {
            model: 'publications_types',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'RESTRICT'
        },
        title: {
          type: Sequelize.STRING,
          allowNull: false
        },
        description: {
          type: Sequelize.STRING
        },
        content: {
          type: Sequelize.STRING
        },
        picture: {
          type: Sequelize.STRING
        },
        city_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          foreignKey: true,
          references: {
            model: 'city',
            key: 'id'
          }
        },
        imag_url: {
          type: Sequelize.STRING
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          field: 'created_at'
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          field: 'updatedcreated_at'
        }
      }, { transaction })
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },
  down: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.dropTable('publications', { transaction })
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
}



/*
'use strict';
/** @type {import('sequelize-cli').Migration} */
/*
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Publications', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      profile_id: {
        type: Sequelize.UUID
      },
      publication_type_id: {
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      content: {
        type: Sequelize.STRING
      },
      picture: {
        type: Sequelize.STRING
      },
      city_id: {
        type: Sequelize.STRING
      },
      imag_url: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Publications');
  }
};
*/