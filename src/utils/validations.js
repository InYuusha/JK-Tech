const { ValidationError } = require("./error_handling");
exports.validateCreateBucketInputs = (bucketName) => {
  const errors = [];
  if (!bucketName) errors.push("Bucket Name is required");
  else {
    const bucketNamePattern =
      /^(?!.*[-.]{2})(?!-)(?!.*\.\.)(?!\d+\.\d+\.\d+\.\d+$)[a-z0-9][a-z0-9.-]{1,61}[a-z0-9]$/;

    if (bucketName.length < 3 || bucketName.length > 63) {
      errors.push("Bucket name must be between 3 and 63 characters long.");
    }

    if (!bucketNamePattern.test(bucketName))
      errors.push(
        "Bucket name can only contain lowercase letters, numbers, hyphens, and periods. It must start and end with a lowercase letter or a number, cannot be formatted as an IP address, cannot contain two adjacent periods, and cannot contain a period next to a hyphen."
      );
  }

  if (errors.length > 0) {
    throw new ValidationError(errors[0]);
  }
};

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validateName(name) {
  const nameRegex = /^[A-Za-z]+$/;
  return nameRegex.test(name);
}

function validatePassword(password) {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
}

exports.validateSignupInputs = ({ firstname, lastname, email, password }) => {
  const errors = [];

  if (!email) {
    errors.push("Email is required");
  } else if (!validateEmail(email)) {
    errors.push("Invalid email format");
  }

  if (!firstname) {
    errors.push("First name is required");
  } else if (!validateName(firstname)) {
    errors.push("First name should contain only letters");
  }

  if (!lastname) {
    errors.push('Last name is required')
  } else if (!validateName(lastname)) {
    errors.push('Last name should contain only letters')
  }

  if (!password) {
    errors.password = "Password is required";
  } else if (!validatePassword(password)) {
    errors.push('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character')
  }

  if (errors.length > 0)
    throw new ValidationError(errors[0])
};
