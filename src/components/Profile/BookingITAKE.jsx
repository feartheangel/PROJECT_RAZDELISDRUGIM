import React from "react";
import SearchVector from "../../img/BookingPage/searchvector.png";
import Car from "../../img/BookingPage/car.webp";
import SettingIcon from "../../img/BookingPage/card-money.webp";
import Union from "../../img/BookingPage/Union.webp";
import CardVerify from "../../img/BookingPage/card-verify.webp";
import Moneytime from "../../img/BookingPage/money-time.webp";
import Retakevector from "../../img/BookingPage/retakevector.png";
import Sms from "../../img/BookingPage/sms.png";
import nosuccess from "../../img/BookingPage/nobooking.png";
import disabledbooking from "../../img/BookingPage/disabledicon.png";
import successbooking from "../../img/BookingPage/successbooking.png";
import carDisabled from "../../img/MainPage/car-disabled.webp";
import cardFireDisabled from "../../img/MainPage/card-fire-disabled.webp";
import cardMoneyDisabled from "../../img/MainPage/card-money-disabled.webp";
import cardVerifyDisabled from "../../img/MainPage/card-verify-disabled.webp";
import UnionDisabled from "../../img/MainPage/Union-disabled.webp";
import moneyTimeDisabled from "../../img/MainPage/money-time-disabled.webp";
import telephone from "../../img/BookingPage/telephone.png";
import gmailImg from "../../img/BookingPage/gmailimg.png";
import tgImg from "../../img/BookingPage/tgimg.png";
import viberImg from "../../img/BookingPage/viberimg.png";
import miniMobile from "../../img/BookingPage/minimobile.png";
import WhatsAppLogo from "../../img/CardThings/RightContent/Component 38.png";
import InstagramLogo from "../../img/CardThings/RightContent/Component 39.png";
import VkLogo from "../../img/CardThings/RightContent/Component 42.png";
import OkLogo from "../../img/ProfilePage/ok.png";
import FbLogo from "../../img/ProfilePage/facebook2.png";
import Review from "../../img/BookingPage/textonpage.png";

import { Link } from "react-router-dom";

const BookingITake = ({
  item,
  type,
  setReserveUpdateBool,
  setReserveId,
  setModalActiveSubmit,
  countShowedTablesCouples,
  index,
  showOnMapHandler,
  setReviewItemId,
  setReviewPersonId,
  setModalActiveSendReview,
  setReviewType,
}) => {
  const [contacts, setContacts] = React.useState(false);

  const typeContactsHandler = () => {
    setContacts(!contacts);
  };
  const handleReservationAbort = () => {
    setReserveId(item.id);
    setReserveUpdateBool("DENIED");
    setModalActiveSubmit(true);
  };

  const handleReservationSubmit = () => {
    setReserveId(item.id);
    setReserveUpdateBool("SUBMITTED");
    setModalActiveSubmit(true);
  };

  const handleReservationCancel = () => {
    setReserveId(item.id);
    setReserveUpdateBool("CANCELED");
    setModalActiveSubmit(true);
  };

  const handleReviewSend = () => {
    if (type === 1) {
      setReviewPersonId(item.owner_contact.id);
    } else if (type === 2) {
      setReviewPersonId(item.renter_contact.id);
    }
    setReviewItemId(item.item_id.id);
    setReviewType(type);
    setModalActiveSendReview(true);
  };

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
                  src={`data:image/png;base64,${item.item_id.image_1}`}
                  alt="razdelisdrugim"
                  className="booking_card_image"
                />
              </Link>
            </div>
            <div className="body_allblock_header_left_text">
              <img
                className="header_left_text_icon"
                src={SearchVector}
                alt="razdelisdrugim"
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
            <div
              className="body_allblock_header_right_center_block2"
              style={{ border: "0" }}
            >
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
            <Link
              to={`/chat?id=${item.chat_id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="body_allblock_header_left_buttons">
                <button className="header_left_buttons1">Написать</button>
              </div>
            </Link>
            {item.reservation_status === "SUBMITTED" && (
              <div className="body_allblock_header_left_buttons">
                <button
                  className="header_left_buttons2"
                  onClick={typeContactsHandler}
                >
                  Контакты
                </button>
              </div>
            )}
            {item.reservation_status === "SUBMITTED" && contacts === true && (
              <div className="body_allblock_header_left_contacts">
                <div className="left_contacts_row">
                  <img
                    width="30px"
                    height="30px"
                    src={telephone}
                    alt="vectors"
                  />
                  <p>
                    {" "}
                    {type === 1
                      ? item.owner_contact.phone
                      : type === 2
                      ? item.renter_contact.phone
                      : ""}
                  </p>
                </div>
                {((type === 1 && item.owner_contact.google_account) ||
                  (type === 2 && item.renter_contact.google_account)) && (
                  <div className="left_contacts_row">
                    <img
                      width="30px"
                      height="30px"
                      src={gmailImg}
                      alt="vectors"
                    />
                    <p>
                      {type === 1
                        ? item.owner_contact.google_account
                        : type === 2
                        ? item.renter_contact.google_account
                        : ""}
                    </p>
                  </div>
                )}
                {((type === 1 && item.owner_contact.telegram_account) ||
                  (type === 2 && item.renter_contact.telegram_account)) && (
                  <div className="left_contacts_row">
                    <img width="30px" height="30px" src={tgImg} alt="vectors" />
                    <p>
                      {type === 1
                        ? `@${item.owner_contact.telegram_account}`
                        : type === 2
                        ? `@${item.renter_contact.telegram_account}`
                        : ""}
                    </p>
                  </div>
                )}
                {((type === 1 && item.owner_contact.viber_account) ||
                  (type === 2 && item.renter_contact.viber_account)) && (
                  <div className="left_contacts_row">
                    <img
                      width="30px"
                      height="30px"
                      src={viberImg}
                      alt="vectors"
                    />
                    <p>
                      {type === 1
                        ? `+${item.owner_contact.viber_account}`
                        : type === 2
                        ? `+${item.renter_contact.viber_account}`
                        : ""}
                    </p>
                  </div>
                )}
                {((type === 1 && item.owner_contact.whatsapp_account) ||
                  (type === 2 && item.renter_contact.whatsapp_account)) && (
                  <div className="left_contacts_row">
                    <img
                      width="30px"
                      height="30px"
                      src={WhatsAppLogo}
                      alt="vectors"
                    />
                    <p>
                      {type === 1
                        ? `+${item.owner_contact.whatsapp_account}`
                        : type === 2
                        ? `+${item.renter_contact.whatsapp_account}`
                        : ""}
                    </p>
                  </div>
                )}
                {((type === 1 && item.owner_contact.link_instagram) ||
                  (type === 2 && item.renter_contact.link_instagram)) && (
                  <div className="left_contacts_row">
                    <img
                      width="30px"
                      height="30px"
                      src={InstagramLogo}
                      alt="vectors"
                    />
                    <p>
                      {type === 1
                        ? item.owner_contact.link_instagram
                        : type === 2
                        ? item.renter_contact.link_instagram
                        : ""}
                    </p>
                  </div>
                )}
                {((type === 1 && item.owner_contact.ok_account) ||
                  (type === 2 && item.renter_contact.ok_account)) && (
                  <div className="left_contacts_row">
                    <img
                      width="30px"
                      height="30px"
                      src={OkLogo}
                      alt="vectors"
                    />
                    <p>
                      {type === 1
                        ? item.owner_contact.ok_account
                        : type === 2
                        ? item.renter_contact.ok_account
                        : ""}
                    </p>
                  </div>
                )}
                {((type === 1 && item.owner_contact.vk_account) ||
                  (type === 2 && item.renter_contact.vk_account)) && (
                  <div className="left_contacts_row">
                    <img
                      width="30px"
                      height="30px"
                      src={VkLogo}
                      alt="vectors"
                    />
                    <p>
                      {type === 1
                        ? item.owner_contact.vk_account
                        : type === 2
                        ? item.renter_contact.vk_account
                        : ""}
                    </p>
                  </div>
                )}
                {((type === 1 && item.owner_contact.link_facebook) ||
                  (type === 2 && item.renter_contact.link_facebook)) && (
                  <div className="left_contacts_row">
                    <img
                      width="30px"
                      height="30px"
                      src={FbLogo}
                      alt="vectors"
                    />
                    <p>
                      {type === 1
                        ? item.owner_contact.link_facebook
                        : type === 2
                        ? item.renter_contact.link_facebook
                        : ""}
                    </p>
                  </div>
                )}
              </div>
            )}
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
                    alt="razdelisdrugim"
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
                    alt="razdelisdrugim"
                  />
                )}
                {item.reserve_pledge_price !== 0 && (
                  <img
                    className="bookingpage_header_img"
                    width="18px"
                    height="16px"
                    src={Moneytime}
                    alt="razdelisdrugim"
                    title={`Залог: ${item.reserve_pledge_price} BYN`}
                  />
                )}
                {item.reserve_pledge_price === 0 && (
                  <img
                    className="bookingpage_header_img"
                    width="18px"
                    height="16px"
                    src={moneyTimeDisabled}
                    alt="razdelisdrugim"
                  />
                )}
                {item.reserve_contract && (
                  <img
                    className="bookingpage_header_img"
                    width="14px"
                    height="16px"
                    src={Union}
                    alt="razdelisdrugim"
                    title="Договор обязателен"
                  />
                )}
                {!item.reserve_contract && (
                  <img
                    className="bookingpage_header_img"
                    width="14px"
                    height="16px"
                    src={UnionDisabled}
                    alt="razdelisdrugim"
                  />
                )}
                {item.reserve_insurance_price !== 0 && (
                  <img
                    className="bookingpage_header_img"
                    width="16px"
                    height="18px"
                    src={CardVerify}
                    alt="razdelisdrugim"
                    title={`Страхование: ${item.reserve_insurance_price} BYN`}
                  />
                )}
                {item.reserve_insurance_price === 0 && (
                  <img
                    className="bookingpage_header_img"
                    width="16px"
                    height="18px"
                    src={cardVerifyDisabled}
                    alt="razdelisdrugim"
                  />
                )}
                {item.reserve_servicefee_price !== 0 && (
                  <img
                    className="bookingpage_header_img"
                    width="17px"
                    height="17px"
                    src={SettingIcon}
                    alt="razdelisdrugim"
                    title={`Сервисный сбор: ${item.reserve_servicefee_price} BYN`}
                  />
                )}
                {item.reserve_servicefee_price === 0 && (
                  <img
                    className="bookingpage_header_img"
                    width="17px"
                    height="17px"
                    src={cardMoneyDisabled}
                    alt="razdelisdrugim"
                  />
                )}
                <img
                  width="14px"
                  height="18px"
                  src={cardFireDisabled}
                  alt="razdelisdrugim"
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

              {item.reservation_status === "COMPLETED" && (
                <p className="body_allblock_header_right_center_block1-p4">
                  Завершено
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
              {true && (
                <div className="center_block_rowstyle_2">
                  <p
                    className="center_block_rowstyle-p2-2"
                    style={{ fontSize: "18px" }}
                  >
                    {item.reserve_offer_price_rent > 0
                      ? item.reserve_offer_price_rent
                      : item.reserve_price_rent}{" "}
                    BYN /
                  </p>
                  <p
                    className="center_block_rowstyle-p2-1"
                    style={{ marginLeft: "5px", fontSize: "18px" }}
                  >
                    {item.item_id.rent}
                  </p>
                </div>
              )}
              {(item.reserve_price_rent !== 0 ||
                item.reserve_offer_price_rent !== 0) && (
                <div className="center_block_rowstyle_2">
                  <p className="center_block_rowstyle-p2-1">
                    Стоимость аренды за весь период
                  </p>
                  <p className="center_block_rowstyle-p2-2">
                    {(item.reserve_price_rent
                      ? item.reserve_price_rent
                      : item.reserve_offer_price_rent) * item.count_date_object}
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
        {/* footer */}
        <div className="body_allblock_footer">
          {/* подтвердить / отклонить */}
          {type === 2 && item.reservation_status === "WAITING" && (
            <div
              style={{
                flexDirection: "row",
                display: "flex",
                justifyContent: "space-evenly",
                width: "100%",
              }}
            >
              <div className="center_block_rowstyle_4">
                <img src={successbooking} alt="razdelisdrugim" />
                <p
                  className="body_allblock_header_left_text-p-green"
                  style={{ cursor: "pointer" }}
                  onClick={handleReservationSubmit}
                >
                  Подтвердить бронирование
                </p>
              </div>
              <div className="center_block_rowstyle_4">
                <img src={nosuccess} alt="razdelisdrugim" />
                <p
                  className="body_allblock_header_left_text-p-red"
                  style={{ cursor: "pointer" }}
                  onClick={handleReservationAbort}
                >
                  Отклонить бронирование
                </p>
              </div>
            </div>
          )}

          {/* отменить бронирование ( когда уже подтверждено ) */}
          {item.reservation_status === "SUBMITTED" && (
            <div
              style={{
                flexDirection: "row",
                display: "flex",
                justifyContent: "space-evenly",
                width: "100%",
              }}
            >
              <div className="center_block_rowstyle_4_4">
                <img src={disabledbooking} alt="razdelisdrugim" />
                <p
                  className="body_allblock_header_left_text-p-disabledbooking"
                  style={{ cursor: "pointer" }}
                  onClick={handleReservationCancel}
                >
                  Отменить бронирование
                </p>
              </div>
            </div>
          )}

          {/* Все статусы кроме подтверждено и ожидания  */}
          {type === 1 &&
            item.reservation_status !== "SUBMITTED" &&
            item.reservation_status !== "WAITING" && (
              <div className="center_block_rowstyle_4_4">
                <img
                  width="15px"
                  height="20px"
                  src={Retakevector}
                  alt="pictute1"
                  style={{ cursor: "pointer" }}
                />
                <Link
                  to={`/item-card?id=${item.item_id.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <p
                    className="body_allblock_header_left_text-p-p1"
                    style={{ cursor: "pointer" }}
                  >
                    Повторить бронирование
                  </p>
                </Link>
              </div>
            )}

          {item.reservation_status === "WAITING" && type === 1 && (
            <div
              style={{
                flexDirection: "row",
                display: "flex",
                justifyContent: "space-evenly",
                width: "100%",
              }}
            >
              <div className="center_block_rowstyle_4_4">
                <img src={disabledbooking} alt="razdelisdrugim" />
                <p
                  className="body_allblock_header_left_text-p-disabledbooking"
                  style={{ cursor: "pointer" }}
                  onClick={handleReservationCancel}
                >
                  Отменить бронирование
                </p>
              </div>
            </div>
          )}

          {item.reservation_status === "DENIED" && type === 2 && (
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
          )}

          {item.reservation_status === "CANCELED" && type === 2 && (
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
          )}

          {/* если завершено */}

          {item.reservation_status === "COMPLETED" && (
            <div
              style={
                type === 1
                  ? { marginLeft: "20px", cursor: "pointer" }
                  : { cursor: "pointer" }
              }
              onClick={handleReviewSend}
              className="center_block_rowstyle_4"
            >
              <img
                width="17px"
                height="15px"
                src={Review}
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

      {/* IPAD */}
      <div
        className="content__booking_right_body_allblock"
        id="globaldata_ipad"
      >
        {/* header block */}
        <div className="body_allblock_header">
          <div className="body_allblock_header_left">
            <div className="body_allblock_header_left_photo">
              <Link
                to={`/item-card?id=${item.item_id.id}`}
                style={{ textDecoration: "none" }}
              >
                <img
                  src={`data:image/png;base64,${item.item_id.image_1}`}
                  alt="razdelisdrugim"
                  className="booking_card_image"
                />
              </Link>
            </div>
            <div className="body_allblock_header_left_text">
              <img
                className="header_left_text_icon"
                src={SearchVector}
                alt="razdelisdrugim"
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
            <div
              className="body_allblock_header_right_center_block2"
              style={{ border: "0" }}
            >
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
            <Link
              to={`/chat?id=${item.chat_id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="body_allblock_header_left_buttons">
                <button className="header_left_buttons1">Написать</button>
              </div>
            </Link>
            {item.reservation_status === "SUBMITTED" && (
              <div className="body_allblock_header_left_buttons">
                <button
                  className="header_left_buttons2"
                  onClick={typeContactsHandler}
                >
                  Контакты
                </button>
              </div>
            )}
            {item.reservation_status === "SUBMITTED" && contacts === true && (
              <div className="body_allblock_header_left_contacts">
                <div className="left_contacts_row">
                  <img
                    width="30px"
                    height="30px"
                    src={telephone}
                    alt="vectors"
                  />
                  <p>
                    {" "}
                    {type === 1
                      ? item.owner_contact.phone
                      : type === 2
                      ? item.renter_contact.phone
                      : ""}
                  </p>
                </div>
                {((type === 1 && item.owner_contact.google_account) ||
                  (type === 2 && item.renter_contact.google_account)) && (
                  <div className="left_contacts_row">
                    <img
                      width="30px"
                      height="30px"
                      src={gmailImg}
                      alt="vectors"
                    />
                    <p>
                      {type === 1
                        ? item.owner_contact.google_account
                        : type === 2
                        ? item.renter_contact.google_account
                        : ""}
                    </p>
                  </div>
                )}
                {((type === 1 && item.owner_contact.telegram_account) ||
                  (type === 2 && item.renter_contact.telegram_account)) && (
                  <div className="left_contacts_row">
                    <img width="30px" height="30px" src={tgImg} alt="vectors" />
                    <p>
                      {type === 1
                        ? `@${item.owner_contact.telegram_account}`
                        : type === 2
                        ? `@${item.renter_contact.telegram_account}`
                        : ""}
                    </p>
                  </div>
                )}
                {((type === 1 && item.owner_contact.viber_account) ||
                  (type === 2 && item.renter_contact.viber_account)) && (
                  <div className="left_contacts_row">
                    <img
                      width="30px"
                      height="30px"
                      src={viberImg}
                      alt="vectors"
                    />
                    <p>
                      {type === 1
                        ? `+${item.owner_contact.viber_account}`
                        : type === 2
                        ? `+${item.renter_contact.viber_account}`
                        : ""}
                    </p>
                  </div>
                )}
                {((type === 1 && item.owner_contact.whatsapp_account) ||
                  (type === 2 && item.renter_contact.whatsapp_account)) && (
                  <div className="left_contacts_row">
                    <img
                      width="30px"
                      height="30px"
                      src={WhatsAppLogo}
                      alt="vectors"
                    />
                    <p>
                      {type === 1
                        ? `+${item.owner_contact.whatsapp_account}`
                        : type === 2
                        ? `+${item.renter_contact.whatsapp_account}`
                        : ""}
                    </p>
                  </div>
                )}
                {((type === 1 && item.owner_contact.link_instagram) ||
                  (type === 2 && item.renter_contact.link_instagram)) && (
                  <div className="left_contacts_row">
                    <img
                      width="30px"
                      height="30px"
                      src={InstagramLogo}
                      alt="vectors"
                    />
                    <p>
                      {type === 1
                        ? item.owner_contact.link_instagram
                        : type === 2
                        ? item.renter_contact.link_instagram
                        : ""}
                    </p>
                  </div>
                )}
                {((type === 1 && item.owner_contact.ok_account) ||
                  (type === 2 && item.renter_contact.ok_account)) && (
                  <div className="left_contacts_row">
                    <img
                      width="30px"
                      height="30px"
                      src={OkLogo}
                      alt="vectors"
                    />
                    <p>
                      {type === 1
                        ? item.owner_contact.ok_account
                        : type === 2
                        ? item.renter_contact.ok_account
                        : ""}
                    </p>
                  </div>
                )}
                {((type === 1 && item.owner_contact.vk_account) ||
                  (type === 2 && item.renter_contact.vk_account)) && (
                  <div className="left_contacts_row">
                    <img
                      width="30px"
                      height="30px"
                      src={VkLogo}
                      alt="vectors"
                    />
                    <p>
                      {type === 1
                        ? item.owner_contact.vk_account
                        : type === 2
                        ? item.renter_contact.vk_account
                        : ""}
                    </p>
                  </div>
                )}
                {((type === 1 && item.owner_contact.link_facebook) ||
                  (type === 2 && item.renter_contact.link_facebook)) && (
                  <div className="left_contacts_row">
                    <img
                      width="30px"
                      height="30px"
                      src={FbLogo}
                      alt="vectors"
                    />
                    <p>
                      {type === 1
                        ? item.owner_contact.link_facebook
                        : type === 2
                        ? item.renter_contact.link_facebook
                        : ""}
                    </p>
                  </div>
                )}
              </div>
            )}
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
                    alt="razdelisdrugim"
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
                    alt="razdelisdrugim"
                  />
                )}
                {item.reserve_pledge_price !== 0 && (
                  <img
                    className="bookingpage_header_img"
                    width="18px"
                    height="16px"
                    src={Moneytime}
                    alt="razdelisdrugim"
                    title={`Залог: ${item.reserve_pledge_price} BYN`}
                  />
                )}
                {item.reserve_pledge_price === 0 && (
                  <img
                    className="bookingpage_header_img"
                    width="18px"
                    height="16px"
                    src={moneyTimeDisabled}
                    alt="razdelisdrugim"
                  />
                )}
                {item.reserve_contract && (
                  <img
                    className="bookingpage_header_img"
                    width="14px"
                    height="16px"
                    src={Union}
                    alt="razdelisdrugim"
                    title="Договор обязателен"
                  />
                )}
                {!item.reserve_contract && (
                  <img
                    className="bookingpage_header_img"
                    width="14px"
                    height="16px"
                    src={UnionDisabled}
                    alt="razdelisdrugim"
                  />
                )}
                {item.reserve_insurance_price !== 0 && (
                  <img
                    className="bookingpage_header_img"
                    width="16px"
                    height="18px"
                    src={CardVerify}
                    alt="razdelisdrugim"
                    title={`Страхование: ${item.reserve_insurance_price} BYN`}
                  />
                )}
                {item.reserve_insurance_price === 0 && (
                  <img
                    className="bookingpage_header_img"
                    width="16px"
                    height="18px"
                    src={cardVerifyDisabled}
                    alt="razdelisdrugim"
                  />
                )}
                {item.reserve_servicefee_price !== 0 && (
                  <img
                    className="bookingpage_header_img"
                    width="17px"
                    height="17px"
                    src={SettingIcon}
                    alt="razdelisdrugim"
                    title={`Сервисный сбор: ${item.reserve_servicefee_price} BYN`}
                  />
                )}
                {item.reserve_servicefee_price === 0 && (
                  <img
                    className="bookingpage_header_img"
                    width="17px"
                    height="17px"
                    src={cardMoneyDisabled}
                    alt="razdelisdrugim"
                  />
                )}
                <img
                  width="14px"
                  height="18px"
                  src={cardFireDisabled}
                  alt="razdelisdrugim"
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
              {item.reservation_status === "COMPLETED" && (
                <p className="body_allblock_header_right_center_block1-p4">
                  Завершено
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
              {true && (
                <div className="center_block_rowstyle_2">
                  <p
                    className="center_block_rowstyle-p2-2"
                    style={{ fontSize: "18px" }}
                  >
                    {item.reserve_offer_price_rent > 0
                      ? item.reserve_offer_price_rent
                      : item.reserve_price_rent}{" "}
                    BYN /
                  </p>
                  <p
                    className="center_block_rowstyle-p2-1"
                    style={{ marginLeft: "5px", fontSize: "18px" }}
                  >
                    {item.item_id.rent}
                  </p>
                </div>
              )}
              {(item.reserve_price_rent !== 0 ||
                item.reserve_offer_price_rent !== 0) && (
                <div className="center_block_rowstyle_2">
                  <p className="center_block_rowstyle-p2-1">
                    Стоимость аренды за весь период
                  </p>
                  <p className="center_block_rowstyle-p2-2">
                    {(item.reserve_price_rent
                      ? item.reserve_price_rent
                      : item.reserve_offer_price_rent) * item.count_date_object}
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
        {/* footer */}
        <div className="body_allblock_footer">
          {/* подтвердить / отклонить */}
          {type === 2 && item.reservation_status === "WAITING" && (
            <div
              style={{
                flexDirection: "row",
                display: "flex",
                justifyContent: "space-evenly",
                width: "100%",
              }}
            >
              <div className="center_block_rowstyle_4">
                <img src={successbooking} alt="razdelisdrugim" />
                <p
                  className="body_allblock_header_left_text-p-green"
                  style={{ cursor: "pointer" }}
                  onClick={handleReservationSubmit}
                >
                  Подтвердить бронирование
                </p>
              </div>
              <div className="center_block_rowstyle_4">
                <img src={nosuccess} alt="razdelisdrugim" />
                <p
                  className="body_allblock_header_left_text-p-red"
                  style={{ cursor: "pointer" }}
                  onClick={handleReservationAbort}
                >
                  Отклонить бронирование
                </p>
              </div>
            </div>
          )}

          {/* отменить бронирование ( когда уже подтверждено ) */}
          {item.reservation_status === "SUBMITTED" && (
            <div
              style={{
                flexDirection: "row",
                display: "flex",
                justifyContent: "space-evenly",
                width: "100%",
              }}
            >
              <div className="center_block_rowstyle_4_4">
                <img src={disabledbooking} alt="razdelisdrugim" />
                <p
                  className="body_allblock_header_left_text-p-disabledbooking"
                  style={{ cursor: "pointer" }}
                  onClick={handleReservationCancel}
                >
                  Отменить бронирование
                </p>
              </div>
            </div>
          )}

          {/* Все статусы кроме подтверждено и ожидания  */}
          {type === 1 &&
            item.reservation_status !== "SUBMITTED" &&
            item.reservation_status !== "WAITING" && (
              <div className="center_block_rowstyle_4_4">
                <img
                  width="15px"
                  height="20px"
                  src={Retakevector}
                  alt="pictute1"
                  style={{ cursor: "pointer" }}
                />
                <Link
                  to={`/item-card?id=${item.item_id.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <p
                    className="body_allblock_header_left_text-p-p1"
                    style={{ cursor: "pointer" }}
                  >
                    Повторить бронирование
                  </p>
                </Link>
              </div>
            )}

          {item.reservation_status === "WAITING" && type === 1 && (
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
          )}

          {item.reservation_status === "DENIED" && type === 2 && (
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
          )}

          {item.reservation_status === "CANCELED" && type === 2 && (
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
          )}

          {/* если завершено */}

          {item.reservation_status === "COMPLETED" && (
            <div className="center_block_rowstyle_4">
              <img
                width="17px"
                height="15px"
                src={Review}
                alt="pictute1"
                style={
                  type === 1
                    ? { marginLeft: "20px", cursor: "pointer" }
                    : { cursor: "pointer" }
                }
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

      {/* MOBILE */}
      <div
        className="content__booking_right_body_allblock"
        style={
          !(index <= countShowedTablesCouples * 3 - 1)
            ? { display: "none" }
            : {}
        }
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
                    src={`data:image/png;base64,${item.item_id.image_1}`}
                    alt="razdelisdrugim"
                    className="booking_card_image"
                  />
                </Link>
              </div>
              <div className="body_allblock_header_left_text">
                <img
                  className="header_left_text_icon"
                  src={SearchVector}
                  alt="razdelisdrugim"
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
                      alt="razdelisdrugim"
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
                      alt="razdelisdrugim"
                    />
                  )}
                  {item.reserve_pledge_price !== 0 && (
                    <img
                      className="bookingpage_header_img"
                      width="18px"
                      height="16px"
                      src={Moneytime}
                      alt="razdelisdrugim"
                      title={`Залог: ${item.reserve_pledge_price} BYN`}
                    />
                  )}
                  {item.reserve_pledge_price === 0 && (
                    <img
                      className="bookingpage_header_img"
                      width="18px"
                      height="16px"
                      src={moneyTimeDisabled}
                      alt="razdelisdrugim"
                    />
                  )}
                  {item.reserve_contract && (
                    <img
                      className="bookingpage_header_img"
                      width="14px"
                      height="16px"
                      src={Union}
                      alt="razdelisdrugim"
                      title="Договор обязателен"
                    />
                  )}
                  {!item.reserve_contract && (
                    <img
                      className="bookingpage_header_img"
                      width="14px"
                      height="16px"
                      src={UnionDisabled}
                      alt="razdelisdrugim"
                    />
                  )}
                  {item.reserve_insurance_price !== 0 && (
                    <img
                      className="bookingpage_header_img"
                      width="16px"
                      height="18px"
                      src={CardVerify}
                      alt="razdelisdrugim"
                      title={`Страхование: ${item.reserve_insurance_price} BYN`}
                    />
                  )}
                  {item.reserve_insurance_price === 0 && (
                    <img
                      className="bookingpage_header_img"
                      width="16px"
                      height="18px"
                      src={cardVerifyDisabled}
                      alt="razdelisdrugim"
                    />
                  )}
                  {item.reserve_servicefee_price !== 0 && (
                    <img
                      className="bookingpage_header_img"
                      width="17px"
                      height="17px"
                      src={SettingIcon}
                      alt="razdelisdrugim"
                      title={`Сервисный сбор: ${item.reserve_servicefee_price} BYN`}
                    />
                  )}
                  {item.reserve_servicefee_price === 0 && (
                    <img
                      className="bookingpage_header_img"
                      width="17px"
                      height="17px"
                      src={cardMoneyDisabled}
                      alt="razdelisdrugim"
                    />
                  )}
                  <img
                    width="14px"
                    height="18px"
                    src={cardFireDisabled}
                    alt="razdelisdrugim"
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

                {item.reservation_status === "COMPLETED" && (
                  <p className="body_allblock_header_right_center_block1-p4">
                    Завершено
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

          <div className="body_allblock_header_right_center_block5">
            <div
              className="center_block_rowstyle"
              style={{ marginBottom: "10px" }}
            >
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
            <div
              className="body_allblock_header_right_center_block2_row"
              style={{ cursor: "pointer" }}
            >
              {item.reservation_status === "SUBMITTED" && (
                <div className="center_block_rowstyle_3">
                  <img
                    width="19px"
                    height="20px"
                    src={miniMobile}
                    alt="pictute1"
                    style={{ cursor: "pointer" }}
                  />

                  <p
                    className="body_allblock_header_left_text-p-p"
                    style={{ cursor: "pointer" }}
                    onClick={typeContactsHandler}
                  >
                    Показать контакты
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
                    className="body_allblock_header_left_text-p-p"
                    style={{ cursor: "pointer" }}
                  >
                    Написать
                  </p>
                </Link>
              </div>
            </div>
            {item.reservation_status === "SUBMITTED" && contacts === true && (
              <div className="body_allblock_header_left_contacts">
                <div className="left_contacts_row">
                  <img
                    width="30px"
                    height="30px"
                    src={telephone}
                    alt="vectors"
                  />
                  <p>
                    {" "}
                    {type === 1
                      ? item.owner_contact.phone
                      : type === 2
                      ? item.renter_contact.phone
                      : ""}
                  </p>
                </div>
                {((type === 1 && item.owner_contact.google_account) ||
                  (type === 2 && item.renter_contact.google_account)) && (
                  <div className="left_contacts_row">
                    <img
                      width="30px"
                      height="30px"
                      src={gmailImg}
                      alt="vectors"
                    />
                    <p>
                      {type === 1
                        ? item.owner_contact.google_account
                        : type === 2
                        ? item.renter_contact.google_account
                        : ""}
                    </p>
                  </div>
                )}
                {((type === 1 && item.owner_contact.telegram_account) ||
                  (type === 2 && item.renter_contact.telegram_account)) && (
                  <div className="left_contacts_row">
                    <img width="30px" height="30px" src={tgImg} alt="vectors" />
                    <p>
                      {type === 1
                        ? `@${item.owner_contact.telegram_account}`
                        : type === 2
                        ? `@${item.renter_contact.telegram_account}`
                        : ""}
                    </p>
                  </div>
                )}
                {((type === 1 && item.owner_contact.viber_account) ||
                  (type === 2 && item.renter_contact.viber_account)) && (
                  <div className="left_contacts_row">
                    <img
                      width="30px"
                      height="30px"
                      src={viberImg}
                      alt="vectors"
                    />
                    <p>
                      {type === 1
                        ? `+${item.owner_contact.viber_account}`
                        : type === 2
                        ? `+${item.renter_contact.viber_account}`
                        : ""}
                    </p>
                  </div>
                )}
                {((type === 1 && item.owner_contact.whatsapp_account) ||
                  (type === 2 && item.renter_contact.whatsapp_account)) && (
                  <div className="left_contacts_row">
                    <img
                      width="30px"
                      height="30px"
                      src={WhatsAppLogo}
                      alt="vectors"
                    />
                    <p>
                      {type === 1
                        ? `+${item.owner_contact.whatsapp_account}`
                        : type === 2
                        ? `+${item.renter_contact.whatsapp_account}`
                        : ""}
                    </p>
                  </div>
                )}
                {((type === 1 && item.owner_contact.link_instagram) ||
                  (type === 2 && item.renter_contact.link_instagram)) && (
                  <div className="left_contacts_row">
                    <img
                      width="30px"
                      height="30px"
                      src={InstagramLogo}
                      alt="vectors"
                    />
                    <p>
                      {type === 1
                        ? item.owner_contact.link_instagram
                        : type === 2
                        ? item.renter_contact.link_instagram
                        : ""}
                    </p>
                  </div>
                )}
                {((type === 1 && item.owner_contact.ok_account) ||
                  (type === 2 && item.renter_contact.ok_account)) && (
                  <div className="left_contacts_row">
                    <img
                      width="30px"
                      height="30px"
                      src={OkLogo}
                      alt="vectors"
                    />
                    <p>
                      {type === 1
                        ? item.owner_contact.ok_account
                        : type === 2
                        ? item.renter_contact.ok_account
                        : ""}
                    </p>
                  </div>
                )}
                {((type === 1 && item.owner_contact.vk_account) ||
                  (type === 2 && item.renter_contact.vk_account)) && (
                  <div className="left_contacts_row">
                    <img
                      width="30px"
                      height="30px"
                      src={VkLogo}
                      alt="vectors"
                    />
                    <p>
                      {type === 1
                        ? item.owner_contact.vk_account
                        : type === 2
                        ? item.renter_contact.vk_account
                        : ""}
                    </p>
                  </div>
                )}
                {((type === 1 && item.owner_contact.link_facebook) ||
                  (type === 2 && item.renter_contact.link_facebook)) && (
                  <div className="left_contacts_row">
                    <img
                      width="30px"
                      height="30px"
                      src={FbLogo}
                      alt="vectors"
                    />
                    <p>
                      {type === 1
                        ? item.owner_contact.link_facebook
                        : type === 2
                        ? item.renter_contact.link_facebook
                        : ""}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="body_allblock_header_right_center_block2">
            {true && (
              <div className="center_block_rowstyle_2">
                <p
                  className="center_block_rowstyle-p2-2"
                  style={{ fontSize: "16px" }}
                >
                  {item.reserve_offer_price_rent > 0
                    ? item.reserve_offer_price_rent
                    : item.reserve_price_rent}{" "}
                  BYN /
                </p>
                <p
                  className="center_block_rowstyle-p2-1"
                  style={{ marginLeft: "5px", fontSize: "16px" }}
                >
                  {item.item_id.rent}
                </p>
              </div>
            )}
            {(item.reserve_price_rent !== 0 ||
              item.reserve_offer_price_rent !== 0) && (
              <div className="center_block_rowstyle_2">
                <p className="center_block_rowstyle-p2-1">
                  Стоимость аренды за весь период
                </p>
                <p className="center_block_rowstyle-p2-2">
                  {(item.reserve_price_rent
                    ? item.reserve_price_rent
                    : item.reserve_offer_price_rent) * item.count_date_object}
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
        <div
          style={{ flexDirection: "column" }}
          className="body_allblock_footer"
        >
          {/* подтвердить / отклонить */}
          {type === 2 && item.reservation_status === "WAITING" && (
            <div
              style={{
                flexDirection: "row",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div className="center_block_rowstyle_4">
                <img src={nosuccess} alt="razdelisdrugim" />
                <p
                  className="body_allblock_header_left_text-p-red"
                  style={{ cursor: "pointer" }}
                  onClick={handleReservationAbort}
                >
                  Отклонить бронирование
                </p>
              </div>
              <div className="center_block_rowstyle_4">
                <img src={successbooking} alt="razdelisdrugim" />
                <p
                  className="body_allblock_header_left_text-p-green"
                  style={{ cursor: "pointer" }}
                  onClick={handleReservationSubmit}
                >
                  Подтвердить бронирование
                </p>
              </div>
            </div>
          )}

          {/* отменить бронирование ( когда уже подтверждено ) */}
          {item.reservation_status === "SUBMITTED" && (
            <div className="center_block_rowstyle_4_4">
              <img src={disabledbooking} alt="razdelisdrugim" />
              <p
                className="body_allblock_header_left_text-p-disabledbooking"
                style={{ cursor: "pointer" }}
                onClick={handleReservationCancel}
              >
                Отменить бронирование
              </p>
            </div>
          )}

          {/* отменить бронирование ( когда  ожидает ) */}

          {/* Все статусы кроме подтверждено  */}
          {type === 1 &&
            item.reservation_status !== "SUBMITTED" &&
            item.reservation_status !== "WAITING" && (
              <div className="center_block_rowstyle_4_4">
                <img
                  width="15px"
                  height="20px"
                  src={Retakevector}
                  alt="pictute1"
                  style={{ cursor: "pointer" }}
                />
                <Link
                  to={`/item-card?id=${item.item_id.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <p
                    className="body_allblock_header_left_text-p-p1"
                    style={{ cursor: "pointer" }}
                  >
                    Повторить бронирование
                  </p>
                </Link>
              </div>
            )}

          {item.reservation_status === "COMPLETED" && (
            <div className="center_block_rowstyle_4">
              <img
                width="17px"
                height="15px"
                src={Review}
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
