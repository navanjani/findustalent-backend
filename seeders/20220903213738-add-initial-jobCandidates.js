"use strict";
const Job = require("../models").job;
const User = require("../models").user;
module.exports = {
  async up(queryInterface, Sequelize) {
    const job1 = await Job.findOne({
      where: { title: "Senior Accountant" },
    });
    const job2 = await Job.findOne({
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
          coverLetter: "hjfdgdj",
          cv: "chhgj",
          linkedinUrl: "ddghasfg",
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
