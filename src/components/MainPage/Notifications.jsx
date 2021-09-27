import React, { useRef } from "react";
import { Link } from "react-router-dom";
import Shape from "../../img/Shape.png";

const NotifyPopUp = ({
    notifyPopUpActive,
    setNotifyPopUpActive
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
          <div className='dropdown_notify_menu_notification_wrapper'>
              <div className='dropdown_notify_menu_notification_content'>
                  <div className='notification_upper_row'>
                  <p className='dropdown_notify_main_p'>У вас новое сообщение от Алексей!</p>
                    <img
                src={Shape}
                style={{width: '10px', height: '10px'}}
              />
                  </div>
                  <div className='last_message_notification_wrapper'>
                      <p>Последнее сообщение</p>
                  </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotifyPopUp;