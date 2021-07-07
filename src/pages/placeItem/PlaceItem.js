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

  //обрабочтик цены аренды
  const setCostArendsHandler = (e) => {
    console.log(e.target.value);
    if (!e.target.value.includes('-') && !e.target.value.includes('--')) {
      setCostArends(e.target.value);
    }
  };

  //обработчик года выпуска
  const setYearCreateHandler = (e) => {
    console.log(e.target.value);
    if (!e.target.value.includes('-') && !e.target.value.includes('--')) {
      setYearCreate(e.target.value);
    }
  };

  //обработчик цены продажи
  const setCostHandler = (e) => {
    console.log(e.target.value);
    if (!e.target.value.includes('-') && !e.target.value.includes('--')) {
      setCost(e.target.value);
    }
  };
  //обработчик времени подготовки
  const setPodgotovkaTimeHandler = (e) => {
    console.log(e.target.value);
    if (!e.target.value.includes('-') && !e.target.value.includes('--')) {
      setPodgotovkaTime(e.target.value);
    }
  };
  //обработчик суммы за доставку
  const setIndicateCostHandler = (e) => {
    console.log(e.target.value);
    if (!e.target.value.includes('-') && !e.target.value.includes('--')) {
      setIndicateCost(e.target.value);
    }
  };
  //обработчик суммы страховки
  const setInsuranceSummaHandler = (e) => {
    console.log(e.target.value);
    if (!e.target.value.includes('-') && !e.target.value.includes('--')) {
      setInsuranceSumma(e.target.value);
    }
  };
  //обработчик суммы за франшизу
  const setFranchiseSummaHandler = (e) => {
    console.log(e.target.value);
    if (!e.target.value.includes('-') && !e.target.value.includes('--')) {
      setFranchiseSumma(e.target.value);
    }
  };
  //обработчик суммы сервисного сбора
  const setSummaServiceSborHandler = (e) => {
    console.log(e.target.value);
    if (!e.target.value.includes('-') && !e.target.value.includes('--')) {
      setSummaServiceSbor(e.target.value);
    }
  };

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

  // отправка за счет
  const radioHandler = (e) => {
    setRadio(e.target.value);
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

  //обработчик суммы залога
  const pledgePriceHandler = (e) => {
    console.log(e.target.value);
    if (!e.target.value.includes('-') && !e.target.value.includes('--')) {
      setPledgePrice(e.target.value);
    }
  };

  //обработчик отправки формы
  const sendHandler = () => {
    Requests.createItem(
      Number(viborCategory),
      String(nameItem),
      String(description),
      String(timeArends),
      Number(costArends),
      String(yourKeyWord),
      Number(yearCreate),
      String(mileAge),
      Number(cost),
      String(timeReceipt),
      String(returnTime),
      Number(podgotovkaTime),
      String(deliveryType),
      Boolean(typeService === 'free' ? true : false),
      Number(indicateCost),
      Boolean(yourSend),
      String(willSendWays),
      String(radio),
      Boolean(serviceSbor),
      String(optionServiceSbor),
      Number(summaServiceSbor),
      Boolean(pladge),
      Number(pledgePrice),
      Boolean(insurance),
      String(insuranceTime),
      Number(insuranceSumma),
      Boolean(readySell),
      Boolean(contract),
      String(naznacheniye),
      String(sostav),
      Boolean(giveFree),
      Boolean(yourCost),
      String(yourColor),
      Boolean(franchise),
      Number(franchiseSumma),
      String(artikul),
      String(inventoryNumber),
    )
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          alert('Успешно добавлено в базу!');
        }
        console.log(response);
      })
      .catch((response) => {
        console.log(response.code);
      });
  };

  //СОСТОЯНИЯ ДЛЯ ХРАНЕНИЯ ДАННЫХ ИЗ ПОЛЕЙ
  //хранение типа доставки
  const [deliveryType, setDeliveryType] = useState('NONE');

  //РАЗДЕЛ - опции
  const [razdel, setRazdel] = useState('');

  // КАТЕГОРИИ - опции
  const [viborCategory, setViborCategory] = useState('');

  //НАИМЕНОВАНИЕ ВЕЩИ
  const [nameItem, setNameItem] = useState('');

  // Я ПРЕДЛАГАЮ(ОПИСАНИЕ)
  const [description, setDescription] = useState('');

  //ЗАГРУЗКА ФОТО
  const [downloadPhoto1, setDownloadPhoto1] = useState();
  const [downloadPhoto2, setDownloadPhoto2] = useState();
  const [downloadPhoto3, setDownloadPhoto3] = useState();
  const [downloadPhoto4, setDownloadPhoto4] = useState();
  const [downloadPhoto5, setDownloadPhoto5] = useState();

  //СТОИМОСТЬ АРЕНДЫ / ВРЕМЯ АРЕНДЫ
  const [costArends, setCostArends] = useState('');
  const [timeArends, setTimeArends] = useState('DAY');

  //БЕСПЛАТНО
  const [giveFree, setGiveFree] = useState();

  //ПРЕДЛОЖИТЬ ЦЕНУ
  const [yourCost, setYourCost] = useState('');

  // ДОПОЛНИТЕЛЬНЫЕ ПАРАМЕТРЫ - ОТКРЫТЬ/ЗАКРЫТЬ
  const [showFunctions, setShowFunctions] = useState();

  // {/*--------------------------------- ДОПОЛНИТЕЛЬНЫЕ ПАРАМЕТРЫ ---------------------------------------*/}

  //КЛЮЧЕВЫЕ СЛОВА
  const [yourKeyWord, setYourKeyWord] = useState('');

  //СОСТАВ-КОМЛЕКТНОСТЬ
  const [sostav, setSostav] = useState('');

  //НАЗНАЧЕНИЕ
  const [naznacheniye, setNaznacheniye] = useState('');

  //АРТИКУЛ
  const [artikul, setArtikul] = useState('');

  //ИНВЕНТАРНЫЙ НОМЕР
  const [inventoryNumber, setInventoryNumber] = useState('');

  //ЦВЕТ
  const [yourColor, setYourColor] = useState('');

  //ГОД ВЫПУСКА
  const [yearCreate, setYearCreate] = useState('');

  //ПРОБЕГ
  const [mileAge, setMileAge] = useState('');

  //СТОИМОСТЬ ЕСЛИ ОЦЕНИВАЕТСЯ
  const [cost, setCost] = useState('');

  //ВРЕМЯ ПОЛУЧЕНИЯ И ВОЗВРАТА
  const [timeReceipt, setTimeReceipt] = useState('12ч');
  const [returnTime, setReturnTime] = useState('12ч');

  //ВРЕМЯ ПОДГОТОВКИ ТОВАРА
  const [podgotovkaTime, setPodgotovkaTime] = useState(' ');

  // ВИД ДОСТАВКИ - САМОВЫВОЗ
  const [pickUp, setPickUp] = useState('');

  // ВИД ДОСТАВКИ - ЗАБЕРУ ПРИВЕЗУ САМ ( ОПЦИИ - выбор и стомость )
  const [takeAway, setTakeAway] = useState('');

  const [typeService, setTypeService] = useState('');
  const [indicateCost, setIndicateCost] = useState(false);

  //ОТПРАВЛЮ
  const [yourSend, setYourSend] = useState(false);

  const [taxi, setTaxi] = useState();
  const [courier, setCourier] = useState();
  const [pochta, setPochta] = useState();

  const [radio, setRadio] = useState('NONE');

  //методы доставки отправкой
  const [willSendWays, setWillSendWays] = React.useState('NONE');

  //ДОГОВОР - СТРАХОВКА - ФРАНШИЗА
  const [contract, setContract] = useState();

  const [insurance, setInsurance] = useState();
  const [insuranceTime, setInsuranceTime] = useState('');
  const [insuranceSumma, setInsuranceSumma] = useState('');

  //ФРАНШИЗА - СУММА
  const [franchise, setFranchise] = useState();
  const [franchiseSumma, setFranchiseSumma] = useState('');

  //ПРЕДУСМОТРЕН ЗАЛОГ
  const [pladge, setPladge] = useState();
  const [pledgePrice, setPledgePrice] = useState('');

  // СЕРВИСНЫЙ СБОР - ЧЕКБОКС/ОПЦИИ/СУММА
  const [serviceSbor, setServiceSbor] = useState('');
  const [optionServiceSbor, setOptionServiceSbor] = useState('');
  const [summaServiceSbor, setSummaServiceSbor] = useState('');

  //ГОТОВ ПРОДАТЬ
  const [readySell, setReadySell] = useState();
  // console.log ( vladelec )

  //получение категорий из БД
  React.useEffect(() => {
    dispatch(setItemsLoading());
    Requests.fetchItems().then((response) => {
      dispatch(setItems(response.data));
      dispatch(setItemsLoaded());
    });
  }, []);

  //очистка полей при отмене выбора
  React.useEffect(() => {
    if (giveFree === true || yourCost === true) setCostArends(false);
    if (takeAway === false) {
      setTypeService(false);
      setIndicateCost(false);
    }
    if (yourSend === false) {
      setTaxi(false);
      setCourier(false);
      setPochta(false);
      setRadio('NONE');
    }

    if (insurance === false) {
      setInsuranceTime('NONE');
      setInsuranceSumma(null);
      setFranchise(false);
      setFranchiseSumma(null);
    }

    if (pladge === false) setPledgePrice(false);

    if (franchise === false) setFranchiseSumma(false);

    if (serviceSbor === false) {
      setOptionServiceSbor('NONE');
      setSummaServiceSbor(null);
    }

    if (typeService === 'free') setIndicateCost(false);
  }, [
    giveFree,
    yourCost,
    takeAway,
    yourSend,
    insurance,
    franchise,
    pladge,
    serviceSbor,
    typeService,
  ]);

  //определение способов доставки
  React.useEffect(() => {
    if (pickUp) {
      if (pickUp && takeAway && yourSend) {
        setDeliveryType('1, 2, 3');
      } else if (pickUp && takeAway) {
        setDeliveryType('1, 2');
      } else if (pickUp && yourSend) {
        setDeliveryType('1, 3');
      } else if (pickUp) {
        setDeliveryType('1');
      }
    } else if (takeAway) {
      if (takeAway && yourSend) {
        setDeliveryType('2, 3');
      } else if (takeAway) {
        setDeliveryType('2');
      }
    } else if (yourSend) {
      setDeliveryType('3');
    } else setDeliveryType('NONE');
  }, [pickUp, takeAway, yourSend]);

  //определение способов доставки отправкой
  React.useEffect(() => {
    if (taxi) {
      if (taxi && courier && pochta) {
        setWillSendWays('1, 2, 3');
      } else if (taxi && courier) {
        setWillSendWays('1, 2');
      } else if (taxi && pochta) {
        setWillSendWays('1, 3');
      } else if (taxi) {
        setWillSendWays('1');
      }
    } else if (courier) {
      if (courier && pochta) {
        setWillSendWays('2, 3');
      } else if (courier) {
        setWillSendWays('2');
      }
    } else if (pochta) {
      setWillSendWays('3');
    } else setWillSendWays('NONE');
    console.log(willSendWays);
  }, [taxi, courier, pochta]);

  const { items } = useSelector(({ items }) => items);
  const { isLoaded } = useSelector(({ items }) => items);

  //выделяем разделы
  const chapters = {};
  isLoaded &&
    items.map((item, index) => {
      if (!chapters.hasOwnProperty(item.chapter_id.name_chapter)) {
        chapters[item.chapter_id.name_chapter] = item.chapter_id.id;
      }
    });

  //выделяем категории
  const categories = {};
  isLoaded &&
    items.map((item, index) => {
      if (item.chapter_id.id === Number(razdel)) {
        categories[item.name_category] = [item.id];
      }
    });

  return (
    <div className="place-item-wrapper">
      <Header />
      <div className="PlaseItem">
        <div className="conteiner">
          <form>
            <ol>
              <h2> РАЗМЕСТИ СВОЮ ВЕЩЬ </h2>

              {/*  РАЗДЕЛ  */}
              <div>
                <li>
                  <span className="span-zvezda">*</span> Выберите раздел:{' '}
                  <select onChange={(e) => setRazdel(e.target.value)} className="option-razdel">
                    <option />
                    {isLoaded &&
                      [].concat.apply(Object.entries(chapters)).map((chapter, index) => (
                        <option key={index} value={chapter[1]}>
                          {chapter[0]}
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
                      [].concat.apply(Object.entries(categories)).map((category, index) => (
                        <option key={index} value={category[1]}>
                          {category[0]}
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
                      accept="image/*,image/jpeg"
                      value={downloadPhoto1}
                      onChange={(e) => setDownloadPhoto1(e.target.value)}
                    />
                  </div>
                </li>
              </div>

              {/*  СТОИМОСТЬ АРЕНДЫ  */}
              <li>
                <div>
                  <span className="span-zvezda">*</span> Стоимость аренды:{' '}
                  <input
                    className="input-number"
                    type="number"
                    max="9999"
                    step="any"
                    placeholder="0.00"
                    value={costArends}
                    disabled={giveFree || yourCost}
                    onChange={(e) => setCostArendsHandler(e)}
                  />
                  <span className="span-valuts">
                    <b>BYN</b>
                  </span>
                  <select className="option-razdel" onChange={(e) => setTimeArends(e.target.value)}>
                    <option />
                    <option value="HOUR">Час</option>
                    <option value="DAY" selected>
                      Сутки
                    </option>
                    <option value="WEEK">Неделя</option>
                    <option value="MONTH">Месяц</option>
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
                        max="999999999"
                        className="input-number"
                        value={yearCreate}
                        onChange={(e) => setYearCreateHandler(e)}
                      />
                    </div>
                  </li>

                  {/*  ПРОБЕГ  */}
                  <li>
                    <div>
                      Пробег:{' '}
                      <input
                        type="text"
                        className="input-text"
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
                        max="9999"
                        step="any"
                        placeholder="0.00"
                        className="input-number"
                        value={cost}
                        onChange={(e) => setCostHandler(e)}
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
                        <option value="1ч">1ч</option>
                        <option value="2ч">2ч</option>
                        <option value="3ч">3ч</option>
                        <option value="4ч">4ч</option>
                        <option value="5ч">5ч</option>
                        <option value="6ч">6ч</option>
                        <option value="7ч">7ч</option>
                        <option value="8ч">8ч</option>
                        <option value="9ч">9ч</option>
                        <option value="10ч">10ч</option>
                        <option value="11ч">11ч</option>
                        <option value="12ч" selected>
                          12ч
                        </option>
                        <option value="13ч">13ч</option>
                        <option value="14ч">14ч</option>
                        <option value="15ч">15ч</option>
                        <option value="16ч">16ч</option>
                        <option value="17ч">17ч</option>
                        <option value="18ч">18ч</option>
                        <option value="19ч">19ч</option>
                        <option value="20ч">20ч</option>
                        <option value="21ч">21ч</option>
                        <option value="22ч">22ч</option>
                        <option value="23ч">23ч</option>
                        <option value="24ч">24ч</option>
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
                        <option value="1ч">1ч</option>
                        <option value="2ч">2ч</option>
                        <option value="3ч">3ч</option>
                        <option value="4ч">4ч</option>
                        <option value="5ч">5ч</option>
                        <option value="6ч">6ч</option>
                        <option value="7ч">7ч</option>
                        <option value="8ч">8ч</option>
                        <option value="9ч">9ч</option>
                        <option value="10ч">10ч</option>
                        <option value="11ч">11ч</option>
                        <option value="12ч" selected>
                          12ч
                        </option>
                        <option value="13ч">13ч</option>
                        <option value="14ч">14ч</option>
                        <option value="15ч">15ч</option>
                        <option value="16ч">16ч</option>
                        <option value="17ч">17ч</option>
                        <option value="18ч">18ч</option>
                        <option value="19ч">19ч</option>
                        <option value="20ч">20ч</option>
                        <option value="21ч">21ч</option>
                        <option value="22ч">22ч</option>
                        <option value="23ч">23ч</option>
                        <option value="24ч">24ч</option>
                      </select>
                    </div>
                  </li>

                  {/*  ВРЕМЯ ПОДГОТОВКИ ТОВАРА  */}
                  <li>
                    <div>
                      Укажите время подготовки товара:{' '}
                      <input
                        type="number"
                        max="999"
                        className="input-number"
                        value={podgotovkaTime}
                        onChange={(e) => setPodgotovkaTimeHandler(e)}
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
                          onChange={(e) => pickupHandler(e.target.value)}
                        />
                      </div>
                    </div>

                    {/*  ПРИВЕЗУ/ЗАБЕРУ САМ  */}
                    <div>
                      Привезу и заберу сам{' '}
                      <input
                        type="checkbox"
                        className="input-checkbox"
                        value={takeAway}
                        onChange={(e) => takeAwayHandler(e.target.value)}
                      />
                    </div>

                    {takeAway && (
                      <div>
                        Выберите услугу: {'  '}
                        <select
                          className="option-razdel"
                          onChange={(e) => setTypeService(e.target.value)}>
                          <option />
                          <option value="paid">Указать стоимость</option>
                          <option value="free">Бесплатно</option>
                        </select>
                        {typeService === 'paid' && (
                          <span>
                            {' '}
                            в сумме:{' '}
                            <input
                              type="number"
                              max="9999"
                              step="any"
                              placeholder="0.00"
                              className="input-number"
                              value={indicateCost}
                              onChange={(e) => setIndicateCostHandler(e)}
                            />
                            <span className="span-valuts">
                              <b>BYN</b>
                            </span>
                          </span>
                        )}
                      </div>
                    )}

                    {/*  ОТПРАВЛЮ  */}

                    <span style={{ marginRight: '45px' }}>
                      Отправлю{' '}
                      <input
                        type="checkbox"
                        className="input-checkbox"
                        checked={yourSend}
                        onChange={(e) => yourSendHandler(e.target.value)}
                      />
                    </span>

                    {yourSend && (
                      <span>
                        <span style={{ margin: ' 0 20px' }}>
                          такси{' '}
                          <input
                            className="input-checkbox"
                            type="checkbox"
                            value={taxi}
                            onChange={(e) => taxiHandler(e.target.value)}
                          />
                        </span>

                        <span style={{ margin: ' 0 20px' }}>
                          курьер{' '}
                          <input
                            className="input-checkbox"
                            type="checkbox"
                            value={courier}
                            onChange={(e) => courierHandler(e.target.value)}
                          />
                        </span>

                        <span style={{ margin: ' 0 20px' }}>
                          почта{' '}
                          <input
                            className="input-checkbox"
                            type="checkbox"
                            value={pochta}
                            onChange={(e) => pochtaHandler(e.target.value)}
                          />
                        </span>

                        {(taxi || courier || pochta) && (
                          <div onChange={(e) => radioHandler(e)}>
                            <span style={{ marginRight: '20px' }}>
                              За счёт Владельца{'  '}
                              <input
                                type="radio"
                                className="input-checkbox"
                                value="OWNER"
                                name="radio_choice"
                              />
                            </span>

                            <span>
                              За счёт Рентера{'  '}
                              <input
                                type="radio"
                                className="input-checkbox"
                                value="RENTER"
                                name="radio_choice"
                              />
                            </span>
                          </div>
                        )}
                      </span>
                    )}
                  </li>

                  <hr />

                  {/*  ДОГОВОР/РАСПИСКА  */}
                  <li>
                    <div>
                      "Договор/расписка обязательны":{' '}
                      <input
                        type="checkbox"
                        className="input-checkbox"
                        checked={contract}
                        onChange={(e) => contractHandler(e.target.value)}
                      />
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
                          checked={insurance}
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
                              <option value="PERIOD">За весь период</option>
                              <option value="DAY">За сутки</option>
                            </select>{' '}
                          </span>

                          {(insuranceTime === 'DAY' || insuranceTime === 'PERIOD') && (
                            <span>
                              {' '}
                              в сумме:{' '}
                              <input
                                type="number"
                                max="9999"
                                step="any"
                                placeholder="0.00"
                                className="input-number"
                                value={insuranceSumma}
                                onChange={(e) => setInsuranceSummaHandler(e)}
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
                                  max="9999"
                                  step="any"
                                  placeholder="0.00"
                                  className="input-number"
                                  value={franchiseSumma}
                                  onChange={(e) => setFranchiseSummaHandler(e)}
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
                        checked={pladge}
                        onChange={pladgeHandler}
                      />{' '}
                      {pladge && (
                        <span>
                          {' '}
                          в сумме:{' '}
                          <input
                            className="input-number"
                            type="number"
                            max="9999"
                            step="any"
                            placeholder="0.00"
                            value={pledgePrice}
                            onChange={(e) => pledgePriceHandler(e)}
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
                            <option value="DRYCLEANING">Химчистка</option>
                            <option value="CLEANING">Уборка</option>
                            <option value="WASHINGUP">Мытьё</option>
                          </select>

                          {(optionServiceSbor === 'DRYCLEANING' ||
                            optionServiceSbor === 'CLEANING' ||
                            optionServiceSbor === 'WASHINGUP') && (
                            <span>
                              {' '}
                              Сумма:{' '}
                              <input
                                type="number"
                                className="input-number"
                                max="9999"
                                step="any"
                                placeholder="0.00"
                                value={summaServiceSbor}
                                onChange={(e) => setSummaServiceSborHandler(e)}
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
                        checked={readySell}
                        onChange={readySellHandler}
                      />{' '}
                    </div>
                  </li>
                </div>
              )}

              {/*  КНОПКИ ОТПРАВИТЬ / ОЧИСТИТЬ  */}

              <div className="button_load">
                <input
                  onClick={sendHandler}
                  type="button"
                  name="a"
                  value="ОТПРАВИТЬ"
                  className="button_loading"
                />{' '}
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
