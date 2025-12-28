const Prescription = require("../models/Prescription");

const processPrescriptionAsync = async (prescriptionId) => {
  console.log("🔄 Processing prescription:", prescriptionId);

  setTimeout(async () => {
    const prescription = await Prescription.findById(prescriptionId);

    if (!prescription) {
      console.log("❌ Prescription not found during async processing");
      return;
    }

    prescription.status = "processed";
    await prescription.save();

    console.log("✅ Prescription processed:", prescriptionId);
  }, 5000);
};

module.exports = {
  processPrescriptionAsync,
};
