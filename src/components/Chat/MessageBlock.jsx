import React from "react";
import { useSelector } from "react-redux";
import { rootAddress } from "../../http/axios-requests";

const MessageBlock = ({
  item,
  chatSocket,
  chatId,
  messageIsRead,
  writtenNewMessage,
}) => {
  const { userData } = useSelector(({ userData }) => userData);

  const handleReservationSubmit = () => {
    chatSocket.current.send(
      JSON.stringify({
        command: "update_reserve_status",
        reserve_id: item.reserve_id,
        bool_status: true,
      })
    );
    console.log(item.reserve_id);

    chatSocket.current.send(
      JSON.stringify({
        command: "fetch_messages",
        chat_id: chatId,
      })
    );
  };

  const handleReservationAbort = () => {
    chatSocket.current.send(
      JSON.stringify({
        command: "update_reserve_status",
        reserve_id: item.reserve_id,
        bool_status: false,
      })
    );

    chatSocket.current.send(
      JSON.stringify({
        command: "fetch_messages",
        chat_id: chatId,
      })
    );
  };

  return (
    <div
      className={
        item.author_id === userData.id
          ? "chat_message_block_wrapper own"
          : "chat_message_block_wrapper"
      }
    >
      <img
        alt="picture1"
        src={`https://razdelisdrugim.by:444/${item.avatar}`}
        className="chat_message_block_avatar"
      />
      {!item.rent && (
        <div style={{ display: "flex", flexDirection: "column" }}>
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
                        : item.timestamp.split("").splice(5, 2).join("") ===
                          "02"
                        ? "Февраля"
                        : item.timestamp.split("").splice(5, 2).join("") ===
                          "03"
                        ? "Марта"
                        : item.timestamp.split("").splice(5, 2).join("") ===
                          "04"
                        ? "Апреля"
                        : item.timestamp.split("").splice(5, 2).join("") ===
                          "05"
                        ? "Мая"
                        : item.timestamp.split("").splice(5, 2).join("") ===
                          "06"
                        ? "Июня"
                        : item.timestamp.split("").splice(5, 2).join("") ===
                          "07"
                        ? "Июля"
                        : item.timestamp.split("").splice(5, 2).join("") ===
                          "08"
                        ? "Авугста"
                        : item.timestamp.split("").splice(5, 2).join("") ===
                          "09"
                        ? "Сентября"
                        : item.timestamp.split("").splice(5, 2).join("") ===
                          "10"
                        ? "Октября"
                        : item.timestamp.split("").splice(5, 2).join("") ===
                          "11"
                        ? "Ноября"
                        : item.timestamp.split("").splice(5, 2).join("") ===
                          "12"
                        ? "Декабря"
                        : ""
                    }, ${item.timestamp.split("").splice(11, 5).join("")}`
                  : "Нет сообщений"}
              </p>
            </div>
            <div className="chat_message_block_second_row">
              <p className="chat_message_block_text_p">
                {item && item.content}
              </p>
            </div>
          </div>
          {messageIsRead &&
            messageIsRead[0] &&
            messageIsRead[1] === item.id &&
            !writtenNewMessage && (
              <p className="message_block_read_p">Прочитано</p>
            )}
        </div>
      )}
      {item.rent && (
        <div className="chat_message_block_content_part__reservation">
          <p className="reservation_request_title">Запрос на бронирование</p>
          <img
            alt="picture1"
            className="reservation_request_image"
            src={`${rootAddress}${item.image_1}`}
          />
          <p className="reservation_request_item_name">{item.name_item}</p>
          <p className="reservation_request_delivery">
            {item.type_delivery === "1"
              ? "Самовывоз"
              : item.type_delivery === "2"
              ? "Привезет и заберет владелец"
              : item.type_delivery === "3"
              ? "Отправка"
              : ""}
          </p>
          {item.reserve_address_delivery && (
            <p className="reservation_request_delivery">
              {item.reserve_address_delivery}
            </p>
          )}
          <p className="reservation_request_delivery">
            {item.reserve_user_phone}
          </p>
          <div className="reservation_request_dates_wrapper">
            <p className="reservation_request_date_start">
              Аренда с:{" "}
              {`${item.time_start_reserve
                .split("")
                .splice(0, 10)
                .join("")} ${item.time_start_reserve
                .split("")
                .splice(11, 5)
                .join("")}`}
            </p>
          </div>
          <p className="reservation_request_time_rent">
            Срок аренды: {item.reservation_time}
          </p>
          {item.reserve_text_sender && (
            <p className="reservation_request_delivery">
              {`Сообщение от рентера: ${item.reserve_text_sender}`}
            </p>
          )}
          {item.reservation_status === null && item.owner_id === userData.id && (
            <div className="reservation_request_submit_choice">
              <input
                onClick={handleReservationAbort}
                type="button"
                value="Отклонить"
                className="reservation_request_choice_no"
              />
              <input
                onClick={handleReservationSubmit}
                type="button"
                value="Подтвердить"
                className="reservation_request_choice_yes"
              />
            </div>
          )}

          {item.reservation_status === null &&
            item.owner_id !== userData.id && (
              <p style={{ color: "orange" }}>Ожидает </p>
            )}

          {item.reservation_status === true && (
            <p style={{ color: "green" }}> Подтверждено</p>
          )}

          {item.reservation_status === false && (
            <p style={{ color: "red" }}>Отказано</p>
          )}
        </div>
      )}
    </div>
  );
};

export default MessageBlock;
