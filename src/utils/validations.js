const { ValidationError } = require("./error_handling");
exports.validateBucketName = (bucketName) => {
  const bucketNamePattern =
    /^(?!.*[-.]{2})(?!-)(?!.*\.\.)(?!\d+\.\d+\.\d+\.\d+$)[a-z0-9][a-z0-9.-]{1,61}[a-z0-9]$/;

  if (bucketName.length < 3 || bucketName.length > 63) {
    return {
      isValid: false,
      error: "Bucket name must be between 3 and 63 characters long.",
    };
  }

  if (!bucketNamePattern.test(bucketName))
    throw new ValidationError(
      "Bucket name can only contain lowercase letters, numbers, hyphens, and periods. It must start and end with a lowercase letter or a number, cannot be formatted as an IP address, cannot contain two adjacent periods, and cannot contain a period next to a hyphen."
    );

  return;
};
