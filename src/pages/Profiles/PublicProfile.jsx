import React, { useState } from 'react';
import '../../css/PublicProfile.css';
import './MyGlobalData/MyData/MyData.css';
import { Header, Footer, ItemCard } from '../../components/index';
import { useSelector } from 'react-redux';
import Requests from '../../http/axios-requests';
import CardProduct from '../../pages/SearchPage/CardProduct/CardProduct.js';
import Address from '../../components/PublicProfile/Address.jsx';
import AboutMe from '../../components/PublicProfile/AboutMe.jsx';
import Vector6 from '../../img/CardThings/RightContent/Vector6.png';
import Vector7 from '../../img/CardThings/RightContent/Vector7.png';
import Star1 from '../../img/CardThings/RightContent/Star 4.png';
import Star2 from '../../img/CardThings/RightContent/Star 2.png';
import AvatarOwner from '../../img/CardThings/RightContent/Ellipse 5.png';
import Telegram from '../../img/CardThings/RightContent/Component 36.png';
import Viber from '../../img/CardThings/RightContent/Component 37.png';
import Whatsapp from '../../img/CardThings/RightContent/Component 38.png';
import Instagram from '../../img/CardThings/RightContent/Component 39.png';
import Vk from '../../img/CardThings/RightContent/Component 42.png';
import Google from '../../img/ProfilePage/google.png';
import Facebook from '../../img/ProfilePage/facebook2.png';
import Ok from '../../img/ProfilePage/ok.png';

const PublicProfile = () => {
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

  const [activeForm2, setActiveForm2] = useState('arends');
  const [profileData, setProfileData] = React.useState();
  const [profileItems, setProfileItems] = React.useState([]);
  const [profileAddresses, setProfileAddresses] = React.useState([]);
  const formattedAddresses = [];

  const { isLoggedIn } = useSelector(({ userData }) => userData);

  React.useEffect(() => {
    Requests.getPublicProfile(window.location.href.split('?id=')[1]).then((response) => {
      setProfileData(response.data);
    });

    Requests.getPublicProfileItems(window.location.href.split('?id=')[1]).then((response) => {
      setProfileItems(response.data);
    });

    Requests.getPublicProfileAddresses(window.location.href.split('?id=')[1]).then((response) => {
      response.data.map((address, index) => {
        formattedAddresses.push(`${address.city}, ${address.street}`);
        return formattedAddresses;
      });
      setProfileAddresses(formattedAddresses);
    });
  }, [window.location.href]);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    document.title =
      profileData && profileData.company_name
        ? profileData && profileData.company_name
        : profileData && profileData.first_name;
  }, [profileData]);

  return (
    <div>
      <Header />
      <div className="PublicProfile" id="globaldata_pk">
        <div className="PublicProfile_Wrapper">
          {/*  ОБЩИЙ КОНТЕЙНЕР */}
          <div className="PublicProfile_Wrapper_container">
            {/*  ВЕРХНЯЯ ЧАСТЬ  */}
            <div className="container_up">
              {/*  ДО АВАТАРКИ РАЗДЕЛ  */}
              <div className="container_up_header">
                <div className="header_up">
                  <p className="header_up-p1">
                    {profileData && profileData.status === 1
                      ? profileData && profileData.first_name
                      : profileData && profileData.company_name}
                  </p>
                  <p>{profileData && profileData.status === 1 ? 'Частное лицо' : 'Компания'}</p>
                </div>
                <p style={{ display: 'none' }} className="header_down">
                  Новичок
                </p>
              </div>

              {/*  КОНТЕНТ С АВАТАРКОЙ  */}
              <div className="up_content">
                {/*Аватарка владельца */}
                <div className="up_global_margin">
                  <div className="block_down_owner_photo">
                    <img
                      src={`https://razdelisdrugim.by${profileData && profileData.image_profile}`}
                      alt=""
                      style={{ width: '80px', height: 'auto', borderRadius: '100%' }}
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
                        <img src={Star2} className="img_star" alt="" />
                      </div>
                      <p className="block_down_star-p">Пока нет отзывов</p>
                    </div>
                  </div>

                  {/*телефон и почта*/}
                  <div className="up_global_margin">
                    <div className="block_down_telephone">
                      {profileData && profileData.phone_verify ? (
                        <div className="telephone_row1">
                          <p className="block_down_telephone-p2">Телефон подтвержден</p>
                          <img src={Vector7} className="img_vector" alt="" />
                        </div>
                      ) : (
                        <div className="telephone_row1">
                          <p className="block_down_telephone-p1">Телефон не подтвержден</p>
                          <img src={Vector6} className="img_vector" alt="" />
                        </div>
                      )}

                      {profileData && profileData.email_verify ? (
                        <div className="telephone_row1">
                          <p className="block_down_telephone-p2">Почта подтверждена</p>
                          <img src={Vector7} className="img_vector" alt="" />
                        </div>
                      ) : (
                        <div className="telephone_row1">
                          <p className="block_down_telephone-p1">Почта не подтверждена</p>
                          <img src={Vector6} className="img_vector" alt="" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/*На сайте*/}
                  <div className="up_global_margin">
                    <div className="block_down_online">
                      <div className="telephone_row1">
                        <p className="block_down_online-p1">На сайте</p>
                        <p className="block_down_online-p1_1">
                          {getDaysBetweenDates(
                            profileData && profileData.register_date,
                            new Date(),
                          )}
                        </p>
                      </div>

                      <div className="telephone_row2">
                        <p className="block_down_online-p2">Время ответа</p>
                        <p className="block_down_online-p2_2">-</p>
                      </div>
                    </div>
                  </div>

                  {/*СОЦ СЕТИ*/}
                  {isLoggedIn && (
                    <div className="block_down_social">
                      <div className="telephone_row2">
                        {profileData && profileData.telegram_account && (
                          <a
                            href={`https://t.me/${profileData && profileData.telegram_account}`}
                            target="_blank">
                            <img
                              style={{ cursor: 'pointer' }}
                              src={Telegram}
                              className="img_social"
                              alt=""
                            />
                          </a>
                        )}
                        {profileData && profileData.viber_account && (
                          <a
                            target="_blank"
                            href={`viber://chat?number=+${
                              profileData && profileData.viber_account
                            }`}>
                            <img
                              style={{ cursor: 'pointer' }}
                              src={Viber}
                              className="img_social"
                              alt=""
                            />
                          </a>
                        )}
                        {profileData && profileData.whatsapp_account && (
                          <a
                            href={`https://api.whatsapp.com/send/?phone=${
                              profileData && profileData.whatsapp_account
                            }`}
                            target="_blank">
                            <img
                              style={{ cursor: 'pointer' }}
                              src={Whatsapp}
                              className="img_social"
                              alt=""
                            />
                          </a>
                        )}
                        {profileData && profileData.google_account && (
                          <a
                            href={`${
                              profileData && profileData.google_account.includes('https')
                                ? profileData.google_account
                                : `https://${profileData && profileData.google_account}`
                            }`}
                            target="_blank">
                            <img
                              style={{ cursor: 'pointer' }}
                              src={Google}
                              className="img_social"
                              alt=""
                            />
                          </a>
                        )}
                        {profileData && profileData.link_facebook && (
                          <a
                            href={`${
                              profileData && profileData.link_facebook.includes('https')
                                ? profileData.link_facebook
                                : `https://${profileData && profileData.link_facebook}`
                            }`}
                            target="_blank">
                            <img
                              style={{ cursor: 'pointer' }}
                              src={Facebook}
                              className="img_social"
                              alt=""
                            />
                          </a>
                        )}
                        {profileData && profileData.link_instagram && (
                          <a
                            href={`${
                              profileData && profileData.link_instagram.includes('https')
                                ? profileData.link_instagram
                                : `https://${profileData && profileData.link_instagram}`
                            }`}
                            target="_blank">
                            <img
                              style={{ cursor: 'pointer' }}
                              src={Instagram}
                              className="img_social"
                              alt=""
                            />
                          </a>
                        )}
                        {profileData && profileData.vk_account && (
                          <a
                            href={`${
                              profileData && profileData.vk_account.includes('https')
                                ? profileData.vk_account
                                : `https://${profileData && profileData.vk_account}`
                            }`}
                            target="_blank">
                            <img
                              style={{ cursor: 'pointer' }}
                              src={Vk}
                              className="img_social"
                              alt=""
                            />{' '}
                          </a>
                        )}
                        {profileData && profileData.ok_account && (
                          <a
                            href={`${
                              profileData && profileData.ok_account.includes('https')
                                ? profileData.ok_account
                                : `https://${profileData && profileData.ok_account}`
                            }`}
                            target="_blank">
                            <img
                              style={{ height: '30px', width: '30px', cursor: 'pointer' }}
                              src={Ok}
                              className="img_social"
                              alt=""
                            />
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {/*  ПОСЛЕ  АВАТАРКИ РАЗДЕЛ  */}
              <div className="container_up_footer">
                <input
                  value="Отправить сообщение"
                  type="button"
                  style={{ border: 'none', opacity: '0.5' }}
                  className="footer_btn1"
                />

                <input
                  value="Оставить отзыв"
                  type="button"
                  style={{ border: 'none', opacity: '0.5' }}
                  className="footer_btn2"
                />
              </div>
              <p style={{ border: '1px solid rgba(76, 201, 240, 0.77)' }}></p>
            </div>

            {/*  НИЖНЯЯ ЧАСТЬ КОНТЕЙНЕРА  */}
            <div className="container_down">
              {/*  ШАПКА ПЕРЕД КОМПОНЕНТАМИ  */}
              <div className="container_down_header">
                <div className="down_header_text1">
                  <p
                    className="down_header_text1-p1"
                    className={
                      activeForm2 === 'arends'
                        ? 'down_header_text1-p1_active'
                        : 'down_header_text1-p1'
                    }
                    onClick={() => setActiveForm2('arends')}>
                    Сдает
                  </p>
                  <p className="down_header_text1-p2">{profileItems && profileItems.length}</p>
                </div>
                <p
                  style={
                    profileData && profileData.about
                      ? {}
                      : { opacity: '0.4', pointerEvents: 'none' }
                  }
                  className={
                    activeForm2 === 'about_me'
                      ? 'down_header_text1-p1_active'
                      : 'down_header_text1-p1'
                  }
                  onClick={() => {
                    profileData && profileData.about && setActiveForm2('about_me');
                  }}>
                  О себе
                </p>
                <p
                  style={{ marginLeft: '40px' }}
                  className={
                    activeForm2 === 'address'
                      ? 'down_header_text1-p1_active'
                      : 'down_header_text1-p1'
                  }
                  onClick={() => setActiveForm2('address')}>
                  Адреса
                </p>
              </div>

              {/*  КОНТЕЙНЕР С ПОДКЛЮЧАЕМЫМИ КОМПОНЕНТАМИ */}
              <div className="down_content">
                {/* ДЛЯ КОМПОНЕНТА КАРТОЧЕК */}
                {activeForm2 === 'arends' && (
                  <div className="down_content_cards">
                    {profileItems &&
                      profileItems.map((item, index) => {
                        return <ItemCard item={item} key={index} />;
                      })}
                  </div>
                )}

                {/* ДЛЯ КОМПОНЕНТА ОПИСАНИЯ О СЕБЕ */}
                <div>
                  {activeForm2 === 'about_me' && (
                    <AboutMe about={profileData && profileData.about} />
                  )}
                </div>

                {/* ДЛЯ КОМПОНЕНТА АДРЕССА */}
                <div>
                  {activeForm2 === 'address' && isLoggedIn ? (
                    <Address addresses={profileAddresses} />
                  ) : activeForm2 === 'address' && !isLoggedIn ? (
                    <p style={{ color: '#4CC9F0' }} className="block_up_address-p">
                      Адреса доступны после регистрации
                    </p>
                  ) : (
                    ''
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>















      {/* МОБИЛЬНЫЙ АДАПТИВ */}

      <div className="PublicProfile" id="globaldata_mobile">
        <div className="PublicProfile_Wrapper">
          {/*  ОБЩИЙ КОНТЕЙНЕР */}
          <div className="PublicProfile_Wrapper_container">
            {/*  ВЕРХНЯЯ ЧАСТЬ  */}
            <div className="container_up">

              {/*  КОНТЕНТ С АВАТАРКОЙ  */}
              <div className="up_content">
                <div  className="up_content_rowstyle">
                  {/*Аватарка владельца */}
                    <div className="block_down_owner_photo">
                      <img
                        src={`https://razdelisdrugim.by${profileData && profileData.image_profile}`}
                        alt=""
                        style={{ width: '80px', height: 'auto', borderRadius: '100%' }}
                      />
                    </div>

                  <div>
                    {/*  СПРАВА ОТ АВАТАРКИ  */}
                    <div className="container_up_header">
                      <div className="header_up">
                        <p className="header_up-p1">
                          {profileData && profileData.status === 1
                            ? profileData && profileData.first_name
                            : profileData && profileData.company_name}
                          <p className="header_down">
                            Новичок
                          </p>
                        </p>
                        <p className="header_up-p2">
                          {profileData && profileData.status === 1 ? 'Частное лицо' : 'Компания'}</p>
                      </div>
                    </div>


                    {/*Звездочки и отзывы*/}
                      <div className="up_global_star" >
                        <div className="block_down_star">
                          <div className="conditions_row" style={{marginBottom:'5px'}}>
                            <img src={Star2} className="img_star" alt="" />
                            <img src={Star2} className="img_star" alt="" />
                            <img src={Star2} className="img_star" alt="" />
                            <img src={Star2} className="img_star" alt="" />
                            <img src={Star2} className="img_star" alt="" />
                          </div>
                          <p className="block_down_star-p">Пока нет отзывов</p>
                        </div>
                      </div>
                  </div>
                </div>

                <div className="up_global_alight">
                                    {/*СОЦ СЕТИ*/}
                  {isLoggedIn && (
                    <div className="block_down_social">
                      <div className="telephone_row2">
                        {profileData && profileData.telegram_account && (
                          <a
                            href={`https://t.me/${profileData && profileData.telegram_account}`}
                            target="_blank">
                            <img
                              style={{ cursor: 'pointer' }}
                              src={Telegram}
                              className="img_social"
                              alt=""
                            />
                          </a>
                        )}
                        {profileData && profileData.viber_account && (
                          <a
                            target="_blank"
                            href={`viber://chat?number=+${
                              profileData && profileData.viber_account
                            }`}>
                            <img
                              style={{ cursor: 'pointer' }}
                              src={Viber}
                              className="img_social"
                              alt=""
                            />
                          </a>
                        )}
                        {profileData && profileData.whatsapp_account && (
                          <a
                            href={`https://api.whatsapp.com/send/?phone=${
                              profileData && profileData.whatsapp_account
                            }`}
                            target="_blank">
                            <img
                              style={{ cursor: 'pointer' }}
                              src={Whatsapp}
                              className="img_social"
                              alt=""
                            />
                          </a>
                        )}
                        {profileData && profileData.google_account && (
                          <a
                            href={`${
                              profileData && profileData.google_account.includes('https')
                                ? profileData.google_account
                                : `https://${profileData && profileData.google_account}`
                            }`}
                            target="_blank">
                            <img
                              style={{ cursor: 'pointer' }}
                              src={Google}
                              className="img_social"
                              alt=""
                            />
                          </a>
                        )}
                        {profileData && profileData.link_facebook && (
                          <a
                            href={`${
                              profileData && profileData.link_facebook.includes('https')
                                ? profileData.link_facebook
                                : `https://${profileData && profileData.link_facebook}`
                            }`}
                            target="_blank">
                            <img
                              style={{ cursor: 'pointer' }}
                              src={Facebook}
                              className="img_social"
                              alt=""
                            />
                          </a>
                        )}
                        {profileData && profileData.link_instagram && (
                          <a
                            href={`${
                              profileData && profileData.link_instagram.includes('https')
                                ? profileData.link_instagram
                                : `https://${profileData && profileData.link_instagram}`
                            }`}
                            target="_blank">
                            <img
                              style={{ cursor: 'pointer' }}
                              src={Instagram}
                              className="img_social"
                              alt=""
                            />
                          </a>
                        )}
                        {profileData && profileData.vk_account && (
                          <a
                            href={`${
                              profileData && profileData.vk_account.includes('https')
                                ? profileData.vk_account
                                : `https://${profileData && profileData.vk_account}`
                            }`}
                            target="_blank">
                            <img
                              style={{ cursor: 'pointer' }}
                              src={Vk}
                              className="img_social"
                              alt=""
                            />{' '}
                          </a>
                        )}
                        {profileData && profileData.ok_account && (
                          <a
                            href={`${
                              profileData && profileData.ok_account.includes('https')
                                ? profileData.ok_account
                                : `https://${profileData && profileData.ok_account}`
                            }`}
                            target="_blank">
                            <img
                              src={Ok}
                              className="img_social"
                              alt=""
                            />
                          </a>
                        )}
                      </div>
                    </div>
                  )}

                  {/*телефон и почта*/}
                  <div className="up_content_rowstyle_telephone">

                    <div className="up_global_margin">
                      <div className="block_down_telephone">
                        {profileData && profileData.phone_verify ? (
                          <div className="telephone_row1">
                            <p className="block_down_telephone-p2">Телефон подтвержден</p>
                            <img src={Vector7} className="img_vector" alt="" />
                          </div>
                        ) : (
                          <div className="telephone_row1">
                            <p className="block_down_telephone-p1">Телефон не подтвержден</p>
                            <img src={Vector6} className="img_vector" alt="" />
                          </div>
                        )}

                        {profileData && profileData.email_verify ? (
                          <div className="telephone_row1">
                            <p className="block_down_telephone-p2">Почта подтверждена</p>
                            <img src={Vector7} className="img_vector" alt="" />
                          </div>
                        ) : (
                          <div className="telephone_row1">
                            <p className="block_down_telephone-p1">Почта не подтверждена</p>
                            <img src={Vector6} className="img_vector" alt="" />
                          </div>
                        )}
                      </div>
                    </div>

                    {/*На сайте*/}
                    <div className="up_global_margin2">
                      <div className="block_down_online">
                        <div className="telephone_row1">
                          <p className="block_down_online-p1">На сайте</p>
                          <p className="block_down_online-p1_1">
                            {getDaysBetweenDates(
                              profileData && profileData.register_date,
                              new Date(),
                            )}
                          </p>
                        </div>

                        <div className="telephone_row2">
                          <p className="block_down_online-p2">Время ответа</p>
                          <p className="block_down_online-p2_2">-</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
              {/*  ПОСЛЕ  АВАТАРКИ РАЗДЕЛ  */}
              <div className="container_up_footer">
                <input
                  value="Отправить сообщение"
                  type="button"
                  style={{ border: 'none'}}
                  className="footer_btn1"
                />

                <input
                  value="Оставить отзыв"
                  type="button"
                  style={{ border: 'none'}}
                  className="footer_btn2"
                />
              </div>
            </div>

            {/*  НИЖНЯЯ ЧАСТЬ КОНТЕЙНЕРА  */}
            <div className="container_down">
              {/*  ШАПКА ПЕРЕД КОМПОНЕНТАМИ  */}
              <div className="container_down_header">
                <div className="down_header_text1">
                  <p
                    className="down_header_text1-p1"
                    className={
                      activeForm2 === 'arends'
                        ? 'down_header_text1-p1_active'
                        : 'down_header_text1-p1'
                    }
                    onClick={() => setActiveForm2('arends')}>
                    Сдает
                  </p>
                  <p className="down_header_text1-p2">{profileItems && profileItems.length}</p>
                </div>
                <p
                  style={
                    profileData && profileData.about
                      ? {}
                      : { opacity: '0.4', pointerEvents: 'none' }
                  }
                  className={
                    activeForm2 === 'about_me'
                      ? 'down_header_text1-p1_active'
                      : 'down_header_text1-p1'
                  }
                  onClick={() => {
                    profileData && profileData.about && setActiveForm2('about_me');
                  }}>
                  О себе
                </p>
                <p
                  className={
                    activeForm2 === 'address'
                      ? 'down_header_text1-p1_active'
                      : 'down_header_text1-p1'
                  }
                  onClick={() => setActiveForm2('address')}>
                  Адреса
                </p>
              </div>

              {/*  КОНТЕЙНЕР С ПОДКЛЮЧАЕМЫМИ КОМПОНЕНТАМИ */}
              <div className="down_content">
                {/* ДЛЯ КОМПОНЕНТА КАРТОЧЕК */}
                {activeForm2 === 'arends' && (
                  <div className="down_content_cards">
                    {profileItems &&
                      profileItems.map((item, index) => {
                        return <ItemCard item={item} key={index} />;
                      })}
                  </div>
                )}

                {/* ДЛЯ КОМПОНЕНТА ОПИСАНИЯ О СЕБЕ */}
                <div>
                  {activeForm2 === 'about_me' && (
                    <AboutMe about={profileData && profileData.about} />
                  )}
                </div>

                {/* ДЛЯ КОМПОНЕНТА АДРЕССА */}
                <div>{activeForm2 === 'address' && <Address addresses={profileAddresses} />}</div>
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
