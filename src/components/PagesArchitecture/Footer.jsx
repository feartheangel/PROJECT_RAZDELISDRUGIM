import React from 'react';

import Facebook from '../../img/MainPage/Facebook.png';
import Instagram from '../../img/MainPage/Instagram.png';
import Logo2 from '../../img/MainPage/Logo2.png';
import ApplePay from '../../img/MainPage/Method=ApplePay.png';
import Mastercard from '../../img/MainPage/Method=Mastercard.png';
import Visa from '../../img/MainPage/Method=Visa.png';
import Webmoney from '../../img/MainPage/Method=Webmoney.png';
import Yandex from '../../img/MainPage/Method=Yandex.png';
import Planet from '../../img/MainPage/Planet.png';
import VK from '../../img/MainPage/VK.png';
import mark from '../../img/MainPage/Mark.png';

import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

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
              <Link style={{ textDecoration: 'none' }} to="/how-it-works">
                <li className="footer-first-li">Как это работает</li>
              </Link>
              <Link style={{ textDecoration: 'none' }} to="/help">
                <li className="footer-first-li">Помощь</li>
              </Link>
              <Link style={{ textDecoration: 'none' }} to="/delivery-and-payment">
                <li className="footer-first-li">Доставка и оплата</li>
              </Link>
              <Link style={{ textDecoration: 'none' }} to="/faq">
                <li className="footer-first-li">Вопросы и ответы</li>
              </Link>
              <Link style={{ textDecoration: 'none' }} to="/collaboration">
                <li className="footer-first-li">Сотрудничество</li>
              </Link>
              <li className="footer-first-li">Пресса о нас</li>
              <li className="footer-first-li">Отзывы участников</li>
              <li className="footer-first-li">Контакты</li>
            </ul>
          </div>
          <div className="footer-second-col">
            <ul className="footer-second-ul-first">
              <Link style={{ textDecoration: 'none' }} to="/help">
                <li className="footer-second-li main-footer-li">Помощь</li>
              </Link>
              <Link style={{ textDecoration: 'none' }} to="/guide">
                <li className="footer-second-li">Как подать объявление</li>
              </Link>
              <Link style={{ textDecoration: 'none' }} to="/disputs">
                <li className="footer-second-li">Спорные ситуации</li>
              </Link>
              <Link style={{ textDecoration: 'none' }} to="/protection">
                <li className="footer-second-li">Защита и гарантии</li>
              </Link>
            </ul>
            <ul className="footer-second-ul-second">
              <li className="footer-second-li main-footer-li">Арендаторам</li>
              <Link style={{ textDecoration: 'none' }} to="/how-to-rent">
                <li className="footer-second-li">Как взять в аренду</li>
              </Link>
            </ul>
            <ul className="footer-second-ul-third">
              <li className="footer-second-li main-footer-li">Владельцам</li>
              <Link style={{ textDecoration: 'none' }} to="/how-to-rent-out">
                <li className="footer-second-li">Как сдать в аренду</li>
              </Link>
              <Link style={{ textDecoration: 'none' }} to="/for-business">
                <li className="footer-second-li">Аренда для бизнеса</li>
              </Link>
            </ul>
          </div>
          {/* пк версия */}
          <div className="footer-third-col" id="main-sections-pk">
            <ul className="footer-third-ul">
              <li className="footer-third-li main-footer-li">Категории</li>
              {isLoaded &&
                [].concat.apply(Object.entries(chapters)).map((chapter, index) => {
                  if (index <= 8) {
                    return (
                      <Link
                        style={{ textDecoration: 'none' }}
                        to={`/catalog?chapter_id=${chapter[1]}`}>
                        <li style={{ cursor: 'pointer' }} key={index} value={chapter[1]}>
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
                [].concat.apply(Object.entries(chapters)).map((chapter, index) => {
                  if (index > 8) {
                    return (
                      <Link
                        style={{ textDecoration: 'none' }}
                        to={`/catalog?chapter_id=${chapter[1]}`}>
                        <li style={{ cursor: 'pointer' }} key={index} value={chapter[1]}>
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
              <li className="footer-third-li main-footer-li">Категории</li>
              {isLoaded &&
                [].concat.apply(Object.entries(chapters)).map((chapter, index) => {
                  if (index <= 9) {
                    return (
                      <Link
                        style={{ textDecoration: 'none' }}
                        to={`/catalog?chapter_id=${chapter[1]}`}>
                        <li style={{ cursor: 'pointer' }} key={index} value={chapter[1]}>
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
                [].concat.apply(Object.entries(chapters)).map((chapter, index) => {
                  if (index > 9) {
                    return (
                      <Link
                        style={{ textDecoration: 'none' }}
                        to={`/catalog?chapter_id=${chapter[1]}`}>
                        <li style={{ cursor: 'pointer' }} key={index} value={chapter[1]}>
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
              <img src={Instagram} alt="" className="footer-social" />
              <img src={Facebook} alt="" className="footer-social" />
              <img src={VK} alt="" className="footer-social" />
            </div>
            <p className="footer-fifth-p">Все сделки защищены</p>
            <div className="footer-payments">
              <img src={ApplePay} alt="" className="footer-payment" />
              <img src={Visa} alt="" className="footer-payment" />
              <img src={Mastercard} alt="" className="footer-payment" />
              <img src={Yandex} alt="" className="footer-payment" />
              <img src={Webmoney} alt="" className="footer-payment" />
            </div>
          </div>
        </div>
      </section>
      <div className="footer-lower-part" id="footer-lower1">
        <div className="footer-img-logo-wrapper">
          <img src={Logo2} alt="" className="footer-img-logo" />
        </div>
        <div className="footer-lower-labels">
          <p className="footer-lower-label">Пользовательское соглашение</p>
          <p className="footer-lower-label">Соглашение о конфиденциальности</p>
        </div>
        <div className="footer-localization-wrapper">
          <img src={Planet} alt="" className="footer-planet-img" />
          <p className="footer-localization-p">RU</p>
        </div>
      </div>

      <div className="footer-lower-part" id="footer-lower2">
        <div className="footer-lower-labels">
          <p className="footer-lower-label">Пользовательское соглашение</p>
          <p className="footer-lower-label">Соглашение о конфиденциальности</p>
        </div>
        <div className="footer-img-logo-wrapper_gl">
          <div className="footer-img-logo-wrapper">
            <img src={Logo2} alt="" className="footer-img-logo" />
          </div>
          <div className="foooter-right_item">
            <div className="location-selector" id="location-selector2">
              <img src={mark} alt="" className="location-img" />
              <p className="location-p">Минск</p>
            </div>
            <div className="footer-localization-wrapper">
              <img src={Planet} alt="" className="footer-planet-img" />
              <p className="footer-localization-p">RU</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
