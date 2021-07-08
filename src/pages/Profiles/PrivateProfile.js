import React, { useState } from 'react';
import './PrivateProfile.css';
import Facebook from '../../img/Facebook.png';
import vk from '../../img/vk.png';
import { Header, Footer } from '../../components/index';

const privateProfile = () => {
  return (
    <div>
      <Header />
      <div className="privateProfile">
        <div className="privateProfile_container">
          <div className="conteiner_shapka">
            <div className="shapka_h1">
              <h1> Мой профиль</h1>
            </div>
            <div className="conteiner_shapka_up">
              <div className="shapka_up_image">
                <p style={{ fontSize: '28px', margin: '5px 0' }}> Вася</p>
                <img width="69" height="69" />
                <p style={{ fontSize: '12px', margin: '5px 0' }}> Изменить фото</p>
                <p style={{ fontSize: '20px', margin: '5px 0' }}> ЧАСТНОЕ ЛИЦО </p>
              </div>

              <div className="shapka_up_confirmation">
                <div>
                  <span style={{ fontSize: '14px', margin: '0 22px', color: '#6FCF97' }}>
                    Телефон подтверждён{' '}
                  </span>
                  <input type="checkbox" checked="checked" />
                </div>

                <div style={{ fontSize: '14px', margin: '22px 0 ' }}>
                  <span style={{ fontSize: '14px', margin: '0 28px', color: '#6FCF97' }}>
                    Почта подтверждена{' '}
                  </span>
                  <input type="checkbox" checked="checked" />
                </div>
              </div>

              <div>
                <p style={{ fontSize: '14px', margin: '0 22px ' }}> На сайте </p>
                <p style={{ fontSize: '16px', margin: '22px 0 ', color: '#828282' }}> 3 месяца </p>
              </div>

              <div>
                <p style={{ margin: '0 22px ' }}> * * * * * </p>
                <p style={{ fontSize: '16px', margin: '16px 0 ', color: '#828282' }}> 3 отзыва </p>
              </div>

              <div>
                <p style={{ fontSize: '14px', margin: '0 22px ' }}> Я сдаю </p>
                <p style={{ fontSize: '14px', margin: '22px 0 ' }}> Я беру </p>
              </div>

              <div>
                <p style={{ fontSize: '16px' }}> 3 </p>
                <p style={{ fontSize: '16px', margin: '22px 0 ' }}> 5 </p>
              </div>
            </div>

            <div className="conteiner_shapka_down">
              <span> Я сдаю</span>
              <span> Я беру</span>
              <span> Избранное</span>
              <span> Мои сообщения</span>
              <span> Кошелек</span>
              <span> Настройки</span>
            </div>
          </div>

          {/* НАСТРОЙКА  */}

          <div className="container_nastroika">
            <div className="nastroika_left">
              <span> Общее </span>
              <span> Мои адреса </span>
              <span> Уведомления </span>
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
                  <p>Номер телефона</p>
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
                  <textarea />
                  <p> Социальные сети</p>

                  <span>
                    <img src={Facebook} alt="" style={{ width: '30px', height: '30px' }} />
                    <img src={vk} alt="" style={{ width: '30px', height: '30px' }} />
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className=" button_download">
            <button type="button"> СОХРАНИТЬ </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default privateProfile;
