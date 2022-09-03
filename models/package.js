"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class package extends Model {
    static associate(models) {
      package.hasMany(models.company, { foreignKey: "packageId" });
      package.hasMany(models.transaction, { foreignKey: "packageId" });
    }
  }

  package.init(
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      price: {
        allowNull: false,
        type: DataTypes.FLOAT,
      },
      config: {
        allowNull: false,
        type: DataTypes.JSON,
      },
    },
    {
      sequelize,
      modelName: "package",
    }
  );
  return package;
};
