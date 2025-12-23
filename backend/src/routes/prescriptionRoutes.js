const express = require("express");
const router = express.Router();

const {
  addPrescription,
  fetchPrescriptions,
  fetchPrescription,
  updatePrescriptionStatus,
} = require("../controllers/prescriptionController");

router.post("/", addPrescription);
router.get("/", fetchPrescriptions);
router.get("/:id", fetchPrescription);
router.patch("/:id/status", updatePrescriptionStatus);

module.exports = router;
