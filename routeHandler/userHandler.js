const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
require("dotenv").config();
const userSchema = require("../schemas/userSchema");
const User = new mongoose.model("User", userSchema);

// post a user
router.post("/signup", async (req, res) => {
  try {
    const hashPassword = await bcrypt.hash(req.body.password, 10); // as we are using await and try catch block so, we didn't call error function(catch block) as callback(await)
    const newUser = await new User({
      name: req.body.name,
      userName: req.body.userName,
      password: hashPassword,
      status: req.body.status,
    });

    console.log(req.body);
    await newUser.save(); // we didn't use error callback function in save()  because await will works as callback and catch block will handle if any error happen
    res.status(200).json({
      message: `user signup successful `,
    });
  } catch (error) {
    res.status(500).json({
      message: `user post error ${error}`,
    });
    console.log(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.find({ userName: req.body.userName });
    console.log({ user });
    if (user && user.length) {
      // catch block won't handle if a condition is false.. because this is not code's execution failure.. So, we have to handle if condition is false, in else statement
      const isPasswordValid = await bcrypt.compare(
        // return true or false
        req.body.password, // password provided by user , when trying to log in
        user[0].password // user hashed password which has taken from database
      );
      //////////////////////////     TOKEN HAS CREATED HERE  (start) //////////////////////////////////////
      if (isPasswordValid) {
        const token = await jwt.sign(
          {
            userName: user[0].userName,
            userId: user[0]._id,
          },
          process.env.JWT_SECRET_KEY,
          {
            expiresIn: "1h",
          }
        );
        const userWithTodos = await User.find({
          userName: req.body.userName,
        }).populate("todos");
        console.log({ token });
        res.status(200).json({
          access_token: token,
          userData: userWithTodos,
          message: "login successful ",
        });
      }
      //////////////////////////     TOKEN HAS CREATED HERE  (END) //////////////////////////////////////
      else {
        res.status(401).json({
          error: `authentication failed `,
        });
      }
    } else {
      res.status(401).json({
        error: `authentication failed `,
      });
    }
  } catch (error) {
    res.status(401).json({
      error: `authentication failed  ${error}`,
    });
  }
});

module.exports = [router, User];
