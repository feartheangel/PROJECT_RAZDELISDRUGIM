import React from "react";
import Shape from "../../img/Shape.png";
import { Link } from "react-router-dom";

const NotificationBlock = ({ notification, chatSocket }) => {
  const deleteNotifyHandler = (e) => {
    e.preventDefault();
    console.log(notification.id_note);
    chatSocket.send(
      JSON.stringify({
        command: "delete_notifications",
        note_id: [notification.id_note],
      })
    );
  };

  return (
    <a
      href={`/chat?id=${notification.chat_id}`}
      style={{ textDecoration: "none", width: "97%" }}
    >
      <div className="dropdown_notify_menu_notification_wrapper">
        <div className="dropdown_notify_menu_notification_content">
          <div className="notification_upper_row">
            {notification.type_note === "MESSAGE" && (
              <p className="dropdown_notify_main_p">
                У Вас новое сообщение от {notification.name_sender}:
              </p>
            )}
            {notification.type_note === "RESERVE" && (
              <p className="dropdown_notify_main_p">
                У Вас новый запрос на бронирование от {notification.name_sender}{" "}
                на:
              </p>
            )}
            <img
              className="delete_notification_stroke"
              onClick={(e) => deleteNotifyHandler(e)}
              src={Shape}
              style={{ width: "10px", height: "10px" }}
            />
          </div>
          <p className="dropdown_notify_item_p">{notification.name_item}</p>
          {notification.type_note === "MESSAGE" && (
            <div className="last_message_notification_wrapper">
              <p>{notification.text_message}</p>
            </div>
          )}
        </div>
      </div>
    </a>
  );
};

export default NotificationBlock;
