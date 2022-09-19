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
          description:
            "• You're comfortable working with both front- and back-end languages.• You have knowledge of multiple back-end languages (like C#, Java and Python) and JavaScript frameworks (like Angular, React, and Vue). • You have knowledge of multiple front-end languages and libraries (like HTML, CSS and JavaScript). • You're familiar with databases (like MySQL and MongoDB), web servers (e.g. Apache) and UI/UX design. • You have experience with testing and debugging. • You have an eye for layout aesthetics.• You're analytical and good at time management. • You have great communication and problem-solving skills. • You're curious about new technologies and you're excited to find ways to implement them in your work.• You have a big appetite to learn and improve your skills.",
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
