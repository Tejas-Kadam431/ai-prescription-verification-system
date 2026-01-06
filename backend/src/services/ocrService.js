const extractTextFromImage = async (imageUrl) => {
  // Later: Tesseract or Google Vision
  // For now: simulate OCR output
  return {
    text: "Paracetamol 500mg twice daily for 5 days",
    confidence: 0.92,
  };
};

module.exports = {
  extractTextFromImage,
};
