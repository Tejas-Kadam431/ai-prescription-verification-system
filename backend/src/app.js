const express = require("express");
const app = express();

const healthRoutes = require("./routes/healthRoutes");

app.use(express.json());

// register routes
app.use("/", healthRoutes);

module.exports = app;
