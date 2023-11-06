import express from "express";
import { User } from "../models/userModel.js";

const router = express.Router();

// Route for save a new user
router.post("/", async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      return res
        .status(400)
        .send({ message: "Fill all required fields: name, password" });
    }
    const newUser = { email: req.body.email, password: req.body.password };
    const user = await User.create(newUser);
    return res.status(201).send(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route for Get All users from database
router.get("/", async (req, res) => {
  try {
    const users = await User.find({});

    return res.status(200).json({
      count: users.length,
      data: users,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});
// Route for Get One user from database by id
router.get("/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email });

    return res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.get("/search", async (req, res) => {
  console.log("user search: " + req.query.email);

  try {
    const { _id, email, name } = req.query;
    let query = {};
    if (email) {
      query.email = email;
    }
    if (name) {
      query.name = name;
    }
    if (_id) {
      query._id = _id;
    }

    const user = await User.find(query);

    return res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route for update a user
router.put("/:email", async (req, res) => {
  console.log(req.params);

  try {
    // if (!req.body.email) {
    //   return res
    //     .status(400)
    //     .send({ message: "Send all required fields: email, password" });
    // }
    const { email } = req.params;
    const result = await User.findOneAndUpdate({ email }, req.body);
    if (!result) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route for Delete a user
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await User.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

export default router;
