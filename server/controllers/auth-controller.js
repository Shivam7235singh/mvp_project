const User = require("../models/user-model");

// Home route
const home = async (req, res) => {
  try {
    res.status(200).send("Welcome to the Home page");
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal server error");
  }
};

// Register route
const register = async (req, res) => {
  try {
    const { username, phone, email, password } = req.body;

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User already exists" });
    }

    const userCreated = await User.create({
      username,
      phone,
      email,
      password,
    });

    res.status(201).json({
      message: "Registration successful",
      token: userCreated.generateToken(),
      userId: userCreated._id.toString(),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal server error");
  }
};

// Login route
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email });
    console.log("login hit");
    if (!userExist) {
      return res.status(404).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await userExist.comparePassword(password);
    if (isPasswordValid) {
      res.status(200).json({
        message: "Login successful",
        token: userExist.generateToken(),
        userId: userExist._id.toString(),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal server error");
  }
};

// User route
const user = async (req, res) => {
  try {
    const userData = req.User || await User.find({});
    console.log(userData);
    return res.status(200).json({ userData });
  } catch (error) {
    console.error(`Error from user route: ${error}`);
    res.status(500).json("Internal server error");
  }
};

module.exports = { home, register, login, user };
