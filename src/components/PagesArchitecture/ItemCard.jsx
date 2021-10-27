import React from "react";
import Requests from "../../http/axios-requests";
import { useSelector } from "react-redux";
import car from "../../img/MainPage/car.webp";
import cardMoney from "../../img/MainPage/card-money.webp";
import cardVerify from "../../img/MainPage/card-verify.webp";
import Union from "../../img/MainPage/Union.webp";
import moneyTime from "../../img/MainPage/money-time.webp";
import carDisabled from "../../img/MainPage/car-disabled.webp";
import cardFireDisabled from "../../img/MainPage/card-fire-disabled.webp";
import cardMoneyDisabled from "../../img/MainPage/card-money-disabled.webp";
import cardVerifyDisabled from "../../img/MainPage/card-verify-disabled.webp";
import UnionDisabled from "../../img/MainPage/Union-disabled.webp";
import moneyTimeDisabled from "../../img/MainPage/money-time-disabled.webp";
import yourCost from "../../img/MainPage/yourCost.webp";
import freePrice from "../../img/MainPage/freePrice.webp";
import Favorites from "../../img/MainPage/Favorites.webp";
import FavoritesDisabled from "../../img/MainPage/FavoritesDisabled.webp";
import EditItemImage from "../../img/MainPage/editicon.webp";
import { rootAddress } from "../../http/axios-requests";
import Loading from "../../img/loading.gif";

const ItemCard = ({ item }) => {
  const { favorites, isLoggedIn, subjects } = useSelector(
    ({ userData }) => userData
  );

  const [isFavorite, setIsFavorite] = React.useState(false);
  const [isOwn, setIsOwn] = React.useState(false);
  const [imageLoaded, setImageLoaded] = React.useState(false);

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

  React.useEffect(() => {
    subjects &&
      subjects.forEach((elem) => {
        if (elem.id === item.id) {
          setIsOwn(true);
        }
      });
  }, [subjects]);

  return (
    <div className="recent-block-wrapper ">
      <div className="recent-block-wrapper" id="globaldata_pk">
        <a
          style={{ textDecoration: "none" }}
          href={`/item-card?id=${item.id}`}
          target="_blank"
          rel="noreferrer"
        >
          <div style={{ cursor: "pointer" }} className="recent-block">
            <img
              onLoad={() => setImageLoaded(true)}
              loading="lazy"
              src={
                imageLoaded
                  ? `${rootAddress}${item.image_1}?random=` + Math.random()
                  : Loading
              }
              alt="razdelisdrugim"
              className="block-image"
            />
            <div className="recent-marks">
              {item.delivery.includes("Привезу и заберу сам") ||
              item.delivery.includes("Доствка курьером") ? (
                <img
                  loading="lazy"
                  alt="razdelisdrugim"
                  src={car}
                  title="Доставка возможна"
                  className="card-mark"
                />
              ) : (
                <img
                  loading="lazy"
                  alt="razdelisdrugim"
                  src={carDisabled}
                  title="Доставка не предусмотрена"
                  className="card-mark"
                />
              )}
              {item.pledge ? (
                <img
                  loading="lazy"
                  alt="razdelisdrugim"
                  src={moneyTime}
                  title="Предусмотрен залог"
                  className="card-mark"
                />
              ) : (
                <img
                  loading="lazy"
                  alt="razdelisdrugim"
                  src={moneyTimeDisabled}
                  title="Залога нет"
                  className="card-mark"
                />
              )}
              {item.contract ? (
                <img
                  loading="lazy"
                  alt="razdelisdrugim"
                  src={Union}
                  title="Составляется договор"
                  className="card-mark"
                />
              ) : (
                <img
                  loading="lazy"
                  alt="razdelisdrugim"
                  src={UnionDisabled}
                  title="Без лишних бумаг"
                  className="card-mark"
                />
              )}
              {item.insurance ? (
                <img
                  loading="lazy"
                  alt="razdelisdrugim"
                  src={cardVerify}
                  title="Предусмотрена страховка"
                  className="card-mark"
                />
              ) : (
                <img
                  loading="lazy"
                  alt="razdelisdrugim"
                  src={cardVerifyDisabled}
                  title="Без страховки"
                  className="card-mark"
                />
              )}
              <img
                loading="lazy"
                alt="razdelisdrugim"
                src={cardFireDisabled}
                title="Акций не предусмотрено"
                className="card-mark"
              />
              {item.servicefee ? (
                <img
                  loading="lazy"
                  alt="razdelisdrugim"
                  src={cardMoney}
                  title="Предусмотрен сервисный сбор"
                  className="card-mark"
                />
              ) : (
                <img
                  loading="lazy"
                  alt="razdelisdrugim"
                  src={cardMoneyDisabled}
                  title="Сервисного сбора нет"
                  className="card-mark"
                />
              )}
            </div>
            <div className="recent-block-up">
              <p className="recent-block-title-p">
                {item.name_item && item.name_item.length > 35
                  ? `${item.name_item.split("").splice(0, 39).join("")}...`
                  : item.name_item}
              </p>
            </div>
            {!item.offer_price_rent && !item.free_rent && (
              <div
                style={{ marginTop: "10px" }}
                className="recent-time-cost-wrapper"
              >
                <p className="recent-cost-p">{item.price_rent} BYN</p>
                <p className="recent-time-p">
                  {item && item.rent === "Час"
                    ? "час"
                    : item && item.rent === "День"
                    ? "день"
                    : item && item.rent === "Неделя"
                    ? "неделю"
                    : item && item.rent === "Месяц"
                    ? "месяц"
                    : item && item.rent === "1шт."
                    ? "штука"
                    : item && item.rent === "1кв.м."
                    ? "1кв.м."
                    : item && item.rent === "1чел."
                    ? "1 чел."
                    : ""}
                </p>
              </div>
            )}
            {item.offer_price_rent && (
              <div
                style={{ marginTop: "10px" }}
                className="recent-time-cost-wrapper"
              >
                <img
                  loading="lazy"
                  alt="razdelisdrugim"
                  style={{ width: "20px", height: "20px" }}
                  src={yourCost}
                />
                <p className="recent-time-p">Предложить свою цену</p>
              </div>
            )}
            {item.free_rent && (
              <div
                style={{ justifyContent: "flex-start", marginTop: "10px" }}
                className="recent-time-cost-wrapper"
              >
                <img alt="razdelisdrugim" src={freePrice} loading="lazy" />
                <p className="recent-time-p">Бесплатно</p>
              </div>
            )}
            <p className="recent-block-title-p">
              {item.profile.company_name
                ? item.profile.company_name
                : item.profile.first_name}
            </p>
            {favorites && !isFavorite && isLoggedIn && !isOwn && (
              <img
                loading="lazy"
                alt="razdelisdrugim"
                onClick={(e) => addFavoriteHandler(e)}
                className="itemcard_favorite_img"
                src={FavoritesDisabled}
              />
            )}

            {favorites && isFavorite && isLoggedIn && !isOwn && (
              <img
                loading="lazy"
                alt="razdelisdrugim"
                onClick={(e) => deleteFavoriteHandler(e)}
                className="itemcard_favorite_img"
                src={Favorites}
              />
            )}

            {isOwn && (
              <img
                loading="lazy"
                alt="razdelisdrugim"
                onClick={(e) =>
                  (window.location.href = `/edit-item?id=${item.id}`)
                }
                className="itemcard_favorite_img"
                src={EditItemImage}
              />
            )}
          </div>
        </a>
      </div>

      {/* МОБИЛЬНАЯ ВЕРСИЯ - ИЗБРАННОЕ В ПРОФИЛЕ */}
      <div className="recent-block-wrapper" id="globaldata_mobile">
        <a
          style={{ textDecoration: "none" }}
          href={`/item-card?id=${item.id}`}
          target="_blank"
          rel="noreferrer"
        >
          <div style={{ cursor: "pointer" }} className="recent-block">
            <img
              onLoad={() => setImageLoaded(true)}
              loading="lazy"
              src={
                imageLoaded
                  ? `${rootAddress}${item.image_1}?random=` + Math.random()
                  : Loading
              }
              className="block-image"
              alt="razdelisdrugim"
            />
            <div className="recent-marks">
              {item.delivery.includes("Привезу и заберу сам") ||
              item.delivery.includes("Доствка курьером") ? (
                <img
                  loading="lazy"
                  alt="razdelisdrugim"
                  src={car}
                  title="Доставка возможна"
                  className="card-mark"
                />
              ) : (
                <img
                  loading="lazy"
                  alt="razdelisdrugim"
                  src={carDisabled}
                  title="Доставка не предусмотрена"
                  className="card-mark"
                />
              )}
              {item.pledge ? (
                <img
                  loading="lazy"
                  alt="razdelisdrugim"
                  src={moneyTime}
                  title="Предусмотрен залог"
                  className="card-mark"
                />
              ) : (
                <img
                  loading="lazy"
                  alt="razdelisdrugim"
                  src={moneyTimeDisabled}
                  title="Залога нет"
                  className="card-mark"
                />
              )}
              {item.contract ? (
                <img
                  loading="lazy"
                  alt="razdelisdrugim"
                  src={Union}
                  title="Составляется договор"
                  className="card-mark"
                />
              ) : (
                <img
                  alt="razdelisdrugim"
                  src={UnionDisabled}
                  title="Без лишних бумаг"
                  className="card-mark"
                />
              )}
              {item.insurance ? (
                <img
                  alt="razdelisdrugim"
                  src={cardVerify}
                  title="Предусмотрена страховка"
                  className="card-mark"
                />
              ) : (
                <img
                  alt="razdelisdrugim"
                  src={cardVerifyDisabled}
                  title="Без страховки"
                  className="card-mark"
                />
              )}
              <img
                alt="razdelisdrugim"
                src={cardFireDisabled}
                title="Акций не предусмотрено"
                className="card-mark"
              />
              {item.servicefee ? (
                <img
                  alt="razdelisdrugim"
                  src={cardMoney}
                  title="Предусмотрен сервисный сбор"
                  className="card-mark"
                />
              ) : (
                <img
                  alt="razdelisdrugim"
                  src={cardMoneyDisabled}
                  title="Сервисного сбора нет"
                  className="card-mark"
                />
              )}
            </div>
            <div className="recent-block-up">
              <p className="recent-block-title-name">
                {item.name_item && item.name_item.length > 25
                  ? `${item.name_item.split("").splice(0, 25).join("")}...`
                  : item.name_item}
              </p>
            </div>
            {!item.offer_price_rent && !item.free_rent && (
              <div
                style={{ marginTop: "10px" }}
                className="recent-time-cost-wrapper"
              >
                <p className="recent-cost-p">{item.price_rent} BYN</p>
                <p className="recent-time-p">
                  {item && item.rent === "Час"
                    ? "час"
                    : item && item.rent === "День"
                    ? "день"
                    : item && item.rent === "Неделя"
                    ? "неделю"
                    : item && item.rent === "Месяц"
                    ? "месяц"
                    : item && item.rent === "1шт."
                    ? "штука"
                    : item && item.rent === "1кв.м."
                    ? "1кв.м."
                    : item && item.rent === "1чел."
                    ? "1 чел."
                    : ""}
                </p>
              </div>
            )}
            {item.offer_price_rent && (
              <div
                style={{ marginTop: "10px" }}
                className="recent-time-cost-wrapper"
              >
                <img
                  alt="razdelisdrugim"
                  style={{ width: "20px", height: "20px" }}
                  src={yourCost}
                />
                <p className="recent-time-p">Предложить свою цену</p>
              </div>
            )}
            {item.free_rent && (
              <div
                style={{ justifyContent: "flex-start", marginTop: "10px" }}
                className="recent-time-cost-wrapper"
              >
                <img alt="razdelisdrugim" src={freePrice} />
                <p className="recent-time-p">Бесплатно</p>
              </div>
            )}
            <p className="recent-block-title-p">
              {item.profile.company_name
                ? item.profile.company_name
                : item.profile.first_name}
            </p>

            <div className="div_favorites">
              {favorites && !isFavorite && isLoggedIn && !isOwn && (
                <img
                  alt="razdelisdrugim"
                  onClick={(e) => addFavoriteHandler(e)}
                  className="itemcard_favorite_img"
                  src={FavoritesDisabled}
                />
              )}

              {favorites && isFavorite && isLoggedIn && !isOwn && (
                <img
                  alt="razdelisdrugim"
                  onClick={(e) => deleteFavoriteHandler(e)}
                  className="itemcard_favorite_img"
                  src={Favorites}
                />
              )}

              {isOwn && (
                <img
                  alt="razdelisdrugim"
                  onClick={(e) =>
                    (window.location.href = `/edit-item?id=${item.id}`)
                  }
                  className="itemcard_favorite_img"
                  src={EditItemImage}
                />
              )}
            </div>
          </div>
        </a>
      </div>

      {/* планшет  - ИЗБРАННОЕ В ПРОФИЛЕ */}
      <div className="recent-block-wrapper" id="swiper_mobile_800">
        <a
          style={{ textDecoration: "none" }}
          href={`/item-card?id=${item.id}`}
          target="_blank"
          rel="noreferrer"
        >
          <div style={{ cursor: "pointer" }} className="recent-block">
            <img
              onLoad={() => setImageLoaded(true)}
              loading="lazy"
              src={
                imageLoaded
                  ? `${rootAddress}${item.image_1}?random=` + Math.random()
                  : Loading
              }
              className="block-image"
              alt="razdelisdrugim"
            />
            <div className="recent-marks">
              {item.delivery.includes("Привезу и заберу сам") ||
              item.delivery.includes("Доствка курьером") ? (
                <img
                  alt="razdelisdrugim"
                  src={car}
                  title="Доставка возможна"
                  className="card-mark"
                />
              ) : (
                <img
                  alt="razdelisdrugim"
                  src={carDisabled}
                  title="Доставка не предусмотрена"
                  className="card-mark"
                />
              )}
              {item.pledge ? (
                <img
                  alt="razdelisdrugim"
                  src={moneyTime}
                  title="Предусмотрен залог"
                  className="card-mark"
                />
              ) : (
                <img
                  alt="razdelisdrugim"
                  src={moneyTimeDisabled}
                  title="Залога нет"
                  className="card-mark"
                />
              )}
              {item.contract ? (
                <img
                  alt="razdelisdrugim"
                  src={Union}
                  title="Составляется договор"
                  className="card-mark"
                />
              ) : (
                <img
                  alt="razdelisdrugim"
                  src={UnionDisabled}
                  title="Без лишних бумаг"
                  className="card-mark"
                />
              )}
              {item.insurance ? (
                <img
                  alt="razdelisdrugim"
                  src={cardVerify}
                  title="Предусмотрена страховка"
                  className="card-mark"
                />
              ) : (
                <img
                  alt="razdelisdrugim"
                  src={cardVerifyDisabled}
                  title="Без страховки"
                  className="card-mark"
                />
              )}
              <img
                alt="razdelisdrugim"
                src={cardFireDisabled}
                title="Акций не предусмотрено"
                className="card-mark"
              />
              {item.servicefee ? (
                <img
                  alt="razdelisdrugim"
                  src={cardMoney}
                  title="Предусмотрен сервисный сбор"
                  className="card-mark"
                />
              ) : (
                <img
                  alt="razdelisdrugim"
                  src={cardMoneyDisabled}
                  title="Сервисного сбора нет"
                  className="card-mark"
                />
              )}
            </div>
            <div className="recent-block-up">
              <p className="recent-block-title-name">
                {item.name_item && item.name_item.length > 26
                  ? `${item.name_item
                      .split("")
                      .splice(0, item.name_item.length - 10)
                      .join("")}...`
                  : item.name_item}
              </p>
            </div>
            {!item.offer_price_rent && !item.free_rent && (
              <div
                style={{ marginTop: "10px" }}
                className="recent-time-cost-wrapper"
              >
                <p className="recent-cost-p">{item.price_rent} BYN</p>
                <p className="recent-time-p">
                  {item && item.rent === "Час"
                    ? "час"
                    : item && item.rent === "День"
                    ? "день"
                    : item && item.rent === "Неделя"
                    ? "неделю"
                    : item && item.rent === "Месяц"
                    ? "месяц"
                    : item && item.rent === "1шт."
                    ? "штуку"
                    : item && item.rent === "1кв.м."
                    ? "1кв.м."
                    : item && item.rent === "1чел."
                    ? "1 чел."
                    : ""}
                </p>
              </div>
            )}
            {item.offer_price_rent && (
              <div
                style={{ marginTop: "10px" }}
                className="recent-time-cost-wrapper"
              >
                <img
                  alt="razdelisdrugim"
                  style={{ width: "20px", height: "20px" }}
                  src={yourCost}
                />
                <p className="recent-time-p">Предложить свою цену</p>
              </div>
            )}
            {item.free_rent && (
              <div
                style={{ justifyContent: "flex-start", marginTop: "10px" }}
                className="recent-time-cost-wrapper"
              >
                <img alt="razdelisdrugim" src={freePrice} />
                <p className="recent-time-p">Бесплатно</p>
              </div>
            )}
            <p className="recent-block-title-p">
              {item.profile.company_name
                ? item.profile.company_name
                : item.profile.first_name}
            </p>

            <div className="div_favorites">
              {favorites && !isFavorite && isLoggedIn && !isOwn && (
                <img
                  alt="razdelisdrugim"
                  onClick={(e) => addFavoriteHandler(e)}
                  className="itemcard_favorite_img"
                  src={FavoritesDisabled}
                />
              )}

              {favorites && isFavorite && isLoggedIn && !isOwn && (
                <img
                  alt="razdelisdrugim"
                  onClick={(e) => deleteFavoriteHandler(e)}
                  className="itemcard_favorite_img"
                  src={Favorites}
                />
              )}

              {isOwn && (
                <img
                  alt="razdelisdrugim"
                  onClick={(e) =>
                    (window.location.href = `/edit-item?id=${item.id}`)
                  }
                  className="itemcard_favorite_img"
                  src={EditItemImage}
                />
              )}
            </div>
          </div>
        </a>
      </div>
    </div>
  );
};

export default ItemCard;
