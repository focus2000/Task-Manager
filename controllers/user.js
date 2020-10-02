const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if ((!name, !email, !password)) {
      return res.status(400).json({ msg: "Please Provide all fields" });
    }
    if (password.length < 6)
      return res.status(400).json({ msg: "Password is too short!" });

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "user already exists" });
    }
    user = new User({
      name,
      email,
      password,
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: 3600,
      },
      (err, token) => {
        if (err) throw err;
        res.send({ token, user });
      }
    );
  } catch (err) {
    console.error(err.message);
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if ((!email, !password))
      return res.status(400).json({ msg: "Please Provide all fields" });
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ msg: "User does not exists" });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      },
      (err, token) => {
        if (err) throw err;
        res.send({ token, user });
      }
    );
  } catch (err) {
    console.error(err.message);
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.changePassword = async (req, res) => {
  // check if data was sent
  const { oldpassword, newPassword } = req.body;
  try {
    console.log(req.user);

    if ((!oldpassword, !newPassword))
      return res.status(400).json({ msg: "Please Provide all fields" });
    let user = await User.findOne({ _id: req.user.id });
    if (!user) {
      return res.status(400).json({ msg: "No User Found" });
    }

    const match = await bcrypt.compare(oldpassword, user.password);
    if (!match) {
      return res.status(400).json({ msg: "Invalid password" });
    }
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    await user.save();
    res.status(201).send({ msg: "Password Updated" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server Error" });
  }
};

exports.requestForgotPassword = async (req, res) => {

  const { email } = req.body;
  try {

    if (!email)
      return res.status(400).json({ msg: "Please Provide all fields" });
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "No User Found" });
    }
    const payload = {
      user: {
        id: user.id,
      },
    };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      },
      (err, token) => {
        if (err) throw err;
        res.send({ token });
      }
    );

   
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server Error" });
  }
};

exports.forgotPassword = async (req, res) => {
  // check if data was sent
  const { token } = req.params;
  const { newPassword } = req.body;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!newPassword)
      return res.status(400).json({ msg: "Please Provide all fields" });
    let user = await User.findOne({ _id: decoded.user.id });
    if (!user) {
      return res.status(400).json({ msg: "No User Found" });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    await user.save();
    res.status(201).send({ msg: "Password Updated" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server Error" });
  }
};
