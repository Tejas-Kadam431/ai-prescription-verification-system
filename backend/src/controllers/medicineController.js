const asyncHandler = require('../utils/asyncHandler');

const {
    createMedicine,
    getAllMedicines,
} = require('../services/medicineService');

const addMedicine = asyncHandler(async (req, res) => {
    const medicine= await createMedicine(req.body);
    res.status(201).json(medicine);
})

const fetchMedicines = asyncHandler(async (req, res) => {
  const medicines = await getAllMedicines();
  res.status(200).json(medicines);
});

module.exports = {
    addMedicine,
    fetchMedicines,
};