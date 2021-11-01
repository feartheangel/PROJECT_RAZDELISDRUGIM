import React from "react";
import { useSelector } from "react-redux";
import "./MyMessages.css";
import { Link } from "react-router-dom";
import { Header, Footer } from "../../../components/index";
import { SingleChat } from "../../../components/index";

const MyMessages = () => {
  const { subjects, iTakeSubjects } = useSelector(({ userData }) => userData);

  React.useEffect(() => {
    document.title = "Шерсенджер: #разделисдругим";
  }, []);

  React.useEffect(() => {
    if (!localStorage.getItem("key")) {
      window.location.href = "/";
    }
  }, []);

  const [selectedChats, setSelectedChats] = React.useState();
  const [usersChats, setUsersChats] = React.useState();
  const [socketReconnect, setSocketReconnect] = React.useState(false);

  const chatSocket = React.useRef();

  React.useEffect(() => {
    chatSocket.current = new WebSocket(
      `wss://razdelisdrugim.by/ws/?token=${localStorage.getItem("key")}`
    );

    chatSocket.current.onopen = function () {
      chatSocket.current.send(
        JSON.stringify({
          command: "history_chat",
        })
      );
      console.log("opened");
    };

    chatSocket.current.onmessage = function (e) {
      const data = JSON.parse(e.data);
      if (data.chat_info) {
        setUsersChats(data.chat_info);
      }

      console.log(data);
    };

    chatSocket.current.onerror = function (e) {
      setTimeout(function () {
        setSocketReconnect(!socketReconnect);
      }, 1000);
    };

    chatSocket.current.onclose = function (e) {
      setTimeout(function () {
        setSocketReconnect(!socketReconnect);
      }, 1000);
    };
  }, []);

  return (
    <div>
      <Header />
      <div className="privateProfile" id="globaldata_pk">
        <div className="privateProfile_container">
          <div className="conteiner_shapka">
            <Link to="/i-rent-out" style={{ textDecoration: "none" }}>
              <p>
                Мои объявления <span> {subjects.length} </span>
              </p>
            </Link>
            <Link style={{ textDecoration: "none" }} to="/booking">
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
                <p
                  className={
                    selectedChats === "all"
                      ? "messanger_left_optional_p active"
                      : "messanger_left_optional_p"
                  }
                >
                  Все чаты
                </p>
              </div>
              <div className="container_profile_content__messages">
                {usersChats &&
                  usersChats.map((item) => (
                    <SingleChat item={item} с chatSocket={chatSocket} />
                  ))}
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
              Я сдаю <span> {subjects.length} </span>
            </p>
            <p style={{ display: "none" }}>
              Я беру <span> {iTakeSubjects && iTakeSubjects.length} </span>
            </p>
            <p style={{ display: "none" }}>Мои сообщения</p>
            <Link
              style={{ display: "none" }}
              className="conteiner_shapka_myProfile"
              to="/favorites"
            >
              <p>Избранное</p>
            </Link>
            <Link style={{ display: "none" }} to="/private-profile">
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
              </div>
              <div className="container_profile_content__messages">
                {usersChats &&
                  usersChats.map((item) => (
                    <SingleChat item={item} chatSocket={chatSocket} />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ПЛАНШЕТ ВЕРСИЯ */}
      <div className="privateProfile" id="globaldata_ipad">
        <div className="privateProfile_container">
          <div className="conteiner_shapka">
            <Link to="/i-rent-out" style={{ textDecoration: "none" }}>
              <p>
                Мои объявления <span> {subjects.length} </span>
              </p>
            </Link>
            <Link style={{ textDecoration: "none" }} to="/booking">
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
              </div>
              <div className="container_profile_content__messages">
                {usersChats &&
                  usersChats.map((item) => (
                    <SingleChat item={item} chatSocket={chatSocket} />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MyMessages;
