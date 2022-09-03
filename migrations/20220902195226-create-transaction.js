"use strict";
const { USER_TYPE_CANDIDATE, TRANSACTION_STATUS_STARTED, PAYMENT_TYPE_VISA_MASTER } = require("../config/constants");
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("transactions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      amount: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      date: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      status: {
        allowNull: false,
        type: Sequelize.SMALLINT,
        defaultValue: TRANSACTION_STATUS_STARTED,
      },
      paymentType: {
        allowNull: false,
        type: Sequelize.SMALLINT,
        defaultValue: PAYMENT_TYPE_VISA_MASTER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("transactions");
  },
};
