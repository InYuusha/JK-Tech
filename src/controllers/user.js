const User = require("../models/user");
const { generateToken } = require("../utils/auth");
const { CustomError, AuthenticationError } = require("../utils/error_handling");

exports.signup = async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;
    let user = await User.findOne({ email });

    if (user) {
      throw new CustomError("User Already Exists ", 400);
    }

    user = new User({
      firstname,
      lastname,
      email,
      password,
    });

    await user.save();
    res.status(201).json({ message: "Successfully Created user" });
  } catch (error) {
    res.json({
      message: error.message,
      statusCode: error.statusCode || 500,
    });
  }
};

exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      throw new CustomError("User not found", 404);
    }

    const isMatch = await user.isValidPassword(password);

    if (!isMatch) {
      throw new AuthenticationError("Invalid Credentials ");
    }
    const token = generateToken({ userId: user._id });
    res.status(200).json({ token });
  } catch (error) {
    res.json({
      message: error.message,
      statusCode: error.statusCode || 500,
    });
  }
};
