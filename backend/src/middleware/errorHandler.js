const errorHandler = (err, req, res, next) => {
    console.error(err.stack); 

    res.statusCode = err.statusCode || 500;
    res.json({
        success: false,
        message: err.message || 'Internal Server Error',
    });
};

module.exports = errorHandler;