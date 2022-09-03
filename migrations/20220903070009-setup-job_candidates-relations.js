"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("jobCandidates", "jobId", {
      type: Sequelize.INTEGER,
      references: {
        model: "jobs",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
    await queryInterface.addColumn("jobCandidates", "userId", {
      type: Sequelize.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
    await queryInterface.addConstraint("jobCandidates", {
      fields: ["email"],
      type: "foreign key",
      name: "email_fk_job_candidates",
      references: {
        table: "users",
        field: "email",
      },
    });
    await queryInterface.addConstraint("jobCandidates", {
      fields: ["jobId", "email"],
      type: "unique",
      name: "jobId_email_unique",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("jobCandidates", "email_fk_job_candidates");
    await queryInterface.removeConstraint("jobCandidates", "jobId_email_unique");
    await queryInterface.removeColumn("jobCandidates", "jobId");
    await queryInterface.removeColumn("jobCandidates", "userId");
  },
};
