'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Countries extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Countries.hasMany(models.City, { as: 'cities', foreignKey: 'country_id' })
      Countries.hasMany(models.Profiles, { as: 'profiles', foreignKey: 'country_id' })
    }
  }
  Countries.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
    /*
    name: DataTypes.STRING
    */
  }, {
    sequelize,
    modelName: 'Countries',
    tableName: 'countries',
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
  return Countries;
};