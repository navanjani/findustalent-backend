"use strict";

const { Model } = require("sequelize");
const { USER_TYPE_CANDIDATE } = require("../config/constants");

module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    static associate(models) {
      user.belongsToMany(models.jobs, {
        through: "jobCandidates",
      });
      user.belongsTo(models.company, { foreignKey: "companyId" });
    }
  }

  user.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      phoneNumber: DataTypes.STRING,
      profilePicture: DataTypes.STRING,
      userType: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        defaultValue: USER_TYPE_CANDIDATE,
      },
    },
    {
      sequelize,
      modelName: "user",
    }
  );
  return user;
};
