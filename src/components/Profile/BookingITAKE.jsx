import React from "react";
import SearchVector from "../../img/BookingPage/searchvector.png";
import Car from "../../img/BookingPage/car.webp";
import SettingIcon from "../../img/BookingPage/card-money.webp";
import Union from "../../img/BookingPage/Union.webp";
import CardVerify from "../../img/BookingPage/card-verify.webp";
import Moneytime from "../../img/BookingPage/money-time.webp";
import Retakevector from "../../img/BookingPage/retakevector.png";
import Sms from "../../img/BookingPage/sms.png";
import Textonpage from "../../img/BookingPage/textonpage.png";
import carDisabled from "../../img/MainPage/car-disabled.webp";
import cardFireDisabled from "../../img/MainPage/card-fire-disabled.webp";
import cardMoneyDisabled from "../../img/MainPage/card-money-disabled.webp";
import cardVerifyDisabled from "../../img/MainPage/card-verify-disabled.webp";
import UnionDisabled from "../../img/MainPage/Union-disabled.webp";
import moneyTimeDisabled from "../../img/MainPage/money-time-disabled.webp";

import { Link } from "react-router-dom";
import { rootAddress } from "../../http/axios-requests";
import Requests from "../../http/axios-requests";

const BookingITake = ({
  item,
  type,
  setOutgoingReservations,
  setIncomingReservations,
  countShowedTablesCouples,
  index,
  showOnMapHandler,
}) => {
  const handleReservationSubmit = () => {
    Requests.updateReservationStatus(item.id, "SUBMITTED").then(() => {
      Requests.getIncomingReservations().then((res) => {
        setIncomingReservations(res.data.reverse());
      });
    });
  };

  const handleReservationAbort = () => {
    Requests.updateReservationStatus(item.id, "DENIED").then(() => {
      Requests.getIncomingReservations().then((res) => {
        setIncomingReservations(res.data.reverse());
      });
    });
  };

  const handleReservationCancel = () => {
    Requests.updateReservationStatus(item.id, "CANCELED").then(() => {
      Requests.getIncomingReservations().then((res) => {
        setIncomingReservations(res.data.reverse());
      });
    });
  };
  const mapButtonRef = React.useRef(null);

  return (
    <div
      style={
        !(index <= countShowedTablesCouples * 3 - 1) ? { display: "none" } : {}
      }
      className="content__booking_right_body"
    >
      <div className="content__booking_right_body_allblock" id="globaldata_pk">
        {/* header block */}
        <div className="body_allblock_header">
          <div className="body_allblock_header_left">
            <div className="body_allblock_header_left_photo">
              <Link
                to={`/item-card?id=${item.item_id.id}`}
                style={{ textDecoration: "none" }}
              >
                <img
                  src={`${rootAddress}${item.item_id.image_1}`}
                  alt="picture1"
                  className="booking_card_image"
                />
              </Link>
            </div>
            <div className="body_allblock_header_left_text">
              <img
                className="header_left_text_icon"
                src={SearchVector}
                alt="picture1"
                width="23px"
                height="20px"
              />
              <p
                onClick={() =>
                  showOnMapHandler(
                    item.item_id.items_coordinates
                      .split("(")[1]
                      .split(")")[0]
                      .split(" ")
                      .reverse()
                  )
                }
                className="body_allblock_header_left_text-p"
                style={{ cursor: "pointer" }}
              >
                Показать на карте
              </p>
            </div>
          </div>
          {/* right */}
          <div className="body_allblock_header_right">
            <div className="body_allblock_header_right_header">
              <p className="body_allblock_header_right_header-p">
                {item.item_id.name_item}
              </p>
              <div className="body_allblock_header_right_header_img">
                {(item.delivery_choice === "2" ||
                  item.delivery_choice === "3") && (
                  <img
                    className="bookingpage_header_img"
                    width="20px"
                    height="13px"
                    src={Car}
                    alt="picture1"
                    title={
                      item.delivery_choice === "2"
                        ? `Привезет и заберет сам, ${
                            item.reserve_delivery_free
                              ? "бесплатно"
                              : `${item.reserve_self_delivery_price} BYN`
                          }`
                        : item.delivery_choice === "3"
                        ? "Отправит"
                        : ""
                    }
                  />
                )}
                {item.delivery_choice === "1" && (
                  <img
                    className="bookingpage_header_img"
                    width="20px"
                    height="13px"
                    src={carDisabled}
                    alt="picture1"
                  />
                )}
                {item.reserve_pledge_price !== 0 && (
                  <img
                    className="bookingpage_header_img"
                    width="18px"
                    height="16px"
                    src={Moneytime}
                    alt="picture1"
                    title={`Залог: ${item.reserve_pledge_price} BYN`}
                  />
                )}
                {item.reserve_pledge_price === 0 && (
                  <img
                    className="bookingpage_header_img"
                    width="18px"
                    height="16px"
                    src={moneyTimeDisabled}
                    alt="picture1"
                  />
                )}
                {item.reserve_contract && (
                  <img
                    className="bookingpage_header_img"
                    width="14px"
                    height="16px"
                    src={Union}
                    alt="picture1"
                    title="Договор обязателен"
                  />
                )}
                {!item.reserve_contract && (
                  <img
                    className="bookingpage_header_img"
                    width="14px"
                    height="16px"
                    src={UnionDisabled}
                    alt="picture1"
                  />
                )}
                {item.reserve_insurance_price !== 0 && (
                  <img
                    className="bookingpage_header_img"
                    width="16px"
                    height="18px"
                    src={CardVerify}
                    alt="picture1"
                    title={`Страхование: ${item.reserve_insurance_price} BYN`}
                  />
                )}
                {item.reserve_insurance_price === 0 && (
                  <img
                    className="bookingpage_header_img"
                    width="16px"
                    height="18px"
                    src={cardVerifyDisabled}
                    alt="picture1"
                  />
                )}
                {item.reserve_servicefee_price !== 0 && (
                  <img
                    className="bookingpage_header_img"
                    width="17px"
                    height="17px"
                    src={SettingIcon}
                    alt="picture1"
                    title={`Сервисный сбор: ${item.reserve_servicefee_price} BYN`}
                  />
                )}
                {item.reserve_servicefee_price === 0 && (
                  <img
                    className="bookingpage_header_img"
                    width="17px"
                    height="17px"
                    src={cardMoneyDisabled}
                    alt="picture1"
                  />
                )}
                <img
                  width="14px"
                  height="18px"
                  src={cardFireDisabled}
                  alt="picture1"
                />
              </div>
            </div>
            {/* center blocks */}
            <div className="body_allblock_header_right_center_block1">
              {item.reservation_status === "SUBMITTED" && (
                <p className="body_allblock_header_right_center_block1-p">
                  Подтверждено
                </p>
              )}
              {item.reservation_status === "DENIED" && (
                <p className="body_allblock_header_right_center_block1-p2">
                  Отклонено
                </p>
              )}
              {item.reservation_status === "WAITING" && (
                <p className="body_allblock_header_right_center_block1-p3">
                  В ожидании
                </p>
              )}

              {item.reservation_status === "CANCELED" && (
                <p className="body_allblock_header_right_center_block1-p4">
                  Отменено
                </p>
              )}
            </div>
            <div className="body_allblock_header_right_center_block2">
              <div className="center_block_rowstyle">
                <p className="center_block_rowstyle-p1-1">Начало аренды</p>
                <p className="center_block_rowstyle-p1-2">
                  {item.reservation_start_time
                    ? `${item.reservation_start_time
                        .split("")
                        .splice(8, 2)
                        .join("")} ${
                        item.reservation_start_time
                          .split("")
                          .splice(5, 2)
                          .join("") === "01"
                          ? "января"
                          : item.reservation_start_time
                              .split("")
                              .splice(5, 2)
                              .join("") === "02"
                          ? "февраля"
                          : item.reservation_start_time
                              .split("")
                              .splice(5, 2)
                              .join("") === "03"
                          ? "марта"
                          : item.reservation_start_time
                              .split("")
                              .splice(5, 2)
                              .join("") === "04"
                          ? "апреля"
                          : item.reservation_start_time
                              .split("")
                              .splice(5, 2)
                              .join("") === "05"
                          ? "мая"
                          : item.reservation_start_time
                              .split("")
                              .splice(5, 2)
                              .join("") === "06"
                          ? "июня"
                          : item.reservation_start_time
                              .split("")
                              .splice(5, 2)
                              .join("") === "07"
                          ? "июля"
                          : item.reservation_start_time
                              .split("")
                              .splice(5, 2)
                              .join("") === "08"
                          ? "авугста"
                          : item.reservation_start_time
                              .split("")
                              .splice(5, 2)
                              .join("") === "09"
                          ? "сентября"
                          : item.reservation_start_time
                              .split("")
                              .splice(5, 2)
                              .join("") === "10"
                          ? "октября"
                          : item.reservation_start_time
                              .split("")
                              .splice(5, 2)
                              .join("") === "11"
                          ? "ноября"
                          : item.reservation_start_time
                              .split("")
                              .splice(5, 2)
                              .join("") === "12"
                          ? "декабря"
                          : ""
                      }, ${item.reservation_start_time
                        .split("")
                        .splice(0, 4)
                        .join("")}${
                        item.reserve_rent === "HOUR"
                          ? `, ${item.reservation_start_time
                              .split("")
                              .splice(11, 5)
                              .join("")}`
                          : ""
                      }`
                    : ""}
                </p>
              </div>
              <div className="center_block_rowstyle">
                <p className="center_block_rowstyle-p1-1">Конец аренды</p>
                <p className="center_block_rowstyle-p1-2">
                  {item.reservation_end_time
                    ? `${item.reservation_end_time
                        .split("")
                        .splice(8, 2)
                        .join("")} ${
                        item.reservation_end_time
                          .split("")
                          .splice(5, 2)
                          .join("") === "01"
                          ? "января"
                          : item.reservation_end_time
                              .split("")
                              .splice(5, 2)
                              .join("") === "02"
                          ? "февраля"
                          : item.reservation_end_time
                              .split("")
                              .splice(5, 2)
                              .join("") === "03"
                          ? "марта"
                          : item.reservation_end_time
                              .split("")
                              .splice(5, 2)
                              .join("") === "04"
                          ? "апреля"
                          : item.reservation_end_time
                              .split("")
                              .splice(5, 2)
                              .join("") === "05"
                          ? "мая"
                          : item.reservation_end_time
                              .split("")
                              .splice(5, 2)
                              .join("") === "06"
                          ? "июня"
                          : item.reservation_end_time
                              .split("")
                              .splice(5, 2)
                              .join("") === "07"
                          ? "июля"
                          : item.reservation_end_time
                              .split("")
                              .splice(5, 2)
                              .join("") === "08"
                          ? "авугста"
                          : item.reservation_end_time
                              .split("")
                              .splice(5, 2)
                              .join("") === "09"
                          ? "сентября"
                          : item.reservation_end_time
                              .split("")
                              .splice(5, 2)
                              .join("") === "10"
                          ? "октября"
                          : item.reservation_end_time
                              .split("")
                              .splice(5, 2)
                              .join("") === "11"
                          ? "ноября"
                          : item.reservation_end_time
                              .split("")
                              .splice(5, 2)
                              .join("") === "12"
                          ? "декабря"
                          : ""
                      }, ${item.reservation_end_time
                        .split("")
                        .splice(0, 4)
                        .join("")}${
                        item.reserve_rent === "HOUR"
                          ? `, ${item.reservation_end_time
                              .split("")
                              .splice(11, 5)
                              .join("")}`
                          : ""
                      }`
                    : ""}
                </p>
              </div>
            </div>

            <div className="body_allblock_header_right_center_block2">
              <div className="center_block_rowstyle">
                {type === 1 && (
                  <p className="center_block_rowstyle-p1-1">Владелец</p>
                )}
                {type === 2 && (
                  <p className="center_block_rowstyle-p1-1">Арендатор</p>
                )}
                <Link
                  to={`/public-profile?id=${
                    type === 1 ? item.owner_id : item.renter_id
                  }`}
                  style={{ textDecoration: "none" }}
                >
                  <p className="center_block_rowstyle-p1-2">
                    {type === 1 ? item.owner_name : item.renter_name}
                  </p>
                </Link>
              </div>
            </div>
            <div className="body_allblock_header_right_center_block2">
              {item.reserve_price_rent !== 0 && (
                <div className="center_block_rowstyle_2">
                  <p className="center_block_rowstyle-p2-1">
                    Стоимость аренды за весь период
                  </p>
                  <p className="center_block_rowstyle-p2-2">
                    {(item.reserve_offer_price_rent
                      ? item.reserve_offer_price_rent
                      : item.reserve_price_rent) *
                      Number(item.reservation_time.split("")[0])}{" "}
                    BYN
                  </p>
                </div>
              )}
              {item.reserve_pledge_price !== 0 && (
                <div className="center_block_rowstyle_2">
                  <p className="center_block_rowstyle-p2-1">Залог</p>
                  <p className="center_block_rowstyle-p2-2">
                    {item.reserve_pledge_price} BYN
                  </p>
                </div>
              )}
              {item.reserve_servicefee_price !== 0 && (
                <div className="center_block_rowstyle_2">
                  <p className="center_block_rowstyle-p2-1">Сервисный сбор</p>
                  <p className="center_block_rowstyle-p2-2">
                    {item.reserve_servicefee_price} BYN
                  </p>
                </div>
              )}
              {item.reserve_insurance_price !== 0 && (
                <div className="center_block_rowstyle_2">
                  <p className="center_block_rowstyle-p2-1">Страхование</p>
                  <p className="center_block_rowstyle-p2-2">
                    {item.reserve_insurance_price} BYN
                  </p>
                </div>
              )}

              {!item.reserve_self_delivery_free &&
                item.delivery_choice === "2" && (
                  <div className="center_block_rowstyle_2">
                    <p className="center_block_rowstyle-p2-1">Доставка</p>
                    <p className="center_block_rowstyle-p2-2">
                      {item.reserve_self_delivery_price} BYN
                    </p>
                  </div>
                )}

              {item.reserve_franchise_price !== 0 && (
                <div className="center_block_rowstyle_2">
                  <p className="center_block_rowstyle-p2-1">Франшиза</p>
                  <p className="center_block_rowstyle-p2-2">
                    {item.reserve_franchise_price} BYN
                  </p>
                </div>
              )}
            </div>
            <div
              className="body_allblock_header_right_center_block2"
              style={{ border: "0" }}
            >
              <div className="center_block_rowstyle">
                <p className="center_block_rowstyle-p1-3">
                  Итоговая стоимость{" "}
                </p>
                <p className="center_block_rowstyle-p1-2">
                  {item.all_sum_reserve_item} BYN
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* footer block */}
        <div className="body_allblock_footer">
          {type === 2 && item.reservation_status === "WAITING" && (
            <div className="center_block_rowstyle_3">
              <p
                className="body_allblock_header_left_text-p"
                style={{ cursor: "pointer" }}
                onClick={handleReservationSubmit}
              >
                Подтвердить бронирование
              </p>
            </div>
          )}
          {type === 2 && item.reservation_status === "WAITING" && (
            <div className="center_block_rowstyle_3">
              <p
                className="body_allblock_header_left_text-p"
                style={{ cursor: "pointer" }}
                onClick={handleReservationAbort}
              >
                Отклонить бронирование
              </p>
            </div>
          )}

          {type === 2 && item.reservation_status === "SUBMITTED" && (
            <div className="center_block_rowstyle_3">
              <p
                className="body_allblock_header_left_text-p"
                style={{ cursor: "pointer" }}
                onClick={handleReservationCancel}
              >
                Отклонить бронирование
              </p>
            </div>
          )}

          {false && (
            <div className="center_block_rowstyle_3">
              <img
                width="15px"
                height="20px"
                src={Retakevector}
                alt="pictute1"
                style={{ cursor: "pointer" }}
              />
              <p
                className="body_allblock_header_left_text-p"
                style={{ cursor: "pointer" }}
              >
                Повторить бронирование
              </p>
            </div>
          )}
          <div className="center_block_rowstyle_3">
            <img
              width="17px"
              height="15px"
              src={Sms}
              alt="pictute1"
              style={{ cursor: "pointer" }}
            />
            <Link
              to={`/chat?id=${item.chat_id}`}
              style={{ textDecoration: "none" }}
            >
              <p
                className="body_allblock_header_left_text-p"
                style={{ cursor: "pointer" }}
              >
                Написать {type === 1 ? "владельцу" : "арендатору"}
              </p>
            </Link>
          </div>
          {false && (
            <div className="center_block_rowstyle_3">
              <img
                width="17px"
                height="15px"
                src={Textonpage}
                alt="pictute1"
                style={{ cursor: "pointer" }}
              />
              <p
                className="body_allblock_header_left_text-p"
                style={{ cursor: "pointer" }}
              >
                Оставить отзыв
              </p>
            </div>
          )}
        </div>
      </div>

      {/* MOBILE */}
      <div
        className="content__booking_right_body_allblock"
        id="globaldata_mobile"
      >
        {/* header block */}
        <div className="body_allblock_header">
          <div className="body_allblock_header_up">
            <div className="body_allblock_header_left">
              <div className="body_allblock_header_left_photo">
                <Link
                  to={`/item-card?id=${item.item_id.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <img
                    src={`${rootAddress}${item.item_id.image_1}`}
                    alt="picture1"
                    className="booking_card_image"
                  />
                </Link>
              </div>
              <div className="body_allblock_header_left_text">
                <img
                  className="header_left_text_icon"
                  src={SearchVector}
                  alt="picture1"
                  width="23px"
                  height="20px"
                />
                <p
                  onClick={() =>
                    showOnMapHandler(
                      item.item_id.items_coordinates
                        .split("(")[1]
                        .split(")")[0]
                        .split(" ")
                        .reverse()
                    )
                  }
                  className="body_allblock_header_left_text-p"
                  style={{ cursor: "pointer" }}
                >
                  Показать на карте
                </p>
              </div>
            </div>
            {/* right */}
            <div className="body_allblock_header_right">
              <div className="body_allblock_header_right_header">
                <p className="body_allblock_header_right_header-p">
                  {item.item_id.name_item}
                </p>
                <div className="body_allblock_header_right_header_img">
                  {(item.delivery_choice === "2" ||
                    item.delivery_choice === "3") && (
                    <img
                      className="bookingpage_header_img"
                      width="20px"
                      height="13px"
                      src={Car}
                      alt="picture1"
                      title={
                        item.delivery_choice === "2"
                          ? `Привезет и заберет сам, ${
                              item.reserve_delivery_free
                                ? "бесплатно"
                                : `${item.reserve_self_delivery_price} BYN`
                            }`
                          : item.delivery_choice === "3"
                          ? "Отправит"
                          : ""
                      }
                    />
                  )}
                  {item.delivery_choice === "1" && (
                    <img
                      className="bookingpage_header_img"
                      width="20px"
                      height="13px"
                      src={carDisabled}
                      alt="picture1"
                    />
                  )}
                  {item.reserve_pledge_price !== 0 && (
                    <img
                      className="bookingpage_header_img"
                      width="18px"
                      height="16px"
                      src={Moneytime}
                      alt="picture1"
                      title={`Залог: ${item.reserve_pledge_price} BYN`}
                    />
                  )}
                  {item.reserve_pledge_price === 0 && (
                    <img
                      className="bookingpage_header_img"
                      width="18px"
                      height="16px"
                      src={moneyTimeDisabled}
                      alt="picture1"
                    />
                  )}
                  {item.reserve_contract && (
                    <img
                      className="bookingpage_header_img"
                      width="14px"
                      height="16px"
                      src={Union}
                      alt="picture1"
                      title="Договор обязателен"
                    />
                  )}
                  {!item.reserve_contract && (
                    <img
                      className="bookingpage_header_img"
                      width="14px"
                      height="16px"
                      src={UnionDisabled}
                      alt="picture1"
                    />
                  )}
                  {item.reserve_insurance_price !== 0 && (
                    <img
                      className="bookingpage_header_img"
                      width="16px"
                      height="18px"
                      src={CardVerify}
                      alt="picture1"
                      title={`Страхование: ${item.reserve_insurance_price} BYN`}
                    />
                  )}
                  {item.reserve_insurance_price === 0 && (
                    <img
                      className="bookingpage_header_img"
                      width="16px"
                      height="18px"
                      src={cardVerifyDisabled}
                      alt="picture1"
                    />
                  )}
                  {item.reserve_servicefee_price !== 0 && (
                    <img
                      className="bookingpage_header_img"
                      width="17px"
                      height="17px"
                      src={SettingIcon}
                      alt="picture1"
                      title={`Сервисный сбор: ${item.reserve_servicefee_price} BYN`}
                    />
                  )}
                  {item.reserve_servicefee_price === 0 && (
                    <img
                      className="bookingpage_header_img"
                      width="17px"
                      height="17px"
                      src={cardMoneyDisabled}
                      alt="picture1"
                    />
                  )}
                  <img
                    width="14px"
                    height="18px"
                    src={cardFireDisabled}
                    alt="picture1"
                  />
                </div>
              </div>
              {/* center blocks */}
              <div className="body_allblock_header_right_center_block1">
                {item.reservation_status === "SUBMITTED" && (
                  <p className="body_allblock_header_right_center_block1-p">
                    Подтверждено
                  </p>
                )}
                {item.reservation_status === "DENIED" && (
                  <p className="body_allblock_header_right_center_block1-p2">
                    Отклонено
                  </p>
                )}
                {item.reservation_status === "WAITING" && (
                  <p className="body_allblock_header_right_center_block1-p3">
                    В ожидании
                  </p>
                )}

                {item.reservation_status === "CANCELED" && (
                  <p className="body_allblock_header_right_center_block1-p4">
                    Отменено
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* block center mobile */}
        <div>
          <div className="body_allblock_header_right_center_block2">
            <div className="center_block_rowstyle">
              <p className="center_block_rowstyle-p1-1">Начало аренды</p>
              <p className="center_block_rowstyle-p1-2">
                {item.reservation_start_time
                  ? `${item.reservation_start_time
                      .split("")
                      .splice(8, 2)
                      .join("")} ${
                      item.reservation_start_time
                        .split("")
                        .splice(5, 2)
                        .join("") === "01"
                        ? "января"
                        : item.reservation_start_time
                            .split("")
                            .splice(5, 2)
                            .join("") === "02"
                        ? "февраля"
                        : item.reservation_start_time
                            .split("")
                            .splice(5, 2)
                            .join("") === "03"
                        ? "марта"
                        : item.reservation_start_time
                            .split("")
                            .splice(5, 2)
                            .join("") === "04"
                        ? "апреля"
                        : item.reservation_start_time
                            .split("")
                            .splice(5, 2)
                            .join("") === "05"
                        ? "мая"
                        : item.reservation_start_time
                            .split("")
                            .splice(5, 2)
                            .join("") === "06"
                        ? "июня"
                        : item.reservation_start_time
                            .split("")
                            .splice(5, 2)
                            .join("") === "07"
                        ? "июля"
                        : item.reservation_start_time
                            .split("")
                            .splice(5, 2)
                            .join("") === "08"
                        ? "авугста"
                        : item.reservation_start_time
                            .split("")
                            .splice(5, 2)
                            .join("") === "09"
                        ? "сентября"
                        : item.reservation_start_time
                            .split("")
                            .splice(5, 2)
                            .join("") === "10"
                        ? "октября"
                        : item.reservation_start_time
                            .split("")
                            .splice(5, 2)
                            .join("") === "11"
                        ? "ноября"
                        : item.reservation_start_time
                            .split("")
                            .splice(5, 2)
                            .join("") === "12"
                        ? "декабря"
                        : ""
                    }, ${item.reservation_start_time
                      .split("")
                      .splice(0, 4)
                      .join("")}${
                      item.reserve_rent === "HOUR"
                        ? `, ${item.reservation_start_time
                            .split("")
                            .splice(11, 5)
                            .join("")}`
                        : ""
                    }`
                  : ""}
              </p>
            </div>
            <div className="center_block_rowstyle">
              <p className="center_block_rowstyle-p1-1">Конец аренды</p>
              <p className="center_block_rowstyle-p1-2">
                {item.reservation_end_time
                  ? `${item.reservation_end_time
                      .split("")
                      .splice(8, 2)
                      .join("")} ${
                      item.reservation_end_time
                        .split("")
                        .splice(5, 2)
                        .join("") === "01"
                        ? "января"
                        : item.reservation_end_time
                            .split("")
                            .splice(5, 2)
                            .join("") === "02"
                        ? "февраля"
                        : item.reservation_end_time
                            .split("")
                            .splice(5, 2)
                            .join("") === "03"
                        ? "марта"
                        : item.reservation_end_time
                            .split("")
                            .splice(5, 2)
                            .join("") === "04"
                        ? "апреля"
                        : item.reservation_end_time
                            .split("")
                            .splice(5, 2)
                            .join("") === "05"
                        ? "мая"
                        : item.reservation_end_time
                            .split("")
                            .splice(5, 2)
                            .join("") === "06"
                        ? "июня"
                        : item.reservation_end_time
                            .split("")
                            .splice(5, 2)
                            .join("") === "07"
                        ? "июля"
                        : item.reservation_end_time
                            .split("")
                            .splice(5, 2)
                            .join("") === "08"
                        ? "авугста"
                        : item.reservation_end_time
                            .split("")
                            .splice(5, 2)
                            .join("") === "09"
                        ? "сентября"
                        : item.reservation_end_time
                            .split("")
                            .splice(5, 2)
                            .join("") === "10"
                        ? "октября"
                        : item.reservation_end_time
                            .split("")
                            .splice(5, 2)
                            .join("") === "11"
                        ? "ноября"
                        : item.reservation_end_time
                            .split("")
                            .splice(5, 2)
                            .join("") === "12"
                        ? "декабря"
                        : ""
                    }, ${item.reservation_end_time
                      .split("")
                      .splice(0, 4)
                      .join("")}${
                      item.reserve_rent === "HOUR"
                        ? `, ${item.reservation_end_time
                            .split("")
                            .splice(11, 5)
                            .join("")}`
                        : ""
                    }`
                  : ""}
              </p>
            </div>
          </div>

          <div className="body_allblock_header_right_center_block2_row">
            <div className="center_block_rowstyle">
              {type === 1 && (
                <p className="center_block_rowstyle-p1-1">Владелец</p>
              )}
              {type === 2 && (
                <p className="center_block_rowstyle-p1-1">Арендатор</p>
              )}
              <Link
                to={`/public-profile?id=${
                  type === 1 ? item.owner_id : item.renter_id
                }`}
                style={{ textDecoration: "none" }}
              >
                <p className="center_block_rowstyle-p1-2">
                  {type === 1 ? item.owner_name : item.renter_name}
                </p>
              </Link>
            </div>
            <div className="center_block_rowstyle">
              <div className="center_block_rowstyle_3">
                <img
                  width="17px"
                  height="15px"
                  src={Sms}
                  alt="pictute1"
                  style={{ cursor: "pointer" }}
                />
                <Link
                  to={`/chat?id=${item.chat_id}`}
                  style={{ textDecoration: "none" }}
                >
                  <p
                    className="body_allblock_header_left_text-p-p"
                    style={{ cursor: "pointer" }}
                  >
                    Написать
                  </p>
                </Link>
              </div>
            </div>
          </div>
          <div className="body_allblock_header_right_center_block2">
            {item.reserve_price_rent !== 0 && (
              <div className="center_block_rowstyle_2">
                <p className="center_block_rowstyle-p2-1">
                  Стоимость аренды за весь период
                </p>
                <p className="center_block_rowstyle-p2-2">
                  {item.reserve_price_rent *
                    Number(item.reservation_time.split("")[0])}{" "}
                  BYN
                </p>
              </div>
            )}
            {item.reserve_pledge_price !== 0 && (
              <div className="center_block_rowstyle_2">
                <p className="center_block_rowstyle-p2-1">Залог</p>
                <p className="center_block_rowstyle-p2-2">
                  {item.reserve_pledge_price} BYN
                </p>
              </div>
            )}
            {item.reserve_servicefee_price !== 0 && (
              <div className="center_block_rowstyle_2">
                <p className="center_block_rowstyle-p2-1">Сервисный сбор</p>
                <p className="center_block_rowstyle-p2-2">
                  {item.reserve_servicefee_price} BYN
                </p>
              </div>
            )}
            {item.reserve_insurance_price !== 0 && (
              <div className="center_block_rowstyle_2">
                <p className="center_block_rowstyle-p2-1">Страхование</p>
                <p className="center_block_rowstyle-p2-2">
                  {item.reserve_insurance_price} BYN
                </p>
              </div>
            )}

            {!item.reserve_self_delivery_free && item.delivery_choice === "2" && (
              <div className="center_block_rowstyle_2">
                <p className="center_block_rowstyle-p2-1">Доставка</p>
                <p className="center_block_rowstyle-p2-2">
                  {item.reserve_self_delivery_price} BYN
                </p>
              </div>
            )}

            {item.reserve_franchise_price !== 0 && (
              <div className="center_block_rowstyle_2">
                <p className="center_block_rowstyle-p2-1">Франшиза</p>
                <p className="center_block_rowstyle-p2-2">
                  {item.reserve_franchise_price} BYN
                </p>
              </div>
            )}
          </div>
          <div
            className="body_allblock_header_right_center_block2"
            style={{ border: "0" }}
          >
            <div className="center_block_rowstyle">
              <p className="center_block_rowstyle-p1-3">Итоговая стоимость </p>
              <p className="center_block_rowstyle-p1-4">
                {item.all_sum_reserve_item} BYN
              </p>
            </div>
          </div>
        </div>
        {/* footer block */}
        <div className="body_allblock_footer">
          {type === 2 && item.reservation_status === "WAITING" && (
            <div className="center_block_rowstyle_4">
              <p
                className="body_allblock_header_left_text-p-p1"
                style={{ cursor: "pointer" }}
                onClick={handleReservationSubmit}
              >
                Подтвердить бронирование
              </p>
            </div>
          )}
          {type === 2 && item.reservation_status === "WAITING" && (
            <div className="center_block_rowstyle_4">
              <p
                className="body_allblock_header_left_text-p-p1"
                style={{ cursor: "pointer" }}
                onClick={handleReservationAbort}
              >
                Отклонить бронирование
              </p>
            </div>
          )}

          {type === 2 && item.reservation_status === "SUBMITTED" && (
            <div className="center_block_rowstyle_4">
              <p
                className="body_allblock_header_left_text-p-p1"
                style={{ cursor: "pointer" }}
                onClick={handleReservationCancel}
              >
                Отклонить бронирование
              </p>
            </div>
          )}

          {true && (
            <div className="center_block_rowstyle_4">
              <img
                width="15px"
                height="20px"
                src={Retakevector}
                alt="pictute1"
                style={{ cursor: "pointer" }}
              />
              <p
                className="body_allblock_header_left_text-p-p1"
                style={{ cursor: "pointer" }}
              >
                Повторить бронирование
              </p>
            </div>
          )}
          {true && (
            <div className="center_block_rowstyle_4">
              <img
                width="17px"
                height="15px"
                src={Textonpage}
                alt="pictute1"
                style={{ cursor: "pointer" }}
              />
              <p
                className="body_allblock_header_left_text-p-p1"
                style={{ cursor: "pointer" }}
              >
                Оставить отзыв
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingITake;
