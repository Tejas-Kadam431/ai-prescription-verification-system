const express = require("express");
const router = express.Router();

const {
  addPrescription,
  fetchPrescriptions,
  fetchPrescription,
} = require("../controllers/prescriptionController");

router.post("/", addPrescription);
router.get("/", fetchPrescriptions);
router.get("/:id", fetchPrescription);

module.exports = router;
