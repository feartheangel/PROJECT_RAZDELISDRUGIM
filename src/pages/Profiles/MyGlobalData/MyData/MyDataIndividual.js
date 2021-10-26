import React from "react";
import Requests from "../../../../http/axios-requests";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { reloadData } from "../../../../redux/actions/userData";
import { SocialContactEnter } from "../../../../components/index";
import "./MyData.css";
import Star5 from "../../../../img/ProfilePage/Star 5.png";
import Vector from "../../../../img/ProfilePage/Vector.png";
import VectorDisabled from "../../../../img/ProfilePage/VectorDisabled.png";
import Telegram from "../../../../img/ProfilePage/telegram.png";
import Viber from "../../../../img/ProfilePage/viber.png";
import WhatsApp from "../../../../img/ProfilePage/watsapp.png";
import Google from "../../../../img/ProfilePage/google.png";
import Facebook from "../../../../img/ProfilePage/facebook2.png";
import Vk from "../../../../img/ProfilePage/vk.png";
import Instagram from "../../../../img/ProfilePage/instagram.png";
import Ok from "../../../../img/ProfilePage/ok.png";
import TelegramNone from "../../../../img/ProfilePage/telegramNone.png";
import ViberNone from "../../../../img/ProfilePage/viberNone.png";
import WhatsAppNone from "../../../../img/ProfilePage/watsappNone.png";
import GoogleNone from "../../../../img/ProfilePage/googleNone.png";
import FacebookNone from "../../../../img/ProfilePage/facebook2None.png";
import VkNone from "../../../../img/ProfilePage/vkNone.png";
import InstagramNone from "../../../../img/ProfilePage/instagramNone.png";
import OkNone from "../../../../img/ProfilePage/okNone.png";
import Vector2 from "../../../../img/CardThings/LeftContent/Vector2.png";
import { rootAddress } from "../../../../http/axios-requests";

const MyDataIndividual = ({ setModalActiveNumber, setModalActiveEmail }) => {
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

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const dispatch = useDispatch();
  const { userData, subjects } = useSelector(({ userData }) => userData);
  const { reload } = useSelector(({ userData }) => userData);

  const contactEmailRegExp =
    /^((([0-9A-Za-z]{1}[-0-9A-z.]{0,30}[0-9A-Za-z]?)|([0-9А-Яа-я]{1}[-0-9А-я.]{0,30}[0-9А-Яа-я]?))@([-A-Za-z]{1,}\.){1,}[-A-Za-z]{2,})$/;
  const contactNumberRegExp = /^(\+375|80)(29|25|44|33)(\d{3})(\d{2})(\d{2})$/;

  //обновление фото профиля
  const photoHandler = (e) => {
    const formData = new FormData();
    delete formData.image_profile;
    formData.append("image_profile", e.target.files[0]);
    formData.append("email", userData.email);
    formData.append("phone", userData.phone);
    Requests.updateProfileImageReq(formData).then(() => {
      alert("Картинка успешно обновлена!");
      dispatch(reloadData(!reload));
    });
  };

  //открытие окошек редактирования соц сетей
  const socialClickHandler = (social) => {
    if (!socialPopUpActive) {
      setActiveSocial(social);
      setSocialPopUpActive(true);
    } else {
      setActiveSocial(false);
      setSocialPopUpActive(false);
    }
  };

  //подьтверждение телефона
  const numberVerifyHandler = () => {
    if (!userData.phone) {
      alert("Сначала сохраните номер телефона в профиле!");
      return;
    } else if (userData.phone !== number) {
      alert("Сначала сохраните новый номер телефона в профиле!");
      return;
    } else if (sendCountNumber > 0) {
      setModalActiveNumber(true);
      return;
    }
    setModalActiveNumber(true);
    Requests.sendVerifyNumberCode();
    setSendCountNumber(sendCountNumber + 1);
  };

  //подтверждение мэйла
  const emailVerifyHandler = () => {
    if (!userData.email) {
      alert("Сначала сохраните адрес почты в профиле!");
      return;
    } else if (userData.email !== email) {
      alert("Сначала сохраните новый адрес почты в профиле!");
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
      alert("Не указано имя!");
      return;
    } else if (!surname) {
      alert("Не указана фамилия!");
      return;
    } else if (!gender) {
      alert("Не указан пол!");
      return;
    } else if (!birth) {
      alert("Не указана дата рождения!");
      return;
    } else if (!email) {
      alert("Не указан email!");
      return;
    } else if (!number) {
      alert("Не указан номер телефона!");
      return;
    } else if (!contactEmailRegExp.test(email)) {
      alert("Указан некорректный адрес электронной почты!");
      return;
    } else if (!contactNumberRegExp.test(number)) {
      alert("Указан некорректный номер телефона!");
      return;
    }
    Requests.updateProfileMain(
      capitalizeFirstLetter(name),
      capitalizeFirstLetter(surname),
      null,
      null,
      null,
      null,
      null,
      null,
      email,
      number,
      gender,
      birth,
      about
    )
      .then((response) => {
        if (
          contactEmailRegExp.test(userData.username) &&
          userData.username !== email
        ) {
          Requests.changeLogin(userData.username, email)
            .then(() => alert("Успешно обновлено!"))
            .catch((err) => alert(err.response));
          dispatch(reloadData(!reload));
        } else if (
          contactNumberRegExp.test(userData.username) &&
          userData.username !== number
        ) {
          Requests.changeLogin(userData.username, number)
            .then(() => alert("Успешно обновлено!"))
            .catch((err) => alert(err.response));
          dispatch(reloadData(!reload));
        } else {
          alert("Успешно обновлено!");
          dispatch(reloadData(!reload));
        }
      })
      .catch((err) => alert(err.response.data));
  };

  const passwordChangeHandler = () => {
    if (newPassword1 !== newPassword2) {
      alert("Пароли не совпадают");
      return;
    }

    Requests.updatePassword(oldPassword, newPassword1, newPassword2)
      .then((response) => {
        alert(
          "Пароль успешно изменен, выполните вход в свой аккаунт с новым паролем."
        );
        localStorage.removeItem("key");
        setRedirect(<Redirect to="/" />);
      })
      .catch((e) => alert("Произошла ошибка изменения пароля!"));
  };

  //состояния контроля ввода данных в поля

  const [name, setName] = React.useState(userData.first_name);
  const [surname, setSurname] = React.useState(userData.last_name);
  const [gender, setGender] = React.useState(userData.sex);
  const [birth, setBirth] = React.useState(userData.date_birthday);
  const [email, setEmail] = React.useState(userData.email);
  const [number, setNumber] = React.useState(userData.phone);
  const [about, setAbout] = React.useState(userData.about);

  const [showPasswordChangeTable, setShowPasswordChangeTable] =
    React.useState(false);
  const [oldPassword, setOldPassword] = React.useState();
  const [newPassword1, setNewPassword1] = React.useState();
  const [newPassword2, setNewPassword2] = React.useState();

  const [redirect, setRedirect] = React.useState();
  const [showOldPass, setShowOldPass] = React.useState(false);
  const [showNewPass1, setShowNewPass1] = React.useState(false);
  const [showNewPass2, setShowNewPass2] = React.useState(false);

  const [activeSocial, setActiveSocial] = React.useState();
  const [socialPopUpActive, setSocialPopUpActive] = React.useState(false);

  const [sendCountEmail, setSendCountEmail] = React.useState(0);
  const [sendCountNumber, setSendCountNumber] = React.useState(0);

  return (
    <div>
      {/* ШАПКА С ПРОФИЛЕМ*/}

      {/*верхняя часть*/}
      <div id="profile_pk">
        <div className="content_block1">
          <div className="content_block1_left">
            <p className="block1_left_name">
              {userData.first_name ? userData.first_name : "Имя не указано"}
            </p>
            <p className="block1_left_privateFace"> Частное лицо </p>
          </div>
          {redirect}

          <div className="content_block1_right">
            <a
              style={{ textDecoration: "none" }}
              target="_blank"
              href={`/public-profile?id=${userData && userData.id}`}
              rel="noreferrer"
            >
              <p className="block1_right_watchProfile">
                {" "}
                Посмотреть мой профиль
              </p>
            </a>
          </div>
        </div>

        {/*нижняя часть часть*/}
        {/*ФОТО*/}
        <div className="my-data-settings-header-wrapper">
          <div className="content_block2">
            <div className="content_block2_image">
              <input
                style={{ display: "none" }}
                type="file"
                accept="image/*,image/jpeg"
                id="photo_input"
                onChange={(e) => photoHandler(e)}
              />
              <label className="profile-photo-wrapper" for="photo_input">
                <img
                  alt="razdelisdrugim"
                  style={{
                    marginRight: "30px",
                    borderRadius: "100%",
                    boxShadow: "3px 3px 22px rgba(99, 212, 248, 0.24)",
                    cursor: "pointer",
                  }}
                  className="profile-photo"
                  src={`${rootAddress}${userData.image_profile}`}
                />
                <div className="profile-photo-overlay">Изменить</div>
              </label>
            </div>

            {/*ОТЗЫВЫ ОЦЕНКИ*/}
            <div className="content_block2_reviews">
              <div style={{ display: "none" }} className="block2_reviews_stars">
                <img alt="razdelisdrugim" src={Star5} />
                <img alt="razdelisdrugim" src={Star5} />
                <img alt="razdelisdrugim" src={Star5} />
                <img alt="razdelisdrugim" src={Star5} />
                <img alt="razdelisdrugim" src={Star5} />
              </div>
              <div className="block2_reviews_stars">
                <p className="block2_reviews_text">Пока нет оценок</p>
              </div>
              <p className="block2_reviews_text"> 0 отзывов </p>
            </div>

            {/*ТЕЛЕФОН / ПОЧТА*/}

            <div className="content_block2_connection">
              <div className="content_block2_telephone">
                <p className="block2_telephone_text">
                  {userData.phone_verify
                    ? "Телефон подтвержден"
                    : "Телефон не подтвержден"}
                </p>
                <img
                  alt="razdelisdrugim"
                  className="my-data-submitted-img"
                  src={userData.phone_verify ? Vector : VectorDisabled}
                />
              </div>

              <div className="content_block2_mail">
                <p className="block2_mail_text">
                  {userData.email_verify
                    ? "Почта подтверждена"
                    : "Почта не подтверждена"}
                </p>
                <img
                  alt="razdelisdrugim"
                  className="my-data-submitted-img"
                  src={userData.email_verify ? Vector : VectorDisabled}
                />
              </div>
            </div>

            {/*ТЕЛЕФОН / ПОЧТА*/}
            <div className="content_block2_online">
              <div className="content_block2_online_website">
                <p className="online_website_text"> На сайте </p>
                <p className="online_website_text2">
                  {" "}
                  {getDaysBetweenDates(userData.register_date, new Date())}
                </p>
              </div>

              <div className="content_block2_online_time">
                <p className="online_time_text"> Время ответа </p>
                <p className="online_time_text2"> - </p>
              </div>
            </div>

            {/*Я СДАЮ / БЕРУ*/}

            <div className="content_block2_rent_take">
              <div className="rent_take_content1">
                <p className="rent_take_content1_rent"> Я сдаю </p>
                <p className="rent_take_content1_number"> {subjects.length} </p>
              </div>

              <div className="rent_take_content2">
                <p className="rent_take_content2_take"> Я беру </p>
                <p className="rent_take_content2_number"> - </p>
              </div>
            </div>
          </div>
        </div>

        {/*КОНТЕНТ ПОД ПРОФИЛЕМ*/}
        <div className="mydata-settings-main-content">
          <form className="settings-profile-form">
            <div className="setting_left_input_wrapper">
              <label className="setting_left_input-label">
                Имя <span className="Red_star"> * </span>{" "}
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
                Фамилия <span className="Red_star"> * </span>{" "}
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
                Пол <span className="Red_star"> * </span>{" "}
              </label>
              <select
                onChange={(e) => setGender(e.target.value)}
                value={gender}
                className="setting_left_input"
              >
                <option />
                <option value="MAN"> Мужской</option>
                <option value="WOMAN"> Женский </option>
              </select>
            </div>

            <div className="setting_left_input_wrapper">
              <label className="setting_left_input-label">
                Дата рождения <span className="Red_star"> * </span>{" "}
              </label>
              <input
                onChange={(e) => setBirth(e.target.value)}
                value={birth}
                className="setting_left_input"
                type="date"
              />
            </div>

            <div className="setting_left_input_wrapper">
              <label className="setting_left_input-label">
                E-mail <span className="Red_star"> * </span>{" "}
              </label>
              <input
                disabled={
                  contactEmailRegExp.test(userData && userData.username) &&
                  userData &&
                  userData.phone_verify
                }
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="setting_left_input"
                type="text"
              />
              {!userData.email_verify ? (
                <p onClick={emailVerifyHandler} className="my-data-lower-p">
                  {" "}
                  Подтвердить{" "}
                </p>
              ) : (
                <div className="profile_login_change_wrapper">
                  <p
                    style={{
                      color: "green",
                      fontSize: "16px",
                      cursor: "default",
                    }}
                    className="my-data-lower-p"
                  >
                    {" "}
                    Подтверждено{" "}
                  </p>
                  {contactEmailRegExp.test(userData && userData.username) && (
                    <p
                      style={{
                        color: "#eecc36",
                        fontSize: "16px",
                        cursor: "default",
                      }}
                      className="my-data-lower-p"
                    >
                      {" "}
                      Логин нельзя изменить{" "}
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className="setting_left_input_wrapper">
              <label className="setting_left_input-label">
                Номер телефона <span className="Red_star"> * </span>{" "}
              </label>
              <input
                disabled={
                  contactNumberRegExp.test(userData && userData.username) &&
                  userData &&
                  userData.phone_verify
                }
                onChange={(e) => setNumber(e.target.value)}
                value={number}
                className="setting_left_input"
                type="text"
              />
              {!userData.phone_verify ? (
                <p onClick={numberVerifyHandler} className="my-data-lower-p">
                  {" "}
                  Подтвердить{" "}
                </p>
              ) : (
                <div className="profile_login_change_wrapper">
                  <p
                    style={{
                      color: "green",
                      fontSize: "16px",
                      cursor: "default",
                    }}
                    className="my-data-lower-p"
                  >
                    Подтверждено
                  </p>
                  {contactNumberRegExp.test(userData && userData.username) && (
                    <p
                      style={{
                        color: "#eecc36",
                        fontSize: "16px",
                        cursor: "default",
                      }}
                      className="my-data-lower-p_login"
                    >
                      {" "}
                      Логин нельзя изменить{" "}
                    </p>
                  )}
                </div>
              )}
            </div>

            {(contactEmailRegExp.test(userData && userData.username) ||
              contactNumberRegExp.test(userData && userData.username)) && (
              <div>
                <div className="setting_left_input_wrapper">
                  <label className="setting_left_input-label">Пароль</label>
                  <p
                    onClick={() =>
                      setShowPasswordChangeTable(!showPasswordChangeTable)
                    }
                    className="my-data-lower-p__password"
                  >
                    {" "}
                    Изменить пароль{" "}
                  </p>
                </div>
                {showPasswordChangeTable && (
                  <div className="setting_left_input_wrapper">
                    <div className="setting_left_input_wrapper">
                      <label className="setting_left_input-label">
                        Старый пароль
                      </label>
                      <input
                        onChange={(e) => setOldPassword(e.target.value)}
                        value={oldPassword}
                        className="setting_left_input__password"
                        type={showOldPass ? "text" : "password"}
                      />
                      <span
                        onClick={() => setShowOldPass(!showOldPass)}
                        class="password-control__profile"
                      ></span>
                    </div>
                    <div className="setting_left_input_wrapper">
                      <label className="setting_left_input-label">
                        Новый пароль
                      </label>
                      <input
                        onChange={(e) => setNewPassword1(e.target.value)}
                        value={newPassword1}
                        className="setting_left_input__password"
                        type={showNewPass1 ? "text" : "password"}
                      />
                      <span
                        onClick={() => setShowNewPass1(!showNewPass1)}
                        class="password-control__profile"
                      ></span>
                    </div>
                    <div className="setting_left_input_wrapper">
                      <label className="setting_left_input-label">
                        Повторите новый пароль
                      </label>
                      <input
                        onChange={(e) => setNewPassword2(e.target.value)}
                        value={newPassword2}
                        className="setting_left_input__password"
                        type={showNewPass2 ? "text" : "password"}
                      />
                      <span
                        onClick={() => setShowNewPass2(!showNewPass2)}
                        class="password-control__profile"
                      ></span>
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
              </div>
            )}

            <div className="setting_left_input_wrapper">
              <label className="setting_left_input-label">
                {" "}
                О себе:{" "}
                <img
                  alt="razdelisdrugim"
                  title="Укажите тут как можно больше информации о себе, чтобы другой пользователь смог составить свое мнение о вас"
                  src={Vector2}
                  className="img_vector2"
                />
              </label>
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
            <p
              style={{ alignSelf: "flex-start" }}
              className="setting_right_socialNetworks"
            >
              {" "}
              Социальные сети и месседжеры{" "}
              <img
                alt="razdelisdrugim"
                title="Введите тут свои позывные в мессенджерах и ссылки на страницы в соц. сетях – мы позволим арендатору увидеть их, чтобы связаться с вами наиболее удобным для него образом. Сначала нужно заполинть и сохранить профиль"
                src={Vector2}
                className="img_vector2"
              />
            </p>
            <span className="social_icons_profile_wrapper">
              <img
                alt="razdelisdrugim"
                onClick={() => socialClickHandler("tg")}
                className={
                  activeSocial === "tg"
                    ? "setting_right_socialNetworks_img active"
                    : "setting_right_socialNetworks_img"
                }
                src={userData.telegram_account ? Telegram : TelegramNone}
              />
              <img
                alt="razdelisdrugim"
                onClick={() => socialClickHandler("viber")}
                className={
                  activeSocial === "viber"
                    ? "setting_right_socialNetworks_img active"
                    : "setting_right_socialNetworks_img"
                }
                src={userData.viber_account ? Viber : ViberNone}
              />
              <img
                alt="razdelisdrugim"
                onClick={() => socialClickHandler("wa")}
                className={
                  activeSocial === "wa"
                    ? "setting_right_socialNetworks_img active"
                    : "setting_right_socialNetworks_img"
                }
                src={userData.whatsapp_account ? WhatsApp : WhatsAppNone}
              />
              <img
                alt="razdelisdrugim"
                onClick={() => socialClickHandler("google")}
                className={
                  activeSocial === "google"
                    ? "setting_right_socialNetworks_img active"
                    : "setting_right_socialNetworks_img"
                }
                src={userData.google_account ? Google : GoogleNone}
              />
              <img
                alt="razdelisdrugim"
                onClick={() => socialClickHandler("fb")}
                className={
                  activeSocial === "fb"
                    ? "setting_right_socialNetworks_img active"
                    : "setting_right_socialNetworks_img"
                }
                src={userData.link_facebook ? Facebook : FacebookNone}
              />
              <img
                alt="razdelisdrugim"
                onClick={() => socialClickHandler("vk")}
                className={
                  activeSocial === "vk"
                    ? "setting_right_socialNetworks_img active"
                    : "setting_right_socialNetworks_img"
                }
                src={userData.vk_account ? Vk : VkNone}
              />
              <img
                alt="razdelisdrugim"
                onClick={() => socialClickHandler("inst")}
                className={
                  activeSocial === "inst"
                    ? "setting_right_socialNetworks_img active"
                    : "setting_right_socialNetworks_img"
                }
                src={userData.link_instagram ? Instagram : InstagramNone}
              />
              <img
                alt="razdelisdrugim"
                onClick={() => socialClickHandler("ok")}
                className={
                  activeSocial === "ok"
                    ? "setting_right_socialNetworks_img active"
                    : "setting_right_socialNetworks_img"
                }
                src={userData.ok_account ? Ok : OkNone}
              />
            </span>

            {socialPopUpActive && (
              <SocialContactEnter
                activeSocial={activeSocial}
                setSocialPopUpActive={setSocialPopUpActive}
                setActiveSocial={setActiveSocial}
              />
            )}
            <div className="referral_code_wrapper_profile">
              <p>Ваш реферальный код:</p>
              <input
                disabled
                className="referral_code_input_profile"
                type="text"
                value={userData && userData.referral_code}
              />
            </div>
            <div className="referral_code_wrapper_profile">
              <p>Ваша реферальная ссылка:</p>
              <input
                disabled
                className="referral_code_input_profile"
                type="text"
                value={`${rootAddress}/?referral=${
                  userData && userData.referral_code
                }`}
              />
              <div className="toShare_button_wrapper">
                <label
                  onClick={() => {
                    window.navigator.clipboard.writeText(
                      `${`${rootAddress}/?referral=${
                        userData && userData.referral_code
                      }`}`
                    );
                  }}
                  style={{ cursor: "pointer" }}
                  className="item-card-profile-button__optional"
                >
                  Копировать
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* МОБИЛЬНЫЙ АДАПТИВ */}
      {/*верхняя часть*/}
      <div id="profile_mobile">
        <div className="content_block1">
          {/* ФОТО */}
          <div className="content_block2_image">
            <input
              style={{ display: "none" }}
              type="file"
              accept="image/*,image/jpeg"
              id="photo_input"
              onChange={(e) => photoHandler(e)}
            />
            <label className="profile-photo-wrapper" for="photo_input">
              <img
                alt="razdelisdrugim"
                className="profile-photo"
                src={`${rootAddress}${userData.image_profile}`}
              />
              <div className="profile-photo-overlay">Изменить</div>
            </label>
          </div>
          <div className="content_block1_left">
            <p className="block1_left_name">
              {userData.first_name ? userData.first_name : "Имя не указано"}
            </p>
            <p className="block1_left_privateFace"> Частное лицо </p>
            {/*ОТЗЫВЫ ОЦЕНКИ*/}
            <div className="content_block2_reviews">
              <div style={{ display: "none" }} className="block2_reviews_stars">
                <img alt="razdelisdrugim" src={Star5} />
                <img alt="razdelisdrugim" src={Star5} />
                <img alt="razdelisdrugim" src={Star5} />
                <img alt="razdelisdrugim" src={Star5} />
                <img alt="razdelisdrugim" src={Star5} />
              </div>
              <div className="block2_reviews_stars">
                <p className="block2_reviews_text">Пока нет оценок</p>
              </div>
              <p className="block2_reviews_text"> 0 отзывов </p>
            </div>
          </div>
          {redirect}

          <div className="content_block1_right">
            <a
              style={{ textDecoration: "none" }}
              target="_blank"
              href={`/public-profile?id=${userData && userData.id}`}
              rel="noreferrer"
            >
              <p className="block1_right_watchProfile">
                {" "}
                Посмотреть мой профиль
              </p>
            </a>
          </div>
        </div>

        {/*нижняя часть часть*/}
        <div className="my-data-settings-header-wrapper">
          <div className="content_block2">
            {/*ТЕЛЕФОН / ПОЧТА*/}

            <div className="content_block2_connection">
              <div className="content_block2_telephone">
                <p className="block2_telephone_text">
                  {userData.phone_verify
                    ? "Телефон подтвержден"
                    : "Телефон не подтвержден"}
                </p>
                <img
                  alt="razdelisdrugim"
                  className="my-data-submitted-img"
                  src={userData.phone_verify ? Vector : VectorDisabled}
                />
              </div>

              <div className="content_block2_mail">
                <p className="block2_mail_text">
                  {userData.email_verify
                    ? "Почта подтверждена"
                    : "Почта не подтверждена"}
                </p>
                <img
                  alt="razdelisdrugim"
                  className="my-data-submitted-img"
                  src={userData.email_verify ? Vector : VectorDisabled}
                />
              </div>
            </div>

            {/*НА САЙТЕ  - ВРЕМЯ ОТВЕТА*/}
            <div className="content_block2_online">
              <div className="content_block2_online_website">
                <p className="online_website_text"> На сайте </p>
                <p className="online_website_text2">
                  {" "}
                  {getDaysBetweenDates(userData.register_date, new Date())}
                </p>
              </div>

              <div className="content_block2_online_time">
                <p className="online_time_text"> Время ответа </p>
                <p className="online_time_text2"> - </p>
              </div>
            </div>

            {/*Я СДАЮ / БЕРУ*/}

            <div className="content_block2_rent_take">
              <div className="rent_take_content1">
                <p className="rent_take_content1_rent"> Я сдаю </p>
                <p className="rent_take_content1_number"> {subjects.length} </p>
              </div>

              <div className="rent_take_content2">
                <p className="rent_take_content2_take"> Я беру </p>
                <p className="rent_take_content2_number"> - </p>
              </div>
            </div>
          </div>
          {/* СОЦ СЕТИ  */}
          <div className="content_setting_right">
            <div className="setting_right_socialNetworks">
              <p className="setting_right_socialNetworks-p">
                Социальные сети и месседжеры
              </p>
              <img
                alt="razdelisdrugim"
                title="Введите тут свои позывные в мессенджерах и ссылки на страницы в соц. сетях – мы позволим арендатору увидеть их, чтобы связаться с вами наиболее удобным для него образом. Сначала нужно заполинть и сохранить профиль"
                src={Vector2}
                className="img_vector2"
              />
            </div>
            <div className="social_icons">
              <img
                alt="razdelisdrugim"
                onClick={() => socialClickHandler("tg")}
                className={
                  activeSocial === "tg"
                    ? "setting_right_socialNetworks_img active"
                    : "setting_right_socialNetworks_img"
                }
                src={userData.telegram_account ? Telegram : TelegramNone}
              />
              <img
                alt="razdelisdrugim"
                onClick={() => socialClickHandler("viber")}
                className={
                  activeSocial === "viber"
                    ? "setting_right_socialNetworks_img active"
                    : "setting_right_socialNetworks_img"
                }
                src={userData.viber_account ? Viber : ViberNone}
              />
              <img
                alt="razdelisdrugim"
                onClick={() => socialClickHandler("wa")}
                className={
                  activeSocial === "wa"
                    ? "setting_right_socialNetworks_img active"
                    : "setting_right_socialNetworks_img"
                }
                src={userData.whatsapp_account ? WhatsApp : WhatsAppNone}
              />
              <img
                alt="razdelisdrugim"
                onClick={() => socialClickHandler("google")}
                className={
                  activeSocial === "google"
                    ? "setting_right_socialNetworks_img active"
                    : "setting_right_socialNetworks_img"
                }
                src={userData.google_account ? Google : GoogleNone}
              />
              <img
                alt="razdelisdrugim"
                onClick={() => socialClickHandler("fb")}
                className={
                  activeSocial === "fb"
                    ? "setting_right_socialNetworks_img active"
                    : "setting_right_socialNetworks_img"
                }
                src={userData.link_facebook ? Facebook : FacebookNone}
              />
              <img
                alt="razdelisdrugim"
                onClick={() => socialClickHandler("vk")}
                className={
                  activeSocial === "vk"
                    ? "setting_right_socialNetworks_img active"
                    : "setting_right_socialNetworks_img"
                }
                src={userData.vk_account ? Vk : VkNone}
              />
              <img
                alt="razdelisdrugim"
                onClick={() => socialClickHandler("inst")}
                className={
                  activeSocial === "inst"
                    ? "setting_right_socialNetworks_img active"
                    : "setting_right_socialNetworks_img"
                }
                src={userData.link_instagram ? Instagram : InstagramNone}
              />
              <img
                alt="razdelisdrugim"
                onClick={() => socialClickHandler("ok")}
                className={
                  activeSocial === "ok"
                    ? "setting_right_socialNetworks_img active"
                    : "setting_right_socialNetworks_img"
                }
                src={userData.ok_account ? Ok : OkNone}
              />
            </div>

            {socialPopUpActive && (
              <SocialContactEnter
                activeSocial={activeSocial}
                setSocialPopUpActive={setSocialPopUpActive}
                setActiveSocial={setActiveSocial}
              />
            )}
          </div>
        </div>

        {/*КОНТЕНТ ПОД ПРОФИЛЕМ*/}
        <div className="mydata-settings-main-content">
          <form className="settings-profile-form">
            <div className="setting_left_input_wrapper">
              <label className="setting_left_input-label">
                Имя <span className="Red_star"> * </span>{" "}
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
                Фамилия <span className="Red_star"> * </span>{" "}
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
                Пол <span className="Red_star"> * </span>{" "}
              </label>
              <select
                onChange={(e) => setGender(e.target.value)}
                value={gender}
                className="setting_left_input"
              >
                <option />
                <option value="MAN"> Мужской</option>
                <option value="WOMAN"> Женский </option>
              </select>
            </div>

            <div className="setting_left_input_wrapper">
              <label className="setting_left_input-label">
                Дата рождения <span className="Red_star"> * </span>{" "}
              </label>
              <input
                onChange={(e) => setBirth(e.target.value)}
                value={birth}
                className="setting_left_input"
                type="date"
              />
            </div>

            <div className="setting_left_input_wrapper">
              <label className="setting_left_input-label">
                E-mail <span className="Red_star"> * </span>{" "}
              </label>
              <input
                disabled={
                  contactEmailRegExp.test(userData && userData.username) &&
                  userData &&
                  userData.email_verify
                }
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="setting_left_input"
                type="text"
              />
              {!userData.email_verify ? (
                <div onClick={emailVerifyHandler} className="my-data-lower-p">
                  {" "}
                  Подтвердить{" "}
                </div>
              ) : (
                <div className="profile_login_change_wrapper">
                  <p
                    style={{
                      color: "green",
                      fontSize: "16px",
                      cursor: "default",
                    }}
                    className="my-data-lower-p"
                  >
                    {" "}
                    Подтверждено{" "}
                  </p>
                  {contactEmailRegExp.test(userData && userData.username) && (
                    <p
                      style={{
                        color: "#eecc36",
                        fontSize: "16px",
                        cursor: "default",
                      }}
                      className="my-data-lower-p"
                    >
                      {" "}
                      Логин нельзя изменить{" "}
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className="setting_left_input_wrapper">
              <label className="setting_left_input-label">
                Номер телефона <span className="Red_star"> * </span>{" "}
              </label>
              <input
                disabled={
                  contactNumberRegExp.test(userData && userData.username) &&
                  userData &&
                  userData.phone_verify
                }
                onChange={(e) => setNumber(e.target.value)}
                value={number}
                className="setting_left_input"
                type="text"
              />
              {!userData.phone_verify ? (
                <p onClick={numberVerifyHandler} className="my-data-lower-p">
                  {" "}
                  Подтвердить{" "}
                </p>
              ) : (
                <div className="profile_login_change_wrapper">
                  <p
                    style={{
                      color: "green",
                      fontSize: "16px",
                      cursor: "default",
                    }}
                    className="my-data-lower-p"
                  >
                    {" "}
                    Подтверждено{" "}
                  </p>
                  {contactNumberRegExp.test(userData && userData.username) && (
                    <p
                      style={{
                        color: "#eecc36",
                        fontSize: "16px",
                        cursor: "default",
                      }}
                      className="my-data-lower-p"
                    >
                      {" "}
                      Логин нельзя изменить{" "}
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className="setting_left_input_wrapper">
              <label className="setting_left_input-label">
                {" "}
                О себе:{" "}
                <img
                  alt="razdelisdrugim"
                  title="Укажите тут как можно больше информации о себе, чтобы другой пользователь смог составить свое мнение о вас"
                  src={Vector2}
                  className="img_vector2"
                />
              </label>
              <textarea
                onChange={(e) => setAbout(e.target.value)}
                value={about}
                className="setting_left_input__textarea"
              />
            </div>

            {/* ИЗМЕНЕНИЕ ПАРОЛЯ И ИНПУТ ПАРОЛЯ */}
            {(contactEmailRegExp.test(userData && userData.username) ||
              contactNumberRegExp.test(userData && userData.username)) && (
              <div>
                <div className="setting_left_input_wrapper">
                  <p
                    onClick={() =>
                      setShowPasswordChangeTable(!showPasswordChangeTable)
                    }
                    className="my-data-lower-p__password"
                  >
                    {" "}
                    Изменить пароль{" "}
                  </p>
                </div>
                {showPasswordChangeTable && (
                  <div className="setting_left_input_wrapper">
                    <div className="setting_left_input_wrapper">
                      <label className="setting_left_input-label">
                        Старый пароль
                      </label>
                      <div className="setting_left_input_row">
                        <input
                          onChange={(e) => setOldPassword(e.target.value)}
                          value={oldPassword}
                          className="setting_left_input__password"
                          type={showOldPass ? "text" : "password"}
                        />
                        <span
                          onClick={() => setShowOldPass(!showOldPass)}
                          class="password-control__profile"
                        ></span>
                      </div>
                    </div>
                    <div className="setting_left_input_wrapper">
                      <label className="setting_left_input-label">
                        Новый пароль
                      </label>
                      <input
                        onChange={(e) => setNewPassword1(e.target.value)}
                        value={newPassword1}
                        className="setting_left_input__password"
                        type={showNewPass1 ? "text" : "password"}
                      />
                      <span
                        onClick={() => setShowNewPass1(!showNewPass1)}
                        class="password-control__profile"
                      ></span>
                    </div>
                    <div className="setting_left_input_wrapper">
                      <label className="setting_left_input-label">
                        Повторите новый пароль
                      </label>
                      <input
                        onChange={(e) => setNewPassword2(e.target.value)}
                        value={newPassword2}
                        className="setting_left_input__password"
                        type={showNewPass2 ? "text" : "password"}
                      />
                      <span
                        onClick={() => setShowNewPass2(!showNewPass2)}
                        class="password-control__profile"
                      ></span>
                    </div>
                    <div className=" button_password_profile">
                      <input
                        value="ИЗМЕНИТЬ"
                        type="button"
                        onClick={passwordChangeHandler}
                        className=" button_download"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
            <div className="referral_code_wrapper_profile">
              <p style={{ fontSize: "16px" }}>Ваш реферальный код:</p>
              <input
                disabled
                className="referral_code_input_profile"
                type="text"
                value={userData && userData.referral_code}
              />
            </div>
            <div className="referral_code_wrapper_profile">
              <p style={{ fontSize: "16px" }}>Ваша реферальная ссылка:</p>
              <input
                disabled
                className="referral_code_input_profile"
                type="text"
                value={`${rootAddress}/?referral=${
                  userData && userData.referral_code
                }`}
              />
              <div className="toShare_button_wrapper">
                <label
                  onClick={() => {
                    window.navigator.clipboard.writeText(
                      `${`${rootAddress}/?referral=${
                        userData && userData.referral_code
                      }`}`
                    );
                  }}
                  style={{ cursor: "pointer" }}
                  className="item-card-profile-button__optional"
                >
                  Копировать
                </label>
              </div>
            </div>

            {/*КНОПКА СОХРАНЕНИЯ*/}

            <div className=" button_save">
              <input
                value="СОХРАНИТЬ"
                type="button"
                onClick={profileSaveHandler}
                className=" button_download"
                id="button_max_width"
              />
            </div>
          </form>
        </div>
      </div>

      {/* ПЛАНШЕТ АДАПТИВ */}
      {/*верхняя часть*/}
      <div id="profile_ipad">
        <div className="content_block1">
          {/* ФОТО */}
          <div className="content_block2_image">
            <input
              style={{ display: "none" }}
              type="file"
              accept="image/*,image/jpeg"
              id="photo_input"
              onChange={(e) => photoHandler(e)}
            />
            <label className="profile-photo-wrapper" for="photo_input">
              <img
                alt="razdelisdrugim"
                className="profile-photo"
                src={`${rootAddress}${userData.image_profile}`}
              />
              <div className="profile-photo-overlay">Изменить</div>
            </label>
          </div>
          <div className="content_block1_left">
            <p className="block1_left_name">
              {userData.first_name ? userData.first_name : "Имя не указано"}
            </p>
            <p className="block1_left_privateFace"> Частное лицо </p>
            {/*ОТЗЫВЫ ОЦЕНКИ*/}
            <div className="content_block2_reviews">
              <div style={{ display: "none" }} className="block2_reviews_stars">
                <img alt="razdelisdrugim" src={Star5} />
                <img alt="razdelisdrugim" src={Star5} />
                <img alt="razdelisdrugim" src={Star5} />
                <img alt="razdelisdrugim" src={Star5} />
                <img alt="razdelisdrugim" src={Star5} />
              </div>
              <div className="block2_reviews_stars">
                <p className="block2_reviews_text">Пока нет оценок</p>
              </div>
              <p className="block2_reviews_text"> 0 отзывов </p>
            </div>
          </div>
          {redirect}

          <div className="content_block1_right">
            <a
              style={{ textDecoration: "none" }}
              target="_blank"
              href={`/public-profile?id=${userData && userData.id}`}
              rel="noreferrer"
            >
              <p
                className="block1_right_watchProfile"
                style={{ display: "none" }}
              >
                {" "}
                Посмотреть мой профиль
              </p>
            </a>
          </div>
        </div>

        {/*нижняя часть часть*/}
        <div className="my-data-settings-header-wrapper">
          <div className="content_block2">
            {/*ТЕЛЕФОН / ПОЧТА*/}

            <div className="content_block2_connection">
              <div className="content_block2_telephone">
                <p className="block2_telephone_text">
                  {userData.phone_verify
                    ? "Телефон подтвержден"
                    : "Телефон не подтвержден"}
                </p>
                <img
                  alt="razdelisdrugim"
                  className="my-data-submitted-img"
                  src={userData.phone_verify ? Vector : VectorDisabled}
                />
              </div>

              <div className="content_block2_mail">
                <p className="block2_mail_text">
                  {userData.email_verify
                    ? "Почта подтверждена"
                    : "Почта не подтверждена"}
                </p>
                <img
                  alt="razdelisdrugim"
                  className="my-data-submitted-img"
                  src={userData.email_verify ? Vector : VectorDisabled}
                />
              </div>
            </div>

            {/*НА САЙТЕ  - ВРЕМЯ ОТВЕТА*/}
            <div className="content_block2_online">
              <div className="content_block2_online_website">
                <p className="online_website_text"> На сайте </p>
                <p className="online_website_text2">
                  {" "}
                  {getDaysBetweenDates(userData.register_date, new Date())}
                </p>
              </div>

              <div className="content_block2_online_time">
                <p className="online_time_text"> Время ответа </p>
                <p className="online_time_text2"> - </p>
              </div>
            </div>
          </div>
        </div>

        {/* соц сети */}
        <div className="content_setting_right">
          <div className="setting_right_socialNetworks">
            <p className="setting_right_socialNetworks-p">
              Социальные сети и месседжеры
            </p>
            <img
              alt="razdelisdrugim"
              title="Введите тут свои позывные в мессенджерах и ссылки на страницы в соц. сетях – мы позволим арендатору увидеть их, чтобы связаться с вами наиболее удобным для него образом. Сначала нужно заполинть и сохранить профиль"
              src={Vector2}
              className="img_vector2"
            />
          </div>
          <div className="social_icons">
            <img
              alt="razdelisdrugim"
              onClick={() => socialClickHandler("tg")}
              className={
                activeSocial === "tg"
                  ? "setting_right_socialNetworks_img active"
                  : "setting_right_socialNetworks_img"
              }
              src={userData.telegram_account ? Telegram : TelegramNone}
            />
            <img
              alt="razdelisdrugim"
              onClick={() => socialClickHandler("viber")}
              className={
                activeSocial === "viber"
                  ? "setting_right_socialNetworks_img active"
                  : "setting_right_socialNetworks_img"
              }
              src={userData.viber_account ? Viber : ViberNone}
            />
            <img
              alt="razdelisdrugim"
              onClick={() => socialClickHandler("wa")}
              className={
                activeSocial === "wa"
                  ? "setting_right_socialNetworks_img active"
                  : "setting_right_socialNetworks_img"
              }
              src={userData.whatsapp_account ? WhatsApp : WhatsAppNone}
            />
            <img
              alt="razdelisdrugim"
              onClick={() => socialClickHandler("google")}
              className={
                activeSocial === "google"
                  ? "setting_right_socialNetworks_img active"
                  : "setting_right_socialNetworks_img"
              }
              src={userData.google_account ? Google : GoogleNone}
            />
            <img
              alt="razdelisdrugim"
              onClick={() => socialClickHandler("fb")}
              className={
                activeSocial === "fb"
                  ? "setting_right_socialNetworks_img active"
                  : "setting_right_socialNetworks_img"
              }
              src={userData.link_facebook ? Facebook : FacebookNone}
            />
            <img
              alt="razdelisdrugim"
              onClick={() => socialClickHandler("vk")}
              className={
                activeSocial === "vk"
                  ? "setting_right_socialNetworks_img active"
                  : "setting_right_socialNetworks_img"
              }
              src={userData.vk_account ? Vk : VkNone}
            />
            <img
              alt="razdelisdrugim"
              onClick={() => socialClickHandler("inst")}
              className={
                activeSocial === "inst"
                  ? "setting_right_socialNetworks_img active"
                  : "setting_right_socialNetworks_img"
              }
              src={userData.link_instagram ? Instagram : InstagramNone}
            />
            <img
              alt="razdelisdrugim"
              onClick={() => socialClickHandler("ok")}
              className={
                activeSocial === "ok"
                  ? "setting_right_socialNetworks_img active"
                  : "setting_right_socialNetworks_img"
              }
              src={userData.ok_account ? Ok : OkNone}
            />
          </div>

          {socialPopUpActive && (
            <SocialContactEnter
              activeSocial={activeSocial}
              setSocialPopUpActive={setSocialPopUpActive}
              setActiveSocial={setActiveSocial}
            />
          )}
        </div>

        {/*КОНТЕНТ ПОД ПРОФИЛЕМ*/}
        <div className="mydata-settings-main-content">
          <form className="settings-profile-form">
            <div className="setting_left_input_wrapper">
              <label className="setting_left_input-label">
                Имя <span className="Red_star"> * </span>{" "}
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
                Фамилия <span className="Red_star"> * </span>{" "}
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
                Пол <span className="Red_star"> * </span>{" "}
              </label>
              <select
                onChange={(e) => setGender(e.target.value)}
                value={gender}
                className="setting_left_input"
              >
                <option />
                <option value="MAN"> Мужской</option>
                <option value="WOMAN"> Женский </option>
              </select>
            </div>

            <div className="setting_left_input_wrapper">
              <label className="setting_left_input-label">
                Дата рождения <span className="Red_star"> * </span>{" "}
              </label>
              <input
                onChange={(e) => setBirth(e.target.value)}
                value={birth}
                className="setting_left_input"
                type="date"
              />
            </div>

            <div className="setting_left_input_wrapper">
              <label className="setting_left_input-label">
                E-mail <span className="Red_star"> * </span>{" "}
              </label>
              <input
                disabled={
                  contactEmailRegExp.test(userData && userData.username) &&
                  userData &&
                  userData.email_verify
                }
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="setting_left_input"
                type="text"
              />
              {!userData.email_verify ? (
                <div onClick={emailVerifyHandler} className="my-data-lower-p">
                  {" "}
                  Подтвердить{" "}
                </div>
              ) : (
                <div className="profile_login_change_wrapper">
                  <p
                    style={{
                      color: "green",
                      fontSize: "16px",
                      cursor: "default",
                    }}
                    className="my-data-lower-p"
                  >
                    {" "}
                    Подтверждено{" "}
                  </p>
                  {contactEmailRegExp.test(userData && userData.username) && (
                    <p
                      style={{
                        color: "#eecc36",
                        fontSize: "16px",
                        cursor: "default",
                      }}
                      className="my-data-lower-p"
                    >
                      {" "}
                      Логин нельзя изменить{" "}
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className="setting_left_input_wrapper">
              <label className="setting_left_input-label">
                Номер телефона <span className="Red_star"> * </span>{" "}
              </label>
              <input
                disabled={
                  contactNumberRegExp.test(userData && userData.username) &&
                  userData &&
                  userData.phone_verify
                }
                onChange={(e) => setNumber(e.target.value)}
                value={number}
                className="setting_left_input"
                type="text"
              />
              {!userData.phone_verify ? (
                <p onClick={numberVerifyHandler} className="my-data-lower-p">
                  {" "}
                  Подтвердить{" "}
                </p>
              ) : (
                <div className="profile_login_change_wrapper">
                  <p
                    style={{
                      color: "green",
                      fontSize: "16px",
                      cursor: "default",
                    }}
                    className="my-data-lower-p"
                  >
                    {" "}
                    Подтверждено{" "}
                  </p>
                  {contactNumberRegExp.test(userData && userData.username) && (
                    <p
                      style={{
                        color: "#eecc36",
                        fontSize: "16px",
                        cursor: "default",
                      }}
                      className="my-data-lower-p"
                    >
                      {" "}
                      Логин нельзя изменить{" "}
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className="setting_left_input_wrapper">
              <label className="setting_left_input-label">
                {" "}
                О себе:{" "}
                <img
                  alt="razdelisdrugim"
                  title="Укажите тут как можно больше информации о себе, чтобы другой пользователь смог составить свое мнение о вас"
                  src={Vector2}
                  className="img_vector2"
                />
              </label>
              <textarea
                onChange={(e) => setAbout(e.target.value)}
                value={about}
                className="setting_left_input__textarea"
              />
            </div>

            {/* ИЗМЕНЕНИЕ ПАРОЛЯ И ИНПУТ ПАРОЛЯ */}
            {(contactEmailRegExp.test(userData && userData.username) ||
              contactNumberRegExp.test(userData && userData.username)) && (
              <div>
                <div className="setting_left_input_wrapper">
                  <p
                    onClick={() =>
                      setShowPasswordChangeTable(!showPasswordChangeTable)
                    }
                    className="my-data-lower-p__password"
                  >
                    {" "}
                    Изменить пароль{" "}
                  </p>
                </div>
                {showPasswordChangeTable && (
                  <div className="setting_left_input_wrapper">
                    <div className="setting_left_input_wrapper">
                      <label className="setting_left_input-label">
                        Старый пароль
                      </label>
                      <div className="setting_left_input_row">
                        <input
                          onChange={(e) => setOldPassword(e.target.value)}
                          value={oldPassword}
                          className="setting_left_input__password"
                          type={showOldPass ? "text" : "password"}
                        />
                        <span
                          onClick={() => setShowOldPass(!showOldPass)}
                          class="password-control__profile"
                        ></span>
                      </div>
                    </div>
                    <div className="setting_left_input_wrapper">
                      <label className="setting_left_input-label">
                        Новый пароль
                      </label>
                      <input
                        onChange={(e) => setNewPassword1(e.target.value)}
                        value={newPassword1}
                        className="setting_left_input__password"
                        type={showNewPass1 ? "text" : "password"}
                      />
                      <span
                        onClick={() => setShowNewPass1(!showNewPass1)}
                        class="password-control__profile"
                      ></span>
                    </div>
                    <div className="setting_left_input_wrapper">
                      <label className="setting_left_input-label">
                        Повторите новый пароль
                      </label>
                      <input
                        onChange={(e) => setNewPassword2(e.target.value)}
                        value={newPassword2}
                        className="setting_left_input__password"
                        type={showNewPass2 ? "text" : "password"}
                      />
                      <span
                        onClick={() => setShowNewPass2(!showNewPass2)}
                        class="password-control__profile"
                      ></span>
                    </div>
                    <div className=" button_password_profile">
                      <input
                        value="ИЗМЕНИТЬ"
                        type="button"
                        onClick={passwordChangeHandler}
                        className=" button_download"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </form>
        </div>

        {/* рефералки и кнопка */}

        <div className="privateprofile_footer_ref">
          {/* рефералки */}
          <div className="referral_code_wrapper_profile">
            <p>Ваш реферальный код:</p>
            <input
              disabled
              className="referral_code_input_profile"
              type="text"
              value={userData && userData.referral_code}
            />
          </div>
          <div className="referral_code_wrapper_profile">
            <p>Ваша реф-ая ссылка:</p>
            <input
              disabled
              className="referral_code_input_profile"
              type="text"
              value={`${rootAddress}/?referral=${
                userData && userData.referral_code
              }`}
            />
            <div className="toShare_button_wrapper">
              <label
                onClick={() => {
                  window.navigator.clipboard.writeText(
                    `${`${rootAddress}/?referral=${
                      userData && userData.referral_code
                    }`}`
                  );
                }}
                style={{ cursor: "pointer" }}
                className="item-card-profile-button__optional"
              >
                Копировать
              </label>
            </div>
          </div>
        </div>

        {/*КНОПКА СОХРАНЕНИЯ*/}

        <div className=" button_save">
          <input
            value="СОХРАНИТЬ"
            type="button"
            onClick={profileSaveHandler}
            className=" button_download"
            id="button_max_width"
          />
        </div>
      </div>
    </div>
  );
};

export default MyDataIndividual;
