import React, { useRef } from "react";
import { NotificationBlock } from "../index";

const NotifyPopUp = ({
  notifyPopUpActive,
  setNotifyPopUpActive,
  notifications,
  chatSocket,
}) => {
  /*   React.useEffect(() => {
    const onClick = (e) => {
      if (notifyRef.current) {
        notifyRef.current.contains(e.target) || setNotifyPopUpActive(false);
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []); */

  const notifyRef = useRef(null);
  const notifyBlockRef = useRef(null);
  const [viewedNotifications, setViewedNotifications] = React.useState();

  React.useEffect(() => {
    window.addEventListener("scroll", scrollHandler);

    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);

  const scrollHandler = () => {
    if (
      window.pageYOffset + window.innerHeight >=
      notifyBlockRef.current.offsetTop
    )
      console.log(`Hidden element is now visible`);
  };

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
          {(!notifications || notifications.length === 0) && (
            <p className="notifications_empty_p">Нет новых уведомлений.</p>
          )}
          {notifications &&
            notifications.map((item, index) => (
              <NotificationBlock
                key={index}
                notification={item}
                chatSocket={chatSocket}
                notifications={notifications}
                setNotifyPopUpActive={setNotifyPopUpActive}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default NotifyPopUp;
