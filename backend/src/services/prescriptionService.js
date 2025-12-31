const Prescription = require("../models/Prescription");
const { processPrescriptionAsync } = require("./prescriptionProcessor");

const allowedTransitions = {
  uploaded: ["processed", "rejected"],
  processed: ["verified", "rejected"],
  processing_failed: ["uploaded"], // 👈 retry
  verified: [],
  rejected: [],
};


const createPrescription = async (data) => {
  const prescription = await Prescription.create(data);

  // trigger background processing (DO NOT await)
  processPrescriptionAsync(prescription._id);

  return prescription;
};

const getAllPrescriptions = async () => {
  return await Prescription.find();
};

const getPrescriptionById = async (id) => {
  return await Prescription.findById(id).populate("medicines.medicine");
};

const updatePrescriptionStatus = async (id, newStatus) => {
  const prescription = await Prescription.findById(id);

  if (!prescription) {
    throw new Error("Prescription not found");
  }

  const currentStatus = prescription.status;
  const allowed = allowedTransitions[currentStatus] || [];

  if (!allowed.includes(newStatus)) {
    throw new Error(
      `Invalid status transition from ${currentStatus} to ${newStatus}`
    );
  }

  prescription.status = newStatus;
  await prescription.save();

  return prescription;
};

module.exports = {
  createPrescription,
  getAllPrescriptions,
  getPrescriptionById,
  updatePrescriptionStatus,
};
