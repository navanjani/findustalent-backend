const { Router } = require("express");
const slugify = require("slugify");
const Company = require("../models").company;
const Department = require("../models").department;
const Category = require("../models").category;
const Job = require("../models").job;
const JobCandidate = require("../models").jobCandidate;
const JobCandidateStatus = require("../models").jobCandidateStatus;
const authMiddleware = require("../auth/middleware");
const isRecruiterMiddleware = require("../auth/isRecruiterMiddleware");
const {
  APPLICATION_STATUS_APPLIED,
  INDUSTRY_COMPUTER_IT,
  INDUSTRY_CONSTRUCTION,
  INDUSTRY_AGRICULTURE,
  INDUSTRY_EDUCATION,
  INDUSTRY_ENERGY,
  INDUSTRY_ELECTRONICS,
  INDUSTRY_ENTERTAINMENT,
  INDUSTRY_FOOD,
  INDUSTRY_HEALTHCARE,
  INDUSTRY_HOSPITALITY,
  INDUSTRY_MUSIC,
  INDUSTRY_TRANSPORT,
} = require("../config/constants");
const { subscription: Subscription } = require("../models");

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
        {
          model: JobCandidate,
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

router.get("/:companyId([0-9]+)/departments", authMiddleware, isRecruiterMiddleware, async (req, res, next) => {
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

router.post("/:companyId([0-9]+)/jobs", authMiddleware, isRecruiterMiddleware, async (req, res, next) => {
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
    return res.status(201).json({
      message: "Job posted",
      jobs,
    });
  } catch (e) {
    console.log(e.message);
    return res.status(500).send({ message: "Something went wrong, sorry" });
  }
});

router.get("/:companyId([0-9]+)/candidates", authMiddleware, isRecruiterMiddleware, async (req, res, next) => {
  try {
    const { companyId } = req.user;
    if (companyId !== Number(req.params.companyId)) {
      return res.status(403).json({ message: "Not an Authorized user" });
    }
    const companyJobs = await Job.findAll({
      attributes: ["id"],
      where: { companyId: companyId },
      raw: true,
    });
    const companyJobIds = companyJobs.map((job) => job.id);
    const candidates = await JobCandidate.findAll({
      where: { jobId: companyJobIds },
      include: [
        {
          model: Job,
          attributes: ["id", "title", "location"],
        },
        {
          model: JobCandidateStatus,
        },
      ],
    });
    return res.json({ candidates });
  } catch (e) {
    console.log(e.message);
    return res.status(500).send({ message: "Something went wrong, sorry" });
  }
});

router.get("/jobs/:jobId([0-9]+)/candidates/:candidateId([0-9]+)", authMiddleware, isRecruiterMiddleware, async (req, res, next) => {
  try {
    const { jobId, candidateId } = req.params;
    // Job posted by users company
    const job = await Job.findByPk(jobId);
    if (job.companyId !== req.user.companyId) {
      return res.status(403).json({ message: "Not an Authorized user" });
    }

    // Candidate applied to same job we checked above
    const candidate = await JobCandidate.findOne({
      where: {
        id: candidateId,
        jobId: jobId,
      },
      include: [
        {
          model: Job,
          attributes: ["id", "title", "location"],
        },
        {
          model: JobCandidateStatus,
        },
      ],
    });
    res.json({ candidate });
  } catch (e) {
    console.log(e.message);
    return res.status(500).send({ message: "Something went wrong, sorry" });
  }
});

// Public
router.get("/industries", async (req, res, next) => {
  return res.json({
    industries: [
      {
        id: INDUSTRY_COMPUTER_IT,
        industry: "Computer/ IT",
      },
      {
        id: INDUSTRY_CONSTRUCTION,
        industry: "Construction",
      },
      {
        id: INDUSTRY_AGRICULTURE,
        industry: "Agriculture",
      },
      {
        id: INDUSTRY_EDUCATION,
        industry: "Education",
      },
      {
        id: INDUSTRY_ENERGY,
        industry: "Energy",
      },
      {
        id: INDUSTRY_ELECTRONICS,
        industry: "Electronics",
      },
      {
        id: INDUSTRY_ENTERTAINMENT,
        industry: "Entertainment",
      },
      {
        id: INDUSTRY_FOOD,
        industry: "Food",
      },
      {
        id: INDUSTRY_HEALTHCARE,
        industry: "Health-care",
      },
      {
        id: INDUSTRY_HOSPITALITY,
        industry: "Hospitality",
      },
      {
        id: INDUSTRY_MUSIC,
        industry: "Music",
      },
      {
        id: INDUSTRY_TRANSPORT,
        industry: "Transport",
      },
    ],
  });
});

router.get("/:companySlug", async (req, res, next) => {
  try {
    const { companySlug } = req.params;
    const company = await Company.findOne({ where: { slug: companySlug } });
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
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
    return res.status(500).send({ message: "Something went wrong, sorry" });
  }
});

router.get("/:companySlug/jobs/:jobSlug", async (req, res, next) => {
  try {
    const { companySlug, jobSlug } = req.params;
    const company = await Company.findOne({ where: { slug: companySlug } });
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
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
      return res.status(404).json({ message: "Job not found" });
    }
    return res.json({
      job,
    });
  } catch (e) {
    console.log(e.message);
    return res.status(500).send({ message: "Something went wrong, sorry" });
  }
});

router.post("/:companySlug/jobs/:jobSlug/apply", async (req, res, next) => {
  try {
    const { companySlug, jobSlug } = req.params;
    const { firstName, lastName, email, phoneNumber, cv, linkedinUrl, coverLetter } = req.body;
    if (!firstName || !lastName || !email || !phoneNumber || !cv || !linkedinUrl || !coverLetter) {
      return res.status(400).json({ message: "Bad Request" });
    }
    const company = await Company.findOne({ where: { slug: companySlug } });
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }
    const job = await Job.findOne({ where: { slug: jobSlug } });
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    const newJobApplication = await JobCandidate.create({
      firstName,
      lastName,
      email,
      phoneNumber,
      cv,
      coverLetter,
      linkedinUrl,
      jobId: job.id,
    });
    const newJobCandidateStatus = await JobCandidateStatus.create({
      jobCandidateId: newJobApplication.id,
      status: APPLICATION_STATUS_APPLIED,
    });
    return res.json({
      message: "Application sent",
      applicationId: newJobApplication.id,
    });
  } catch (e) {
    if (e?.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({ message: "You have already applied for this job" });
    }
    console.log(e.message);
    next(e);
  }
});

router.post("/", authMiddleware, isRecruiterMiddleware, async (req, res, next) => {
  const { name, industry, location, primaryColor, textColor } = req.body;
  if (!name || !industry || !location || !primaryColor || !textColor) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  const freePackage = await Subscription.findOne({ where: { name: "Free" } });
  const domain = req.user.email.split("@")[1];
  const slug = domain.split(".").join("-");
  const date = new Date();
  try {
    const newCompany = await Company.create({
      name,
      industry,
      location,
      primaryColor,
      textColor,
      domain,
      slug,
      subscriptionId: freePackage.id,
      subscriptionValidTill: new Date(date.setMonth(date.getMonth() + freePackage.config.durationInMonths)),
    });

    const defaultDepartment = await Department.create({
      name: "Default Department",
      companyId: newCompany.id,
    });

    const user = req.user.update({
      companyId: newCompany.id,
    });
    return res.json({
      message: "Company registered",
      company: newCompany,
      user: user,
    });
  } catch (e) {
    console.log(e.message);
  }
});

module.exports = router;
