"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class company extends Model {
    static associate(models) {
      company.hasMany(models.user, { foreignKey: "companyId" });
      company.hasMany(models.transaction, { foreignKey: "companyId" });
      company.hasMany(models.department, { foreignKey: "companyId" });
      company.belongsTo(models.package, { foreignKey: "packageId" });
    }
  }

  company.init(
    {
      name: {
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
      },
      text_color: {
        type: DataTypes.STRING,
      },
      logo: {
        type: DataTypes.STRING,
      },
      packageValidTill: DataTypes.DATE,
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
