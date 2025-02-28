import "../styles/Success.css";
import "../styles/Error.css";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const Notification = () => {
  const location = useLocation();

  const [message, setMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean | null>(false);

  useEffect(() => {
    if (location.state?.message) {
      setMessage(location.state.message);
      toast.success(location.state.message);
      setIsSuccess(true);
    } else if (location.state?.error) {
      setMessage(location.state.error);
      toast.error(location.state.error);
      setIsSuccess(false);
    }
    setTimeout(() => {
      setMessage(null);
    }, 3000);
  }, [location.state]);

  if (message === null) {
    return <></>;
  }

  return (
    <>
      {isSuccess ? (
        <div className="success">{message}</div>
      ) : (
        <div className="error">{message}</div>
      )}
    </>
  );
};

export default Notification;
