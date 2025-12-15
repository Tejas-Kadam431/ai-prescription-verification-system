const asyncHandler = require("../utils/asyncHandler");
const { getHealthStatus } = require("../services/healthService");

const healthCheck = asyncHandler(async (req, res) => {
  const healthData = await getHealthStatus();
  res.status(200).json(healthData);
});

module.exports = {
  healthCheck
};
