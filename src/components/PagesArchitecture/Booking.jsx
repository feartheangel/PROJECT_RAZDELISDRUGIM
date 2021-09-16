import React from "react";
import "../../pages/CardThings/CardThings.css";
import { Link } from "react-router-dom";
import { Header, Footer, ItemCard } from "../../components/index";
import {
  setSearchCategory,
  setCategoryId,
  setSearchItems,
} from "../../redux/actions/search";
import { useSelector, useDispatch } from "react-redux";
import { YMaps, Map, Placemark } from "react-yandex-maps";
import Vector1 from "../../img/SearchPage/Vector1.png";
import Vector2 from "../../img/CardThings/LeftContent/Vector2.png";
import Vector3 from "../../img/CardThings/LeftContent/Vector3.png";
import Vector6 from "../../img/CardThings/RightContent/Vector6.png";
import Vector7 from "../../img/CardThings/RightContent/Vector7.png";
import ArrowLeft from "../../img/MainPage/Arrow_left.png";
import ArrowRight from "../../img/MainPage/Arrow_right.png";
import Share from "../../img/CardThings/LeftContent/Vector 1.png";
import Union from "../../img/CardThings/LeftContent/Union.png";
import CombinedShare from "../../img/CardThings/LeftContent/Combined Shape.png";
import Service from "../../img/CardThings/LeftContent/Service.png";
import Sell1 from "../../img/CardThings/LeftContent/sell 1.png";
import HandShake from "../../img/CardThings/RightContent/handShake1.png";
import Address from "../../img/CardThings/RightContent/Vector2.png";
import Car from "../../img/CardThings/RightContent/Vector3.png";
import Clock2 from "../../img/CardThings/RightContent/Vector5.png";
import Star2 from "../../img/CardThings/RightContent/Star 2.png";
import Telegram from "../../img/CardThings/RightContent/Component 36.png";
import Viber from "../../img/CardThings/RightContent/Component 37.png";
import Whatsapp from "../../img/CardThings/RightContent/Component 38.png";
import Instagram from "../../img/CardThings/RightContent/Component 39.png";
import Vk from "../../img/CardThings/RightContent/Component 42.png";
import Views from "../../img/CardThings/LeftContent/views.png";
import freePrice from "../../img/MainPage/freePrice.png";
import Requests from "../../http/axios-requests";
import Google from "../../img/ProfilePage/google.png";
import Facebook from "../../img/ProfilePage/facebook2.png";
import Ok from "../../img/ProfilePage/ok.png";
import copy from "../../img/MainPage/copy.png";
import Favorites from "../../img/MainPage/Favorites.png";
import FavoritesDisabled from "../../img/MainPage/FavoritesDisabled.png";
import EditItemImage from "../../img/MainPage/editicon.png";
import Calendar from '../../img/CardThings/Booking/Union.png'
import { rootAddress } from "../../http/axios-requests";

const Booking = () =>{

    const dispatch = useDispatch();
    const { isLoggedIn, favorites, subjects } = useSelector(
      ({ userData }) => userData
    );
    //расчет времени на платформе
    function getDaysBetweenDates(d0, d1) {
      var msPerDay = 8.64e7;
  
      var x0 = new Date(d0);
      var x1 = new Date(d1);
  
      x0.setHours(12, 0, 0);
      x1.setHours(12, 0, 0);
  
      return Math.round((x1 - x0) / msPerDay) > 365
        ? `${Math.floor(Math.round((x1 - x0) / msPerDay) / 365)} год(лет)`
        : Math.round((x1 - x0) / msPerDay) > 30
        ? `${Math.floor(Math.round((x1 - x0) / msPerDay) / 30)} мес.`
        : `${Math.round((x1 - x0) / msPerDay)} д.`;
    }
  
    const showContactHandler = () => {
      if (!isLoggedIn) {
        alert("Доступно только авторизованным пользователям!");
        return;
      }
  
      setContactVisible(!contactVisible);
    };
  
    const categoryRedirect = (name, id) => {
      dispatch(setSearchCategory(name));
      dispatch(setCategoryId(id));
      Requests.search(false, id).then((res) => {
        dispatch(setSearchItems(res.data));
      });
    };
  
    const addFavoriteHandler = (e) => {
      if (!isLoggedIn) {
        alert("Доступно только авторизованным пользователям.");
        return;
      }
      e.preventDefault();
      setIsFavorite(true);
      Requests.addFavoriteItem(window.location.href.split("?id=")[1])
        .then(() => {
          setIsFavorite(true);
        })
        .catch(() => setIsFavorite(false));
    };
  
    const deleteFavoriteHandler = (e) => {
      if (!isLoggedIn) {
        alert("Доступно только авторизованным пользователям.");
        return;
      }
      e.preventDefault();
      setIsFavorite(false);
      Requests.deleteFavoriteItem(window.location.href.split("?id=")[1])
        .then(() => {
          setIsFavorite(false);
        })
        .catch(() => setIsFavorite(true));
    };
  
    const mobileContactHandler = (e) => {
      if (!isLoggedIn) {
        e.preventDefault();
        alert("Доступно только авторизованным пользователям.");
      }
    };
  
    function isNumeric(str) {
      if (typeof str != "string" || Number(str) <= 0) return false; // we only process strings!
      return (
        !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
        !isNaN(parseFloat(str))
      ); // ...and ensure strings of whitespace fail
    }
  
    React.useEffect(() => {
      let isMounted = true;
      Requests.getSingleItem(window.location.href.split("?id=")[1].split("&")[0])
        .then((response) => {
          if (
            isMounted &&
            isNumeric(window.location.href.split("?id=")[1].split("&")[0])
          ) {
            setItemData(response.data);
            setSelectedImage(response.data.image_1);
          } else {
            window.location.href = "/";
          }
        })
        .catch(() => {
          window.location.href = "/";
        });
  
      return () => {
        isMounted = false;
      };
    }, []);
  
    React.useEffect(() => {
      favorites &&
        favorites.forEach((elem) => {
          if (elem.item.id === Number(window.location.href.split("?id=")[1])) {
            setIsFavorite(true);
          }
          return;
        });
    }, [favorites]);
  
    React.useEffect(() => {
      subjects &&
        subjects.forEach((elem) => {
          if (elem.id === Number(window.location.href.split("?id=")[1])) {
            setIsOwn(true);
          }
        });
    }, [subjects]);
  
    const [itemData, setItemData] = React.useState();
    const [simillarSubjects, setSimillarSubjects] = React.useState();
    const [selectedImage, setSelectedImage] = React.useState();
    const [contactVisible, setContactVisible] = React.useState();
    const [shareVisible, setShareVisible] = React.useState();
    const [isFavorite, setIsFavorite] = React.useState(false);
    const [isOwn, setIsOwn] = React.useState(false);
    // бронирование
    const [booking, setBooking] = React.useState(false);
    const BookingHandler = () => {
      setBooking(!booking);
    }
  
    React.useEffect(() => {
      window.scrollTo(0, 0);
      document.title = `${
        itemData && itemData.name_item
      } в аренду: #разделисдругим`;
    }, [itemData]);
  
    const mapData = {
      center:
        itemData &&
        itemData.items_coordinates
          .split("(")[1]
          .split(")")[0]
          .split(" ")
          .reverse(),
      zoom: 12,
    };
  
    const { serviceIds } = useSelector(({ settings }) => settings);

    return(
        <div className="card_content_booking" id="booking_page">
        {/* header */}
        <div className="content_booking_shapka_up">
          <p className="content_booking_shapka_up_p">Оформление бронирования</p>
        </div>
                {/* content */}
        <div className="card_content_booking_all">
          {/* up block content */}
          <div className="card_content_booking_up">
            <div className="content_booking_up_header">
              {/* left block */}
              <div className="booking_up_header_info_item">
                <div className="header_info_item_photo">
                    {itemData && itemData.image_1 && (
                  <img
                    className={
                      selectedImage === itemData.image_1
                        ? "card_thing_image_booking"
                        : "card_thing_image_booking"
                    }
                    onClick={() =>
                      setSelectedImage(itemData && itemData.image_1)
                    }
                    src={
                      itemData &&
                      `${rootAddress}${itemData.image_1}?random=` +
                        Math.random()
                    }
                    alt=""
                  />
                )}
                </div>

                <div className="header_info_item_name">
                  {/*название вещи */}
                  <p className="header_info_item_name_p1">
                    {itemData && itemData.name_item}{" "}
                    {!serviceIds.includes(
                      itemData && itemData.category_id.id
                    ) && "в аренду"}
                  </p>
                  {/* стоимость арнеды */}
                  <div className="header_info_item_name_yourCost">
                    {itemData && itemData.offer_price_rent && (
                      <div style={{ display: "flex" }}>
                        <img
                          src={HandShake}
                          className="yourCost_handShake"
                          alt=""
                        />
                        <p className="block_up_yourCost-p1">
                          {serviceIds.includes(
                            itemData && itemData.category_id.id
                          )
                            ? "Договорная"
                            : "Предложить свою цену"}
                        </p>
                      </div>
                    )}
                    {itemData && itemData.free_rent && (
                      <div style={{ display: "flex" }}>
                        <img
                          src={freePrice}
                          className="yourCost_handShake"
                          alt=""
                        />
                        <p className="block_up_yourCost-p1">Бесплатно</p>
                      </div>
                    )}
                    {itemData &&
                      !itemData.offer_price_rent &&
                      !itemData.free_rent && (
                        <div style={{ display: "flex" }}>
                          <p
                            style={{ marginRight: "10px" }}
                            className="block_up_yourCost-p1"
                          >
                            <span style={{ fontWeight: "500" }}>
                              {itemData && itemData.price_rent}
                            </span>{" "}
                            BYN
                          </p>
                          <p
                            style={{ marginRight: "10px" }}
                            className="block_up_yourCost-p1"
                          >
                            за
                          </p>
                          <p
                            style={{ fontWeight: "500" }}
                            className="block_up_yourCost-p1"
                          >
                            {itemData && itemData.rent === "Час"
                              ? "час"
                              : itemData && itemData.rent === "День"
                              ? "день"
                              : itemData && itemData.rent === "Неделя"
                              ? "неделю"
                              : itemData && itemData.rent === "Месяц"
                              ? "месяц"
                              : itemData && itemData.rent === "1шт."
                              ? "штуку"
                              : itemData && itemData.rent === "1кв.м."
                              ? "1кв.м."
                              : ""}
                          </p>
                        </div>
                      )}
                  </div>
                </div>
              </div>
              {/* right block header content */}
              <div className="booking_up_header_info_user">
                <p className="booking_up_header_info_user_p"> Владелец </p>
                <div className="booking_up_header_info_user_name">
                  <p className="header_info_user_name-p1">
                    {itemData && itemData.profile.company_name
                      ? itemData && itemData.profile.company_name
                      : itemData && itemData.profile.first_name}
                  </p>
                  <p className="header_info_user_name-p2">
                    {itemData && itemData.profile.company_name
                      ? "Компания"
                      : "Частное лицо"}
                  </p>
                </div>
              </div>
            </div>

            <div className="content_booking_up_information">
                <div className="content_booking_up_information_all">
                    <p className="information_all_up"> Даты аренды </p>
                    <div className="information_all_down">
                        <div className="information_all_down_left">
                            <div className="information_all_down_left_date">
                                <img className="booking_calendar" src={Calendar}/>
                                <p className="information_all_down_left_date-p">18 авг.</p>
                                <span className="information_all_down_left_date-p"> - </span>
                                <p className="information_all_down_left_date-p">20 авг.</p>
                            </div>
                            <p className="information_all_down_left_alldate"> 3-е суток </p>
                        </div >
                        <div className="information_all_down_right">
                        {/* Время получения и возврата*/}
                        {!serviceIds.includes(
                          itemData && itemData.category_id.id
                        ) && (
                          <div className="conditions_return">
                            <div className="conditions_return_block1">
                              <div className="conditions_row">
                                <p className="conditions_return_row-p1">
                                  Примерное время получения
                                </p>
                              </div>
                              <p className="conditions_timeItem-p1">
                                не ранее <p className="timeItem-p1-input">{itemData && itemData.receive_time}</p>
                              </p>
                            </div>

                            <div className="conditions_return_block2">
                              <div className="conditions_row">
                                <p className="conditions_return_row-p1">
                                  Примерное время возврата
                                </p>
                              </div>
                              <p className="conditions_timeItem-p1">
                                 не позднее <p className="timeItem-p1-input">{itemData && itemData.return_time}</p>
                              </p>
                            </div>
                          </div>
                        )}
                        </div>
                    </div>
                </div>
            </div>
          </div>


                          {/* центральные блоки */}
          <div className="card_content_booking_center">
            <div  className="card_content_booking_center_up">
              <div className="booking_center_up_block_first">
                <div className="booking_center_up_block_left">
                  <img src={Car} className="img_car_booking" alt="" />
                  <p className="booking_center_up_block_left-p"> Вид доставки</p>
                </div>
                <div className="booking_center_up_block_right">
                  <div className="up_block_right_input_block">
                    <input type="radio" className="input_setting"/>
                    <p className="up_block_right_input_block-text">Cамовывоз</p>
                  </div>

                  <div className="up_block_right_input_block2">
                    <div className="up_block_right_input_block2-2">
                    <input type="radio" className="input_setting"/>
                    <p className="up_block_right_input_block-text">Привезет и заберет владелец</p>
                    </div>
                    <p className="up_block_right_input_block3_text">— за 20 BYN</p>
                  </div>

                  <div className="up_block_right_input_block3">
                    <div className="up_block_right_input_block3-3">
                      <input type="radio" className="input_setting"/>
                      <p className="up_block_right_input_block-text">Отправить</p>
                    </div>
                    <p className="up_block_right_input_block3_text">— почтой, такси, курьером: за счет Рентера</p>
                  </div>
                </div>
              </div>

              <div className="booking_center_up_block_second">

              </div>

            </div>
            <div  className="card_content_booking_center_down">

            </div>
          </div>

          {/* нижний блок  */}
        </div>

      </div>
    )
}

export default Booking;








