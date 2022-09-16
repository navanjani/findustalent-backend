const { Router } = require("express");
const authMiddleware = require("../auth/middleware");
const isCandidateMiddleware = require("../auth/isCandidateMiddleware");
const Company = require("../models").company;
const Job = require("../models").job;
const JobCandidate = require("../models").jobCandidate;
const JobCandidateStatus = require("../models").jobCandidateStatus;

const router = new Router();

router.get("/applications", authMiddleware, isCandidateMiddleware, async (req, res) => {
  try {
    const candidateJobs = await JobCandidate.findAll({
      where: {
        userId: req.user.id,
      },
      include: [
        {
          model: Job,
          attributes: ["id", "title", "location", "careerLevel", "employmentType", "createdAt", "categoryId", "departmentId", "companyId", "slug"],
          include: [
            {
              model: Company,
              attributes: ["id", "name", "industry", "domain", "logo", "slug"],
            },
          ],
        },
        {
          model: JobCandidateStatus,
        },
      ],
    });

    res.json({ jobs: candidateJobs });
  } catch (e) {
    console.log(e.message);
    return res.status(500).send({ message: "Something went wrong, sorry" });
  }
});

module.exports = router;
