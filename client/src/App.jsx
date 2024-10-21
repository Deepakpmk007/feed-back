import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [feedback, setFeedback] = useState({
    q1: "",
    q2: "",
    q3: "",
    q4: "",
    q5: "",
  });

  const handleChange = (e) => {
    setFeedback({
      ...feedback,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/feedback", feedback);
      alert("Feedback submitted successfully!");
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  return (
    <div>
      <h1>Feedback Form</h1>
      <form onSubmit={handleSubmit}>
        <label>Question 1</label>
        <input
          type="text"
          name="q1"
          value={feedback.q1}
          onChange={handleChange}
        />
        <br />

        <label>Question 2</label>
        <input
          type="text"
          name="q2"
          value={feedback.q2}
          onChange={handleChange}
        />
        <br />

        <label>Question 3</label>
        <input
          type="text"
          name="q3"
          value={feedback.q3}
          onChange={handleChange}
        />
        <br />

        <label>Question 4</label>
        <input
          type="text"
          name="q4"
          value={feedback.q4}
          onChange={handleChange}
        />
        <br />

        <label>Question 5</label>
        <input
          type="text"
          name="q5"
          value={feedback.q5}
          onChange={handleChange}
        />
        <br />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
