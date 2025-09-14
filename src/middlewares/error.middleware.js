const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  const response = {
    success: false,
    statusCode,
    message: err.message || "Internal Server Error",
  };

  // Include structured errors if available
  if (typeof err.serializeErrors === "function") {
    response.errors = err.serializeErrors();
  } else if (err.errors) {
    response.errors = err.errors;
  }

  // Stack trace in development
  if (process.env.NODE_ENV === "development") {
    response.stack = err.stack;
  }

  res.status(statusCode).json(response);
};

export default errorHandler;
