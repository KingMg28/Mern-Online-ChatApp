import bcrypt from "bcryptjs";

import {
  User,
  validateRegisterLogin,
  validateRegisterSignup,
} from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
  try {
    //validator
    const { value, error } = validateRegisterSignup(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message });

    const emailIsExist = await User.findOne({ email: value.email });
    if (emailIsExist) {
      return res.status(400).json({ error: "email already exists !" });
    }

    const user = await User.findOne({ username: value.username });
    if (user) {
      return res.status(400).json({ error: "Username already exists !" });
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(value.password, salt);

    const profPic = `https://avatar.iran.liara.run/public/?username=${value.username}`;

    const newUser = new User({
      email: value.email,
      username: value.username,
      fullname: value.fullname,
      password: hashedPassword,
      profilePic: profPic,
    });

    if (newUser) {
      //Generate JWT token and set as cookie
      generateTokenAndSetCookie(
        {
          _id: newUser._id,
          username: newUser.username,
          profilePic: newUser.profilePic,
        },
        res
      );

      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        username: newUser.username,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ error: "Invalid user data." });
    }
  } catch (error) {
    console.log("Error in sign up controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    //validator
    const { value, error } = validateRegisterLogin(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message });

    const user = await User.findOne({ username: value.username });
    const isPasswordCorrect = await bcrypt.compare(
      value.password,
      user?.password || ""
    );

    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    generateTokenAndSetCookie(
      {
        _id: user._id,
        username: user.username,
        profilePic: user.profilePic,
      },
      res
    );

    res.status(200).json({
      _id: user._id,
      username: user.username,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("Error in Login controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged Out successfully" });
  } catch (error) {
    console.log("Error in Logout controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkAuth controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
