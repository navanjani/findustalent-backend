module.exports = {
  // App settings
  SALT_ROUNDS: 10,
  PORT: process.env.PORT || 4000,

  // User Types
  USER_TYPE_ADMIN: 1,
  USER_TYPE_RECRUITER: 2,
  USER_TYPE_CANDIDATE: 3,

  // Application Statuses
  APPLICATION_STATUS_APPLIED: 1,

  // Transaction Statuses
  TRANSACTION_STATUS_STARTED: 1,
  TRANSACTION_STATUS_PAID: 2,
  TRANSACTION_STATUS_REJECTED: 3,
  TRANSACTION_STATUS_REFUNDED: 4,

  // Payment Types
  PAYMENT_TYPE_VISA_MASTER: 1,
  PAYMENT_TYPE_IDEAL: 2,
  PAYMENT_TYPE_PAYPAL: 3,

  // Package Configs
  PACKAGE_FREE: {
    jobLimit: 2,
    durationInMonths: 1,
  },
  PACKAGE_PREMIUM: {
    jobLimit: 20,
    durationInMonths: 12,
  },
};
