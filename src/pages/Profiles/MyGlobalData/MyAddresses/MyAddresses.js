import React, {useState} from 'react';
import './MyAddresses.css';
import Vector1 from '../../../../img/ProfilePage/Vector2.png';
import Vector3 from '../../../../img/ProfilePage/Vector3.png';

const MyAddresses =()=>{



    return(
        <div className ="container_myAddresses_content">

            {/*ЛЕВАЯ СТОРОНА КОНТЕНТА - 1ый АДРЕСС*/}
            <div className ="myAddresses_content_addresses_left">
                <ul>
                    <li>
                        <div className ="addresses_left_address1">
                            <p  className ="addresses_left_address1_text"> Адрес 1</p>
                            <img src={Vector1} />

                        </div>
                    </li>

                    <li>
                        <p> Страна  <span className="Red_star"> * </span> </p>
                        <input type ='text' />
                    </li>

                    <li>
                        <p> Область  <span className="Red_star"> * </span> </p>
                        <input type ='text' />
                    </li>

                    <li>
                        <p> Населённый пункт  <span className="Red_star"> * </span>  </p>
                        <input type ='text' />
                    </li>

                    <li>
                        <p> Индекс  <span className="Red_star"> * </span> </p>
                        <input type ='number' />
                    </li>

                    <li>
                        <p> Район </p>
                        <input type ='text' />
                    </li>

                    <li>
                        <p> Улица/Проспект/Переулок  <span className="Red_star"> * </span> </p>
                        <input type ='text' />
                    </li>

                    <li className="addresses_left_address1_house">
                        <div>
                            <p>Дом <span className="Red_star"> * </span> </p>
                            <input type ='text' />
                        </div>

                        <div>
                            <p>Корпус</p>
                            <input type ='text' />
                        </div>

                        <div>
                            <p>Квартира</p>
                            <input type ='text' />
                        </div>
                    </li>

                    <li className="addresses_left_address1_house">
                        <div>
                            <p>Помещение</p>
                            <input type ='text' />
                        </div>

                        <div>
                            <p>Офис</p>
                            <input type ='text' />
                        </div>

                        <div>
                            <p>Строение</p>
                            <input type ='text' />
                        </div>
                    </li>

                    <li className="addresses_left_address1_house">
                        <img src={Vector3} alt= "" />
                        <p className="address1_house_add_addresses">Добавить еще адрес</p>
                    </li>

                    {/*КНОПКА СОХРАНЕНИЯ*/}
                    <li>
                        <div className=" button_save">
                            <button  className=" button_download"> СОХРАНИТЬ </button>
                        </div>
                    </li>
                </ul>



            </div>

        </div>
    )
}

export default MyAddresses