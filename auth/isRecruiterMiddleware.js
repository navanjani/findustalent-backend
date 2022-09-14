const isRecruiterAuth = async (req, res, next) => {
  if (req.user.userType !== 2) {
    return res.status(403).send({
      message: "Only a Recruiter can perform this action ",
    });
  }
  return next();
};

module.exports = isRecruiterAuth;
