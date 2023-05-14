const express = require("express");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

// Connect to MongoDB
// mongoose.connect("mongodb://localhost:27017/brilliantPro", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const userSchema = new mongoose.Schema({
//   email: { type: String, unique: true },
//   password: String,
// });

// const User = mongoose.model("User", userSchema);

// app.use(bodyParser.json());

// // Signup endpoint
// app.post("/signup", async (req, res) => {
//   try {
//     // Hash the password before saving to the database
//     const hashedPassword = await bcrypt.hash(req.body.password, 10);

//     const newUser = new User({
//       email: req.body.email,
//       password: hashedPassword,
//     });

//     await newUser.save();

//     res.status(201).send("User created");
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Error creating user");
//   }
// });

// // Login endpoint
// app.post("/login", async (req, res) => {
//   try {
//     const user = await User.findOne({ email: req.body.email });

//     // Compare the password with the hashed password in the database
//     const passwordMatch = await bcrypt.compare(
//       req.body.password,
//       user.password
//     );

//     if (passwordMatch) {
//       res.status(200).send("Login successful");
//     } else {
//       res.status(401).send("Incorrect email or password");
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Error logging in");
//   }
// });

