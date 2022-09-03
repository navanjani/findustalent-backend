"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class department extends Model {
    static associate(models) {
      department.belongsTo(models.company, { foreignKey: "companyId" });
      department.hasMany(models.job, { foreignKey: "departmentId" });
    }
  }

  department.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "department",
    }
  );
  return department;
};
