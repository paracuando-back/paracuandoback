'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Votes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Votes.belongsTo(models.Profiles, { as: 'profile', foreignKey: 'profile_id' })
      Votes.belongsTo(models.Publications, { as: 'publication', foreignKey: 'publication_id' })
    }
  }
  Votes.init({
    publication_id: {
      type: DataTypes.UUID,
      allowNull: false,
      foreignKey: true,
      primaryKey: true
    },
    profile_id: {
      type: DataTypes.UUID,
      allowNull: false,
      foreignKey: true,
      primaryKey: true
    }
    /*
    publications_id: DataTypes.UUID,
    profile_id: DataTypes.UUID
    */
  }, {
    sequelize,
    modelName: 'Votes',
    tableName: 'votes',
    underscored: true,
    timestamps: true,
    scopes: {
      public_view: {
        attributes: ['publication_id', 'profile_id']
      },
      no_timestamps: {
        attributes: { exclude: ['created_at', 'updated_at'] }
      },
    },
  });
  return Votes;
};