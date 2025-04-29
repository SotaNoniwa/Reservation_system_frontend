import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type jwtPayload = {
  username: string;
  email: string;
  roles: { name: string }[];
  [key: string]: any;
};

const Home = () => {
  const [username, setUsername] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [roles, setRoles] = useState<{ name: string }[] | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode<jwtPayload>(token);
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
      <h3>Home Page</h3>
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
          {roles?.some((role) => role.name === "ROLE_ADMIN") ? (
            <Link to="/admin">Go to Admin Home</Link>
          ) : (
            <Link to="/user">Go to User Home</Link>
          )}
        </div>
      ) : (
        <div>
          <Link to="/auth/login">Login</Link> <br />
          <br />
          <Link to="/auth/register">Register</Link>
        </div>
      )}
    </>
  );
};

export default Home;
