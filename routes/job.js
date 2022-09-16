const { Router } = require("express");
const Category = require("../models").category;
const {
  EMPLOYMENT_FULLTIME,
  EMPLOYMENT_PARTTIME,
  EMPLOYMENT_REMOTE,
  EMPLOYMENT_CONTRACT,
  EMPLOYMENT_INTERNSHIP,
  EMPLOYMENT_TRAINING,
  CAREER_ENTRY_LEVEL,
  CAREER_MID_LEVEL,
  CAREER_SENIOR_LEVEL,
  CAREER_EXECUTIVE_LEVEL,
  SALARY_RANGE_35000_45000,
  SALARY_RANGE_55000_65000,
  SALARY_RANGE_25000_35000,
  SALARY_RANGE_45000_55000,
  SALARY_RANGE_65000_75000,
  SALARY_RANGE_75000_85000,
  SALARY_RANGE_85000_95000,
  SALARY_RANGE_95000_105000,
  APPLICATION_STATUS_APPLIED,
  APPLICATION_STATUS_INTERVIEW,
  APPLICATION_STATUS_REJECTED,
  APPLICATION_STATUS_OFFER,
} = require("../config/constants");

const router = new Router();

router.get("/employment-types", async (req, res, next) => {
  return res.json({
    types: [
      {
        id: EMPLOYMENT_FULLTIME,
        type: "Fulltime",
      },
      {
        id: EMPLOYMENT_PARTTIME,
        type: "Parttime",
      },
      {
        id: EMPLOYMENT_REMOTE,
        type: "Remote",
      },
      {
        id: EMPLOYMENT_CONTRACT,
        type: "Contract",
      },
      {
        id: EMPLOYMENT_INTERNSHIP,
        type: "Internship",
      },
      {
        id: EMPLOYMENT_TRAINING,
        type: "Training",
      },
    ],
  });
});

router.get("/career-levels", async (req, res, next) => {
  return res.json({
    levels: [
      {
        id: CAREER_ENTRY_LEVEL,
        level: "Entry Level",
      },
      {
        id: CAREER_MID_LEVEL,
        level: "Mid Level",
      },
      {
        id: CAREER_SENIOR_LEVEL,
        level: "Senior Level",
      },
      {
        id: CAREER_EXECUTIVE_LEVEL,
        level: "Executive Level",
      },
    ],
  });
});

router.get("/salary-ranges", async (req, res, next) => {
  return res.json({
    ranges: [
      {
        id: SALARY_RANGE_25000_35000,
        range: "25000 - 35000",
      },
      {
        id: SALARY_RANGE_35000_45000,
        range: "35000 - 45000",
      },
      {
        id: SALARY_RANGE_45000_55000,
        range: "45000 - 55000",
      },
      {
        id: SALARY_RANGE_55000_65000,
        range: "55000 - 65000",
      },
      {
        id: SALARY_RANGE_65000_75000,
        range: "65000 - 75000",
      },
      {
        id: SALARY_RANGE_75000_85000,
        range: "75000 - 85000",
      },
      {
        id: SALARY_RANGE_85000_95000,
        range: "85000 - 95000",
      },
      {
        id: SALARY_RANGE_95000_105000,
        range: "95000 - 105000",
      },
    ],
  });
});

router.get("/categories", async (req, res, next) => {
  try {
    const categories = await Category.findAll();
    return res.status(200).json({ categories });
  } catch (e) {
    console.log(e.message);
  }
  next(e);
  return res.status(500).send({ message: "Something went wrong, sorry" });
});

router.get("/statuses", async (req, res, next) => {
  return res.json({
    applicationStatuses: [
      {
        id: APPLICATION_STATUS_APPLIED,
        status: "Applied",
      },
      {
        id: APPLICATION_STATUS_INTERVIEW,
        status: "Interview",
      },
      {
        id: APPLICATION_STATUS_REJECTED,
        status: "Rejected",
      },
      {
        id: APPLICATION_STATUS_OFFER,
        status: "Offer",
      },
    ],
  });
});
module.exports = router;
