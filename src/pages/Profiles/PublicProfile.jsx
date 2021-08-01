import React, { useState } from "react";
import "..//../css/PublicProfile.css";
import "./MyGlobalData/MyData/MyData.css";
import { Header, Footer } from "../../components/index";
import CardProduct from "../../pages/SearchPage/CardProduct/CardProduct.js";
import Address from "../../components/PublicProfile/Address.jsx";
import AboutMe from "../../components/PublicProfile/AboutMe.jsx";
import Vector6 from "../../img/CardThings/RightContent/Vector6.png";
import Vector7 from "../../img/CardThings/RightContent/Vector7.png";
import Star1 from "../../img/CardThings/RightContent/Star 4.png";
import Star2 from "../../img/CardThings/RightContent/Star 2.png";
import AvatarOwner from "../../img/CardThings/RightContent/Ellipse 5.png";
import Telegram from "../../img/CardThings/RightContent/Component 36.png";
import Viber from "../../img/CardThings/RightContent/Component 37.png";
import Whatsapp from "../../img/CardThings/RightContent/Component 38.png";
import Instagram from "../../img/CardThings/RightContent/Component 39.png";
import Vk from "../../img/CardThings/RightContent/Component 42.png";

const PublicProfile = () => {
  const [activeForm2, setActiveForm2] = useState("arends");

  return (
    <div>
      <Header />
      <div className="PublicProfile">
        <div className="PublicProfile_Wrapper">
          {/*  ОБЩИЙ КОНТЕЙНЕР */}
          <div className="PublicProfile_Wrapper_container">
            {/*  ВЕРХНЯЯ ЧАСТЬ  */}
            <div className="container_up">
              {/*  ДО АВАТАРКИ РАЗДЕЛ  */}
              <div className="container_up_header">
                <div className="header_up">
                  <p className="header_up-p1">ООО “Пуп” </p>
                  <p>Компания</p>
                </div>
                <p className="header_down">Новичок</p>
              </div>

              {/*  КОНТЕНТ С АВАТАРКОЙ  */}
              <div className="up_content">
                {/*Аватарка владельца */}
                <div className="up_global_margin">
                  <div className="block_down_owner_photo">
                    <img
                      src={AvatarOwner}
                      alt=""
                      style={{ width: "80px", height: "80px" }}
                    />
                  </div>
                </div>

                {/*Звездочки и отзывы*/}
                <div className="up_global_alight">
                  <div className="up_global_margin">
                    <div className="block_down_star">
                      <div className="conditions_row">
                        <img src={Star2} className="img_star" alt="" />
                        <img src={Star2} className="img_star" alt="" />
                        <img src={Star2} className="img_star" alt="" />
                        <img src={Star2} className="img_star" alt="" />
                        <img src={Star1} className="img_star" alt="" />
                      </div>
                      <p className="block_down_star-p">3 отзыва</p>
                    </div>
                  </div>

                  {/*телефон и почта*/}
                  <div className="up_global_margin">
                    <div className="block_down_telephone">
                      <div className="telephone_row1">
                        <p className="block_down_telephone-p1">
                          Телефон не подтвержден
                        </p>
                        <img src={Vector6} className="img_vector" alt="" />
                      </div>

                      <div className="telephone_row2">
                        <p className="block_down_telephone-p2">
                          Почта подтверждена
                        </p>
                        <img src={Vector7} className="img_vector" alt="" />
                      </div>
                    </div>
                  </div>

                  {/*На сайте*/}
                  <div className="up_global_margin">
                    <div className="block_down_online">
                      <div className="telephone_row1">
                        <p className="block_down_online-p1">На сайте</p>
                        <p className="block_down_online-p1_1">1 месяц</p>
                      </div>

                      <div className="telephone_row2">
                        <p className="block_down_online-p2">Время ответа</p>
                        <p className="block_down_online-p2_2">1 час</p>
                      </div>
                    </div>
                  </div>

                  {/*СОЦ СЕТИ*/}
                  <div className="block_down_social">
                    <div className="telephone_row2">
                      <img src={Telegram} className="img_social" alt="" />
                      <img src={Viber} className="img_social" alt="" />
                      <img src={Whatsapp} className="img_social" alt="" />
                      <img src={Instagram} className="img_social" alt="" />
                      <img src={Vk} className="img_social" alt="" />
                    </div>
                  </div>
                </div>
              </div>
              {/*  ПОСЛЕ  АВАТАРКИ РАЗДЕЛ  */}
              <div className="container_up_footer">
                <button className="footer_btn1">Отправить сообщение</button>
                <button className="footer_btn2">Оставить отзыв</button>
              </div>
              <p style={{ border: "1px solid rgba(76, 201, 240, 0.77)" }}></p>
            </div>

            {/*  НИЖНЯЯ ЧАСТЬ КОНТЕЙНЕРА  */}
            <div className="container_down">
              {/*  ШАПКА ПЕРЕД КОМПОНЕНТАМИ  */}
              <div className="container_down_header">
                <div className="down_header_text1">
                  <p
                    className= "down_header_text1-p1"
                    className= {activeForm2 === 'arends' ? "down_header_text1-p1_active" :"down_header_text1-p1" }
                    onClick={() => setActiveForm2("arends")}
                  >
                    Сдает
                  </p>
                  <p className="down_header_text1-p2">3</p>
                </div>
                <p
                  className= {activeForm2 === 'about_me' ? "down_header_p1_active" :"down_header_p1" }
                  onClick={() => setActiveForm2("about_me")}
                >
                  О себе
                </p>
                <p
                  className= {activeForm2 === 'address' ? "down_header_p2_active" :"down_header_p2" }
                  onClick={() => setActiveForm2("address")}
                >
                  Адреса
                </p>
              </div>

              {/*  КОНТЕЙНЕР С ПОДКЛЮЧАЕМЫМИ КОМПОНЕНТАМИ */}
              <div className="down_content">


                {/* ДЛЯ КОМПОНЕНТА КАРТОЧЕК */}
                <div className="down_content_cards">
                  <div className="cards_margin">
                    {activeForm2 === "arends" && <CardProduct />}
                  </div>
                  <div className="cards_margin">
                    {activeForm2 === "arends" && <CardProduct />}
                  </div>
                  <div className="cards_margin">
                    {activeForm2 === "arends" && <CardProduct />}
                  </div>
                </div>


                {/* ДЛЯ КОМПОНЕНТА ОПИСАНИЯ О СЕБЕ */}
                <div>
                  {activeForm2 === "about_me" && <AboutMe/> }
                </div>


                {/* ДЛЯ КОМПОНЕНТА АДРЕССА */}
                <div>
                  {activeForm2 === "address" && <Address />}
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

export default PublicProfile;
