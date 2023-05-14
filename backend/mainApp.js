const express = require('express');
// const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
var cors= require("cors");

app.use(cors())
const admin=require("./Admin/admin")
const learner=require("./Admin/learners")
const admin2=require("./Admin/admin2")
// const loginAdmin=require("./adminLogin.js")

app.use('/admin',admin )
app.use('/learner',learner )
app.use('/',admin2 )
// app.use('/login',loginAdmin)



// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/brilliantPro", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
});

const User = mongoose.model("User", userSchema);

app.use(bodyParser.json());

// Signup endpoint
app.post("/signup", async (req, res) => {
  try {
    const newUser = new User({
      email: req.body.email,
      password: req.body.password,
    });

    await newUser.save();

    res.status(201).send("User created");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating user");
  }
});

// Login endpoint
app.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user.password === req.body.password) {
      res.status(200).send("Login successful");
    } else {
      res.status(401).send("Incorrect email or password");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error logging in");
  }
});

module.exports = app



app.listen(3000, () =>
    console.log('Listening on port 3000'));