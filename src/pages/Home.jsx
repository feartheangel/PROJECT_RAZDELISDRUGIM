import React from 'react';
import '../css/main-page.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Header, Footer } from '../components/index';
import BaseModal from '../components/RegAuthComponents/BaseModal';

//импорт всех картинок
import abil1 from '../img/MainPage/abil1.png';
import abil2 from '../img/MainPage/abil2.png';
import abil3 from '../img/MainPage/abil3.png';
import abil4 from '../img/MainPage/abil4.png';
import abil5 from '../img/MainPage/abil5.png';
import ArrowLeft from '../img/MainPage/Arrow_left.png';
import ArrowRight from '../img/MainPage/Arrow_right.png';
import car from '../img/MainPage/car.png';
import cardFire from '../img/MainPage/card-fire.png';
import cardMoney from '../img/MainPage/card-money.png';
import cardVerify from '../img/MainPage/card-verify.png';
import Free from '../img/MainPage/Free.png';
import like from '../img/MainPage/like.png';
import jacket from '../img/MainPage/jacket.png';
import Macbook from '../img/MainPage/Macbook.png';
import moneyTime from '../img/MainPage/money-time.png';
import partner1 from '../img/MainPage/partner1.png';
import partner2 from '../img/MainPage/partner2.png';
import partner3 from '../img/MainPage/partner3.png';
import Press from '../img/MainPage/Press.png';
import Review from '../img/MainPage/Review.png';
import Sofa from '../img/MainPage/Sofa.png';
import time from '../img/MainPage/time.png';
import Union from '../img/MainPage/Union.png';
import { loginAction, logoutAction } from '../redux/actions/userData';

const Home = () => {
  const dispatch = useDispatch();
  const [modalActive, setModalActive] = React.useState(false);

  React.useEffect(() => {
    if (localStorage.getItem('key')) {
      dispatch(loginAction());
    } else dispatch(logoutAction());
  }, [localStorage.getItem('key')]);

  return (
    <div class="content">
      <Header setModalActive={setModalActive} />
      <section className="recent-wrapper">
        <div className="recent-content">
          <p className="recent-p">Недавно добавленные</p>
          <div className="recent-blocks-wrapper">
            <img src={ArrowLeft} alt="" className="recent-arrow-left" />
            <div className="recent-block-wrapper">
              <div className="recent-block">
                <img src={Macbook} alt="" className="block-image" />
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
            <div className="recent-block-wrapper">
              <div className="recent-block">
                <img src={Macbook} alt="" className="block-image" />
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
            <div className="recent-block-wrapper">
              <div className="recent-block">
                <img src={Macbook} alt="" className="block-image" />
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
            <div className="recent-block-wrapper">
              <div className="recent-block">
                <img src={Macbook} alt="" className="block-image" />
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
            <img src={ArrowRight} alt="" className="recent-arrow-right" />
          </div>
        </div>
      </section>
      <section className="map">
        <div className="map-search">
          <input placeholder="Хочу взять в аренду..." type="text" className="map-input" />
          <input type="button" value="Найти вещь" className="map-button" />
        </div>
      </section>
      <section className="popular-wrapper">
        <p className="popular-p">Часто арендуемые</p>
        <div className="recent-blocks-wrapper">
          <img src={ArrowLeft} alt="" className="recent-arrow-left" />
          <div className="recent-block-wrapper">
            <div className="recent-block">
              <img src={Sofa} alt="" className="block-image" />
              <div className="recent-marks">
                <img src={car} alt="" className="card-mark" />
                <img src={cardFire} alt="" className="card-mark" />
                <img src={Union} alt="" className="card-mark" />
                <img src={moneyTime} alt="" className="card-mark" />
                <img src={cardMoney} alt="" className="card-mark" />
                <img src={cardVerify} alt="" className="card-mark" />
              </div>
              <p className="recent-block-title-p">Комод</p>
              <div className="recent-time-cost-wrapper">
                <p className="recent-cost-p">5 BYN</p>
                <p className="recent-time-p">1 час</p>
              </div>
              <p className="recent-user-name-p">Сергей</p>
              <div className="recent-lower-table">
                <div className="recent-status">
                  <img src={Free} alt="" className="status-img" />
                  <p className="status-p">Свободно</p>
                </div>
                <img src={like} alt="" className="recent-lower-like" />
              </div>
            </div>
          </div>
          <div className="recent-block-wrapper">
            <div className="recent-block">
              <img src={Sofa} alt="" className="block-image" />
              <div className="recent-marks">
                <img src={car} alt="" className="card-mark" />
                <img src={cardFire} alt="" className="card-mark" />
                <img src={Union} alt="" className="card-mark" />
                <img src={moneyTime} alt="" className="card-mark" />
                <img src={cardMoney} alt="" className="card-mark" />
                <img src={cardVerify} alt="" className="card-mark" />
              </div>
              <p className="recent-block-title-p">Комод</p>
              <div className="recent-time-cost-wrapper">
                <p className="recent-cost-p">5 BYN</p>
                <p className="recent-time-p">1 час</p>
              </div>
              <p className="recent-user-name-p">Сергей</p>
              <div className="recent-lower-table">
                <div className="recent-status">
                  <img src={Free} alt="" className="status-img" />
                  <p className="status-p">Свободно</p>
                </div>
                <img src={like} alt="" className="recent-lower-like" />
              </div>
            </div>
          </div>
          <div className="recent-block-wrapper">
            <div className="recent-block">
              <img src={Sofa} alt="" className="block-image" />
              <div className="recent-marks">
                <img src={car} alt="" className="card-mark" />
                <img src={cardFire} alt="" className="card-mark" />
                <img src={Union} alt="" className="card-mark" />
                <img src={moneyTime} alt="" className="card-mark" />
                <img src={cardMoney} alt="" className="card-mark" />
                <img src={cardVerify} alt="" className="card-mark" />
              </div>
              <p className="recent-block-title-p">Комод</p>
              <div className="recent-time-cost-wrapper">
                <p className="recent-cost-p">5 BYN</p>
                <p className="recent-time-p">1 час</p>
              </div>
              <p className="recent-user-name-p">Сергей</p>
              <div className="recent-lower-table">
                <div className="recent-status">
                  <img src={Free} alt="" className="status-img" />
                  <p className="status-p">Свободно</p>
                </div>
                <img src={like} alt="" className="recent-lower-like" />
              </div>
            </div>
          </div>
          <div className="recent-block-wrapper">
            <div className="recent-block">
              <img src={Sofa} alt="" className="block-image" />
              <div className="recent-marks">
                <img src={car} alt="" className="card-mark" />
                <img src={cardFire} alt="" className="card-mark" />
                <img src={Union} alt="" className="card-mark" />
                <img src={moneyTime} alt="" className="card-mark" />
                <img src={cardMoney} alt="" className="card-mark" />
                <img src={cardVerify} alt="" className="card-mark" />
              </div>
              <p className="recent-block-title-p">Комод</p>
              <div className="recent-time-cost-wrapper">
                <p className="recent-cost-p">5 BYN</p>
                <p className="recent-time-p">1 час</p>
              </div>
              <p className="recent-user-name-p">Сергей</p>
              <div className="recent-lower-table">
                <div className="recent-status">
                  <img src={Free} alt="" className="status-img" />
                  <p className="status-p">Свободно</p>
                </div>
                <img src={like} alt="" className="recent-lower-like" />
              </div>
            </div>
          </div>
          <img src={ArrowRight} alt="" className="recent-arrow-right" />
        </div>
        <input type="button" value="Смотреть каталог" className="popular-button" />
      </section>
      <section className="abilities">
        <div className="abilities-content">
          <p className="abilities-mail-title">Возможности с платформой #разделисдругим</p>
          <div className="abilities-cards">
            <div className="abilities-card">
              <p className="main-abilities-card-title">Делитесь с другими</p>
              <img src={abil1} alt="" className="abilities-card-img" />
              <p className="abilities-card-p">
                У каждого из нас есть такие вещи, которые нам жалко продать, но мы могли бы
                поделиться ими с другими, оказав им услугу, получив за это некоторую сумму. И для
                этого наша платформа… Мы поддерживаем шеринговую экономику!
              </p>
            </div>
            <div className="abilities-card">
              <p className="main-abilities-card-title">Арендуйте что хотите</p>
              <img src={abil2} alt="" className="abilities-card-img" />
              <p className="abilities-card-p">
                Вам нужно воспользоваться чем-то, но покупать не имеет смысла? Найдите нужную вещь
                через поиск или на карте, возможно, вы уже сегодня возьмете ее в аренду у соседа по
                подъезду
              </p>
            </div>
            <div className="abilities-card">
              <p className="main-abilities-card-title">Расширяйте свой бизнес</p>
              <img src={abil3} alt="" className="abilities-card-img" />
              <p className="abilities-card-p">
                Вы компания или предприниматель, который работает в сфере аренды инструментов,
                одежды, аксессуаров? Наша платформа поможет продвинуть ваш бизнес и автоматизирует
                процесс аренды. Закажи у нас мобильное приложение для своей компании!
              </p>
            </div>
            <div className="abilities-card">
              <p className="main-abilities-card-title">Экономьте время</p>
              <img src={abil4} alt="" className="abilities-card-img" />
              <p className="abilities-card-p">
                Вам не нужно тратить много времени на поиск нужной вещь – наш интеллектуальный
                поиск, карта и фильтры в один клик помогут найти нужное с любого устройства
              </p>
            </div>
            <div className="abilities-card">
              <p className="main-abilities-card-title">Будьте спокойны</p>
              <img src={abil5} alt="" className="abilities-card-img" />
              <p className="abilities-card-p">
                Мы сделали все возможное, для проверки и обеспечения конфиденциальности наших
                пользователей, а также для обеспечения безопасности сделок, защиты данных,
                страхования и составления необходимых бумаг. И еще… Мы не храним у себя данные ваших
                банковских карт!
              </p>
            </div>
          </div>
          <div className="abilities-buttons">
            <input type="button" value="Найти вещь" className="abilities-button-find-subject" />
            <input type="button" value="Преложить вещь" className="abilities-button-give-subject" />
          </div>
        </div>
      </section>
      <section className="reviews">
        <p className="reviews-main-title">Отзывы о нас</p>
        <div className="reviews-blocks">
          <div className="reviews-block">
            <img src={Review} alt="" className="review-img" />
            <p className="review-name">Андрей Васильевич</p>
            <p className="review-date">20.06.2021</p>
            <p className="review-text">
              Брал в аренду детское автокресло на данном сайте. Быстро и удобно. спасибо за отличный
              сервис!
            </p>
          </div>
          <div className="reviews-block">
            <img src={Review} alt="" className="review-img" />
            <p className="review-name">Андрей Васильевич</p>
            <p className="review-date">20.06.2021</p>
            <p className="review-text">
              Брал в аренду детское автокресло на данном сайте. Быстро и удобно. спасибо за отличный
              сервис!
            </p>
          </div>
          <div className="reviews-block">
            <img src={Review} alt="" className="review-img" />
            <p className="review-name">Андрей Васильевич</p>
            <p className="review-date">20.06.2021</p>
            <p className="review-text">
              Брал в аренду детское автокресло на данном сайте. Быстро и удобно. спасибо за отличный
              сервис!
            </p>
          </div>
          <div className="reviews-block">
            <img src={Review} alt="" className="review-img" />
            <p className="review-name">Андрей Васильевич</p>
            <p className="review-date">20.06.2021</p>
            <p className="review-text">
              Брал в аренду детское автокресло на данном сайте. Быстро и удобно. спасибо за отличный
              сервис!
            </p>
          </div>
        </div>
        <div className="reviews-buttons">
          <input
            type="button"
            value="Написать разработчикам"
            className="reviews-button-write-dev"
          />
          <input type="button" value="Написать отзыв" className="reviews-button-write-review" />
        </div>
      </section>
      <section className="about">
        <div className="about-content">
          <p className="main-about-title">О нашем сервисе</p>
          <div className="about-middle-part">
            <div className="about-middle-left">
              <img src={jacket} alt="" className="about-jacket" />
            </div>
            <div className="about-middle-right">
              <p className="about-main-p">
                Все началось с моего смокинга. Это такая часть гардероба, которая в шкафу обычного
                современного человека если  и присутствует, то используется крайне редко, может быть
                1–2 раза в год, а иногда и того реже. Я давно хотел найти механизм монетизировать
                его, не избавляясь при этом, предоставляя возможность другим людям облачиться
                в него, когда это будет необходимо. Когда я посмотрел на мои строительные
                и музыкальные инструменты, автоаксессуары, моющий пылесос, садовую технику —
                я понял, что таких вещей может быть много. В разговоре с моими друзьями и знакомыми
                я понял, что у них стоит та же проблема, причём с одной стороны, у них пылятся вещи,
                которые могли бы служить другим, с другой стороны, им иногда нужны другие вещи,
                для разового или редкого использования. Да, есть компании, которые занимаются
                арендой одежды, инструментов, аксессуаров и т.п. Однако наша идея заключается в том,
                чтобы дать простым людям простой инструмент выхода на рынок краткосрочной аренды
                вещей, как в качестве Владельцев, так в качестве Рентеров чужих вещей. И об этом
                наша платформа…
              </p>
            </div>
          </div>
          <p className="about-lower-p">Дмитрий, автор проекта</p>
        </div>
      </section>
      <section className="news-reviews">
        <div className="news-reviews-content">
          <p className="main-news-reviews-title">Новости и обзоры</p>
          <div className="news-reviews-blocks">
            <div className="news-reviews-block">
              <p className="news-reviews-date">20.12.2021</p>
              <p className="news-reviews-title">У нас появилась доставка!</p>
              <p className="news-reviews-text">
                Меняться вещами люди начинают по совершенно разным причинам — одни озабочены
                проблемами перепроизводства и выбирают осознанное потребление, а другие просто хотят
                сэкономить.{' '}
              </p>
            </div>
            <div className="news-reviews-block">
              <p className="news-reviews-date">20.12.2021</p>
              <p className="news-reviews-title">У нас появилась доставка!</p>
              <p className="news-reviews-text">
                Меняться вещами люди начинают по совершенно разным причинам — одни озабочены
                проблемами перепроизводства и выбирают осознанное потребление, а другие просто хотят
                сэкономить.{' '}
              </p>
            </div>
            <div className="news-reviews-block">
              <p className="news-reviews-date">20.12.2021</p>
              <p className="news-reviews-title">У нас появилась доставка!</p>
              <p className="news-reviews-text">
                Меняться вещами люди начинают по совершенно разным причинам — одни озабочены
                проблемами перепроизводства и выбирают осознанное потребление, а другие просто хотят
                сэкономить.{' '}
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="main-sections">
        <div className="main-sections-content">
          <div className="main-sections-first">
            <ul className="main-sections-first-ul">
              <li className="main-section-first-li main-li">Недвижимость</li>
              <li className="main-section-first-li">Офисы</li>
              <li className="main-section-first-li">Квартиры</li>
              <li className="main-section-first-li">Склады</li>
              <li className="main-section-first-li">Комнаты</li>
            </ul>
            <ul className="main-sections-second-ul">
              <li className="main-sections-second-li main-li">Ремонт и стройка</li>
              <li className="main-sections-second-li">Инструмент</li>
              <li className="main-sections-second-li">Оборудование</li>
              <li className="main-sections-second-li">Электроснабжение</li>
            </ul>
            <ul className="main-sections-third-ul">
              <li className="main-sections-third-li main-li">Авто и транспорт</li>
              <li className="main-sections-third-li">Легковые авто</li>
              <li className="main-sections-third-li">Фургоны</li>
              <li className="main-sections-third-li">Грузовики</li>
              <li className="main-sections-third-li">Экскаваторы</li>
              <li className="main-sections-third-li">Аксессуары</li>
            </ul>
            <ul className="main-sections-fourth-ul">
              <li className="main-sections-fourth-li main-li">Мебель</li>
              <li className="main-sections-fourth-li">Спальня</li>
              <li className="main-sections-fourth-li">Гостинная</li>
              <li className="main-sections-fourth-li">Кухня</li>
            </ul>
          </div>
          <div className="main-sections-second">
            <ul className="main-sections-first-ul">
              <li className="main-section-first-li main-li">Красота и здоровье</li>
              <li className="main-section-first-li">Оборудование для маникюрв</li>
              <li className="main-section-first-li">Медицинские товары</li>
            </ul>
            <ul className="main-sections-second-ul">
              <li className="main-sections-second-li main-li">Бытовая техника</li>
              <li className="main-sections-second-li">Техника для уборки</li>
              <li className="main-sections-second-li">Техника для кухни</li>
            </ul>
            <ul className="main-sections-third-ul">
              <li className="main-sections-third-li main-li">Компьютерная техника</li>
              <li className="main-sections-third-li">Ноутбуки</li>
              <li className="main-sections-third-li">Мониторы</li>
              <li className="main-sections-third-li">Оргтехника</li>
            </ul>
            <ul className="main-sections-fourth-ul">
              <li className="main-sections-fourth-li main-li">Для детей и мам</li>
              <li className="main-sections-fourth-li">Коляски</li>
              <li className="main-sections-fourth-li">Автокресла и бустеры</li>
              <li className="main-sections-fourth-li">Мебель</li>
              <li className="main-sections-fourth-li">Детский транспорт</li>
            </ul>
          </div>
          <div className="main-sections-third">
            <ul className="main-sections-first-ul">
              <li className="main-section-first-li main-li">Сад и огород</li>
              <li className="main-section-first-li">Садовая мебель и бассейны</li>
              <li className="main-section-first-li">Мангалы, аксессуары</li>
              <li className="main-section-first-li">Садовая техника и инвентарь</li>
              <li className="main-section-first-li">Мотоблоки и культиваторы</li>
            </ul>
            <ul className="main-sections-second-ul">
              <li className="main-sections-second-li main-li">Хобби и отдых</li>
              <li className="main-sections-second-li">Музыкальные инструменты</li>
              <li className="main-sections-second-li">Настольные игры</li>
              <li className="main-sections-second-li">Книги и журналы</li>
              <li className="main-sections-second-li">Антиквариат</li>
              <li className="main-sections-second-li">Рукоделие</li>
            </ul>
            <ul className="main-sections-third-ul">
              <li className="main-sections-third-li main-li">Спорт и активный отдых</li>
              <li className="main-sections-third-li">Туризм</li>
              <li className="main-sections-third-li">Охота и рыбалка</li>
              <li className="main-sections-third-li">Путешествия</li>
              <li className="main-sections-third-li">Альпинизм</li>
              <li className="main-sections-third-li">Велотовары</li>
              <li className="main-sections-third-li">Спортивная экипировка</li>
            </ul>
            <ul className="main-sections-fourth-ul">
              <li className="main-sections-fourth-li main-li">Гардероб</li>
              <li className="main-sections-fourth-li">Обувь</li>
              <li className="main-sections-fourth-li">Мужской гардероб</li>
              <li className="main-sections-fourth-li">Женский гардероб</li>
              <li className="main-sections-fourth-li">Украшения</li>
              <li className="main-sections-fourth-li">Детская одежда</li>
            </ul>
          </div>
          <input type="button" value="Смотреть каталог" className="main-sections-button" />
        </div>
      </section>
      <section className="partners">
        <div className="partners-content">
          <p className="partners-main-title">С нами сотрудничают</p>
          <div className="partners-middle-part">
            <img src={ArrowLeft} alt="" className="partners-arrow-left" />
            <div className="partners-images">
              <img src={partner1} alt="" className="partner-image" />
              <img src={partner2} alt="" className="partner-image" />
              <img src={partner3} alt="" className="partner-image" />
            </div>
            <img src={ArrowRight} alt="" className="partners-arrow-right" />
          </div>
        </div>
      </section>
      <section className="adv">
        <div className="adv-content">
          <p className="adv-title">Место для рекламы</p>
        </div>
      </section>
      <section className="writting-about-us">
        <div className="writting-about-us-content">
          <p className="writting-about-us-title">Медиа о нас</p>
          <div className="writting-about-us-imgs">
            <img src={Press} alt="" className="writting-about-us-img" />
            <img src={Press} alt="" className="writting-about-us-img" />
            <img src={Press} alt="" className="writting-about-us-img" />
            <img src={Press} alt="" className="writting-about-us-img" />
            <img src={Press} alt="" className="writting-about-us-img" />
          </div>
          <input
            type="button"
            value="Написать разработчикам"
            className="writting-about-us-button"
          />
        </div>
      </section>
      <Footer />
      <BaseModal modalActive={modalActive} setModalActive={setModalActive} />
    </div>
  );
};

export default Home;
