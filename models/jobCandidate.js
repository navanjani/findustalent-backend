"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class jobCandidate extends Model {
    static associate(models) {
      jobCandidate.belongsTo(models.user, { foreignKey: "userId" });
      jobCandidate.belongsTo(models.job, { foreignKey: "jobId" });
      jobCandidate.hasMany(models.jobCandidateStatus, { foreignKey: "jobCandidateId" });
    }
  }

  jobCandidate.init(
    {
      email: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      firstName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      lastName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      coverLetter: {
        type: DataTypes.STRING,
      },
      cv: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      linkedinUrl: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "jobCandidate",
    }
  );
  return jobCandidate;
};
