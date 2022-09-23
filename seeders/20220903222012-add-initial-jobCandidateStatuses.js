"use strict";
const { APPLICATION_STATUS_APPLIED } = require("../config/constants");
const { job: Job } = require("../models");
const JobCandidate = require("../models").jobCandidate;
module.exports = {
  async up(queryInterface, Sequelize) {
    const job1 = await Job.findOne({
      where: { title: "Senior Fullstack Developer" },
    });
    const job2 = await Job.findOne({
      where: { title: "Full Stack JavaScript Developer" },
    });
    const jobCandidate1 = await JobCandidate.findOne({
      where: {
        email: "navanjani30@gmail.com",
        jobId: job1.id,
      },
    });
    const jobCandidate2 = await JobCandidate.findOne({
      where: {
        email: "navanjani30@gmail.com",
        jobId: job2.id,
      },
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
        {
          status: APPLICATION_STATUS_APPLIED,
          jobCandidateId: jobCandidate2.id,
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
