"use strict";

const { company: Company } = require("../models");
const {
  CAREER_SENIOR_LEVEL,
  CAREER_ENTRY_LEVEL,
  EMPLOYMENT_FULLTIME,
  EMPLOYMENT_CONTRACT,
  SALARY_RANGE_55000_65000,
  SALARY_RANGE_35000_45000,
} = require("../config/constants");
const Category = require("../models").category;
const Department = require("../models").department;
module.exports = {
  async up(queryInterface, Sequelize) {
    const company1 = await Company.findOne({
      where: { domain: "findustalent.com" },
    });
    const company2 = await Company.findOne({
      where: { domain: "navanjani.com" },
    });
    const category1 = await Category.findOne({
      where: { name: "Accountant" },
    });
    const category2 = await Category.findOne({
      where: { name: "Developer" },
    });
    const department1 = await Department.findOne({
      where: { name: "Accounts" },
    });
    const department2 = await Department.findOne({
      where: { name: "Product" },
    });
    await queryInterface.bulkInsert(
      "jobs",
      [
        {
          title: "Senior Accountant",
          slug: "senior-accountant",
          description: "Senior Accountant",
          salaryRange: SALARY_RANGE_55000_65000,
          location: "Amsterdam",
          closingDate: "2022-09-20",
          careerLevel: CAREER_SENIOR_LEVEL,
          employmentType: EMPLOYMENT_FULLTIME,
          companyId: company1.id,
          categoryId: category1.id,
          departmentId: department1.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Senior Fullstack Developer",
          slug: "senior-fullstack-developer",
          description: String(
            "<h4>Overview</h4>\n" +
              "<p>As a senior software engineer in the Software Fundamentals team you will be working on internal tooling that sets our product teams up for success. You will be working on foundational software components that provide the engineering teams for a solid foundation. Your passion for creating software that other developers love results in high quality libraries and documentation used throughout the company.\n</p>\n" +
              '<div class="mt-4">\n' +
              "  <h4>What you'll be doing:</h4>\n" +
              "  <ul><li>Deliver and maintain a suite of (opinionated) software components that support application development, operational observability, and message-driven architectures.</li><li>Write comprehensive user-focused documentation that helps developers understand and adopt foundational tooling.</li><li>Support the integration of cloud native solutions into the software stack.</li><li>Help development teams be on top of their dependencies by using dedicated tooling to track and upgrade dependencies.</li></ul>" +
              "</div>\n" +
              '<div class="mt-4">\n' +
              "  <h4>What you'll bring:</h4>\n" +
              "  <ul><li>A minimum of 6 years of working in a large-scale multi-team multi-application software development environment.</li><li>Extensive experience with PHP, experience with other languages such as Java, Kotlin, TypeScript, or Go is a plus</li><li>Proven experience in providing tools for other developers.</li><li>A pragmatic eye for quality, you know when quality matters.</li><li>Knowledge of observability tooling (metric collection, log aggregation, monitoring).</li><li>Excellent communication skills for communicating with (mostly) technical stakeholders.</li></ul>" +
              "</div>\n" +
              "</div>"
          ),
          salaryRange: SALARY_RANGE_35000_45000,
          location: "Amsterdam",
          closingDate: "2022-09-10",
          careerLevel: CAREER_ENTRY_LEVEL,
          employmentType: EMPLOYMENT_CONTRACT,
          companyId: company2.id,
          categoryId: category2.id,
          departmentId: department2.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("jobs", null, {});
  },
};
