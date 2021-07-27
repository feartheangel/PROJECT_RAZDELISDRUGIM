import React from 'react';
import Requests from '../../http/axios-requests';
import { reloadData } from '../../redux/actions/userData';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import car from '../../img/MainPage/car.png';
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

const ItemCard = ({ item }) => {
  return (
    <div className="recent-block-wrapper">
      <div className="recent-block">
        <img src={`http://razdelisdrugim.by${item.image_1}`} alt="" className="block-image" />
        <div className="recent-marks">
          {item.delivery.includes('2') || item.delivery.includes('3') ? (
            <img src={car} alt="" title="Доставка возможна" className="card-mark" />
          ) : (
            <img src={carDisabled} title="Доставка не предусмотрена" alt="" className="card-mark" />
          )}
          {item.pledge ? (
            <img src={moneyTime} alt="" title="Предусмотрен залог" className="card-mark" />
          ) : (
            <img src={moneyTimeDisabled} title="Залога нет" alt="" className="card-mark" />
          )}
          {item.contract ? (
            <img src={Union} title="Составляется договор" alt="" className="card-mark" />
          ) : (
            <img src={UnionDisabled} title="Без лишних бумаг" alt="" className="card-mark" />
          )}
          {item.insurance ? (
            <img src={cardVerify} title="Предусмотрена страховка" alt="" className="card-mark" />
          ) : (
            <img src={cardVerifyDisabled} title="Без страховки" alt="" className="card-mark" />
          )}
          <img src={cardFireDisabled} title="Акций не предусмотрено" alt="" className="card-mark" />
          {item.servicefee ? (
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
          <p className="recent-block-title-p">{item.name_item}</p>
        </div>
        {!item.offer_price_rent && !item.free_rent && (
          <div style={{ marginTop: '10px' }} className="recent-time-cost-wrapper">
            <p className="recent-cost-p">{item.price_rent} BYN</p>
            <p className="recent-time-p">
              {item.rent === 'HOUR'
                ? 'Час'
                : item.rent === 'DAY'
                ? 'Сутки'
                : item.rent === 'WEEK'
                ? 'Неделя'
                : item.rent === 'MONTH'
                ? 'Месяц'
                : ''}
            </p>
          </div>
        )}
        {item.offer_price_rent && (
          <div style={{ marginTop: '10px' }} className="recent-time-cost-wrapper">
            <img style={{ width: '20px', height: '20px' }} src={yourCost} />
            <p style={{ fontSize: '16px', marginLeft: '5px' }} className="recent-time-p">
              Предложить свою цену
            </p>
          </div>
        )}
        {item.free_rent && (
          <div
            style={{ justifyContent: 'flex-start', marginTop: '10px' }}
            className="recent-time-cost-wrapper">
            <img src={freePrice} />
            <p style={{ marginLeft: '5px' }} className="recent-time-p">
              Бесплатно
            </p>
          </div>
        )}
        <p
          style={{
            fontSize: '18px',
            lineHeight: '21px',
            color: 'rgba(9, 29, 32, 0.8)',
            marginTop: '20px',
          }}
          className="recent-block-title-p">
          {item.profile.company_name ? item.profile.company_name : item.profile.first_name}
        </p>
      </div>
    </div>
  );
};

export default ItemCard;
