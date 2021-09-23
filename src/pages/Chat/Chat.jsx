import React, { useRef } from "react";
import { useSelector } from "react-redux";
import "./Chat.css";
import { Link } from "react-router-dom";
import { Header, Footer } from "../../components/index";
import Requests from "../../http/axios-requests";
import Avatar from "../../img/CardThings/LeftContent/Rectangle 7.png";
import VectorLeft from "../../img/Chat/vector-back.png";
import Actions from "../../img/Chat/actions.png";
import { MessageBlock } from "../../components/index";
import { rootAddress } from "../../http/axios-requests";

const Chat = () => {
  const chatSocket = React.useRef();

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

    chatSocket.current.onerror = function (error) {
      alert(`[error] ${error.message}`);
    };

    chatSocket.current.onmessage = function (e) {
      const data = JSON.parse(e.data);
      if (data.hasOwnProperty("messages")) {
        setMessages(data.messages);
        setCompanionName(data.name);
        setCompanionphoto(data.photo);
        setCompanionId(data.user_id);
        setCompanionLastSeen(data.last_user_visit);
      }

      if (data.command === "new_message") {
        setMessages((prev) => [...prev, data.message]);
      }

      console.log(data);
    };

    chatSocket.current.onclose = function (event) {
      if (event.wasClean) {
        alert(
          `[close] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`
        );
      } else {
        // например, сервер убил процесс или сеть недоступна
        // обычно в этом случае event.code 1006
        alert(`[close] Соединение прервано, код=${event.code}`);
      }
    };
  }, []);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Шерсенджер: #разделисдругим";
  }, []);

  React.useEffect(() => {
    if (!localStorage.getItem("key")) {
      window.location.href = "/";
    }
  }, []);

  const keyDownHandler = (event) => {
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
    }
  };

  const { subjects, userData } = useSelector(({ userData }) => userData);
  const [selectedChats, setSelectedChats] = React.useState();
  const [chatPhrase, setChatPhrase] = React.useState();
  const [messages, setMessages] = React.useState([]);
  const [companionName, setCompanionName] = React.useState();
  const [companionPhoto, setCompanionphoto] = React.useState();
  const [companionId, setCompanionId] = React.useState();
  const [companionLastSeen, setCompanionLastSeen] = React.useState();

  const chatBlock = React.useRef();

  React.useEffect(() => {
    chatBlock.current.scrollTo({
      top: chatBlock.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

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
                Я сдаю <span> {subjects.length} </span>
              </p>
            </Link>
            <p style={{ opacity: "0.4", pointerEvents: "none" }}>
              Я беру <span> - </span>
            </p>
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
              <div className="container_profile_content__chat">
                <div className="chat_header_wrapper">
                  <div className="chat_hearder_left_side">
                    <div className="chat_header_left_side_vertical">
                      <Link to="/messages" style={{ textDecoration: "none" }}>
                        <img
                          className="chat_header_stroke_image"
                          src={VectorLeft}
                        />
                      </Link>
                      <Link
                        to={`/public-profile?id=${companionId}`}
                        style={{ textDecoration: "none" }}
                      >
                        <img
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
                  <div className="chat_header_right_side">
                    <img className="single_chat_actions_image" src={Actions} />
                  </div>
                </div>
                <div className="chat_messages_part_wrapper">
                  <div ref={chatBlock} className="chat_messages_left_block">
                    {messages &&
                      messages.map((item) => <MessageBlock item={item} />)}
                  </div>
                </div>
                <div className="chat_lower_table_wrapper">
                  <input
                    value={chatPhrase}
                    onChange={(e) => setChatPhrase(e.target.value)}
                    className="chat_lower_table_input"
                    type="text"
                    placeholder="Ваше сообщение..."
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
            <p className="conteiner_shapka_myProfile">
              Я сдаю <span> {subjects.length} </span>
            </p>
            <p
              style={{ opacity: "0.4", pointerEvents: "none" }}
              style={{ display: "none" }}
            >
              Я беру <span> - </span>
            </p>
            <p
              style={{ opacity: "0.4", pointerEvents: "none" }}
              style={{ display: "none" }}
            >
              Мои сообщения <span> - </span>
            </p>
            <Link
              style={
                subjects.length === 0
                  ? { pointerEvents: "none", textDecoration: "none" }
                  : { textDecoration: "none" }
              }
              style={{ display: "none" }}
              className="conteiner_shapka_myProfile"
              to="/favorites"
            >
              <p>Избранное</p>
            </Link>
            <Link
              style={{ textDecoration: "none" }}
              style={{ display: "none" }}
              to="/private-profile"
            >
              <p> Мой профиль</p>
            </Link>
          </div>
          <div className="container_profile" style={{ marginRight: "0" }}></div>
        </div>
      </div>

      {/* ПЛАНШЕТ ВЕРСИЯ */}
      <div className="privateProfile" id="globaldata_ipad">
        <div className="privateProfile_container">
          <div className="conteiner_shapka">
            <p className="conteiner_shapka_myProfile">
              Я сдаю <span> {subjects.length} </span>
            </p>
            <p
              style={{ opacity: "0.4", pointerEvents: "none" }}
              // style={{ display: "none" }}
            >
              Я беру <span> - </span>
            </p>
            <p
              style={{ opacity: "0.4", pointerEvents: "none" }}
              // style={{ display: "none" }}
            >
              Мои сообщения <span> - </span>
            </p>
            <Link
              style={
                subjects.length === 0
                  ? { pointerEvents: "none", textDecoration: "none" }
                  : { textDecoration: "none" }
              }
              // style={{ display: "none" }}
              className="conteiner_shapka_myProfile"
              to="/favorites"
            >
              <p>Избранное</p>
            </Link>
            <Link
              style={{ textDecoration: "none" }}
              // style={{ display: "none" }}
              to="/private-profile"
            >
              <p> Мой профиль</p>
            </Link>
          </div>
          <div className="container_profile" style={{ marginRight: "0" }}></div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Chat;
