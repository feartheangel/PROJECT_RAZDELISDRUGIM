import React from "react";
import { useSelector } from "react-redux";

const MessageBlock = ({ item }) => {
  const { userData } = useSelector(({ userData }) => userData);
  return (
    <div
      className={
        item.author_id === userData.id
          ? "chat_message_block_wrapper own"
          : "chat_message_block_wrapper"
      }
    >
      <img
        src={`https://razdelisdrugim.by:444/${item.avatar}`}
        className="chat_message_block_avatar"
      />
      <div className="chat_message_block_content_part">
        <div className="chat_message_block_first_row">
          <p className="chat_message_block_name_p">
            {item && item.author_name}
          </p>
          <p className="chat_message_block_time_p">
            {item.timestamp
              ? `${item.timestamp.split("").splice(8, 2).join("")} ${
                  item.timestamp.split("").splice(5, 2).join("") === "01"
                    ? "Января"
                    : item.timestamp.split("").splice(5, 2).join("") === "02"
                    ? "Февраля"
                    : item.timestamp.split("").splice(5, 2).join("") === "03"
                    ? "Марта"
                    : item.timestamp.split("").splice(5, 2).join("") === "04"
                    ? "Апреля"
                    : item.timestamp.split("").splice(5, 2).join("") === "05"
                    ? "Мая"
                    : item.timestamp.split("").splice(5, 2).join("") === "06"
                    ? "Июня"
                    : item.timestamp.split("").splice(5, 2).join("") === "07"
                    ? "Июля"
                    : item.timestamp.split("").splice(5, 2).join("") === "08"
                    ? "Авугста"
                    : item.timestamp.split("").splice(5, 2).join("") === "09"
                    ? "Сентября"
                    : item.timestamp.split("").splice(5, 2).join("") === "10"
                    ? "Октября"
                    : item.timestamp.split("").splice(5, 2).join("") === "11"
                    ? "Ноября"
                    : item.timestamp.split("").splice(5, 2).join("") === "12"
                    ? "Декабря"
                    : ""
                }, ${item.timestamp.split("").splice(11, 5).join("")}`
              : "Нет сообщений"}
          </p>
        </div>
        <div className="chat_message_block_second_row">
          <p className="chat_message_block_text_p">{item && item.content}</p>
        </div>
      </div>
    </div>
  );
};

export default MessageBlock;
