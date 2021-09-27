import React from "react";
import Shape from "../../img/Shape.png";
import { Link } from "react-router-dom";

const NotificationBlock = ({ notification, chatSocket, notifications }) => {
  const deleteNotifyHandler = (e) => {
    chatSocket.send(
      JSON.stringify({
        command: "update_status_notifications",
        note_ids: notification.note_id,
      })
    );
  };

  return (
    <Link
      to={`/chat?id=${notification.chat_id}`}
      style={{ textDecoration: "none" }}
    >
      <div className="dropdown_notify_menu_notification_wrapper">
        <div className="dropdown_notify_menu_notification_content">
          <div className="notification_upper_row">
            <p className="dropdown_notify_main_p">
              У вас новое сообщение в чате:
            </p>
            <img
              onClick={(e) => deleteNotifyHandler(e)}
              src={Shape}
              style={{ width: "10px", height: "10px" }}
            />
          </div>
          <p className="dropdown_notify_item_p">{notification.name_item}</p>
          <div className="last_message_notification_wrapper">
            <p>{notification.text_message}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NotificationBlock;
