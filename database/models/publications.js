'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Publications extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Publications.belongsTo(models.Profiles, { as: 'user', foreignKey: 'user_id' })
      Publications.belongsTo(models.Roles, { as: 'role', foreignKey: 'role_id' })
      Publications.belongsTo(models.Countries, { as: 'country', foreignKey: 'country_id' })
      Publications.belongsToMany(models.Profiles, { as: 'voter_profiles', through: models.Votes, foreignKey: 'publication_id' })
    }
  }
  Publications.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID
    },
    profile_id: {
      type: DataTypes.UUID,
      allowNull: false,
      foreignKey: true
    },
    publication_type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      foreignKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING
    },
    content: {
      type: DataTypes.STRING
    },
    picture: {
      type: DataTypes.STRING
    },
    city_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      foreignKey: true
    },
    imag_url: {
      type: DataTypes.STRING
    }
    /*
    profile_id: DataTypes.UUID,
    publication_type_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    content: DataTypes.STRING,
    picture: DataTypes.STRING,
    city_id: DataTypes.STRING,
    imag_url: DataTypes.STRING
    */
  }, {
    sequelize,
    modelName: 'Publications',
    tableName: 'publications',
    underscored: true,
    timestamps: true,
    scopes: {
      public_view: {
        attributes: ['id', 'country_id', 'profile_id', 'publication_type_id', 'city_id']
      },
      no_timestamps: {
        attributes: { exclude: ['created_at', 'updated_at'] }
      },
    },
  });
  return Publications;
};