const errorHandler = (err, req, res, next) => {
    console.error(err, "errors");
    // Default error response
    let errorResponse = {
        success: 0,
        message: "An unknown error occurred.",
    };

    // Handle specific types of errors
    if (err.name === "MongoError") {
        errorResponse.message = "A database error occurred.";
        errorResponse.details = err.message;
    } else if (err.name === "ValidationError") {
        errorResponse.message = "Validation error.";
        errorResponse.details = err.message;
    } else if (err.customMessage) {
        // For custom errors with a customMessage property
        errorResponse.message = err.customMessage;
    } else if (err.message) {
        // For other errors with a message property
        errorResponse.message = err.message;
    }

    res.status(500).json(errorResponse);
};

export default errorHandler;
