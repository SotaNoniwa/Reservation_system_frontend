import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8080/auth/register", {
        username,
        email,
        password,
        phone,
      });

      const savedUser = res.data;
      console.log("User registered successfully: ", savedUser);
      alert("User registered successfully! You can now login.");

      navigate("/auth/login");
    } catch (error) {
      console.error("Error registering user: ", error);
      alert("Error registering user. Please try again.");
    }
  };

  return (
    <>
      <h2>Register page</h2>
      <br />
      <form onSubmit={handleRegister}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            required
          />
        </label>
        <br />
        <br />
        <label>
          Email:
          <input
            type="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <br />
        <br />
        <label>
          Password:
          <input
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <br />
        <label>
          Phone:
          <input
            type="tel"
            name="phone"
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </label>
        <br />
        <br />
        <input type="submit" name="Submit" />
      </form>
      <br />
      <br />
      <Link to="/auth/login">Already have an account? Login here!</Link>
    </>
  );
};

export default Register;
