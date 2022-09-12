const { Router } = require("express");
const slugify = require("slugify");
const Company = require("../models").company;
const Job = require("../models").job;
const Department = require("../models").department;
const Category = require("../models").category;
const JobCandidates = require("../models").jobCandidate;
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

router.get("/:companyId([0-9]+)/jobs", authMiddleware, isRecruiterMiddleware, async (req, res, next) => {
  try {
    const { companyId } = req.user;
    if (Number(req.params.companyId) !== companyId) {
      return res.status(403).json({ message: "Not an Authorized user" });
    }
    const jobs = await Job.findAll({
      where: { companyId: companyId },
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
    return res.status(500).send({ message: "Something went wrong, sorry" });
  }
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
    return res.status(500).send({ message: "Something went wrong, sorry" });
  }
});

router.post("/:companyId/jobs", authMiddleware, isRecruiterMiddleware, async (req, res, next) => {
  const { companyId } = req.user;
  if (companyId !== Number(req.params.companyId)) {
    return res.status(403).json({ message: "Not an Authorized user" });
  }
  const { title, location, categoryId, description, careerLevel, employmentType, closingDate, salaryRange, departmentId } = req.body;
  if (!title || !description || !salaryRange || !location || !categoryId || !closingDate || !careerLevel || !employmentType || !departmentId) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  try {
    const newJob = await Job.create({
      title,
      slug: slugify(title, { lower: true }),
      location,
      categoryId,
      description,
      careerLevel,
      employmentType,
      closingDate,
      salaryRange,
      departmentId,
      companyId,
    });

    const jobs = await Job.findAll({ where: { companyId } });
    res.status(201).json({
      message: "Job posted",
      jobs,
    });
  } catch (e) {
    console.log(e.message);
    return res.status(500).send({ message: "Something went wrong, sorry" });
  }
});

// Public
router.get("/:companySlug", async (req, res, next) => {
  try {
    const { companySlug } = req.params;
    const company = await Company.findOne({ where: { slug: companySlug } });
    if (!company) {
      res.status(404).json({ message: "Company not found" });
    }
    return res.json({
      company,
    });
  } catch (e) {
    console.log(e.message);
    return res.status(500).send({ message: "Something went wrong, sorry" });
  }
});

router.get("/:companySlug/jobs", async (req, res, next) => {
  try {
    const { companySlug } = req.params;
    const company = await Company.findOne({ where: { slug: companySlug } });
    if (!company) {
      res.status(404).json({ message: "Company not found" });
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
    return res.status(500).send({ message: "Something went wrong, sorry" });
  }
});

router.get("/:companySlug/jobs/:jobSlug", async (req, res, next) => {
  try {
    const { companySlug, jobSlug } = req.params;
    const company = await Company.findOne({ where: { slug: companySlug } });
    if (!company) {
      res.status(404).json({ message: "Company not found" });
    }
    const job = await Job.findOne({
      where: {
        companyId: company.id,
        slug: jobSlug,
      },
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
    if (!job) {
      res.status(404).json({ message: "Job not found" });
    }
    return res.json({
      job,
    });
  } catch (e) {
    console.log(e.message);
    return res.status(500).send({ message: "Something went wrong, sorry" });
  }
});

router.post("/:companySlug/:jobSlug/apply", async (req, res, next) => {
  try {
    const { companySlug, jobSlug } = req.params;
    const { firstName, lastName, email, phoneNumber, cv, linkedinUrl, coverLetter } = req.body;
    if (!firstName || !lastName || !email || !phoneNumber || !cv || !linkedinUrl || !coverLetter) {
      res.status(400).json({ message: "Bad Request" });
    }
    const company = await Company.findOne({ where: { slug: companySlug } });
    if (!company) {
      res.status(404).json({ message: "Company not found" });
    }
    const job = await Job.findOne({ where: { slug: jobSlug } });
    if (!job) {
      res.status(404).json({ message: "Job not found" });
    }
    const newJobApplication = await JobCandidates.create({
      firstName,
      lastName,
      email,
      phoneNumber,
      cv,
      coverLetter,
      linkedinUrl,
      jobId: job.id,
    });
    const jobApplications = await JobCandidates.findAll({ where: { jobId: job.id } });
    return res.json({
      message: "Application sent",
      jobApplications,
    });
  } catch (e) {
    console.log(e.message);
    next(e);
  }
});

module.exports = router;
