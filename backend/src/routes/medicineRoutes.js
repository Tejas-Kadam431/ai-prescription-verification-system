const express = require("express");
const router = express.Router();
console.log("MEDICINE ROUTES LOADED");

const {
  addMedicine,
  fetchMedicines,
} = require("../controllers/medicineController");

router.post("/", addMedicine);
router.get("/", fetchMedicines);

module.exports = router;
