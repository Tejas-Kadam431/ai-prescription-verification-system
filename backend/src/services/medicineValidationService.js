const Medicine = require("../models/Medicine");

const validateMedicines = async (extractedMedicines) => {
  const seenIngredients = new Set();

  for (const med of extractedMedicines) {
    // Try exact name or generic
    const dbMedicine = await Medicine.findOne({
      $or: [
        { name: new RegExp(`^${med.name}$`, "i") },
        { genericName: new RegExp(`^${med.name}$`, "i") },
      ],
    });

    if (!dbMedicine) {
      return {
        isValid: false,
        needsReview: true,
        hasConflicts: false,
        reason: `Medicine not found: ${med.name}`,
      };
    }

    // Conflict detection (same active ingredient)
    for (const ingredient of dbMedicine.activeIngredients) {
      if (seenIngredients.has(ingredient)) {
        return {
          isValid: false,
          needsReview: false,
          hasConflicts: true,
          reason: `Duplicate active ingredient: ${ingredient}`,
        };
      }
      seenIngredients.add(ingredient);
    }
  }

  return {
    isValid: true,
    needsReview: false,
    hasConflicts: false,
  };
};

module.exports = {
  validateMedicines,
};
