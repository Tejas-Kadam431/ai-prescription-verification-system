const mongoose = require("mongoose");

const prescriptionSchema = new mongoose.Schema(
  {
    // 🔗 Original uploaded prescription image
    originalImageUrl: {
      type: String,
      required: true,
    },

    // 📝 Raw text extracted via OCR (optional but useful)
    extractedText: {
      type: String,
    },

    // 🔄 Workflow status
    status: {
      type: String,
      enum: [
        "uploaded",          // just uploaded
        "processed",         // AI + validation successful
        "needs_review",      // pharmacist review required
        "verified",          // pharmacist approved
        "rejected",          // unsafe / invalid
        "processing_failed", // OCR / NLP failed (retryable)
      ],
      default: "uploaded",
    },

    // 🔁 Retry management for async processing
    retryCount: {
      type: Number,
      default: 0,
    },

    maxRetries: {
      type: Number,
      default: 3,
    },

    // 🧠 Reasons for audit & UI display
    reviewReason: {
      type: String,
    },

    rejectionReason: {
      type: String,
    },

    // 🤖 AI-extracted (unverified) medicines
    extractedMedicines: [
      {
        name: String,
        dosage: String,
        frequency: String,
        duration: String,
      },
    ],

    // ✅ Pharmacist-verified medicines (linked to DB)
    medicines: [
      {
        medicine: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Medicine",
        },
        dosage: String,
        frequency: String,
        duration: String,
      },
    ],
  },
  {
    timestamps: true, // createdAt & updatedAt
  }
);

module.exports = mongoose.model("Prescription", prescriptionSchema);
