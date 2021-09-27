/* eslint-disable jsx-a11y/alt-text */
import React from "react";
<<<<<<< HEAD
import "../../pages/CardThings/CardThings.css";
=======
import { DateRangePicker } from "react-date-range";
>>>>>>> 455412dcc4219a6ee2ce671b22f22eb637af089d
import {
  setSearchCategory,
  setCategoryId,
  setSearchItems,
} from "../../redux/actions/search";
import {
  setAdresses,
  setQueryStarted,
  setQueryDone,
  reloadData,
} from "../../redux/actions/userData";
import { useSelector, useDispatch } from "react-redux";
import { YMaps, Map, Placemark } from "react-yandex-maps";
import HandShake from "../../img/CardThings/RightContent/handShake1.png";
import Car from "../../img/CardThings/RightContent/Vector3.png";
import freePrice from "../../img/MainPage/freePrice.png";
import Requests from "../../http/axios-requests";
import Calendar from "../../img/CardThings/Booking/Union.png";
import { rootAddress } from "../../http/axios-requests";
import metka from "../../img/CardThings/Booking/Union1.png";
import People from "../../img/CardThings/Booking/body.png";

const Booking = ({ itemData, setSelectedImage, selectedImage }) => {
  const dispatch = useDispatch();
  const { isLoggedIn, favorites, subjects, addresses, requestActive } =
    useSelector(({ userData }) => userData);
  const { isLoaded } = useSelector(({ items }) => items);

  const { serviceIds, maxAddressesCount } = useSelector(
    ({ settings }) => settings
  );

  //обработка адресов
  const [showAddressAddTable, setShowAddressAddTable] = React.useState(false);

  const [area, setArea] = React.useState();
  const [locality, setLocality] = React.useState();
  const [district, setDistrict] = React.useState();
  const [street, setStreet] = React.useState();
  const [index, setIndex] = React.useState();
  const [house, setHouse] = React.useState();
  const [body, setBody] = React.useState();
  const [flat, setFlat] = React.useState();
  const [room, setRoom] = React.useState();
  const [office, setOffice] = React.useState();
  const [building, setBuilding] = React.useState();

  const [coords, setCoords] = React.useState();

  const [addressAdded, setAddressAdded] = React.useState(false);
  const [captchaPassed, setCaptchaPassed] = React.useState(false);
  const [ignored, forceUpdate] = React.useReducer((x) => x + 1, 0);
  const [radioBooking, setRadioBooking] = React.useState();
  const [renterBookingName, setRenterBookingName] = React.useState();
  const [renterBookingNumber, setRenterBookingNumber] = React.useState();
  const [renterBookingSms, setRenterBookingSms] = React.useState();
  const [reservationtime, SetReservationTime] = React.useState();
  const [reservationendtime, SetReservationEndTime] = React.useState();
  const [delivery_Сhoice, setDelivery_Сhoice] = React.useState();

  // минимальное время бронирования(дата сейчас)
  var dateminbooking = new Date().toJSON().slice(0, 16);

  // стартовое время бронирования
  var dateObjStart = new Date(reservationtime);
  var yearStart = dateObjStart.getFullYear();
  var monthStart = dateObjStart.getMonth();
  var dateStart = dateObjStart.getDate();
  var hoursStart = dateObjStart.getHours();
  var minutesStart = dateObjStart.getMinutes();

  // финальное время бронирования
  var dateObjEnd = new Date(reservationendtime);
  var yearEnd = dateObjEnd.getFullYear();
  var monthEnd = dateObjEnd.getMonth();
  var dateEnd = dateObjEnd.getDate();
  var hoursEnd = dateObjEnd.getHours();
  var minutesEnd = dateObjEnd.getMinutes();

  // расчёт времени бронирования
  var resultdate = dateEnd - dateStart;
  var resulthours = hoursEnd - hoursStart;

  // расчёт суммы бронирования если день/час аренды
  const resultSummaArends = Math.round(
    itemData.rent === "День"
      ? resultdate * itemData.price_rent
      : itemData.rent === "Час"
      ? resulthours * itemData.price_rent
      : null
  );
  //  расчёт итоговой суммы
  const totalAmount =
    resultSummaArends +
    (itemData.pledge_price !== null ? itemData.pledge_price : 0) +
    (itemData.self_delivery_price !== null ? itemData.self_delivery_price : 0);

  // console.log(typeof delivery_Сhoice);

  // отправка за счет
  const radioBookingHandler = (e) => {
    setRadioBooking(e.target.value);
  };
  // имя рентера
  const renterBookingNameHandler = (e) => {
    setRenterBookingName(e.target.value);
  };
  // номер рентера
  const renterBookingNumberHandler = (e) => {
    setRenterBookingNumber(e.target.value);
  };
  // сообщение рентера
  const renterBookingSmsHandler = (e) => {
    setRenterBookingSms(e.target.value);
  };

  //выделяем адреса
  const addressesFormatted = [];
  isLoaded &&
    addresses.map((item, index) => {
      addressesFormatted.push([
        `${item.city}, ${item.street}, ${
          item.house ? item.house : item.apartment
        }`,
        item.coordinates,
      ]);
    });

  //обработчик сохранения нового адреса
  const saveNewAddress = () => {
    if (!area) {
      alert("Не указана область!");
      return;
    } else if (!locality) {
      alert("Не указан населенный пункт!");
      return;
    } else if (!street) {
      alert("Не указана улица!");
      return;
    } else if (!index) {
      alert("Не указан индекс!");
      return;
    } else if (!house && !room) {
      alert("Не указан номер дома либо помещения!");
      return;
    }

    Requests.refresh(localStorage.getItem("refresh")).then((res) => {
      localStorage.setItem("key", res.data.access);
    });

    // console.log(itemData.self_delivery_price);

    dispatch(setQueryStarted());
    Requests.getCords(
      String(area),
      String(locality),
      String(street),
      String(house),
      String(room),
      String(index)
    )
      .then((response) => {
        if (response.status === 200) {
          Requests.createAdress(
            area,
            district,
            index,
            locality,
            street,
            house,
            body,
            flat,
            room,
            office,
            building,
            response.data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos
              .split(" ")
              .reverse()
          )
            .then((response) => {
              Requests.fetchAdresses()
                .then((response) => {
                  dispatch(setAdresses(response.data));
                  setShowAddressAddTable(false);
                  setArea("");
                  setDistrict("");
                  setIndex("");
                  setLocality("");
                  setStreet("");
                  setHouse("");
                  setBody("");
                  setFlat("");
                  setRoom("");
                  setOffice("");
                  setBuilding("");
                  dispatch(setQueryDone());
                  setAddressAdded(true);
                  setCoords([
                    response.data[response.data.length - 1].coordinates,
                    `${response.data[response.data.length - 1].city}, ${
                      response.data[response.data.length - 1].street
                    }, ${
                      response.data[response.data.length - 1].house
                        ? response.data[response.data.length - 1].house
                        : response.data[response.data.length - 1].space_room
                    }`,
                  ]);
                })
                .catch((e) => alert("Ошибка получения категорий/адресов"));
              alert("Адрес успешно добавлен в профиль!");
            })
            .catch((e) => {
              alert(
                "Не удалось подтвердить адрес, проверьте правильность ввода данных в поля."
              );
              dispatch(setQueryDone());
            });
        }
      })
      .catch((e) => {
        dispatch(setQueryDone());
        alert("Ошибка сохранения адреса!");
      });
  };

  return (
    <div className="card_content_booking">
      {/* header */}
      <div className="content_booking_shapka_up">
        <p className="content_booking_shapka_up_p">Оформление бронирования</p>
      </div>
      {/* content */}
      <div className="card_content_booking_all">
        {/* up block content */}
        <div className="card_content_booking_up">
          <div className="content_booking_up_header">
            {/* left block */}
            <div className="booking_up_header_info_item">
              <div className="header_info_item_photo">
                {itemData && itemData.image_1 && (
                  <img
                    className={
                      selectedImage === itemData.image_1
                        ? "card_thing_image_booking"
                        : "card_thing_image_booking"
                    }
                    onClick={() =>
                      setSelectedImage(itemData && itemData.image_1)
                    }
                    src={
                      itemData &&
                      `${rootAddress}${itemData.image_1}?random=` +
                        Math.random()
                    }
                    alt=""
                  />
                )}
              </div>

              <div className="header_info_item_name">
                {/*название вещи */}
                <p className="header_info_item_name_p1">
                  {itemData && itemData.name_item}{" "}
                  {!serviceIds.includes(itemData && itemData.category_id.id) &&
                    "в аренду"}
                </p>
                {/* стоимость арнеды */}
                <div className="header_info_item_name_yourCost">
                  {itemData && itemData.offer_price_rent && (
                    <div style={{ display: "flex" }}>
                      <img
                        src={HandShake}
                        className="yourCost_handShake"
                        alt=""
                      />
                      <p className="block_up_yourCost-p1">
                        {serviceIds.includes(
                          itemData && itemData.category_id.id
                        )
                          ? "Договорная"
                          : "Предложить свою цену"}
                      </p>
                    </div>
                  )}
                  {itemData && itemData.free_rent && (
                    <div style={{ display: "flex" }}>
                      <img
                        src={freePrice}
                        className="yourCost_handShake"
                        alt=""
                      />
                      <p className="block_up_yourCost-p1">Бесплатно</p>
                    </div>
                  )}
                  {itemData &&
                    !itemData.offer_price_rent &&
                    !itemData.free_rent && (
                      <div style={{ display: "flex" }}>
                        <p
                          style={{ marginRight: "10px" }}
                          className="block_up_yourCost-p1"
                        >
                          <span style={{ fontWeight: "500" }}>
                            {itemData && itemData.price_rent}
                          </span>{" "}
                          BYN
                        </p>
                        <p
                          style={{ marginRight: "10px" }}
                          className="block_up_yourCost-p1"
                        >
                          за
                        </p>
                        <p
                          style={{ fontWeight: "500" }}
                          className="block_up_yourCost-p1"
                        >
                          {itemData && itemData.rent === "Час"
                            ? "час"
                            : itemData && itemData.rent === "День"
                            ? "день"
                            : itemData && itemData.rent === "Неделя"
                            ? "неделю"
                            : itemData && itemData.rent === "Месяц"
                            ? "месяц"
                            : itemData && itemData.rent === "1шт."
                            ? "штуку"
                            : itemData && itemData.rent === "1кв.м."
                            ? "1кв.м."
                            : ""}
                        </p>
                      </div>
                    )}
                </div>
              </div>
            </div>
            {/* right block header content */}
            <div className="booking_up_header_info_user">
              <p className="booking_up_header_info_user_p"> Владелец </p>
              <div className="booking_up_header_info_user_name">
                <p className="header_info_user_name-p1">
                  {itemData && itemData.profile.company_name
                    ? itemData && itemData.profile.company_name
                    : itemData && itemData.profile.first_name}
                </p>
                <p className="header_info_user_name-p2">
                  {itemData && itemData.profile.company_name
                    ? "Компания"
                    : "Частное лицо"}
                </p>
              </div>
            </div>
          </div>
          {/* дата аренды */}
          <div className="content_booking_up_information">
            <div className="content_booking_up_information_all">
              <p className="information_all_up"> Даты аренды </p>
              <div className="information_all_down">
                <div className="information_all_down_left">
<<<<<<< HEAD
                  <div className="information_all_down_left_date">
                    <img className="booking_calendar" src={Calendar} />
                    <label
                      className="information_all_down_left_date-p"
                      htmlFor="booking_date_input"
                    >
                      <input
                        id="booking_date_input"
                        type="datetime-local"
                        min={dateminbooking}
                        className="booking_input_date"
                        onChange={(e) => SetReservationTime(e.target.value)}
                      />
                    </label>
                    <span className="information_all_down_left_date-p">
                      {" "}
                      -{" "}
                    </span>
                    <label
                      className="information_all_down_left_date-p"
                      htmlFor="booking_date_end_input"
                    >
                      <input
                        id="booking_date_end_input"
                        type="datetime-local"
                        min={dateminbooking}
                        disabled={reservationtime === undefined}
                        className="booking_input_date"
                        onChange={(e) => SetReservationEndTime(e.target.value)}
                      />
                    </label>
                  </div>
                  {Number.isNaN(resultdate) ? (
                    ""
                  ) : (
                    <p className="information_all_down_left_alldate">
                      {resultdate === Number(0) ? (
                        <p className="information_all_down_left_alldate">
                          {resulthours}
                          час(-ов)
                        </p>
                      ) : (
                        <p className="information_all_down_left_alldate">
                          {resultdate}сутки(-ок)
                        </p>
                      )}
                    </p>
                  )}
                </div>
                <div className="information_all_down_right">
                  {/* Время получения и возврата*/}
                  {!serviceIds.includes(
                    itemData && itemData.category_id.id
                  ) && (
                    <div className="conditions_return">
                      <div className="conditions_return_block1">
                        <div className="conditions_row">
                          <p className="conditions_return_row-p1">
                            Примерное время получения
                          </p>
                        </div>
                        <p className="conditions_timeItem-p1">
                          не ранее{" "}
                          <p className="timeItem-p1-input">
                            {itemData && itemData.receive_time}
                          </p>
                        </p>
                      </div>

                      <div className="conditions_return_block2">
                        <div className="conditions_row">
                          <p className="conditions_return_row-p1">
                            Примерное время возврата
                          </p>
                        </div>
                        <p className="conditions_timeItem-p1">
=======
                  <div
                    className="information_all_down_left_date"
                    id="datetimepicker1"
                  >
                    <img className="booking_calendar" src={Calendar} />
                    <div className="form-group" id="datetimepicker1">
                      <label
                        className="information_all_down_left_date-p"
                        htmlFor="booking_date_input"
                      >
                        <input
                          id="booking_date_input"
                          type="datetime-local"
                          class="form-control"
                          min={dateminbooking}
                          startTime="10"
                          step="900"
                          className="booking_input_date"
                          onChange={(e) => SetReservationTime(e.target.value)}
                        />
                      </label>

                      <span className="information_all_down_left_date-p">
                        {" "}
                        -{" "}
                      </span>

                      <label
                        className="information_all_down_left_date-p"
                        htmlFor="booking_date_end_input"
                      >
                        <input
                          id="booking_date_end_input"
                          type="datetime-local"
                          min={dateminbooking}
                          step="900"
                          disabled={reservationtime === undefined}
                          className="booking_input_date"
                          onChange={(e) =>
                            SetReservationEndTime(e.target.value)
                          }
                        />
                      </label>
                    </div>
                  </div>
                  {Number.isNaN(resultdate) ? (
                    ""
                  ) : (
                    <p className="information_all_down_left_alldate">
                      {resultdate === Number(0) ? (
                        <p className="information_all_down_left_alldate">
                          {resulthours}
                          час(-ов)
                        </p>
                      ) : (
                        <p className="information_all_down_left_alldate">
                          {resultdate}сутки(-ок)
                        </p>
                      )}
                    </p>
                  )}
                </div>
                <div className="information_all_down_right">
                  {/* Время получения и возврата*/}
                  {!serviceIds.includes(
                    itemData && itemData.category_id.id
                  ) && (
                    <div className="conditions_return">
                      <div className="conditions_return_block1">
                        <div className="conditions_row">
                          <p className="conditions_return_row-p1">
                            Примерное время получения
                          </p>
                        </div>
                        <p className="conditions_timeItem-p1">
                          не ранее{" "}
                          <p className="timeItem-p1-input">
                            {itemData && itemData.receive_time}
                          </p>
                        </p>
                      </div>

                      <div className="conditions_return_block2">
                        <div className="conditions_row">
                          <p className="conditions_return_row-p1">
                            Примерное время возврата
                          </p>
                        </div>
                        <p className="conditions_timeItem-p1">
>>>>>>> 455412dcc4219a6ee2ce671b22f22eb637af089d
                          не позднее{" "}
                          <p className="timeItem-p1-input">
                            {itemData && itemData.return_time}
                          </p>
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* центральные блоки */}
        <div className="card_content_booking_center">
          <div className="card_content_booking_center_up">
            <div className="booking_center_up_block_first">
              <div className="booking_center_up_block_left">
                <img src={Car} className="img_car_booking" alt="" />
                <p className="booking_center_up_block_left-p"> Вид доставки</p>
              </div>
              {/* СПОСОБЫ ДОСТАВКИ  */}
              <div
                className="booking_center_up_block_right"
                onChange={(e) => radioBookingHandler(e)}
              >
                {itemData.delivery.includes("Самовывоз") && (
                  <div className="up_block_right_input_block">
                    <input
                      type="radio"
                      name="delivery"
                      className="input_setting"
                      value="1"
                      onChange={(e) => setDelivery_Сhoice(e.target.value)}
                    />
                    <label
                      for="radio-1"
                      className="up_block_right_input_block-text"
                    >
                      Cамовывоз
                    </label>
                  </div>
                )}

                {itemData.delivery.includes("Привезу и заберу сам") && (
                  <div className="up_block_right_input_block2">
                    <div className="up_block_right_input_block2-2">
                      <input
                        type="radio"
                        name="delivery"
                        className="input_setting"
                        value="2"
                        onChange={(e) => setDelivery_Сhoice(e.target.value)}
                      />
                      <label
                        for="radio-2"
                        className="up_block_right_input_block-text"
                      >
                        Привезет и заберет владелец
                      </label>
                    </div>
                    <p className="up_block_right_input_block3_text">
                      — за {itemData.self_delivery_price} BYN
                    </p>
                  </div>
                )}

                {itemData.delivery.includes("Доставка курьером") && (
                  <div className="up_block_right_input_block3">
                    <div className="up_block_right_input_block3-3">
                      <input
                        type="radio"
                        name="delivery"
                        className="input_setting"
                        value="3"
                        onChange={(e) => setDelivery_Сhoice(e.target.value)}
                      />
                      <label
                        for="radio-3"
                        className="up_block_right_input_block-text"
                      >
                        Отправить
                      </label>
                    </div>
                    <label
                      for="radio-1"
                      className="up_block_right_input_block3_text"
                    >
                      — {itemData.will_send_choice}:
                      {itemData.send_payer === "RENTER"
                        ? " за счёт рентера"
                        : itemData.send_payer === "OWNER"
                        ? " за счёт владельца"
                        : ""}
                    </label>
                  </div>
                )}
              </div>
            </div>

            {/* адрес вещи */}

            <div className="booking_center_up_block_second">
              <div className="up_block_second_block_up">
                <img src={metka} className="booking_metka" />
                <p className="up_block_second_block_up-p">
                  Адрес местонахождения вещи
                </p>
              </div>
              <div className="up_block_second_block_center">
                {isLoggedIn ? (
                  <p className="up_block_second_block_center_address">
                    {itemData && itemData.items_address.split(",")[0]},
                    {itemData && itemData.items_address.split(",")[1]}
                  </p>
                ) : (
                  <p
                    style={{ color: "#4CC9F0" }}
                    className="up_block_second_block_center_address"
                  >
                    Адрес доступен после регистрации
                  </p>
                )}
                {/* <p className="up_block_second_block_center-p">
                  Показать на карте
                </p> */}
              </div>

              <div className="up_block_second_block_down">
                <div className="up_block_second_block_up">
                  <img src={metka} className="booking_metka" />
                  <p className="up_block_second_block_up-p">Адрес доставки</p>
                </div>
                <div>
                  <div className="add-item-input-wrapper">
                    <select
                      className="add-item-select-input"
                      onChange={(e) => setCoords(e.target.value.split(",,"))}
                    >
                      <option>Не выбран</option>
                      {isLoaded &&
                        addressesFormatted.map((item, index) => (
                          <option
                            selected={
                              addressAdded &&
                              index + 1 === addressesFormatted.length
                            }
                            value={`${item[1]},,${item[0]}`}
                            key={index}
                          >
                            {item[0]}
                          </option>
                        ))}
                    </select>
                  </div>
                  {addresses.length < maxAddressesCount && (
                    <div
                      style={{ marginBottom: "20px" }}
                      id="dop_parametr_wrapper"
                    >
                      <input
                        id="dop_parametr"
                        className="add-item-input-checkbox__3"
                        type="checkbox"
                      />
                      <label
                        onClick={() =>
                          setShowAddressAddTable(!showAddressAddTable)
                        }
                        htmlFor="dop_parametr"
                      >
                        + Добавить другой адрес
                      </label>
                    </div>
                  )}

                  {showAddressAddTable && (
                    <div className="take-away-secondary-wrapper-column">
                      <div className="take-away-secondary-wrapper">
                        <div className="add-item-input-wrapper">
                          <label className="add-item-input-label">
                            Область{" "}
                            <span className="add-item-span-zvezda">*</span>
                          </label>
                          <input
                            placeholder="Например: Минская"
                            type="text"
                            className="add-item-input-text__address"
                            value={area}
                            onChange={(e) => setArea(e.target.value)}
                          />
                        </div>

                        <div className="add-item-input-wrapper">
                          <label className="add-item-input-label">
                            Населенный пункт{" "}
                            <span className="add-item-span-zvezda">*</span>
                          </label>
                          <input
                            placeholder="Например: Минск"
                            type="text"
                            className="add-item-input-text__address"
                            value={locality}
                            onChange={(e) => setLocality(e.target.value)}
                          />
                        </div>

                        <div className="add-item-input-wrapper">
                          <label className="add-item-input-label">Район</label>
                          <input
                            placeholder="Например: Советский"
                            type="text"
                            className="add-item-input-text__address"
                            value={district}
                            onChange={(e) => setDistrict(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="take-away-secondary-wrapper">
                        <div className="add-item-input-wrapper">
                          <label className="add-item-input-label">
                            Улица/Проспект/Переулок{" "}
                            <span className="add-item-span-zvezda">*</span>
                          </label>
                          <input
                            placeholder="Например: улица Сурганова/проспект Независмости/переулок Освобождения"
                            type="text"
                            className="add-item-input-text__address__street"
                            value={street}
                            onChange={(e) => setStreet(e.target.value)}
                          />
                        </div>

                        <div className="add-item-input-wrapper">
                          <label className="add-item-input-label">
                            Индекс
                            <span className="add-item-span-zvezda">*</span>
                          </label>
                          <input
                            placeholder="Например: 225417"
                            type="text"
                            className="add-item-input-text__address"
                            value={index}
                            onChange={(e) => setIndex(e.target.value)}
                          />
                        </div>
                      </div>
                      {/* дом строение */}
                      <div
                        className="take-away-secondary-wrapper"
                        id="take_Away_komp"
                      >
                        <div
                          className="take-away-secondary-wrapper"
                          id="take-away-secondary-wrapper"
                        >
                          <div className="add-item-input-wrapper">
                            <label className="add-item-input-label">
                              Дом{" "}
                              <span className="add-item-span-zvezda">*</span>
                            </label>
                            <input
                              disabled={room || office || building}
                              type="text"
                              className="add-item-input-text__address__house"
                              value={house}
                              onChange={(e) => setHouse(e.target.value)}
                            />
                          </div>

                          <div
                            className="take-away-secondary-wrapper"
                            id="take-away-secondary-wrapper"
                          >
                            <div className="add-item-input-wrapper">
                              <label className="add-item-input-label">
                                Корпус
                              </label>
                              <input
                                disabled={room || office || building}
                                type="text"
                                className="add-item-input-text__address__house"
                                value={body}
                                onChange={(e) => setBody(e.target.value)}
                              />
                            </div>

                            <div className="add-item-input-wrapper">
                              <label className="add-item-input-label">
                                Квартира
                              </label>
                              <input
                                disabled={room || office || building}
                                type="text"
                                className="add-item-input-text__address__house"
                                value={flat}
                                onChange={(e) => setFlat(e.target.value)}
                              />
                            </div>
                          </div>
                          <span
                            style={{ marginRight: "30px" }}
                            className="add-item-cost-or__secondary"
                          >
                            или
                          </span>
                          <div
                            className="take-away-secondary-wrapper"
                            id="take-away-secondary-wrapper"
                          >
                            <div className="add-item-input-wrapper">
                              <label className="add-item-input-label">
                                Помещение{" "}
                                <span className="add-item-span-zvezda">*</span>
                              </label>
                              <input
                                disabled={house || body || flat}
                                type="text"
                                className="add-item-input-text__address__house"
                                value={room}
                                onChange={(e) => setRoom(e.target.value)}
                              />
                            </div>
<<<<<<< HEAD

                            <div
                              className="take-away-secondary-wrapper"
                              id="take-away-secondary-wrapper"
                            >
                              <div className="add-item-input-wrapper">
                                <label className="add-item-input-label">
                                  Офис
                                </label>
                                <input
                                  disabled={house || body || flat}
                                  type="text"
                                  className="add-item-input-text__address__house"
                                  value={office}
                                  onChange={(e) => setOffice(e.target.value)}
                                />
                              </div>

                              <div className="add-item-input-wrapper">
                                <label className="add-item-input-label">
                                  Строение
                                </label>
                                <input
                                  disabled={house || body || flat}
                                  type="text"
                                  className="add-item-input-text__address__house"
                                  value={building}
                                  onChange={(e) => setBuilding(e.target.value)}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <input
                        disabled={requestActive}
                        id="save_address"
                        className={
                          requestActive
                            ? "add-item-save-new-address-button disabled"
                            : "add-item-save-new-address-button"
                        }
                        type="button"
                        value={
                          requestActive ? "ОТПРАВКА..." : "Сохранить адрес"
                        }
                        onClick={saveNewAddress}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="card_content_booking_center_down">
            <div className="booking_center_down_block1">
              <img src={People} className="booking_body" />
              <p className="booking_center_down_block1-p">Ваши данные</p>
            </div>
            <div className="booking_center_down_block2">
              <p className="booking_center_down_block2-p">
                Имя <span className="red_star">*</span>
              </p>
              <input
                type="text"
                className="add-item-select-input"
                onChange={(e) => renterBookingNameHandler(e)}
              />
            </div>
            <div className="booking_center_down_block2">
              <p className="booking_center_down_block2-p">
                Номер телефона <span className="red_star">*</span>
              </p>
              <input
                type="number"
                className="add-item-select-input"
                onChange={(e) => renterBookingNumberHandler(e)}
              />
            </div>
            <div className="booking_center_down_block3">
              <p className="booking_center_down_block2-p">
                Сообщение владельцу
              </p>
              <textarea
                className="booking_center_down_block2-textarea"
                onChange={(e) => renterBookingSmsHandler(e)}
              />
            </div>
          </div>
        </div>

        {/* нижний блок  */}
        <div className="card_content_booking_down">
          <div className="content_booking_down_block1">
            <p
              className="content_booking_down_block1-p"
              style={{ marginRight: "5px" }}
            >
              Итоговая стоимость:{" "}
            </p>
            <p className="content_booking_down_block1-p">
              {" "}
              {reservationtime === undefined ? (
                "- BYN"
              ) : resultSummaArends === 0 ? (
                <span style={{ color: "red" }}>
                  {" "}
                  Ошибка условия аренды! Проверьте в чём указана аренда.
                </span>
              ) : reservationendtime <= reservationtime ? (
                <span style={{ color: "red" }}>
                  {" "}
                  Ошибка условия аренды! Проверьте время выбора аренды.
                </span>
              ) : isNaN(totalAmount) ? (
                <span style={{ color: "red" }}>
                  {" "}
                  Ошибка условия аренды! Проверьте в чём указана аренда.
                </span>
              ) : (
                totalAmount + "  BYN"
              )}{" "}
            </p>
          </div>

          <div className="content_booking_down_block1">
            <p className="content_booking_down_block1-p">
              {isNaN(resultSummaArends)
                ? "--"
                : resultSummaArends === 0
                ? "--"
                : resultSummaArends}{" "}
              BYN{" "}
            </p>
            <p
              className="content_booking_down_block1-p"
              style={{ marginLeft: "5px" }}
            >
              {" "}
              аренда{" "}
            </p>
            <p
              className="content_booking_down_block1-p"
              style={{ margin: "0 5px" }}
            >
              {" "}
              (
              <span className="content_booking_down_block1-p">
                {itemData.price_rent} BYN{" "}
                <span
                  className="content_booking_down_block1-p"
                  style={{ margin: "0 2px" }}
                >
                  {" "}
                  /{" "}
                </span>
                {itemData.rent === "День"
                  ? isNaN(resultdate)
                    ? 0 + "сутки(-ок)"
                    : resultdate + "сутки(-ок)"
                  : itemData.rent === "Час"
                  ? isNaN(resulthours)
                    ? 0 + "час(-ов)"
                    : resultdate + "час(-ов)"
                  : ""}
              </span>
              )
            </p>
          </div>

          <div className="content_booking_down_block1">
            <p className="content_booking_down_block1-p">
              {itemData.self_delivery_price === undefined
                ? 0
                : itemData.self_delivery_price === null
                ? 0
                : delivery_Сhoice === "2"
                ? itemData.self_delivery_price
                : 0}{" "}
              BYN
            </p>
            <p
              className="content_booking_down_block1-p"
              style={{ margin: "0 5px" }}
            >
              доставка
            </p>
          </div>

          <div className="content_booking_down_block2">
            <p className="content_booking_down_block1-p">
              {" "}
              {itemData.pledge_price === undefined
                ? 0
                : itemData.pledge_price === null
                ? 0
                : itemData.pledge_price}{" "}
=======

                            <div
                              className="take-away-secondary-wrapper"
                              id="take-away-secondary-wrapper"
                            >
                              <div className="add-item-input-wrapper">
                                <label className="add-item-input-label">
                                  Офис
                                </label>
                                <input
                                  disabled={house || body || flat}
                                  type="text"
                                  className="add-item-input-text__address__house"
                                  value={office}
                                  onChange={(e) => setOffice(e.target.value)}
                                />
                              </div>

                              <div className="add-item-input-wrapper">
                                <label className="add-item-input-label">
                                  Строение
                                </label>
                                <input
                                  disabled={house || body || flat}
                                  type="text"
                                  className="add-item-input-text__address__house"
                                  value={building}
                                  onChange={(e) => setBuilding(e.target.value)}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <input
                        disabled={requestActive}
                        id="save_address"
                        className={
                          requestActive
                            ? "add-item-save-new-address-button disabled"
                            : "add-item-save-new-address-button"
                        }
                        type="button"
                        value={
                          requestActive ? "ОТПРАВКА..." : "Сохранить адрес"
                        }
                        onClick={saveNewAddress}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="card_content_booking_center_down">
            <div className="booking_center_down_block1">
              <img src={People} className="booking_body" />
              <p className="booking_center_down_block1-p">Ваши данные</p>
            </div>
            <div className="booking_center_down_block2">
              <p className="booking_center_down_block2-p">
                Имя <span className="red_star">*</span>
              </p>
              <input
                type="text"
                className="add-item-select-input"
                onChange={(e) => renterBookingNameHandler(e)}
              />
            </div>
            <div className="booking_center_down_block2">
              <p className="booking_center_down_block2-p">
                Номер телефона <span className="red_star">*</span>
              </p>
              <input
                type="number"
                className="add-item-select-input"
                onChange={(e) => renterBookingNumberHandler(e)}
              />
            </div>
            <div className="booking_center_down_block3">
              <p className="booking_center_down_block2-p">
                Сообщение владельцу
              </p>
              <textarea
                className="booking_center_down_block2-textarea"
                onChange={(e) => renterBookingSmsHandler(e)}
              />
            </div>
          </div>
        </div>

        {/* нижний блок  */}
        <div className="card_content_booking_down">
          <div className="content_booking_down_block1">
            <p
              className="content_booking_down_block1-p"
              style={{ marginRight: "5px" }}
            >
              Итоговая стоимость:{" "}
            </p>
            <p className="content_booking_down_block1-p">
              {" "}
              {reservationtime === undefined ? (
                "- BYN"
              ) : resultSummaArends === 0 ? (
                <span style={{ color: "red" }}>
                  {" "}
                  Ошибка условия аренды! Проверьте в чём указана аренда.
                </span>
              ) : reservationendtime <= reservationtime ? (
                <span style={{ color: "red" }}>
                  {" "}
                  Ошибка условия аренды! Проверьте время выбора аренды.
                </span>
              ) : isNaN(totalAmount) ? (
                <span style={{ color: "red" }}>
                  {" "}
                  Ошибка условия аренды! Проверьте в чём указана аренда.
                </span>
              ) : (
                totalAmount + "  BYN"
              )}{" "}
            </p>
          </div>

          <div className="content_booking_down_block1">
            <p className="content_booking_down_block1-p">
              {isNaN(resultSummaArends)
                ? "--"
                : resultSummaArends === 0
                ? "--"
                : resultSummaArends}{" "}
>>>>>>> 455412dcc4219a6ee2ce671b22f22eb637af089d
              BYN{" "}
            </p>
            <p
              className="content_booking_down_block1-p"
<<<<<<< HEAD
              style={{ margin: "0 5px" }}
            >
              залог
            </p>
          </div>
        </div>
      </div>
      {/* кнопка бронированиия */}
      <div className="card_content_booking_btn">
        <button className="booking_btn">Оформить бронирование</button>
      </div>
    </div>
  );
};

=======
              style={{ marginLeft: "5px" }}
            >
              {" "}
              аренда{" "}
            </p>
            <p
              className="content_booking_down_block1-p"
              style={{ margin: "0 5px" }}
            >
              {" "}
              (
              <span className="content_booking_down_block1-p">
                {itemData.price_rent} BYN{" "}
                <span
                  className="content_booking_down_block1-p"
                  style={{ margin: "0 2px" }}
                >
                  {" "}
                  /{" "}
                </span>
                {itemData.rent === "День"
                  ? isNaN(resultdate)
                    ? 0 + "  сутки(-ок)"
                    : resultdate + "сутки(-ок)"
                  : itemData.rent === "Час"
                  ? isNaN(resulthours)
                    ? 0 + "  час(-ов)"
                    : resultdate + "час(-ов)"
                  : ""}
              </span>
              )
            </p>
          </div>

          <div className="content_booking_down_block1">
            <p className="content_booking_down_block1-p">
              {itemData.self_delivery_price === undefined
                ? 0
                : itemData.self_delivery_price === null
                ? 0
                : delivery_Сhoice === "2"
                ? itemData.self_delivery_price
                : 0}{" "}
              BYN
            </p>
            <p
              className="content_booking_down_block1-p"
              style={{ margin: "0 5px" }}
            >
              доставка
            </p>
          </div>

          <div className="content_booking_down_block2">
            <p className="content_booking_down_block1-p">
              {" "}
              {itemData.pledge_price === undefined
                ? 0
                : itemData.pledge_price === null
                ? 0
                : itemData.pledge_price}{" "}
              BYN{" "}
            </p>
            <p
              className="content_booking_down_block1-p"
              style={{ margin: "0 5px" }}
            >
              залог
            </p>
          </div>
        </div>
      </div>
      {/* кнопка бронированиия */}
      <div className="card_content_booking_btn">
        <button className="booking_btn">Оформить бронирование</button>
      </div>
    </div>
  );
};

>>>>>>> 455412dcc4219a6ee2ce671b22f22eb637af089d
export default Booking;
