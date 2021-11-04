import React from "react";

import Facebook from "../../img/MainPage/Facebook.webp";
import Instagram from "../../img/MainPage/Instagram.webp";
import Logo2 from "../../img/MainPage/Logo2.webp";
import ApplePay from "../../img/MainPage/Method=ApplePay.webp";
import Mastercard from "../../img/MainPage/Method=Mastercard.webp";
import Visa from "../../img/MainPage/Method=Visa.webp";
import Webmoney from "../../img/MainPage/Method=Webmoney.webp";
import Yandex from "../../img/MainPage/Method=Yandex.webp";
import Planet from "../../img/MainPage/Planet.webp";
import VK from "../../img/MainPage/VK.webp";
import mark from "../../img/MainPage/Mark.webp";
import viber from "../../img/MainPage/viber-logo.webp";
import Tg from "../../img/MainPage/tg.png";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Footer = () => {
  const { items, isLoaded } = useSelector(({ items }) => items);

  //выделяем разделы
  const chapters = {};
  isLoaded &&
    items.length > 2 &&
    items.map((item, index) => {
      if (!chapters.hasOwnProperty(item.chapter_id.name_chapter)) {
        chapters[item.chapter_id.name_chapter] = item.chapter_id.id;
      }
    });

  return (
    <section className="footer-wrapper">
      <section className="footer">
        <div className="footer-content">
          <div className="footer-first-col">
            <ul className="footer-first-ul">
              <li className="footer-first-li main-footer-li">Сервис</li>
              <Link style={{ textDecoration: "none" }} to="/how-it-works">
                <li className="footer-first-li">Как это работает</li>
              </Link>
              <Link style={{ textDecoration: "none" }} to="/help">
                <li className="footer-first-li">Помощь</li>
              </Link>
              <Link
                style={{ textDecoration: "none" }}
                to="/delivery-and-payment"
              >
                <li className="footer-first-li">Доставка и оплата</li>
              </Link>
              <Link style={{ textDecoration: "none" }} to="/faq">
                <li className="footer-first-li">Вопросы и ответы</li>
              </Link>
              <Link style={{ textDecoration: "none" }} to="/collaboration">
                <li className="footer-first-li">Сотрудничество</li>
              </Link>
              <li className="footer-first-li">Пресса о нас</li>
              <li className="footer-first-li">Отзывы участников</li>
              <Link style={{ textDecoration: "none" }} to="/contacts">
                <li className="footer-first-li">Контакты</li>
              </Link>
            </ul>
          </div>
          <div className="footer-second-col">
            <ul className="footer-second-ul-first">
              <Link style={{ textDecoration: "none" }} to="/help">
                <li className="footer-second-li main-footer-li">Помощь</li>
              </Link>
              <Link style={{ textDecoration: "none" }} to="/guide">
                <li className="footer-second-li">Как подать объявление</li>
              </Link>
              <Link style={{ textDecoration: "none" }} to="/disputs">
                <li className="footer-second-li">Спорные ситуации</li>
              </Link>
              <Link style={{ textDecoration: "none" }} to="/protection">
                <li className="footer-second-li">Защита и гарантии</li>
              </Link>
            </ul>
            <ul className="footer-second-ul-second">
              <li className="footer-second-li main-footer-li">Арендаторам</li>
              <Link style={{ textDecoration: "none" }} to="/how-to-rent">
                <li className="footer-second-li">Как взять в аренду</li>
              </Link>
            </ul>
            <ul className="footer-second-ul-third">
              <li className="footer-second-li main-footer-li">Владельцам</li>
              <Link style={{ textDecoration: "none" }} to="/how-to-rent-out">
                <li className="footer-second-li">Как сдать в аренду</li>
              </Link>
              <Link style={{ textDecoration: "none" }} to="/for-business">
                <li className="footer-second-li">Аренда для бизнеса</li>
              </Link>
            </ul>
          </div>
          {/* пк версия */}
          <div className="footer-third-col" id="main-sections-pk">
            <ul className="footer-third-ul">
              <li className="footer-third-li main-footer-li">Разделы</li>
              {isLoaded &&
                [].concat
                  .apply(Object.entries(chapters))
                  .map((chapter, index) => {
                    if (index <= 9) {
                      return (
                        <Link
                          style={{ textDecoration: "none" }}
                          to={`/catalog?chapter_id=${chapter[1]}`}
                        >
                          <li
                            style={{ cursor: "pointer" }}
                            key={index}
                            value={chapter[1]}
                          >
                            {chapter[0]}
                          </li>
                        </Link>
                      );
                    }
                  })}
            </ul>
          </div>
          <div className="footer-fourth-col" id="main-sections-pk">
            <ul className="footer-fourth-ul">
              {isLoaded &&
                [].concat
                  .apply(Object.entries(chapters))
                  .map((chapter, index) => {
                    if (index > 9) {
                      return (
                        <Link
                          style={{ textDecoration: "none" }}
                          to={`/catalog?chapter_id=${chapter[1]}`}
                        >
                          <li
                            style={{ cursor: "pointer" }}
                            key={index}
                            value={chapter[1]}
                          >
                            {chapter[0]}
                          </li>
                        </Link>
                      );
                    }
                  })}
            </ul>
          </div>

          {/* мобильная версия */}
          <div className="footer-third-col" id="main-sections-mobile">
            <ul className="footer-third-ul">
              <li className="footer-third-li main-footer-li">Разделы</li>
              {isLoaded &&
                [].concat
                  .apply(Object.entries(chapters))
                  .map((chapter, index) => {
                    if (index <= 9) {
                      return (
                        <Link
                          style={{ textDecoration: "none" }}
                          to={`/catalog?chapter_id=${chapter[1]}`}
                        >
                          <li
                            style={{ cursor: "pointer" }}
                            key={index}
                            value={chapter[1]}
                          >
                            {chapter[0]}
                          </li>
                        </Link>
                      );
                    }
                  })}
            </ul>
          </div>
          <div className="footer-fourth-col" id="main-sections-mobile">
            <ul className="footer-fourth-ul">
              {isLoaded &&
                [].concat
                  .apply(Object.entries(chapters))
                  .map((chapter, index) => {
                    if (index > 9) {
                      return (
                        <Link
                          style={{ textDecoration: "none" }}
                          to={`/catalog?chapter_id=${chapter[1]}`}
                        >
                          <li
                            style={{ cursor: "pointer" }}
                            key={index}
                            value={chapter[1]}
                          >
                            {chapter[0]}
                          </li>
                        </Link>
                      );
                    }
                  })}
            </ul>
          </div>

          <div className="footer-fifth-col">
            <div className="footer-socials">
              <img
                alt="razdelisdrugim"
                src={Instagram}
                className="footer-social"
              />
              <img
                alt="razdelisdrugim"
                src={Facebook}
                className="footer-social"
              />
              <img alt="razdelisdrugim" src={VK} className="footer-social" />
            </div>
            <div style={{ display: "flex" }}>
              <p className="footer-fifth-p" style={{ marginRight: "10px" }}>
                Наши боты:
              </p>
              <a
                href={
                  window.screen.width > 1024
                    ? "viber://pa?chatURI=razdelisdrugim"
                    : "viber://pa/info?uri=razdelisdrugim"
                }
                target="_blank"
                rel="noreferrer"
              >
                <img
                  alt="razdelisdrugim"
                  style={{ width: "25px", height: "25px", marginRight: "15px" }}
                  src={viber}
                  className="footer-social"
                />
              </a>
              <a
                href={`https://t.me/razdelisdrugim_bot`}
                target="_blank"
                rel="noreferrer"
              >
                <img
                  alt="razdelisdrugim"
                  style={{ width: "25px", height: "25px" }}
                  src={Tg}
                  className="footer-social"
                />
              </a>
            </div>
            <p className="footer-fifth-p">Все сделки защищены</p>
            <div className="footer-payments">
              <img
                alt="razdelisdrugim"
                src={ApplePay}
                className="footer-payment"
              />
              <img alt="razdelisdrugim" src={Visa} className="footer-payment" />
              <img
                alt="razdelisdrugim"
                src={Mastercard}
                className="footer-payment"
              />
              <img
                alt="razdelisdrugim"
                src={Yandex}
                className="footer-payment"
              />
              <img
                alt="razdelisdrugim"
                src={Webmoney}
                className="footer-payment"
              />
            </div>
          </div>
        </div>
      </section>
      <div className="footer-lower-part" id="footer-lower1">
        <div className="footer-img-logo-wrapper">
          <img alt="razdelisdrugim" src={Logo2} className="footer-img-logo" />
        </div>
        <div className="footer-lower-labels">
          <Link
            style={{ textDecoration: "none", cursor: "pointer" }}
            to="/users-agreement"
          >
            <p className="footer-lower-label">Пользовательское соглашение</p>
          </Link>
          <Link
            style={{ textDecoration: "none", cursor: "pointer" }}
            to="/confidence-policy"
          >
            <p className="footer-lower-label">Политика конфиденциальности</p>
          </Link>
        </div>
        <div className="footer-localization-wrapper">
          <img
            alt="razdelisdrugim"
            src={Planet}
            className="footer-planet-img"
          />
          <p className="footer-localization-p">RU</p>
        </div>
      </div>

      <div className="footer-lower-part" id="footer-lower2">
        <div className="footer-lower-labels">
          <Link
            style={{ textDecoration: "none", cursor: "pointer" }}
            to="/users-agreement"
          >
            <p className="footer-lower-label">Пользовательское соглашение</p>
          </Link>
          <Link
            style={{ textDecoration: "none", cursor: "pointer" }}
            to="/confidence-policy"
          >
            <p className="footer-lower-label">Политика конфиденциальности</p>
          </Link>
        </div>
        <div className="footer-img-logo-wrapper_gl">
          <div className="footer-img-logo-wrapper">
            <img
              width="200px"
              alt="razdelisdrugim"
              src={Logo2}
              className="footer-img-logo"
            />
          </div>
          <div className="foooter-right_item">
            <div className="location-selector" id="location-selector2">
              <img alt="razdelisdrugim" src={mark} className="location-img1" />
              <p className="location-p">Минск</p>
            </div>
            <div className="footer-localization-wrapper">
              <img
                alt="razdelisdrugim"
                src={Planet}
                className="footer-planet-img"
              />
              <p className="footer-localization-p">RU</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
