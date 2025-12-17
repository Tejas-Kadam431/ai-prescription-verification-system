const Medicine = require('../models/Medicine');

const createMedicine = async (medicineData) => {
    const medicine = await Medicine.create(medicineData);
    return medicine;
};

const getAllMedicines = async () => {
  return await Medicine.find();
};

module.exports = {
    createMedicine,
    getAllMedicines,
};