import React from "react";
import { ItemCardProfile, ItemDeleteSubmit } from "../../../components/index";
import { useSelector } from "react-redux";
import "../MyItems/MyItems.css";
import { Link } from "react-router-dom";
import { Header, Footer } from "../../../components/index";

const ITake = () => {
  const { subjects } = useSelector(({ userData }) => userData);

  const [modalActiveSubmit, setModalActiveSubmit] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState();

  React.useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Я беру: #разделисдругим";
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
              <p>
                Я сдаю <span> {subjects.length} </span>
              </p>
            </Link>
            <p className="conteiner_shapka_myProfile">
              Я беру <span> 3 </span>
            </p>
            <Link style={{ textDecoration: "none" }} to="/messages">
              <p>Мои сообщения</p>
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
            <div className="container_profile_content__myItems">
              <div>
                <table class="table table-hover">
                  <thead class="thead-dark">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Название вещи</th>
                      <th scope="col">
                        Аренда <br />
                        ОТ
                      </th>
                      <th scope="col">
                        Аренда
                        <br /> ДО
                      </th>
                      <th scope="col">Тип аренды</th>
                      <th scope="col">Время аренды</th>
                      <th scope="col" style={{ verticalAlign: "top" }}>
                        Статус
                      </th>
                      <th scope="col" style={{ verticalAlign: "top" }}>
                        Владелец
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ cursor: "pointer" }}>
                      <th scope="row">1</th>
                      <td>Ноутбук</td>
                      <td>04/10/2021</td>
                      <td>06/10/2021</td>
                      <td>Сутки</td>
                      <td>3 Суток</td>
                      <td style={{ color: "green" }}>Подтверждено</td>
                      <td>Эдуард</td>
                    </tr>
                    <tr style={{ cursor: "pointer" }}>
                      <th scope="row">2</th>
                      <td>Велосипед "Аист"</td>
                      <td>04/10/2021</td>
                      <td>05/10/2021</td>
                      <td>Сутки</td>
                      <td>1 Сутки</td>
                      <td style={{ color: "orange" }}>Завершено</td>
                      <td>Максим</td>
                    </tr>
                    <tr style={{ cursor: "pointer" }}>
                      <th scope="row">3</th>
                      <td>Книга "Batman"</td>
                      <td>04/10/2021 14:30</td>
                      <td>04/10/2021 17:30</td>
                      <td>Часы</td>
                      <td> - </td>
                      <td style={{ color: "red" }}>Отклонено</td>
                      <td>Иван</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {subjects && subjects.length === 0 && (
                <div className="favorites_empty">
                  <p>Вы ничего не берёте.</p>
                </div>
              )}
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
          <div className="container_profile" style={{ marginRight: "0" }}>
            <div className="container_profile_content__myItems">
              <div>
                <table class="table table-hover">
                  <thead class="thead-dark">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Название вещи</th>
                      <th scope="col">
                        Аренда <br />
                        ОТ
                      </th>
                      <th scope="col">
                        Аренда
                        <br /> ДО
                      </th>
                      <th scope="col">Тип аренды</th>
                      <th scope="col">Время аренды</th>
                      <th scope="col" style={{ verticalAlign: "top" }}>
                        Статус
                      </th>
                      <th scope="col" style={{ verticalAlign: "top" }}>
                        Владелец
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ cursor: "pointer" }}>
                      <th scope="row">1</th>
                      <td>Ноутбук</td>
                      <td>04/10/2021</td>
                      <td>06/10/2021</td>
                      <td>Сутки</td>
                      <td>3 Суток</td>
                      <td style={{ color: "green" }}>Подтверждено</td>
                      <td>Эдуард</td>
                    </tr>
                    <tr style={{ cursor: "pointer" }}>
                      <th scope="row">2</th>
                      <td>Велосипед "Аист"</td>
                      <td>04/10/2021</td>
                      <td>05/10/2021</td>
                      <td>Сутки</td>
                      <td>1 Сутки</td>
                      <td style={{ color: "orange" }}>Завершено</td>
                      <td>Максим</td>
                    </tr>
                    <tr style={{ cursor: "pointer" }}>
                      <th scope="row">3</th>
                      <td>Книга "Batman"</td>
                      <td>04/10/2021 14:30</td>
                      <td>04/10/2021 17:30</td>
                      <td>Часы</td>
                      <td> - </td>
                      <td style={{ color: "red" }}>Отклонено</td>
                      <td>Иван</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {subjects && subjects.length === 0 && (
                <div className="favorites_empty">
                  <p>Вы ничего не берёте.</p>
                </div>
              )}
            </div>
          </div>
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
          <div className="container_profile" style={{ marginRight: "0" }}>
            <div className="container_profile_content__myItems">
              <div>
                <table class="table table-hover">
                  <thead class="thead-dark">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Название вещи</th>
                      <th scope="col">
                        Аренда <br />
                        ОТ
                      </th>
                      <th scope="col">
                        Аренда
                        <br /> ДО
                      </th>
                      <th scope="col">Тип аренды</th>
                      <th scope="col">Время аренды</th>
                      <th scope="col" style={{ verticalAlign: "top" }}>
                        Статус
                      </th>
                      <th scope="col" style={{ verticalAlign: "top" }}>
                        Владелец
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ cursor: "pointer" }}>
                      <th scope="row">1</th>
                      <td>Ноутбук</td>
                      <td>04/10/2021</td>
                      <td>06/10/2021</td>
                      <td>Сутки</td>
                      <td>3 Суток</td>
                      <td style={{ color: "green" }}>Подтверждено</td>
                      <td>Эдуард</td>
                    </tr>
                    <tr style={{ cursor: "pointer" }}>
                      <th scope="row">2</th>
                      <td>Велосипед "Аист"</td>
                      <td>04/10/2021</td>
                      <td>05/10/2021</td>
                      <td>Сутки</td>
                      <td>1 Сутки</td>
                      <td style={{ color: "orange" }}>Завершено</td>
                      <td>Максим</td>
                    </tr>
                    <tr style={{ cursor: "pointer" }}>
                      <th scope="row">3</th>
                      <td>Книга "Batman"</td>
                      <td>04/10/2021 14:30</td>
                      <td>04/10/2021 17:30</td>
                      <td>Часы</td>
                      <td> - </td>
                      <td style={{ color: "red" }}>Отклонено</td>
                      <td>Иван</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {subjects && subjects.length === 0 && (
                <div className="favorites_empty">
                  <p>Вы ничего не сдаете.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <ItemDeleteSubmit
        deleteId={deleteId}
        setModalActiveSubmit={setModalActiveSubmit}
        modalActiveSubmit={modalActiveSubmit}
      />
    </div>
  );
};

export default ITake;
