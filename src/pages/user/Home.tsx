import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <h3>User Home Page</h3>
      <Link to="/user/reservation-form">Make a reservation</Link>
      <br />
      <Link to="/">Back to Home page</Link>
    </>
  );
};

export default Home;
