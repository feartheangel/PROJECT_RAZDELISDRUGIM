import React, { useState } from 'react';
import { Header, Footer } from '../../components/index';
import { useSelector, useDispatch } from 'react-redux';
import { setItems, setItemsLoaded, setItemsLoading } from '../../redux/actions/items';
import Requests from '../../http/axios-requests';
import './PlaseItem.css';
// import Logo from "../../img/MainPage/Logo.png";
// import mark from "../../img/MainPage/Mark.png";
// import LanguagePlanet from "../../img/MainPage/Language-planet.png";
// import {Link} from "react-router-dom";
// import Burger from "../../img/MainPage/Burger.png";



const PlaceItem = () => {
  const dispatch = useDispatch();

  //получение категорий из БД
  React.useEffect(() => {
    dispatch(setItemsLoading());
    Requests.fetchItems().then((response) => {
      dispatch(setItems(response.data));
      dispatch(setItemsLoaded());
    });
  }, []);

  // СОСТОЯНИЯ ЧЕКБОКСОВ

  //ПУНКТ  БЕСПЛАТНО
  const giveFreeHandler = () => {
    setGiveFree(!giveFree);
  };

  // ПУНКТ  ПРЕДЛОЖИТЬ ЦЕНУ
  const yourCostHandler = () => {
    setYourCost(!yourCost);
  };

  // КНОПКА ДОПОЛНТИЛЬНЫЕ ПАРАМЕТРЫ
  const showFunctionsHandler = () => {
    setShowFunctions(!showFunctions);
  };

  // {/*--------------------------------- ДОПОЛНИТЕЛЬНЫЕ ПАРАМЕТРЫ ---------------------------------------*/}

  //ВИД ДОСТАВКИ - ПРИВЕЗУ ЗАБЕРУ САМ
  const takeAwayHandler = () => {
    setTakeAway(!takeAway);
  };

  //ВИД ДОСТАВКИ - САМОВЫВОЗ
  const pickupHandler = () => {
    setPickUp(!pickUp);
  };

  //ВИД ДОСТАВКИ - ОТПРАВЛЮ
  const yourSendHandler = () => {
    setYourSend(!yourSend);
  };

  //ПУНКТ ОТПРАВЛЮ - ТАКСИ
  const taxiHandler = () => {
    setTaxi(!taxi);
  };
  //ПУНКТ ОТПРАВЛЮ - КУРЬЕР
  const courierHandler = () => {
    setCourier(!courier);
  };
  //ПУНКТ ОТПРАВЛЮ - ПОЧТА
  const pochtaHandler = () => {
    setPochta(!pochta);
  };

  // ПУНКТ САМОВЫВОЗ ОТПРАВКА - ВЛАДЕЛЕЦ
  const vladelecHandler = () => {
    setVladelec(!vladelec);
  };
  //ПУНКТ САМОВЫВОЗ ОТПРАВКА - РЕНТЕР
  const renterHandler = () => {
    setRenter(!renter);
  };

  // ПУНКТ  ДОГОВОР
  const contractHandler = () => {
    setContract(!contract);
  };

  // ПУНКТ  СТРАХОВКА
  const insuranceHandler = () => {
    setInsurance(!insurance);
  };
  //  ФРАНШИЗА
  const franchiseHandler = () => {
    setFranchise(!franchise);
  };

  // ПУНКТ  ПРЕДУСМОТРЕН ЗАЛОГ
  const pladgeHandler = () => {
    setPladge(!pladge);
  };

  // СЕРВИСНЫЙ СБОР
  const serviceSborHandler = () => {
    setServiceSbor(!serviceSbor);
  };

  //ГОТОВ ПРОДАТЬ
  const readySellHandler = () => {
    setReadySell(!readySell);
  };

  //СОСТОЯНИЯ ДЛЯ ХРАНЕНИЯ ДАННЫХ ИЗ ПОЛЕЙ

  //РАЗДЕЛ - опции
  const [razdel, setRazdel] = useState();

  // КАТЕГОРИИ - опции
  const [viborCategory, setViborCategory] = useState();

  //НАИМЕНОВАНИЕ ВЕЩИ
  const [nameItem, setNameItem] = useState();

  // Я ПРЕДЛАГАЮ(ОПИСАНИЕ)
  const [description, setDescription] = useState();

  //ЗАГРУЗКА ФОТО
  const [downloadPhoto1, setDownloadPhoto1] = useState();
  const [downloadPhoto2, setDownloadPhoto2] = useState();
  const [downloadPhoto3, setDownloadPhoto3] = useState();
  const [downloadPhoto4, setDownloadPhoto4] = useState();
  const [downloadPhoto5, setDownloadPhoto5] = useState();

  //СТОИМОСТЬ АРЕНДЫ / ВРЕМЯ АРЕНДЫ
  const [costArends, setCostArends] = useState();
  const [timeArends, setTimeArends] = useState();

  //БЕСПЛАТНО
  const [giveFree, setGiveFree] = useState();

  //ПРЕДЛОЖИТЬ ЦЕНУ
  const [yourCost, setYourCost] = useState();

  // ДОПОЛНИТЕЛЬНЫЕ ПАРАМЕТРЫ - ОТКРЫТЬ/ЗАКРЫТЬ
  const [showFunctions, setShowFunctions] = useState();

  // {/*--------------------------------- ДОПОЛНИТЕЛЬНЫЕ ПАРАМЕТРЫ ---------------------------------------*/}

  //КЛЮЧЕВЫЕ СЛОВА
  const [yourKeyWord, setYourKeyWord] = useState();

  //СОСТАВ-КОМЛЕКТНОСТЬ
  const [sostav, setSostav] = useState();

  //НАЗНАЧЕНИЕ
  const [naznacheniye, setNaznacheniye] = useState();

  //АРТИКУЛ
  const [artikul, setArtikul] = useState();

  //ИНВЕНТАРНЫЙ НОМЕР
  const [inventoryNumber, setInventoryNumber] = useState();

  //ЦВЕТ
  const [yourColor, setYourColor] = useState();

  //ГОД ВЫПУСКА
  const [yearCreate, setYearCreate] = useState();

  //ПРОБЕГ
  const [mileAge, setMileAge] = useState();

  //СТОИМОСТЬ ЕСЛИ ОЦЕНИВАЕТСЯ
  const [cost, setCost] = useState();

  //ВРЕМЯ ПОЛУЧЕНИЯ И ВОЗВРАТА
  const [timeReceipt, setTimeReceipt] = useState();
  const [returnTime, setReturnTime] = useState();

  //ВРЕМЯ ПОДГОТОВКИ ТОВАРА
  const [podgotovkaTime, setPodgotovkaTime] = useState();

  // ВИД ДОСТАВКИ - САМОВЫВОЗ
  const [pickUp, setPickUp] = useState();

  // ВИД ДОСТАВКИ - ЗАБЕРУ ПРИВЕЗУ САМ ( ОПЦИИ - выбор и стомость )
  const [takeAway, setTakeAway] = useState();

  const [typeService, setTypeService] = useState();
  const [indicateCost, setIndicateCost] = useState();

  //ОТПРАВЛЮ
  const [yourSend, setYourSend] = useState();

  const [taxi, setTaxi] = useState();
  const [courier, setCourier] = useState();
  const [pochta, setPochta] = useState();

  const [vladelec, setVladelec] = useState();
  const [renter, setRenter] = useState();

  //ДОГОВОР - СТРАХОВКА - ФРАНШИЗА
  const [contract, setContract] = useState();

  const [insurance, setInsurance] = useState();
  const [insuranceTime, setInsuranceTime] = useState();
  const [insuranceSumma, setInsuranceSumma] = useState();

  //ФРАНШИЗА - СУММА
  const [franchise, setFranchise] = useState();
  const [franchiseSumma, setFranchiseSumma] = useState();

  //ПРЕДУСМОТРЕН ЗАЛОГ
  const [pladge, setPladge] = useState();

  // СЕРВИСНЫЙ СБОР - ЧЕКБОКС/ОПЦИИ/СУММА
  const [serviceSbor, setServiceSbor] = useState();
  const [optionServiceSbor, setOptionServiceSbor] = useState();
  const [summaServiceSbor, setSummaServiceSbor] = useState();

  //ГОТОВ ПРОДАТЬ
  const [readySell, setReadySell] = useState();

<<<<<<< HEAD
  // console.log ( vladelec )
=======
  const { items } = useSelector(({ items }) => items);
  const { isLoaded } = useSelector(({ items }) => items);

  //выделяем разделы
  const chapters = {};
  isLoaded &&
    items.map((item, index) => {
      if (!chapters.hasOwnProperty(item.chapter_id)) {
        chapters[item.chapter_id] = item.chapter_id;
      }
    });

  //выделяем категории
  const categories = {};
  isLoaded &&
    items.map((item, index) => {
      if (item.chapter_id === razdel) {
        categories[item.name_category] = {
          [item.name_category]: [item.id],
        };
      }
    });
>>>>>>> 3739a849b8440db0810d31e9108311f22f5fea26

  return (
    <div className="place-item-wrapper">
      <Header />
      <div className="PlaseItem">
        <div className="conteiner">
          <form encType="multipart/form-data" method="post">
            <ol>
              <h2> РАЗМЕСТИ СВОЮ ВЕЩЬ </h2>

              {/*  РАЗДЕЛ  */}
              <div>
                <li>
                  <span className="span-zvezda">*</span> Выберите раздел:{' '}
                  <select onChange={(e) => setRazdel(e.target.value)} className="option-razdel">
                    <option />
                    {isLoaded &&
                      [].concat.apply(Object.keys(chapters)).map((chapter, index) => (
                        <option key={index} value={chapter}>
                          {chapter}
                        </option>
                      ))}
                  </select>
                </li>
              </div>

              {/*  КАТЕГОРИЯ  */}
              <div>
                <li>
                  <span className="span-zvezda">*</span> Выберите категорию:{' '}
                  <select
                    className="option-razdel"
                    value={viborCategory}
                    onChange={(e) => setViborCategory(e.target.value)}>
                    <option />
                    {isLoaded &&
                      [].concat.apply(Object.keys(categories)).map((category, index) => (
                        <option key={index} value={category}>
                          {category}
                        </option>
                      ))}
                  </select>
                </li>
              </div>

              {/*  НАИМЕНОВАНИЕ  */}

              <div>
                <li>
                  <span className="span-zvezda">*</span> Укажите наименование:{'  '}
                  <input
                    type="text"
                    className="input-text"
                    value={nameItem}
                    onChange={(e) => setNameItem(e.target.value)}
                  />
                </li>
              </div>

              {/*  Я ПРЕДЛАГАЮ  */}
              <div>
                <li>
                  <span className="span-zvezda">*</span> Я предлагаю (описание):{' '}
                  <div>
                    <textarea
                      type="text"
                      title="Опишите кратко наименование того, что предлагаете..."
                      minLength="0"
                      maxLength="1000"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                </li>
              </div>

              {/*  ЗАГРУЗКА ФОТО  */}
              <div>
                <li>
                  <span className="span-zvezda">*</span> Загрузите фото:{' '}
                  <div>
                    <input
                      className="input_photo"
                      type="file"
                      multiple
                      accept="image/*,image/jpeg"
                      value={downloadPhoto1}
                      onChange={(e) => setDownloadPhoto1(e.target.value)}
                    />
                  </div>
                  {downloadPhoto1 && (
                    <div>
                      <input
                        type="file"
                        multiple
                        accept="image/*,image/jpeg"
                        value={downloadPhoto2}
                        onChange={(e) => setDownloadPhoto2(e.target.value)}
                      />
                    </div>
                  )}
                  {downloadPhoto2 && (
                    <div>
                      <input
                        type="file"
                        multiple
                        accept="image/*,image/jpeg"
                        value={downloadPhoto3}
                        onChange={(e) => setDownloadPhoto3(e.target.value)}
                      />
                    </div>
                  )}
                  {downloadPhoto3 && (
                    <div>
                      <input
                        type="file"
                        multiple
                        accept="image/*,image/jpeg"
                        value={downloadPhoto4}
                        onChange={(e) => setDownloadPhoto4(e.target.value)}
                      />
                    </div>
                  )}
                  {downloadPhoto4 && (
                    <div>
                      <input
                        type="file"
                        multiple
                        accept="image/*,image/jpeg"
                        value={downloadPhoto5}
                        onChange={(e) => setDownloadPhoto5(e.target.value)}
                      />
                    </div>
                  )}
                </li>
              </div>

              {/*  СТОИМОСТЬ АРЕНДЫ  */}
              <li>
                <div>
                  <span className="span-zvezda">*</span> Стоимость аренды:{' '}
                  <input
                    className="input-number"
                    type="number"
                    min="0"
                    max="9999"
                    step="any"
                    placeholder="0.00"
                    value={costArends}
                    disabled={giveFree || yourCost}
                    onChange={(e) => setCostArends(e.target.value)}
                  />
                  <span className="span-valuts">
                    <b>BYN</b>
                  </span>
                  <select className="option-razdel" onChange={(e) => setTimeArends(e.target.value)}>
                    <option />
                    <option>Час</option>
                    <option selected>Сутки</option>
                    <option>Неделя</option>
                    <option>Месяц</option>
                  </select>
                </div>

                {/*  БЕСПЛАТНО  */}
                <div style={{ marginLeft: '17px' }}>
                  Бесплатно{' '}
                  <input
                    className="input-checkbox"
                    type="checkbox"
                    value={giveFree}
                    disabled={yourCost}
                    onChange={(e) => giveFreeHandler(e.target.value)}
                  />{' '}
                </div>

                {/*  ПРЕДЛОЖИТЬ ЦЕНУ  */}
                <div style={{ marginLeft: '17px' }}>
                  Предложить цену{' '}
                  <input
                    className="input-checkbox"
                    type="checkbox"
                    value={yourCost}
                    disabled={giveFree}
                    onChange={(e) => yourCostHandler(e.target.value)}
                  />{' '}
                </div>
              </li>

              <hr style={{ marginBottom: '10px' }} />

              {/*  КНОПКА ДОП. ПАРАМЕТРЫ  */}

              <div id="dop_parametr">
                <p>
                  {' '}
                  Дополнительные параметры{'  '}
                  <input
                    id="dop_parametr"
                    className="input-checkbox"
                    type="checkbox"
                    value={showFunctions}
                    onClick={showFunctionsHandler}
                  />
                </p>
              </div>

              {/*--------------------------------- ДОПОЛНИТЕЛЬНЫЕ ПАРАМЕТРЫ ---------------------------------------*/}

              {showFunctions && (
                <div>
                  {/*  КЛЮЧЕВЫЕ СЛОВА  */}

                  <li>
                    <div>
                      Ключевые слова:{'  '}
                      <input
                        title="Укажите через запятую ключевые слова..."
                        type="text"
                        className="input-text"
                        value={yourKeyWord}
                        onChange={(e) => setYourKeyWord(e.target.value)}
                      />
                    </div>
                  </li>

                  {/*  СОСТАВ/КОМПЛЕКТНОСТЬ  */}

                  <li>
                    <div>
                      Состав/Комплектность:{'  '}
                      <input
                        type="text"
                        className="input-text"
                        value={sostav}
                        onChange={(e) => setSostav(e.target.value)}
                      />
                    </div>
                  </li>

                  {/*  НАЗНАЧЕНИЕ  */}

                  <li>
                    <div>
                      Назначение:{'  '}
                      <div>
                      <textarea
                        value={naznacheniye}
                        onChange={(e) => setNaznacheniye(e.target.value)}
                      />
                      </div>
                    </div>
                  </li>

                  {/*  АРТИКУЛ  */}

                  <li>
                    <div>
                      Артикул:{'  '}
                      <input
                        type="text"
                        className="input-text"
                        value={artikul}
                        onChange={(e) => setArtikul(e.target.value)}
                      />
                    </div>
                  </li>

                  {/*  ИНВЕНТАРНЫЙ НОМЕР  */}

                  <li>
                    <div>
                      Инвентарный номер:{'  '}
                      <input
                        type="text"
                        className="input-text"
                        value={inventoryNumber}
                        onChange={(e) => setInventoryNumber(e.target.value)}
                      />
                    </div>
                  </li>

                  {/*  Цвет  */}

                  <li>
                    <div>
                      Цвет:{'  '}
                      <input
                        type="text"
                        className="input-text"
                        value={yourColor}
                        onChange={(e) => setYourColor(e.target.value)}
                      />
                    </div>
                  </li>

                  {/*  ГОД ВЫПУСКА  */}

                  <li>
                    <div>
                      Год выпуска:{' '}
                      <input
                        type="number"
                        min="0"
                        max="999999999"
                        className="input-number"
                        value={yearCreate}
                        onChange={(e) => setYearCreate(e.target.value)}
                      />
                    </div>
                  </li>

                  {/*  ПРОБЕГ  */}
                  <li>
                    <div>
                      Пробег:{' '}
                      <input
                        type="number"
                        min="0"
                        max="999999999"
                        step="0.1"
                        className="input-number"
                        value={mileAge}
                        onChange={(e) => setMileAge(e.target.value)}
                      />
                    </div>
                  </li>

                  {/*  СТОИМОСТЬ ЕСЛИ ОЦЕНИВАЕТСЯ  */}
                  <li>
                    <div>
                      Стоимость вещи (если оценивается):{' '}
                      <input
                        type="number"
                        min="0"
                        max="9999"
                        step="any"
                        placeholder="0.00"
                        className="input-number"
                        value={cost}
                        onChange={(e) => setCost(e.target.value)}
                      />
                      <span className="span-valuts">
                        <b>BYN</b>
                      </span>
                    </div>
                  </li>

                  {/*  ВРЕМЯ ПОЛУЧЕНИЯ  */}
                  <li>
                    <div>
                      Время получения (не ранее):{' '}
                      <select
                        className="select-clock"
                        onChange={(e) => setTimeReceipt(e.target.value)}>
                        <option />
                        <option>1ч</option>
                        <option>2ч</option>
                        <option>3ч</option>
                        <option>4ч</option>
                        <option>5ч</option>
                        <option>6ч</option>
                        <option>7ч</option>
                        <option>8ч</option>
                        <option>9ч</option>
                        <option>10ч</option>
                        <option>11ч</option>
                        <option selected>12ч</option>
                        <option>13ч</option>
                        <option>14ч</option>
                        <option>15ч</option>
                        <option>16ч</option>
                        <option>17ч</option>
                        <option>18ч</option>
                        <option>19ч</option>
                        <option>20ч</option>
                        <option>21ч</option>
                        <option>22ч</option>
                        <option>23ч</option>
                        <option>24ч</option>
                      </select>
                    </div>
                  </li>

                  {/*  ВРЕМЯ ВОЗВРАТА  */}
                  <li>
                    <div>
                      Время возврата (не позднее):{' '}
                      <select
                        className="select-clock"
                        onChange={(e) => setReturnTime(e.target.value)}>
                        <option />
                        <option>1ч</option>
                        <option>2ч</option>
                        <option>3ч</option>
                        <option>4ч</option>
                        <option>5ч</option>
                        <option>6ч</option>
                        <option>7ч</option>
                        <option>8ч</option>
                        <option>9ч</option>
                        <option>10ч</option>
                        <option>11ч</option>
                        <option selected>12ч</option>
                        <option>13ч</option>
                        <option>14ч</option>
                        <option>15ч</option>
                        <option>16ч</option>
                        <option>17ч</option>
                        <option>18ч</option>
                        <option>19ч</option>
                        <option>20ч</option>
                        <option>21ч</option>
                        <option>22ч</option>
                        <option>23ч</option>
                        <option>24ч</option>
                      </select>
                    </div>
                  </li>

                  {/*  ВРЕМЯ ПОДГОТОВКИ ТОВАРА  */}
                  <li>
                    <div>
                      Укажите время подготовки товара:{' '}
                      <input
                        type="number"
                        min="0"
                        max="999"
                        className="input-number"
                        value={podgotovkaTime}
                        onChange={(e) => setPodgotovkaTime(e.target.value)}
                      />
                    </div>
                  </li>

                  {/*  ВИД ДОСТАВКИ - САМОВЫВОЗ - ПРИВЕЗУ/ЗАБЕРУ - ОТПРАВКА */}
                  <li>
                    {/*  САМОВЫВОЗ  */}
                    <div>
                      Вид доставки:{' '}
                      <div>
                        Самовывоз{' '}
                        <input
                          type="checkbox"
                          className="input-checkbox"
                          value={pickUp}
                          onChange={(e) => pickupHandler(e.target.value)} />
                      </div>
                    </div>

                    {/*  ПРИВЕЗУ/ЗАБЕРУ САМ  */}
                    <div>
                      Привезу и заберу сам{' '}
                      <input
                        type="checkbox"
                        className="input-checkbox"
                        value={takeAway}
                        onChange={(e) => takeAwayHandler(e.target.value)} />
                    </div>

                    {takeAway && (
                      <div>
                        Выберите услугу: {'  '}
                        <select
                          className="option-razdel"
                          onChange={(e) => setTypeService(e.target.value)}>
                          <option />
                          <option>Указать стоимость</option>
                          <option>Бесплатно</option>
                        </select>
                        {typeService === 'Указать стоимость' && (
                          <span>
                            {' '}
                            в сумме:{' '}
                            <input
                              type="number"
                              min="0"
                              max="9999"
                              step="any"
                              placeholder="0.00"
                              className="input-number"
                              value={indicateCost}
                              onChange={(e) => setIndicateCost(e.target.value)}
                            />
                            <span className="span-valuts">
                              <b>BYN</b>
                            </span>
                          </span>
                        )}
                      </div>
                    )}

                    {/*  ОТПРАВЛЮ  */}

                    <span style={{marginRight:'45px'}}>
                      Отправлю{' '}
                      <input
                        type="checkbox"
                        className="input-checkbox"
                        value={yourSend}
                        onChange={(e) => yourSendHandler(e.target.value)} />
                    </span>

                    {yourSend && (
                      <span >
                        <span style={{margin:' 0 20px'}}>
                          такси{' '}
                          <input
                            className="input-checkbox"
                            type="checkbox"
                            value={taxi}
                            onChange={(e) => taxiHandler(e.target.value)}
                          />
                        </span>

                        <span style={{margin:' 0 20px'}}>
                          курьер{' '}
                          <input
                            className="input-checkbox"
                            type="checkbox"
                            value={courier}
                            onChange={(e) => courierHandler(e.target.value)}
                          />
                        </span>

                        <span style={{margin:' 0 20px'}}>
                          почта{' '}
                          <input
                            className="input-checkbox"
                            type="checkbox"
                            value={pochta}
                            onChange={(e) => pochtaHandler(e.target.value)}
                          />
                        </span>

                        {(taxi || courier || pochta) &&
                            <div>
                              <span style={{marginRight:'20px'}}>
                                За счёт Владельца{'  '}
                                <input
                                  type="radio"
                                  className="input-checkbox"
                                  value={vladelec}
                                  name="radio"
                                  onChange={(e) => vladelecHandler(e.target.value)}
                                />
                              </span>

                              <span>
                                За счёт Рентера{'  '}
                                <input
                                type="radio"
                                className="input-checkbox"
                                value={renter}
                                name="radio"
                                onChange={(e) => renterHandler(e.target.value)}
                                />
                              </span>
                            </div>
                        }
                      </span>
                    )}
                  </li>

                  <hr />

                  {/*  ДОГОВОР/РАСПИСКА  */}
                  <li>
                    <div>
                      Договор/Расписка (обязательно):{' '}
                      <input
                        type="checkbox"
                        className="input-checkbox"
                        value={contract}
                        onChange={(e) => contractHandler(e.target.value)} />
                    </div>
                  </li>

                  {/*  СТРАХОВАНИЕ  */}
                  <li>
                    <div>
                      <span>
                        {' '}
                        Страхование{' '}
                        <input
                          type="checkbox"
                          className="input-checkbox"
                          value={insurance}
                          onChange={insuranceHandler}
                        />{' '}
                      </span>

                      {insurance && (
                        <span>
                          <span style={{ marginTop: '20px' }}>
                            <select
                              className="option-razdel"
                              onChange={(e) => setInsuranceTime(e.target.value)}>
                              <option />
                              <option>За весь период</option>
                              <option>За сутки</option>
                            </select>{' '}
                          </span>

                          {(insuranceTime === 'За весь период' || insuranceTime === 'За сутки') && (
                            <span>
                              {' '}
                              в сумме:{' '}
                              <input
                                type="number"
                                min="0"
                                max="9999"
                                step="any"
                                placeholder="0.00"
                                className="input-number"
                                value={insuranceSumma}
                                onChange={(e) => setInsuranceSumma(e.target.value)}
                              />
                              <span className="span-valuts">
                                <b>BYN</b>
                              </span>
                            </span>
                          )}

                          <div>
                            <span>
                              Франшиза{' '}
                              <input
                                type="checkbox"
                                className="input-checkbox"
                                value={franchise}
                                onChange={franchiseHandler}
                              />{' '}
                            </span>

                            {franchise && (
                              <span>
                                {' '}
                                в сумме:{' '}
                                <input
                                  type="number"
                                  min="0"
                                  max="9999"
                                  step="any"
                                  placeholder="0.00"
                                  className="input-number"
                                  value={franchiseSumma}
                                  onChange={(e) => setFranchiseSumma(e.target.value)}
                                />
                                <span className="span-valuts">
                                  <b>BYN</b>
                                </span>
                              </span>
                            )}
                          </div>
                        </span>
                      )}
                    </div>
                  </li>

                  {/*  ЗАЛОГ  */}
                  <li>
                    <div>
                      Предусмотрен залог{' '}
                      <input
                        type="checkbox"
                        className="input-checkbox"
                        value={pladge}
                        onChange={pladgeHandler}
                      />{' '}
                      {pladge && (
                        <span>
                          {' '}
                          в сумме:{' '}
                          <input
                            className="input-number"
                            type="number"
                            min="0"
                            max="9999"
                            step="any"
                            placeholder="0.00"
                          />
                          <span className="span-valuts">
                            <b>BYN</b>
                          </span>
                        </span>
                      )}
                    </div>
                  </li>

                  {/*  СЕРВИСНЫЙ СБОР  */}
                  <li>
                    <div>
                      Сервисный сбор{' '}
                      <input
                        type="checkbox"
                        className="input-checkbox"
                        value={serviceSbor}
                        onChange={serviceSborHandler}
                      />{' '}
                      {serviceSbor && (
                        <span>
                          <select
                            onChange={(e) => setOptionServiceSbor(e.target.value)}
                            className="option-razdel ">
                            <option />
                            <option>Всегда</option>
                            <option>Возврат вещи</option>
                          </select>

                          {(optionServiceSbor === 'Всегда' ||
                            optionServiceSbor === 'Возврат вещи') && (
                            <span>
                              {' '}
                              Сумма:{' '}
                              <input
                                type="number"
                                className="input-number"
                                min="0"
                                max="9999"
                                step="any"
                                placeholder="0.00"
                                value={summaServiceSbor}
                                onChange={(e) => setSummaServiceSbor(e.target.value)}
                              />
                              <span className="span-valuts">
                                <b>BYN</b>
                              </span>
                            </span>
                          )}
                        </span>
                      )}
                    </div>

                    {/*  Готов продать  */}
                    <div>
                      Готов продать{' '}
                      <input
                        className="input-checkbox"
                        type="checkbox"
                        value={readySell}
                        onChange={readySellHandler}
                      />{' '}
                    </div>
                  </li>
                </div>
              )}

              {/*  КНОПКИ ОТПРАВИТЬ / ОЧИСТИТЬ  */}

              <div>
                <input type="submit" name="a" value="ОТПРАВИТЬ" className="button_loading" />{' '}
                <input type="reset" name="a" value="ОЧИСТИТЬ" className="button_loading" />{' '}
              </div>
            </ol>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PlaceItem;

// >>>>>>> cfdfc54e3d075bb2fa81276bb3d8580b63dcd5bc
// >>>>>>> c1e5f603489f2723f82055383cba07427b1b9267