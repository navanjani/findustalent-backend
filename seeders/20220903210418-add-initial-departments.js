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
          name: "Products",
          companyId: company2.id,
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
