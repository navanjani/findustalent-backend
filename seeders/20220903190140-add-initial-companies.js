"use strict";

const Subscription = require("../models").subscription;
module.exports = {
  async up(queryInterface, Sequelize) {
    const freePackage = await Subscription.findOne({
      where: { name: "Free" },
    });
    const premiumPackage = await Subscription.findOne({
      where: { name: "Premium 1 Year" },
    });
    const date = new Date();
    const date2 = new Date();
    await queryInterface.bulkInsert(
      "companies",
      [
        {
          name: "FindUsTalent.com BV",
          domain: "findustalent.com",
          primaryColor: "#FFFFFF",
          textColor: "#000000",
          slug: "findustalent-com",
          subscriptionId: premiumPackage.id,
          subscriptionValidTill: new Date(date.setMonth(date.getMonth() + premiumPackage.config.durationInMonths)),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Navanjani BV",
          domain: "navanjani.com",
          primaryColor: "#d52d2d",
          textColor: "#3e3e3e",
          slug: "navanjani-com",
          subscriptionId: freePackage.id,
          subscriptionValidTill: new Date(date2.setMonth(date2.getMonth() + freePackage.config.durationInMonths)),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("companies", null, {});
  },
};
