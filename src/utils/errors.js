import CustomError from "./customError.js";

export class BadRequestError extends CustomError {
  constructor(message = "Bad Request", errors = []) {
    super(400, message);
    this.errors = errors;
  }
}

export class DatabaseConnectionError extends CustomError {
  constructor(message = "Database Connection Error") {
    super(502, message);
  }
}

export class NotFoundError extends CustomError {
  constructor(message = "Resource Not Found") {
    super(404, message);
  }
}

export class UnauthorizedError extends CustomError {
  constructor(message = "Unauthorized") {
    super(401, message);
  }
}
export class ForbiddenError extends CustomError {
  constructor(message = "Unauthorized") {
    super(403, message);
  }
}

export class RequestValidationError extends CustomError {
  constructor(message = "validation failed", errors = []) {
    super(400, "Invalid request parameters");
    this.errors = errors;
  }

  serializeErrors() {
    return this.errors.array().map((err) => ({
      field: err.path,
      message: err.msg,
    }));
  }
}
