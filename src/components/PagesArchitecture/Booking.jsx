/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import ru from "date-fns/locale/ru";
import {
  setAdresses,
  setQueryStarted,
  setQueryDone,
  reloadData,
} from "../../redux/actions/userData";
import { useSelector, useDispatch } from "react-redux";
import HandShake from "../../img/CardThings/RightContent/handShake1.png";
import Car from "../../img/CardThings/RightContent/Vector3.png";
import freePrice from "../../img/MainPage/freePrice.png";
import Requests from "../../http/axios-requests";
import Calendar from "../../img/CardThings/Booking/Union.png";
import { rootAddress } from "../../http/axios-requests";
import metka from "../../img/CardThings/Booking/Union1.png";
import People from "../../img/CardThings/Booking/body.png";

registerLocale("ru", ru);

const Booking = ({ itemData, setSelectedImage, selectedImage }) => {
  const dispatch = useDispatch();
  const { isLoggedIn, addresses, requestActive, userData } = useSelector(
    ({ userData }) => userData
  );
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
  const [radioBooking, setRadioBooking] = React.useState();
  const [renterBookingName, setRenterBookingName] = React.useState(
    userData.first_name
  );
  const [renterBookingNumber, setRenterBookingNumber] = React.useState(
    Number(userData.phone)
  );
  const [renterBookingSms, setRenterBookingSms] = React.useState();

  const [delivery_Сhoice, setDelivery_Сhoice] = React.useState();

  // минимальное время бронирования(дата и время сейчас)
  var datetimeminbooking = new Date().toJSON().slice(0, 16);
  // для дней мин время
  var dateminbooking = new Date().toJSON().slice(0, 10);

  const time = new Date();
  const [startDate, setStartDate] = React.useState();
  const [endDate, setEndDate] = React.useState();

  const filterPassedTime = (date) => {
    // Disable no works hours
    if (
      date.getHours() === 22 ||
      date.getHours() === 23 ||
      date.getHours() === 0 ||
      date.getHours() === 1 ||
      date.getHours() === 2 ||
      date.getHours() === 3 ||
      date.getHours() === 4 ||
      date.getHours() === 5 ||
      date.getHours() === 6 ||
      date.getHours() === 7
    ) {
      return false;
    } else {
      return true;
    }
  };

  // дни
  var diffday = Math.floor(
    (Date.parse(endDate) - Date.parse(startDate)) / 86400000
  );
  // hours
  var diffhours = Math.floor(
    (Date.parse(endDate) - Date.parse(startDate)) / 3600000
  );
  // week
  var diffweek = Math.floor(
    (Date.parse(endDate) - Date.parse(startDate)) / 604800000
  );

  // months
  var diffmonths = Math.floor(
    (Date.parse(endDate) - Date.parse(startDate)) / 2592000000
  );
  // years
  var diffyears = Math.floor(
    (Date.parse(endDate) - Date.parse(startDate)) / 31104000000
  );

  // расчёт времени бронирования
  var resulthours = diffhours;
  var resultdate = diffday;
  var resultweek = diffweek;
  var resultmonths = diffmonths;
  var resultyears = diffyears;

  // расчёт суммы бронирования если день/час аренды
  const resultSummaArends = Math.round(
    itemData.rent === "День"
      ? resultdate * itemData.price_rent
      : itemData.rent === "Час"
      ? resulthours * itemData.price_rent
      : itemData.rent === "Неделя"
      ? resultweek * itemData.price_rent
      : itemData.rent === "Месяц"
      ? resultmonths * itemData.price_rent
      : null
  );
  //  расчёт итоговой суммы
  const totalAmount =
    resultSummaArends +
    (itemData.pledge_price !== null ? itemData.pledge_price : 0) +
    (itemData.self_delivery_price !== null && radioBooking === "2"
      ? itemData.self_delivery_price
      : 0);

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

  const handleBooking = () => {
    Requests.createBooking(
      renterBookingName,
      renterBookingNumber,
      renterBookingSms,
      startDate,
      endDate,
      itemData.id,
      itemData.profile.id,
      userData.id,
      radioBooking
    );
  };

  return (
    <div>
      <div className="card_content_booking" id="card_thing_pc">
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
                    {!serviceIds.includes(
                      itemData && itemData.category_id.id
                    ) && "в аренду"}
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
                    <div className="information_all_down_left_date">
                      <img className="booking_calendar" src={Calendar} />
                      {((itemData && itemData.rent === "День") ||
                        (itemData && itemData.rent === "Неделя") ||
                        (itemData && itemData.rent === "Месяц")) && (
                        <div className="form-group">
                          <label
                            className="information_all_down_left_date-p"
                            htmlFor="booking_date_input"
                          >
                            <input
                              id="booking_date_input"
                              type="date"
                              min={dateminbooking}
                              className="booking_input_date"
                              onChange={(e) => setStartDate(e.target.value)}
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
                              type="date"
                              min={dateminbooking}
                              disabled={startDate === undefined}
                              className="booking_input_date"
                              onChange={(e) => setEndDate(e.target.value)}
                            />
                          </label>
                        </div>
                      )}
                      {itemData && itemData.rent === "Час" && (
                        <div className="form-group" style={{ display: "flex" }}>
                          <label
                            className="information_all_down_left_date-p"
                            htmlFor="booking_date_input"
                          >
                            <DatePicker
                              id="booking_date_input"
                              className="booking_input_date"
                              selected={startDate}
                              onChange={(date) => setStartDate(date)}
                              showTimeSelect
                              locale="ru"
                              dateFormat="Pp"
                              timeFormat="HH:mm"
                              timeIntervals={15}
                              minDate={new Date()}
                              timeInputLabel="Time:"
                              filterTime={filterPassedTime}
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
                            <DatePicker
                              id="booking_date_end_input"
                              className="booking_input_date"
                              selected={endDate}
                              onChange={(date) => setEndDate(date)}
                              disabled={startDate === undefined}
                              showTimeSelect
                              locale="ru"
                              dateFormat="Pp"
                              timeFormat="HH:mm"
                              timeIntervals={15}
                              minDate={new Date()}
                              timeInputLabel="Time:"
                              filterTime={filterPassedTime}
                            />
                          </label>
                        </div>
                      )}
                    </div>
                    {Number.isNaN(resultdate) ? (
                      ""
                    ) : (
                      <p className="information_all_down_left_alldate">
                        {itemData && itemData.rent === "День" && (
                          <p className="information_all_down_left_alldate">
                            {resultdate} сутки(-ок)
                          </p>
                        )}
                        {itemData && itemData.rent === "Час" && (
                          <p className="information_all_down_left_alldate">
                            {resulthours} час(-ов)
                          </p>
                        )}
                        {itemData && itemData.rent === "Неделя" && (
                          <p className="information_all_down_left_alldate">
                            {resultweek} Неделя(-ли)
                          </p>
                        )}
                        {itemData && itemData.rent === "Месяц" && (
                          <p className="information_all_down_left_alldate">
                            {resultmonths} Месяц(-ев)
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
                              Время получения
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
                              Время возврата
                            </p>
                          </div>
                          <p className="conditions_timeItem-p1">
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
                  <p className="booking_center_up_block_left-p">
                    {" "}
                    Вид доставки
                  </p>
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
                            <label className="add-item-input-label">
                              Район
                            </label>
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
                                  <span className="add-item-span-zvezda">
                                    *
                                  </span>
                                </label>
                                <input
                                  disabled={house || body || flat}
                                  type="text"
                                  className="add-item-input-text__address__house"
                                  value={room}
                                  onChange={(e) => setRoom(e.target.value)}
                                />
                              </div>

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
                                    onChange={(e) =>
                                      setBuilding(e.target.value)
                                    }
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
                  defaultValue={userData.first_name}
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
                  defaultValue={Number(userData.phone)}
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
                {startDate === undefined ? (
                  "-- BYN"
                ) : startDate <= time ? (
                  <span style={{ color: "red" }}>
                    {" "}
                    Ошибка! (Стартовое время ввода либо меньше настоящего
                    времени либо равное времени завершения аренды...){" "}
                  </span>
                ) : (resulthours <= 0 || resulthours > 23) &&
                  itemData.rent === "Час" ? (
                  <span style={{ color: "red" }}> Ошибка времени аренды! </span>
                ) : (resulthours !== 0 || resulthours <= 23) &&
                  itemData.rent === "Час" ? (
                  totalAmount + "  BYN"
                ) : (resultdate <= 0 || resultdate > 30) &&
                  itemData.rent === "День" ? (
                  <span style={{ color: "red" }}> Ошибка времени аренды! </span>
                ) : (resultdate !== 0 || resultdate <= 30) &&
                  itemData.rent === "День" ? (
                  totalAmount + "  BYN"
                ) : (resultweek <= 0 || resultweek > 4) &&
                  itemData.rent === "Неделя" ? (
                  <span style={{ color: "red" }}> Ошибка времени аренды! </span>
                ) : (resultweek !== 0 || resultweek <= 4) &&
                  itemData.rent === "Неделя" ? (
                  totalAmount + "  BYN"
                ) : (resultmonths <= 0 || resultmonths > 12) &&
                  itemData.rent === "Месяц" ? (
                  <span style={{ color: "red" }}> Ошибка времени аренды! </span>
                ) : (resultmonths !== 0 || resultmonths <= 12) &&
                  itemData.rent === "Месяц" ? (
                  totalAmount + "  BYN"
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
                  : resultSummaArends <= 0
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
                    x{" "}
                  </span>
                  {itemData.rent === "День"
                    ? isNaN(resultdate)
                      ? 0 + " сут"
                      : resultdate + " сут"
                    : ""}
                  {itemData.rent === "Час"
                    ? isNaN(resulthours)
                      ? 0 + " час"
                      : resultdate + " час"
                    : ""}
                  {itemData.rent === "Неделя"
                    ? isNaN(resultweek)
                      ? 0 + " нед"
                      : resultweek + " нед"
                    : ""}
                  {itemData.rent === "Месяц"
                    ? isNaN(resultmonths)
                      ? 0 + " мес"
                      : resultmonths + " мес"
                    : ""}
                </span>
                )
              </p>
            </div>

            {delivery_Сhoice === "2" && (
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
            )}

            {itemData.pledge_price > 0 && (
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
                  возвратный залог
                </p>
              </div>
            )}
          </div>
        </div>
        {/* кнопка бронированиия */}
        <div className="card_content_booking_btn">
          <button className="booking_btn">Запросить бронирование</button>
        </div>
      </div>

      {/*  мобильная версия */}
      <div className="card_content_booking" id="card_thing_mobile">
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
                    {!serviceIds.includes(
                      itemData && itemData.category_id.id
                    ) && "в аренду"}
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
                            style={{ marginRight: "10px", fontWeight: "500" }}
                            className="block_up_yourCost-p1"
                          >
                            <span style={{ fontWeight: "500" }}>
                              {itemData && itemData.price_rent}
                            </span>{" "}
                            BYN
                          </p>
                          <p
                            style={{ marginRight: "10px", fontWeight: "500" }}
                            className="block_up_yourCost-p1"
                          >
                            /
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
                    <div className="information_all_down_left_date">
                      <img className="booking_calendar" src={Calendar} />
                      {((itemData && itemData.rent === "День") ||
                        (itemData && itemData.rent === "Неделя") ||
                        (itemData && itemData.rent === "Месяц")) && (
                        <div className="form-group">
                          <label
                            className="information_all_down_left_date-p"
                            htmlFor="booking_date_input"
                          >
                            <input
                              id="booking_date_input"
                              type="date"
                              min={dateminbooking}
                              className="booking_input_date"
                              onChange={(e) => setStartDate(e.target.value)}
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
                              type="date"
                              min={dateminbooking}
                              disabled={startDate === undefined}
                              className="booking_input_date"
                              onChange={(e) => setEndDate(e.target.value)}
                            />
                          </label>
                        </div>
                      )}
                      {itemData && itemData.rent === "Час" && (
                        <div className="form-group" style={{ display: "flex" }}>
                          <label
                            className="information_all_down_left_date-p"
                            htmlFor="booking_date_input"
                          >
                            <DatePicker
                              id="booking_date_input"
                              className="booking_input_date"
                              selected={startDate}
                              onChange={(date) => setStartDate(date)}
                              showTimeSelect
                              locale="ru"
                              dateFormat="Pp"
                              timeFormat="HH:mm"
                              timeIntervals={15}
                              minDate={new Date()}
                              timeInputLabel="Time:"
                              filterTime={filterPassedTime}
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
                            <DatePicker
                              id="booking_date_end_input"
                              className="booking_input_date"
                              selected={endDate}
                              onChange={(date) => setEndDate(date)}
                              disabled={startDate === undefined}
                              showTimeSelect
                              locale="ru"
                              dateFormat="Pp"
                              timeFormat="HH:mm"
                              timeIntervals={15}
                              minDate={new Date()}
                              timeInputLabel="Time:"
                              filterTime={filterPassedTime}
                            />
                          </label>
                        </div>
                      )}
                    </div>
                    {Number.isNaN(resultdate) ? (
                      ""
                    ) : (
                      <p className="information_all_down_left_alldate">
                        {itemData && itemData.rent === "День" && (
                          <p className="information_all_down_left_alldate">
                            {resultdate} сутки(-ок)
                          </p>
                        )}
                        {itemData && itemData.rent === "Час" && (
                          <p className="information_all_down_left_alldate">
                            {resulthours} час(-ов)
                          </p>
                        )}
                        {itemData && itemData.rent === "Неделя" && (
                          <p className="information_all_down_left_alldate">
                            {resultweek} Неделя(-ли)
                          </p>
                        )}
                        {itemData && itemData.rent === "Месяц" && (
                          <p className="information_all_down_left_alldate">
                            {resultmonths} Месяц(-ев)
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
                              Время получения
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
                              Время возврата
                            </p>
                          </div>
                          <p className="conditions_timeItem-p1">
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
                  <p className="booking_center_up_block_left-p">
                    {" "}
                    Вид доставки
                  </p>
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
                            <label className="add-item-input-label">
                              Район
                            </label>
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

                        {/* МОБИЛЬНАЯ ВЕРСИЯ ( дом квартира и тд ) */}

                        <div
                          className="take-away-secondary-wrapper"
                          id="globaldata_mobile"
                        >
                          <div
                            className="take-away-secondary-wrapper"
                            id="take-away-secondary-wrapper"
                          >
                            <div
                              className="take-away-secondary-wrapper"
                              id="take-away-secondary-wrapper"
                            >
                              <div
                                className="add-item-input-wrapper"
                                id="add_item_gl_margin"
                              >
                                <label className="add-item-input-label">
                                  Дом{" "}
                                  <span className="add-item-span-zvezda">
                                    *
                                  </span>
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
                                className="add-item-input-wrapper"
                                id="add_item_gl_margin"
                              >
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

                            <div
                              className="take-away-secondary-wrapper"
                              id="take-away-secondary-wrapper"
                            >
                              <div
                                className="take-away-secondary-wrapper"
                                id="take-away-secondary-wrapper"
                              >
                                <div
                                  className="add-item-input-wrapper"
                                  id="add_item_gl_margin"
                                >
                                  <label className="add-item-input-label">
                                    Помещение{" "}
                                    <span className="add-item-span-zvezda">
                                      *
                                    </span>
                                  </label>
                                  <input
                                    disabled={house || body || flat}
                                    type="text"
                                    className="add-item-input-text__address__house"
                                    value={room}
                                    onChange={(e) => setRoom(e.target.value)}
                                  />
                                </div>
                                <div
                                  className="add-item-input-wrapper"
                                  id="add_item_gl_margin"
                                >
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
                                    onChange={(e) =>
                                      setBuilding(e.target.value)
                                    }
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
                  defaultValue={userData.first_name}
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
                  defaultValue={Number(userData.phone)}
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
                {startDate === undefined ? (
                  "-- BYN"
                ) : startDate <= time ? (
                  <span style={{ color: "red" }}>
                    {" "}
                    Ошибка! (Стартовое время ввода либо меньше настоящего
                    времени либо равное времени завершения аренды...){" "}
                  </span>
                ) : (resulthours <= 0 || resulthours > 23) &&
                  itemData.rent === "Час" ? (
                  <span style={{ color: "red" }}> Ошибка времени аренды! </span>
                ) : (resulthours !== 0 || resulthours <= 23) &&
                  itemData.rent === "Час" ? (
                  totalAmount + "  BYN"
                ) : (resultdate <= 0 || resultdate > 30) &&
                  itemData.rent === "День" ? (
                  <span style={{ color: "red" }}> Ошибка времени аренды! </span>
                ) : (resultdate !== 0 || resultdate <= 30) &&
                  itemData.rent === "День" ? (
                  totalAmount + "  BYN"
                ) : (resultweek <= 0 || resultweek > 4) &&
                  itemData.rent === "Неделя" ? (
                  <span style={{ color: "red" }}> Ошибка времени аренды! </span>
                ) : (resultweek !== 0 || resultweek <= 4) &&
                  itemData.rent === "Неделя" ? (
                  totalAmount + "  BYN"
                ) : (resultmonths <= 0 || resultmonths > 12) &&
                  itemData.rent === "Месяц" ? (
                  <span style={{ color: "red" }}> Ошибка времени аренды! </span>
                ) : (resultmonths !== 0 || resultmonths <= 12) &&
                  itemData.rent === "Месяц" ? (
                  totalAmount + "  BYN"
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
                  : resultSummaArends <= 0
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
                    x{" "}
                  </span>
                  {itemData.rent === "День"
                    ? isNaN(resultdate)
                      ? 0 + " сут"
                      : resultdate + " сут"
                    : ""}
                  {itemData.rent === "Час"
                    ? isNaN(resulthours)
                      ? 0 + " час"
                      : resultdate + " час"
                    : ""}
                  {itemData.rent === "Неделя"
                    ? isNaN(resultweek)
                      ? 0 + " нед"
                      : resultweek + " нед"
                    : ""}
                  {itemData.rent === "Месяц"
                    ? isNaN(resultmonths)
                      ? 0 + " мес"
                      : resultmonths + " мес"
                    : ""}
                </span>
                )
              </p>
            </div>

            {delivery_Сhoice === "2" && (
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
            )}

            {itemData.pledge_price > 0 && (
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
                  возвратный залог
                </p>
              </div>
            )}
          </div>
        </div>
        {/* кнопка бронированиия */}
        <div className="card_content_booking_btn">
          <button className="booking_btn">Запросить бронирование</button>
        </div>
      </div>
    </div>
  );
};

export default Booking;
