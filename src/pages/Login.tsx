import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtPayload } from "./ProtectedRoute";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Send login request to the server
      const res = await axios.post("http://localhost:8080/auth/login", {
        email,
        password,
      });

      // Extract the token and store it in local storage
      const token = res.data;
      localStorage.setItem("token", token);

      const decodedToken = jwtDecode<jwtPayload>(token);
      const userRoles = decodedToken.roles.map((role) => role.name);
      const isAdmin = userRoles.includes("ROLE_ADMIN");

      if (isAdmin) {
        navigate("/admin");
      } else {
        navigate("/user");
      }
    } catch (error) {
      console.error("Login failed", error);
      setPassword("");
      alert("Incorrect email or password");
    }
  };

  return (
    <>
      <h2>Login page</h2>
      <br />
      <form onSubmit={handleLogin}>
        <label>
          Email:
          <input
            type="email"
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <br />
        <input type="submit" name="Submit" />
      </form>
      <br />
      <Link to="/auth/register">Don't have an account? Register now!</Link>
    </>
  );
};

export default Login;
