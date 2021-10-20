import React from "react";
import Avatar from "../../img/BookingPage/avatar.png";
import SearchVector from "../../img/BookingPage/searchvector.png";
import Car from "../../img/BookingPage/car.webp";
import SettingIcon from "../../img/BookingPage/card-money.webp";
import Union from "../../img/BookingPage/Union.webp";
import CardVerify from "../../img/BookingPage/card-verify.webp";
import Moneytime from "../../img/BookingPage/money-time.webp";
import CardFire from "../../img/BookingPage/card-fire.webp";
import NoCompleted from "../../img/BookingPage/nocompleted.png";
import Retakevector from "../../img/BookingPage/retakevector.png";
import Sms from "../../img/BookingPage/sms.png";
import Textonpage from "../../img/BookingPage/textonpage.png";

const BookingITake = () => {
  return (
    <div className="content__booking_right_body">
      <div className="content__booking_right_body_allblock">
        {/* header block */}
        <div className="body_allblock_header">
          <div className="body_allblock_header_left">
            <div className="body_allblock_header_left_photo">
              <img src={Avatar} alt="picture1" />
            </div>
            <div className="body_allblock_header_left_text">
              <img
                className="header_left_text_icon"
                src={SearchVector}
                alt="picture1"
                width="23px"
                height="20px"
              />
              <p className="body_allblock_header_left_text-p">
                Показать на карте
              </p>
            </div>
          </div>
          {/* right */}
          <div className="body_allblock_header_right">
            <div className="body_allblock_header_right_header">
              <p className="body_allblock_header_right_header-p">
                {" "}
                Ноутбук Apple MacBook Air13" M{" "}
              </p>
              <div className="body_allblock_header_right_header_img">
                <img
                  className="bookingpage_header_img"
                  width="20px"
                  height="13px"
                  src={Car}
                  alt="picture1"
                />
                <img
                  className="bookingpage_header_img"
                  width="18px"
                  height="16px"
                  src={Moneytime}
                  alt="picture1"
                />
                <img
                  className="bookingpage_header_img"
                  width="14px"
                  height="16px"
                  src={Union}
                  alt="picture1"
                />
                <img
                  className="bookingpage_header_img"
                  width="16px"
                  height="18px"
                  src={CardVerify}
                  alt="picture1"
                />
                <img
                  className="bookingpage_header_img"
                  width="17px"
                  height="17px"
                  src={SettingIcon}
                  alt="picture1"
                />
                <img width="14px" height="18px" src={CardFire} alt="picture1" />
              </div>
            </div>
            {/* center blocks */}
            <div className="body_allblock_header_right_center_block1">
              {true && (
                <p className="body_allblock_header_right_center_block1-p">
                  Подтверждено
                </p>
              )}
              {false && (
                <p className="body_allblock_header_right_center_block1-p2">
                  Отклонено
                </p>
              )}
              {false && (
                <p className="body_allblock_header_right_center_block1-p3">
                  Завершено
                </p>
              )}
            </div>
            <div className="body_allblock_header_right_center_block2">
              <div className="center_block_rowstyle">
                <p className="center_block_rowstyle-p1-1">Начало аренды</p>
                <p className="center_block_rowstyle-p1-2">20 октября</p>
              </div>
              <div className="center_block_rowstyle">
                <p className="center_block_rowstyle-p1-1">Конец аренды</p>
                <p className="center_block_rowstyle-p1-2">21 октября</p>
              </div>
            </div>

            <div className="body_allblock_header_right_center_block2">
              <div className="center_block_rowstyle">
                {true && <p className="center_block_rowstyle-p1-1">Владелец</p>}
                {false && (
                  <p className="center_block_rowstyle-p1-1">Арендатор</p>
                )}
                <p className="center_block_rowstyle-p1-2">Андрей</p>
              </div>
            </div>
            <div className="body_allblock_header_right_center_block2">
              <div className="center_block_rowstyle_2">
                <p className="center_block_rowstyle-p2-1">Залог</p>
                <p className="center_block_rowstyle-p2-2">50 BYN</p>
              </div>
              <div className="center_block_rowstyle_2">
                <p className="center_block_rowstyle-p2-1">Сервисный сбор</p>
                <p className="center_block_rowstyle-p2-2">50 BYN</p>
              </div>
              <div className="center_block_rowstyle">
                <p className="center_block_rowstyle-p2-1">Страхование</p>
                <p className="center_block_rowstyle-p2-2">50 BYN</p>
              </div>
            </div>
            <div
              className="body_allblock_header_right_center_block2"
              style={{ border: "0" }}
            >
              <div className="center_block_rowstyle">
                <p className="center_block_rowstyle-p1-3">
                  Итоговая стоимость{" "}
                </p>
                <p className="center_block_rowstyle-p1-2">250 BYN</p>
              </div>
            </div>
          </div>
        </div>
        {/* footer block */}
        <div className="body_allblock_footer">
          {true && (
            <div className="center_block_rowstyle_3">
              <img
                width="20px"
                height="20px"
                src={NoCompleted}
                alt="pictute1"
                style={{ cursor: "pointer" }}
              />
              <p
                className="body_allblock_header_left_text-p"
                style={{ cursor: "pointer" }}
              >
                Отменить бронирование
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
            <p
              className="body_allblock_header_left_text-p"
              style={{ cursor: "pointer" }}
            >
              Написать владельцу
            </p>
          </div>
          {true && (
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
    </div>
  );
};

export default BookingITake;
