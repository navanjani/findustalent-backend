"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("jobs", "slug", {
      allowNull: false,
      type: Sequelize.STRING,
    });
    await queryInterface.addConstraint("jobs", {
      fields: ["companyId", "slug"],
      type: "unique",
      name: "companyId_jobs_unique",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("jobs", "companyId_jobs_unique");
    await queryInterface.removeColumn("jobs", "slug");
  },
};
