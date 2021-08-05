import React, { useState } from 'react';
import './CardThings.css';
import { Header, Footer, ItemCard } from '../../components/index';
import { useSelector } from 'react-redux';
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import CardProduct from '../SearchPage/CardProduct/CardProduct';
import Vector1 from '../../img/SearchPage/Vector1.png';
import Vector2 from '../../img/CardThings/LeftContent/Vector2.png';
import Vector3 from '../../img/CardThings/LeftContent/Vector3.png';
import Vector6 from '../../img/CardThings/RightContent/Vector6.png';
import Vector7 from '../../img/CardThings/RightContent/Vector7.png';
import ArrowLeft from '../../img/MainPage/Arrow_left.png';
import ArrowRight from '../../img/MainPage/Arrow_right.png';
import Rectangle2 from '../../img/CardThings/LeftContent/Rectangle 2.png';
import Rectangle3 from '../../img/CardThings/LeftContent/Rectangle 3.png';
import Rectangle4 from '../../img/CardThings/LeftContent/Rectangle 4.png';
import Rectangle7 from '../../img/CardThings/LeftContent/Rectangle 7.png';
import Share from '../../img/CardThings/LeftContent/Vector 1.png';
import Union from '../../img/CardThings/LeftContent/Union.png';
import CombinedShare from '../../img/CardThings/LeftContent/Combined Shape.png';
import Service from '../../img/CardThings/LeftContent/Service.png';
import Clock from '../../img/CardThings/LeftContent/clock.png';
import Sell1 from '../../img/CardThings/LeftContent/sell 1.png';
import HandShake from '../../img/CardThings/RightContent/handShake1.png';
import Fire from '../../img/CardThings/RightContent/Vector1.png';
import Address from '../../img/CardThings/RightContent/Vector2.png';
import Car from '../../img/CardThings/RightContent/Vector3.png';
import Clock2 from '../../img/CardThings/RightContent/Vector5.png';
import Love from '../../img/CardThings/RightContent/love.png';
import AvatarOwner from '../../img/CardThings/RightContent/Ellipse 5.png';
import Star1 from '../../img/CardThings/RightContent/Star 4.png';
import Star2 from '../../img/CardThings/RightContent/Star 2.png';
import Telegram from '../../img/CardThings/RightContent/Component 36.png';
import Viber from '../../img/CardThings/RightContent/Component 37.png';
import Whatsapp from '../../img/CardThings/RightContent/Component 38.png';
import Instagram from '../../img/CardThings/RightContent/Component 39.png';
import Vk from '../../img/CardThings/RightContent/Component 42.png';
import freePrice from '../../img/MainPage/freePrice.png';
import Requests from '../../http/axios-requests';
import Google from '../../img/ProfilePage/google.png';
import Facebook from '../../img/ProfilePage/facebook2.png';
import Ok from '../../img/ProfilePage/ok.png';
import copy from '../../img/MainPage/copy.png';

const CardThings = () => {
  //расчет времени на платформе
  function getDaysBetweenDates(d0, d1) {
    var msPerDay = 8.64e7;

    var x0 = new Date(d0);
    var x1 = new Date(d1);

    x0.setHours(12, 0, 0);
    x1.setHours(12, 0, 0);

    return Math.round((x1 - x0) / msPerDay) > 365
      ? `${Math.round((x1 - x0) / msPerDay) / 365} год(лет)`
      : Math.round((x1 - x0) / msPerDay) > 30
      ? `${Math.round((x1 - x0) / msPerDay) / 30} мес.`
      : `${Math.round((x1 - x0) / msPerDay)} д.`;
  }

  const showContactHandler = () => {
    if (!isLoggedIn) {
      alert('Доступно только авторизованным пользователям!');
      return;
    }

    setContactVisible(!contactVisible);
  };

  React.useEffect(() => {
    Requests.getSingleItem(window.location.href.split('?id=')[1]).then((response) => {
      setItemData(response.data);
      setSelectedImage(response.data.image_1);
    });

    Requests.search().then((response) => {
      setSimillarSubjects(response.data);
    });
  }, [window.location.href]);

  const [itemData, setItemData] = React.useState();
  const [simillarSubjects, setSimillarSubjects] = React.useState();
  const [selectedImage, setSelectedImage] = React.useState();
  const [contactVisible, setContactVisible] = React.useState();
  const [ignored, forceUpdate] = React.useReducer((x) => x + 1, 0);

  const { searchItems } = useSelector(({ search }) => search);
  const { isLoggedIn } = useSelector(({ userData }) => userData);

  const mapData = {
    center: itemData && itemData.items_coordinates.split('(')[1].split(')')[0].split(' ').reverse(),
    zoom: 8,
  };

  return (
    <div className="CardThings">
      <Header />
      <div className="CardThings_Wrapper">
        <div className="CardThings_Wrapper_container">
          {/* КОНТЕНТ РАСШИРЕННОЙ КАРТОЧКИ*/}
          <div className="container_content_card">
            {/* ШАПКА КАРТОЧКИ*/}
            <div className="card_shapka">
              <div>
                <p className="card_shapka_hover"> Главная </p>
                <img src={Vector1} alt="" />
              </div>

              <div>
                <p className="card_shapka_hover"> Каталог </p>
                <img src={Vector1} alt="" />
              </div>

              <div>
                <p className="card_shapka_hover"> {itemData && itemData.name_item} </p>
              </div>
            </div>

            {/* КОНТЕНТ КАРТОЧКИ*/}
            <div className="card_content">
              {/*ЛЕВАЯ СТОРОНА*/}
              <div className="card_content_left">
                <div className="left_block_photo">
                  <div className="left_block_photo_small">
                    {itemData && itemData.image_1 && (
                      <img
                        className={
                          selectedImage === itemData.image_1
                            ? 'card_thing_image active'
                            : 'card_thing_image'
                        }
                        onClick={() => setSelectedImage(itemData && itemData.image_1)}
                        src={itemData && `https://razdelisdrugim.by${itemData.image_1}`}
                        alt=""
                      />
                    )}
                    {itemData && itemData.image_2 && (
                      <img
                        className={
                          selectedImage === itemData.image_2
                            ? 'card_thing_image active'
                            : 'card_thing_image'
                        }
                        onClick={() => setSelectedImage(itemData && itemData.image_2)}
                        src={itemData && `https://razdelisdrugim.by${itemData.image_2}`}
                        alt=""
                      />
                    )}
                    {itemData && itemData.image_3 && (
                      <img
                        className={
                          selectedImage === itemData.image_3
                            ? 'card_thing_image active'
                            : 'card_thing_image'
                        }
                        onClick={() => setSelectedImage(itemData && itemData.image_3)}
                        src={itemData && `https://razdelisdrugim.by${itemData.image_3}`}
                        alt=""
                      />
                    )}
                    {itemData && itemData.image_4 && (
                      <img
                        className={
                          selectedImage === itemData.image_4
                            ? 'card_thing_image active'
                            : 'card_thing_image'
                        }
                        onClick={() => setSelectedImage(itemData && itemData.image_4)}
                        src={itemData && `https://razdelisdrugim.by${itemData.image_4}`}
                        alt=""
                      />
                    )}
                    {itemData && itemData.image_5 && (
                      <img
                        className={
                          selectedImage === itemData.image_5
                            ? 'card_thing_image active'
                            : 'card_thing_image'
                        }
                        onClick={() => setSelectedImage(itemData && itemData.image_5)}
                        src={itemData && `https://razdelisdrugim.by${itemData.image_5}`}
                        alt=""
                      />
                    )}
                  </div>

                  <div className="left_block_photo_big">
                    {itemData && itemData.image_1 && (
                      <img
                        onClick={() => setSelectedImage(itemData && itemData.image_1)}
                        src={
                          itemData && `https://razdelisdrugim.by${selectedImage && selectedImage}`
                        }
                        alt=""
                      />
                    )}
                  </div>
                </div>

                <div className="left_block_toShare">
                  <img src={Share} alt="" />
                  <p> Поделиться</p>
                </div>

                <div className={'item_share_link'}>
                  <input type="text" value={window.location.href} />
                  <img
                    onClick={window.navigator.clipboard.writeText(`${window.location.href}`)}
                    style={{ cursor: 'pointer' }}
                    src={copy}
                    className={'item-card-profile-button-image'}
                  />
                  <label
                    onClick={window.navigator.clipboard.writeText(`${window.location.href}`)}
                    style={{ cursor: 'pointer' }}
                    className="item-card-profile-button__optional">
                    Копировать
                  </label>
                </div>

                {/* БЛОК УСЛОВИЯ И ПОДПУНКТЫ */}

                <div className="left_block_conditions">
                  <p className="left_block_conditions-p">Условия получения</p>

                  {/* ДОГОВОР*/}
                  {itemData && itemData.contract && (
                    <div className="conditions_contract">
                      <img src={Union} className="img_union" alt="" />
                      <p>Договор или расписка</p>
                      <img src={Vector2} className="img_vector2" alt="" />
                    </div>
                  )}

                  {/* Залог*/}
                  {itemData && itemData.pledge && (
                    <div className="conditions_pledge">
                      <div className="conditions_row">
                        <img src={CombinedShare} className="img_combinedShare" alt="" />
                        <p className="conditions_pledge_row-p">Залог</p>
                        <img src={Vector2} className="img_vector2" alt="" />
                      </div>
                      {<p className="conditions_pledge-p">— в сумме {itemData.pledge_price} BYN</p>}
                    </div>
                  )}

                  {/* Сервичный сбор*/}
                  {itemData && itemData.servicefee && (
                    <div className="conditions_service">
                      <div className="conditions_row">
                        <img src={Service} className="img_service" alt="" />
                        <p className="conditions_service_row-p">Сервисный сбор</p>
                        <img src={Vector2} className="img_vector2" alt="" />
                      </div>
                      <p className="conditions_service-p">
                        — {itemData && itemData.servicefee_choice.toLowerCase()} за{' '}
                        {itemData && itemData.servicefee_price} BYN
                      </p>
                    </div>
                  )}

                  {/* Страхование*/}
                  {itemData && itemData.insurance && (
                    <div className="conditions_insurance">
                      <div className="conditions_row">
                        <img src={Vector3} className="img_vector3" alt="" />
                        <p className="conditions_insurance_row-p">Страхование</p>
                        <img src={Vector2} className="img_vector2" alt="" />
                      </div>
                      <p className="conditions_insurance-p">
                        — {itemData && itemData.insurance_choice.toLowerCase()} в сумме{' '}
                        {itemData && itemData.insurance_price} BYN
                      </p>
                      {itemData && itemData.franchise && (
                        <p className="conditions_service-p">
                          — франшиза в сумме {itemData && itemData.franchise_price} BYN
                        </p>
                      )}
                    </div>
                  )}

                  {/* Время подготовки вещи*/}
                  {itemData && itemData.prepare_time && (
                    <div className="conditions_timeItem">
                      <div className="conditions_row">
                        <img src={Clock} className="img_clock" alt="" />
                        <p className="conditions_timeItem_row-p">Время подготовки вещи</p>
                        <img src={Vector2} className="img_vector2" alt="" />
                      </div>
                      <p className="conditions_timeItem-p">
                        — около {itemData.prepare_time} {itemData.prepare_time_choice}
                      </p>
                    </div>
                  )}

                  {/* Время получения и возврата*/}
                  <div className="conditions_return">
                    <div className="conditions_return_block1">
                      <div className="conditions_row">
                        <p className="conditions_return_row-p">Время получения</p>
                        <img src={Vector2} className="img_vector2" alt="" />
                      </div>
                      <p className="conditions_timeItem-p">
                        — не позднее {itemData && itemData.receive_time}
                      </p>
                    </div>

                    <div className="conditions_return_block2">
                      <div className="conditions_row">
                        <p className="conditions_return_row-p">Время возврата</p>
                        <img src={Vector2} className="img_vector2" alt="" />
                      </div>
                      <p className="conditions_timeItem-p">
                        — не позднее {itemData && itemData.return_time}
                      </p>
                    </div>
                  </div>

                  {/* ГОТОВ ПРОДАТЬ*/}
                  {itemData && itemData.sell && (
                    <div className="conditions_readySell">
                      <div className="conditions_row">
                        <img src={Sell1} className="img_sell1" alt="" />
                        <p className="conditions_readySell_row-p">Готов продать</p>
                      </div>
                      {itemData && itemData.price_item && (
                        <p className="conditions_timeItem-p">
                          — за {itemData && itemData.price_item} BYN
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* ДОПОЛНИТЕЛЬНАЯ ИНФОРМАЦИЯ*/}
                <div className="left_block_information">
                  {itemData &&
                    (itemData.structure ||
                      itemData.description ||
                      itemData.article ||
                      itemData.appointment ||
                      itemData.article ||
                      itemData.inventory_number ||
                      itemData.color ||
                      itemData.year_release ||
                      itemData.mileage) && (
                      <p className="information-p">Дополнительная информация</p>
                    )}
                  {itemData && itemData.description && (
                    <div className="information_description">
                      <p style={{ fontWeight: '600' }} className="information_description-p1">
                        Описание
                      </p>
                      <p className="information_description-p2">
                        {itemData && itemData.description}
                      </p>
                    </div>
                  )}

                  <div className="information_list">
                    {itemData && itemData.structure && (
                      <div className="list_span">
                        <span className="list_span_left">Состав/комплектность</span>
                        <span className="list_span_right">{itemData && itemData.structure}</span>
                      </div>
                    )}

                    {itemData && itemData.appointment && (
                      <div className="list_span">
                        <span className="list_span_left">Назначение</span>
                        <span className="list_span_right">{itemData && itemData.appointment}</span>
                      </div>
                    )}

                    {itemData && itemData.article && (
                      <div className="list_span">
                        <span className="list_span_left">Артикул</span>
                        <span className="list_span_right">{itemData && itemData.article}</span>
                      </div>
                    )}

                    {itemData && itemData.inventory_number && (
                      <div className="list_span">
                        <span className="list_span_left">Инвентарный номер</span>
                        <span className="list_span_right">
                          {itemData && itemData.inventory_number}
                        </span>
                      </div>
                    )}

                    {itemData && itemData.color && (
                      <div className="list_span">
                        <span className="list_span_left">Цвет</span>
                        <span className="list_span_right">{itemData && itemData.color}</span>
                      </div>
                    )}

                    {itemData && itemData.year_release && (
                      <div className="list_span">
                        <span className="list_span_left">Год выпуска</span>
                        <span className="list_span_right">{itemData && itemData.year_release}</span>
                      </div>
                    )}

                    {itemData && itemData.mileage && (
                      <div className="list_span">
                        <span className="list_span_left">Пробег</span>
                        <span className="list_span_right">{itemData && itemData.mileage}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/*ПРАВАЯ СТОРОНА*/}
              <div className="card_content_right">
                <div className="right_block_up">
                  {/*название вещи*/}
                  <div className="block_up_notebook">
                    <p>{itemData && itemData.name_item}</p>
                  </div>

                  {/*предложи стоимость вещи*/}
                  <div className="block_up_yourCost">
                    {itemData && itemData.offer_price_rent && (
                      <div style={{ display: 'flex' }}>
                        <img src={HandShake} className="yourCost_handShake" alt="" />
                        <p className="block_up_yourCost-p1">Предложить свою цену</p>
                      </div>
                    )}
                    {itemData && itemData.free_rent && (
                      <div style={{ display: 'flex' }}>
                        <img src={freePrice} className="yourCost_handShake" alt="" />
                        <p className="block_up_yourCost-p1">Бесплатно</p>
                      </div>
                    )}
                    {itemData && !itemData.offer_price_rent && !itemData.free_rent && (
                      <div style={{ display: 'flex' }}>
                        <p style={{ marginRight: '10px' }} className="block_up_yourCost-p1">
                          <span style={{ fontWeight: '500' }}>
                            {itemData && itemData.price_rent}
                          </span>{' '}
                          BYN
                        </p>
                        <p style={{ marginRight: '10px' }} className="block_up_yourCost-p1">
                          в
                        </p>
                        <p style={{ fontWeight: '500' }} className="block_up_yourCost-p1">
                          {itemData && itemData.rent === 'Час'
                            ? 'час'
                            : itemData && itemData.rent === 'День'
                            ? 'день'
                            : itemData && itemData.rent === 'Неделя'
                            ? 'неделю'
                            : itemData && itemData.rent === 'Месяц'
                            ? 'месяц'
                            : ''}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Адрес местонахождения*/}
                  <div className="block_up_address">
                    <div className="conditions_row">
                      <img src={Address} className="img_address" alt="" />
                      <p className="block_up_address_row-p">Адрес местонахождения:</p>
                    </div>
                    <p className="block_up_address-p">
                      {itemData && itemData.items_address.split(',')[0]},{' '}
                      {itemData && itemData.items_address.split(',')[1]}
                    </p>
                  </div>

                  {/* Доставка */}
                  <div className="block_up_delivery">
                    <div className="conditions_row">
                      <img src={Car} className="img_car" alt="" />
                      <p className="block_up_delivery_row-p">Доставка:</p>
                      <img src={Vector2} className="img_vector2" alt="" />
                    </div>
                    {itemData && itemData.delivery.includes('Самовывоз') && (
                      <p className="block_up_delivery-p1">— самовывоз</p>
                    )}
                    {itemData && itemData.delivery.includes('Привезу и заберу сам') && (
                      <p className="block_up_delivery-p2">
                        — привезет и заберет сам:{' '}
                        {itemData && itemData.delivery_free
                          ? 'бесплатно'
                          : `${itemData && itemData.self_delivery_price} BYN`}
                      </p>
                    )}
                    {itemData && itemData.delivery.includes('Доставка курьером') && (
                      <p className="block_up_delivery-p3">
                        — отправит:{' '}
                        {`${
                          itemData && itemData.will_send_choice.includes('Такси')
                            ? `${
                                (itemData && itemData.will_send_choice.includes('Курьер')) ||
                                (itemData && itemData.will_send_choice.includes('Почта'))
                                  ? 'такси, '
                                  : 'такси'
                              }`
                            : ''
                        }${
                          itemData && itemData.will_send_choice.includes('Курьер')
                            ? `${
                                itemData && itemData.will_send_choice.includes('Почта')
                                  ? 'курьером, '
                                  : 'курьером'
                              }`
                            : ''
                        }${
                          itemData && itemData.will_send_choice.includes('Почта') ? 'почтой' : ''
                        }`}
                        : за счет{' '}
                        {itemData && itemData.send_payer === 'OWNER' ? 'владельца' : 'рентера'}
                      </p>
                    )}
                  </div>

                  {/* Свободно*/}
                  <div style={{ display: 'none' }} className="block_up_free">
                    <img src={Clock2} alt="" className="img_clock2" />
                    <span className="block_up_free-p">Свободно</span>
                  </div>

                  {/* КНОПКА СВЯЗАТЬСЯ С ВЛАДЕЛЬЦЕМ*/}
                  <div style={{ height: '185px' }}>
                    <div className="block_up_contactOwner">
                      <input
                        onClick={showContactHandler}
                        type="button"
                        value="Связаться с владельцем"
                        style={{ cursor: 'pointer' }}
                        className="contactOwner_btn"
                      />

                      <img src={Love} alt="" className="img_contactOwner" />
                    </div>
                    {contactVisible && (
                      <div style={{ marginBottom: '70px' }} className={'item_share_link'}>
                        <label
                          onClick={window.navigator.clipboard.writeText(`${window.location.href}`)}
                          style={{ cursor: 'pointer', marginRight: '30px' }}
                          className="item-card-profile-button__optional">
                          Мобильный номер:
                        </label>
                        <input
                          style={{ width: '200px' }}
                          type="text"
                          value={itemData && itemData.profile.phone}
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* НИЗ ПРАВОЙ СТОРОНЫ*/}
                <div className="right_block_down">
                  <div className="block_down_owner">
                    <p>Владелец</p>
                  </div>

                  {/*Аватарка владельца и тд*/}
                  <a
                    target="_blank"
                    style={{ textDecoration: 'none' }}
                    href={`/public-profile?id=${itemData && itemData.profile.id}`}>
                    <div className="block_down_owner_photo">
                      <img
                        style={{ borderRadius: '100%', width: '70px', height: '70px' }}
                        src={`https://razdelisdrugim.by${
                          itemData && itemData.profile.image_profile
                        }`}
                        alt=""
                      />
                      <div className="block_down_owner_photo-p">
                        <p className="block_down_owner_photo-p1">
                          {itemData && itemData.profile.company_name
                            ? itemData && itemData.profile.company_name
                            : itemData && itemData.profile.first_name}
                        </p>
                        <p className="block_down_owner_photo-p2">
                          {itemData && itemData.profile.company_name ? 'Компания' : 'Частное лицо'}
                        </p>
                      </div>
                    </div>
                  </a>

                  {/*Звездочки и отзывы*/}
                  <div className="block_down_star">
                    <div className="conditions_row">
                      <img src={Star2} className="img_star" alt="" />
                      <img src={Star2} className="img_star" alt="" />
                      <img src={Star2} className="img_star" alt="" />
                      <img src={Star2} className="img_star" alt="" />
                      <img src={Star2} className="img_star" alt="" />
                    </div>
                    <p className="block_down_star-p">Отзывов пока нет</p>
                  </div>

                  {/*телефон и почта*/}
                  <div className="block_down_telephone">
                    {itemData && itemData.profile.phone_verify ? (
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

                    {itemData && itemData.profile.email_verify ? (
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

                  {/*На сайте*/}
                  <div className="block_down_online">
                    <div className="telephone_row1">
                      <p className="block_down_online-p1">На сайте</p>
                      <p className="block_down_online-p1_1">
                        {getDaysBetweenDates(
                          itemData && itemData.profile.register_date,
                          new Date(),
                        )}
                      </p>
                    </div>
                  </div>

                  {/*СОЦ СЕТИ*/}
                  {isLoggedIn && (
                    <div className="block_down_social">
                      <div className="telephone_row2">
                        {itemData && itemData.profile.telegram_account && (
                          <a
                            href={`https://t.me/${itemData && itemData.profile.telegram_account}`}
                            target="_blank">
                            <img
                              style={{ cursor: 'pointer' }}
                              src={Telegram}
                              className="img_social"
                              alt=""
                            />
                          </a>
                        )}
                        {itemData && itemData.profile.viber_account && (
                          <a
                            target="_blank"
                            href={`viber://chat?number=+${
                              itemData && itemData.profile.viber_account
                            }`}>
                            <img
                              style={{ cursor: 'pointer' }}
                              src={Viber}
                              className="img_social"
                              alt=""
                            />
                          </a>
                        )}
                        {itemData && itemData.profile.whatsapp_account && (
                          <a
                            href={`https://api.whatsapp.com/send/?phone=${
                              itemData && itemData.profile.whatsapp_account
                            }&text=Здравствуйте, ${
                              itemData && itemData.profile.first_name
                            }. Пишу вам потому, что вы делитесь своей вещью '${
                              itemData && itemData.name_item
                            }' на платформе Razdelisdrugim.`}
                            target="_blank">
                            <img
                              style={{ cursor: 'pointer' }}
                              src={Whatsapp}
                              className="img_social"
                              alt=""
                            />
                          </a>
                        )}
                        {itemData && itemData.profile.google_account && (
                          <a
                            href={`${
                              itemData && itemData.profile.google_account.includes('https')
                                ? itemData.profile.google_account
                                : `https://${itemData && itemData.profile.google_account}`
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
                        {itemData && itemData.profile.link_facebook && (
                          <a
                            href={`${
                              itemData && itemData.profile.link_facebook.includes('https')
                                ? itemData.profile.link_facebook
                                : `https://${itemData && itemData.profile.link_facebook}`
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
                        {itemData && itemData.profile.link_instagram && (
                          <a
                            href={`${
                              itemData && itemData.profile.link_instagram.includes('https')
                                ? itemData.profile.link_instagram
                                : `https://${itemData && itemData.profile.link_instagram}`
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
                        {itemData && itemData.profile.vk_account && (
                          <a
                            href={`${
                              itemData && itemData.profile.vk_account.includes('https')
                                ? itemData.profile.vk_account
                                : `https://${itemData && itemData.profile.vk_account}`
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
                        {itemData && itemData.profile.ok_account && (
                          <a
                            href={`${
                              itemData && itemData.profile.ok_account.includes('https')
                                ? itemData.profile.ok_account
                                : `https://${itemData && itemData.profile.ok_account}`
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
              <div style={{ marginTop: '460px' }}>
                <YMaps>
                  <Map width={300} height={200} defaultState={mapData}>
                    <Placemark geometry={itemData && mapData.center} />
                  </Map>
                </YMaps>
              </div>
            </div>
          </div>

          {/* КАРТОЧКИ С ДРУГИМИ ОБЬЯВЛЕНИЯМИ*/}
          <div className="container_content_ads">
            <p className="container_content_ads-p"> Похожие объявления </p>

            <div className="content_ads_card">
              <img src={ArrowLeft} alt="" className="ads_card_img_left" />
              {simillarSubjects &&
                simillarSubjects.map((item, index) => {
                  if (index <= 3) {
                    return <ItemCard item={item} key={index} />;
                  }
                })}
              <img src={ArrowRight} alt="" className="ads_card_img_right" />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CardThings;
