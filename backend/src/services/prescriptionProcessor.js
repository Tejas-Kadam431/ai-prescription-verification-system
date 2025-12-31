const Prescription = require("../models/Prescription");

const processPrescriptionAsync = async (prescriptionId) => {
  console.log("🔄 Processing prescription:", prescriptionId);

  setTimeout(async () => {
    try {
      const prescription = await Prescription.findById(prescriptionId);

      if (!prescription) {
        console.log("❌ Prescription not found during processing");
        return;
      }

      // 🔥 simulate random failure (50% chance)
      const failed = Math.random() < 0.5;

      if (failed) {
        prescription.status = "processing_failed";
        await prescription.save();
        console.log("⚠️ Processing failed:", prescriptionId);
        return;
      }

      prescription.status = "processed";
      await prescription.save();
      console.log("✅ Prescription processed:", prescriptionId);
    } catch (err) {
      console.error("❌ Async processing error:", err.message);
    }
  }, 5000);
};

module.exports = {
  processPrescriptionAsync,
};
