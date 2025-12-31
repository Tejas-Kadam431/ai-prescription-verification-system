const mongoose = require("mongoose");

const prescriptionSchema = new mongoose.Schema(
  {
    originalImageUrl: {
      type: String,
      required: true,
    },

    extractedText: {
      type: String,
    },

    status: {
  type: String,
  enum: [
    "uploaded",
    "processed",
    "verified",
    "rejected",
    "processing_failed",
  ],
  default: "uploaded",
},


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
    timestamps: true,
  }
);

module.exports = mongoose.model("Prescription", prescriptionSchema);
