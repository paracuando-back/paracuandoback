'use strict'
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class City extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      City.belongsTo(models.Countries, { as: 'country', foreignKey: 'country_id' })
      City.hasMany(models.Publications, { as: 'publications', foreignKey: 'city_id' })
    }
  }
  City.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    country_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      foreignKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
    /*
    country_id: DataTypes.INTEGER,
    name: DataTypes.STRING
    */
  }, {
    sequelize,
    modelName: 'City',
    tableName: 'city',
    underscored: true,
    timestamps: true,
    scopes: {
      public_view: {
        attributes: ['id', 'country_id']
      },
      no_timestamps: {
        attributes: { exclude: ['created_at', 'updated_at'] }
      },
    },
  });
  return City;
}