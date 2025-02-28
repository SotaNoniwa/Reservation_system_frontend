import { Link } from "react-router-dom";
import Notification from "../../components/Notification";

const Home = () => {
  return (
    <>
      <Notification />
      <h3>Admin Home Page</h3>
      <Link to="/">Back to Home page</Link>
      <br />
      <br />
      <Link to="/admin/available-time-slot-form">
        Allocate available time slot
      </Link>
    </>
  );
};

export default Home;
