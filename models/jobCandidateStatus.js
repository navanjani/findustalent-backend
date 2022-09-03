"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class jobCandidateStatus extends Model {
    static associate(models) {
      jobCandidateStatus.belongsTo(models.jobCandidate, { foreignKey: "jobCandidateId" });
    }
  }

  jobCandidateStatus.init(
    {
      status: DataTypes.SMALLINT,
    },
    {
      sequelize,
      modelName: "jobCandidateStatus",
    }
  );
  return jobCandidateStatus;
};
