'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Users.hasOne(models.Profiles, { as: 'profile', foreignKey: 'user_id' })
    }
  }
  Users.init({
    id: { // usando UUID
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
        notEmpty: true
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email_verified: {
      type: DataTypes.DATE
    },
    token: {
      type: DataTypes.STRING
    }
    /*
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email_verified: DataTypes.DATE,
    token: DataTypes.STRING^
    */
  }, {
    sequelize,
    modelName: 'Users',
    tableName: 'users',
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
  return Users;
};