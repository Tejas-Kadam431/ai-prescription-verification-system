const Prescription = require('../models/Prescription');

const createPrescription = async (data) => {
  return await Prescription.create(data);
};

const getAllPrescriptions = async () => {
  return await Prescription.find();
};

const getPrescriptionById = async (id) => {
  return await Prescription
    .findById(id)
    .populate("medicines.medicine");
};
const allowedTransitions = {
  uploaded: ["processed", "rejected"],
  processed: ["verified", "rejected"],
  verified: [],
  rejected: [],
};
const updatePrescriptionStatus = async (id, newStatus) => {
  const prescription = await Prescription.findById(id);
  if(!prescription){
    throw new Error("Prescription not found");
  }
  const currentStatus = prescription.status;

  const allowed = allowedTransitions[currentStatus];

  if(!allowed.includes(newStatus)){
    throw new Error(`Invalid status transition from ${currentStatus} to ${newStatus}`);
  }

  prescription.status=newStatus;
  await prescription.save();

  return prescription;
}


module.exports = {
  createPrescription,
  getAllPrescriptions,
  getPrescriptionById,
  updatePrescriptionStatus,
};