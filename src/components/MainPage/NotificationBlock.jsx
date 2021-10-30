import React from "react";
import Shape from "../../img/Shape.png";

const NotificationBlock = ({
  notification,
  chatSocket,
  setNotifyPopUpActive,
}) => {
  const deleteNotifyHandler = (e) => {
    e.preventDefault();
    chatSocket.send(
      JSON.stringify({
        command: "delete_notifications",
        note_id: [notification.id_note],
      })
    );
  };

  return (
    <div style={{ width: "100%" }}>
      {notification.type_note === "MESSAGE" && (
        <a
          href={`/chat?id=${notification.chat_id}`}
          style={{ textDecoration: "none", width: "97%" }}
        >
          <div className="dropdown_notify_menu_notification_wrapper">
            <div className="dropdown_notify_menu_notification_content">
              <div className="notification_upper_row">
                <p className="dropdown_notify_main_p">
                  У Вас новое сообщение от {notification.name_sender}:
                </p>
              </div>
              <div className="last_message_notification_wrapper">
                <p>{notification.text_message}</p>
              </div>
            </div>
          </div>
        </a>
      )}

      {notification.type_note === "RESERVE" && (
        <a href={`/booking`} style={{ textDecoration: "none", width: "97%" }}>
          <div className="dropdown_notify_menu_notification_wrapper">
            <div className="dropdown_notify_menu_notification_content">
              <div className="notification_upper_row">
                <p className="dropdown_notify_main_p">
                  У Вас новое бронирование от {notification.name_sender} на
                  позицию:
                </p>
              </div>
              <div
                style={{ backgroundColor: "rgba(76, 201, 240, 0.14)" }}
                className="last_message_notification_wrapper"
              >
                <p>{notification.name_item}</p>
              </div>
            </div>
          </div>
        </a>
      )}

      {notification.type_note === "RESERVE_STATUS" && (
        <a href={`/booking`} style={{ textDecoration: "none", width: "97%" }}>
          <div className="dropdown_notify_menu_notification_wrapper">
            <div className="dropdown_notify_menu_notification_content">
              <div className="notification_upper_row">
                <p className="dropdown_notify_main_p">
                  Статус бронирования позиции <b>{notification.name_item}</b> от{" "}
                  <b>{notification.name_sender}</b> был изменен на:
                </p>
              </div>
              <div
                style={{
                  backgroundColor:
                    notification.reservation_status === "SUBMITTED"
                      ? "#deffdeb3"
                      : notification.reservation_status === "DENIED"
                      ? "rgb(255 43 43 / 18%)"
                      : notification.reservation_status === "CANCELED"
                      ? "rgb(155 131 127 / 15%)"
                      : "",
                }}
                className="last_message_notification_wrapper"
              >
                <p>
                  <b>
                    {notification.reservation_status === "SUBMITTED"
                      ? "Подтверждено"
                      : notification.reservation_status === "DENIED"
                      ? "Отклонено"
                      : notification.reservation_status === "CANCELED"
                      ? "Отменено"
                      : ""}
                  </b>
                </p>
              </div>
            </div>
          </div>
        </a>
      )}
    </div>
  );
};

export default NotificationBlock;
