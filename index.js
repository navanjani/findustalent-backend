// packages
const express = require("express");
const corsMiddleWare = require("cors");

// constants
const { PORT } = require("./config/constants");

// Create an express app
const app = express();

// Add middleware
app.use(corsMiddleWare());
app.use(express.json());

// start listening
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
