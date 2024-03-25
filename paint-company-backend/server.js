// Import required modules
import "dotenv/config.js";
import express, { json } from "express";
import mongoose from "mongoose";
import cors from "cors";

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 8080; // Set port
const MONGO_CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING;

// Connect to MongoDB
mongoose
  .connect(MONGO_CONNECTION_STRING)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const paintSchema = new mongoose.Schema({
  //   _id: mongoose.Schema.Types.ObjectId,
  count: Number,
  title: String,
  status: String,
});

const Paint = mongoose.model("Paint", paintSchema, "paint-company-collection");

// Middleware
app.use(cors());
app.use(json());

// Create Paint endpoint
app.post("/paints", async (req, res) => {
  try {
    const newPaint = new Paint(req.body);
    await newPaint.save();
    res.status(201).send("Paint created successfully");
  } catch (error) {
    console.error("Error creating paint:", error);
    res.status(500).send("Internal server error");
  }
});

// Get Paints endpoint
app.get("/paints", async (req, res) => {
  try {
    const paints = await Paint.find({});
    console.log(paints);
    res.status(200).json(paints);
  } catch (error) {
    console.error("Error fetching paints:", error);
    res.status(500).send("Internal server error");
  }
});

// Edit Paint endpoint
app.put("/paints/:id", async (req, res) => {
  try {
    const updatedPaint = await Paint.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).send(updatedPaint);
  } catch (error) {
    console.error("Error editing paint:", error);
    res.status(500).send("Internal server error");
  }
});

// Delete Paint endpoint
app.delete("/paints/:id", async (req, res) => {
  try {
    await Paint.findByIdAndDelete(req.params.id);
    res.status(200).send("Paint deleted successfully");
  } catch (error) {
    console.error("Error deleting paint:", error);
    res.status(500).send("Internal server error");
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
