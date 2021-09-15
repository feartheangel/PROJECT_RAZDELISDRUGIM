import React from "react";
import "./SearchPage.css";
import { useSelector, useDispatch } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { Header, Footer, ItemCard } from "../../components/index";
import Requests from "../../http/axios-requests";
import vector1 from "../../img/SearchPage/Vector1.png";
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
} from "../../redux/actions/search";
import { YMaps, Map, Placemark, Clusterer } from "react-yandex-maps";

const SearchPage = () => {
  const [filter, setFilter] = React.useState(false);
  const filterhandler = () => {
    setFilter(!filter);
  };
  const { userData, subjects, isLoggedIn } = useSelector(
    ({ userData }) => userData
  );
  const {
    searchItems,
    words,
    category_id,
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

  const { maxItemsToPlaceFree } = useSelector(({ settings }) => settings);

  //параметры карты
  const mapData = {
    center: userCoordinates
      ? userCoordinates.split(" ").reverse()
      : [53.91, 27.55],
    zoom: 12,
    controls: ["zoomControl", "fullscreenControl", "rulerControl"],
  };

  //координаты меток карты
  const [marks, setMarks] = React.useState([]);
  const [redirect, setRedirect] = React.useState();

  const getPointOptions = (index) => {
    return {
      preset: `islands#blueDotIcon`,
    };
  };

  const getPointData = (index) => {
    return {
      balloonContentHeader: `<div style=display:flex;justify-content:center><strong><p style=font-size:18px;margin-top:0 class="recent-block-title-p">${marks[index][2]}</p></strong></div>`,
      balloonContentBody: [
        `
        <div style=display:flex;flex-direction:column;align-items:center class="recent-block-wrapper">
        <a style=display:flex;flex-direction:column;align-items:center target="_blank">
          <div style=display:flex;flex-direction:column;align-items:center className="recent-block">
           <img style=width:108px src=${`https://razdelisdrugim.by${marks[index][1]}`} alt="" class="block-image" />
              ${
                !marks[index][6] && !marks[index][7]
                  ? `<div style=justify-content:flex-start;margin-top:7px class="recent-time-cost-wrapper">
                <p style=margin-right:5px;font-size:13px  class="recent-cost-p">${marks[index][3]} BYN</p>
                <p class="recent-time-p">
                ${marks[index][4]}
                </p>
              </div>`
                  : ""
              }
              ${
                marks[index][7]
                  ? `<div style=marginTop:13px  class="recent-time-cost-wrapper">
                  <p style=font-size:14px class="recent-time-p">
                    Предложить свою цену
                  </p>
                </div>`
                  : ""
              }
              ${
                marks[index][6]
                  ? `<div
                  style={{ justifyContent: 'flex-start', marginTop: '5px' }}
                  class="recent-time-cost-wrapper">
                  <p class="recent-time-p">
                    Бесплатно
                  </p>
                </div>`
                  : ""
              }
              <a href=/item-card?id=${marks[index][5]} target='_blank'>
            <p
            style='margin-top:7px;font-size:16px'
              class="recent-block-title-p">
              Подробнее
            </p>
            </a>
          </div>
        </a>
      </div>
          `,
      ].join(""),
    };
  };

  const dispatch = useDispatch();

  //определение координат последних вещей
  React.useEffect(() => {
    setMarks(
      searchItems &&
        searchItems.map((item) => {
          return [
            item.items_coordinates
              .split("(")[1]
              .split(")")[0]
              .split(" ")
              .reverse(),
            item.image_1,
            item.name_item,
            item.price_rent,
            item.rent,
            item.id,
            item.free_rent,
            item.offer_price_rent,
          ];
        })
    );
  }, [searchItems]);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Поиск: #разделисдругим";
  }, []);

  React.useEffect(() => {
    if (
      !words &&
      !category_id &&
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
        category_id,
        min_price,
        max_price,
        free,
        status,
        delivery,
        insurance,
        contract,
        pledge,
        userCoordinates,
        distance
      ).then((res) => {
        dispatch(setSearchItems(res.data));
      });
    }
  }, []);

  const addSubjectHandler = () => {
    if (isLoggedIn && subjects.length >= maxItemsToPlaceFree) {
      alert(`Лимит вещей достигнут (${maxItemsToPlaceFree})`);
      return;
    } else if (isLoggedIn && subjects.length >= maxItemsToPlaceFree) {
      alert(`Лимит вещей достигнут (${maxItemsToPlaceFree})`);
      return;
    } else if (!isLoggedIn) {
      alert("Сначала авторизуйтесь!");
      return;
    } else if (!userData.email_verify || !userData.phone_verify) {
      alert(
        "У вас не подтвержден номер телефона либо почта. Подтвердите их в профиле."
      );
      setRedirect(<Redirect to="/private-profile" />);
      return;
    }
    window.location.href = "/place-item";
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
    distance
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
      distance
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
      category_id,
      e.target.value,
      max_price,
      free,
      status,
      delivery,
      insurance,
      contract,
      pledge,
      userCoordinates,
      distance
    );
  };

  const maxPriceHandler = (e) => {
    if (e.target.value < 0 || e.target.value > 999999) {
      return;
    }
    dispatch(setMaxPrice(e.target.value));
    searchHandler(
      words,
      category_id,
      min_price,
      e.target.value,
      free,
      status,
      delivery,
      insurance,
      contract,
      pledge,
      userCoordinates,
      distance
    );
  };

  const freeRentHandler = () => {
    dispatch(setFree(!free));
    searchHandler(
      words,
      category_id,
      min_price,
      max_price,
      !free,
      status,
      delivery,
      insurance,
      contract,
      pledge,
      userCoordinates,
      distance
    );
  };

  const statusHandler = (e) => {
    if (status === e.target.value) {
      dispatch(setStatus(false));
      searchHandler(
        words,
        category_id,
        min_price,
        max_price,
        free,
        false,
        delivery,
        insurance,
        contract,
        pledge,
        userCoordinates,
        distance
      );
    } else {
      dispatch(setStatus(e.target.value));
      searchHandler(
        words,
        category_id,
        min_price,
        max_price,
        free,
        e.target.value,
        delivery,
        insurance,
        contract,
        pledge,
        userCoordinates,
        distance
      );
    }
  };

  const deliveryHandler = () => {
    dispatch(setDelivery(!delivery));
    searchHandler(
      words,
      category_id,
      min_price,
      max_price,
      free,
      status,
      !delivery,
      insurance,
      contract,
      pledge,
      userCoordinates,
      distance
    );
  };

  const insuranceHandler = () => {
    dispatch(setInsurance(!insurance));
    searchHandler(
      words,
      category_id,
      min_price,
      max_price,
      free,
      status,
      delivery,
      !insurance,
      contract,
      pledge,
      userCoordinates,
      distance
    );
  };

  const contractHandler = () => {
    dispatch(setContract(!contract));
    searchHandler(
      words,
      category_id,
      min_price,
      max_price,
      free,
      status,
      delivery,
      insurance,
      !contract,
      pledge,
      userCoordinates,
      distance
    );
  };

  const pledgeHandler = () => {
    dispatch(setPledge(!pledge));
    searchHandler(
      words,
      category_id,
      min_price,
      max_price,
      free,
      status,
      delivery,
      insurance,
      contract,
      !pledge,
      userCoordinates,
      distance
    );
  };

  const distanceHandler = (props) => {
    if (distance === props) {
      dispatch(setDistance(false));
      searchHandler(
        words,
        category_id,
        min_price,
        max_price,
        free,
        status,
        delivery,
        insurance,
        contract,
        pledge,
        userCoordinates,
        false
      );
    } else {
      dispatch(setDistance(props));
      searchHandler(
        words,
        category_id,
        min_price,
        max_price,
        free,
        status,
        delivery,
        insurance,
        contract,
        pledge,
        userCoordinates,
        props
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
      distance
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
          <div className="SearchPage_container_shapka" id="search_pk">
            <div>
              <Link style={{ textDecoration: "none" }} to="/">
                <p className="SearchPage_container_shapka_hover"> Главная </p>
              </Link>
              <img src={vector1} alt="" />
            </div>

            <div>
              <Link style={{ textDecoration: "none" }} to="/catalog">
                <p className="SearchPage_container_shapka_hover"> Каталог </p>
              </Link>
              {category && <img src={vector1} alt="" />}
            </div>
            {redirect}

            <div>
              <p style={{ color: "black" }}> {category} </p>
            </div>
          </div>

          {/* МОБИЛЬНАЯ ВЕРСИЯ */}
          <div className="SearchPage_container_shapka" id="search_mobile">
            <div className="SearchPage_shapka_up">
              <div>
                <Link style={{ textDecoration: "none" }} to="/">
                  <p className="SearchPage_container_shapka_hover"> Главная </p>
                </Link>
                <img src={vector1} alt="" />
              </div>

              <div>
                <Link style={{ textDecoration: "none" }} to="/catalog">
                  <p className="SearchPage_container_shapka_hover"> Каталог </p>
                </Link>
                {category && <img src={vector1} alt="" />}
              </div>

              <div>
                <p style={{ color: "black" }}> {category} </p>
              </div>
            </div>

            <p className="container_shapka_result">
              Найдено предложений: {searchItems.length}
              {category ? (
                <p>
                  В категории: {category}
                  <div
                    onClick={categoryResetHandler}
                    style={{
                      color: "red",
                      fontSize: "14px",
                      marginTop: "5px",
                      marginBottom: "10px",
                      cursor: "pointer",
                    }}
                  >
                    Сбросить категорию
                  </div>
                </p>
              ) : (
                ""
              )}
            </p>
          </div>

          {/* МОБИЛЬНАЯ ВЕРСИЯ */}
          <div className="content_right_shapka" id="search_mobile">
            <div className="shapka_top">
              <div className="shapka_top_up">
                <p
                  title="Кликните повторно, чтобы выключить фильтр по дистанции"
                  className={
                    distance === "200" ? "distance_p active" : "distance_p"
                  }
                  onClick={() => distanceHandler("200")}
                >
                  До 200 м
                </p>
                <p
                  title="Кликните повторно, чтобы выключить фильтр по дистанции"
                  className={
                    distance === "1000" ? "distance_p active" : "distance_p"
                  }
                  onClick={() => distanceHandler("1000")}
                >
                  До 1 км
                </p>
                <p
                  title="Кликните повторно, чтобы выключить фильтр по дистанции"
                  className={
                    distance === "5000" ? "distance_p active" : "distance_p"
                  }
                  onClick={() => distanceHandler("5000")}
                >
                  До 5 км
                </p>
              </div>
              <div className="search_top_up_row">
                <p
                  onClick={() => distanceHandler(false)}
                  className={
                    distance === false ? "distance_p active" : "distance_p"
                  }
                >
                  Показать все
                </p>
                <p
                  style={{ margin: "0" }}
                  onClick={() => filterhandler()}
                  className={
                    filter === true ? "distance_p active" : "distance_p"
                  }
                >
                  Фильтры
                </p>
              </div>
            </div>
          </div>

          {/* ОБЩИЙ КОНТЕЙНЕР С КОНТЕНТОМ ЛЕВАЯ И ПРАВАЯ СТОРОНА  */}
          <div className="SearchPage_container_content">
            <div className="SearchPage_container_content_left" id="search_pk">
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
                    style={{ cursor: "pointer" }}
                    checked={free}
                    onChange={freeRentHandler}
                    id="free"
                    type="checkbox"
                    className="input_left_checkbox"
                  />
                  <label style={{ cursor: "pointer" }} htmlFor="free">
                    Бесплатно
                  </label>
                </li>

                <li>
                  <input
                    style={{ cursor: "pointer" }}
                    checked={status === "2"}
                    value="2"
                    onChange={(e) => statusHandler(e)}
                    id="companies"
                    type="checkbox"
                    className="input_left_checkbox"
                  />
                  <label style={{ cursor: "pointer" }} htmlFor="companies">
                    Компании
                  </label>
                </li>

                <li>
                  <input
                    style={{ cursor: "pointer" }}
                    checked={status === "1"}
                    value="1"
                    onChange={(e) => statusHandler(e)}
                    id="individual"
                    type="checkbox"
                    className="input_left_checkbox"
                  />
                  <label style={{ cursor: "pointer" }} htmlFor="individual">
                    {" "}
                    Частные лица{" "}
                  </label>
                </li>

                <li>
                  <input
                    style={{ cursor: "pointer" }}
                    checked={delivery}
                    onChange={deliveryHandler}
                    id="delivery"
                    type="checkbox"
                    className="input_left_checkbox"
                  />
                  <label style={{ cursor: "pointer" }} htmlFor="delivery">
                    {" "}
                    Доставка{" "}
                  </label>
                </li>

                <li>
                  <input
                    style={{ cursor: "pointer" }}
                    checked={insurance}
                    onChange={insuranceHandler}
                    id="insurance"
                    type="checkbox"
                    className="input_left_checkbox"
                  />
                  <label style={{ cursor: "pointer" }} htmlFor="insurance">
                    {" "}
                    Страховка{" "}
                  </label>
                </li>

                <li>
                  <input
                    style={{ cursor: "pointer" }}
                    checked={contract}
                    onChange={contractHandler}
                    id="contract"
                    type="checkbox"
                    className="input_left_checkbox"
                  />
                  <label style={{ cursor: "pointer" }} htmlFor="contract">
                    {" "}
                    По договору{" "}
                  </label>
                </li>

                <li>
                  <input
                    style={{ cursor: "pointer" }}
                    checked={pledge}
                    onChange={pledgeHandler}
                    id="pledge"
                    type="checkbox"
                    className="input_left_checkbox"
                  />
                  <label style={{ cursor: "pointer" }} htmlFor="pledge">
                    {" "}
                    Без залога{" "}
                  </label>
                </li>

                <li>
                  <input
                    disabled
                    type="checkbox"
                    className="input_left_checkbox"
                  />
                  <label style={{ opacity: "0.6" }}> Акции </label>
                </li>
                <li>
                  <input
                    id="minPrice"
                    disabled
                    type="checkbox"
                    className="input_left_checkbox"
                  />
                  <label htmlFor="minPrice" style={{ opacity: "0.6" }}>
                    Скоро освободится
                  </label>
                </li>
              </ul>
            </div>

            {/* ЦЕНА И ВЫБОР ДЛЯ ПЛАНШЕТОВ */}

            <div className="SearchPage_container_content_left" id="search_ipad">
              <ul style={{ display: "flex", flexDirection: "row" }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
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
                </div>

                <div className="search_option_left">
                  <div className="search_option_left_left">
                    <li>
                      <input
                        style={{ cursor: "pointer" }}
                        checked={free}
                        onChange={freeRentHandler}
                        id="free"
                        type="checkbox"
                        className="input_left_checkbox"
                      />
                      <label style={{ cursor: "pointer" }} htmlFor="free">
                        Бесплатно
                      </label>
                    </li>

                    <li>
                      <input
                        style={{ cursor: "pointer" }}
                        checked={status === "2"}
                        value="2"
                        onChange={(e) => statusHandler(e)}
                        id="companies"
                        type="checkbox"
                        className="input_left_checkbox"
                      />
                      <label style={{ cursor: "pointer" }} htmlFor="companies">
                        Компании
                      </label>
                    </li>

                    <li>
                      <input
                        style={{ cursor: "pointer" }}
                        checked={status === "1"}
                        value="1"
                        onChange={(e) => statusHandler(e)}
                        id="individual"
                        type="checkbox"
                        className="input_left_checkbox"
                      />
                      <label style={{ cursor: "pointer" }} htmlFor="individual">
                        {" "}
                        Частные лица{" "}
                      </label>
                    </li>

                    <li>
                      <input
                        style={{ cursor: "pointer" }}
                        checked={delivery}
                        onChange={deliveryHandler}
                        id="delivery"
                        type="checkbox"
                        className="input_left_checkbox"
                      />
                      <label style={{ cursor: "pointer" }} htmlFor="delivery">
                        {" "}
                        Доставка{" "}
                      </label>
                    </li>

                    <li>
                      <input
                        style={{ cursor: "pointer" }}
                        checked={insurance}
                        onChange={insuranceHandler}
                        id="insurance"
                        type="checkbox"
                        className="input_left_checkbox"
                      />
                      <label style={{ cursor: "pointer" }} htmlFor="insurance">
                        {" "}
                        Страховка{" "}
                      </label>
                    </li>
                  </div>

                  <div className="search_option_left_right">
                    <li>
                      <input
                        style={{ cursor: "pointer" }}
                        checked={contract}
                        onChange={contractHandler}
                        id="contract"
                        type="checkbox"
                        className="input_left_checkbox"
                      />
                      <label style={{ cursor: "pointer" }} htmlFor="contract">
                        {" "}
                        По договору{" "}
                      </label>
                    </li>

                    <li>
                      <input
                        style={{ cursor: "pointer" }}
                        checked={pledge}
                        onChange={pledgeHandler}
                        id="pledge"
                        type="checkbox"
                        className="input_left_checkbox"
                      />
                      <label style={{ cursor: "pointer" }} htmlFor="pledge">
                        {" "}
                        Без залога{" "}
                      </label>
                    </li>

                    <li>
                      <input
                        disabled
                        type="checkbox"
                        className="input_left_checkbox"
                      />
                      <label style={{ opacity: "0.6" }}> Акции </label>
                    </li>
                    <li>
                      <input
                        id="minPrice"
                        disabled
                        type="checkbox"
                        className="input_left_checkbox"
                      />
                      <label htmlFor="minPrice" style={{ opacity: "0.6" }}>
                        Скоро освободится
                      </label>
                    </li>
                  </div>
                </div>
              </ul>
            </div>

            {/* АДАПТИВ ЛЕВОЙ СТОРОНЫ */}
            {filter && (
              <div
                className="SearchPage_container_content_left"
                id="search_mobile"
              >
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
                      style={{ cursor: "pointer" }}
                      checked={free}
                      onChange={freeRentHandler}
                      id="free"
                      type="checkbox"
                      className="input_left_checkbox"
                    />
                    <label style={{ cursor: "pointer" }} htmlFor="free">
                      Бесплатно
                    </label>
                  </li>

                  <li>
                    <input
                      style={{ cursor: "pointer" }}
                      checked={status === "2"}
                      value="2"
                      onChange={(e) => statusHandler(e)}
                      id="companies"
                      type="checkbox"
                      className="input_left_checkbox"
                    />
                    <label style={{ cursor: "pointer" }} htmlFor="companies">
                      Компании
                    </label>
                  </li>

                  <li>
                    <input
                      style={{ cursor: "pointer" }}
                      checked={status === "1"}
                      value="1"
                      onChange={(e) => statusHandler(e)}
                      id="individual"
                      type="checkbox"
                      className="input_left_checkbox"
                    />
                    <label style={{ cursor: "pointer" }} htmlFor="individual">
                      {" "}
                      Частные лица{" "}
                    </label>
                  </li>

                  <li>
                    <input
                      style={{ cursor: "pointer" }}
                      checked={delivery}
                      onChange={deliveryHandler}
                      id="delivery"
                      type="checkbox"
                      className="input_left_checkbox"
                    />
                    <label style={{ cursor: "pointer" }} htmlFor="delivery">
                      {" "}
                      Доставка{" "}
                    </label>
                  </li>

                  <li>
                    <input
                      style={{ cursor: "pointer" }}
                      checked={insurance}
                      onChange={insuranceHandler}
                      id="insurance"
                      type="checkbox"
                      className="input_left_checkbox"
                    />
                    <label style={{ cursor: "pointer" }} htmlFor="insurance">
                      {" "}
                      Страховка{" "}
                    </label>
                  </li>

                  <li>
                    <input
                      style={{ cursor: "pointer" }}
                      checked={contract}
                      onChange={contractHandler}
                      id="contract"
                      type="checkbox"
                      className="input_left_checkbox"
                    />
                    <label style={{ cursor: "pointer" }} htmlFor="contract">
                      {" "}
                      По договору{" "}
                    </label>
                  </li>

                  <li>
                    <input
                      style={{ cursor: "pointer" }}
                      checked={pledge}
                      onChange={pledgeHandler}
                      id="pledge"
                      type="checkbox"
                      className="input_left_checkbox"
                    />
                    <label style={{ cursor: "pointer" }} htmlFor="pledge">
                      {" "}
                      Без залога{" "}
                    </label>
                  </li>

                  <li>
                    <input
                      disabled
                      type="checkbox"
                      className="input_left_checkbox"
                    />
                    <label style={{ opacity: "0.6" }}> Акции </label>
                  </li>
                  <li>
                    <input
                      id="minPrice"
                      disabled
                      type="checkbox"
                      className="input_left_checkbox"
                    />
                    <label htmlFor="minPrice" style={{ opacity: "0.6" }}>
                      Скоро освободится
                    </label>
                  </li>
                </ul>
              </div>
            )}

            {/* планшет версия левой стороны */}
            {/* АДАПТИВ ЛЕВОЙ СТОРОНЫ */}
            {filter && (
              <div
                className="SearchPage_container_content_left"
                id="search_ipad"
                style={{ display: "flex", flexDirection: "row" }}
              >
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
                      style={{ cursor: "pointer" }}
                      checked={free}
                      onChange={freeRentHandler}
                      id="free"
                      type="checkbox"
                      className="input_left_checkbox"
                    />
                    <label style={{ cursor: "pointer" }} htmlFor="free">
                      Бесплатно
                    </label>
                  </li>

                  <li>
                    <input
                      style={{ cursor: "pointer" }}
                      checked={status === "2"}
                      value="2"
                      onChange={(e) => statusHandler(e)}
                      id="companies"
                      type="checkbox"
                      className="input_left_checkbox"
                    />
                    <label style={{ cursor: "pointer" }} htmlFor="companies">
                      Компании
                    </label>
                  </li>

                  <li>
                    <input
                      style={{ cursor: "pointer" }}
                      checked={status === "1"}
                      value="1"
                      onChange={(e) => statusHandler(e)}
                      id="individual"
                      type="checkbox"
                      className="input_left_checkbox"
                    />
                    <label style={{ cursor: "pointer" }} htmlFor="individual">
                      {" "}
                      Частные лица{" "}
                    </label>
                  </li>

                  <li>
                    <input
                      style={{ cursor: "pointer" }}
                      checked={delivery}
                      onChange={deliveryHandler}
                      id="delivery"
                      type="checkbox"
                      className="input_left_checkbox"
                    />
                    <label style={{ cursor: "pointer" }} htmlFor="delivery">
                      {" "}
                      Доставка{" "}
                    </label>
                  </li>

                  <li>
                    <input
                      style={{ cursor: "pointer" }}
                      checked={insurance}
                      onChange={insuranceHandler}
                      id="insurance"
                      type="checkbox"
                      className="input_left_checkbox"
                    />
                    <label style={{ cursor: "pointer" }} htmlFor="insurance">
                      {" "}
                      Страховка{" "}
                    </label>
                  </li>

                  <li>
                    <input
                      style={{ cursor: "pointer" }}
                      checked={contract}
                      onChange={contractHandler}
                      id="contract"
                      type="checkbox"
                      className="input_left_checkbox"
                    />
                    <label style={{ cursor: "pointer" }} htmlFor="contract">
                      {" "}
                      По договору{" "}
                    </label>
                  </li>

                  <li>
                    <input
                      style={{ cursor: "pointer" }}
                      checked={pledge}
                      onChange={pledgeHandler}
                      id="pledge"
                      type="checkbox"
                      className="input_left_checkbox"
                    />
                    <label style={{ cursor: "pointer" }} htmlFor="pledge">
                      {" "}
                      Без залога{" "}
                    </label>
                  </li>

                  <li>
                    <input
                      disabled
                      type="checkbox"
                      className="input_left_checkbox"
                    />
                    <label style={{ opacity: "0.6" }}> Акции </label>
                  </li>
                  <li>
                    <input
                      id="minPrice"
                      disabled
                      type="checkbox"
                      className="input_left_checkbox"
                    />
                    <label htmlFor="minPrice" style={{ opacity: "0.6" }}>
                      Скоро освободится
                    </label>
                  </li>
                </ul>
              </div>
            )}

            {/* ПРАВАЯ СТОРОНА */}

            <div className="SearchPage_container_content_right">
              {/* ШАПКА */}
              <div className="content_right_shapka" id="search_pk">
                <div className="shapka_top">
                  <p
                    style={{ height: "55px" }}
                    className="container_shapka_result"
                  >
                    Найдено предложений: {searchItems.length}
                    {category ? (
                      <p>
                        В категории: {category}
                        <span
                          onClick={categoryResetHandler}
                          style={{
                            color: "red",
                            fontSize: "14px",
                            marginLeft: "10px",
                            cursor: "pointer",
                          }}
                        >
                          Сбросить категорию
                        </span>
                      </p>
                    ) : (
                      ""
                    )}
                  </p>
                  <div className="distance_wrapper">
                    <p
                      title="Кликните повторно, чтобы выключить фильтр по дистанции"
                      className={
                        distance === "200" ? "distance_p active" : "distance_p"
                      }
                      onClick={() => distanceHandler("200")}
                    >
                      До 200 м
                    </p>
                    <p
                      title="Кликните повторно, чтобы выключить фильтр по дистанции"
                      className={
                        distance === "1000" ? "distance_p active" : "distance_p"
                      }
                      onClick={() => distanceHandler("1000")}
                    >
                      До 1 км
                    </p>
                    <p
                      title="Кликните повторно, чтобы выключить фильтр по дистанции"
                      className={
                        distance === "5000" ? "distance_p active" : "distance_p"
                      }
                      onClick={() => distanceHandler("5000")}
                    >
                      До 5 км
                    </p>
                    <p
                      onClick={() => distanceHandler(false)}
                      className={
                        distance === false ? "distance_p active" : "distance_p"
                      }
                    >
                      Показать все
                    </p>
                  </div>
                </div>
              </div>

              {/* КОНТЕНТ ПОД ШАПКОЙ */}
              <div className="content_right_all_content" id="search_pk">
                {searchItems.length > 0 && (
                  <div className="all_content_blocks">
                    {searchItems.map((item, index) => {
                      if (index <= 2) {
                        return <ItemCard key={index} item={item} />;
                      }
                    })}

                    {searchItems && (
                      <div style={{ marginBottom: "30px", marginLeft: "15px" }}>
                        <YMaps>
                          <Map
                            state={mapData}
                            width={850}
                            height={500}
                            modules={["package.full"]}
                          >
                            <Clusterer
                              options={{
                                preset: "islands#invertedBlueClusterIcons",
                                groupByCoordinates: false,
                                clusterDisableClickZoom: true,
                                clusterHideIconOnBalloonOpen: true,
                                geoObjectHideIconOnBalloonOpen: true,
                                hasBalloon: true,
                                clusterBalloonContentLayout:
                                  "cluster#balloonCarousel",
                                clusterBalloonContentLayoutWidth: 200,
                                clusterBalloonContentLayoutHeight: 130,
                                clusterBalloonPagerSize: 5,
                                clusterBalloonContentLayoutHeight: 270,
                                clusterBalloonContentLayoutWidth: 200,
                                clusterBalloonPanelMaxMapArea: 0,
                              }}
                            >
                              {marks &&
                                marks.map((mark, index) => (
                                  <Placemark
                                    key={index}
                                    geometry={mark[0]}
                                    modules={[
                                      "geoObject.addon.balloon",
                                      "geoObject.addon.hint",
                                    ]}
                                    properties={getPointData(index)}
                                    options={getPointOptions(index)}
                                  />
                                ))}
                            </Clusterer>
                            {userCoordinates && (
                              <Placemark
                                key={"own_geo"}
                                geometry={userCoordinates.split(" ").reverse()}
                                modules={[
                                  "geoObject.addon.balloon",
                                  "geoObject.addon.hint",
                                ]}
                                options={{ preset: `islands#redDotIcon` }}
                                properties={{
                                  iconCaption: "Я тут!",
                                }}
                              />
                            )}
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
                      <p style={{ marginBottom: "20px" }}>
                        Вы можете предложить свою вещь, услугу или иное
                        имущество, либо зайти завтра...
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

              {/*  ПРАВАЯ СТОРОНА ДЛЯ ПЛАНШЕТОВ */}
              <div
                className="SearchPage_container_content_right"
                id="search_ipad"
              >
                {/* ШАПКА */}
                <div className="content_right_shapka" id="search_ipad">
                  <div className="shapka_top">
                    <p
                      title="Кликните повторно, чтобы выключить фильтр по дистанции"
                      className={
                        distance === "200" ? "distance_p active" : "distance_p"
                      }
                      onClick={() => distanceHandler("200")}
                    >
                      До 200 м
                    </p>
                    <p
                      title="Кликните повторно, чтобы выключить фильтр по дистанции"
                      className={
                        distance === "1000" ? "distance_p active" : "distance_p"
                      }
                      onClick={() => distanceHandler("1000")}
                    >
                      До 1 км
                    </p>
                    <p
                      title="Кликните повторно, чтобы выключить фильтр по дистанции"
                      className={
                        distance === "5000" ? "distance_p active" : "distance_p"
                      }
                      onClick={() => distanceHandler("5000")}
                    >
                      До 5 км
                    </p>
                    <p
                      onClick={() => distanceHandler(false)}
                      className={
                        distance === false ? "distance_p active" : "distance_p"
                      }
                    >
                      Показать все
                    </p>
                  </div>
                </div>

                {/* КОНТЕНТ ПОД ШАПКОЙ */}
                <div className="content_right_all_content" id="search_ipad">
                  {searchItems.length > 0 && (
                    <div className="all_content_blocks">
                      {searchItems.map((item, index) => {
                        if (index <= 2) {
                          return (
                            <div
                              style={{
                                width: "33%",
                                marginBottom: "25px",
                                justifyContent: "center",
                                display: "flex",
                              }}
                            >
                              {" "}
                              <ItemCard key={index} item={item} />{" "}
                            </div>
                          );
                        }
                      })}

                      {searchItems && (
                        <div
                          style={{
                            marginBottom: "30px",
                            marginLeft: "15px",
                            width: "100%",
                          }}
                        >
                          <YMaps>
                            <Map
                              state={mapData}
                              width={"auto"}
                              height={500}
                              modules={["package.full"]}
                            >
                              <Clusterer
                                options={{
                                  preset: "islands#invertedBlueClusterIcons",
                                  groupByCoordinates: false,
                                  clusterDisableClickZoom: true,
                                  clusterHideIconOnBalloonOpen: true,
                                  geoObjectHideIconOnBalloonOpen: true,
                                  hasBalloon: true,
                                  clusterBalloonContentLayout:
                                    "cluster#balloonCarousel",
                                  clusterBalloonContentLayoutWidth: 200,
                                  clusterBalloonContentLayoutHeight: 130,
                                  clusterBalloonPagerSize: 5,
                                  clusterBalloonContentLayoutHeight: 270,
                                  clusterBalloonContentLayoutWidth: 200,
                                  clusterBalloonPanelMaxMapArea: 0,
                                }}
                              >
                                {marks &&
                                  marks.map((mark, index) => (
                                    <Placemark
                                      key={index}
                                      geometry={mark[0]}
                                      modules={[
                                        "geoObject.addon.balloon",
                                        "geoObject.addon.hint",
                                      ]}
                                      properties={getPointData(index)}
                                      options={getPointOptions(index)}
                                    />
                                  ))}
                              </Clusterer>
                              {userCoordinates && (
                                <Placemark
                                  key={"own_geo"}
                                  geometry={userCoordinates
                                    .split(" ")
                                    .reverse()}
                                  modules={[
                                    "geoObject.addon.balloon",
                                    "geoObject.addon.hint",
                                  ]}
                                  options={{ preset: `islands#redDotIcon` }}
                                  properties={{
                                    iconCaption: "Я тут!",
                                  }}
                                />
                              )}
                            </Map>
                          </YMaps>
                        </div>
                      )}
                      {searchItems.map((item, index) => {
                        if (index > 2) {
                          return (
                            <div
                              style={{
                                width: "33%",
                                marginBottom: "15px",
                                justifyContent: "center",
                                display: "flex",
                              }}
                            >
                              {" "}
                              <ItemCard key={index} item={item} />{" "}
                            </div>
                          );
                        }
                      })}
                    </div>
                  )}
                  {searchItems.length === 0 && (
                    <div className="all_content_blocks">
                      <div className="search_not_found">
                        <p>Сегодня ничего не найдено по заданным параметрам.</p>
                        <p style={{ marginBottom: "20px" }}>
                          Вы можете предложить свою вещь, услугу или иное
                          имущество, либо зайти завтра...
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

              {/* МОБИЛЬНЫЙ ВИД */}
              <div className="content_right_all_content" id="search_mobile">
                {searchItems.length > 0 && (
                  <div className="all_content_blocks">
                    <div className="all_content_blocks_up">
                      {searchItems.map((item, index) => {
                        if (index <= 1) {
                          return (
                            <div style={{ marginBottom: "0" }}>
                              <ItemCard key={index} item={item} />{" "}
                            </div>
                          );
                        }
                      })}
                    </div>

                    {searchItems && (
                      <div
                        style={{
                          alignSelf: "center",
                          width: "100%",
                          marginTop: "15px",
                          marginBottom: "15px",
                        }}
                      >
                        <YMaps>
                          <Map
                            state={mapData}
                            width={"auto"}
                            height={300}
                            modules={["package.full"]}
                          >
                            <Clusterer
                              options={{
                                preset: "islands#invertedBlueClusterIcons",
                                groupByCoordinates: false,
                                clusterDisableClickZoom: true,
                                clusterHideIconOnBalloonOpen: true,
                                geoObjectHideIconOnBalloonOpen: true,
                                hasBalloon: true,
                                clusterBalloonContentLayout:
                                  "cluster#balloonCarousel",
                                clusterBalloonContentLayoutWidth: 200,
                                clusterBalloonContentLayoutHeight: 130,
                                clusterBalloonPagerSize: 5,
                                clusterBalloonContentLayoutHeight: 270,
                                clusterBalloonContentLayoutWidth: 200,
                                clusterBalloonPanelMaxMapArea: 0,
                              }}
                            >
                              {marks &&
                                marks.map((mark, index) => (
                                  <Placemark
                                    key={index}
                                    geometry={mark[0]}
                                    modules={[
                                      "geoObject.addon.balloon",
                                      "geoObject.addon.hint",
                                    ]}
                                    properties={getPointData(index)}
                                    options={getPointOptions(index)}
                                  />
                                ))}
                            </Clusterer>
                            {userCoordinates && (
                              <Placemark
                                key={"own_geo"}
                                geometry={userCoordinates.split(" ").reverse()}
                                modules={[
                                  "geoObject.addon.balloon",
                                  "geoObject.addon.hint",
                                ]}
                                options={{ preset: `islands#redDotIcon` }}
                                properties={{
                                  iconCaption: "Я тут!",
                                }}
                              />
                            )}
                          </Map>
                        </YMaps>
                      </div>
                    )}

                    <div className="all_content_blocks_down">
                      {searchItems.map((item, index) => {
                        if (index > 1) {
                          return (
                            <div className="card_div">
                              <div>
                                <ItemCard key={index} item={item} />
                              </div>
                            </div>
                          );
                        }
                      })}
                    </div>
                  </div>
                )}
                {searchItems.length === 0 && (
                  <div className="all_content_blocks">
                    <div className="search_not_found">
                      <p style={{ marginBottom: "10px" }}>
                        Сегодня ничего не найдено по заданным параметрам.
                      </p>
                      <p style={{ marginBottom: "20px" }}>
                        Вы можете предложить свою вещь, услугу или иное
                        имущество, либо зайти завтра...
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
