const Prescription = require('../models/Prescription');

const createPrescription = async (data) => {
  return await Prescription.create(data);
};

const getAllPrescriptions = async () => {
  return await Prescription.find();
};

const getPrescriptionById = async (id) => {
  return await Prescription.findById(id);
};

module.exports = {
  createPrescription,
  getAllPrescriptions,
  getPrescriptionById,
};