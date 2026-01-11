const Prescription = require("../models/Prescription");
const { extractTextFromImage } = require("./ocrService");
const { parsePrescriptionText } = require("./nlpService");
const { validateMedicines } = require("./medicineValidationService");


const processPrescriptionAsync = async (prescriptionId) => {
  setTimeout(async () => {
    try {
      const prescription = await Prescription.findById(prescriptionId);
      if (!prescription) return;

      // idempotency guard
      if (prescription.status !== "uploaded") return;

      // retry guard
      if (prescription.retryCount >= prescription.maxRetries) {
        prescription.status = "rejected";
        await prescription.save();
        return;
      }

      prescription.retryCount += 1;
      await prescription.save();

      // 1️⃣ OCR
      const ocrResult = await extractTextFromImage(
        prescription.originalImageUrl
      );

      if (!ocrResult.text || ocrResult.confidence < 0.7) {
        prescription.status = "processing_failed";
        await prescription.save();
        return;
      }

      // 2️⃣ NLP
      const parsed = await parsePrescriptionText(ocrResult.text);

      if (!parsed.medicines || parsed.medicines.length === 0) {
        prescription.status = "processing_failed";
        await prescription.save();
        return;
      }

      // 3️⃣ Save extracted medicines
      prescription.extractedMedicines = parsed.medicines;

      prescription.status = "processed";
      await prescription.save();
    } catch (err) {
      console.error("Async processing error:", err.message);
    }
  }, 5000);
};

module.exports = {
  processPrescriptionAsync,
};
