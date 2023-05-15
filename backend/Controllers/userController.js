const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
// register user
const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({ msg: "pls enter all fields", status: false });
    }
    //check if user exist
    const emailExist = await User.findOne({ email });
    if (emailExist) {
      return res.json({ msg: "Email already Exist!", status: false });
    }
    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    //create new user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    delete user.password;
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        emaail: user.email,
        token: generateToken(user._id),
      });
    } else {
      return res({ msg: "Sign up not Succssful!!!" });
    }
  } catch (ex) {
    next(ex);
  }
};

// login  user
const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    //get user email from the request sent
    const user = await User.findOne({ email });

    //compare the request password and the hashed password in the database
    const passwordCheck = await bcrypt.compare(password, user.password);
    if (!passwordCheck) {
       res.json({ msg: "Invalid details!!", status: false });
    } else {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    }
  } catch (ex) {
    next(ex);
  }

  // res.json({ message: "login user" });
};

// get user profile
const userdata = async (req, res) => {
  const { _id, name, email } = await User.findById(req.user.id);

  res.status(200).json({
    id: _id,
    email,
    name,
  });
};

//Generate jwt
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "2d" });
};

module.exports = {
  register,
  login,
  userdata,
};
