"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class transaction extends Model {
    static associate(models) {
      transaction.belongsTo(models.company, { foreignKey: "companyId" });
      transaction.belongsTo(models.subscription, { foreignKey: "subscriptionId" });
    }
  }

  transaction.init(
    {
      amount: {
        allowNull: false,
        type: DataTypes.FLOAT,
      },
      date: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      status: {
        allowNull: false,
        type: DataTypes.SMALLINT,
      },
      paymentType: {
        allowNull: false,
        type: DataTypes.SMALLINT,
      },
    },
    {
      sequelize,
      modelName: "transaction",
    }
  );
  return transaction;
};
