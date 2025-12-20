const express = require("express");
const app = express();
console.log("APP.JS LOADED");

app.get("/ping", (req, res) => {
  res.json({ pong: true });
});

const healthRoutes = require("./routes/healthRoutes");
const medicineRoutes = require("./routes/medicineRoutes");


const prescriptionRoutes = require("./routes/prescriptionRoutes");




app.use(express.json());

// register routes
app.use("/", healthRoutes);
app.use("/medicines", medicineRoutes);
app.use("/prescriptions", prescriptionRoutes);
// register error handler (MUST be last)
const errorHandler = require("./middleware/errorHandler");
app.use(errorHandler);

module.exports = app;
