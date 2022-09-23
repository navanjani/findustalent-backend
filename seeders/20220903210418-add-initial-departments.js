"use strict";

const { company: Company } = require("../models");
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
      "departments",
      [
        {
          name: "Accounts",
          companyId: company1.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Product",
          companyId: company2.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Product",
          companyId: company3.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Teaching",
          companyId: company3.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("departments", null, {});
  },
};
