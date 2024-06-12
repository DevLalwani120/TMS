import React, { useState } from "react";
import axios from "axios";
import "../styles/adminSignup.css";

const AdminSignup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://tms-server-nt4d.onrender.com/api/signup", {
        name,
        email,
        password,
        phone,
      });
      setMessage(response.data.message);
      setError("");
      setName("");
      setEmail("");
      setPassword("");
      setPhone("");
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.message);
        setMessage("");
      } else {
        setError("An unexpected error occurred");
        setMessage("");
      }
    }
  };

  return (
    <div className="AdminSignup">
      <div className="signup-container">
        <h2>Admin Signup</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="input-container">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-container">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="input-container">
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          {error && <p className="error">{error}</p>}
          {message && <p className="message">{message}</p>}
          <button type="submit">Signup</button>
        </form>
      </div>
    </div>
  );
};

export default AdminSignup;
