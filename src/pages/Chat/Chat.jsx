import React from "react";
import { useSelector } from "react-redux";
import "./Chat.css";
import { Link } from "react-router-dom";
import { Header } from "../../components/index";
import VectorLeft from "../../img/Chat/vector-back.png";
import Vector_button from "../../img/Chat/knopka.PNG";
import { MessageBlock } from "../../components/index";
import { rootAddress } from "../../http/axios-requests";

const Chat = () => {
  const chatSocket = React.useRef();
  const [socketReconnect, setSocketReconnect] = React.useState(false);

  const chatId = window.location.href.split("?id=")[1];

  React.useEffect(() => {
    chatSocket.current = new WebSocket(
      `wss://razdelisdrugim.by:444/ws/chat/${chatId}/?token=${localStorage.getItem(
        "key"
      )}`
    );

    chatSocket.current.onopen = function () {
      chatSocket.current.send(
        JSON.stringify({
          command: "fetch_messages",
          chat_id: chatId,
        })
      );
      console.log("opened");
    };

    chatSocket.current.onmessage = function (e) {
      const data = JSON.parse(e.data);
      if (data.hasOwnProperty("messages")) {
        setMessages(data.messages);
        setCompanionName(data.name);
        setCompanionphoto(data.item_image);
        setCompanionId(data.user_id);
        setCompanionLastSeen(data.last_user_visit);
        setItemId(data.item_id);
        setItemName(data.name_item);
        setMessageIsRead(data.is_last_message);
        chatSocket.current.send(
          JSON.stringify({
            command: "update_chat_status",
            message_ids: data.list_ids_unread_messages,
            chat_id: chatId,
          })
        );
      }

      if (data.command === "new_message") {
        setMessages((prev) => [...prev, data.message]);
        setWrittenNewMessage(true);
        if (
          data.message.author_id !== userData.id &&
          window.location.href.includes(`chat?id=${chatId}`)
        ) {
          chatSocket.current.send(
            JSON.stringify({
              command: "update_chat_status",
              message_ids: [data.message.message_id],
              chat_id: chatId,
            })
          );
        }
      }

      console.log(data);
    };

    chatSocket.current.onclose = function (e) {
      setTimeout(function () {
        setSocketReconnect(!socketReconnect);
      }, 1000);
    };

    chatSocket.current.onerror = function (e) {
      setTimeout(function () {
        setSocketReconnect(!socketReconnect);
      }, 1000);
    };
  }, [socketReconnect]);

  React.useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, []);

  React.useEffect(() => {
    if (!localStorage.getItem("key")) {
      window.location.href = "/";
    }
  }, []);

  const keyDownHandler = (event) => {
    if (/^\s+$/.test(chatPhrase) || !chatPhrase) {
      return;
    }

    if (event.keyCode === 13) {
      chatSocket.current.send(
        JSON.stringify({
          message: chatPhrase,
          command: "new_message",
          chat_id: chatId,
          author_id: userData.id,
        })
      );
      setChatPhrase("");
      setCooldownTimer(5);
    }
  };

  const keyDownHandlerButton = () => {
    if (!chatPhrase) {
      return;
    }
    chatSocket.current.send(
      JSON.stringify({
        message: chatPhrase,
        command: "new_message",
        chat_id: chatId,
        author_id: userData.id,
      })
    );
    setChatPhrase("");
    setCooldownTimer(5);
  };

  const chatInputRef = React.useRef(null);

  const { subjects, userData } = useSelector(({ userData }) => userData);
  const [selectedChats, setSelectedChats] = React.useState();
  const [chatPhrase, setChatPhrase] = React.useState();
  const [messages, setMessages] = React.useState([]);
  const [companionName, setCompanionName] = React.useState();
  const [companionPhoto, setCompanionphoto] = React.useState();
  const [companionId, setCompanionId] = React.useState();
  const [companionLastSeen, setCompanionLastSeen] = React.useState();
  const [itemId, setItemId] = React.useState();
  const [itemName, setItemName] = React.useState();
  const [messageIsRead, setMessageIsRead] = React.useState();
  const [writtenNewMessage, setWrittenNewMessage] = React.useState();
  const [cooldownTimer, setCooldownTimer] = React.useState(0);

  const chatBlock = React.useRef();
  const chatBlockMobile = React.useRef();
  const chatBlockTablet = React.useRef();

  React.useEffect(() => {
    if (cooldownTimer > 0) {
      setTimeout(() => {
        setCooldownTimer(cooldownTimer - 1);
      }, 1000);
    }
  }, [cooldownTimer]);

  React.useEffect(() => {
    chatBlock.current.scrollTo({
      top: chatBlock.current.scrollHeight,
      behavior: "smooth",
    });

    chatBlockMobile.current.scrollTo({
      top: chatBlockMobile.current.scrollHeight,
      behavior: "smooth",
    });

    chatBlockTablet.current.scrollTo({
      top: chatBlockTablet.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, messageIsRead]);

  return (
    <div>
      <Header />
      <div
        onKeyDown={(e) => keyDownHandler(e)}
        className="privateProfile"
        id="globaldata_pk"
      >
        <div className="privateProfile_container">
          <div className="conteiner_shapka">
            <Link to="/i-rent-out" style={{ textDecoration: "none" }}>
              <p>
                Мои обьявления <span> {subjects.length} </span>
              </p>
            </Link>
            <Link
              style={{
                textDecoration: "none",
              }}
              className="conteiner_shapka_myProfile"
              to="/booking"
            >
              <p>Бронирования</p>
            </Link>
            <Link to="/messages" style={{ textDecoration: "none" }}>
              <p className="conteiner_shapka_myProfile">Мои сообщения</p>
            </Link>
            <Link
              style={{
                textDecoration: "none",
              }}
              className="conteiner_shapka_myProfile"
              to="/favorites"
            >
              <p>Избранное</p>
            </Link>
            <Link style={{ textDecoration: "none" }} to="/private-profile">
              <p> Мой профиль</p>
            </Link>
          </div>
          <div className="container_profile" style={{ marginRight: "0" }}>
            <div className="messanger_wrapper">
              <div className="messanger_optional_wrapper">
                <Link to="/messages" style={{ textDecoration: "none" }}>
                  <p
                    className={
                      selectedChats === "all"
                        ? "messanger_left_optional_p active"
                        : "messanger_left_optional_p"
                    }
                  >
                    Все чаты
                  </p>
                </Link>
              </div>
              <div
                ref={chatInputRef}
                className="container_profile_content__chat"
              >
                <div className="chat_header_wrapper">
                  <div className="chat_hearder_left_side">
                    <div className="chat_header_left_side_vertical">
                      <Link to="/messages" style={{ textDecoration: "none" }}>
                        <img
                          alt="picture1"
                          className="chat_header_stroke_image"
                          src={VectorLeft}
                        />
                      </Link>
                      <Link
                        to={`/item-card?id=${itemId}`}
                        style={{ textDecoration: "none" }}
                      >
                        <img
                          alt="picture1"
                          className="chat_header_avatar_image"
                          src={`${rootAddress}${companionPhoto}`}
                        />
                      </Link>
                    </div>

                    <div className="chat_header_left_side_horizontal">
                      <p className="chat_header_name_p">
                        <Link
                          to={`/public-profile?id=${companionId}`}
                          style={{ textDecoration: "none", color: "#4cc9f0" }}
                        >
                          {`${companionName} `}
                        </Link>
                        <Link
                          to={`/item-card?id=${itemId}`}
                          style={{ textDecoration: "none", color: "#4cc9f0" }}
                        >{`(${itemName})`}</Link>
                      </p>

                      <p className="chat_header_last_seen_p">
                        {companionLastSeen === "None"
                          ? "Был в сети недавно"
                          : `Был в сети недвано`}
                      </p>
                    </div>
                  </div>
                  <div className="chat_header_right_side"></div>
                </div>
                <div className="chat_messages_part_wrapper">
                  <div ref={chatBlock} className="chat_messages_left_block">
                    {messages &&
                      messages.map((item, index) => (
                        <MessageBlock
                          messages={messages}
                          item={item}
                          key={index}
                          chatSocket={chatSocket}
                          chatId={chatId}
                          messageIsRead={messageIsRead}
                          index={index}
                          writtenNewMessage={writtenNewMessage}
                        />
                      ))}
                  </div>
                </div>
                <div className="chat_lower_table_wrapper">
                  <input
                    value={chatPhrase}
                    onChange={(e) => setChatPhrase(e.target.value)}
                    className="chat_lower_table_input"
                    type="text"
                    placeholder={
                      cooldownTimer === 0
                        ? "Ваше сообщение..."
                        : `Подождите: 00:0${cooldownTimer}`
                    }
                    disabled={cooldownTimer !== 0}
                  />
                  <img
                    alt="picture1"
                    src={Vector_button}
                    className="button_chat"
                    onClick={keyDownHandlerButton}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* МОБИЛЬНАЯ ВЕРСИЯ */}
      <div className="privateProfile" id="globaldata_mobile">
        <div className="privateProfile_container">
          <div className="conteiner_shapka">
            <p
              className="conteiner_shapka_myProfile"
              style={{ display: "none" }}
            >
              Мои обьявления <span> {subjects.length} </span>
            </p>
            <p
              style={{ opacity: "0.4", pointerEvents: "none", display: "none" }}
            >
              Бронирования
            </p>
            <p
              style={{ opacity: "0.4", pointerEvents: "none", display: "none" }}
            >
              Мои сообщения
            </p>
            <Link
              // style={
              //   subjects.length === 0
              //     ? { pointerEvents: "none", textDecoration: "none" }
              //     : { textDecoration: "none" }
              // }
              style={{ display: "none" }}
              className="conteiner_shapka_myProfile"
              to="/favorites"
            >
              <p>Избранное</p>
            </Link>
            <Link
              style={{ textDecoration: "none", display: "none" }}
              to="/private-profile"
            >
              <p> Мой профиль</p>
            </Link>
          </div>
          <div className="container_profile" style={{ marginRight: "0" }}>
            <div className="messanger_wrapper">
              <div
                ref={chatInputRef}
                className="container_profile_content__chat"
              >
                <div className="chat_header_wrapper">
                  <div className="chat_hearder_left_side">
                    <div className="chat_header_left_side_vertical">
                      <Link to="/messages" style={{ textDecoration: "none" }}>
                        <img
                          alt="picture1"
                          className="chat_header_stroke_image"
                          src={VectorLeft}
                        />
                      </Link>
                      <Link
                        to={`/public-profile?id=${companionId}`}
                        style={{ textDecoration: "none" }}
                      >
                        <img
                          alt="picture1"
                          className="chat_header_avatar_image"
                          src={`${rootAddress}${companionPhoto}`}
                        />
                      </Link>
                    </div>

                    <div className="chat_header_left_side_horizontal">
                      <Link
                        to={`/public-profile?id=${companionId}`}
                        style={{ textDecoration: "none" }}
                      >
                        <p className="chat_header_name_p">{companionName}</p>
                      </Link>
                      <p className="chat_header_last_seen_p">
                        {companionLastSeen === "None"
                          ? "Был в сети недавно"
                          : `Был в сети недвано`}
                      </p>
                    </div>
                  </div>
                  <div className="chat_header_right_side"></div>
                </div>
                <div className="chat_messages_part_wrapper">
                  <div
                    ref={chatBlockMobile}
                    className="chat_messages_left_block"
                  >
                    {messages &&
                      messages.map((item, index) => (
                        <MessageBlock
                          item={item}
                          key={index}
                          chatSocket={chatSocket}
                          chatId={chatId}
                          writtenNewMessage={writtenNewMessage}
                        />
                      ))}
                  </div>
                </div>
                <div className="chat_lower_table_wrapper">
                  <input
                    value={chatPhrase}
                    onChange={(e) => setChatPhrase(e.target.value)}
                    className="chat_lower_table_input"
                    type="text"
                    disabled={cooldownTimer !== 0}
                    placeholder={
                      cooldownTimer === 0
                        ? "Ваше сообщение..."
                        : `Подождите: 00:0${cooldownTimer}`
                    }
                  />
                  <img
                    alt="picture1"
                    src={Vector_button}
                    className="button_chat"
                    onClick={keyDownHandlerButton}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ПЛАНШЕТ ВЕРСИЯ */}
      <div className="privateProfile" id="globaldata_ipad">
        <div className="privateProfile_container">
          <div className="conteiner_shapka">
            <Link
              to="/i-rent-out"
              style={{ textDecoration: "none" }}
              className="conteiner_shapka_myProfile"
            >
              <p>
                Я сдаю <span> {subjects.length} </span>
              </p>
            </Link>
            <Link
              style={{
                textDecoration: "none",
              }}
              className="conteiner_shapka_myProfile"
              to="/i-take"
            >
              <p>
                Я беру <span> 3 </span>
              </p>
            </Link>
            <Link to="/messages" style={{ textDecoration: "none" }}>
              <p className="conteiner_shapka_myProfile">Мои сообщения</p>
            </Link>

            <Link
              style={
                subjects.length === 0
                  ? { pointerEvents: "none", textDecoration: "none" }
                  : { textDecoration: "none" }
              }
              className="conteiner_shapka_myProfile"
              to="/favorites"
            >
              <p>Избранное</p>
            </Link>
            <Link style={{ textDecoration: "none" }} to="/private-profile">
              <p> Мой профиль</p>
            </Link>
          </div>
          <div className="container_profile" style={{ marginRight: "0" }}>
            <div className="messanger_wrapper">
              <div className="messanger_optional_wrapper">
                <p
                  onClick={() => setSelectedChats("all")}
                  className={
                    selectedChats === "all"
                      ? "messanger_left_optional_p active"
                      : "messanger_left_optional_p"
                  }
                >
                  Все чаты
                </p>
                <p
                  onClick={() => setSelectedChats("rent")}
                  className={
                    selectedChats === "rent"
                      ? "messanger_left_optional_p active"
                      : "messanger_left_optional_p"
                  }
                >
                  Бронирования
                </p>
              </div>
              <div
                ref={chatInputRef}
                className="container_profile_content__chat"
              >
                <div className="chat_header_wrapper">
                  <div className="chat_hearder_left_side">
                    <div className="chat_header_left_side_vertical">
                      <Link to="/messages" style={{ textDecoration: "none" }}>
                        <img
                          alt="picture1"
                          className="chat_header_stroke_image"
                          src={VectorLeft}
                        />
                      </Link>
                      <Link
                        to={`/public-profile?id=${companionId}`}
                        style={{ textDecoration: "none" }}
                      >
                        <img
                          alt="picture1"
                          className="chat_header_avatar_image"
                          src={`${rootAddress}${companionPhoto}`}
                        />
                      </Link>
                    </div>

                    <div className="chat_header_left_side_horizontal">
                      <Link
                        to={`/public-profile?id=${companionId}`}
                        style={{ textDecoration: "none" }}
                      >
                        <p className="chat_header_name_p">{companionName}</p>
                      </Link>
                      <p className="chat_header_last_seen_p">
                        {companionLastSeen === "None"
                          ? "Был в сети недавно"
                          : `Был в сети недвано`}
                      </p>
                    </div>
                  </div>
                  <div className="chat_header_right_side"></div>
                </div>
                <div className="chat_messages_part_wrapper">
                  <div
                    ref={chatBlockTablet}
                    className="chat_messages_left_block"
                  >
                    {messages &&
                      messages.map((item, index) => (
                        <MessageBlock
                          item={item}
                          key={index}
                          chatSocket={chatSocket}
                          chatId={chatId}
                          writtenNewMessage={writtenNewMessage}
                        />
                      ))}
                  </div>
                </div>
                <div className="chat_lower_table_wrapper">
                  <input
                    value={chatPhrase}
                    onChange={(e) => setChatPhrase(e.target.value)}
                    className="chat_lower_table_input"
                    type="text"
                    placeholder={
                      cooldownTimer === 0
                        ? "Ваше сообщение..."
                        : `Подождите: 00:0${cooldownTimer}`
                    }
                    disabled={cooldownTimer !== 0}
                  />
                  <img
                    alt="picture1"
                    src={Vector_button}
                    className="button_chat"
                    onClick={keyDownHandlerButton}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
