"use strict";

const { company: Company } = require("../models");
const {
  CAREER_SENIOR_LEVEL,
  CAREER_ENTRY_LEVEL,
  EMPLOYMENT_FULLTIME,
  EMPLOYMENT_CONTRACT,
  SALARY_RANGE_55000_65000,
  SALARY_RANGE_35000_45000,
  SALARY_RANGE_25000_35000,
  CAREER_MID_LEVEL,
} = require("../config/constants");
const Category = require("../models").category;
const Department = require("../models").department;
module.exports = {
  async up(queryInterface, Sequelize) {
    const company1 = await Company.findOne({
      where: { domain: "findustalent.com" },
    });
    const company2 = await Company.findOne({
      where: { domain: "navanjani.com" },
    });
    const company3 = await Company.findOne({
      where: { domain: "codaisseur.com" },
    });
    const category1 = await Category.findOne({
      where: { name: "Accountant" },
    });
    const category2 = await Category.findOne({
      where: { name: "Developer" },
    });
    const department1 = await Department.findOne({
      where: { name: "Accounts" },
    });
    const department2 = await Department.findOne({
      where: { name: "Product" },
    });
    const company_3_department_1 = await Department.findOne({
      where: {
        name: "Product",
        companyId: company3.id,
      },
    });
    const company_3_department_2 = await Department.findOne({
      where: {
        name: "Teaching",
        companyId: company3.id,
      },
    });
    await queryInterface.bulkInsert(
      "jobs",
      [
        {
          title: "Senior Accountant",
          slug: "senior-accountant",
          description: "Senior Accountant",
          salaryRange: SALARY_RANGE_55000_65000,
          location: "Amsterdam",
          closingDate: "2022-11-20",
          careerLevel: CAREER_SENIOR_LEVEL,
          employmentType: EMPLOYMENT_FULLTIME,
          companyId: company1.id,
          categoryId: category1.id,
          departmentId: department1.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Senior Fullstack Developer",
          slug: "senior-fullstack-developer",
          description: String(
            "<h4>Overview</h4>\n" +
              "<p>As a senior software engineer in the Software Fundamentals team you will be working on internal tooling that sets our product teams up for success. You will be working on foundational software components that provide the engineering teams for a solid foundation. Your passion for creating software that other developers love results in high quality libraries and documentation used throughout the company.\n</p>\n" +
              '<div class="mt-4">\n' +
              "  <h4>What you'll be doing:</h4>\n" +
              "  <ul><li>Deliver and maintain a suite of (opinionated) software components that support application development, operational observability, and message-driven architectures.</li><li>Write comprehensive user-focused documentation that helps developers understand and adopt foundational tooling.</li><li>Support the integration of cloud native solutions into the software stack.</li><li>Help development teams be on top of their dependencies by using dedicated tooling to track and upgrade dependencies.</li></ul>" +
              "</div>\n" +
              '<div class="mt-4">\n' +
              "  <h4>What you'll bring:</h4>\n" +
              "  <ul><li>A minimum of 6 years of working in a large-scale multi-team multi-application software development environment.</li><li>Extensive experience with PHP, experience with other languages such as Java, Kotlin, TypeScript, or Go is a plus</li><li>Proven experience in providing tools for other developers.</li><li>A pragmatic eye for quality, you know when quality matters.</li><li>Knowledge of observability tooling (metric collection, log aggregation, monitoring).</li><li>Excellent communication skills for communicating with (mostly) technical stakeholders.</li></ul>" +
              "</div>\n" +
              "</div>"
          ),
          salaryRange: SALARY_RANGE_35000_45000,
          location: "Amsterdam",
          closingDate: "2022-12-10",
          careerLevel: CAREER_SENIOR_LEVEL,
          employmentType: EMPLOYMENT_FULLTIME,
          companyId: company2.id,
          categoryId: category2.id,
          departmentId: department2.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Junior Fullstack Developer",
          slug: "junior-fullstack-developer",
          description: String(
            "<h4>Overview</h4>\n" +
              "<p>As a junior software engineer in the Software Fundamentals team you will be working on internal tooling that sets our product teams up for success. You will be working on foundational software components that provide the engineering teams for a solid foundation. Your passion for creating software that other developers love results in high quality libraries and documentation used throughout the company.\n</p>\n" +
              '<div class="mt-4">\n' +
              "  <h4>What you'll be doing:</h4>\n" +
              "  <ul><li>Deliver and maintain a suite of (opinionated) software components that support application development, operational observability, and message-driven architectures.</li><li>Write comprehensive user-focused documentation that helps developers understand and adopt foundational tooling.</li><li>Support the integration of cloud native solutions into the software stack.</li><li>Help development teams be on top of their dependencies by using dedicated tooling to track and upgrade dependencies.</li></ul>" +
              "</div>\n" +
              '<div class="mt-4">\n' +
              "  <h4>What you'll bring:</h4>\n" +
              "  <ul><li>A minimum of 6 years of working in a large-scale multi-team multi-application software development environment.</li><li>Extensive experience with PHP, experience with other languages such as Java, Kotlin, TypeScript, or Go is a plus</li><li>Proven experience in providing tools for other developers.</li><li>A pragmatic eye for quality, you know when quality matters.</li><li>Knowledge of observability tooling (metric collection, log aggregation, monitoring).</li><li>Excellent communication skills for communicating with (mostly) technical stakeholders.</li></ul>" +
              "</div>\n" +
              "</div>"
          ),
          salaryRange: SALARY_RANGE_25000_35000,
          location: "Amsterdam",
          closingDate: "2022-12-10",
          careerLevel: CAREER_ENTRY_LEVEL,
          employmentType: EMPLOYMENT_CONTRACT,
          companyId: company2.id,
          categoryId: category2.id,
          departmentId: department2.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Full Stack JavaScript Developer",
          slug: "full-stack-javascript-developer",
          description: String(
            "<h4>Overview</h4>\n" +
              "            <p>Codaisseur is growing and looking for an <strong>experienced JavaScript developer</strong> to strengthen our product team. At Codaisseur coding is at the core of what we do - we train people to become web developers - which is exactly why we love using the latest technologies in our own products.</p>\n" +
              "<p>You get energy from coming up with cool ideas &amp; ways that we can improve, and enjoy sharing them with the rest of the multidisciplinary team. And you’re able to actually code these great ideas! You are a team player and enjoy helping other team members, you’ll be working with a designer, product owner, several junior developers &amp; a senior developer.</p>\n" +
              "<p>Working as a developer at Codaisseur includes:</p>\n" +
              "<ul>\n" +
              "<li><p><strong>Developing software</strong> to support, automate, and improve the teaching and student environments.</p></li>\n" +
              "<li><p><strong>Developing new teaching tools </strong>to support a blended learning environment</p></li>\n" +
              "<li><p>Working with <strong>agile</strong> methodologies, like Kanban, &amp; working with <strong>holacracy</strong></p></li>\n" +
              "</ul>\n" +
              "<p>The Job Offer includes:</p>\n" +
              "<ul>\n" +
              "<li><p>An inspiring workplace with sitting/standing desks, 4K monitors, and a new MacBook Pro;</p></li>\n" +
              "<li><p>18 passionate and skilled colleagues in web development, teaching, and other areas;</p></li>\n" +
              "<li><p>An inspiring environment where we promote and value life-long learning and continuous improvement;</p></li>\n" +
              "<li><p>Full coverage of travel expenses, no matter where you live in The Netherlands;</p></li>\n" +
              "<li><p>Free lunch (if there is such a thing :), tea, and coffee;</p></li>\n" +
              "<li><p>A competitive salary;</p></li>\n" +
              "<li><p>25 Vacation days per year;</p></li>\n" +
              "<li><p>€1K Budget for training and/or conferences plus the time off to attend them;</p></li>\n" +
              "<li><p>Permanent contract plus stock options within 2 years;</p></li>\n" +
              "<li><p>Anything else we may agree to: feel free to discuss your needs and preferences.</p></li>\n" +
              "</ul>\n" +
              "          \n" +
              '         <div class="mt-4">\n' +
              "            <h4>Requirements</h4>\n" +
              "        \n" +
              "            <p>We expect from you:</p>\n" +
              "<ul>\n" +
              "<li><p>Willing to take a 4h assignment plus a trial day;</p></li>\n" +
              "<li><p>Experience in web development;</p></li>\n" +
              "<li><p>Experience in full stack JavaScript development (NodeJS, ES7, and preferably some TypeScript or another typed language);</p></li>\n" +
              "<li><p>Experience with JavaScript frameworks (ideally React, Express, Koa, Mocha, Jest, and/or others);</p></li>\n" +
              "<li><p>Experience with Redux or similar;</p></li>\n" +
              "<li><p>Experience with data modeling for relational databases (we use Postgres specifically);</p></li>\n" +
              "<li><p>Experience with DevOps, CI, and Infrastructure Architecture (Docker, Kubernetes, frequently used AWS services, GKE, Microservices);</p></li>\n" +
              "<li><p>Experience with some newer or more advanced topics such as GraphQL, AI/Machine Learning, UX Design, SCRUM/Agile, Data Science are a plus;</p></li>\n" +
              "<li><p>Experience with a few other languages is considered a good sign;</p></li>\n" +
              "<li><p>Fluent in English;</p></li>\n" +
              "<li><p>A curious mind, and a tendency to continuously wanting to improve the things around you.</p></li>\n" +
              "</ul>\n" +
              "<p><b><i>You know, ideally. If you are passionate about this, but you don't check all these boxes in experience, we might still hit it off!</i></b><i> So don't hesitate to try anyways. :)</i></p>\n" +
              "\n" +
              "          </div>"
          ),
          salaryRange: SALARY_RANGE_55000_65000,
          location: "Amsterdam",
          closingDate: "2022-12-10",
          careerLevel: CAREER_MID_LEVEL,
          employmentType: EMPLOYMENT_FULLTIME,
          companyId: company3.id,
          categoryId: category2.id,
          departmentId: company_3_department_1.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Javascript Teacher",
          slug: "javascript-teacher",
          description: String(
            "<h4>Overview</h4>\n" +
              '           <p>Codaisseur is looking for an <strong>experienced JavaScript developer</strong> who wants to teach our <a href="https://codaisseur.com/become-a-developer/" rel="noopener">Academy</a> students.  As a Codaisseur teacher, you will inspire our students by giving lectures and sharing your experiences as a professional developer. Let\'s bridge the talent gap and help get more underrepresented communities into tech! 💪<br><strong><em><br></em></strong></p>\n' +
              "<p><strong><em>Teachers at Codaisseur:</em></strong></p>\n" +
              "<ul>\n" +
              "<li><p><strong>Teach </strong>and prepare short lectures;</p></li>\n" +
              "<li><p><strong>Create teaching material</strong>s to help our students reach their goal of becoming a professional developer;</p></li>\n" +
              "<li><p><strong>Evaluate</strong> <strong>students</strong>’ homework assessments, mentor them, and - if necessary - release them from the program;</p></li>\n" +
              "<li><p><strong>Constantly develop as a teacher </strong>- improving your didactic skills and freely develop your own teaching style;</p></li>\n" +
              "<li><p><strong>Have a lot of fun with their students and colleagues</strong> - in order to create an amazing classroom experience.</p></li>\n" +
              "</ul>\n" +
              "<p><br></p>\n" +
              "<p><strong>Please note: </strong>Prior experience in education is nice but not necessary; we can train you on-the-job.<br><br></p>\n" +
              "<p><strong><em><em><strong>Job offer benefits: because good people deserve more besides an inspiring start</strong>!</em></em></strong><strong><em><em><br></em></em></strong></p>\n" +
              "<ul>\n" +
              "<li>An inspiring workplace (10 min walking distance from Amsterdam Sloterdijk) with sitting/standing desks, 4K monitors and a MacBook Pro;</li>\n" +
              "<li>Classrooms with modern equipment and tools, that enable hybrid teaching;</li>\n" +
              "<li>20 passionate and skilled colleagues in teaching, web development, digital marketing and other areas;</li>\n" +
              "<li>An inspiring environment where we promote and value life-long learning and continuous improvement;</li>\n" +
              "<li>A shiny new MacBook to work your magic on;</li>\n" +
              "<li>Full coverage of travel expenses, no matter where you live in the Netherlands;</li>\n" +
              "<li>Delicious and free daily team lunches, tea &amp; coffee;</li>\n" +
              "<li>A competitive salary;</li>\n" +
              "<li>\n" +
              "<strong>8 weeks</strong> of vacation per year!</li>\n" +
              "<li>A personal budget of € 1.000 for training and/or conferences plus time off to attend them;</li>\n" +
              "<li>Anything else we may agree on: feel free to discuss your needs and preferences.</li>\n" +
              "</ul>\n" +
              '<div class="mt-4">\n' +
              "    <h4>Requirements</h4>\n" +
              "\n" +
              "    <p>We expect from you:</p>\n" +
              "<ul>\n" +
              "<li>Take an <strong>assignment</strong> plus a <strong>trial day</strong> in front of students as part of the interview process;</li>\n" +
              "<li>Have an affinity for <strong>developing</strong> high-quality and fun <strong>content</strong>;</li>\n" +
              "<li>Know the drill<strong> </strong>when it comes to JavaScript, React, Redux, Node, Express, and Postgres (or SQL);</li>\n" +
              "<li>Speak English fluently, since all our classes are taught in English;</li>\n" +
              "<li>Have a growth mindset - you don't just talk the talk, you also walk the walk.</li>\n" +
              "</ul>\n" +
              "<div><strong><em><br></em></strong></div>\n" +
              "<p><strong><em>Extra credits if you:</em></strong></p>\n" +
              "<ul>\n" +
              "<li>Are also fluent in Dutch;</li>\n" +
              "<li>Have experience with some newer or more advanced topics such as GraphQL, AI/Machine Learning, UX Design, Python, and/or Data Science.</li>\n" +
              "</ul>\n" +
              "<p><em><br></em></p>\n" +
              "<p><em><strong>Not for you, but do you know someone who might be interested?</strong> Please share ❤️</em></p>\n" +
              "<p>(unless you're a recruiter, then please know that we don't appreciate your unsolicited services).</p>\n" +
              "<p><br></p>\n" +
              "<p><strong><strong><em>Working at Codaisseur: a bit about us</em></strong></strong></p>\n" +
              "<p>Some call it work, we call it doing what we love — and loving what we do. Technology is everywhere in the world; every motivated person should be able to create technology. We see a gap between what educational institutions teach and what businesses need. We believe in working together to bridge that gap, as this is the only way to make sure economies will be ready for the increasing demand in the technology industry. Education should be ever-changing and evolving.<br></p>\n" +
              "<p></p>\n" +
              "<p>We dream big, but our focus stays true to the road ahead, being in tune with the moment, embracing new opportunities, and challenging ourselves every day with a great passion for the Codaisseur mission. It's our vision to create a world where you shine, inspire people to celebrate their individuality, and come together as a community. We do this by accepting and encouraging curiosity, excitement, togetherness, and drive.<em><br></em></p>\n" +
              "</div>"
          ),
          salaryRange: SALARY_RANGE_55000_65000,
          location: "Amsterdam",
          closingDate: "2022-12-10",
          careerLevel: CAREER_SENIOR_LEVEL,
          employmentType: EMPLOYMENT_FULLTIME,
          companyId: company3.id,
          categoryId: category2.id,
          departmentId: company_3_department_2.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("jobs", null, {});
  },
};
