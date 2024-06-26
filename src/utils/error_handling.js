class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = "InternalServerError";
    this.statusCode = statusCode;
  }
}

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
    this.statusCode = 400;
  }
}

class AuthenticationError extends Error {
  constructor(message) {
    super(message);
    this.name = "AuthenticationError";
    this.statusCode = 401;
  }
}

module.exports = {
  CustomError,
  ValidationError,
  AuthenticationError,
};
