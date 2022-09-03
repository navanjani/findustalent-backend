"use strict";

const { company: Company } = require("../models");
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
      where: { name: "Products" },
    });
    await queryInterface.bulkInsert(
      "jobs",
      [
        {
          title: "Senior Accountant",
          description: "Senior Accountant",
          salary: "60000",
          location: "Amsterdam",
          closingDate: "2022-09-20",
          companyId: company1.id,
          categoryId: category1.id,
          departmentId: department1.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "junior Fullstack Developer",
          description: "Junior Fullstack",
          salary: "35000",
          location: "Amsterdam",
          closingDate: "2022-09-10",
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
