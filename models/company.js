"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class company extends Model {
    static associate(models) {
      company.hasMany(models.user, { foreignKey: "companyId" });
      company.hasMany(models.transaction, { foreignKey: "companyId" });
      company.hasMany(models.department, { foreignKey: "companyId" });
      company.belongsTo(models.subscription, { foreignKey: "subscriptionId" });
    }
  }

  company.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      industry: {
        type: DataTypes.SMALLINT,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      domain: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      primaryColor: {
        type: DataTypes.STRING,
        defaultValue: "#ffffff",
      },
      textColor: {
        type: DataTypes.STRING,
        defaultValue: "#000000",
      },
      logo: {
        type: DataTypes.STRING,
      },
      subscriptionValidTill: DataTypes.DATE,
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: "company",
    }
  );
  return company;
};
