import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import authMiddleware from "../middleware/authMiddle.js";
import { Style, Avatar } from "@dicebear/core";
import definition from "@dicebear/styles/initials.json" with { type: "json" };
dotenv.config();

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        error: "All fields required !!!",
      });
    }

    const style = new Style(definition);
    const avatar = new Avatar(style, {
      lettersVariant: ["double"],
      seed: name,
    });

    const dataUri = avatar.toDataUri();

    const existingUser = await User.findOne({ name });

    const existingEmail = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: "Username Already exists",
      });
    }

    if (existingEmail) {
      return res.status(400).json({
        success: false,
        error: "Email Already exists",
      });
    }

    const user = new User({
      name,
      email,
      password,
      avatar: dataUri,
    });

    await user.save();

    res.status(201).json({
      success: true,
      message: "Registration Successful",
    });
  } catch (error) {
    console.error("Problem in Register", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email: input, password } = req.body;

    if (!input || !password) {
      return res.status(400).json({
        success: false,
        error: "Email is required",
      });
    }

    const person = await User.findOne({
      $or: [
        { email : input },
        {name : input }
      ]
    });

    if (!person) {
      return res.status(401).json({
        success: false,
        error: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, person.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: "Email or password is wrong!!!",
      });
    }

    const token = jwt.sign({ userId: person._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      success: true,
      message: "Login successfully",
      user: {
        id: person._id,
        name: person.name,
        email: person.email,
        avatar: person.avatar,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Server error !!!",
    });
  }
});

router.post("/logout", async (req, res) => {
  //console.log("Cookies :", req.cookies);
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/",
  });

  res.status(200).json({
    success: true,
    message: "Logout successfully",
  });
});

router.get("/me", authMiddleware, async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error,
    });
  }
});

export default router;
