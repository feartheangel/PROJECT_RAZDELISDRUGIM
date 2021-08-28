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
import Favorites from '../../img/MainPage/Favorites.png';
import FavoritesDisabled from '../../img/MainPage/FavoritesDisabled.png';

const ItemCard = ({ item }) => {
  const dispatch = useDispatch();
  const { reload, favorites } = useSelector(({ userData }) => userData);
  const [isFavorite, setIsFavorite] = React.useState(false);

  const addFavoriteHandler = (e) => {
    e.preventDefault();
    setIsFavorite(true);
    Requests.addFavoriteItem(item.id).then(() => {
      setIsFavorite(true);
    });
  };

  const deleteFavoriteHandler = (e) => {
    e.preventDefault();
    setIsFavorite(false);
    Requests.deleteFavoriteItem(item.id).then(() => {
      setIsFavorite(false);
    });
  };

  React.useEffect(() => {
    favorites &&
      favorites.forEach((elem) => {
        if (elem.item.id === item.id) {
          setIsFavorite(true);
        }
        return;
      });
  }, [favorites]);

  return (
    <div className="recent-block-wrapper ">
      <div className="recent-block-wrapper" id="globaldata_pk">
        <a style={{ textDecoration: 'none' }} href={`/item-card?id=${item.id}`} target="_blank">
          <div style={{ cursor: 'pointer' }} className="recent-block">
            <img src={`https://razdelisdrugim.by${item.image_1}`} alt="" className="block-image" />
            <div className="recent-marks">
              {item.delivery.includes('Привезу и заберу сам') ||
              item.delivery.includes('Доствка курьером') ? (
                <img src={car} alt="" title="Доставка возможна" className="card-mark" />
              ) : (
                <img
                  src={carDisabled}
                  title="Доставка не предусмотрена"
                  alt=""
                  className="card-mark"
                />
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
                <img
                  src={cardVerify}
                  title="Предусмотрена страховка"
                  alt=""
                  className="card-mark"
                />
              ) : (
                <img src={cardVerifyDisabled} title="Без страховки" alt="" className="card-mark" />
              )}
              <img
                src={cardFireDisabled}
                title="Акций не предусмотрено"
                alt=""
                className="card-mark"
              />
              {item.servicefee ? (
                <img
                  src={cardMoney}
                  title="Предусмотрен сервисный сбор"
                  alt=""
                  className="card-mark"
                />
              ) : (
                <img
                  src={cardMoneyDisabled}
                  title="Сервисного сбора нет"
                  alt=""
                  className="card-mark"
                />
              )}
            </div>
            <div className="recent-block-up">
              <p className="recent-block-title-p">{item.name_item}</p>
            </div>
            {!item.offer_price_rent && !item.free_rent && (
              <div style={{ marginTop: '10px' }} className="recent-time-cost-wrapper">
                <p className="recent-cost-p">{item.price_rent} BYN</p>
                <p className="recent-time-p">
                  {item.rent === 'Час'
                    ? 'Час'
                    : item.rent === 'День'
                    ? 'День'
                    : item.rent === 'Неделя'
                    ? 'Неделя'
                    : item.rent === 'Месяц'
                    ? 'Месяц'
                    : ''}
                </p>
              </div>
            )}
            {item.offer_price_rent && (
              <div style={{ marginTop: '10px' }} className="recent-time-cost-wrapper">
                <img style={{ width: '20px', height: '20px' }} src={yourCost} />
                <p className="recent-time-p">Предложить свою цену</p>
              </div>
            )}
            {item.free_rent && (
              <div
                style={{ justifyContent: 'flex-start', marginTop: '10px' }}
                className="recent-time-cost-wrapper">
                <img src={freePrice} />
                <p className="recent-time-p">Бесплатно</p>
              </div>
            )}
            <p className="recent-block-title-p">
              {item.profile.company_name ? item.profile.company_name : item.profile.first_name}
            </p>
            {favorites && !isFavorite && (
              <img
                onClick={(e) => addFavoriteHandler(e)}
                className="itemcard_favorite_img"
                src={FavoritesDisabled}
              />
            )}

            {favorites && isFavorite && (
              <img
                onClick={(e) => deleteFavoriteHandler(e)}
                className="itemcard_favorite_img"
                src={Favorites}
              />
            )}
          </div>
        </a>
      </div>

      {/* МОБИЛЬНАЯ ВЕРСИЯ - ИЗБРАННОЕ В ПРОФИЛЕ */}
      <div className="recent-block-wrapper" id="globaldata_mobile">
        <a
          style={{ textDecoration: 'none' }}
          href={`/item-card?id=${item.id}`}
          target="_blank"
          className="">
          <div style={{ cursor: 'pointer' }} className="recent-block">
            <img src={`https://razdelisdrugim.by${item.image_1}`} alt="" className="block-image" />
            <div className="recent-marks">
              {item.delivery.includes('Привезу и заберу сам') ||
              item.delivery.includes('Доствка курьером') ? (
                <img src={car} alt="" title="Доставка возможна" className="card-mark" />
              ) : (
                <img
                  src={carDisabled}
                  title="Доставка не предусмотрена"
                  alt=""
                  className="card-mark"
                />
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
                <img
                  src={cardVerify}
                  title="Предусмотрена страховка"
                  alt=""
                  className="card-mark"
                />
              ) : (
                <img src={cardVerifyDisabled} title="Без страховки" alt="" className="card-mark" />
              )}
              <img
                src={cardFireDisabled}
                title="Акций не предусмотрено"
                alt=""
                className="card-mark"
              />
              {item.servicefee ? (
                <img
                  src={cardMoney}
                  title="Предусмотрен сервисный сбор"
                  alt=""
                  className="card-mark"
                />
              ) : (
                <img
                  src={cardMoneyDisabled}
                  title="Сервисного сбора нет"
                  alt=""
                  className="card-mark"
                />
              )}
            </div>
            <div className="recent-block-up">
              <p className="recent-block-title-p">{item.name_item}</p>
            </div>
            {!item.offer_price_rent && !item.free_rent && (
              <div style={{ marginTop: '10px' }} className="recent-time-cost-wrapper">
                <p className="recent-cost-p">{item.price_rent} BYN</p>
                <p className="recent-time-p">
                  {item.rent === 'Час'
                    ? 'Час'
                    : item.rent === 'День'
                    ? 'День'
                    : item.rent === 'Неделя'
                    ? 'Неделя'
                    : item.rent === 'Месяц'
                    ? 'Месяц'
                    : ''}
                </p>
              </div>
            )}
            {item.offer_price_rent && (
              <div style={{ marginTop: '10px' }} className="recent-time-cost-wrapper">
                <img style={{ width: '20px', height: '20px' }} src={yourCost} />
                <p className="recent-time-p">Предложить свою цену</p>
              </div>
            )}
            {item.free_rent && (
              <div
                style={{ justifyContent: 'flex-start', marginTop: '10px' }}
                className="recent-time-cost-wrapper">
                <img src={freePrice} />
                <p className="recent-time-p">Бесплатно</p>
              </div>
            )}
            <p className="recent-block-title-p">
              {item.profile.company_name ? item.profile.company_name : item.profile.first_name}
            </p>
            {favorites && !isFavorite && (
              <img
                onClick={(e) => addFavoriteHandler(e)}
                className="itemcard_favorite_img"
                src={FavoritesDisabled}
              />
            )}

            {favorites && isFavorite && (
              <img
                onClick={(e) => deleteFavoriteHandler(e)}
                className="itemcard_favorite_img"
                src={Favorites}
              />
            )}
          </div>
        </a>
      </div>
    </div>
  );
};

export default ItemCard;
