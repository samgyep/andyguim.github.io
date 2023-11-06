import express from "express";
import { Booking } from "../models/bookModel.js";

const router = express.Router();

// Route for save a new book
router.post("/", async (req, res) => {
  try {
    if (!req.body.user || !req.body.date) {
      return res
        .status(400)
        .send({ message: "Send all required fields: title, author" });
    }
    const newBook = { user: req.body.user, date: req.body.date };
    const book = await Booking.create(newBook);
    return res.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route for Get All books from database
router.get("/", async (req, res) => {
  try {
    const books = await Booking.find({});

    return res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});
// Route for Get One book from database by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Booking.findById(id);

    return res.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route for update a book
router.put("/:id", async (req, res) => {
  try {
    if (!req.body.user || !req.body.date) {
      return res
        .status(400)
        .send({ message: "Send all required fields: title, author" });
    }
    const { id } = req.params;
    const result = await Booking.findByIdAndUpdate(id, req.body);
    if (!result) {
      return res.status(404).json({ message: "Book not found" });
    }
    return res.status(200).json({ message: "Book updated successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route for Delete a book
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Booking.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: "Book not found" });
    }
    return res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

export default router;
