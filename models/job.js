"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class job extends Model {
    static associate(models) {
      job.belongsTo(models.department, { foreignKey: "departmentId" });
      job.belongsTo(models.category, { foreignKey: "categoryId" });
      job.belongsTo(models.company, { foreignKey: "companyId" });
      job.hasMany(models.jobCandidate, { foreignKey: "jobId" });
      // job.belongsToMany(models.users, {
      //   through: "jobCandidate",
      // });
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
      salaryRange: {
        type: DataTypes.SMALLINT,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      closingDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      careerLevel: {
        type: DataTypes.SMALLINT,
        allowNull: false,
      },
      employmentType: {
        type: DataTypes.SMALLINT,
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
