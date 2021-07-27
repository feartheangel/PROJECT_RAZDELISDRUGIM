import React from 'react';
import Requests from '../../http/axios-requests';
import { reloadData } from '../../redux/actions/userData';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import car from '../../img/MainPage/car.png';
import cardFire from '../../img/MainPage/card-fire.png';
import cardMoney from '../../img/MainPage/card-money.png';
import cardVerify from '../../img/MainPage/card-verify.png';
import Union from '../../img/MainPage/Union.png';
import moneyTime from '../../img/MainPage/money-time.png';
import carDisabled from '../../img/MainPage/car-disabled.png';
import cardFireDisabled from '../../img/MainPage/card-fire-disabled.png';
import cardMoneyDisabled from '../../img/MainPage/card-money-disabled.png';
import cardVerifyDisabled from '../../img/MainPage/card-verify-disabled.png';
import UnionDisabled from '../../img/MainPage/Union-disabled.png';
import moneyTimeDisabled from '../../img/MainPage/money-time-disabled.png';
import yourCost from '../../img/MainPage/yourCost.png';
import freePrice from '../../img/MainPage/freePrice.png';
import copy from '../../img/MainPage/copy.png';
import Delete from '../../img/MainPage/delete.png';
import hide from '../../img/MainPage/hide.png';

const ItemCardProfile = ({
  setDeleteId,
  setModalActiveSubmit,
  key,
  title,
  category_id,
  description,
  image_1,
  image_2,
  image_3,
  image_4,
  image_5,
  rent,
  price_rent,
  key_words,
  year_release,
  mileage,
  price_item,
  receive_time,
  return_time,
  prepare_time,
  delivery,
  delivery_free,
  self_delivery_price,
  will_send,
  will_send_choice,
  send_payer,
  servicefee,
  servicefee_choice,
  servicefee_price,
  pledge,
  pledge_price,
  insurance,
  insurance_choice,
  insurance_price,
  sell,
  contract,
  appointment,
  structure,
  free_rent,
  offer_price_rent,
  color,
  franchise,
  franchise_price,
  article,
  inventory_number,
  coords,
  prepare_time_choice,
  is_hidden,
  items_address,
  id,
}) => {
  const dispatch = useDispatch();
  const { reload } = useSelector(({ userData }) => userData);

  const removeSubjectHandler = () => {
    setDeleteId(id);
    setModalActiveSubmit(true);
  };

  const copyHandler = () => {
    Requests.copySubject(id)
      .then(() => {
        alert('Копия успешно создана!');
        dispatch(reloadData(!reload));
      })
      .catch((e) => alert('Ошибка копирования!'));
  };

  const hideHandler = () => {
    Requests.hideSubject(id)
      .then(() => {
        alert('Вещь успешно скрыта!');
        dispatch(reloadData(!reload));
      })
      .catch((e) => alert('Ошибка скрытия вещи!'));
  };

  const showHandler = () => {
    Requests.showSubject(id)
      .then(() => {
        alert('Вещь успешно показана!');
        dispatch(reloadData(!reload));
      })
      .catch((e) => alert('Ошибка отмены скрытия вещи!'));
  };

  return (
    <div className="recent-block-wrapper">
      <div className="recent-block__profile">
        <img src={`http://razdelisdrugim.by${image_1}`} alt="" className="block-image" />
        <div className="recent-marks">
          {delivery.includes('2') || delivery.includes('3') ? (
            <img src={car} alt="" title="Доставка возможна" className="card-mark" />
          ) : (
            <img src={carDisabled} title="Доставка не предусмотрена" alt="" className="card-mark" />
          )}
          {pledge ? (
            <img src={moneyTime} alt="" title="Предусмотрен залог" className="card-mark" />
          ) : (
            <img src={moneyTimeDisabled} title="Залога нет" alt="" className="card-mark" />
          )}
          {contract ? (
            <img src={Union} title="Составляется договор" alt="" className="card-mark" />
          ) : (
            <img src={UnionDisabled} title="Без лишних бумаг" alt="" className="card-mark" />
          )}
          {insurance ? (
            <img src={cardVerify} title="Предусмотрена страховка" alt="" className="card-mark" />
          ) : (
            <img src={cardVerifyDisabled} title="Без страховки" alt="" className="card-mark" />
          )}
          <img src={cardFireDisabled} title="Акций не предусмотрено" alt="" className="card-mark" />
          {servicefee ? (
            <img src={cardMoney} title="Предусмотрен сервисный сбор" alt="" className="card-mark" />
          ) : (
            <img
              src={cardMoneyDisabled}
              title="Сервисного сбора нет"
              alt=""
              className="card-mark"
            />
          )}
        </div>
        <div style={{ maxWidth: '214px', maxHeight: '60px', overflow: 'hidden' }}>
          <p className="recent-block-title-p">{title}</p>
        </div>
        {!offer_price_rent && !free_rent && (
          <div style={{ marginTop: '10px' }} className="recent-time-cost-wrapper">
            <p className="recent-cost-p">{price_rent} BYN</p>
            <p className="recent-time-p">
              {rent === 'HOUR'
                ? 'Час'
                : rent === 'DAY'
                ? 'Сутки'
                : rent === 'WEEK'
                ? 'Неделя'
                : rent === 'MONTH'
                ? 'Месяц'
                : ''}
            </p>
          </div>
        )}
        {offer_price_rent && (
          <div style={{ marginTop: '10px' }} className="recent-time-cost-wrapper">
            <img style={{ width: '20px', height: '20px' }} src={yourCost} />
            <p style={{ fontSize: '16px', marginLeft: '5px' }} className="recent-time-p">
              Предложить свою цену
            </p>
          </div>
        )}
        {free_rent && (
          <div
            style={{ justifyContent: 'flex-start', marginTop: '10px' }}
            className="recent-time-cost-wrapper">
            <img src={freePrice} />
            <p style={{ marginLeft: '5px' }} className="recent-time-p">
              Бесплатно
            </p>
          </div>
        )}
        <div style={{ marginTop: '20px' }} className={'item-card-profile-buttons'}>
          <a className="item-card-profile-button__edit" href={`/edit-item?id=${id}`}>
            <p>Редактировать</p>
          </a>
          <div className={'item-card-profile-button-wrapper'}>
            <img src={copy} className={'item-card-profile-button-image'} />
            <p
              onClick={copyHandler}
              value="Копировать"
              type="button"
              className="item-card-profile-button__optional">
              Копировать
            </p>
          </div>
          {is_hidden ? (
            <div className={'item-card-profile-button-wrapper'}>
              <img src={hide} className={'item-card-profile-button-image'} />
              <p
                onClick={showHandler}
                value="Показать"
                type="button"
                className="item-card-profile-button__optional">
                Показать
              </p>
            </div>
          ) : (
            <div className={'item-card-profile-button-wrapper'}>
              <img src={hide} className={'item-card-profile-button-image'} />
              <p
                onClick={hideHandler}
                value="Скрыть"
                type="button"
                className="item-card-profile-button__optional">
                Скрыть
              </p>
            </div>
          )}
          <div className={'item-card-profile-button-wrapper'}>
            <img src={Delete} className={'item-card-profile-button-image'} />
            <p
              onClick={removeSubjectHandler}
              value="Удалить"
              type="button"
              className="item-card-profile-button__optional">
              Удалить
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCardProfile;
