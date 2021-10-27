import React from "react";
import Requests from "../../http/axios-requests";
import { reloadData } from "../../redux/actions/userData";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
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
import copy from "../../img/MainPage/copy.webp";
import Delete from "../../img/MainPage/delete.webp";
import hide from "../../img/MainPage/hide.webp";
import { rootAddress } from "../../http/axios-requests";
import Loading from "../../img/loading.gif";

const ItemCardProfile = ({
  setDeleteId,
  setModalActiveSubmit,
  title,
  image_1,
  rent,
  price_rent,
  delivery,
  servicefee,
  pledge,
  insurance,
  contract,
  free_rent,
  offer_price_rent,
  is_hidden,
  id,
}) => {
  const dispatch = useDispatch();
  const { reload } = useSelector(({ userData }) => userData);
  const [redirect, setRedirect] = React.useState();

  const removeSubjectHandler = () => {
    setDeleteId(id);
    setModalActiveSubmit(true);
  };

  const copyHandler = () => {
    Requests.copySubject(id)
      .then(() => {
        console.log("Копия успешно создана!");
        dispatch(reloadData(!reload));
      })
      .catch((e) => {
        dispatch(reloadData(!reload));
        console.log("Ошибка копирования!");
      });
  };

  const hideHandler = () => {
    Requests.hideSubject(id)
      .then(() => {
        console.log("Вещь успешно скрыта!");
        dispatch(reloadData(!reload));
      })
      .catch((e) => {
        dispatch(reloadData(!reload));
        console.log("Ошибка скрытия вещи!");
      });
  };

  const showHandler = () => {
    Requests.showSubject(id)
      .then(() => {
        console.log("Вещь успешно показана!");
        dispatch(reloadData(!reload));
      })
      .catch((e) => {
        dispatch(reloadData(!reload));
        console.log("Ошибка отмены скрытия вещи!");
      });
  };

  const [imageLoaded, setImageLoaded] = React.useState(false);

  return (
    <div className="recent-block-wrapper recent-block-wrapper-gl">
      <div className="recent-block-wrapper" id="globaldata_pk">
        <div className="recent-block__profile">
          <img
            alt="razdelisdrugim"
            style={{ cursor: "pointer" }}
            onClick={() => setRedirect(<Redirect to={`/item-card?id=${id}`} />)}
            src={imageLoaded ? `data:image/png;base64,${image_1}` : Loading}
            onLoad={() => setImageLoaded(true)}
            className="block-image"
          />
          <div className="recent-marks">
            {delivery.includes("Привезу и заберу сам") ||
            delivery.includes("Доставка курьером") ? (
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
            {pledge ? (
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
            {contract ? (
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
            {insurance ? (
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
            {servicefee ? (
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
          <div
            style={{ width: "214px", height: "60px" }}
            className="recent_block_title_div"
          >
            <p
              style={{
                cursor: "pointer",
                lineBreak: "anywhere",
              }}
              onClick={() =>
                setRedirect(<Redirect to={`/item-card?id=${id}`} />)
              }
              className="recent-block-title-p"
            >
              {title.length > 35
                ? `${title.split("").splice(0, 39).join("")}...`
                : title}
            </p>
          </div>
          {!offer_price_rent && !free_rent && (
            <div
              style={{ marginTop: "10px" }}
              className="recent-time-cost-wrapper"
            >
              <p className="recent-cost-p">{price_rent} BYN</p>
              <p className="recent-time-p">
                {rent === "Час"
                  ? "час"
                  : rent === "День"
                  ? "день"
                  : rent === "Неделя"
                  ? "неделю"
                  : rent === "Месяц"
                  ? "месяц"
                  : rent === "1шт."
                  ? "штуку"
                  : rent === "1кв.м."
                  ? "1кв.м."
                  : rent === "1чел."
                  ? "1 чел."
                  : ""}
              </p>
            </div>
          )}
          {redirect}
          {offer_price_rent && (
            <div
              style={{ marginTop: "10px" }}
              className="recent-time-cost-wrapper"
            >
              <img
                alt="razdelisdrugim"
                style={{ width: "20px", height: "20px" }}
                src={yourCost}
              />
              <p
                style={{ fontSize: "16px", marginLeft: "5px" }}
                className="recent-time-p"
              >
                Предложить свою цену
              </p>
            </div>
          )}
          {free_rent && (
            <div
              style={{ justifyContent: "flex-start", marginTop: "10px" }}
              className="recent-time-cost-wrapper"
            >
              <img alt="razdelisdrugim" src={freePrice} />
              <p style={{ marginLeft: "5px" }} className="recent-time-p">
                Бесплатно
              </p>
            </div>
          )}
          <div
            style={{ marginTop: "20px" }}
            className={"item-card-profile-buttons"}
          >
            <a
              className="item-card-profile-button__edit"
              href={`/edit-item?id=${id}`}
            >
              <p>Редактировать</p>
            </a>
            <div className={"item-card-profile-button-wrapper"}>
              <img
                alt="razdelisdrugim"
                src={copy}
                className={"item-card-profile-button-image"}
              />
              <p
                onClick={copyHandler}
                value="Копировать"
                type="button"
                className="item-card-profile-button__optional"
              >
                Копировать
              </p>
            </div>
            {is_hidden ? (
              <div className={"item-card-profile-button-wrapper"}>
                <img
                  alt="razdelisdrugim"
                  src={hide}
                  className={"item-card-profile-button-image"}
                />
                <p
                  onClick={showHandler}
                  value="Показать"
                  type="button"
                  className="item-card-profile-button__optional"
                >
                  Показать
                </p>
              </div>
            ) : (
              <div className={"item-card-profile-button-wrapper"}>
                <img
                  alt="razdelisdrugim"
                  src={hide}
                  className={"item-card-profile-button-image"}
                />
                <p
                  onClick={hideHandler}
                  value="Скрыть"
                  type="button"
                  className="item-card-profile-button__optional"
                >
                  Скрыть
                </p>
              </div>
            )}
            <div className={"item-card-profile-button-wrapper"}>
              <img
                alt="razdelisdrugim"
                src={Delete}
                className={"item-card-profile-button-image"}
              />
              <p
                onClick={removeSubjectHandler}
                value="Удалить"
                type="button"
                className="item-card-profile-button__optional"
              >
                Удалить
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* МОБИЛЬНАЯ ВЕРСИЯ  - Я СДАЮ КОНТЕНТ В ПРОФИЛЕ*/}
      <div className="recent-block-wrapper" id="globaldata_mobile">
        <div className="recent-block__profile">
          <img
            alt="razdelisdrugim"
            style={{ cursor: "pointer" }}
            onClick={() => setRedirect(<Redirect to={`/item-card?id=${id}`} />)}
            src={imageLoaded ? `data:image/png;base64,${image_1}` : Loading}
            className="block-image"
          />
          <div className="recent-marks">
            {delivery.includes("Привезу и заберу сам") ||
            delivery.includes("Доставка курьером") ? (
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
            {pledge ? (
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
            {contract ? (
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
            {insurance ? (
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
            {servicefee ? (
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
          <div style={{ height: "auto" }} className="recent_block_title_div">
            <p
              style={{ cursor: "pointer" }}
              onClick={() =>
                setRedirect(<Redirect to={`/item-card?id=${id}`} />)
              }
              className="recent-block-title-name"
            >
              {title.length > 35
                ? `${title.split("").splice(0, 39).join("")}...`
                : title}
            </p>
          </div>
          {!offer_price_rent && !free_rent && (
            <div
              style={{ marginTop: "10px" }}
              className="recent-time-cost-wrapper"
            >
              <p className="recent-cost-p">{price_rent} BYN</p>
              <p className="recent-time-p">
                {rent === "Час"
                  ? "час"
                  : rent === "День"
                  ? "день"
                  : rent === "Неделя"
                  ? "неделю"
                  : rent === "Месяц"
                  ? "месяц"
                  : rent === "1шт."
                  ? "штуку"
                  : rent === "1кв.м."
                  ? "1кв.м."
                  : rent === "1чел."
                  ? "1 чел."
                  : ""}
              </p>
            </div>
          )}
          {redirect}
          {offer_price_rent && (
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
          {free_rent && (
            <div
              style={{ justifyContent: "flex-start", marginTop: "10px" }}
              className="recent-time-cost-wrapper"
            >
              <img alt="razdelisdrugim" src={freePrice} />
              <p style={{ marginLeft: "5px" }} className="recent-time-p">
                Бесплатно
              </p>
            </div>
          )}
          <div
            style={{ marginTop: "10px" }}
            className={"item-card-profile-buttons"}
          >
            <a
              className="item-card-profile-button__edit"
              href={`/edit-item?id=${id}`}
            >
              <p>Редактировать</p>
            </a>
            <div className={"item-card-profile-button-wrapper"}>
              <img
                alt="razdelisdrugim"
                src={copy}
                className={"item-card-profile-button-image"}
              />
              <p
                onClick={copyHandler}
                value="Копировать"
                type="button"
                className="item-card-profile-button__optional"
              >
                Копировать
              </p>
            </div>
            {is_hidden ? (
              <div className={"item-card-profile-button-wrapper"}>
                <img
                  alt="razdelisdrugim"
                  src={hide}
                  className={"item-card-profile-button-image"}
                />
                <p
                  onClick={showHandler}
                  value="Показать"
                  type="button"
                  className="item-card-profile-button__optional"
                >
                  Показать
                </p>
              </div>
            ) : (
              <div className={"item-card-profile-button-wrapper"}>
                <img
                  alt="razdelisdrugim"
                  src={hide}
                  className={"item-card-profile-button-image"}
                />
                <p
                  onClick={hideHandler}
                  value="Скрыть"
                  type="button"
                  className="item-card-profile-button__optional"
                >
                  Скрыть
                </p>
              </div>
            )}
            <div className={"item-card-profile-button-wrapper"}>
              <img
                alt="razdelisdrugim"
                src={Delete}
                className={"item-card-profile-button-image"}
              />
              <p
                onClick={removeSubjectHandler}
                value="Удалить"
                type="button"
                className="item-card-profile-button__optional"
              >
                Удалить
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ПЛАНШЕТ ВЕРСИЯ  - Я СДАЮ КОНТЕНТ В ПРОФИЛЕ*/}
      <div className="recent-block-wrapper" id="swiper_mobile_800">
        <div className="recent-block__profile">
          <img
            alt="razdelisdrugim"
            style={{ cursor: "pointer" }}
            onClick={() => setRedirect(<Redirect to={`/item-card?id=${id}`} />)}
            src={imageLoaded ? `data:image/png;base64,${image_1}` : Loading}
            onLoad={() => setImageLoaded(true)}
            className="block-image"
          />
          <div className="recent-marks">
            {delivery.includes("Привезу и заберу сам") ||
            delivery.includes("Доставка курьером") ? (
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
            {pledge ? (
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
            {contract ? (
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
            {insurance ? (
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
            {servicefee ? (
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
          <div style={{ height: "auto" }} className="recent_block_title_div">
            <p
              style={{ cursor: "pointer" }}
              onClick={() =>
                setRedirect(<Redirect to={`/item-card?id=${id}`} />)
              }
              className="recent-block-title-name"
            >
              {title.length > 35
                ? `${title.split("").splice(0, 35).join("")}...`
                : title}
            </p>
          </div>
          {!offer_price_rent && !free_rent && (
            <div
              style={{ marginTop: "10px" }}
              className="recent-time-cost-wrapper"
            >
              <p className="recent-cost-p">{price_rent} BYN</p>
              <p className="recent-time-p">
                {rent === "Час"
                  ? "час"
                  : rent === "День"
                  ? "день"
                  : rent === "Неделя"
                  ? "неделю"
                  : rent === "Месяц"
                  ? "месяц"
                  : rent === "1шт."
                  ? "штуку"
                  : rent === "1кв.м."
                  ? "1кв.м."
                  : rent === "1чел."
                  ? "1 чел."
                  : ""}
              </p>
            </div>
          )}
          {redirect}
          {offer_price_rent && (
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
          {free_rent && (
            <div
              style={{ justifyContent: "flex-start", marginTop: "10px" }}
              className="recent-time-cost-wrapper"
            >
              <img alt="razdelisdrugim" src={freePrice} />
              <p style={{ marginLeft: "5px" }} className="recent-time-p">
                Бесплатно
              </p>
            </div>
          )}
          <div
            style={{ marginTop: "10px" }}
            className={"item-card-profile-buttons"}
          >
            <a
              className="item-card-profile-button__edit"
              href={`/edit-item?id=${id}`}
            >
              <p>Редактировать</p>
            </a>
            <div className={"item-card-profile-button-wrapper"}>
              <img
                alt="razdelisdrugim"
                src={copy}
                className={"item-card-profile-button-image"}
              />
              <p
                onClick={copyHandler}
                value="Копировать"
                type="button"
                className="item-card-profile-button__optional"
              >
                Копировать
              </p>
            </div>
            {is_hidden ? (
              <div className={"item-card-profile-button-wrapper"}>
                <img
                  alt="razdelisdrugim"
                  src={hide}
                  className={"item-card-profile-button-image"}
                />
                <p
                  onClick={showHandler}
                  value="Показать"
                  type="button"
                  className="item-card-profile-button__optional"
                >
                  Показать
                </p>
              </div>
            ) : (
              <div className={"item-card-profile-button-wrapper"}>
                <img
                  alt="razdelisdrugim"
                  src={hide}
                  className={"item-card-profile-button-image"}
                />
                <p
                  onClick={hideHandler}
                  value="Скрыть"
                  type="button"
                  className="item-card-profile-button__optional"
                >
                  Скрыть
                </p>
              </div>
            )}
            <div className={"item-card-profile-button-wrapper"}>
              <img
                alt="razdelisdrugim"
                src={Delete}
                className={"item-card-profile-button-image"}
              />
              <p
                onClick={removeSubjectHandler}
                value="Удалить"
                type="button"
                className="item-card-profile-button__optional"
              >
                Удалить
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCardProfile;
