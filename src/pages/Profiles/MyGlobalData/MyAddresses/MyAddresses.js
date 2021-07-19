import React, { useState } from 'react';
import './MyAddresses.css';
import { AddressFields } from '../../../../components/index';
import { useSelector, useDispatch } from 'react-redux';
import Requests from '../../../../http/axios-requests';
import { setAdresses, setQueryStarted, setQueryDone } from '../../../../redux/actions/userData';

const MyAddresses = () => {
  const dispatch = useDispatch();

  const { addresses, requestActive } = useSelector(({ userData }) => userData);

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

  const saveNewAddress = () => {
    if (!area) {
      alert('Не указана область!');
      return;
    } else if (!locality) {
      alert('Не указан населенный пункт!');
      return;
    } else if (!street) {
      alert('Не указана улица!');
      return;
    } else if (!index) {
      alert('Не указан индекс!');
      return;
    } else if (!house && !room) {
      alert('Не указан номер дома либо помещения!');
      return;
    }

    dispatch(setQueryStarted());
    Requests.getCords(
      String(area),
      String(locality),
      String(street),
      String(house),
      String(room),
      String(index),
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
              .split(' ')
              .reverse(),
          )
            .then((response) => {
              Requests.fetchAdresses()
                .then((response) => {
                  dispatch(setAdresses(response.data));
                  setShowAddressAddTable(false);
                  setArea('');
                  setDistrict('');
                  setIndex('');
                  setLocality('');
                  setStreet('');
                  setHouse('');
                  setBody('');
                  setFlat('');
                  setRoom('');
                  setOffice('');
                  setBuilding('');
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
                .catch((e) => alert('Ошибка получения категорий/адресов'));
              alert('Адрес успешно добавлен в профиль!');
            })
            .catch((e) => {
              alert('Не удалось подтвердить адрес, проверьте правильность ввода данных в поля.');
              dispatch(setQueryDone());
            });
        }
      })
      .catch((e) => {
        dispatch(setQueryDone());
        alert('Ошибка сохранения адреса!');
      });
  };

  return (
    <div className="container_myAddresses_content">
      {addresses.map((address, index) => (
        <AddressFields
          addressNumber={index + 1}
          sentCountry={'Беларусь'}
          sentArea={address.area}
          sentLocality={address.city}
          sentDistrict={address.region}
          sentStreet_={address.street}
          sentIndex={address.index}
          sentStreet={address.street}
          sentHouse={address.house}
          sentCorpus={address.corpus}
          sentFlat={address.flat}
          sentSpaceRoom={address.space_room}
          sentOffice={address.office}
          sentBuilding={address.building}
          sentId={address.id}
        />
      ))}
      {addresses.length < 2 && (
        <div style={{ marginBottom: '20px', marginTop: '20px' }} id="dop_parametr_wrapper">
          <input id="dop_parametr" className="add-item-input-checkbox__3" type="checkbox" />
          <label
            onClick={() => setShowAddressAddTable(!showAddressAddTable)}
            htmlFor="dop_parametr">
            + Добавить другой адрес
          </label>
        </div>
      )}

      {showAddressAddTable && (
        <div className="take-away-secondary-wrapper-column">
          <div className="take-away-secondary-wrapper">
            <div className="add-item-input-wrapper">
              <label className="add-item-input-label">
                Область <span className="add-item-span-zvezda">*</span>
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
                Населенный пункт <span className="add-item-span-zvezda">*</span>
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
                className="add-item-input-text__address"
                value={index}
                onChange={(e) => setIndex(e.target.value)}
              />
            </div>
          </div>

          <div className="take-away-secondary-wrapper">
            <div className="take-away-secondary-wrapper">
              <div className="add-item-input-wrapper">
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

              <div className="take-away-secondary-wrapper">
                <div className="add-item-input-wrapper">
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
              <span style={{ marginRight: '30px' }} className="add-item-cost-or__secondary">
                или
              </span>
              <div className="take-away-secondary-wrapper">
                <div className="add-item-input-wrapper">
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

                <div className="take-away-secondary-wrapper">
                  <div className="add-item-input-wrapper">
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
              </div>
            </div>
          </div>
          <input
            disabled={requestActive}
            id="save_address"
            className={
              requestActive
                ? 'add-item-save-new-address-button disabled'
                : 'add-item-save-new-address-button'
            }
            type="button"
            value={requestActive ? 'ОТПРАВКА...' : 'Сохранить адрес'}
            onClick={saveNewAddress}
          />
        </div>
      )}

      {/*КНОПКА СОХРАНЕНИЯ*/}
    </div>
  );
};

export default MyAddresses;
