import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import Notification from "../../components/Notification";

const Home = () => {
  const location = useLocation();
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (location.state?.message) {
      setSuccessMsg(location.state.message);
      toast.success(location.state.message);
      setTimeout(() => {
        setSuccessMsg(null);
      }, 3000);
    }
    if (location.state?.error) {
      setErrorMsg(location.state.error);
      toast.error(location.state.error);
      setTimeout(() => {
        setErrorMsg(null);
      }, 3000);
    }
  }, [location.state]);

  return (
    <>
      {successMsg && <Notification message={successMsg} isSuccess={true} />}
      {errorMsg && <Notification message={errorMsg} isSuccess={false} />}
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
