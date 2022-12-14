"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("companies", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      industry: {
        allowNull: false,
        type: Sequelize.SMALLINT,
      },
      location: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      domain: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING,
      },
      primaryColor: {
        type: Sequelize.STRING,
        defaultValue: "#ffffff",
      },
      textColor: {
        type: Sequelize.STRING,
        defaultValue: "#000000",
      },
      logo: {
        type: Sequelize.STRING,
      },
      subscriptionValidTill: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      slug: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("companies");
  },
};
