"use strict";

const Job = require("../models").job;
const User = require("../models").user;

module.exports = {
  async up(queryInterface, Sequelize) {
    const job1 = await Job.findOne({
      where: { title: "Junior Fullstack Developer" },
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
          cv: "b66922df-a66b-4313-b3cf-a7d9960545d8",
          linkedinUrl: "https://www.linkedin.com/in/navanjani/",
          phoneNumber: "1234567",
          jobId: job1.id,
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
