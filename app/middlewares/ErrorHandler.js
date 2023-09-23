const errorHandler = (error, request, response, next) => {
    response.status(500).json({
        status: "Error 500: Internal exception",
        message: error.message,
    });
}

module.exports = { errorHandler } 
