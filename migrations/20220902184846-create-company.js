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
      domain: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING,
      },
      primaryColor: {
        type: Sequelize.STRING,
      },
      textColor: {
        type: Sequelize.STRING,
      },
      logo: {
        type: Sequelize.STRING,
      },
      packageValidTill: {
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
