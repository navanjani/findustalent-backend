"use strict";
const { APPLICATION_STATUS_APPLIED } = require("../config/constants");
const JobCandidate = require("../models").jobCandidate;
module.exports = {
  async up(queryInterface, Sequelize) {
    const jobCandidate1 = await JobCandidate.findOne({
      where: { email: "navanjani30@gmail.com" },
    });
    await queryInterface.bulkInsert(
      "jobCandidateStatuses",
      [
        {
          status: APPLICATION_STATUS_APPLIED,
          jobCandidateId: jobCandidate1.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("jobCandidateStatuses", null, {});
  },
};
