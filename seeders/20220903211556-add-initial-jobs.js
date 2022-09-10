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
          title: "Junior Fullstack Developer",
          slug: "junior-fullstack-developer",
          description: "Junior Fullstack",
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
