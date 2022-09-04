const { Router } = require("express");
const Company = require("../models").company;
const Job = require("../models").job;

const router = new Router();

router.get("/:companySlug/jobs", async (req, res, next) => {
  try {
    const { companySlug } = req.params;
    const company = await Company.findOne({ where: { slug: companySlug } });
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }
    const jobs = await Job.findAll({ where: { companyId: company.id } });
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
module.exports = router;
