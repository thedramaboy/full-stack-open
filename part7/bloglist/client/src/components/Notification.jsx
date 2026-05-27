// import useNotificationStore from "../stores/notificationStore";
import { useNotification } from "../context/NotificationContext";

const Notification = ({ message }) => {
  // const notification = useNotificationStore((state) => state.notification);
  const notification = useNotification();

  // const messageStyle = {
  //   color: "green",
  //   background: "lightgrey",
  //   fontSize: "20px",
  //   borderStyle: "solid",
  //   borderRadius: "5px",
  //   padding: "10px",
  //   marginBottom: "10px",
  // };

  if (notification === null) {
    return null;
  }

  return <div>{notification.text}</div>;
};

export default Notification;
