"use strict";

const Job = require("../models").job;
const User = require("../models").user;

module.exports = {
  async up(queryInterface, Sequelize) {
    const job1 = await Job.findOne({
      where: { title: "Senior Fullstack Developer" },
    });
    const job2 = await Job.findOne({
      where: { title: "Full Stack JavaScript Developer" },
    });
    const candidate1 = await User.findOne({
      where: { email: "navanjani30@gmail.com" },
    });
    await queryInterface.bulkInsert(
      "jobCandidates",
      [
        {
          email: "navanjani30@gmail.com",
          firstName: "Navanjani",
          lastName: "Dassanayake",
          coverLetter: "<p>This is cover letter</p>",
          cv: "096505f1-6c2c-463f-af8f-3e4ce699843c",
          linkedinUrl: "https://www.linkedin.com/in/navanjani/",
          phoneNumber: "1234567",
          jobId: job1.id,
          userId: candidate1.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "navanjani30@gmail.com",
          firstName: "Navanjani",
          lastName: "Dassanayake",
          coverLetter: "<p>This is cover letter</p>",
          cv: "096505f1-6c2c-463f-af8f-3e4ce699843c",
          linkedinUrl: "https://www.linkedin.com/in/navanjani/",
          phoneNumber: "1234567",
          jobId: job2.id,
          userId: candidate1.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("jobCandidates", null, {});
  },
};
