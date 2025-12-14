const getHealthStatus = () => {
    return {
        status: "OK",
        message: "Service is running"
    };
};
module.exports = {
    getHealthStatus
};