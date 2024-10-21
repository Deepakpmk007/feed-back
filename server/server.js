const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://deepakpmk:1X0BKcInjfSxteaj@feed-back.4zzc5.mongodb.net/feedback?retryWrites=true&w=majority&appName=feed-back",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Failed to connect to MongoDB", err));

// Define a Feedback schema
const feedbackSchema = new mongoose.Schema({
  q1: String,
  q2: String,
  q3: String,
  q4: String,
  q5: String,
  submittedAt: { type: Date, default: Date.now },
});
const Feedback = mongoose.model("Feedback", feedbackSchema);

// API to handle feedback submission
app.post("/api/feedback", async (req, res) => {
  const feedbackData = req.body;

  const feedback = new Feedback(feedbackData);
  try {
    await feedback.save();
    res
      .status(201)
      .send({ message: "Feedback submitted and stored in MongoDB" });
  } catch (error) {
    console.error("Error saving feedback:", error);
    res.status(500).send({ message: "Error storing feedback" });
  }
});

app.get("/api/getfeedback", async (req, res) => {
  try {
    const feedbacks = await Feedback.find(); // Retrieve all feedback documents
    res.status(200).json(feedbacks); // Return the feedbacks as a JSON array
  } catch (error) {
    console.error("Error retrieving feedback:", error);
    res.status(500).send({ message: "Error retrieving feedback" });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
