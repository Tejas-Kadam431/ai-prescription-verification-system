const Prescription = require("../models/Prescription");

const processPrescriptionAsync = async (prescriptionId) => {
  setTimeout(async () => {
    const prescription = await Prescription.findById(prescriptionId);

    if (!prescription) return;

    // 🔒 idempotency guard
    if (prescription.status !== "uploaded") {
      console.log("⏭ Skipping duplicate processing:", prescriptionId);
      return;
    }

    // 🔒 retry guard
    if (prescription.retryCount >= prescription.maxRetries) {
      prescription.status = "rejected";
      await prescription.save();
      console.log("❌ Max retries exceeded:", prescriptionId);
      return;
    }

    prescription.retryCount += 1;
    await prescription.save();

    const failed = Math.random() < 0.5;

    if (failed) {
      prescription.status = "processing_failed";
      await prescription.save();
      console.log("⚠️ Processing failed:", prescriptionId);
      return;
    }

    prescription.status = "processed";
    await prescription.save();
    console.log("✅ Processed:", prescriptionId);
  }, 5000);
};


module.exports = {
  processPrescriptionAsync,
};
