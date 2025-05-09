import { Link } from "react-router-dom";
import Notification from "../../components/Notification";

const Home = () => {
  return (
    <>
      <Notification />
      <h3>User Home Page</h3>
      <Link to="/user/reservation-form">Go to reservation form</Link>
      <br />
      <br />
      <Link to="/">Back to Home page</Link>
    </>
  );
};

export default Home;
