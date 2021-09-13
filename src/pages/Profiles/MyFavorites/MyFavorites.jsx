import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "../../../css/main-page.css";
import { Link } from "react-router-dom";
import { Header, Footer, ItemCard } from "../../../components/index";
import Requests from "../../../http/axios-requests";
import { setFavorites } from "../../../redux/actions/userData";

const MyFavorites = () => {
  const dispatch = useDispatch();
  const { favorites, subjects } = useSelector(({ userData }) => userData);

  React.useEffect(() => {
    Requests.fetchFavorites().then((res) => {
      dispatch(setFavorites(res.data));
    });
  }, []);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Избранное: #разделисдругим";
  }, []);

  React.useEffect(() => {
    if (!localStorage.getItem("key")) {
      window.location.href = "/";
    }
  }, []);

  return (
    <div>
      <Header />
      <div className="privateProfile" id="globaldata_pk">
        <div className="privateProfile_container">
          <div className="conteiner_shapka">
            <Link
              style={{ textDecoration: "none" }}
              className="conteiner_shapka_myProfile"
              to="/i-rent-out"
            >
              <p className="favorites">
                Я сдаю <span> {subjects.length} </span>
              </p>
            </Link>
            <p style={{ opacity: "0.4", pointerEvents: "none" }}>
              Я беру <span> - </span>
            </p>
            <p style={{ opacity: "0.4", pointerEvents: "none" }}>
              Мои сообщения <span> - </span>
            </p>
            <p className="conteiner_shapka_myProfile">Избранное</p>
            <Link style={{ textDecoration: "none" }} to="/private-profile">
              <p> Мой профиль</p>
            </Link>
          </div>
          <div className="container_profile">
            <div
              className="container_profile_content__myItems"
              id="globaldata_pk"
            >
              {favorites &&
                favorites.map((subject, index) => (
                  <ItemCard item={subject.item} key={index} />
                ))}
              {favorites && favorites.length === 0 && (
                <div className="favorites_empty">
                  <p>Ваш список "Избранного" пуст.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* МОБИЛКА */}
      <div className="privateProfile" id="globaldata_mobile">
        <div className="privateProfile_container">
          <div className="div_favorites_text"> Избранное </div>
          <div className="conteiner_shapka" style={{ display: "none" }}>
            <Link
              style={
                subjects.length === 0
                  ? { pointerEvents: "none", textDecoration: "none" }
                  : { textDecoration: "none" }
              }
              className="conteiner_shapka_myProfile"
              to="/i-rent-out"
            >
              <p className="favorites">
                Я сдаю <span> {subjects.length} </span>
              </p>
            </Link>
            <p style={{ opacity: "0.4", pointerEvents: "none" }}>
              Я беру <span> - </span>
            </p>
            <p style={{ opacity: "0.4", pointerEvents: "none" }}>
              Мои сообщения <span> - </span>
            </p>
            <p className="conteiner_shapka_myProfile">Избранное</p>
            <Link style={{ textDecoration: "none" }} to="/private-profile">
              <p> Мой профиль</p>
            </Link>
          </div>
          <div className="container_profile">
            <div
              className="container_profile_content__myItems"
              id="globaldata_mobile"
            >
              <div className="onlydiv_forcards">
                {favorites &&
                  favorites.map((subject, index) => (
                    <div style={{ width: "50%" }}>
                      <ItemCard item={subject.item} key={index} />
                    </div>
                  ))}
              </div>
              {favorites && favorites.length === 0 && (
                <div className="favorites_empty">
                  <p>Ваш список "Избранного" пуст.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ПЛАНШЕТ ВЕРСИИ */}
      <div className="privateProfile" id="globaldata_ipad">
        <div className="privateProfile_container">
          <div className="conteiner_shapka">
            <Link
              style={{ textDecoration: "none" }}
              className="conteiner_shapka_myProfile"
              to="/i-rent-out"
            >
              <p className="favorites">
                Я сдаю <span> {subjects.length} </span>
              </p>
            </Link>
            <p style={{ opacity: "0.4", pointerEvents: "none" }}>
              Я беру <span> - </span>
            </p>
            <p style={{ opacity: "0.4", pointerEvents: "none" }}>
              Мои сообщения <span> - </span>
            </p>
            <p className="conteiner_shapka_myProfile">Избранное</p>
            <Link style={{ textDecoration: "none" }} to="/private-profile">
              <p> Мой профиль</p>
            </Link>
          </div>
          <div className="container_profile">
            <div
              className="container_profile_content__myItems"
              id="globaldata_ipad"
            >
              {favorites &&
                favorites.map((subject, index) => (
                  <ItemCard item={subject.item} key={index} />
                ))}
              {favorites && favorites.length === 0 && (
                <div className="favorites_empty">
                  <p>Ваш список "Избранного" пуст.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MyFavorites;
