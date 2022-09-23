"use strict";

const Subscription = require("../models").subscription;
module.exports = {
  async up(queryInterface, Sequelize) {
    const freePackage = await Subscription.findOne({
      where: { name: "Free" },
    });
    const premiumPackage = await Subscription.findOne({
      where: { name: "Premium 1 Year" },
    });
    const date = new Date();
    const date2 = new Date();
    await queryInterface.bulkInsert(
      "companies",
      [
        {
          name: "FindUsTalent.com",
          domain: "findustalent.com",
          industry: 1,
          location: "Amsterdam, Netherlands",
          primaryColor: "#FFFFFF",
          textColor: "#000000",
          slug: "findustalent-com",
          subscriptionId: premiumPackage.id,
          subscriptionValidTill: new Date(date.setMonth(date.getMonth() + premiumPackage.config.durationInMonths)),
          description: String(
            "<p>FindUsTalent is SaSS product that enables compaies to create career pages and candidates to track application status\n</p>" +
              "\n" +
              "<p>Comopanies are provided with best tools to build the perfect carrer and find the best talent in the market</p>"
          ),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Navanjani Designs",
          domain: "navanjani.com",
          industry: 1,
          location: "Almere, Netherlands",
          primaryColor: "#d52d2d",
          textColor: "#3e3e3e",
          slug: "navanjani-com",
          subscriptionId: freePackage.id,
          subscriptionValidTill: new Date(date2.setMonth(date2.getMonth() + freePackage.config.durationInMonths)),
          description: String(
            "<p>\n" +
              "                    Navanjani Designs is an American multinational corporation\n" +
              "                    that is engaged in the design, development, manufacturing,\n" +
              "                    and worldwide marketing and sales of footwear, apparel,\n" +
              "                    equipment, accessories, and services.\n" +
              "                  </p>\n" +
              "                  <p>\n" +
              "                    The company is headquartered near Beaverton, Oregon, in the\n" +
              "                    Portland metropolitan area. It is the world's largest\n" +
              "                    supplier of athletic shoes and apparel and a major\n" +
              "                    manufacturer of sports equipment, with revenue in excess of\n" +
              "                    US$37.4 billion in its fiscal year 2020 (ending May 31,\n" +
              "                    2020). As of 2020, it employed 76,700 people\n" +
              "                    worldwide. In 2020 the brand alone was valued in excess\n" +
              "                    of $32 billion, making it the most valuable brand among\n" +
              "                    sports businesses. Previously, in 2017, the Navanjani Designs\n" +
              "                    brand was valued at $29.6 billion. Navanjani Designs ranked\n" +
              "                    89th in the 2018 Fortune 500 list of the largest United\n" +
              "                    States corporations by total revenue.\n" +
              "                  </p>"
          ),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Codaisseur",
          domain: "codaisseur.com",
          industry: 1,
          location: "Amsterdam, Netherlands",
          primaryColor: "#C1272D",
          textColor: "#FFFFFF",
          slug: "codaisseur-com",
          subscriptionId: freePackage.id,
          subscriptionValidTill: new Date(date2.setMonth(date2.getMonth() + freePackage.config.durationInMonths)),
          description: String(
            "<p>At Codaisseur, we're very passionate about what we do. We challenge our students, change their lives, and energise the local tech industry. We love teaching and helping people learn about the newest coding trends. We help people grow and we love it!</p><p>By doing so, we've also managed to create a large community consisting of graduates, their employers, and all kinds of other people interested in or working in the tech industry. Together, we organise lots of fun events like movie nights, hackathons, monthly graduation parties etc. We also host meet-ups and volunteer in various educational efforts.</p><p>In the end, it's all about being and staying the best coding school and having fun doing it.</p>"
          ),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("companies", null, {});
  },
};
