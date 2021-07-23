import React, { useState } from 'react';
import './MyData.css';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { reloadData } from '../../../../redux/actions/userData';
import Requests from '../../../../http/axios-requests';
import Ellipse5 from '../../../../img/ProfilePage/Ellipse 5.png';
import Star1 from '../../../../img/ProfilePage/Star 1.png';
import Star5 from '../../../../img/ProfilePage/Star 5.png';
import Vector from '../../../../img/ProfilePage/Vector.png';
import Telegram from '../../../../img/ProfilePage/telegram.png';
import Viber from '../../../../img/ProfilePage/viber.png';
import WhatsApp from '../../../../img/ProfilePage/watsapp.png';
import Google from '../../../../img/ProfilePage/google.png';
import Facebook from '../../../../img/ProfilePage/facebook2.png';
import Vk from '../../../../img/ProfilePage/vk.png';
import Instagram from '../../../../img/ProfilePage/instagram.png';
import Ok from '../../../../img/ProfilePage/ok.png';

const MyDataBusiness = ({ setModalActiveNumber, setModalActiveEmail }) => {
  const dispatch = useDispatch();
  const { userData } = useSelector(({ userData }) => userData);
  const { reload } = useSelector(({ userData }) => userData);

  const contactEmailRegExp =
    /^((([0-9A-Za-z]{1}[-0-9A-z\.]{0,30}[0-9A-Za-z]?)|([0-9А-Яа-я]{1}[-0-9А-я\.]{0,30}[0-9А-Яа-я]?))@([-A-Za-z]{1,}\.){1,}[-A-Za-z]{2,})$/;
  const contactNumberRegExp = /^(\+375|80)(29|25|44|33)(\d{3})(\d{2})(\d{2})$/;

  const numberVerifyHandler = () => {
    if (!userData.phone) {
      alert('Сначала сохраните номер телефона в профиле!');
      return;
    } else if (userData.phone !== number) {
      alert('Сначала сохраните новый номер телефона в профиле!');
      return;
    } else if (sendCountNumber > 0) {
      setModalActiveNumber(true);
      return;
    }
    setModalActiveNumber(true);
    Requests.sendVerifyNumberCode();
    setSendCountNumber(sendCountNumber + 1);
  };

  const emailVerifyHandler = () => {
    if (!userData.email) {
      alert('Сначала сохраните адрес почты в профиле!');
      return;
    } else if (userData.email !== email) {
      alert('Сначала сохраните новый адрес почты в профиле!');
      return;
    } else if (sendCountEmail > 0) {
      setModalActiveEmail(true);
      return;
    }
    setModalActiveEmail(true);
    Requests.sendVerifyEmailCode();
    setSendCountEmail(sendCountEmail + 1);
  };

  const profileSaveHandler = () => {
    if (!name) {
      alert('Не указано имя!');
      return;
    } else if (!surname) {
      alert('Не указана фамилия!');
      return;
    } else if (!email) {
      alert('Не указан email!');
      return;
    } else if (!companyName) {
      alert('Не указано название компании!');
      return;
    } else if (!address) {
      alert('Не указан юридический адрес компании!');
      return;
    } else if (!iban) {
      alert('Не указан расчетный счет IBAN!');
      return;
    } else if (!bic) {
      alert('Не указан БИК!');
      return;
    } else if (!bank) {
      alert('Не указан банк!');
      return;
    } else if (!unpUnn) {
      alert('Не указан УНП/УНН!');
      return;
    } else if (!number) {
      alert('Не указан номер телефона!');
      return;
    } else if (!contactEmailRegExp.test(email)) {
      alert('Указан некорректный адрес электронной почты!');
      return;
    } else if (!contactNumberRegExp.test(number)) {
      alert('Указан некорректный номер телефона!');
      return;
    }
    Requests.updateProfileMain(
      name,
      surname,
      companyName,
      unpUnn,
      address,
      iban,
      bank,
      bic,
      email,
      number,
      'NONE',
      null,
      about,
      address,
    )
      .then((response) => {
        alert('Обновлено');
        dispatch(reloadData(!reload));
      })
      .catch((e) => alert('Ошибка!'));
  };

  const passwordChangeHandler = () => {
    if (newPassword1 !== newPassword2) {
      alert('Пароли не совпадают');
      return;
    }

    Requests.updatePassword(oldPassword, newPassword1, newPassword2)
      .then((response) => {
        alert('Пароль успешно изменен, выполните вход в свой аккаунт с новым паролем.');
        localStorage.removeItem('key');
        setRedirect(<Redirect to="/" />);
      })
      .catch((e) => alert('Произошла ошибка изменения пароля!'));
  };

  //состояния контроля ввода данных в поля

  const [name, setName] = React.useState(userData.first_name);
  const [surname, setSurname] = React.useState(userData.last_name);
  const [companyName, setCompanyName] = React.useState(userData.company_name);
  const [unpUnn, setUnpUnn] = React.useState(userData.unp_inn_company);
  const [address, setAddress] = React.useState(userData.legal_address);
  const [iban, setIban] = React.useState(userData.bank_account);
  const [bank, setBank] = React.useState(userData.name_bank);
  const [bic, setBic] = React.useState(userData.bank_code);
  const [email, setEmail] = React.useState(userData.email);
  const [number, setNumber] = React.useState(userData.phone);
  const [about, setAbout] = React.useState(userData.about);

  const [showPasswordChangeTable, setShowPasswordChangeTable] = React.useState(false);
  const [oldPassword, setOldPassword] = React.useState();
  const [newPassword1, setNewPassword1] = React.useState();
  const [newPassword2, setNewPassword2] = React.useState();

  const [redirect, setRedirect] = React.useState();
  const [showOldPass, setShowOldPass] = React.useState(false);
  const [showNewPass1, setShowNewPass1] = React.useState(false);
  const [showNewPass2, setShowNewPass2] = React.useState(false);

  const [sendCountEmail, setSendCountEmail] = React.useState(0);
  const [sendCountNumber, setSendCountNumber] = React.useState(0);

  return (
    <div>
      {/* ШАПКА С ПРОФИЛЕМ*/}

      {/*верхняя часть*/}
      <div className="content_block1">
        <div className="content_block1_left">
          <p className="block1_left_name">
            {userData.company_name ? userData.company_name : 'Название организации не указано'}{' '}
          </p>
          <p className="block1_left_privateFace"> Компания </p>
          {redirect}
        </div>

        <div className="content_block1_right">
          <p className="block1_right_watchProfile"> Посмотреть мой профиль</p>
        </div>
      </div>

      {/*нижняя часть часть*/}
      {/*ФОТО*/}
      <div className="my-data-settings-header-wrapper">
        <div className="content_block2">
          <div className="content_block2_image">
            <img
              style={{ marginRight: '30px', borderRadius: '100%' }}
              src={`http://razdelisdrugim.by${userData.image_profile}`}
              alt=""
            />
          </div>

          {/*ОТЗЫВЫ ОЦЕНКИ*/}
          <div className="content_block2_reviews">
            <div className="block2_reviews_stars">
              <img src={Star5} alt="" />
              <img src={Star5} alt="" />
              <img src={Star5} alt="" />
              <img src={Star5} alt="" />
              <img src={Star1} alt="" />
            </div>
            <p className="block2_reviews_text"> 3 отзыва </p>
          </div>

          {/*ТЕЛЕФОН / ПОЧТА*/}

          <div className="content_block2_connection">
            <div className="content_block2_telephone">
              <p className="block2_telephone_text">Телефон подтверждён</p>
              <img className="my-data-submitted-img" src={Vector} />
            </div>

            <div className="content_block2_mail">
              <p className="block2_mail_text">Почта подтверждена</p>
              <img className="my-data-submitted-img" src={Vector} />
            </div>
          </div>

          {/*ТЕЛЕФОН / ПОЧТА*/}

          <div className="content_block2_online">
            <div className="content_block2_online_website">
              <p className="online_website_text"> На сайте </p>
              <p className="online_website_text2"> 1 месяц</p>
            </div>

            <div className="content_block2_online_time">
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
      </div>

      {/*КОНТЕНТ ПОД ПРОФИЛЕМ*/}
      <div className="mydata-settings-main-content">
        <form className="settings-profile-form">
          <div className="setting_left_input_wrapper">
            <label className="setting_left_input-label">
              Имя <span className="Red_star"> * </span>{' '}
            </label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="setting_left_input"
              type="text"
            />
          </div>

          <div className="setting_left_input_wrapper">
            <label className="setting_left_input-label">
              Фамилия <span className="Red_star"> * </span>{' '}
            </label>
            <input
              onChange={(e) => setSurname(e.target.value)}
              value={surname}
              className="setting_left_input"
              type="text"
            />
          </div>

          <div className="setting_left_input_wrapper">
            <label className="setting_left_input-label">
              Наименование компании/ИП <span className="Red_star"> * </span>{' '}
            </label>
            <input
              onChange={(e) => setCompanyName(e.target.value)}
              value={companyName}
              className="setting_left_input"
              type="text"
            />
          </div>

          <div className="setting_left_input_wrapper">
            <label className="setting_left_input-label">
              УНП/УНН <span className="Red_star"> * </span>{' '}
            </label>
            <input
              onChange={(e) => setUnpUnn(e.target.value)}
              value={unpUnn}
              className="setting_left_input"
              type="text"
            />
          </div>

          <div className="setting_left_input_wrapper">
            <label className="setting_left_input-label">
              Адрес местонахождения <span className="Red_star"> * </span>{' '}
            </label>
            <input
              onChange={(e) => setAddress(e.target.value)}
              value={address}
              className="setting_left_input"
              type="text"
            />
          </div>

          <div className="setting_left_input_wrapper">
            <label className="setting_left_input-label">
              Расчетный счет IBAN <span className="Red_star"> * </span>{' '}
            </label>
            <input
              onChange={(e) => setIban(e.target.value)}
              value={iban}
              className="setting_left_input"
              type="text"
            />
          </div>

          <div className="setting_left_input_wrapper__row">
            <div
              style={{ marginRight: '20px', margin: '0 20px 0 0' }}
              className="setting_left_input_wrapper">
              <label className="setting_left_input-label">
                Банк <span className="Red_star"> * </span>{' '}
              </label>
              <input
                onChange={(e) => setBank(e.target.value)}
                value={bank}
                className="setting_left_input__short"
                type="text"
              />
            </div>

            <div style={{ margin: '0 0 0 0' }} className="setting_left_input_wrapper">
              <label className="setting_left_input-label">
                БИК <span className="Red_star"> * </span>{' '}
              </label>
              <input
                onChange={(e) => setBic(e.target.value)}
                value={bic}
                className="setting_left_input__short"
                type="text"
              />
            </div>
          </div>

          <div className="setting_left_input_wrapper">
            <label className="setting_left_input-label">
              Email <span className="Red_star"> * </span>{' '}
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="setting_left_input"
              type="text"
            />
            {!userData.email_verify ? (
              <p onClick={emailVerifyHandler} className="my-data-lower-p">
                {' '}
                Подтвердить{' '}
              </p>
            ) : (
              <p
                style={{ color: 'green', fontSize: '16px', cursor: 'default' }}
                className="my-data-lower-p">
                {' '}
                Подтверждено{' '}
              </p>
            )}
          </div>

          <div className="setting_left_input_wrapper">
            <label className="setting_left_input-label">
              Номер телефона <span className="Red_star"> * </span>{' '}
            </label>
            <input
              onChange={(e) => setNumber(e.target.value)}
              value={number}
              className="setting_left_input"
              type="text"
            />
            {!userData.phone_verify ? (
              <p onClick={numberVerifyHandler} className="my-data-lower-p">
                {' '}
                Подтвердить{' '}
              </p>
            ) : (
              <p
                style={{ color: 'green', fontSize: '16px', cursor: 'default' }}
                className="my-data-lower-p">
                {' '}
                Подтверждено{' '}
              </p>
            )}
          </div>

          <div className="setting_left_input_wrapper">
            <label className="setting_left_input-label">Пароль</label>
            <p
              onClick={() => setShowPasswordChangeTable(!showPasswordChangeTable)}
              className="my-data-lower-p__password">
              {' '}
              Изменить пароль{' '}
            </p>
          </div>
          {showPasswordChangeTable && (
            <div className="setting_left_input_wrapper">
              <div className="setting_left_input_wrapper">
                <label className="setting_left_input-label">Старый пароль</label>
                <input
                  onChange={(e) => setOldPassword(e.target.value)}
                  value={oldPassword}
                  className="setting_left_input__password"
                  type={showOldPass ? 'text' : 'password'}
                />
                <a
                  onClick={() => setShowOldPass(!showOldPass)}
                  class="password-control__profile"></a>
              </div>
              <div className="setting_left_input_wrapper">
                <label className="setting_left_input-label">Новый пароль</label>
                <input
                  onChange={(e) => setNewPassword1(e.target.value)}
                  value={newPassword1}
                  className="setting_left_input__password"
                  type={showNewPass1 ? 'text' : 'password'}
                />
                <a
                  onClick={() => setShowNewPass1(!showNewPass1)}
                  class="password-control__profile"></a>
              </div>
              <div className="setting_left_input_wrapper">
                <label className="setting_left_input-label">Повторите новый пароль</label>
                <input
                  onChange={(e) => setNewPassword2(e.target.value)}
                  value={newPassword2}
                  className="setting_left_input__password"
                  type={showNewPass2 ? 'text' : 'password'}
                />
                <a
                  onClick={() => setShowNewPass2(!showNewPass2)}
                  class="password-control__profile"></a>
              </div>
              <div className=" button_save">
                <input
                  value="ИЗМЕНИТЬ"
                  type="button"
                  onClick={passwordChangeHandler}
                  className=" button_download"
                />
              </div>
            </div>
          )}

          <div className="setting_left_input_wrapper">
            <label className="setting_left_input-label"> О нас:</label>
            <textarea
              onChange={(e) => setAbout(e.target.value)}
              value={about}
              className="setting_left_input__textarea"
            />
          </div>

          {/*КНОПКА СОХРАНЕНИЯ*/}

          <div className=" button_save">
            <input
              value="СОХРАНИТЬ"
              type="button"
              onClick={profileSaveHandler}
              className=" button_download"
            />
          </div>
        </form>
        <div className="content_setting_right">
          <p className="setting_right_socialNetworks"> Социальные сети и месседжеры</p>
          <span>
            <img className="setting_right_socialNetworks_img" src={Telegram} alt="" />
            <img className="setting_right_socialNetworks_img" src={Viber} alt="" />
            <img className="setting_right_socialNetworks_img" src={WhatsApp} alt="" />
            <img className="setting_right_socialNetworks_img" src={Google} alt="" />
            <img className="setting_right_socialNetworks_img" src={Facebook} alt="" />
            <img className="setting_right_socialNetworks_img" src={Vk} alt="" />
            <img className="setting_right_socialNetworks_img" src={Instagram} alt="" />
            <img className="setting_right_socialNetworks_img" src={Ok} alt="" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default MyDataBusiness;
