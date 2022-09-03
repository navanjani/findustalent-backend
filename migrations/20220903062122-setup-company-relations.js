"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("companies", "subscriptionId", {
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
    await queryInterface.removeColumn("companies", "subscriptionId");
  },
};
