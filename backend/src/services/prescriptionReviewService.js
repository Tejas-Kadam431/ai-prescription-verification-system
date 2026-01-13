const Prescription = require("../models/Prescription");
const Medicine = require("../models/Medicine");
const approvePrescriptionService = async (id) => {
  const prescription = await Prescription.findById(id);

  if (!prescription) {
    throw new Error("Prescription not found");
  }

  if (prescription.status !== "needs_review") {
    throw new Error("Prescription is not pending review");
  }

  // Convert extracted → verified medicines
  const verifiedMedicines = [];

  for (const med of prescription.extractedMedicines) {
    const dbMedicine = await Medicine.findOne({
      $or: [
        { name: new RegExp(`^${med.name}$`, "i") },
        { genericName: new RegExp(`^${med.name}$`, "i") },
      ],
    });

    if (!dbMedicine) {
      throw new Error(`Medicine not found during approval: ${med.name}`);
    }

    verifiedMedicines.push({
      medicine: dbMedicine._id,
      dosage: med.dosage,
      frequency: med.frequency,
      duration: med.duration,
    });
  }

  prescription.medicines = verifiedMedicines;
  prescription.status = "verified";
  prescription.extractedMedicines = [];

  await prescription.save();

  return prescription;
};
const rejectPrescriptionService = async (id, reason) => {
  const prescription = await Prescription.findById(id);

  if (!prescription) {
    throw new Error("Prescription not found");
  }

  prescription.status = "rejected";
  prescription.rejectionReason = reason || "Rejected by pharmacist";

  await prescription.save();

  return prescription;
};
