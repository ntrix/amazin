import express from "express";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import sgMail from "@sendgrid/mail";
import cors from "cors";
import data from "../data.js";
import User from "../models/userModel.js";
import { generateToken, isAdmin, isAuth } from "../utils.js";

const userRoute = express.Router();

userRoute.post("/contact", cors(), (req, res) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const { name, email, phone, text } = req.body;
  try {
    sgMail.send({
      to: process.env.TOMAIL,
      from: process.env.FROMMAIL,
      subject: `contact from name:${name} email:${email} phone:${phone || ""}`,
      text: "Nachricht: " + text,
      html: "<strong>Nachricht</strong>: " + text,
    });
    res.status(200).send("ok");
    console.log(
      `contact from name:${name} email:${email} phone:${phone} `,
      text
    );
  } catch (err) {
    res.status(500).send(err);
  }
});

userRoute.get(
  "/top-sellers",
  asyncHandler(async (req, res) => {
    const topSellers = await User.find({ isSeller: true })
      .sort({ "seller.rating": -1 })
      .limit(3);
    res.send(topSellers);
  })
);

userRoute.get(
  "/seed",
  asyncHandler(async (req, res) => {
    // await User.remove({});
    const createdUsers = await User.insertMany(data.users);
    res.send({ createdUsers });
  })
);

userRoute.post(
  "/signin",
  asyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(401).send({ message: "Invalid email or password" });

    let count = (user.failLoginCount || 0) + 1;

    if (bcrypt.compareSync(req.body.password, user.password)) {
      user.failLoginCount = 0; //reset fail attempts count by success login
      user.save((err) => (err ? res.status(402).send({ message: err }) : 0));
      return res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        isSeller: user.isSeller,
        token: generateToken(user),
      });
    }

    user.failLoginCount = count;
    if (count < 3)
      res
        .status(501)
        .send({ message: "Wrong password! " + count + " of 4 attempts." });
    else if (count < 5) {
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      const msg = {
        to: user.email,
        from: process.env.FROMMAIL,
        subject: "Warning! too many failed attempts by logging in",
        text: `You have reached ${count}/4 attempts to login. Please be careful or your account will be locked permanent.`,
        html: "<b>You can also retry in 15 minutes or reset your password</b>",
      };
      try {
        await sgMail.send(msg);
        res.status(502).send({
          message: `${count} fail attempts. A warning message has been sent to the registered email address!`,
        });
      } catch (err) {
        res.status(504).send({
          message: `${count} fail attempts. A warning message has been sent, but the registered email cannot receive any message! Error: ${err}`,
        });
      }
    } else {
      //case count = timeId + 5, is > 5
      clearTimeout(user.failLoginCount - 5); //-5 to get back the right timeoutId
      const waitingSingleton = setTimeout(() => {
        user.failLoginCount = 3;
        user.save((err) => (err ? res.status(402).send({ message: err }) : 0));
      }, 15 * 60 * 1000);
      user.failLoginCount = waitingSingleton + 5; //save timeoutId instead the counter, +5 for surely have more than 4 fail attempts
      res.status(503).send({
        message:
          "Too many fail attempts! Please try again in 15 minutes or reset your password.",
      });
    }
    user.save((err) => (err ? res.status(402).send({ message: err }) : 0));
  })
);

userRoute.post(
  "/register",
  asyncHandler(async (req, res) => {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });
    const createdUser = await user.save();
    res.send({
      _id: createdUser._id,
      name: createdUser.name,
      email: createdUser.email,
      isAdmin: createdUser.isAdmin,
      isSeller: user.isSeller,
      token: generateToken(createdUser),
    });
  })
);

userRoute.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: "User Not Found" });
    }
  })
);

userRoute.use(isAuth);

userRoute.put(
  "/profile",
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (user.isSeller) {
        user.seller.name = req.body.sellerName || user.seller.name || user.name;
        user.seller.logo = req.body.sellerLogo || user.seller.logo;
        user.seller.description =
          req.body.sellerDescription || user.seller.description;
      }
      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8);
      }
      const updatedUser = await user.save();
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        isSeller: user.isSeller,
        token: generateToken(updatedUser),
      });
    }
  })
);

userRoute.get(
  "/",
  isAdmin,
  asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.send(users);
  })
);

userRoute.delete(
  "/:id",
  isAdmin,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      if (user.email === "admin@example.com") {
        res.status(400).send({ message: "Can Not Delete Admin User" });
        return;
      }
      const deleteUser = await user.remove();
      res.send({ message: "User Deleted", user: deleteUser });
    } else {
      res.status(404).send({ message: "User Not Found" });
    }
  })
);

userRoute.put(
  "/:id",
  isAdmin,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;

      user.isAdmin = Boolean(req.body.isAdmin);
      // user.isAdmin = req.body.isAdmin || user.isAdmin;

      user.isSeller = Boolean(req.body.isSeller);
      user.seller.name = user.seller.name || user.name;
      user.seller.logo = user.seller.logo || "/images/default-logo.png";

      const updatedUser = await user.save();
      res.send({ message: "User Updated", user: updatedUser });
    } else {
      res.status(404).send({ message: "User Not Found" });
    }
  })
);

export default userRoute;
