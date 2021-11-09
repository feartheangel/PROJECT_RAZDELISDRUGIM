import React from "react";
import "./PrivateProfile.css";
import { Header, Footer } from "../../components/index";
import MyData from "./MyGlobalData/MyGlobalData";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  NumberSubmittionModule,
  EmailSubmittionModule,
  AddressDeleteSubmit,
} from "../../components/index";

const PrivateProfile = () => {
  const { subjects, iTakeSubjects } = useSelector(({ userData }) => userData);

  // ХРАНЕНИЕ ДАННЫХ ИЗ ПОЛЕЙ

  const [activeForm, setActiveForm] = React.useState("myProfile");
  const [modalActiveEmail, setModalActiveEmail] = React.useState(false);
  const [modalActiveNumber, setModalActiveNumber] = React.useState(false);

  const [modalActiveSubmit, setModalActiveSubmit] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState();

  React.useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Мой профиль: #разделисдругим";
  }, []);

  React.useEffect(() => {
    if (!localStorage.getItem("key")) {
      window.location.href = "/";
    }
  }, []);

  return (
    <div>
      <Header />
      <div className="privateProfile">
        <div className="privateProfile_container">
          <div className="conteiner_shapka" id="globaldata_pk">
            <Link style={{ textDecoration: "none" }} to="/i-rent-out">
              <p>
                Мои обьявления <span> {subjects.length} </span>
              </p>
            </Link>
            <Link style={{ textDecoration: "none" }} to="/booking">
              <p>Бронирования</p>
            </Link>
            <Link
              style={{ textDecoration: "none" }}
              className="conteiner_shapka_myProfile"
              to="/messages"
            >
              <p>Мои сообщения</p>
            </Link>
            <Link
              style={{ textDecoration: "none" }}
              className="conteiner_shapka_myProfile"
              to="/favorites"
            >
              <p
                className={
                  activeForm === "favorites" &&
                  "privateProfile_container_favorites"
                }
              >
                Избранное
              </p>
            </Link>
            <p
              className={
                activeForm === "myProfile" && "conteiner_shapka_myProfile"
              }
              onClick={() => setActiveForm("myProfile")}
            >
              {" "}
              Мой профиль
            </p>
          </div>

          {/* MOBILE */}
          <div
            className="conteiner_shapka"
            id="globaldata_mobile"
            style={{ display: "none" }}
          >
            <Link
              style={
                subjects.length === 0
                  ? { pointerEvents: "none", textDecoration: "none" }
                  : { textDecoration: "none" }
              }
              className="conteiner_shapka_myProfile"
              to="/i-rent-out"
            >
              <p style={{ display: "none" }}>
                Мои объявления <span> {subjects.length} </span>
              </p>
            </Link>
            <Link style={{ textDecoration: "none" }} to="/booking">
              <p>Бронирования</p>
            </Link>
            <Link
              style={{ textDecoration: "none" }}
              className="conteiner_shapka_myProfile"
              to="/messages"
            >
              <p>Мои сообщения</p>
            </Link>
            <Link
              style={{ display: "none" }}
              className="conteiner_shapka_myProfile"
              to="/favorites"
            >
              <p
                className={
                  activeForm === "favorites" &&
                  "privateProfile_container_favorites"
                }
              >
                Избранное
              </p>
            </Link>
            <p
              style={{ display: "none" }}
              className={
                activeForm === "myProfile" && "conteiner_shapka_myProfile"
              }
              onClick={() => setActiveForm("myProfile")}
            >
              {" "}
              Мой профиль
            </p>
          </div>

          {/* ДЛЯ ПЛАНШЕТОВ */}

          <div className="conteiner_shapka" id="globaldata_ipad">
            <Link style={{ textDecoration: "none" }} to="/i-rent-out">
              <p>
                Мои обьявления <span> {subjects.length} </span>
              </p>
            </Link>
            <Link style={{ textDecoration: "none" }} to="/booking">
              <p>Бронирования</p>
            </Link>
            <Link
              style={{ textDecoration: "none" }}
              className="conteiner_shapka_myProfile"
              to="/messages"
            >
              <p>Мои сообщения</p>
            </Link>
            <Link
              style={{ textDecoration: "none" }}
              className="conteiner_shapka_myProfile"
              to="/favorites"
            >
              <p
                className={
                  activeForm === "favorites" &&
                  "privateProfile_container_favorites"
                }
              >
                Избранное
              </p>
            </Link>
            <p
              className={
                activeForm === "myProfile" && "conteiner_shapka_myProfile"
              }
              onClick={() => setActiveForm("myProfile")}
            >
              {" "}
              Мой профиль
            </p>
          </div>

          {activeForm === "myProfile" && (
            <MyData
              setModalActiveSubmit={setModalActiveSubmit}
              setDeleteId={setDeleteId}
              setModalActiveEmail={setModalActiveEmail}
              setModalActiveNumber={setModalActiveNumber}
            />
          )}
        </div>
      </div>
      <NumberSubmittionModule
        modalActiveNumber={modalActiveNumber}
        setModalActiveNumber={setModalActiveNumber}
      />
      <EmailSubmittionModule
        modalActiveEmail={modalActiveEmail}
        setModalActiveEmail={setModalActiveEmail}
      />
      <Footer />
      <AddressDeleteSubmit
        deleteId={deleteId}
        setModalActiveSubmit={setModalActiveSubmit}
        modalActiveSubmit={modalActiveSubmit}
      />
    </div>
  );
};

export default PrivateProfile;
