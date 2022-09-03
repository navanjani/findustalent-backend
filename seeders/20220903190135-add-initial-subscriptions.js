"use strict";

const { PACKAGE_FREE, PACKAGE_PREMIUM } = require("../config/constants");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "subscriptions",
      [
        {
          name: "Free",
          price: 0.0,
          config: JSON.stringify(PACKAGE_FREE),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Premium 1 Year",
          price: 9.99,
          config: JSON.stringify(PACKAGE_PREMIUM),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("subscriptions", null, {});
  },
};
