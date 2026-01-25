const asyncHandler = require("../utils/asyncHandler");
const {
  createPrescription,
  getAllPrescriptions,
  getPrescriptionById,
} = require("../services/prescriptionService");
const prescriptionService = require("../services/prescriptionService");


const addPrescription = asyncHandler(async (req, res) => {
  const prescription = await createPrescription(req.body);
  res.status(201).json(prescription);
});

const fetchPrescriptions = asyncHandler(async (req, res) => {
  const prescriptions = await getAllPrescriptions();
  res.status(200).json(prescriptions);
});

const fetchPrescription = asyncHandler(async (req, res) => {
  const prescription = await getPrescriptionById(req.params.id);
  if (!prescription) {
    res.status(404);
    throw new Error("Prescription not found");
  }
  res.status(200).json(prescription);
});
const updatePrescriptionStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  const updated = await prescriptionService.updatePrescriptionStatus(
    req.params.id,
    status
  );

  res.json(updated);
});
const approvePrescription = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const prescription = await approvePrescriptionService(id);

  res.status(200).json({
    success: true,
    data: prescription,
  });
});
const rejectPrescription = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { reason } = req.body;

  const prescription = await rejectPrescriptionService(id, reason);

  res.status(200).json({
    success: true,
    data: prescription,
  });
});



module.exports = {
  addPrescription,
  fetchPrescriptions,
  fetchPrescription,
  updatePrescriptionStatus,
  approvePrescription,
  rejectPrescription,
};
