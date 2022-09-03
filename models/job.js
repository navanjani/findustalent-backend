"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class job extends Model {
    static associate(models) {
      job.belongsTo(models.department, { foreignKey: "departmentId" });
      job.belongsTo(models.category, { foreignKey: "categoryId" });
      job.belongsTo(models.company, { foreignKey: "companyId" });
      job.belongsToMany(models.jobs, {
        through: "jobCandidates",
      });
    }
  }

  job.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      image: {
        type: DataTypes.TEXT,
      },
      salary: {
        type: DataTypes.INTEGER,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      closingDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "job",
    }
  );
  return job;
};
