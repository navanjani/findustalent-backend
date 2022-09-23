"use strict";

const bcrypt = require("bcrypt");
const { USER_TYPE_ADMIN, USER_TYPE_RECRUITER, USER_TYPE_CANDIDATE } = require("../config/constants");
const Company = require("../models").company;

module.exports = {
  async up(queryInterface, Sequelize) {
    const company1 = await Company.findOne({
      where: { domain: "findustalent.com" },
    });
    const company2 = await Company.findOne({
      where: { domain: "navanjani.com" },
    });
    const company3 = await Company.findOne({
      where: { domain: "codaisseur.com" },
    });
    await queryInterface.bulkInsert(
      "users",
      [
        {
          firstName: "Navanjani",
          lastName: "Admin",
          email: "info@navanjani.com",
          phoneNumber: 612345677,
          password: bcrypt.hashSync("admin@2022", 10),
          userType: USER_TYPE_ADMIN,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Navanjani",
          lastName: "Recruiter 1",
          email: "hi@navanjani.com",
          phoneNumber: 612345678,
          password: bcrypt.hashSync("recuiter1@2022", 10),
          userType: USER_TYPE_RECRUITER,
          companyId: company2.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Navanjani",
          lastName: "Recruiter 2",
          email: "info@findustalent.com",
          phoneNumber: 612345678,
          password: bcrypt.hashSync("recuiter2@2022", 10),
          userType: USER_TYPE_RECRUITER,
          companyId: company1.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Navanjani",
          lastName: "Dassanayake",
          email: "navanjani30@gmail.com",
          phoneNumber: 612345679,
          password: bcrypt.hashSync("user@2022", 10),
          userType: USER_TYPE_CANDIDATE,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Navanjani",
          lastName: "Codaisseur",
          email: "navanjani@codaisseur.com",
          phoneNumber: 612345679,
          password: bcrypt.hashSync("recuiter3@2022", 10),
          userType: USER_TYPE_RECRUITER,
          companyId: company3.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
