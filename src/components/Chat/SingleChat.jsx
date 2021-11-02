import React from "react";
import Dot from "../../img/Chat/dot.png";
import { rootAddress } from "../../http/axios-requests";
import { Link } from "react-router-dom";
import Shape from "../../img/Shape.png";

const SingleChat = ({ item, chatSocket }) => {
  const [showActionsMenu, setShowActionsMenu] = React.useState(false);

  const deleteChatHandler = (e) => {
    e.preventDefault();
    if (window.confirm("Вы уверены?")) {
      chatSocket.current.send(
        JSON.stringify({
          command: "delete_chat",
          chat_id: item.id,
        })
      );
    }
  };

  return (
    <Link to={`/chat?id=${item && item.id}`} style={{ textDecoration: "none" }}>
      <div className="single_chat_wrapper">
        <img
          alt="razdelisdrugim"
          className="single_chat_item_image"
          src={`${rootAddress}${item.get_item_photo}`}
        />
        <div className="single_chat_right_side">
          <div className="single_chat_left_block_first_row">
            <p clsssName="single_chat_receiver_name">{item.name}</p>
            <p className="single_chat_message_date">
              {item.date_last_message
                ? `${item.date_last_message.split("").splice(8, 2).join("")} ${
                    item.date_last_message.split("").splice(5, 2).join("") ===
                    "01"
                      ? "Января"
                      : item.date_last_message
                          .split("")
                          .splice(5, 2)
                          .join("") === "02"
                      ? "Февраля"
                      : item.date_last_message
                          .split("")
                          .splice(5, 2)
                          .join("") === "03"
                      ? "Марта"
                      : item.date_last_message
                          .split("")
                          .splice(5, 2)
                          .join("") === "04"
                      ? "Апреля"
                      : item.date_last_message
                          .split("")
                          .splice(5, 2)
                          .join("") === "05"
                      ? "Мая"
                      : item.date_last_message
                          .split("")
                          .splice(5, 2)
                          .join("") === "06"
                      ? "Июня"
                      : item.date_last_message
                          .split("")
                          .splice(5, 2)
                          .join("") === "07"
                      ? "Июля"
                      : item.date_last_message
                          .split("")
                          .splice(5, 2)
                          .join("") === "08"
                      ? "Авугста"
                      : item.date_last_message
                          .split("")
                          .splice(5, 2)
                          .join("") === "09"
                      ? "Сентября"
                      : item.date_last_message
                          .split("")
                          .splice(5, 2)
                          .join("") === "10"
                      ? "Октября"
                      : item.date_last_message
                          .split("")
                          .splice(5, 2)
                          .join("") === "11"
                      ? "Ноября"
                      : item.date_last_message
                          .split("")
                          .splice(5, 2)
                          .join("") === "12"
                      ? "Декабря"
                      : ""
                  }, ${item.date_last_message.split("").splice(11, 5).join("")}`
                : "Нет сообщений"}
            </p>
          </div>
          <div className="single_chat_left_block_second_row">
            <div className="single_chat_message_text_wrapper">
              {item.avatar_last_user_message && (
                <img
                  alt="razdelisdrugim"
                  className="single_chat_sender_image"
                  src={`${rootAddress}${item.avatar_last_user_message}`}
                />
              )}
              <p
                className="single_chat_message_text"
                style={
                  item.last_message === "Вам поступило новое бронирование"
                    ? { backgroundColor: "rgba(76, 201, 240, 0.14)" }
                    : {}
                }
              >
                {item.last_message === null
                  ? "Пока нет сообщений"
                  : item.last_message}
              </p>
            </div>
            <div className="single_chat_message_block_right">
              {item.is_last_message === false && (
                <img
                  alt="razdelisdrugim"
                  className="single_chat_unread_image"
                  title="Не прочитано собеседником"
                  src={Dot}
                />
              )}
              {item.not_read_messages !== 0 && (
                <div className="single_chat_count_not_read_messages_circle">
                  <p className="single_chat_count_not_read_messages">
                    {item.not_read_messages}
                  </p>
                </div>
              )}
              <img
                alt="razdelisdrugim"
                className="single_chat_actions_image"
                title="Удалить чат"
                src={Shape}
                onClick={(e) => deleteChatHandler(e)}
              />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SingleChat;
