import React from "react";
import Avatar from "../../img/CardThings/LeftContent/Rectangle 7.png";

const MessageBlock = () => {
  return (
    <div className="chat_message_block_wrapper">
      <img src={Avatar} className="chat_message_block_avatar" />
      <div className="chat_message_block_content_part">
        <div className="chat_message_block_first_row">
          <p className="chat_message_block_name_p">Пупкин Василий</p>
          <p className="chat_message_block_time_p">12:10</p>
        </div>
        <div className="chat_message_block_second_row">
          <p className="chat_message_block_text_p">
            Здравствуйте. Хочу уточнить кое-какие детали по поводу вашего
            обявления об аренде самоката
          </p>
        </div>
      </div>
    </div>
  );
};

export default MessageBlock;
