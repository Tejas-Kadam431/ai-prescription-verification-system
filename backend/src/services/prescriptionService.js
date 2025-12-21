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


module.exports = {
  createPrescription,
  getAllPrescriptions,
  getPrescriptionById,
};