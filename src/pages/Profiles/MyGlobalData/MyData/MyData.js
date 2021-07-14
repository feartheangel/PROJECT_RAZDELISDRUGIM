import React, {useState} from 'react';
import './MyData.css';
import Ellipse5 from '../../../../img/ProfilePage/Ellipse 5.png';
import Star1 from '../../../../img/ProfilePage/Star 1.png';
import Star5 from '../../../../img/ProfilePage/Star 5.png';
import Vector from '../../../../img/ProfilePage/Vector.png';
import Telegram from '../../../../img/ProfilePage/telegram.png';
import Viber from '../../../../img/ProfilePage/viber.png';
import WhatsApp from '../../../../img/ProfilePage/watsapp.png';
import Google from '../../../../img/ProfilePage/google.png';
import Facebook from "../../../../img/ProfilePage/facebook2.png";
import Vk from "../../../../img/ProfilePage/vk.png";
import Instagram from "../../../../img/ProfilePage/instagram.png";
import Ok from "../../../../img/ProfilePage/ok.png";

const MyData =()=> {




    return(
        <div>
            {/* ШАПКА С ПРОФИЛЕМ*/}

            {/*верхняя часть*/}
            <div className="content_block1">
                <div className="content_block1_left">
                    <p className="block1_left_name"> Марина </p>
                    <p className="block1_left_privateFace"> Частное лицо </p>
                </div>

                <div className="content_block1_right">
                    <p className="block1_right_watchProfile"> Посмотреть мой профиль</p>
                </div>
            </div>

            {/*нижняя часть часть*/}
            {/*ФОТО*/}
            <div  className="content_block2" >

                <div className="content_block2_image">
                    <img src={Ellipse5} alt="" />
                </div>

                {/*ОТЗЫВЫ ОЦЕНКИ*/}
                <div className="content_block2_reviews">
                    <div className="block2_reviews_stars">
                        <img src={Star5} alt ="" />
                        <img src={Star5} alt ="" />
                        <img src={Star5} alt ="" />
                        <img src={Star5} alt ="" />
                        <img src={Star1} alt ="" />
                    </div>
                    <p  className="block2_reviews_text"> 3 отзыва </p>
                </div>

                {/*ТЕЛЕФОН / ПОЧТА*/}

                <div className="content_block2_connection">
                    <div className="content_block2_telephone">
                        <p className="block2_telephone_text">
                            Телефон подтверждён
                        </p>
                        <img src={Vector}/>
                    </div>

                    <div className="content_block2_mail">
                        <p  className="block2_mail_text">
                            Почта подтверждена
                        </p>
                        <img src={Vector}/>
                    </div>
                </div>

                {/*ТЕЛЕФОН / ПОЧТА*/}

                <div className="content_block2_online">
                    <div className="content_block2_online_website">
                        <p className="online_website_text"> На сайте </p>
                        <p className="online_website_text2"> 1 месяц</p>
                    </div>

                    <div  className="content_block2_online_time">
                        <p className="online_time_text"> Время ответа </p>
                        <p className="online_time_text2"> 1 час</p>
                    </div>
                </div>

                {/*Я СДАЮ / БЕРУ*/}

                <div className="content_block2_rent_take">

                    <div className="rent_take_content1">
                        <p className="rent_take_content1_rent"> Я сдаю </p>
                        <p className="rent_take_content1_number"> 2 </p>
                    </div>

                    <div className="rent_take_content2">
                        <p className="rent_take_content2_take"> Я беру </p>
                        <p className="rent_take_content2_number"> 3 </p>
                    </div>
                </div>

            </div>


            {/*КОНТЕНТ ПОД ПРОФИЛЕМ*/}
            <form>

                <div className="content_setting">

                    <div className="content_setting_left">
                        <ul>
                            <li>

                                <p className="setting_left_name">Имя <span className="Red_star"> * </span> </p>
                                <input  className="setting_left_name_input" type="text" />
                            </li>

                            <li>
                                <p className="setting_left_SurName">Фамилия <span className="Red_star"> * </span> </p>
                                <p>
                                    <input type="text" />
                                </p>
                            </li>

                            <li>
                                <p className="setting_left_your_gender">Пол <span className="Red_star"> * </span> </p>
                                <p>
                                    <select className="setting_left_gender">
                                        <option />
                                        <option> Мужской</option>
                                        <option> Женский </option>
                                    </select>

                                </p>
                            </li>

                            <li>
                                <p className="setting_left_dateBirth">Дата рождения <span className="Red_star"> * </span> </p>
                                <p className="setting_left_dateBirth_optional">
                                    <input className="optional_number" type="number" />
                                    <select  className="optional_select">
                                        <option />
                                        <option>01</option>
                                        <option>02</option>
                                        <option>03</option>
                                        <option>04</option>
                                        <option>05</option>
                                        <option>06</option>
                                        <option>07</option>
                                        <option>08</option>
                                        <option>09</option>
                                        <option>10</option>
                                        <option>11</option>
                                        <option>12</option>
                                    </select>
                                    <select className="optional_number_year">
                                        <option />
                                        <option>1990</option>
                                        <option>1995</option>
                                        <option>2000</option>
                                    </select>
                                </p>
                            </li>

                            <li>
                                <p className="setting_left_yourEmail">E-mail <span className="Red_star"> * </span> </p>
                                <p>
                                    <input type="text" />
                                </p>
                                <p> Подтвердить </p>
                            </li>


                            <li>
                                <p className="setting_left_yourNumber">Номер телефона <span className="Red_star"> * </span> </p>
                                <p>
                                    <input type="text" />
                                </p>
                                <p> Подтвердить </p>
                            </li>

                            <li>
                                <p className="setting_left_yourPassword">Пароль <span className="Red_star"> * </span> </p>
                                <p>
                                    <input type="text" />
                                </p>
                                <p> Изменить пароль </p>
                            </li>


                            <li>
                                <p className="setting_left_say_AboutMe"> О себе:</p>
                                <textarea className="content_setting_left_AboutMe" />
                            </li>

                            {/*КНОПКА СОХРАНЕНИЯ*/}
                            <li>
                                <div className=" button_save">
                                    <button  className=" button_download"> СОХРАНИТЬ </button>
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/*ПРАВАЯ СТОРОНА КОНТЕНТА*/}

                    <div className="content_setting_right">
                        <p className="setting_right_socialNetworks"> Социальные сети и месседжеры</p>
                        <span>
                            <img src={Telegram} alt=""  />
                            <img src={Viber} alt=""  />
                            <img src={WhatsApp} alt=""  />
                            <img src={Google} alt=""  />
                            <img src={Facebook} alt=""  />
                            <img src={Vk} alt=""  />
                            <img src={Instagram} alt=""  />
                            <img src={Ok} alt=""  />
                        </span>
                    </div>

                </div>

            </form>

        </div>
    )
}

export default MyData