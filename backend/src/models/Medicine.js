const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    genericName: {
      type: String,
      trim: true,
    },

    strength: {
      type: String, // e.g. "500mg"
      required: true,
    },

    form: {
      type: String,
      enum: ["tablet", "capsule", "syrup", "injection", "ointment"],
      required: true,
    },

    prescriptionRequired: {
      type: Boolean,
      default: true,
    },

    activeIngredients: [
      {
        type: String,
        trim: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Medicine", medicineSchema);
