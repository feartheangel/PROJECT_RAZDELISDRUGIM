import React from 'react';
import car from '../../img/MainPage/car.png';
import cardFire from '../../img/MainPage/card-fire.png';
import cardMoney from '../../img/MainPage/card-money.png';
import cardVerify from '../../img/MainPage/card-verify.png';
import Union from '../../img/MainPage/Union.png';
import moneyTime from '../../img/MainPage/money-time.png';
import time from '../../img/MainPage/time.png';
import like from '../../img/MainPage/like.png';
import MacBook from '../../img/MainPage/Macbook.png';

const ItemCard = () => {
  return (
    <div className="recent-block-wrapper">
      <div className="recent-block">
        <img src={MacBook} alt="" className="block-image" />
        <div className="recent-marks">
          <img src={car} alt="" className="card-mark" />
          <img src={cardFire} alt="" className="card-mark" />
          <img src={Union} alt="" className="card-mark" />
          <img src={moneyTime} alt="" className="card-mark" />
          <img src={cardMoney} alt="" className="card-mark" />
          <img src={cardVerify} alt="" className="card-mark" />
        </div>
        <p className="recent-block-title-p">Apple MacBook Air</p>
        <div className="recent-time-cost-wrapper">
          <p className="recent-cost-p">5 BYN</p>
          <p className="recent-time-p">1 час</p>
        </div>
        <p className="recent-user-name-p">Андрей</p>
        <div className="recent-lower-table">
          <div className="recent-status">
            <img src={time} alt="" className="status-img" />
            <p className="status-p">Скоро освободится</p>
          </div>
          <img src={like} alt="" className="recent-lower-like" />
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
