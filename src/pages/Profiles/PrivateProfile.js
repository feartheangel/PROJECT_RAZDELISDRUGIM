import React, {useState} from "react";
import './PrivateProfile.css';
import Facebook from '../../img/Facebook.png';
import vk from '../../img/vk.png';




const privateProfile = () =>{
    return(
        <div className="privateProfile">
            <div className="privateProfile_container">
                <div className="conteiner_shapka">

                    <div className="shapka_h1">
                    <h1> Мой профиль</h1>
                    </div>
                    <div className="conteiner_shapka_up">

                        <div className="shapka_up_image">
                            <p style={{fontSize:'28px'}}> Вася</p>
                            <img  width="69" height="69" />
                            <p> Изменить фото</p>
                            <p> ЧАСТНОЕ ЛИЦО </p>
                        </div>

                        <div className="shapka_up_confirmation">
                            <p>Телефон подтверждён ^</p>
                            <p>Почта подтверждёна ^</p>
                        </div>

                        <div >
                            <p> На сайте </p>
                            <p> 3 месяца </p>
                        </div>

                        <div >
                            <p>  * * * * * </p>
                            <p> 3 отзыва </p>
                        </div>

                        <div >
                            <p>  Я сдаю 3 </p>
                            <p>  Я беру 5 </p>
                        </div>

                    </div>

                    <div className="conteiner_shapka_down">
                        <button> Я сдаю</button>
                        <button> Я беру</button>
                        <button> Избранное</button>
                        <button> Мои сообщения</button>
                        <button> Кошелек</button>
                        <button> Настройки</button>

                    </div>
                </div>

                {/* НАСТРОЙКА  */}

                <div className="container_nastroika">

                    <div className="nastroika_left">
                        <button> Общее </button>
                        <button> Мои адреса </button>
                        <button> Уведомления </button>
                    </div>

                    <div className="nastroika_center">
                        <ul>
                            <li>
                                <p>Имя</p>
                                <p>
                                    <input type="text" />
                                </p>
                            </li>

                            <li>
                                <p>Фамилия</p>
                                <p>
                                    <input type="text" />
                                </p>
                            </li>

                            <li>
                                <p>Пол</p>
                                <p>
                                    <input type="text" />
                                </p>
                            </li>

                            <li>
                                <p>Дата рождения</p>
                                <p>
                                    <input type="text" />
                                </p>
                            </li>

                            <li>
                                <p>Город</p>
                                <p>
                                    <input type="text" />
                                </p>
                            </li>

                            <li>
                                <p>Email</p>
                                <p>
                                    <input type="text" />
                                </p>
                            </li>

                            <li>
                                <p>Номер телефона 1</p>
                                <p>
                                    <input type="text" />
                                </p>
                            </li>

                            <li>
                                <p>Номер телефона 2</p>
                                <p>
                                    <input type="text" />
                                </p>
                            </li>

                            <li>
                                <p>Пароль</p>
                                <p>
                                    <input type="text" />
                                </p>
                            </li>

                            <li>
                                <p>Подтвердите пароль</p>
                                <p>
                                    <input type="text" />
                                </p>
                            </li>
                        </ul>

                    </div>

                    <div className="nastroika_right">
                        <ul>
                            <li>
                                <p> О себе:</p>
                                <textarea/>
                                <p> Социальные сети</p>

                                <span>
                                <img src={Facebook} alt="" style={{width:'30px', height:'30px'}}/>
                                <img src={vk} alt="" style={{width:'30px', height:'30px'}}/>
                                </span>
                            </li>

                        </ul>
                    </div>

                </div>

                <div className=" button_download">
                    <button type="submit" >  СОХРАНИТЬ  </button>
                </div>

            </div>

        </div>
    )
}

export default privateProfile
