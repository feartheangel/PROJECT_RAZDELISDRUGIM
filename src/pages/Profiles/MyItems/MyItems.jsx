import React from "react";
import { ItemCardProfile, ItemDeleteSubmit } from "../../../components/index";
import { useSelector } from "react-redux";
import "./MyItems.css";
import { Link } from "react-router-dom";
import { Header, Footer } from "../../../components/index";
import Requests from "../../../http/axios-requests";

const MyItems = () => {
  const { subjects } = useSelector(({ userData }) => userData);

  const [reservations, setReservations] = React.useState();
  const [modalActiveSubmit, setModalActiveSubmit] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState();

  React.useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Я сдаю: #разделисдругим";
  }, []);

  React.useEffect(() => {
    if (!localStorage.getItem("key")) {
      window.location.href = "/";
    }
  }, []);

  React.useEffect(() => {
    Requests.getIncomingReservations().then((res) => {
      setReservations(res.data);
    });
  }, []);

  const handleReservationSubmit = (id) => {
    Requests.updateReservationStatus(id, true).then(() => {
      Requests.getIncomingReservations().then((res) => {
        setReservations(res.data);
      });
    });
  };

  const handleReservationAbort = (id) => {
    Requests.updateReservationStatus(id, false).then(() => {
      Requests.getIncomingReservations().then((res) => {
        setReservations(res.data);
      });
    });
  };

  return (
    <div>
      <Header />
      <div className="privateProfile" id="globaldata_pk">
        <div className="privateProfile_container">
          <div className="conteiner_shapka">
            <p className="conteiner_shapka_myProfile">
              Я сдаю <span> {subjects.length} </span>
            </p>
            <Link style={{ textDecoration: "none" }} to="/i-take">
              <p>
                Я беру <span> - </span>
              </p>
            </Link>
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
              {reservations && reservations.length >= 1 && (
                <div>
                  <table class="table table-hover">
                    <thead class="thead-dark">
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Наименование</th>
                        <th scope="col">Начало</th>
                        <th scope="col">Окончание</th>
                        <th scope="col">Срок</th>
                        <th scope="col">Длительность</th>
                        <th scope="col" style={{ verticalAlign: "top" }}>
                          Статус
                        </th>
                        <th scope="col" style={{ verticalAlign: "top" }}>
                          Запрашивает
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {reservations &&
                        reservations.map((item, index) => {
                          return (
                            <tr style={{ cursor: "pointer" }}>
                              <th scope="row">{index + 1}</th>
                              <td>{item.name_item}</td>
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
                              <td>
                                {" "}
                                {item.rent === "HOUR"
                                  ? "Час"
                                  : item.rent === "DAY"
                                  ? "День"
                                  : item.rent === "WEEK"
                                  ? "Неделя"
                                  : item.rent === "MONTH"
                                  ? "Месяц"
                                  : item.rent === "PIECE"
                                  ? "Штука"
                                  : item.rent === "SQUARE"
                                  ? "1кв. м."
                                  : ""}
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
                                {item.reservation_status === null ? (
                                  <div className="reservation_submit_choice_wrapper">
                                    <input
                                      type="button"
                                      className="reservation_submit_choice_yes"
                                      title=" Подтвердить бронирование"
                                      onClick={() =>
                                        handleReservationSubmit(item.id)
                                      }
                                    />
                                    <input
                                      type="button"
                                      className="reservation_submit_choice_no"
                                      title="Отклонить бронирование"
                                      onClick={() =>
                                        handleReservationAbort(item.id)
                                      }
                                    />
                                  </div>
                                ) : item.reservation_status === false ? (
                                  "Отклонено"
                                ) : item.reservation_status === true ? (
                                  "Подтверждено"
                                ) : (
                                  ""
                                )}
                              </td>
                              <td>{item.renter_name}</td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              )}
              {subjects &&
                subjects.map((subject, index) => (
                  <ItemCardProfile
                    setDeleteId={setDeleteId}
                    setModalActiveSubmit={setModalActiveSubmit}
                    key={index}
                    title={subject.name_item}
                    category_id={subject.category_id}
                    description={subject.description}
                    image_1={subject.image_1}
                    image_2={subject.image_2}
                    image_3={subject.image_3}
                    image_4={subject.image_4}
                    image_5={subject.image_5}
                    rent={subject.rent}
                    price_rent={subject.price_rent}
                    key_words={subject.key_words}
                    year_release={subject.year_release}
                    mileage={subject.mileage}
                    price_item={subject.price_item}
                    receive_time={subject.receive_time}
                    return_time={subject.return_time}
                    prepare_time={subject.prepare_time}
                    delivery={subject.delivery}
                    delivery_free={subject.delivery_free}
                    self_delivery_price={subject.self_delivery_price}
                    will_send={subject.will_send}
                    will_send_choice={subject.will_send_choice}
                    send_payer={subject.send_payer}
                    servicefee={subject.servicefee}
                    servicefee_choice={subject.servicefee_choice}
                    servicefee_price={subject.servicefee_price}
                    pledge={subject.pledge}
                    pledge_price={subject.pledge_price}
                    insurance={subject.insurance}
                    insurance_choice={subject.insurance_choice}
                    insurance_price={subject.insurance_price}
                    sell={subject.sell}
                    contract={subject.contract}
                    appointment={subject.appointment}
                    structure={subject.structure}
                    free_rent={subject.free_rent}
                    offer_price_rent={subject.offer_price_rent}
                    color={subject.color}
                    franchise={subject.franchise}
                    franchise_price={subject.franchise_price}
                    article={subject.article}
                    inventory_number={subject.inventory_number}
                    coords={subject.coordinates}
                    prepare_time_choice={subject.prepare_time_choice}
                    items_address={subject.items_address}
                    is_hidden={subject.is_hidden}
                    id={subject.id}
                  />
                ))}
              {subjects && subjects.length === 0 && (
                <div className="favorites_empty">
                  <p>Вы ничего не сдаете.</p>
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
              {subjects &&
                subjects.map((subject, index) => (
                  <ItemCardProfile
                    setDeleteId={setDeleteId}
                    setModalActiveSubmit={setModalActiveSubmit}
                    key={index}
                    title={subject.name_item}
                    category_id={subject.category_id}
                    description={subject.description}
                    image_1={subject.image_1}
                    image_2={subject.image_2}
                    image_3={subject.image_3}
                    image_4={subject.image_4}
                    image_5={subject.image_5}
                    rent={subject.rent}
                    price_rent={subject.price_rent}
                    key_words={subject.key_words}
                    year_release={subject.year_release}
                    mileage={subject.mileage}
                    price_item={subject.price_item}
                    receive_time={subject.receive_time}
                    return_time={subject.return_time}
                    prepare_time={subject.prepare_time}
                    delivery={subject.delivery}
                    delivery_free={subject.delivery_free}
                    self_delivery_price={subject.self_delivery_price}
                    will_send={subject.will_send}
                    will_send_choice={subject.will_send_choice}
                    send_payer={subject.send_payer}
                    servicefee={subject.servicefee}
                    servicefee_choice={subject.servicefee_choice}
                    servicefee_price={subject.servicefee_price}
                    pledge={subject.pledge}
                    pledge_price={subject.pledge_price}
                    insurance={subject.insurance}
                    insurance_choice={subject.insurance_choice}
                    insurance_price={subject.insurance_price}
                    sell={subject.sell}
                    contract={subject.contract}
                    appointment={subject.appointment}
                    structure={subject.structure}
                    free_rent={subject.free_rent}
                    offer_price_rent={subject.offer_price_rent}
                    color={subject.color}
                    franchise={subject.franchise}
                    franchise_price={subject.franchise_price}
                    article={subject.article}
                    inventory_number={subject.inventory_number}
                    coords={subject.coordinates}
                    prepare_time_choice={subject.prepare_time_choice}
                    items_address={subject.items_address}
                    is_hidden={subject.is_hidden}
                    id={subject.id}
                  />
                ))}
              {subjects && subjects.length === 0 && (
                <div className="favorites_empty">
                  <p>Вы ничего не сдаете.</p>
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
                Я беру <span> 3 </span>
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
              {subjects &&
                subjects.map((subject, index) => (
                  <ItemCardProfile
                    setDeleteId={setDeleteId}
                    setModalActiveSubmit={setModalActiveSubmit}
                    key={index}
                    title={subject.name_item}
                    category_id={subject.category_id}
                    description={subject.description}
                    image_1={subject.image_1}
                    image_2={subject.image_2}
                    image_3={subject.image_3}
                    image_4={subject.image_4}
                    image_5={subject.image_5}
                    rent={subject.rent}
                    price_rent={subject.price_rent}
                    key_words={subject.key_words}
                    year_release={subject.year_release}
                    mileage={subject.mileage}
                    price_item={subject.price_item}
                    receive_time={subject.receive_time}
                    return_time={subject.return_time}
                    prepare_time={subject.prepare_time}
                    delivery={subject.delivery}
                    delivery_free={subject.delivery_free}
                    self_delivery_price={subject.self_delivery_price}
                    will_send={subject.will_send}
                    will_send_choice={subject.will_send_choice}
                    send_payer={subject.send_payer}
                    servicefee={subject.servicefee}
                    servicefee_choice={subject.servicefee_choice}
                    servicefee_price={subject.servicefee_price}
                    pledge={subject.pledge}
                    pledge_price={subject.pledge_price}
                    insurance={subject.insurance}
                    insurance_choice={subject.insurance_choice}
                    insurance_price={subject.insurance_price}
                    sell={subject.sell}
                    contract={subject.contract}
                    appointment={subject.appointment}
                    structure={subject.structure}
                    free_rent={subject.free_rent}
                    offer_price_rent={subject.offer_price_rent}
                    color={subject.color}
                    franchise={subject.franchise}
                    franchise_price={subject.franchise_price}
                    article={subject.article}
                    inventory_number={subject.inventory_number}
                    coords={subject.coordinates}
                    prepare_time_choice={subject.prepare_time_choice}
                    items_address={subject.items_address}
                    is_hidden={subject.is_hidden}
                    id={subject.id}
                  />
                ))}
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

export default MyItems;
