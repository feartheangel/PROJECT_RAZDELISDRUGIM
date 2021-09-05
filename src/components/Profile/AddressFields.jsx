import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setAdresses,
  setQueryStarted,
  setQueryDone,
  reloadData,
} from "../../redux/actions/userData";
import "../../pages/Profiles/MyGlobalData/MyAddresses/MyAddresses.css";
import Vector1 from "../../img/ProfilePage/Vector2.png";
import Vector3 from "../../img/ProfilePage/Vector3.png";
import Requests from "../../http/axios-requests";

const AddressFields = ({
  setModalActiveSubmit,
  setDeleteId,
  addressNumber,
  sentCountry,
  sentArea,
  sentLocality,
  sentDistrict,
  sentStreet,
  sentIndex,
  sentStreet_,
  sentHouse,
  sentCorpus,
  sentFlat,
  sentSpaceRoom,
  sentOffice,
  sentBuilding,
  sentId,
}) => {
  const dispatch = useDispatch();

  const { reload } = useSelector(({ userData }) => userData);

  const addressRemoveHandler = () => {
    setDeleteId(sentId);
    setModalActiveSubmit(true);
  };

  const updateAddressHandler = () => {
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
    } else if (!house && !building) {
      alert("Не указан номер дома либо помещения!");
      return;
    }

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
          Requests.updateAddress(
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
              .reverse(),
            sentId
          )
            .then((response) => {
              Requests.fetchAdresses()
                .then((response) => {
                  dispatch(setAdresses(response.data));
                  dispatch(setQueryDone());
                  alert("Адрес успешно обновлен!");
                  dispatch(reloadData(!reload));
                })
                .catch();
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

  const [country, setCountry] = React.useState(sentCountry);
  const [area, setArea] = React.useState(sentArea);
  const [locality, setLocality] = React.useState(sentLocality);
  const [district, setDistrict] = React.useState(sentDistrict);
  const [street, setStreet] = React.useState(sentStreet_);
  const [index, setIndex] = React.useState(sentIndex);
  const [house, setHouse] = React.useState(sentHouse);
  const [body, setBody] = React.useState(sentCorpus);
  const [flat, setFlat] = React.useState(sentFlat);
  const [room, setRoom] = React.useState(sentSpaceRoom);
  const [office, setOffice] = React.useState(sentOffice);
  const [building, setBuilding] = React.useState(sentBuilding);

  const [showAddressFields, setShowAddressFields] = React.useState(false);

  return (
    <div
      style={{ marginTop: "20px" }}
      className="myAddresses_content_addresses_left"
    >
      {/* пк версия */}
      <div className="addresses_left_address1" id="globaldata_pk">
        <p
          onClick={() => setShowAddressFields(!showAddressFields)}
          className="addresses_left_address1_text"
        >
          {`${sentLocality}, ${sentStreet_}, ${
            sentHouse ? sentHouse : sentSpaceRoom
          }`}
        </p>
        <img
          onClick={() => setShowAddressFields(!showAddressFields)}
          src={Vector1}
        />
        <div style={{ width: "200px" }}>
          <p
            onClick={addressRemoveHandler}
            className="addresses_left_address1_text"
            style={{ color: "red", marginLeft: "30px", fontSize: "16px" }}
          >
            Удалить адрес
          </p>
        </div>
      </div>
      {/* мобайл версия */}
      <div className="addresses_left_address1" id="globaldata_mobile">
        <div className="address_row_style">
          <p
            onClick={() => setShowAddressFields(!showAddressFields)}
            className="addresses_left_address1_text"
          >
            {`${sentLocality}, ${sentStreet_}, ${
              sentHouse ? sentHouse : sentSpaceRoom
            }`}
          </p>
          <img
            onClick={() => setShowAddressFields(!showAddressFields)}
            src={Vector1}
          />
        </div>
        <div style={{ width: "200px" }}>
          <p
            onClick={addressRemoveHandler}
            className="addresses_left_address1_text"
            style={{ color: "red", fontSize: "14px" }}
          >
            Удалить адрес
          </p>
        </div>
      </div>

      {showAddressFields && (
        <div className="take-away-secondary-wrapper-column" id="globaldata_pk">
          <div style={{ marginTop: "20px" }} className="add-item-input-wrapper">
            <label className="add-item-input-label">
              Страна <span className="add-item-span-zvezda">*</span>
            </label>
            <input
              placeholder="Например: Беларусь"
              type="text"
              className="add-item-input-text__address__street"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>

          <div className="add-item-input-wrapper">
            <label className="add-item-input-label">
              Область <span className="add-item-span-zvezda">*</span>
            </label>
            <input
              placeholder="Например: Минская"
              type="text"
              className="add-item-input-text__address__street"
              value={area}
              onChange={(e) => setArea(e.target.value)}
            />
          </div>

          <div className="add-item-input-wrapper">
            <label className="add-item-input-label">
              Населенный пункт <span className="add-item-span-zvezda">*</span>
            </label>
            <input
              placeholder="Например: Минск"
              type="text"
              className="add-item-input-text__address__street"
              value={locality}
              onChange={(e) => setLocality(e.target.value)}
            />
          </div>

          <div className="add-item-input-wrapper">
            <label className="add-item-input-label">Район</label>
            <input
              placeholder="Например: Советский"
              type="text"
              className="add-item-input-text__address__street"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
            />
          </div>
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
              Индекс<span className="add-item-span-zvezda">*</span>
            </label>
            <input
              placeholder="Например: 225417"
              type="text"
              className="add-item-input-text__address__street"
              value={index}
              onChange={(e) => setIndex(e.target.value)}
            />
          </div>

          <div className="take-away-secondary-wrapper">
            <div className="add-item-input-wrapper">
              <label className="add-item-input-label">
                Дом <span className="add-item-span-zvezda">*</span>
              </label>
              <input
                disabled={room || office || building}
                type="text"
                className="add-item-input-text__address__house__profile"
                value={house}
                onChange={(e) => setHouse(e.target.value)}
              />
            </div>

            <div className="add-item-input-wrapper">
              <label className="add-item-input-label">Корпус</label>
              <input
                disabled={room || office || building}
                type="text"
                className="add-item-input-text__address__house__profile"
                value={body}
                onChange={(e) => setBody(e.target.value)}
              />
            </div>

            <div className="add-item-input-wrapper">
              <label className="add-item-input-label">Квартира</label>
              <input
                disabled={room || office || building}
                type="text"
                className="add-item-input-text__address__house__profile"
                value={flat}
                onChange={(e) => setFlat(e.target.value)}
              />
            </div>
          </div>
          <div className="take-away-secondary-wrapper">
            <div className="add-item-input-wrapper">
              <label className="add-item-input-label">
                Строение <span className="add-item-span-zvezda">*</span>
              </label>
              <input
                disabled={house || body || flat}
                type="text"
                className="add-item-input-text__address__house__profile"
                value={building}
                onChange={(e) => setBuilding(e.target.value)}
              />
            </div>

            <div className="add-item-input-wrapper">
              <label className="add-item-input-label">Офис</label>
              <input
                disabled={house || body || flat}
                type="text"
                className="add-item-input-text__address__house__profile"
                value={office}
                onChange={(e) => setOffice(e.target.value)}
              />
            </div>
            <div className="add-item-input-wrapper">
              <label className="add-item-input-label">Помещение</label>
              <input
                disabled={house || body || flat}
                type="text"
                className="add-item-input-text__address__house__profile"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
              />
            </div>
          </div>
          <input
            id="save_address"
            className="add-item-save-new-address-button"
            type="button"
            value="Сохранить"
            onClick={updateAddressHandler}
          />
        </div>
      )}
      {/* МОБИЛЬНАЯ ВЕРСИЯ */}
      {showAddressFields && (
        <div
          className="take-away-secondary-wrapper-column"
          id="globaldata_mobile"
        >
          <div
            style={{ marginTop: "10px", width: "100%" }}
            className="add-item-input-wrapper"
          >
            <label className="add-item-input-label">
              Страна <span className="add-item-span-zvezda">*</span>
            </label>
            <input
              placeholder="Например: Беларусь"
              type="text"
              className="add-item-input-text__address__street"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>

          <div style={{ width: "100%" }} className="add-item-input-wrapper">
            <label className="add-item-input-label">
              Область <span className="add-item-span-zvezda">*</span>
            </label>
            <input
              placeholder="Например: Минская"
              type="text"
              className="add-item-input-text__address__street"
              value={area}
              onChange={(e) => setArea(e.target.value)}
            />
          </div>

          <div style={{ width: "100%" }} className="add-item-input-wrapper">
            <label className="add-item-input-label">
              Населенный пункт <span className="add-item-span-zvezda">*</span>
            </label>
            <input
              placeholder="Например: Минск"
              type="text"
              className="add-item-input-text__address__street"
              value={locality}
              onChange={(e) => setLocality(e.target.value)}
            />
          </div>

          <div style={{ width: "100%" }} className="add-item-input-wrapper">
            <label className="add-item-input-label">Район</label>
            <input
              placeholder="Например: Советский"
              type="text"
              className="add-item-input-text__address__street"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
            />
          </div>
          <div style={{ width: "100%" }} className="add-item-input-wrapper">
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

          <div style={{ width: "100%" }} className="add-item-input-wrapper">
            <label className="add-item-input-label">
              Индекс<span className="add-item-span-zvezda">*</span>
            </label>
            <input
              placeholder="Например: 225417"
              type="text"
              className="add-item-input-text__address__street"
              value={index}
              onChange={(e) => setIndex(e.target.value)}
            />
          </div>

          <div
            className="take-away-secondary-wrapper"
            id="take-away-secondary-wrapper"
          >
            <div className="add-item-input-wrapper" id="add_item_gl_margin">
              <label className="add-item-input-label">
                Дом <span className="add-item-span-zvezda">*</span>
              </label>
              <input
                disabled={room || office || building}
                type="text"
                className="add-item-input-text__address__house"
                value={house}
                onChange={(e) => setHouse(e.target.value)}
              />
            </div>

            <div className="add-item-input-wrapper" id="add_item_gl_margin">
              <label className="add-item-input-label">Корпус</label>
              <input
                disabled={room || office || building}
                type="text"
                className="add-item-input-text__address__house"
                value={body}
                onChange={(e) => setBody(e.target.value)}
              />
            </div>

            <div className="add-item-input-wrapper">
              <label className="add-item-input-label">Квартира</label>
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
            <div className="add-item-input-wrapper" id="add_item_gl_margin">
              <label className="add-item-input-label">
                Помещение <span className="add-item-span-zvezda">*</span>
              </label>
              <input
                disabled={house || body || flat}
                type="text"
                className="add-item-input-text__address__house"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
              />
            </div>

            <div className="add-item-input-wrapper" id="add_item_gl_margin">
              <label className="add-item-input-label">Офис</label>
              <input
                disabled={house || body || flat}
                type="text"
                className="add-item-input-text__address__house"
                value={office}
                onChange={(e) => setOffice(e.target.value)}
              />
            </div>

            <div className="add-item-input-wrapper">
              <label className="add-item-input-label">Строение</label>
              <input
                disabled={house || body || flat}
                type="text"
                className="add-item-input-text__address__house"
                value={building}
                onChange={(e) => setBuilding(e.target.value)}
              />
            </div>
          </div>
          <input
            id="save_address"
            className="add-item-save-new-address-button"
            type="button"
            value="Сохранить"
            onClick={updateAddressHandler}
          />
        </div>
      )}
    </div>
  );
};

export default AddressFields;
