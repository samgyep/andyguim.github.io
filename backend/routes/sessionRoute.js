import express from "express";
import { Session } from "../models/sessionModel.js";

const router = express.Router();

// Route for save a new session
router.post("/", async (req, res) => {
  try {
    if (!req.body.session) {
      // if (!req.body.session || !req.body.customer) {
      return res
        .status(400)
        .send({ message: "Send all required fields: session, customer" });
    }
    const newDate = new Date(req.body.date);
    console.log(typeof newDate);
    console.log(newDate);
    const newSession = {
      session: req.body.session,
      date: newDate,
      customer: req.body.customer,
    };
    // const newSession = { session: req.body.session, customer: req.body.customer };
    const session1 = await Session.create(newSession);
    return res.status(201).send(session1);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route for save multiple new sessions
router.post("/save_bundle", async (req, res) => {
  try {
    const session = await Session.insertMany(req.body);
    return res.status(201).send(session);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route for Get All session from database
router.get("/", async (req, res) => {
  try {
    const sessions = await Session.find({}).sort({ date: 1 });

    return res.status(200).json({
      count: sessions.length,
      data: sessions,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});
//Route for Get One session from database by id
// router.get("/search=:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const session = await Session.findById(id);

//     return res.status(200).json(session);
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).send({ message: error.message });
//   }
// });

// Route for Get One session from database by id
router.get("/search", async (req, res) => {
  try {
    const { _id, date, customerEmail, customer } = req.query;
    let query = {};
    if (customerEmail) {
      query.customerEmail = customerEmail;
    }
    if (customer) {
      query.customer = customer;
    }
    if (_id) {
      query._id = _id;
    }

    if (date) {
      query.date = date;
    }

    const session = await Session.find(query).sort({ date: 1 });

    return res.status(200).json(session);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route for update a session
router.put("/:id", async (req, res) => {
  console.log("session edit: " + req.body.session);

  try {
    // if (!req.body.session) {
    //   // if (!req.body.session || !req.body.customer) {
    //   return res
    //     .status(400)
    //     .send({ message: "Send all required fields: session, customer" });
    // }
    const { id } = req.params;
    const result = await Session.findByIdAndUpdate(id, req.body);
    if (!result) {
      return res.status(404).json({ message: "Session not found" });
    }
    return res.status(200).json({ message: "Session updated successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route for Delete a session
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Session.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: "Session not found" });
    }
    return res.status(200).json({ message: "Session deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

export default router;
