"use strict";

const { PAYMENT_TYPE_VISA_MASTER, TRANSACTION_STATUS_STARTED } = require("../config/constants");
const Company = require("../models").company;
const Subscription = require("../models").subscription;

module.exports = {
  async up(queryInterface, Sequelize) {
    const company1 = await Company.findOne({
      where: { domain: "findustalent.com" },
    });
    const premiumPackage = await Subscription.findOne({
      where: { name: "Premium 1 Year" },
    });
    await queryInterface.bulkInsert(
      "transactions",
      [
        {
          status: TRANSACTION_STATUS_STARTED,
          paymentType: PAYMENT_TYPE_VISA_MASTER,
          amount: 9.99,
          date: "2022-09-03",
          subscriptionId: premiumPackage.id,
          companyId: company1.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("transactions", null, {});
  },
};
