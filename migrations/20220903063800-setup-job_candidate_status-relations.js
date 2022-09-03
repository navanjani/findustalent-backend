"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("jobCandidateStatuses", "jobCandidateId", {
      type: Sequelize.INTEGER,
      references: {
        model: "jobCandidates",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("jobCandidateStatuses", "jobCandidateId");
  },
};
