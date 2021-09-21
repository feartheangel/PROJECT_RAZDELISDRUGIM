import React from "react";
import Avatar from "../../img/CardThings/LeftContent/Rectangle 7.png";
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
            {item && item.timestamp.split("").splice(11, 5).join("")}
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
