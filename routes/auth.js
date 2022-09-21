const bcrypt = require("bcrypt");
const { Router } = require("express");
const { toJWT } = require("../auth/jwt");
const authMiddleware = require("../auth/middleware");
const {
  SALT_ROUNDS,
  FREE_EMAIL_LIST
} = require("../config/constants");
const User = require("../models").user;
const Company = require("../models").company;

const router = new Router();

// login
router.post("/login", async (req, res, next) => {
  try {
    const {
      email,
      password
    } = req.body;

    if (!email || !password) {
      return res.status(400)
        .send({ message: "Please provide both email and password" });
    }

    const user = await User.findOne({ where: { email } });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(400)
        .send({
          message: "User with that email not found or password incorrect",
        });
    }
    // const offer = await Offer.findOne({
    //   where: { userId: req.user.id },
    //   include: [Offer],
    // });
    delete user.dataValues["password"]; // don't send back the password hash
    const token = toJWT({ userId: user.id });
    return res.status(200)
      .send({
        token,
        user: user.dataValues,
      });
  } catch (error) {
    console.log(error);
    return res.status(400)
      .send({ message: "Something went wrong, sorry" });
  }
});

// signup
router.post("/signup", async (req, res) => {
  const {
    email,
    password,
    firstName,
    lastName,
    phoneNumber,
    userType
  } = req.body;
  if (!email || !password || !firstName || !lastName || !userType) {
    return res.status(400)
      .send("Please provide an email, password and a names");
  }

  try {
    const emailParts = email.split("@");
    const domainParts = emailParts[1].split(".");

    if (userType === 2 && FREE_EMAIL_LIST.includes(domainParts[0])) {
      return res.status(400)
        .send({ message: "Please Provide a valid Work email!" });
    }

    const domain = emailParts[1];
    const company = await Company.findOne({ where: { domain } });

    const companyId = company ? company.id : null;

    const newUser = await User.create({
      email,
      password: bcrypt.hashSync(password, SALT_ROUNDS),
      firstName,
      lastName,
      phoneNumber,
      userType,
      companyId,
    });

    delete newUser.dataValues["password"]; // don't send back the password hash

    const token = toJWT({ userId: newUser.id });

    res.status(201)
      .json({
        token,
        user: newUser.dataValues,
        company,
      });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(400)
        .send({ message: "There is an existing account with this email" });
    }

    return res.status(400)
      .send({ message: "Something went wrong, sorry" });
  }
});

// The /me endpoint can be used to:
// - get the users email & name using only their token
// - checking if a token is (still) valid
router.get("/me", authMiddleware, async (req, res) => {
  // don't send back the password hash
  // get users company
  const company = await Company.findByPk(req.user.companyId);
  delete req.user.dataValues["password"];
  res.status(200)
    .send({
      user: req.user.dataValues,
      company,
    });
});

module.exports = router;
