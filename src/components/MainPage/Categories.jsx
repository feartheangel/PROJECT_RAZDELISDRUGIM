import React from 'react';
import { Link } from 'react-router-dom';

const Categories = () => {
  return (
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
        <Link style={{ textDecoration: 'none' }} to="/catalog">
          <input type="button" value="Смотреть каталог" className="popular-button" />
        </Link>
      </div>
    </section>
  );
};

export default Categories;
