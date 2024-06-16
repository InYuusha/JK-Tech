const User = require("../models/user");
const { CustomError } = require("../utils/error_handling");

exports.createUser = async ({ firstname, lastname, email, password }) => {
  try {
    const user = new User({
      firstname,
      lastname,
      email,
      password,
    });

    await user.save();
  } catch (error) {
    throw new CustomError(`Failed to create user ${error.message}`);
  }
};
