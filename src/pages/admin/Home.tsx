import { Link } from "react-router-dom";
import Notification from "../../components/Notification";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "../../types/JwtPayload";

const Home = () => {
  const [username, setUsername] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [roles, setRoles] = useState<{ name: string }[] | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode<JwtPayload>(token);
        setUsername(decodedToken.username);
        setEmail(decodedToken.sub);
        setRoles(decodedToken.roles);
      } catch (error) {
        console.error("Error decoding token: ", error);
      }
    }
  }, []);

  // Log updated username and email
  useEffect(() => {
    if (username) {
      console.log("Username: ", username);
    }
    if (email) {
      console.log("Email: ", email);
    }
    if (roles) {
      console.log("Roles: ", roles);
    }
  }, [username, email, roles]);

  return (
    <>
      <Notification />
      <h3>Admin Home Page</h3>
      {username && email && roles ? (
        <div>
          <p>Welcome, {username}!</p>
          <p>Email: {email}</p>
          <p>
            Role:{" "}
            {roles?.map((role) => (
              <span key={role.name}>{role.name}</span>
            ))}
          </p>
          <Link to="/admin/available-time-slot-form">
            Allocate available time slot
          </Link>
        </div>
      ) : (
        <Link to="/auth/login">Login</Link>
      )}
      <br />
      <Link to="/">Back to Home page</Link>
    </>
  );
};

export default Home;
