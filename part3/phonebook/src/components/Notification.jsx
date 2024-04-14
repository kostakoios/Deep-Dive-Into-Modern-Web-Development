const Notification = ({ message, messageType='' }) => {
  if (message === null) {
    return null;
  }
  let getRightClassName = messageType == "success" ? "success" : "failure";
  console.log("getRightClassName: ", getRightClassName)
  return <div className={getRightClassName}>{message}</div>;
};

export default Notification;
