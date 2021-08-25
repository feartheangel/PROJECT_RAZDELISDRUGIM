import React, { useState } from 'react';
import '..//css/Catalog.css';
import { Footer, Header } from '../components/index.js';
import { useSelector } from 'react-redux';
import CatalogComponent from '../components/Catalog/CatalogComponent.jsx';
import Vector1 from '../img/SearchPage/Vector1.png';
import Vector2 from '../img/SearchPage/Vector2.png';
const Catalog = () => {
  const { items, isLoaded } = useSelector(({ items }) => items);
  const [activeForm, setActiveForm] = useState(1);
  
  const [activeVector, setActiveVector] = useState(false);

  console.log ( activeVector)

  //выделяем разделы
  const chapters = {};
  isLoaded &&
    items.length > 2 &&
    items.map((item, index) => {
      if (!chapters.hasOwnProperty(item.chapter_id.name_chapter)) {
        chapters[item.chapter_id.name_chapter] = [
          item.chapter_id.id,
          item.chapter_id.chapter_image,
          item.chapter_id.chapter_logo,
          item.chapter_id.chapter_description,
          item.chapter_id.name_chapter,
        ];
      }
    });

  React.useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Каталог';
  }, []);

  React.useEffect(() => {
    if (window.location.href.split('?chapter_id=')[1]) {
      setActiveForm(Number(window.location.href.split('?chapter_id=')[1]));
    }
  }, [window.location.href]);

  return (
    <div className="Catalog">
      <Header />
      <div className="Catalog_wrapper">
        <div className="Catalog_wrapper_container">
          <div className="Catalog_wrapper_container_up">
            {/* ТЕКС ПУТЕЙ ПО КАТЕГОРИЯМ ( с cardthings взято ) */}
            <div style={{ display: 'none' }} className="card_shapka">
              <div>
                <p className="card_shapka_hover"> Главная </p>
                <img src={Vector1} alt="" />
              </div>

              <div>
                <p className="card_shapka_hover"> Каталог </p>
                <img src={Vector1} alt="" />
              </div>

              <div>
                <p className="card_shapka_hover"> Недвижимость </p>
              </div>
            </div>
          </div>

          {/* КОНТЕЙНЕР С КОНТЕНТОМ */}
          <div className="Catalog_wrapper_container_down" id="catalog_pk">
            <div className="container_down_left">
              <p className="container_down_left-p">Весь каталог</p>

              <div className="container_down_left_category">
                {isLoaded &&
                  items &&
                  [].concat.apply(Object.entries(chapters)).map((chapter, index) => {
                    return (
                      <div
                        onClick={() => {
                          setActiveForm(chapter[1][0]);
                        }}
                        key={index}
                        className="left_category_global_div">
                        <img
                          src={`https://razdelisdrugim.by${chapter[1][2]}`}
                          alt=""
                          className="category_img"
                        />
                        <p
                          className={
                            activeForm === chapter[1][0]
                              ? 'left_category_global_div_active'
                              : 'left_category_global_div'
                          }>
                          {chapter[0]}
                        </p>
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* ПРАВАЯ СТОРОНА КОНТЕНТА */}
            <div className="container_down_right">
              <CatalogComponent chapterId={activeForm} />
            </div>
          </div>


          {/* МОБИЛЬНАЯ ВЕРСИЯ */}
              <div
               className="container_down_left_burger"
               onClick={() => setActiveVector(!activeVector)}
               >
                <p className="container_down_left-p">Каталог</p>
                <img src={Vector2} alt="vector" className="vector2_img" />
              </div>
              
          <div className="Catalog_wrapper_container_down" id="catalog_mobile">
          {activeVector  &&
                          <div className="container_down_left">
                          <div className="container_down_left_category">
                            {isLoaded &&
                              items &&
                              [].concat.apply(Object.entries(chapters)).map((chapter, index) => {
                                return (
                                  <div
                                    onClick={() => {
                                      setActiveForm(chapter[1][0]);
                                      setActiveVector(false);
                                    }}
                                    key={index}
                                    className="left_category_global_div">
                                    <img
                                      src={`https://razdelisdrugim.by${chapter[1][2]}`}
                                      alt=""
                                      className="category_img"
                                    />
                                    <p
                                      className={
                                        activeForm === chapter[1][0]
                                          ? 'left_category_global_div_active'
                                          : 'left_category_global_div'
                                      }>
                                      {chapter[0]}
                                    </p>
                                  </div>
                                );
                              })}
                          </div>
                        </div>
            }

            {/* ПРАВАЯ СТОРОНА КОНТЕНТА */}
            <div className="container_down_right" >
              <CatalogComponent chapterId={activeForm} />
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Catalog;
