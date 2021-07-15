import React, {useState} from 'react';
import './SearchPage.css';
import { Header, Footer, } from '../../components/index';
import vector1 from '../../img/SearchPage/Vector1.png';
import vector2 from '../../img/SearchPage/Vector2.png';
import vector3 from '../../img/SearchPage/Vector3.png';
import vector4 from '../../img/SearchPage/Vector4.png';

import CardProduct from "./CardProduct/CardProduct";
import map from '../../img/SearchPage/map.png';


const SearchPage =()=>{

    return(
        <div>
            <Header />
                <div className="SearchPage">
                    <div className="SearchPage_container">

                        {/* КОНТЕЙНЕР ШАПКИ*/}
                        <div className="SearchPage_container_shapka">
                                <div>
                                    <p className="SearchPage_container_shapka_hover"> Главная </p>
                                    <img src={vector1} alt = '' />
                                </div>

                                <div>
                                    <p className="SearchPage_container_shapka_hover"> Каталог </p>
                                    <img src={vector1} alt = '' />
                                </div>

                                <div>
                                    <p className="SearchPage_container_shapka_hover"> Компьютерная техника </p>
                                    <img src={vector1} alt = '' />
                                </div>

                                <div>
                                    <p className="SearchPage_container_shapka_hover"> Ноутбуки</p>
                                </div>

                                <p className="container_shapka_result"> Результаты по запросу «ноутбук» 14 предложений </p>
                        </div>


                        {/* ОБЩИЙ КОНТЕЙНЕР С КОНТЕНТОМ ЛЕВАЯ И ПРАВАЯ СТОРОНА  */}
                        <div className="SearchPage_container_content">
                            <div className="SearchPage_container_content_left">
                                <ul>
                                    <li>
                                        <p className="content_left_cost"> Цена </p>
                                    </li>

                                    <li className="content_left_priceRange">
                                        <input type ="number"/>
                                        <label> до </label>
                                        <input type ="number"/>
                                    </li>

                                    <li>
                                        <input type ="checkbox" className="input_left_checkbox"/>
                                        <label> Скоро освободится </label>
                                    </li>

                                    <li>
                                        <input type ="checkbox" className="input_left_checkbox"/>
                                        <label> Бесплатно </label>
                                    </li>

                                    <li>
                                        <input type ="checkbox" className="input_left_checkbox"/>
                                        <label> Компании </label>
                                    </li>

                                    <li>
                                        <input type ="checkbox" className="input_left_checkbox"/>
                                        <label> Частные лица </label>
                                    </li>

                                    <li>
                                        <input type ="checkbox" className="input_left_checkbox"/>
                                        <label> Доставка </label>
                                    </li>

                                    <li>
                                        <input type ="checkbox" className="input_left_checkbox"/>
                                        <label> Страховка </label>
                                    </li>

                                    <li>
                                        <input type ="checkbox" className="input_left_checkbox"/>
                                        <label> По договору </label>
                                    </li>

                                    <li>
                                        <input type ="checkbox" className="input_left_checkbox"/>
                                        <label> Без залога </label>
                                    </li>

                                    <li>
                                        <input type ="checkbox" className="input_left_checkbox"/>
                                        <label> Акции </label>
                                    </li>

                                    <li className="content_left_optional_li">
                                        <p>Недвижимость<span><img src={vector2} alt =""/></span></p>
                                    </li>

                                    <li className="content_left_optional_li">
                                        <p>Авто и транспорт<span><img src={vector2} alt =""/></span></p>
                                    </li>

                                    <li className="content_left_optional_li">
                                        <p>Бытовая техника<span><img src={vector2} alt =""/></span></p>
                                    </li>

                                    <li className="content_left_optional_li">
                                        <p>Компьютерная техника<span><img src={vector2} alt =""/></span></p>
                                    </li>

                                    <li className="content_left_optional_li">
                                        <p>Телефоны и планшеты<span><img src={vector2} alt =""/></span></p>
                                    </li>

                                    <li className="content_left_optional_li">
                                        <p>Электроника<span><img src={vector2} alt =""/></span></p>
                                    </li>

                                    <li className="content_left_optional_li">
                                        <p>Женский гардероб<span><img src={vector2} alt =""/></span></p>
                                    </li>

                                    <li className="content_left_optional_li">
                                        <p>Мужской гардероб<span><img src={vector2} alt =""/></span></p>
                                    </li>

                                    <li className="content_left_optional_li">
                                        <p>Красота и здоровье<span><img src={vector2} alt =""/></span></p>
                                    </li>

                                    <li className="content_left_optional_li">
                                        <p>Для мам и детей<span><img src={vector2} alt =""/></span></p>
                                    </li>

                                    <li className="content_left_optional_li">
                                        <p>Мебель<span><img src={vector2} alt =""/></span></p>
                                    </li>

                                    <li className="content_left_optional_li">
                                        <p>Все для дома<span><img src={vector2} alt =""/></span></p>
                                    </li>

                                    <li className="content_left_optional_li">
                                        <p>Ремонт и стройка<span><img src={vector2} alt =""/></span></p>
                                    </li>

                                    <li className="content_left_optional_li">
                                        <p>Сад и огород<span><img src={vector2} alt =""/></span></p>
                                    </li>

                                    <li className="content_left_optional_li">
                                        <p>Хобби, спорт и туризм<span><img src={vector2} alt =""/></span></p>
                                    </li>

                                    <li className="content_left_optional_li">
                                        <p>Свадьба и праздники<span><img src={vector2} alt =""/></span></p>
                                    </li>

                                    <li className="content_left_optional_li">
                                        <p>Животные<span><img src={vector2} alt =""/></span></p>
                                    </li>

                                    <li className="content_left_optional_li">
                                        <p>Бизнес и оборудование<span><img src={vector2} alt =""/></span></p>
                                    </li>

                                    <li className="content_left_optional_li">
                                        <p>Книги<span><img src={vector2} alt =""/></span></p>
                                    </li>

                                    <li className="content_left_optional_li">
                                        <p>Услуги<span><img src={vector2} alt =""/></span></p>
                                    </li>

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
                                        <p className= "content_right_shapka_watchMap">Показать на карте</p>
                                    </div>
                                </div>


                                {/* КОНТЕНТ ПОД ШАПКОЙ */}
                                <div className="content_right_all_content">
                                    <div className="all_content_blocks" >
                                        <div className="content_blocks_card">
                                            <CardProduct />
                                        </div>
                                        <div className="content_blocks_card">
                                            <CardProduct />
                                        </div>
                                        <div className="content_blocks_card">
                                            <CardProduct />
                                        </div>
                                    </div>

                                    <div className="all_content_blocks" >
                                        <div className="content_blocks_card">
                                            <CardProduct />
                                        </div>
                                        <div className="content_blocks_card">
                                            <CardProduct />
                                        </div>
                                        <div className="content_blocks_card">
                                            <CardProduct />
                                        </div>
                                    </div>

                                    <div className="content_blocks_map_img">
                                        <img src={map} alt =""/>
                                    </div>

                                    <div className="all_content_blocks" >
                                        <div className="content_blocks_card">
                                            <CardProduct />
                                        </div>
                                        <div className="content_blocks_card">
                                            <CardProduct />
                                        </div>
                                        <div className="content_blocks_card">
                                            <CardProduct />
                                        </div>
                                    </div>

                                    <div className="all_content_blocks" >
                                        <div className="content_blocks_card">
                                            <CardProduct />
                                        </div>
                                        <div className="content_blocks_card">
                                            <CardProduct />
                                        </div>
                                        <div className="content_blocks_card">
                                            <CardProduct />
                                        </div>
                                    </div>

                                    <div className="content_blocks_number_page">
                                        <div>
                                            <img src={vector3} alt =""/>
                                            <p>1</p>
                                            <p>2</p>
                                            <p>3</p>
                                            <p>...</p>
                                            <p>14</p>
                                            <img src={vector4} alt =""/>
                                        </div>
                                    </div>

                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            <Footer />
        </div>
    )
}

export default SearchPage