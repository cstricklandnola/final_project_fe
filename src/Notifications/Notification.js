import { React, useState, useEffect } from "react";

const Notification = (props) => {
  const [width, setWidth] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [exit, setExit] = useState(false);

  const handleStartTimer = () => {
    const id = setInterval(() => {
      setWidth((prev) => {
        if (prev < 100) {
          return prev + 1;
        }
        clearInterval(id);
        return prev;
      });
    }, 15);
    setIntervalId(id);
  };

  const handleCloseNotification = () => {
    setExit(true);
    setTimeout(() => {
      props.dispatch({
        type: "REMOVE_NOTIFICATION",
        id: props.id
      })
    }, 400)
  }

  useEffect(() => {
    if (width === 100) {
      handleCloseNotification();
    }
  }, [width])

  useEffect(() => {
    handleStartTimer();
  }, []);

  return (
    <div className={`notification-item ${exit ? 'exit' : ''}`}>
      <p>{props.message}</p>
      <div className={"bar"} style={{ width: `${width}%` }}></div>
    </div>
  );
};

export default Notification;
