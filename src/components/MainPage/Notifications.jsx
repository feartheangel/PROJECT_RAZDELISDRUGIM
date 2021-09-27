import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { NotificationBlock } from "../index";

const NotifyPopUp = ({
  notifyPopUpActive,
  setNotifyPopUpActive,
  notifications,
  chatSocket,
}) => {
  React.useEffect(() => {
    const onClick = (e) => {
      if (notifyRef.current) {
        notifyRef.current.contains(e.target) || setNotifyPopUpActive(false);
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const notifyRef = useRef(null);
  return (
    <div ref={notifyRef}>
      <div
        className={
          notifyPopUpActive
            ? "dropdown-notify-menu-wrapper active"
            : "dropdown-notify-menu-wrapper"
        }
      >
        <div className="dropdown-notify-menu-content">
          {notifications &&
            notifications.map((item) => (
              <NotificationBlock
                notification={item}
                chatSocket={chatSocket}
                notifications={notifications}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default NotifyPopUp;
