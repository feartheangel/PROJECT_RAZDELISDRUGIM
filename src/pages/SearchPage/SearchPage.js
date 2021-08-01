import React, { useState } from 'react';
import './SearchPage.css';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Header, Footer, ItemCard } from '../../components/index';
import Requests from '../../http/axios-requests';
import vector1 from '../../img/SearchPage/Vector1.png';
import vector2 from '../../img/SearchPage/Vector2.png';
import vector3 from '../../img/SearchPage/Vector3.png';
import vector4 from '../../img/SearchPage/Vector4.png';
import {
  setSearchCategory,
  setSearchItems,
  setMinPrice,
  setMaxPrice,
  setFree,
  setStatus,
  setDelivery,
  setInsurance,
  setContract,
  setPledge,
  setDistance,
} from '../../redux/actions/search';
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import CardProduct from './CardProduct/CardProduct';
import map from '../../img/SearchPage/map.png';

const SearchPage = () => {
  const { items, isLoaded } = useSelector(({ items }) => items);
  const {
    searchItems,
    words,
    category,
    min_price,
    max_price,
    userCoordinates,
    free,
    status,
    delivery,
    insurance,
    contract,
    pledge,
    distance,
  } = useSelector(({ search }) => search);

  const [openedCategories, setOpenedCategories] = React.useState([]);
  const [activeCategory, setActiveCategory] = React.useState();

  //параметры карты
  const mapData = {
    center: userCoordinates ? userCoordinates.split(' ') : [53.54, 27.33],
    zoom: 8,
  };

  //координаты меток карты
  const [marks, setMarks] = React.useState([]);

  const [ignored, forceUpdate] = React.useReducer((x) => x + 1, 0);

  const dispatch = useDispatch();

  React.useEffect(() => {
    setMarks(
      searchItems.map((item) => {
        return item.items_coordinates.split('(')[1].split(')')[0].split(' ').reverse();
      }),
    );
    console.log(marks);
  }, [searchItems]);

  const keyDownHandler = (e) => {
    if (e.keyCode === 13) {
      searchHandler(words, category);
    }
  };

  const openChapterHandler = (id) => {
    if (!(openedCategories === id)) {
      setOpenedCategories(id);
      forceUpdate();
    } else if (openedCategories === id) {
      setOpenedCategories(false);
      forceUpdate();
    }
  };

  const searchHandler = (
    words,
    category,
    min_price,
    max_price,
    free_rent,
    status,
    delivery,
    insurance,
    contract,
    pledge,
    coordinates,
    distance,
  ) => {
    Requests.search(
      words,
      category,
      min_price,
      max_price,
      free_rent,
      status,
      delivery,
      insurance,
      contract,
      pledge,
      coordinates,
      distance,
    ).then((res) => {
      dispatch(setSearchItems(res.data));
    });
  };

  const categorySetHandler = (category, category_id) => {
    setActiveCategory(category_id);
    dispatch(setSearchCategory(category));
    searchHandler(
      words,
      category,
      min_price,
      max_price,
      free,
      status,
      delivery,
      insurance,
      contract,
      pledge,
      userCoordinates,
    );
  };

  const minPriceHandler = (e) => {
    if (e.target.value < 0 || e.target.value > 999999) {
      return;
    }
    dispatch(setMinPrice(e.target.value));
    searchHandler(
      words,
      category,
      e.target.value,
      max_price,
      free,
      status,
      delivery,
      insurance,
      contract,
      pledge,
      userCoordinates,
    );
  };

  const maxPriceHandler = (e) => {
    if (e.target.value < 0 || e.target.value > 999999) {
      return;
    }
    dispatch(setMaxPrice(e.target.value));
    searchHandler(
      words,
      category,
      min_price,
      e.target.value,
      free,
      status,
      delivery,
      insurance,
      contract,
      pledge,
      userCoordinates,
    );
  };

  const freeRentHandler = () => {
    dispatch(setFree(!free));
    searchHandler(
      words,
      category,
      min_price,
      max_price,
      !free,
      status,
      delivery,
      insurance,
      contract,
      pledge,
      userCoordinates,
    );
  };

  const statusHandler = (e) => {
    if (status === e.target.value) {
      dispatch(setStatus(false));
      searchHandler(
        words,
        category,
        min_price,
        max_price,
        free,
        false,
        delivery,
        insurance,
        contract,
        pledge,
        userCoordinates,
      );
    } else {
      dispatch(setStatus(e.target.value));
      searchHandler(
        words,
        category,
        min_price,
        max_price,
        free,
        e.target.value,
        delivery,
        insurance,
        contract,
        pledge,
        userCoordinates,
      );
    }
  };

  const deliveryHandler = () => {
    dispatch(setDelivery(!delivery));
    searchHandler(
      words,
      category,
      min_price,
      max_price,
      free,
      status,
      !delivery,
      insurance,
      contract,
      pledge,
      userCoordinates,
    );
  };

  const insuranceHandler = () => {
    dispatch(setInsurance(!insurance));
    searchHandler(
      words,
      category,
      min_price,
      max_price,
      free,
      status,
      delivery,
      !insurance,
      contract,
      pledge,
      userCoordinates,
    );
  };

  const contractHandler = () => {
    dispatch(setContract(!contract));
    searchHandler(
      words,
      category,
      min_price,
      max_price,
      free,
      status,
      delivery,
      insurance,
      !contract,
      pledge,
      userCoordinates,
    );
  };

  const pledgeHandler = () => {
    dispatch(setPledge(!pledge));
    searchHandler(
      words,
      category,
      min_price,
      max_price,
      free,
      status,
      delivery,
      insurance,
      contract,
      !pledge,
      userCoordinates,
    );
  };

  const distanceHandler = (props) => {
    if (distance === props) {
      dispatch(setDistance(false));
      searchHandler(
        words,
        category,
        min_price,
        max_price,
        free,
        status,
        delivery,
        insurance,
        contract,
        pledge,
        userCoordinates,
        false,
      );
    } else {
      dispatch(setDistance(props));
      searchHandler(
        words,
        category,
        min_price,
        max_price,
        free,
        status,
        delivery,
        insurance,
        contract,
        pledge,
        userCoordinates,
        props,
      );
    }
  };

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
    <div onKeyDown={(e) => keyDownHandler(e)}>
      <Header />
      <div className="SearchPage">
        <div className="SearchPage_container">
          {/* КОНТЕЙНЕР ШАПКИ*/}
          <div className="SearchPage_container_shapka">
            <div>
              <Link style={{ textDecoration: 'none' }} to="/">
                <p className="SearchPage_container_shapka_hover"> Главная </p>
              </Link>
              <img src={vector1} alt="" />
            </div>

            <div>
              <p className="SearchPage_container_shapka_hover"> Каталог </p>
              {category && <img src={vector1} alt="" />}
            </div>

            <div>
              <p className="SearchPage_container_shapka_hover"> {category} </p>
            </div>

            <p className="container_shapka_result">
              Найдено предложений: {searchItems.length}
              {category ? (
                <p>
                  В категории: {category}
                  <span
                    onClick={() => categorySetHandler(false, false)}
                    style={{
                      color: 'red',
                      fontSize: '14px',
                      marginLeft: '10px',
                      cursor: 'pointer',
                    }}>
                    Сбросить категорию
                  </span>
                </p>
              ) : (
                ''
              )}
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
                  <input
                    value={min_price}
                    onChange={(e) => minPriceHandler(e)}
                    type="number"
                    min="0"
                    max="99999"
                  />
                  <label> до </label>
                  <input
                    value={max_price}
                    onChange={(e) => maxPriceHandler(e)}
                    type="number"
                    min="0"
                    max="99999"
                  />
                </li>

                <li>
                  <input
                    style={{ cursor: 'pointer' }}
                    checked={free}
                    onChange={freeRentHandler}
                    id="free"
                    type="checkbox"
                    className="input_left_checkbox"
                  />
                  <label style={{ cursor: 'pointer' }} htmlFor="free">
                    Бесплатно
                  </label>
                </li>

                <li>
                  <input
                    style={{ cursor: 'pointer' }}
                    checked={status === '2'}
                    value="2"
                    onChange={(e) => statusHandler(e)}
                    id="companies"
                    type="checkbox"
                    className="input_left_checkbox"
                  />
                  <label style={{ cursor: 'pointer' }} htmlFor="companies">
                    Компании
                  </label>
                </li>

                <li>
                  <input
                    style={{ cursor: 'pointer' }}
                    checked={status === '1'}
                    value="1"
                    onChange={(e) => statusHandler(e)}
                    id="individual"
                    type="checkbox"
                    className="input_left_checkbox"
                  />
                  <label style={{ cursor: 'pointer' }} htmlFor="individual">
                    {' '}
                    Частные лица{' '}
                  </label>
                </li>

                <li>
                  <input
                    style={{ cursor: 'pointer' }}
                    checked={delivery}
                    onChange={deliveryHandler}
                    id="delivery"
                    type="checkbox"
                    className="input_left_checkbox"
                  />
                  <label style={{ cursor: 'pointer' }} htmlFor="delivery">
                    {' '}
                    Доставка{' '}
                  </label>
                </li>

                <li>
                  <input
                    style={{ cursor: 'pointer' }}
                    checked={insurance}
                    onChange={insuranceHandler}
                    id="insurance"
                    type="checkbox"
                    className="input_left_checkbox"
                  />
                  <label style={{ cursor: 'pointer' }} htmlFor="insurance">
                    {' '}
                    Страховка{' '}
                  </label>
                </li>

                <li>
                  <input
                    style={{ cursor: 'pointer' }}
                    checked={contract}
                    onChange={contractHandler}
                    id="contract"
                    type="checkbox"
                    className="input_left_checkbox"
                  />
                  <label style={{ cursor: 'pointer' }} htmlFor="contract">
                    {' '}
                    По договору{' '}
                  </label>
                </li>

                <li>
                  <input
                    style={{ cursor: 'pointer' }}
                    checked={pledge}
                    onChange={pledgeHandler}
                    id="pledge"
                    type="checkbox"
                    className="input_left_checkbox"
                  />
                  <label style={{ cursor: 'pointer' }} htmlFor="pledge">
                    {' '}
                    Без залога{' '}
                  </label>
                </li>

                <li>
                  <input disabled type="checkbox" className="input_left_checkbox" />
                  <label style={{ opacity: '0.6' }}> Акции </label>
                </li>
                <li>
                  <input id="minPrice" disabled type="checkbox" className="input_left_checkbox" />
                  <label htmlFor="minPrice" style={{ opacity: '0.6' }}>
                    Скоро освободится
                  </label>
                </li>

                {isLoaded &&
                  [].concat.apply(Object.entries(chapters)).map((chapter, index) => {
                    return (
                      <li
                        style={{ display: 'flex', flexDirection: 'column' }}
                        className="content_left_optional_li">
                        <p onClick={() => openChapterHandler(chapter[1])}>
                          {chapter[0]}
                          <span>
                            <img src={vector2} alt="" />
                          </span>
                        </p>
                        {isLoaded &&
                          [].concat.apply(Object.entries(categories)).map((category, index) => {
                            if (
                              category[1][0][1] === chapter[1] &&
                              openedCategories === category[1][0][1]
                            ) {
                              return (
                                <p
                                  onClick={() => categorySetHandler(category[0], category[1][0][0])}
                                  className={
                                    activeCategory === category[1][0][0]
                                      ? 'content_left_optional_li__sub active'
                                      : 'content_left_optional_li__sub'
                                  }>
                                  {category[0]}
                                </p>
                              );
                            }
                          })}
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
                  <p
                    className={distance === '200' ? 'distance_p active' : 'distance_p'}
                    onClick={() => distanceHandler('200')}>
                    До 200 м
                  </p>
                  <p
                    className={distance === '1000' ? 'distance_p active' : 'distance_p'}
                    onClick={() => distanceHandler('1000')}>
                    До 1 км
                  </p>
                  <p
                    className={distance === '5000' ? 'distance_p active' : 'distance_p'}
                    onClick={() => distanceHandler('5000')}>
                    До 5 км
                  </p>
                  <p className="content_right_shapka_watchMap">Показать на карте</p>
                </div>
              </div>

              {/* КОНТЕНТ ПОД ШАПКОЙ */}
              <div className="content_right_all_content">
                <div className="all_content_blocks">
                  {searchItems.map((item, index) => {
                    if (index <= 2) {
                      return <ItemCard key={index} item={item} />;
                    }
                  })}

                  {searchItems && (
                    <div style={{ marginBottom: '30px' }} classname="map">
                      <YMaps>
                        <Map width={850} height={500} defaultState={mapData}>
                          {marks && marks.map((mark) => <Placemark geometry={mark} />)}
                        </Map>
                      </YMaps>
                    </div>
                  )}
                  {searchItems.map((item, index) => {
                    if (index > 2) {
                      return <ItemCard key={index} item={item} />;
                    }
                  })}
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
