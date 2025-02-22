import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <h3>Home Page</h3>
      <Link to="/admin">Admin Panel </Link>
      <br />
      <br />
      <Link to="/user">User Panel</Link>
    </>
  );
};

export default Home;
