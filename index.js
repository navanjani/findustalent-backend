// packages
const express = require("express");
const corsMiddleWare = require("cors");

// Routes
const authRoutes = require("./routes/auth");
const companyRoutes = require("./routes/company");
const jobRoutes = require("./routes/job");
const candidateRoutes = require("./routes/candidate");

// constants
const { PORT } = require("./config/constants");

// Create an express app
const app = express();

// Add middleware
app.use(corsMiddleWare());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/companies", companyRoutes);
app.use("/jobs", jobRoutes);
app.use("/candidates", candidateRoutes);

// start listening
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
