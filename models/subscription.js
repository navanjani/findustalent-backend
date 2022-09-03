"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class subscription extends Model {
    static associate(models) {
      subscription.hasMany(models.company, { foreignKey: "subscriptionId" });
      subscription.hasMany(models.transaction, { foreignKey: "subscriptionId" });
    }
  }

  subscription.init(
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
      modelName: "subscription",
    }
  );
  return subscription;
};
