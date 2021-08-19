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
  setCategoryId,
} from '../../redux/actions/search';
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import CardProduct from './CardProduct/CardProduct';
import map from '../../img/SearchPage/map.png';

const SearchPage = () => {
  const { items, isLoaded } = useSelector(({ items }) => items);
  const { userData, subjects, isLoggedIn } = useSelector(({ userData }) => userData);
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

  //параметры карты
  const mapData = {
    center: userCoordinates ? userCoordinates.split(' ').reverse() : [53.91, 27.55],
    zoom: 12,
  };

  //координаты меток карты
  const [marks, setMarks] = React.useState([]);

  const dispatch = useDispatch();

  React.useEffect(() => {
    setMarks(
      searchItems.map((item) => {
        return item.items_coordinates.split('(')[1].split(')')[0].split(' ').reverse();
      }),
    );
  }, [searchItems]);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  React.useEffect(() => {
    if (
      !words &&
      !category &&
      !min_price &&
      !max_price &&
      !free &&
      !status &&
      !delivery &&
      !insurance &&
      !contract &&
      !pledge &&
      !distance
    ) {
      Requests.search().then((res) => {
        dispatch(setSearchItems(res.data));
      });
    } else {
      Requests.search(
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
        distance,
      ).then((res) => {
        dispatch(setSearchItems(res.data));
      });
    }
  }, []);

  const addSubjectHandler = () => {
    if (isLoggedIn && subjects.length < 5) {
      window.location.href = '/place-item';
      return;
    } else if (isLoggedIn && subjects.length >= 5) {
      alert('Лимит вещей достигнут (5)');
      return;
    } else if (!isLoggedIn) {
      alert('Сначала авторизуйтесь!');
      return;
    } else if (!userData.email_verify || !userData.phone_verify) {
      alert('У вас не подтвержден номер телефона либо почта. Подтвердите их в профиле.');
      return;
    }
  };

  const searchHandler = (
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
    distance,
  ) => {
    Requests.search(
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
      distance,
    ).then((res) => {
      dispatch(setSearchItems(res.data));
    });
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
      distance,
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
      distance,
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
      distance,
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
        distance,
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
        distance,
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
      distance,
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
      distance,
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
      distance,
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
      distance,
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

  const categoryResetHandler = () => {
    dispatch(setSearchCategory(false));
    dispatch(setCategoryId(false));
    Requests.search(
      words,
      false,
      min_price,
      max_price,
      free,
      status,
      delivery,
      insurance,
      contract,
      pledge,
      userCoordinates,
      distance,
    ).then((res) => {
      dispatch(setSearchItems(res.data));
    });
  };

  return (
    <div>
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
              <Link style={{ textDecoration: 'none' }} to="/catalog">
                <p className="SearchPage_container_shapka_hover"> Каталог </p>
              </Link>
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
                    onClick={categoryResetHandler}
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
              </ul>
            </div>

            {/* ПРАВАЯ СТОРОНА */}

            <div className="SearchPage_container_content_right">
              {/* ШАПКА */}
              <div className="content_right_shapka">
                <div className="shapka_top">
                  <p
                    title="Кликните повторно, чтобы выключить фильтр по дистанции"
                    className={distance === '200' ? 'distance_p active' : 'distance_p'}
                    onClick={() => distanceHandler('200')}>
                    До 200 м
                  </p>
                  <p
                    title="Кликните повторно, чтобы выключить фильтр по дистанции"
                    className={distance === '1000' ? 'distance_p active' : 'distance_p'}
                    onClick={() => distanceHandler('1000')}>
                    До 1 км
                  </p>
                  <p
                    title="Кликните повторно, чтобы выключить фильтр по дистанции"
                    className={distance === '5000' ? 'distance_p active' : 'distance_p'}
                    onClick={() => distanceHandler('5000')}>
                    До 5 км
                  </p>
                  <p
                    onClick={() => distanceHandler(false)}
                    className={distance === false ? 'distance_p active' : 'distance_p'}>
                    Показать все
                  </p>
                </div>
              </div>

              {/* КОНТЕНТ ПОД ШАПКОЙ */}
              <div className="content_right_all_content">
                {searchItems.length > 0 && (
                  <div className="all_content_blocks">
                    {searchItems.map((item, index) => {
                      if (index <= 2) {
                        return <ItemCard key={index} item={item} />;
                      }
                    })}

                    {searchItems && (
                      <div style={{ marginBottom: '30px' }}>
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
                )}
                {searchItems.length === 0 && (
                  <div className="all_content_blocks">
                    <div className="search_not_found">
                      <p>Сегодня ничего не найдено по заданным параметрам.</p>
                      <p style={{ marginBottom: '20px' }}>
                        Вы можете предложить свою вещь, услугу или иное имущество, либо зайти
                        завтра...
                      </p>
                      <input
                        onClick={addSubjectHandler}
                        type="button"
                        value="Предложить вещь"
                        className="header-button add-subject"
                      />
                    </div>
                  </div>
                )}
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
