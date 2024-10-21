import axios from "axios";
import { useEffect, useState } from "react";

function GetAllDAta() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
  );
}

export default GetAllDAta;
