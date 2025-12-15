const express = require("express");
const app = express();

const healthRoutes = require("./routes/healthRoutes");
const errorHandler = require("./middleware/errorHandler");

app.use(express.json());

// register routes
app.use("/", healthRoutes);

// register error handler (MUST be last)
app.use(errorHandler);

module.exports = app;
