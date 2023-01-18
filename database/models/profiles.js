'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profiles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Profiles.belongsTo(models.Users, { as: 'user', foreignKey: 'user_id' })
      Profiles.belongsTo(models.Roles, { as: 'role', foreignKey: 'role_id' })
      Profiles.belongsTo(models.Countries, { as: 'country', foreignKey: 'country_id' })
      Profiles.hasMany(models.Publications, { as: 'publications', foreignKey: 'profile_id' })
      Profiles.belongsToMany(models.Publications, { as: 'voted_publications', through: models.Votes, foreignKey: 'profile_id' })
    }
  }
  Profiles.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      foreignKey: true
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      foreignKey: true
    },
    image_url: {
      type: DataTypes.STRING
    },
    codephone: {
      type: DataTypes.INTEGER
    },
    phone: {
      type: DataTypes.INTEGER
    },
    country_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      foreignKey: true
    }
    /*
    user_id: DataTypes.UUID,
    role_id: DataTypes.UUID,
    image_url: DataTypes.STRING,
    codephone: DataTypes.INTEGER,
    phone: DataTypes.INTEGER,
    country_id: DataTypes.INTEGER
    */
  }, {
    sequelize,
    modelName: 'Profiles',
    tableName: 'profiles',
    underscored: true,
    timestamps: true,
    scopes: {
      public_view: {
        attributes: ['id', 'user_id', 'role_id', 'country_id']
      },
      no_timestamps: {
        attributes: { exclude: ['created_at', 'updated_at'] }
      },
    },
  });
  return Profiles;
};