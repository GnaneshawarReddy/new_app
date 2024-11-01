import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 
    const redirectButton = (event) => {
      navigate("/login"); // Ensure path matches your Routes
    };

  const onSubmitForm = async (event) => {
    event.preventDefault();
    const data = {
      name,
      email,
      password,
    };
    const url = "http://localhost:4000/register"; // Ensure to include http://

    try {
      const postData = await axios.post(url, data);
      console.log("Response data:", postData.data); // Log response data
    } catch (e) {
      console.log("Error:", e.message);
    }

    event.target.reset(); // Reset form after submission
    setName(""); // Clear name state
    setEmail(""); // Clear email state
    setPassword(""); // Clear password state
  };

  const onChangeEvent = (event) => {
    const { id, value } = event.target;
    if (id === "name") {
      setName(value);
    } else if (id === "email") {
      setEmail(value);
    } else if (id === "password") {
      setPassword(value);
    }
  };

  return (
    <div className="main-container">
      <div>
        <h1>Hello man!</h1>
        <form onSubmit={onSubmitForm}>
          <div className="form-container">
            <div>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={onChangeEvent}
                required
              />
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={onChangeEvent}
                required
              />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={onChangeEvent}
                required
              />
            </div>
            <div>
              <button type="submit">Signup</button>
            </div>
            <div>
              <button type="button" onClick={redirectButton}>
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
