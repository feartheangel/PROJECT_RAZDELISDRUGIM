import React, { useState } from 'react';
import './SearchPage.css';
import { useSelector } from 'react-redux';
import { Header, Footer, ItemCard } from '../../components/index';
import Requests from '../../http/axios-requests';
import vector1 from '../../img/SearchPage/Vector1.png';
import vector2 from '../../img/SearchPage/Vector2.png';
import vector3 from '../../img/SearchPage/Vector3.png';
import vector4 from '../../img/SearchPage/Vector4.png';

import CardProduct from './CardProduct/CardProduct';
import map from '../../img/SearchPage/map.png';

const SearchPage = () => {
  const { items, isLoaded } = useSelector(({ items }) => items);
  const { searchItems, words } = useSelector(({ search }) => search);

  //выделяем разделы
  const chapters = {};
  isLoaded &&
    items.map((item, index) => {
      if (!chapters.hasOwnProperty(item.chapter_id.name_chapter)) {
        chapters[item.chapter_id.name_chapter] = item.chapter_id.id;
      }
    });

  //выделяем категории
  const categories = {};
  isLoaded &&
    items.map((item, index) => {
      if (!categories[item.name_category]) {
        categories[item.name_category] = [[item.id, item.chapter_id.id]];
      }
    });

  return (
    <div>
      <Header />
      <div className="SearchPage">
        <div className="SearchPage_container">
          {/* КОНТЕЙНЕР ШАПКИ*/}
          <div className="SearchPage_container_shapka">
            <div>
              <p className="SearchPage_container_shapka_hover"> Главная </p>
              <img src={vector1} alt="" />
            </div>

            <div>
              <p className="SearchPage_container_shapka_hover"> Каталог </p>
              <img src={vector1} alt="" />
            </div>

            <div>
              <p className="SearchPage_container_shapka_hover"> Компьютерная техника </p>
              <img src={vector1} alt="" />
            </div>

            <div>
              <p className="SearchPage_container_shapka_hover"> Ноутбуки</p>
            </div>

            <p className="container_shapka_result">
              {' '}
              Результаты по запросу «{words}» {searchItems.length} предложений{' '}
            </p>
          </div>

          {/* ОБЩИЙ КОНТЕЙНЕР С КОНТЕНТОМ ЛЕВАЯ И ПРАВАЯ СТОРОНА  */}
          <div className="SearchPage_container_content">
            <div className="SearchPage_container_content_left">
              <ul>
                <li>
                  <p className="content_left_cost"> Цена </p>
                </li>

                <li className="content_left_priceRange">
                  <input type="number" />
                  <label> до </label>
                  <input type="number" />
                </li>

                <li>
                  <input type="checkbox" className="input_left_checkbox" />
                  <label> Скоро освободится </label>
                </li>

                <li>
                  <input type="checkbox" className="input_left_checkbox" />
                  <label> Бесплатно </label>
                </li>

                <li>
                  <input type="checkbox" className="input_left_checkbox" />
                  <label> Компании </label>
                </li>

                <li>
                  <input type="checkbox" className="input_left_checkbox" />
                  <label> Частные лица </label>
                </li>

                <li>
                  <input type="checkbox" className="input_left_checkbox" />
                  <label> Доставка </label>
                </li>

                <li>
                  <input type="checkbox" className="input_left_checkbox" />
                  <label> Страховка </label>
                </li>

                <li>
                  <input type="checkbox" className="input_left_checkbox" />
                  <label> По договору </label>
                </li>

                <li>
                  <input type="checkbox" className="input_left_checkbox" />
                  <label> Без залога </label>
                </li>

                <li>
                  <input type="checkbox" className="input_left_checkbox" />
                  <label> Акции </label>
                </li>

                {isLoaded &&
                  [].concat.apply(Object.entries(chapters)).map((chapter, index) => {
                    return (
                      <li className="content_left_optional_li">
                        <p>
                          {chapter[0]}
                          <span>
                            <img src={vector2} alt="" />
                          </span>
                        </p>
                      </li>
                    );
                  })}
              </ul>
            </div>

            {/* ПРАВАЯ СТОРОНА */}

            <div className="SearchPage_container_content_right">
              {/* ШАПКА */}
              <div className="content_right_shapka">
                <div className="shapka_top">
                  <p>Минск</p>
                  <p>До 200 м</p>
                  <p>До 1 км</p>
                  <p>До 3 км</p>
                  <p className="content_right_shapka_watchMap">Показать на карте</p>
                </div>
              </div>

              {/* КОНТЕНТ ПОД ШАПКОЙ */}
              <div className="content_right_all_content">
                <div className="all_content_blocks">
                  {searchItems.map((item, index) => (
                    <ItemCard key={index} item={item} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SearchPage;
