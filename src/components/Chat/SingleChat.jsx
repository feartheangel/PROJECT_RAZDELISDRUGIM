import React from "react";
import Avatar from "../../img/CardThings/LeftContent/Rectangle 7.png";
import Dot from "../../img/Chat/dot.png";
import Actions from "../../img/Chat/actions.png";
import { rootAddress } from "../../http/axios-requests";

const SingleChat = ({ item }) => {
  return (
    <div className="single_chat_wrapper">
      <img className="single_chat_item_image" src={`${item.get_item_photo}`} />
      <div className="single_chat_right_side">
        <div className="single_chat_left_block_first_row">
          <p clsssName="single_chat_receiver_name">{item.name}</p>
          <p className="single_chat_message_date">13 августа, 20:30</p>
        </div>
        <div className="single_chat_left_block_second_row">
          <div className="single_chat_message_text_wrapper">
            <img className="single_chat_sender_image" src={Avatar} />
            <p className="single_chat_message_text">
              Здравствуйте. Подтвердите бронирование по Вашему объявле...
            </p>
          </div>
          <img className="single_chat_unread_image" src={Dot} />
          <img className="single_chat_actions_image" src={Actions} />
        </div>
      </div>
    </div>
  );
};

export default SingleChat;
