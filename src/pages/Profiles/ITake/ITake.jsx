import React from "react";
import { ItemCardProfile, ItemDeleteSubmit } from "../../../components/index";
import { useSelector, useDispatch } from "react-redux";
import "../MyItems/MyItems.css";
import { Link } from "react-router-dom";
import { Header, Footer } from "../../../components/index";
import Requests from "../../../http/axios-requests";

const ITake = ({ itemData }) => {
  const { subjects } = useSelector(({ userData }) => userData);

  const [modalActiveSubmit, setModalActiveSubmit] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState();
  const [reservations, setReservations] = React.useState();

  React.useEffect(() => {
    Requests.getOutgoingReservations().then((res) => {
      setReservations(res.data);
    });
  }, []);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Я беру: #разделисдругим";
  }, []);

  React.useEffect(() => {
    if (!localStorage.getItem("key")) {
      window.location.href = "/";
    }
  }, []);

  // console.log(reservation_start_time);

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
              Я беру <span> {reservations && reservations.length} </span>
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
            <div
              style={{ flexDirection: "column" }}
              className="container_profile_content__myItems"
            >
              <div>
                <table class="table table-hover">
                  <thead class="thead-dark">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Наименование</th>
                      <th scope="col">Инфо</th>
                      <th scope="col">Начало</th>
                      <th scope="col">Окончание</th>
                      <th scope="col">Срок</th>
                      <th scope="col" style={{ verticalAlign: "top" }}>
                        Статус
                      </th>
                      <th scope="col" style={{ verticalAlign: "top" }}>
                        Владелец
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {reservations &&
                      reservations.map((item, index) => {
                        return (
                          <tr style={{ cursor: "pointer" }}>
                            <th>{index + 1}</th>
                            <td style={{ maxWidth: "150px" }}>
                              <p>{item.item_id.name_item}</p>
                            </td>
                            <td style={{ maxWidth: "150px" }}>
                              <p>
                                (
                                {`${
                                  item.item_id.free_rent
                                    ? "Бесплатно"
                                    : item.item_id.offer_price_rent
                                    ? "Договорная"
                                    : `${item.item_id.price_rent}BYN/${item.item_id.rent}`
                                }${
                                  item.item_id.pledge_price &&
                                  item.item_id.pledge_price > 0
                                    ? ","
                                    : ""
                                } ${
                                  item.item_id.pledge_price &&
                                  item.item_id.pledge_price > 0
                                    ? `залог: ${item.item_id.pledge_price} BYN`
                                    : ""
                                }${item.item_id.insurance_price ? "," : ""} ${
                                  item.item_id.insurance_price
                                    ? `страхование: ${item.item_id.insurance_price}BYN`
                                    : ""
                                }${
                                  item.item_id.self_delivery_price ? "," : ""
                                } ${
                                  item.item_id.self_delivery_price
                                    ? `доставка: ${item.item_id.self_delivery_price}BYN`
                                    : ""
                                }${item.item_id.servicefee_price ? "," : ""} ${
                                  item.item_id.servicefee_price
                                    ? `сервисный сбор: ${item.item_id.servicefee_price}BYN`
                                    : ""
                                }`}
                                )
                              </p>
                            </td>
                            <td>
                              {item.item_id.rent === "Час"
                                ? `${item.reservation_start_time
                                    .split("")
                                    .slice(8, 10)
                                    .join("")}${item.reservation_start_time
                                    .split("")
                                    .slice(4, 8)
                                    .join("")}${item.reservation_start_time
                                    .split("")
                                    .slice(0, 4)
                                    .join("")}                                
                               ${item.reservation_start_time
                                 .split("")
                                 .splice(11, 5)
                                 .join("")}`
                                : `${item.reservation_start_time
                                    .split("")
                                    .slice(8, 10)
                                    .join("")}${item.reservation_start_time
                                    .split("")
                                    .slice(4, 8)
                                    .join("")}${item.reservation_start_time
                                    .split("")
                                    .slice(0, 4)
                                    .join("")}`}
                            </td>
                            <td>
                              {" "}
                              {item.item_id.rent === "Час"
                                ? `${item.reservation_end_time
                                    .split("")
                                    .slice(8, 10)
                                    .join("")}${item.reservation_end_time
                                    .split("")
                                    .slice(4, 8)
                                    .join("")}${item.reservation_end_time
                                    .split("")
                                    .slice(0, 4)
                                    .join("")}                                
                               ${item.reservation_end_time
                                 .split("")
                                 .splice(11, 5)
                                 .join("")}`
                                : `${item.reservation_end_time
                                    .split("")
                                    .slice(8, 10)
                                    .join("")}${item.reservation_end_time
                                    .split("")
                                    .slice(4, 8)
                                    .join("")}${item.reservation_end_time
                                    .split("")
                                    .slice(0, 4)
                                    .join("")}`}
                            </td>
                            <td>{item.reservation_time}</td>
                            <td
                              style={
                                item.reservation_status === null
                                  ? { color: "orange" }
                                  : item.reservation_status === true
                                  ? { color: "green" }
                                  : item.reservation_status === false
                                  ? { color: "red" }
                                  : ""
                              }
                            >
                              {item.reservation_status === null
                                ? "Ожидает"
                                : item.reservation_status === false
                                ? "Отклонено"
                                : item.reservation_status === true
                                ? "Подтверждено"
                                : ""}
                            </td>
                            <td>{item.owner_name}</td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
              {reservations && reservations.length === 0 && (
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
            <p
              className="conteiner_shapka_myProfile"
              style={{ display: "none" }}
            >
              Я беру {reservations && reservations.length}
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
              <div style={{ width: "100%", height: "-webkit-fill-available" }}>
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
                    {reservations &&
                      reservations.map((item, index) => {
                        return (
                          <tr style={{ cursor: "pointer" }}>
                            <th scope="row">{index + 1}</th>
                            <td>
                              <p>{item.item_id.name_item}</p>
                              <p>
                                (
                                {`${
                                  item.item_id.free_rent
                                    ? "Бесплатно"
                                    : item.item_id.offer_price_rent
                                    ? "Договорная"
                                    : `${item.item_id.price_rent}BYN/${item.item_id.rent}`
                                }${
                                  item.item_id.pledge_price &&
                                  item.item_id.pledge_price > 0
                                    ? ","
                                    : ""
                                } ${
                                  item.item_id.pledge_price &&
                                  item.item_id.pledge_price > 0
                                    ? `залог: ${item.item_id.pledge_price} BYN`
                                    : ""
                                }${item.item_id.insurance_price ? "," : ""} ${
                                  item.item_id.insurance_price
                                    ? `страхование: ${item.item_id.insurance_price}BYN`
                                    : ""
                                }${
                                  item.item_id.self_delivery_price ? "," : ""
                                } ${
                                  item.item_id.self_delivery_price
                                    ? `доставка: ${item.item_id.self_delivery_price}BYN`
                                    : ""
                                }${item.item_id.servicefee_price ? "," : ""} ${
                                  item.item_id.servicefee_price
                                    ? `сервисный сбор: ${item.item_id.servicefee_price}BYN`
                                    : ""
                                }`}
                                )
                              </p>
                            </td>
                            <td>
                              {item.rent === "HOUR"
                                ? `${item.reservation_start_time
                                    .split("")
                                    .slice(8, 10)
                                    .join("")}${item.reservation_start_time
                                    .split("")
                                    .slice(4, 8)
                                    .join("")}${item.reservation_start_time
                                    .split("")
                                    .slice(0, 4)
                                    .join("")}                                
                               ${item.reservation_start_time
                                 .split("")
                                 .splice(11, 5)
                                 .join("")}`
                                : `${item.reservation_start_time
                                    .split("")
                                    .slice(8, 10)
                                    .join("")}${item.reservation_start_time
                                    .split("")
                                    .slice(4, 8)
                                    .join("")}${item.reservation_start_time
                                    .split("")
                                    .slice(0, 4)
                                    .join("")}`}
                            </td>
                            <td>
                              {" "}
                              {item.rent === "HOUR"
                                ? `${item.reservation_end_time
                                    .split("")
                                    .slice(8, 10)
                                    .join("")}${item.reservation_end_time
                                    .split("")
                                    .slice(4, 8)
                                    .join("")}${item.reservation_end_time
                                    .split("")
                                    .slice(0, 4)
                                    .join("")}                                
                               ${item.reservation_end_time
                                 .split("")
                                 .splice(11, 5)
                                 .join("")}`
                                : `${item.reservation_end_time
                                    .split("")
                                    .slice(8, 10)
                                    .join("")}${item.reservation_end_time
                                    .split("")
                                    .slice(4, 8)
                                    .join("")}${item.reservation_end_time
                                    .split("")
                                    .slice(0, 4)
                                    .join("")}`}
                            </td>
                            <td>{item.item_id.rent}</td>
                            <td>{item.reservation_time}</td>
                            <td
                              style={
                                item.reservation_status === null
                                  ? { color: "orange" }
                                  : item.reservation_status === true
                                  ? { color: "green" }
                                  : item.reservation_status === false
                                  ? { color: "red" }
                                  : ""
                              }
                            >
                              {item.reservation_status === null
                                ? "Ожидает"
                                : item.reservation_status === false
                                ? "Отклонено"
                                : item.reservation_status === true
                                ? "Подтверждено"
                                : ""}
                            </td>
                            <td>{item.owner_name}</td>
                          </tr>
                        );
                      })}
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
            <Link
              style={{
                textDecoration: "none",
              }}
              className="conteiner_shapka_myProfile"
              to="/i-take"
            >
              <p>
                Я беру <span> {reservations && reservations.length} </span>
              </p>
            </Link>
            <Link to="/messages" style={{ textDecoration: "none" }}>
              <p>Мои сообщения</p>
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
              <div style={{ width: "100%" }}>
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
                    {reservations &&
                      reservations.map((item, index) => {
                        return (
                          <tr style={{ cursor: "pointer" }}>
                            <th scope="row">{index + 1}</th>
                            <td>
                              <p>{item.item_id.name_item}</p>
                              <p>
                                (
                                {`${
                                  item.item_id.free_rent
                                    ? "Бесплатно"
                                    : item.item_id.offer_price_rent
                                    ? "Договорная"
                                    : `${item.item_id.price_rent}BYN/${item.item_id.rent}`
                                }${
                                  item.item_id.pledge_price &&
                                  item.item_id.pledge_price > 0
                                    ? ","
                                    : ""
                                } ${
                                  item.item_id.pledge_price &&
                                  item.item_id.pledge_price > 0
                                    ? `залог: ${item.item_id.pledge_price} BYN`
                                    : ""
                                }${item.item_id.insurance_price ? "," : ""} ${
                                  item.item_id.insurance_price
                                    ? `страхование: ${item.item_id.insurance_price}BYN`
                                    : ""
                                }${
                                  item.item_id.self_delivery_price ? "," : ""
                                } ${
                                  item.item_id.self_delivery_price
                                    ? `доставка: ${item.item_id.self_delivery_price}BYN`
                                    : ""
                                }${item.item_id.servicefee_price ? "," : ""} ${
                                  item.item_id.servicefee_price
                                    ? `сервисный сбор: ${item.item_id.servicefee_price}BYN`
                                    : ""
                                }`}
                                )
                              </p>
                            </td>
                            <td>
                              {item.rent === "HOUR"
                                ? `${item.reservation_start_time
                                    .split("")
                                    .slice(8, 10)
                                    .join("")}${item.reservation_start_time
                                    .split("")
                                    .slice(4, 8)
                                    .join("")}${item.reservation_start_time
                                    .split("")
                                    .slice(0, 4)
                                    .join("")}                                
                               ${item.reservation_start_time
                                 .split("")
                                 .splice(11, 5)
                                 .join("")}`
                                : `${item.reservation_start_time
                                    .split("")
                                    .slice(8, 10)
                                    .join("")}${item.reservation_start_time
                                    .split("")
                                    .slice(4, 8)
                                    .join("")}${item.reservation_start_time
                                    .split("")
                                    .slice(0, 4)
                                    .join("")}`}
                            </td>
                            <td>
                              {" "}
                              {item.rent === "HOUR"
                                ? `${item.reservation_end_time
                                    .split("")
                                    .slice(8, 10)
                                    .join("")}${item.reservation_end_time
                                    .split("")
                                    .slice(4, 8)
                                    .join("")}${item.reservation_end_time
                                    .split("")
                                    .slice(0, 4)
                                    .join("")}                                
                               ${item.reservation_end_time
                                 .split("")
                                 .splice(11, 5)
                                 .join("")}`
                                : `${item.reservation_end_time
                                    .split("")
                                    .slice(8, 10)
                                    .join("")}${item.reservation_end_time
                                    .split("")
                                    .slice(4, 8)
                                    .join("")}${item.reservation_end_time
                                    .split("")
                                    .slice(0, 4)
                                    .join("")}`}
                            </td>
                            <td>{item.item_id.rent}</td>
                            <td>{item.reservation_time}</td>
                            <td
                              style={
                                item.reservation_status === null
                                  ? { color: "orange" }
                                  : item.reservation_status === true
                                  ? { color: "green" }
                                  : item.reservation_status === false
                                  ? { color: "red" }
                                  : ""
                              }
                            >
                              {item.reservation_status === null
                                ? "Ожидает"
                                : item.reservation_status === false
                                ? "Отклонено"
                                : item.reservation_status === true
                                ? "Подтверждено"
                                : ""}
                            </td>
                            <td>{item.owner_name}</td>
                          </tr>
                        );
                      })}
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
