'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PublicationsTypes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PublicationsTypes.hasMany(models.Publications, { as: 'publications', foreignKey: 'publication_type_id' })

    }
  }
  PublicationsTypes.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    description: {
      type: Sequelize.STRING
    }

    /*
    name: DataTypes.STRING,
    description: DataTypes.STRING
    */
  }, {
    sequelize,
    modelName: 'PublicationsTypes',
    tableName: 'publications_types',
    underscored: true,
    timestamps: true,
    scopes: {
      public_view: {
        attributes: ['id']
      },
      no_timestamps: {
        attributes: { exclude: ['created_at', 'updated_at'] }
      },
    },
  });
  return PublicationsTypes;
};