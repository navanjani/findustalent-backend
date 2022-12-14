module.exports = {
  // App settings
  SALT_ROUNDS: 10,
  PORT: process.env.PORT || 4000,

  // User Types
  USER_TYPE_ADMIN: 1,
  USER_TYPE_RECRUITER: 2,
  USER_TYPE_CANDIDATE: 3,

  // Career Levels
  CAREER_ENTRY_LEVEL: 1,
  CAREER_MID_LEVEL: 2,
  CAREER_SENIOR_LEVEL: 3,
  CAREER_EXECUTIVE_LEVEL: 4,

  // Employment Types
  EMPLOYMENT_FULLTIME: 1,
  EMPLOYMENT_PARTTIME: 2,
  EMPLOYMENT_REMOTE: 3,
  EMPLOYMENT_CONTRACT: 4,
  EMPLOYMENT_INTERNSHIP: 5,
  EMPLOYMENT_TRAINING: 6,

  // Salary Range
  SALARY_RANGE_25000_35000: 1,
  SALARY_RANGE_35000_45000: 2,
  SALARY_RANGE_45000_55000: 3,
  SALARY_RANGE_55000_65000: 4,
  SALARY_RANGE_65000_75000: 5,
  SALARY_RANGE_75000_85000: 6,
  SALARY_RANGE_85000_95000: 7,
  SALARY_RANGE_95000_105000: 8,

  //Industries
  INDUSTRY_COMPUTER_IT: 1,
  INDUSTRY_CONSTRUCTION: 2,
  INDUSTRY_AGRICULTURE: 3,
  INDUSTRY_EDUCATION: 4,
  INDUSTRY_ENTERTAINMENT: 5,
  INDUSTRY_ELECTRONICS: 6,
  INDUSTRY_ENERGY: 7,
  INDUSTRY_FOOD: 8,
  INDUSTRY_HEALTHCARE: 9,
  INDUSTRY_TRANSPORT: 10,
  INDUSTRY_MUSIC: 11,
  INDUSTRY_HOSPITALITY: 12,

  // Application Statuses
  APPLICATION_STATUS_APPLIED: 1,
  APPLICATION_STATUS_INTERVIEW: 2,
  APPLICATION_STATUS_REJECTED: 3,
  APPLICATION_STATUS_OFFER: 4,

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

  FREE_EMAIL_LIST: ["gmail", "yahoo", "outlook", "hotmail", "aol"],
};
