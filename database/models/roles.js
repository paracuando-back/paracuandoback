'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Roles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Users.hasMany(models.Profiles, { as: 'profiles', foreignKey: 'role_id' })
    }
  }
  Roles.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    }
    /*
    name: DataTypes.STRING
    */
  }, {
    sequelize,
    modelName: 'Roles',
    tableName: 'roles',
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
  return Roles;
};