// packages
const express = require("express");
const corsMiddleWare = require("cors");

// Routes
const authRoutes = require("./routes/auth");
const companyRoutes = require("./routes/company");

// constants
const { PORT } = require("./config/constants");

// Create an express app
const app = express();

// Add middleware
app.use(corsMiddleWare());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/companies", companyRoutes);

// start listening
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
