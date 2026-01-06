const parsePrescriptionText = async (text) => {
  // Later: LLM / advanced NLP
  // For now: simple deterministic parsing
  return {
    medicines: [
      {
        name: "Paracetamol",
        dosage: "500mg",
        frequency: "twice daily",
        duration: "5 days",
      },
    ],
  };
};

module.exports = {
  parsePrescriptionText,
};
