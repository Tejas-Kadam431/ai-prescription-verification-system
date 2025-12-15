const { getHealthStatus } = require("../services/healthService");

const healthCheck = (req, res, next) => {
  try {
    const healthData = getHealthStatus();
    res.status(200).json(healthData);
  } catch (error) {
    next(error); // send error to error middleware
  }
};

module.exports = {
  healthCheck
};
