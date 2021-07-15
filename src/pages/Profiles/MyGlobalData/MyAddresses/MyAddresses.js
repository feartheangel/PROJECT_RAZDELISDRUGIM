import React, { useState } from 'react';
import './MyAddresses.css';
import Vector1 from '../../../../img/ProfilePage/Vector2.png';
import Vector3 from '../../../../img/ProfilePage/Vector3.png';

const MyAddresses = () => {
  const [country, setCountry] = React.useState();
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

  return (
    <div className="container_myAddresses_content">
      {/*ЛЕВАЯ СТОРОНА КОНТЕНТА - 1ый АДРЕСС*/}
      <div className="myAddresses_content_addresses_left">
        <div className="addresses_left_address1">
          <p className="addresses_left_address1_text"> Адрес 1</p>
          <img src={Vector1} />
        </div>

        <div className="take-away-secondary-wrapper-column">
          <div style={{ marginTop: '20px' }} className="add-item-input-wrapper">
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
              Улица/Проспект/Переулок <span className="add-item-span-zvezda">*</span>
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
                Помещение <span className="add-item-span-zvezda">*</span>
              </label>
              <input
                disabled={house || body || flat}
                type="text"
                className="add-item-input-text__address__house__profile"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
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
              <label className="add-item-input-label">Строение</label>
              <input
                disabled={house || body || flat}
                type="text"
                className="add-item-input-text__address__house__profile"
                value={building}
                onChange={(e) => setBuilding(e.target.value)}
              />
            </div>
          </div>
        </div>
        <p className="address1_house_add_addresses" style={{ marginBottom: '20px' }}>
          + Добавить еще адрес
        </p>
        <input
          id="save_address"
          className="add-item-save-new-address-button"
          type="button"
          value="Сохранить"
        />
      </div>

      {/*КНОПКА СОХРАНЕНИЯ*/}
    </div>
  );
};

export default MyAddresses;
