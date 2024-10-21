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
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/getfeedback") // Change this URL to match your backend
      .then((response) => {
        setFeedbacks(response.data); // Store the feedback data in the state
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

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
      <div>
        <h2>Feedback List</h2>
        <ul>
          {feedbacks.map((feedback) => (
            <li key={feedback._id}>
              <strong>Q1:</strong> {feedback.q1} <br />
              <strong>Q2:</strong> {feedback.q2} <br />
              <strong>Q3:</strong> {feedback.q3} <br />
              <strong>Q4:</strong> {feedback.q4} <br />
              <strong>Q5:</strong> {feedback.q5} <br />
              <strong>Submitted At:</strong>{" "}
              {new Date(feedback.submittedAt).toLocaleString()}
              <hr />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
