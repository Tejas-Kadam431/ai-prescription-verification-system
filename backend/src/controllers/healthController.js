const { getHealthStatus } = require('../services/healthService');

const healthCheck = (req, res) => {
  const healthData = getHealthStatus();
    res.status(200).json(healthData);
};
module.exports = {
    healthCheck
};