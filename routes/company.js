const { Router } = require("express");
const Company = require("../models").company;
const Job = require("../models").job;
const Category = require("../models").category;
const Department = require("../models").department;
const authMiddleware = require("../auth/middleware");
const isRecruiterMiddleware = require("../auth/isRecruiterMiddleware");
const {
  EMPLOYMENT_FULLTIME,
  EMPLOYMENT_CONTRACT,
  EMPLOYMENT_INTERNSHIP,
  EMPLOYMENT_PARTTIME,
  EMPLOYMENT_REMOTE,
  EMPLOYMENT_TRAINING,
} = require("../config/constants");
const { CAREER_ENTRY_LEVEL, CAREER_MID_LEVEL, CAREER_SENIOR_LEVEL, CAREER_EXECUTIVE_LEVEL } = require("../config/constants");
const router = new Router();

router.get("/:companySlug/jobs", async (req, res, next) => {
  try {
    const { companySlug } = req.params;
    const company = await Company.findOne({ where: { slug: companySlug } });
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }
    const jobs = await Job.findAll({
      where: { companyId: company.id },
      include: [
        {
          model: Category,
          attributes: ["id", "name"],
        },
        {
          model: Department,
          attributes: ["id", "name"],
        },
      ],
    });
    return res.json({
      jobs,
      total: jobs.length,
    });
  } catch (e) {
    console.log(e.message);
    next(e);
    return res.status(500).send({ message: "Something went wrong, sorry" });
  }
});

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

router.get("/:companyId/departments", authMiddleware, isRecruiterMiddleware, async (req, res, next) => {
  try {
    const { companyId } = req.user;
    if (Number(req.params.companyId) !== companyId) {
      return res.status(403).json({ message: "Not an Authorized user" });
    }
    const departments = await Department.findAll({ where: { companyId: companyId } });
    return res.json({ departments });
  } catch (e) {
    console.log(e.message);
    next(e);
    return res.status(500).send({ message: "Something went wrong, sorry" });
  }
});

router.post("/:companyId/jobs", authMiddleware, isRecruiterMiddleware, async (req, res, next) => {
  const { title, location, category, description, careerLevel, employmentType, closingDate, salaryRange } = req.body;
  if (!title || !description || !salaryRange || !location || !category || !closingDate || !careerLevel || !employmentType) {
    return res.status(400).json({ message: "Missing required fields" });
  }
});
module.exports = router;
