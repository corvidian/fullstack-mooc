const Notification = ({notification}) => {
  if (notification === null) {
    return null;
  }
  const { message, level } = notification;
  return <div className={level}>{message}</div>;
};

export default Notification;
