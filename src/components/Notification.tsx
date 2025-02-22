import "../styles/Success.css";
import "../styles/Error.css";

type NotificationProps = {
  message: string;
  isSuccess: boolean;
};

const Notification = ({ message, isSuccess }: NotificationProps) => {
  return <div className={isSuccess ? "success" : "error"}>{message}</div>;
};

export default Notification;
