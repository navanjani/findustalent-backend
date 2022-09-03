"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("transactions", "companyId", {
      type: Sequelize.INTEGER,
      references: {
        model: "companies",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
    await queryInterface.addColumn("transactions", "subscriptionId", {
      type: Sequelize.INTEGER,
      references: {
        model: "subscriptions",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("transactions", "companyId");
    await queryInterface.removeColumn("transactions", "subscriptionId");
  },
};
