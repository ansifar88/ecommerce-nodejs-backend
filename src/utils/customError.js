class CustomError extends Error {

  constructor(statusCode, message, errors = undefined, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    this.isOperational = isOperational;

    // Capture stack trace correctly
    Error.captureStackTrace(this, this.constructor);
  }

  // serialize errors for consistent output
  serializeErrors() {
    if (!this.errors) return [];
    return this.errors.map(err => {
      if (err.field) {
        return { field: err.field, message: err.message };
      }
      return { message: err.message };
    });
  }
}

export default CustomError;
