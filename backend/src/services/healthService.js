const getHealthStatus = () => {
    const isHealthy = true; // This would normally involve actual health checks
    if(!isHealthy) {
        const error = new Error('Service is unhealthy');
        error.statusCode = 503;
        throw error;
    }
    return {
        status: 'OK',
        message: 'Service is healthy'
    };
};

module.exports = {
    getHealthStatus,
};