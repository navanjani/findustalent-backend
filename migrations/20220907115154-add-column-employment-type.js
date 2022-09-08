"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("jobs", "employmentType", {
      allowNull: false,
      type: Sequelize.SMALLINT,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("jobs", "employmentType");
  },
};
