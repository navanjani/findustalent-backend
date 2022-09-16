const isCandidateAuth = async (req, res, next) => {
  if (req.user.userType !== 3) {
    return res.status(403).send({
      message: "Only a candidate can perform this action ",
    });
  }
  return next();
};

module.exports = isCandidateAuth;
