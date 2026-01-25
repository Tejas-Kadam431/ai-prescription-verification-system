const express = require("express");
const router = express.Router();

const {
  addPrescription,
  fetchPrescriptions,
  fetchPrescription,
  approvePrescription,
  rejectPrescription,
  updatePrescriptionStatus,
} = require("../controllers/prescriptionController");

const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");


router.patch("/:id/approve",
  protect,
  authorize("pharmacist"),
  approvePrescription
);

router.patch("/:id/reject",
  protect,
  authorize("pharmacist"),
  rejectPrescription
);

router.post("/", addPrescription);
router.get("/", fetchPrescriptions);
router.get("/:id", fetchPrescription);
router.patch("/:id/status", updatePrescriptionStatus);
router.patch("/:id/approve", approvePrescription);
router.patch("/:id/reject", rejectPrescription);


module.exports = router;
