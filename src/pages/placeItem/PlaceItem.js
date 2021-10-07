import React, { useState } from "react";
import { Header, Footer } from "../../components/index";
import { useSelector, useDispatch } from "react-redux";
import {
  setAdresses,
  setQueryStarted,
  setQueryDone,
  reloadData,
} from "../../redux/actions/userData";
import ReCAPTCHA from "react-google-recaptcha";
import { Redirect } from "react-router-dom";
import Requests from "../../http/axios-requests";
import "./PlaseItem.css";
import Vector2 from "../../img/CardThings/LeftContent/Vector2.png";

let files = [];
let resultList = [];
let parsedFiles = [];

const PlaceItem = () => {
  //конвертация байтов в размер
  function bytesToSize(bytes) {
    var sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    if (bytes == 0) return "0 Byte";
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + " " + sizes[i];
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const dispatch = useDispatch();

  //обработчик удаления фотографии
  const removePhotoHandler = (index) => {
    files.splice(index, 1);
    loadedPhotos.splice(index, 1);
    setLoadedPhotos(loadedPhotos);
    forceUpdate();
  };

  //обработчик добавления фотографий
  const photoHandler = (e) => {
    if (files.length + e.target.files.length > 5) {
      alert("Максимум 5 изображений!");
      return;
    }
    parsedFiles = Array.from(e.target.files);
    parsedFiles.forEach((file) => {
      if (file.size > 4.9e6) {
        alert("Вес одной картинки не может превышать 5 мегабайт!");
        return;
      }
      files.push(file);
      resultList.push(URL.createObjectURL(file));
    });
    setLoadedPhotos(resultList);
    forceUpdate();
    console.log(loadedPhotos);
  };

  //обрабочтик цены аренды
  const setCostArendsHandler = (e) => {
    if (e.target.value > 10000) {
      return;
    }

    if (!e.target.value.includes("-") && !e.target.value.includes("--")) {
      setCostArends(e.target.value);
    }
  };

  //обработчик года выпуска
  const setYearCreateHandler = (e) => {
    console.log(e.target.value);
    if (!e.target.value.includes("-") && !e.target.value.includes("--")) {
      setYearCreate(e.target.value);
    }
  };

  //обработчик цены продажи
  const setCostHandler = (e) => {
    if (e.target.value > 1000000) {
      return;
    }
    if (!e.target.value.includes("-") && !e.target.value.includes("--")) {
      setCost(e.target.value);
    }
  };
  //обработчик времени подготовки
  const setPodgotovkaTimeHandler = (e) => {
    if (!e.target.value.includes("-") && !e.target.value.includes("--")) {
      setPodgotovkaTime(e.target.value);
    }
  };
  //обработчик суммы за доставку
  const setIndicateCostHandler = (e) => {
    if (!e.target.value.includes("-") && !e.target.value.includes("--")) {
      setIndicateCost(e.target.value);
    }
  };
  //обработчик суммы страховки
  const setInsuranceSummaHandler = (e) => {
    if (!e.target.value.includes("-") && !e.target.value.includes("--")) {
      setInsuranceSumma(e.target.value);
    }
  };
  //обработчик суммы за франшизу
  const setFranchiseSummaHandler = (e) => {
    if (!e.target.value.includes("-") && !e.target.value.includes("--")) {
      setFranchiseSumma(e.target.value);
    }
  };
  //обработчик суммы сервисного сбора
  const setSummaServiceSborHandler = (e) => {
    console.log(e.target.value);
    if (!e.target.value.includes("-") && !e.target.value.includes("--")) {
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
    if (!e.target.value.includes("-") && !e.target.value.includes("--")) {
      setPledgePrice(e.target.value);
    }
  };

  //обработчик времени аренды
  const timeArendsHandler = (e) => {
    setTimeArends(e.target.value);
    setPrepareType(e.target.value);
  };

  const pladgeHandler = () => {
    setPladge(!pladge);
    if (cost) {
      setPledgePrice(cost);
    }
  };

  //обработчик сохранения нового адреса
  const saveNewAddress = () => {
    if (!area) {
      alert("Не указана область!");
      return;
    } else if (!locality) {
      alert("Не указан населенный пункт!");
      return;
    } else if (!street) {
      alert("Не указана улица!");
      return;
    } else if (!index) {
      alert("Не указан индекс!");
      return;
    } else if (!house && !room) {
      alert("Не указан номер дома либо помещения!");
      return;
    }

    Requests.refresh(localStorage.getItem("refresh")).then((res) => {
      localStorage.setItem("key", res.data.access);
    });

    dispatch(setQueryStarted());
    Requests.getCords(
      String(area),
      String(locality),
      String(street),
      String(house),
      String(room),
      String(index)
    )
      .then((response) => {
        if (response.status === 200) {
          Requests.createAdress(
            area,
            district,
            index,
            locality,
            street,
            house,
            body,
            flat,
            room,
            office,
            building,
            response.data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos
              .split(" ")
              .reverse()
          )
            .then((response) => {
              Requests.fetchAdresses()
                .then((response) => {
                  dispatch(setAdresses(response.data));
                  setShowAddressAddTable(false);
                  setArea("");
                  setDistrict("");
                  setIndex("");
                  setLocality("");
                  setStreet("");
                  setHouse("");
                  setBody("");
                  setFlat("");
                  setRoom("");
                  setOffice("");
                  setBuilding("");
                  dispatch(setQueryDone());
                  setAddressAdded(true);
                  setCoords([
                    response.data[response.data.length - 1].coordinates,
                    `${response.data[response.data.length - 1].city}, ${
                      response.data[response.data.length - 1].street
                    }, ${
                      response.data[response.data.length - 1].house
                        ? response.data[response.data.length - 1].house
                        : response.data[response.data.length - 1].space_room
                    }`,
                  ]);
                })
                .catch((e) => alert("Ошибка получения категорий/адресов"));
              alert("Адрес успешно добавлен в профиль!");
            })
            .catch((e) => {
              alert(
                "Не удалось подтвердить адрес, проверьте правильность ввода данных в поля."
              );
              dispatch(setQueryDone());
            });
        }
      })
      .catch((e) => {
        dispatch(setQueryDone());
        alert("Ошибка сохранения адреса!");
      });
  };

  const [redirect, setRedirect] = React.useState(false);

  //обработчик отправки формы
  const sendHandler = () => {
    if (!userData.phone_verify || !userData.email_verify) {
      alert(
        "У вас не подтвержден телефон либо почта. Это можно сделать в профиле!"
      );
      return;
    } else if (!nameItem) {
      alert("Не указано название вещи!");
      return;
    } else if (!viborCategory) {
      alert("Не указана категория!");
      return;
    } else if (!costArends && !giveFree && !yourCost) {
      alert("Не указана цена аренды!");
      return;
    } else if (!coords) {
      alert("Не указан адрес!");
      return;
    } else if (!files[0]) {
      alert("Загрузка одной картинки обязательна!");
      return;
    } else if (insurance && !insuranceTime) {
      alert("Не указан период страховки!");
      return;
    } else if (insurance && !insuranceSumma) {
      alert("Не указана сумма страховки!");
      return;
    } else if (pladge && !pledgePrice) {
      alert("Не указана сумма залога!");
      return;
    } else if (franchise && !franchiseSumma) {
      alert("Не указана сумма франшизы!");
      return;
    } else if (serviceSbor && !optionServiceSbor) {
      alert("Не указан тип сервисного сбора!");
      return;
    } else if (serviceSbor && !summaServiceSbor) {
      alert("Не указана сумма сервисного сбора!");
      return;
    } else if (takeAway && !typeService && !indicateCost) {
      alert("Не указана сумма за личную доставку!");
      return;
    } else if (!captchaPassed) {
      alert("Капча не пройдена!");
      return;
    }

    dispatch(setQueryStarted());
    const formData = new FormData();
    files[0] && formData.append("image_1", files[0]);
    files[1] && formData.append("image_2", files[1]);
    files[2] && formData.append("image_3", files[2]);
    files[3] && formData.append("image_4", files[3]);
    files[4] && formData.append("image_5", files[4]);

    Requests.createItem(
      Number(viborCategory),
      String(capitalizeFirstLetter(nameItem)),
      String(capitalizeFirstLetter(description)),
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
      Boolean(typeService),
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
      String(capitalizeFirstLetter(naznacheniye)),
      String(capitalizeFirstLetter(sostav)),
      Boolean(giveFree),
      Boolean(yourCost),
      String(capitalizeFirstLetter(yourColor)),
      Boolean(franchise),
      Number(franchiseSumma),
      String(artikul),
      String(inventoryNumber),
      formData,
      coords[0],
      String(prepareType),
      String(coords[1])
    )
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          alert("Успешно добавлено в базу!");
          setRedirect(<Redirect to="/" />);
          dispatch(setQueryDone());
          dispatch(reloadData(!reload));
        }
        console.log(response);
      })
      .catch((response) => {
        dispatch(setQueryDone());
        alert("Ошибка!");
      });
  };

  //СОСТОЯНИЯ ДЛЯ ХРАНЕНИЯ ДАННЫХ ИЗ ПОЛЕЙ
  //хранение типа доставки
  const [deliveryType, setDeliveryType] = useState("NONE");

  //РАЗДЕЛ - опции
  const [razdel, setRazdel] = useState("");

  // КАТЕГОРИИ - опции
  const [viborCategory, setViborCategory] = useState("");

  //открытие блока с первью картинок
  const [photoField, setPhotoField] = React.useState(false);

  //НАИМЕНОВАНИЕ ВЕЩИ
  const [nameItem, setNameItem] = useState("");

  // Я ПРЕДЛАГАЮ(ОПИСАНИЕ)
  const [description, setDescription] = useState("");

  //ЗАГРУЗКА ФОТО
  const [loadedPhotos, setLoadedPhotos] = React.useState();
  //СТОИМОСТЬ АРЕНДЫ / ВРЕМЯ АРЕНДЫ
  const [costArends, setCostArends] = useState("");
  const [timeArends, setTimeArends] = useState("DAY");

  //БЕСПЛАТНО
  const [giveFree, setGiveFree] = useState(false);

  //ПРЕДЛОЖИТЬ ЦЕНУ
  const [yourCost, setYourCost] = useState(false);

  // ДОПОЛНИТЕЛЬНЫЕ ПАРАМЕТРЫ - ОТКРЫТЬ/ЗАКРЫТЬ
  const [showFunctions, setShowFunctions] = useState();

  // {/*--------------------------------- ДОПОЛНИТЕЛЬНЫЕ ПАРАМЕТРЫ ---------------------------------------*/}

  //КЛЮЧЕВЫЕ СЛОВА
  const [yourKeyWord, setYourKeyWord] = useState("");

  //СОСТАВ-КОМЛЕКТНОСТЬ
  const [sostav, setSostav] = useState("");

  //НАЗНАЧЕНИЕ
  const [naznacheniye, setNaznacheniye] = useState("");

  //АРТИКУЛ
  const [artikul, setArtikul] = useState("");

  //ИНВЕНТАРНЫЙ НОМЕР
  const [inventoryNumber, setInventoryNumber] = useState("");

  //ЦВЕТ
  const [yourColor, setYourColor] = useState("");

  //ГОД ВЫПУСКА
  const [yearCreate, setYearCreate] = useState("");

  //ПРОБЕГ
  const [mileAge, setMileAge] = useState("");

  //СТОИМОСТЬ ЕСЛИ ОЦЕНИВАЕТСЯ
  const [cost, setCost] = useState("");

  //ВРЕМЯ ПОЛУЧЕНИЯ И ВОЗВРАТА
  const [timeReceipt, setTimeReceipt] = useState("12ч");
  const [returnTime, setReturnTime] = useState("12ч");

  //ВРЕМЯ ПОДГОТОВКИ ТОВАРА
  const [podgotovkaTime, setPodgotovkaTime] = useState(" ");
  const [prepareType, setPrepareType] = React.useState("DAY");

  // ВИД ДОСТАВКИ - САМОВЫВОЗ
  const [pickUp, setPickUp] = useState(true);

  // ВИД ДОСТАВКИ - ЗАБЕРУ ПРИВЕЗУ САМ ( ОПЦИИ - выбор и стомость )
  const [takeAway, setTakeAway] = useState("");

  const [typeService, setTypeService] = useState(false);
  const [indicateCost, setIndicateCost] = useState(false);

  //ОТПРАВЛЮ
  const [yourSend, setYourSend] = useState(false);

  const [taxi, setTaxi] = useState();
  const [courier, setCourier] = useState();
  const [pochta, setPochta] = useState();

  const [radio, setRadio] = useState("OWNER");

  //методы доставки отправкой
  const [willSendWays, setWillSendWays] = React.useState("NONE");

  //ДОГОВОР - СТРАХОВКА - ФРАНШИЗА
  const [contract, setContract] = useState();

  const [insurance, setInsurance] = useState();
  const [insuranceTime, setInsuranceTime] = useState("");
  const [insuranceSumma, setInsuranceSumma] = useState("");

  //ФРАНШИЗА - СУММА
  const [franchise, setFranchise] = useState();
  const [franchiseSumma, setFranchiseSumma] = useState("");

  //ПРЕДУСМОТРЕН ЗАЛОГ
  const [pladge, setPladge] = useState();
  const [pledgePrice, setPledgePrice] = useState("");

  // СЕРВИСНЫЙ СБОР - ЧЕКБОКС/ОПЦИИ/СУММА
  const [serviceSbor, setServiceSbor] = useState("");
  const [optionServiceSbor, setOptionServiceSbor] = useState("");
  const [summaServiceSbor, setSummaServiceSbor] = useState("");

  //ГОТОВ ПРОДАТЬ
  const [readySell, setReadySell] = useState();

  //обработка адресов
  const [showAddressAddTable, setShowAddressAddTable] = React.useState(false);

  const [area, setArea] = React.useState();
  const [locality, setLocality] = React.useState();
  const [district, setDistrict] = React.useState();
  const [street, setStreet] = React.useState();
  const [index, setIndex] = React.useState();
  const [house, setHouse] = React.useState();
  const [body, setBody] = React.useState();
  const [flat, setFlat] = React.useState();
  const [room, setRoom] = React.useState();
  const [office, setOffice] = React.useState();
  const [building, setBuilding] = React.useState();

  const [coords, setCoords] = React.useState();

  const [addressAdded, setAddressAdded] = React.useState(false);
  const [captchaPassed, setCaptchaPassed] = React.useState(false);
  const [ignored, forceUpdate] = React.useReducer((x) => x + 1, 0);

  React.useEffect(() => {
    if (!localStorage.getItem("key")) {
      window.location.href = "/";
    }
  }, []);

  //очистка полей при отмене выбора
  React.useEffect(() => {
    if (giveFree === true || yourCost === true) {
      setCostArends(false);
    }
    if (takeAway === false) {
      setTypeService(false);
      setIndicateCost(false);
    }
    if (yourSend === false) {
      setTaxi(false);
      setCourier(false);
      setPochta(false);
    }

    if (insurance === false) {
      setInsuranceTime("NONE");
      setInsuranceSumma(null);
      setFranchise(false);
      setFranchiseSumma(null);
    }

    if (pladge === false) setPledgePrice(false);

    if (franchise === false) setFranchiseSumma(false);

    if (serviceSbor === false) {
      setOptionServiceSbor("NONE");
      setSummaServiceSbor(null);
    }

    if (typeService) setIndicateCost(false);
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
        setDeliveryType("1, 2, 3");
      } else if (pickUp && takeAway) {
        setDeliveryType("1, 2");
      } else if (pickUp && yourSend) {
        setDeliveryType("1, 3");
      } else if (pickUp) {
        setDeliveryType("1");
      }
    } else if (takeAway) {
      if (takeAway && yourSend) {
        setDeliveryType("2, 3");
      } else if (takeAway) {
        setDeliveryType("2");
      }
    } else if (yourSend) {
      setDeliveryType("3");
    } else setDeliveryType("NONE");
  }, [pickUp, takeAway, yourSend]);

  //определение способов доставки отправкой
  React.useEffect(() => {
    if (taxi) {
      if (taxi && courier && pochta) {
        setWillSendWays("1, 2, 3");
      } else if (taxi && courier) {
        setWillSendWays("1, 2");
      } else if (taxi && pochta) {
        setWillSendWays("1, 3");
      } else if (taxi) {
        setWillSendWays("1");
      }
    } else if (courier) {
      if (courier && pochta) {
        setWillSendWays("2, 3");
      } else if (courier) {
        setWillSendWays("2");
      }
    } else if (pochta) {
      setWillSendWays("3");
    } else setWillSendWays("NONE");
    console.log(willSendWays);
  }, [taxi, courier, pochta]);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Добавление: #разделисдругим";
  }, []);

  const { items, isLoaded } = useSelector(({ items }) => items);
  const { addresses, requestActive, userData, reload } = useSelector(
    ({ userData }) => userData
  );

  const { maxAddressesCount, serviceIds } = useSelector(
    ({ settings }) => settings
  );

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

  //выделяем адреса
  const addressesFormatted = [];
  isLoaded &&
    addresses.map((item, index) => {
      addressesFormatted.push([
        `${item.city}, ${item.street}, ${
          item.house ? item.house : item.apartment ? item.apartment : ""
        }`,
        item.coordinates,
      ]);
    });

  return (
    <div className="place-item-wrapper">
      <Header />
      <div className="PlaseItem">
        <div className="conteiner">
          <form className="conteiner_form">
            <p className="conteiner-main-p">Подать объявление</p>
            {/*  НАИМЕНОВАНИЕ  */}
            <div className="add-item-input-wrapper">
              <label className="add-item-input-label">
                Название вещи/услуги{" "}
                <span className="add-item-span-zvezda">*</span>{" "}
                <img
                  title="Назовите свое имущество так, чтобы пользователям было легко ее найти"
                  src={Vector2}
                  className="img_vector2"
                  alt=""
                />
              </label>
              {redirect}
              <input
                placeholder="Например: ноутбук"
                type="text"
                className="add-item-input-text"
                value={nameItem}
                onChange={(e) => setNameItem(e.target.value)}
              />
            </div>
            {/*  РАЗДЕЛ  */}
            <div className="add-item-input-wrapper">
              <label className="add-item-input-label">
                Выберите раздел <span className="add-item-span-zvezda">*</span>{" "}
                <img
                  title="Укажите раздел и категорию имущества, чтобы пользователям было легче найти его в нашем каталоге"
                  src={Vector2}
                  className="img_vector2"
                  alt=""
                />
              </label>
              <select
                onChange={(e) => setRazdel(e.target.value)}
                className="add-item-select-input"
              >
                <option>Не выбрано</option>
                {isLoaded &&
                  [].concat
                    .apply(Object.entries(chapters))
                    .map((chapter, index) => (
                      <option key={index} value={chapter[1]}>
                        {chapter[0]}
                      </option>
                    ))}
              </select>
            </div>
            {/*  КАТЕГОРИЯ  */}
            <div className="add-item-input-wrapper">
              <label className="add-item-input-label">
                Выберите категорию{" "}
                <span className="add-item-span-zvezda">*</span>
              </label>
              <select
                className="add-item-select-input"
                value={viborCategory}
                onChange={(e) => setViborCategory(e.target.value)}
              >
                <option style={{ width: "200px" }}>Не выбрано</option>
                {isLoaded &&
                  [].concat
                    .apply(Object.entries(categories))
                    .map((category, index) => (
                      <option key={index} value={category[1]}>
                        {category[0]}
                      </option>
                    ))}
              </select>
            </div>
            {/*  Я ПРЕДЛАГАЮ  */}
            <div className="add-item-input-wrapper">
              <label className="add-item-input-label">
                Описание вещи/услуги
              </label>
              <div>
                <textarea
                  placeholder="Например: процессор Intel core i5, видеокарта GeForce GTX 1050ti"
                  className="add-item-textarea"
                  title="Опишите кратко наименование того, что предлагаете..."
                  minLength="0"
                  maxLength="1000"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
            {/*  ЗАГРУЗКА ФОТО  */}
            <div>
              <div>
                <input
                  id="photo_input"
                  className="input_photo"
                  type="file"
                  accept="image/jpg, image/jpeg, image/png,"
                  multiple
                  onChange={(e) => photoHandler(e)}
                />
                <label
                  title="Вы можете загрузить до 5 фото, которые будут приведены к размеру 440х400 px"
                  class="upload-file__label"
                  htmlFor="photo_input"
                >
                  Добавить фото{" "}
                </label>
                <div className="add-item-photo-field">
                  <div className="add-item-photos">
                    {loadedPhotos
                      ? loadedPhotos.map((photo, index) => (
                          <div key={index} className="add-item-photo-wrapper">
                            <div
                              onClick={() => removePhotoHandler(index)}
                              className="add-item-photo-remove"
                            >
                              &times;
                            </div>
                            <img
                              className="add-item-photo"
                              key={index}
                              src={photo}
                            />
                            <div className="add-photo-info">
                              <span>{bytesToSize(files[index].size)}</span>
                            </div>
                          </div>
                        ))
                      : ""}
                  </div>
                </div>
              </div>
            </div>
            {/*  СТОИМОСТЬ АРЕНДЫ  */}
            <div className="item-add-cost-choice-wrapper" id="item_pk">
              <div
                style={{ marginRight: "5px" }}
                className="add-item-input-wrapper"
              >
                <label className="add-item-input-label">
                  Стоимость вещи/услуги{" "}
                  <span className="add-item-span-zvezda">*</span>
                </label>
                <div>
                  <input
                    className="add-item-input-number"
                    type="number"
                    max="9999"
                    step="any"
                    placeholder="0.00"
                    value={costArends}
                    disabled={giveFree || yourCost}
                    onChange={(e) => setCostArendsHandler(e)}
                  />
                </div>
              </div>
              <span className="span-valuts">BYN</span>
              <div className="add-item-input-wrapper">
                <label className="add-item-input-label">
                  Цена за <span className="add-item-span-zvezda">*</span>
                </label>
                <select
                  className="add-item-select-input__time"
                  onChange={(e) => timeArendsHandler(e)}
                >
                  <option value="HOUR">Час</option>
                  <option value="DAY" selected>
                    Сутки
                  </option>
                  <option value="WEEK">Неделя</option>
                  <option value="MONTH">Месяц</option>
                  <option value="PIECE">1 шт.</option>
                  <option value="SQUARE">1кв.м.</option>
                </select>
              </div>
              <span className="add-item-cost-or">или</span>
              <label class="checkbox-btn">
                <input
                  onChange={() => setYourCost(!yourCost)}
                  type="checkbox"
                  checked={yourCost}
                  disabled={giveFree}
                />
                <span title="Укажите этот пункт, если хотите, чтобы арендаторы сами предлагали свою цену за пользование вашим имуществом">
                  Предлагать цену
                </span>
              </label>
              <span className="add-item-cost-or">или</span>
              <label class="checkbox-btn" id="checkbox-btn2">
                <input
                  onChange={() => setGiveFree(!giveFree)}
                  type="checkbox"
                  checked={giveFree}
                  disabled={yourCost}
                />
                <span id="checkbox-btn1">
                  {" "}
                  {serviceIds && serviceIds.includes(viborCategory)
                    ? "Договорная"
                    : "Предлагать цену"}
                </span>
              </label>
            </div>
            {/*  СТОИМОСТЬ АРЕНДЫ  МОБИЛЬНАЯ ВЕРСИЯ */}
            <div
              className="item-add-cost-choice-wrapper"
              id="take_Away_adaptive"
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
              }}
            >
              <div
                style={{ marginRight: "20px" }}
                className="add-item-input-wrapper"
              >
                <label className="add-item-input-label">
                  Стоимость вещи/услуги{" "}
                  <span className="add-item-span-zvezda">*</span>
                </label>
                <div>
                  <input
                    className="add-item-input-number"
                    type="number"
                    max="9999"
                    step="any"
                    placeholder="0.00"
                    value={costArends}
                    disabled={giveFree || yourCost}
                    onChange={(e) => setCostArendsHandler(e)}
                  />
                  <span className="span-valuts">BYN</span>
                </div>
              </div>
              <div className="add-item-input-wrapper">
                <label className="add-item-input-label">
                  Цена за <span className="add-item-span-zvezda">*</span>
                </label>
                <select
                  className="add-item-select-input__time"
                  onChange={(e) => timeArendsHandler(e)}
                >
                  <option value="HOUR">Час</option>
                  <option value="DAY" selected>
                    Сутки
                  </option>
                  <option value="WEEK">Неделя</option>
                  <option value="MONTH">Месяц</option>
                  <option value="PIECE">1 шт.</option>
                  <option value="SQUARE">1кв.м.</option>
                </select>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  alignItems: "flex-start",
                }}
              >
                <label class="checkbox-btn">
                  <input
                    onChange={() => setYourCost(!yourCost)}
                    type="checkbox"
                    checked={yourCost}
                    disabled={giveFree}
                  />
                  <span title="Укажите этот пункт, если хотите, чтобы арендаторы сами предлагали свою цену за пользование вашим имуществом">
                    Предлагать цену
                  </span>
                </label>
                <span className="add-item-cost-or">или</span>
                <label class="checkbox-btn" id="checkbox-btn2">
                  <input
                    onChange={() => setGiveFree(!giveFree)}
                    type="checkbox"
                    checked={giveFree}
                    disabled={yourCost}
                  />
                  <span id="checkbox-btn1">
                    {" "}
                    {serviceIds && serviceIds.includes(viborCategory)
                      ? "Договорная"
                      : "Предлагать цену"}
                  </span>
                </label>
              </div>
            </div>
            {/* БЛОК АРЕНДА ДЛЯ ПЛАНШЕТА */}
            <div className="item-add-cost-choice-wrapper" id="item_ipad">
              <div className="item_arend_block">
                <div
                  style={{ marginRight: "5px" }}
                  className="add-item-input-wrapper"
                >
                  <label className="add-item-input-label">
                    Стоимость вещи{" "}
                    <span className="add-item-span-zvezda">*</span>
                  </label>
                  <div>
                    <input
                      className="add-item-input-number"
                      type="number"
                      max="9999"
                      step="any"
                      placeholder="0.00"
                      value={costArends}
                      disabled={giveFree || yourCost}
                      onChange={(e) => setCostArendsHandler(e)}
                    />
                  </div>
                </div>
                <span className="span-valuts">BYN</span>
                <div className="add-item-input-wrapper">
                  <label className="add-item-input-label">
                    Срок <span className="add-item-span-zvezda">*</span>
                  </label>
                  <select
                    className="add-item-select-input__time"
                    onChange={(e) => timeArendsHandler(e)}
                  >
                    <option value="HOUR">Час</option>
                    <option value="DAY" selected>
                      Сутки
                    </option>
                    <option value="WEEK">Неделя</option>
                    <option value="MONTH">Месяц</option>
                    <option value="PIECE">1 шт.</option>
                    <option value="SQUARE">1кв.м.</option>
                  </select>
                </div>
              </div>

              <div className="item_arend_block">
                <label class="checkbox-btn">
                  <input
                    onChange={() => setYourCost(!yourCost)}
                    type="checkbox"
                    checked={yourCost}
                    disabled={giveFree}
                  />
                  <span title="Укажите этот пункт, если хотите, чтобы арендаторы сами предлагали свою цену за пользование вашим имуществом">
                    {serviceIds && serviceIds.includes(viborCategory)
                      ? "Договорная"
                      : "Предлагать цену"}
                  </span>
                </label>
                <span className="add-item-cost-or">или</span>
                <label class="checkbox-btn" id="checkbox-btn2">
                  <input
                    onChange={() => setGiveFree(!giveFree)}
                    type="checkbox"
                    checked={giveFree}
                    disabled={yourCost}
                  />
                  <span id="checkbox-btn1">Бесплатно</span>
                </label>
              </div>
            </div>
            <div className="add-item-ready-sell-wrapper">
              <input
                className="add-item-input-checkbox__2"
                type="checkbox"
                id="add-item-input-checkbox__2"
                checked={readySell}
                onChange={readySellHandler}
              />
              <label
                title="Отмечая этот пункт, вы заявляете о том, что это имущество может быть продано"
                htmlFor="add-item-input-checkbox__2"
              >
                Готов продать
              </label>
            </div>
            <div className="add-item-input-wrapper">
              <label className="add-item-input-label">
                Адрес местонахождения{" "}
                <img
                  title="Введите и выберите адрес местоположения имущества, чтобы пользователям было легче найти его на карте или рядом с собой"
                  src={Vector2}
                  className="img_vector2"
                  alt=""
                />{" "}
                <span className="add-item-span-zvezda">*</span>
              </label>
              <select
                className="add-item-select-input"
                onChange={(e) => setCoords(e.target.value.split(",,"))}
              >
                <option>Не выбран</option>
                {isLoaded &&
                  addressesFormatted.map((item, index) => (
                    <option
                      selected={
                        addressAdded && index + 1 === addressesFormatted.length
                      }
                      value={`${item[1]},,${item[0]}`}
                      key={index}
                    >
                      {item[0]}
                    </option>
                  ))}
              </select>
            </div>
            {addresses.length < maxAddressesCount && (
              <div style={{ marginBottom: "20px" }} id="dop_parametr_wrapper">
                <input
                  id="dop_parametr"
                  className="add-item-input-checkbox__3"
                  type="checkbox"
                />
                <label
                  onClick={() => setShowAddressAddTable(!showAddressAddTable)}
                  htmlFor="dop_parametr"
                >
                  + Добавить другой адрес
                </label>
              </div>
            )}
            {showAddressAddTable && (
              <div className="take-away-secondary-wrapper-column">
                <div className="take-away-secondary-wrapper">
                  <div className="add-item-input-wrapper">
                    <label className="add-item-input-label">
                      Область <span className="add-item-span-zvezda">*</span>
                    </label>
                    <input
                      placeholder="Например: Минская"
                      type="text"
                      className="add-item-input-text__address"
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                    />
                  </div>

                  <div className="add-item-input-wrapper">
                    <label className="add-item-input-label">
                      Населенный пункт{" "}
                      <span className="add-item-span-zvezda">*</span>
                    </label>
                    <input
                      placeholder="Например: Минск"
                      type="text"
                      className="add-item-input-text__address"
                      value={locality}
                      onChange={(e) => setLocality(e.target.value)}
                    />
                  </div>

                  <div className="add-item-input-wrapper">
                    <label className="add-item-input-label">Район</label>
                    <input
                      placeholder="Например: Советский"
                      type="text"
                      className="add-item-input-text__address"
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                    />
                  </div>
                </div>

                <div className="take-away-secondary-wrapper">
                  <div className="add-item-input-wrapper">
                    <label className="add-item-input-label">
                      Улица/Проспект/Переулок{" "}
                      <span className="add-item-span-zvezda">*</span>
                    </label>
                    <input
                      placeholder="Например: улица Сурганова/проспект Независмости/переулок Освобождения"
                      type="text"
                      className="add-item-input-text__address__street"
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                    />
                  </div>

                  <div className="add-item-input-wrapper">
                    <label className="add-item-input-label">
                      Индекс<span className="add-item-span-zvezda">*</span>
                    </label>
                    <input
                      placeholder="Например: 225417"
                      type="text"
                      className="add-item-input-text__address"
                      value={index}
                      onChange={(e) => setIndex(e.target.value)}
                    />
                  </div>
                </div>

                {/* КОМП ВЕРСИЯ */}
                <div
                  className="take-away-secondary-wrapper"
                  id="take_Away_komp"
                >
                  <div
                    className="take-away-secondary-wrapper"
                    id="take-away-secondary-wrapper"
                  >
                    <div className="add-item-input-wrapper">
                      <label className="add-item-input-label">
                        Дом <span className="add-item-span-zvezda">*</span>
                      </label>
                      <input
                        disabled={room || office || building}
                        type="text"
                        className="add-item-input-text__address__house"
                        value={house}
                        onChange={(e) => setHouse(e.target.value)}
                      />
                    </div>

                    <div
                      className="take-away-secondary-wrapper"
                      id="take-away-secondary-wrapper"
                    >
                      <div className="add-item-input-wrapper">
                        <label className="add-item-input-label">Корпус</label>
                        <input
                          disabled={room || office || building}
                          type="text"
                          className="add-item-input-text__address__house"
                          value={body}
                          onChange={(e) => setBody(e.target.value)}
                        />
                      </div>

                      <div className="add-item-input-wrapper">
                        <label className="add-item-input-label">Квартира</label>
                        <input
                          disabled={room || office || building}
                          type="text"
                          className="add-item-input-text__address__house"
                          value={flat}
                          onChange={(e) => setFlat(e.target.value)}
                        />
                      </div>
                    </div>
                    <span
                      style={{ marginRight: "30px" }}
                      className="add-item-cost-or__secondary"
                    >
                      или
                    </span>
                    <div
                      className="take-away-secondary-wrapper"
                      id="take-away-secondary-wrapper"
                    >
                      <div className="add-item-input-wrapper">
                        <label className="add-item-input-label">
                          Помещение{" "}
                          <span className="add-item-span-zvezda">*</span>
                        </label>
                        <input
                          disabled={house || body || flat}
                          type="text"
                          className="add-item-input-text__address__house"
                          value={room}
                          onChange={(e) => setRoom(e.target.value)}
                        />
                      </div>

                      <div
                        className="take-away-secondary-wrapper"
                        id="take-away-secondary-wrapper"
                      >
                        <div className="add-item-input-wrapper">
                          <label className="add-item-input-label">Офис</label>
                          <input
                            disabled={house || body || flat}
                            type="text"
                            className="add-item-input-text__address__house"
                            value={office}
                            onChange={(e) => setOffice(e.target.value)}
                          />
                        </div>

                        <div className="add-item-input-wrapper">
                          <label className="add-item-input-label">
                            Строение
                          </label>
                          <input
                            disabled={house || body || flat}
                            type="text"
                            className="add-item-input-text__address__house"
                            value={building}
                            onChange={(e) => setBuilding(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* АДАПТИВКА */}
                <div
                  className="take-away-secondary-wrapper"
                  id="take_Away_adaptive"
                >
                  <div
                    className="take-away-secondary-wrapper"
                    id="take-away-secondary-wrapper"
                  >
                    <div
                      className="add-item-input-wrapper"
                      id="add_item_gl_margin"
                    >
                      <label className="add-item-input-label">
                        Дом <span className="add-item-span-zvezda">*</span>
                      </label>
                      <input
                        disabled={room || office || building}
                        type="text"
                        className="add-item-input-text__address__house"
                        value={house}
                        onChange={(e) => setHouse(e.target.value)}
                      />
                    </div>

                    <div
                      className="add-item-input-wrapper"
                      id="add_item_gl_margin"
                    >
                      <label className="add-item-input-label">Корпус</label>
                      <input
                        disabled={room || office || building}
                        type="text"
                        className="add-item-input-text__address__house"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                      />
                    </div>

                    <div className="add-item-input-wrapper">
                      <label className="add-item-input-label">Квартира</label>
                      <input
                        disabled={room || office || building}
                        type="text"
                        className="add-item-input-text__address__house"
                        value={flat}
                        onChange={(e) => setFlat(e.target.value)}
                      />
                    </div>

                    <span
                      style={{ marginRight: "30px", display: "none" }}
                      className="add-item-cost-or__secondary"
                    >
                      или
                    </span>
                    <div
                      className="take-away-secondary-wrapper"
                      id="take-away-secondary-wrapper"
                    >
                      <div
                        className="add-item-input-wrapper"
                        id="add_item_gl_margin"
                      >
                        <label className="add-item-input-label">
                          Помещение{" "}
                          <span className="add-item-span-zvezda">*</span>
                        </label>
                        <input
                          disabled={house || body || flat}
                          type="text"
                          className="add-item-input-text__address__house"
                          value={room}
                          onChange={(e) => setRoom(e.target.value)}
                        />
                      </div>
                      <div
                        className="add-item-input-wrapper"
                        id="add_item_gl_margin"
                      >
                        <label className="add-item-input-label">Офис</label>
                        <input
                          disabled={house || body || flat}
                          type="text"
                          className="add-item-input-text__address__house"
                          value={office}
                          onChange={(e) => setOffice(e.target.value)}
                        />
                      </div>

                      <div className="add-item-input-wrapper">
                        <label className="add-item-input-label">Строение</label>
                        <input
                          disabled={house || body || flat}
                          type="text"
                          className="add-item-input-text__address__house"
                          value={building}
                          onChange={(e) => setBuilding(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* АДАПТИВКА ПЛАНШЕТ ВЕРСИЯ */}
                <div
                  className="take-away-secondary-wrapper"
                  id="take_Away_ipad"
                >
                  <div
                    className="take-away-secondary-wrapper"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                    }}
                  >
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <div
                        className="add-item-input-wrapper"
                        id="add_item_gl_margin"
                      >
                        <label className="add-item-input-label">
                          Дом <span className="add-item-span-zvezda">*</span>
                        </label>
                        <input
                          disabled={room || office || building}
                          type="text"
                          className="add-item-input-text__address__house"
                          value={house}
                          onChange={(e) => setHouse(e.target.value)}
                        />
                      </div>

                      <div
                        className="add-item-input-wrapper"
                        id="add_item_gl_margin"
                      >
                        <label className="add-item-input-label">Корпус</label>
                        <input
                          disabled={room || office || building}
                          type="text"
                          className="add-item-input-text__address__house"
                          value={body}
                          onChange={(e) => setBody(e.target.value)}
                        />
                      </div>

                      <div className="add-item-input-wrapper">
                        <label className="add-item-input-label">Квартира</label>
                        <input
                          disabled={room || office || building}
                          type="text"
                          className="add-item-input-text__address__house"
                          value={flat}
                          onChange={(e) => setFlat(e.target.value)}
                        />
                      </div>
                    </div>

                    <span
                      style={{ marginRight: "30px", display: "flex" }}
                      className="add-item-cost-or__secondary"
                    >
                      или
                    </span>

                    <div
                      className="take-away-secondary-wrapper"
                      style={{ display: "flex", flexDirection: "row" }}
                    >
                      <div
                        className="add-item-input-wrapper"
                        id="add_item_gl_margin"
                      >
                        <label className="add-item-input-label">
                          Помещение{" "}
                          <span className="add-item-span-zvezda">*</span>
                        </label>
                        <input
                          disabled={house || body || flat}
                          type="text"
                          className="add-item-input-text__address__house"
                          value={room}
                          onChange={(e) => setRoom(e.target.value)}
                        />
                      </div>
                      <div
                        className="add-item-input-wrapper"
                        id="add_item_gl_margin"
                      >
                        <label className="add-item-input-label">Офис</label>
                        <input
                          disabled={house || body || flat}
                          type="text"
                          className="add-item-input-text__address__house"
                          value={office}
                          onChange={(e) => setOffice(e.target.value)}
                        />
                      </div>

                      <div className="add-item-input-wrapper">
                        <label className="add-item-input-label">Строение</label>
                        <input
                          disabled={house || body || flat}
                          type="text"
                          className="add-item-input-text__address__house"
                          value={building}
                          onChange={(e) => setBuilding(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <input
                  disabled={requestActive}
                  id="save_address"
                  className={
                    requestActive
                      ? "add-item-save-new-address-button disabled"
                      : "add-item-save-new-address-button"
                  }
                  type="button"
                  value={requestActive ? "ОТПРАВКА..." : "Сохранить адрес"}
                  onClick={saveNewAddress}
                />
              </div>
            )}
            {/*  КНОПКА ДОП. ПАРАМЕТРЫ  */}
            <div id="dop_parametr_wrapper_mobile">
              <input
                id="dop_parametr"
                className="add-item-input-checkbox__3"
                type="checkbox"
                value={showFunctions}
              />
              <label onClick={showFunctionsHandler} htmlFor="dop_parametr">
                Дополнительные параметры
              </label>
            </div>
            {/*--------------------------------- ДОПОЛНИТЕЛЬНЫЕ ПАРАМЕТРЫ ---------------------------------------*/}
            {showFunctions && (
              <div className="secondary-parameters">
                {/*  КЛЮЧЕВЫЕ СЛОВА  */}

                <div className="add-item-input-wrapper">
                  <label className="add-item-input-label">
                    Ключевые слова{" "}
                    <img
                      title="Введите ключевые слова, опираясь на которые, мы в том числе, сможем осуществлять поиск"
                      src={Vector2}
                      className="img_vector2"
                      alt=""
                    />
                  </label>
                  <input
                    placeholder="Например: компьютер, ноутбук, техника"
                    title="Укажите через запятую ключевые слова..."
                    type="text"
                    className="add-item-input-text"
                    value={yourKeyWord}
                    onChange={(e) => setYourKeyWord(e.target.value)}
                  />
                </div>

                {/*  СОСТАВ/КОМПЛЕКТНОСТЬ  */}

                <div className="add-item-input-wrapper">
                  <label className="add-item-input-label">
                    Состав/комплектность
                  </label>
                  <input
                    placeholder="Например: ноутбук, мышь, подставка"
                    type="text"
                    className="add-item-input-text"
                    value={sostav}
                    onChange={(e) => setSostav(e.target.value)}
                  />
                </div>

                {/*  НАЗНАЧЕНИЕ  */}

                <div className="add-item-input-wrapper">
                  <label className="add-item-input-label">Назначение</label>
                  <div>
                    <textarea
                      placeholder="Например: для работы с графическим дизайном"
                      className="add-item-textarea"
                      value={naznacheniye}
                      onChange={(e) => setNaznacheniye(e.target.value)}
                    />
                  </div>
                </div>

                {/*  АРТИКУЛ  */}

                <div className="add-item-input-wrapper">
                  <label className="add-item-input-label">
                    Артикул{" "}
                    <img
                      title="Поле не обязательное, но, возможно, оно поможет отличить одну вещь от другой"
                      src={Vector2}
                      className="img_vector2"
                      alt=""
                    />
                  </label>
                  <input
                    placeholder="Например: RK-260"
                    type="text"
                    className="add-item-input-text"
                    value={artikul}
                    onChange={(e) => setArtikul(e.target.value)}
                  />
                </div>

                {/*  ИНВЕНТАРНЫЙ НОМЕР  */}

                <div className="add-item-input-wrapper">
                  <label className="add-item-input-label">
                    Инвентарный номер{" "}
                    <img
                      title="Поле не обязательное, но, возможно, оно поможет отличить одну вещь от другой"
                      src={Vector2}
                      className="img_vector2"
                      alt=""
                    />
                  </label>
                  <input
                    placeholder="Например: 154A"
                    type="text"
                    className="add-item-input-text"
                    value={inventoryNumber}
                    onChange={(e) => setInventoryNumber(e.target.value)}
                  />
                </div>

                {/*  Цвет  */}

                <div className="add-item-input-wrapper">
                  <label className="add-item-input-label">Цвет</label>
                  <input
                    placeholder="Например: серебристый"
                    type="text"
                    className="add-item-input-text"
                    value={yourColor}
                    onChange={(e) => setYourColor(e.target.value)}
                  />
                </div>

                {/*  ГОД ВЫПУСКА  */}

                <div className="add-item-input-wrapper">
                  <label className="add-item-input-label">Год выпуска</label>
                  <input
                    placeholder="Например: 2015"
                    type="number"
                    max="999999999"
                    className="add-item-input-text"
                    value={yearCreate}
                    onChange={(e) => setYearCreateHandler(e)}
                  />
                </div>

                {/*  ПРОБЕГ  */}

                <div className="add-item-input-wrapper">
                  <label className="add-item-input-label">
                    Пробег{" "}
                    <img
                      title="Укажите тут пробег, износ, возраст, что может указать на уровень антикварности вашего имущества"
                      src={Vector2}
                      className="img_vector2"
                      alt=""
                    />
                  </label>
                  <input
                    placeholder="Например: 1 год"
                    type="text"
                    className="add-item-input-text"
                    value={mileAge}
                    onChange={(e) => setMileAge(e.target.value)}
                  />
                </div>

                {/*  СТОИМОСТЬ ЕСЛИ ОЦЕНИВАЕТСЯ  */}

                <div className="add-item-input-wrapper">
                  <label className="add-item-input-label">
                    Стоимость вещи (если оценивается){" "}
                    <img
                      title="Укажите тут, во что вы оцениваете имущество. Это может быть использовано для определения суммы залога"
                      src={Vector2}
                      className="img_vector2"
                      alt=""
                    />
                  </label>
                  <input
                    type="number"
                    max="9999"
                    step="any"
                    placeholder="0.00"
                    className="add-item-input-text"
                    value={cost}
                    onChange={(e) => setCostHandler(e)}
                  />
                </div>

                {/*  ВРЕМЯ ПОЛУЧЕНИЯ  */}
                <div className="add-item-time-block-wrapper">
                  <div className="add-item-input-wrapper">
                    <label className="add-item-input-label">
                      Время получения <br id="br_gl" /> (не позднее){" "}
                      <img
                        title="Укажите, с какого времени вам было бы удобно предоставить имущество в пользование"
                        src={Vector2}
                        className="img_vector2"
                        alt=""
                      />
                    </label>
                    <select
                      className="add-item-select-clock"
                      onChange={(e) => setTimeReceipt(e.target.value)}
                    >
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

                  {/*  ВРЕМЯ ВОЗВРАТА  */}

                  <div className="add-item-input-wrapper">
                    <label className="add-item-input-label">
                      Время возврата <br id="br_gl" /> (не позднее){" "}
                      <img
                        title="Укажите, до какого времени вам хотелось бы получить имущество назад"
                        src={Vector2}
                        className="img_vector2"
                        alt=""
                      />
                    </label>
                    <select
                      className="add-item-select-clock"
                      onChange={(e) => setReturnTime(e.target.value)}
                    >
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
                </div>

                {/*  ВРЕМЯ ПОДГОТОВКИ ТОВАРА  */}
                <div className="take-away-secondary-wrapper">
                  <div className="add-item-input-wrapper">
                    <label className="add-item-input-label">
                      Время подготовки вещи{" "}
                      <img
                        title="Если между возвратом имущества и выдачей его новому арендатору вам потребуется время на подготовку – то укажите его тут"
                        src={Vector2}
                        className="img_vector2"
                        alt=""
                      />
                    </label>
                    <input
                      placeholder="Например: 2"
                      type="number"
                      max="999"
                      className="add-item-input-text"
                      value={podgotovkaTime}
                      onChange={(e) => setPodgotovkaTimeHandler(e)}
                    />
                  </div>
                  <div className="add-item-input-wrapper">
                    <label className="add-item-input-label">
                      В чем считаем?
                    </label>
                    <select
                      className="add-item-select-input__time"
                      onChange={(e) => setPrepareType(e.target.value)}
                      disabled={giveFree || yourCost}
                    >
                      <option value="NONE" selected={prepareType === "NONE"}>
                        Не выбрано
                      </option>
                      <option value="HOUR" selected={prepareType === "HOUR"}>
                        Час(-ов)
                      </option>
                      <option value="DAY" selected={prepareType === "DAY"}>
                        Сутки(-ок)
                      </option>
                      <option value="WEEK" selected={prepareType === "WEEK"}>
                        Неделя(-ль)
                      </option>
                      <option value="MONTH" selected={prepareType === "MONTH"}>
                        Месяц(-ев)
                      </option>
                    </select>
                  </div>
                </div>

                {/*  ВИД ДОСТАВКИ - САМОВЫВОЗ - ПРИВЕЗУ/ЗАБЕРУ - ОТПРАВКА */}
                <label className="add-item-input-label">
                  Вид доставки{" "}
                  <img
                    title="Выберите тут возможны для вас способ получения имущества, либо возможные варианты для доставки или отправки"
                    src={Vector2}
                    className="img_vector2"
                    alt=""
                  />
                </label>
                <div className="checkbox-btn secondary">
                  <input
                    type="checkbox"
                    className="input-checkbox"
                    checked={pickUp}
                  />
                  <span onClick={(e) => pickupHandler(e.target.value)}>
                    Самовывоз
                  </span>
                </div>

                {/*  ПРИВЕЗУ/ЗАБЕРУ САМ  */}
                <div className="add-item-delivery-type-wrapper">
                  <div className="checkbox-btn secondary">
                    <input
                      type="checkbox"
                      className="input-checkbox"
                      checked={takeAway}
                    />
                    <span onClick={(e) => takeAwayHandler(e.target.value)}>
                      Привезу и заберу сам
                    </span>
                  </div>

                  {takeAway && (
                    <div
                      className="take-away-secondary-wrapper"
                      id="take-away-secondary-wrapper"
                    >
                      <div className="checkbox-btn secondary">
                        <input
                          type="checkbox"
                          className="input-checkbox"
                          checked={typeService}
                        />
                        <span onClick={() => setTypeService(!typeService)}>
                          Бесплатно
                        </span>
                      </div>
                      <span className="add-item-cost-or__secondary">или</span>
                      <span className="add-item-input-label__lower">
                        Указать стоимость
                      </span>
                      <input
                        disabled={typeService}
                        type="number"
                        max="9999"
                        step="any"
                        placeholder="0.00"
                        className="add-item-input-number__secondary"
                        value={indicateCost}
                        onChange={(e) => setIndicateCostHandler(e)}
                      />
                      <span className="span-valuts">BYN</span>
                    </div>
                  )}
                </div>

                {/*  ОТПРАВЛЮ  */}
                <span className="take-away-secondary-wrapper">
                  <div className="take-away-secondary-wrapper-column">
                    <div className="take-away-secondary-wrapper">
                      <div className="checkbox-btn secondary">
                        <input
                          type="checkbox"
                          className="input-checkbox"
                          checked={yourSend}
                        />
                        <span onClick={(e) => yourSendHandler(e.target.value)}>
                          Отправлю
                        </span>
                      </div>

                      {yourSend && (
                        <span
                          className="take-away-secondary-wrapper"
                          id="take-away-secondary-wrapper"
                        >
                          <div
                            className="checkbox-btn secondary"
                            id="checkbox-btn-margin"
                          >
                            <input
                              type="checkbox"
                              className="input-checkbox"
                              checked={taxi}
                            />
                            <span onClick={(e) => taxiHandler(e.target.value)}>
                              Такси
                            </span>
                          </div>

                          <div
                            className="checkbox-btn secondary"
                            id="checkbox-btn-margin"
                          >
                            <input
                              type="checkbox"
                              className="input-checkbox"
                              checked={courier}
                            />
                            <span
                              onClick={(e) => courierHandler(e.target.value)}
                            >
                              Курьер
                            </span>
                          </div>

                          <div className="checkbox-btn secondary">
                            <input
                              type="checkbox"
                              className="input-checkbox"
                              checked={pochta}
                            />
                            <span
                              onClick={(e) => pochtaHandler(e.target.value)}
                            >
                              Почта
                            </span>
                          </div>
                        </span>
                      )}
                    </div>

                    {(taxi || courier || pochta) && (
                      <div
                        className="add-item-radio-wrapper"
                        onChange={(e) => radioHandler(e)}
                      >
                        <span class="form_radio_btn">
                          <input
                            defaultChecked
                            id="radio-1"
                            type="radio"
                            name="radio_choice"
                            value="OWNER"
                          />
                          <label for="radio-1">За счёт Владельца</label>
                        </span>

                        <span class="form_radio_btn">
                          <input
                            id="radio-2"
                            type="radio"
                            name="radio_choice"
                            value="RENTER"
                          />
                          <label for="radio-2">За счёт Рентера</label>
                        </span>
                      </div>
                    )}
                  </div>
                </span>

                {/*  ДОГОВОР/РАСПИСКА  */}
                <div className="add-item-gurantee-wrapper">
                  <label className="add-item-input-label">Гарантии</label>
                  <div className="checkbox-btn secondary">
                    <input
                      type="checkbox"
                      className="input-checkbox"
                      checked={contract}
                    />
                    <span
                      title="Выделите этот пункт, если для сдачи имущества в аренду вы непременно предложите заключить письменный договор"
                      onClick={(e) => contractHandler(e.target.value)}
                    >
                      Договор/расписка обязательны
                    </span>
                  </div>

                  {/*  СТРАХОВАНИЕ  */}
                  <div
                    className="take-away-secondary-wrapper"
                    id="take_Away_komp"
                  >
                    <div className="take-away-secondary-wrapper-column">
                      <div className="take-away-secondary-wrapper">
                        <div className="checkbox-btn secondary">
                          <input
                            type="checkbox"
                            className="input-checkbox"
                            checked={insurance}
                          />
                          <span
                            title="Укажите этот пункт, если вы будете страховать имущество, и укажите, сколько это будет стоить, чтобы мы добавили сумму страховки к стоимости аренды"
                            onClick={insuranceHandler}
                          >
                            Страхование
                          </span>
                        </div>
                        {insurance && (
                          <div className="take-away-secondary-wrapper">
                            <div
                              className="add-item-radio-wrapper"
                              onChange={(e) => setInsuranceTime(e.target.value)}
                            >
                              <span class="form_radio_btn">
                                <input
                                  id="radio-3"
                                  type="radio"
                                  name="radio_choice_ins"
                                  value="PERIOD"
                                />
                                <label for="radio-3">За весь период</label>
                              </span>

                              <span class="form_radio_btn">
                                <input
                                  id="radio-4"
                                  type="radio"
                                  name="radio_choice_ins"
                                  value="DAY"
                                />
                                <label for="radio-4">За сутки</label>
                              </span>
                            </div>
                            {(insuranceTime === "PERIOD" ||
                              insuranceTime === "DAY") && (
                              <span>
                                <label className="add-item-input-label__lower">
                                  В сумме
                                </label>
                                <input
                                  type="number"
                                  max="9999"
                                  step="any"
                                  placeholder="0.00"
                                  className="add-item-input-number__secondary"
                                  value={insuranceSumma}
                                  onChange={(e) => setInsuranceSummaHandler(e)}
                                />
                                <span className="span-valuts">BYN</span>
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                      {insurance && (
                        <span className="take-away-secondary-wrapper">
                          <div className="checkbox-btn secondary">
                            <input
                              type="checkbox"
                              className="input-checkbox"
                              checked={franchise}
                            />
                            <span
                              title="Если страхование будет с франшизой – укажите сумму, чтобы мы смогли ее добавить к стоимости залога"
                              onClick={franchiseHandler}
                            >
                              Франшиза
                            </span>
                          </div>
                          {franchise && (
                            <span>
                              <label className="add-item-input-label__lower">
                                В сумме
                              </label>
                              <input
                                type="number"
                                max="9999"
                                step="any"
                                placeholder="0.00"
                                className="add-item-input-number__secondary"
                                value={franchiseSumma}
                                onChange={(e) => setFranchiseSummaHandler(e)}
                              />
                              <span className="span-valuts">BYN</span>
                            </span>
                          )}
                        </span>
                      )}
                    </div>
                  </div>

                  {/*  СТРАХОВАНИЕ  - ПЛАНШЕТ БЛОК */}
                  <div className="take-away-secondary-wrapper" id="item_ipad">
                    <div className="take-away-secondary-wrapper-column">
                      <div
                        className="take-away-secondary-wrapper"
                        style={{ alignItems: "baseline" }}
                      >
                        <div className="checkbox-btn secondary">
                          <input
                            type="checkbox"
                            className="input-checkbox"
                            checked={insurance}
                          />
                          <span
                            title="Укажите этот пункт, если вы будете страховать имущество, и укажите, сколько это будет стоить, чтобы мы добавили сумму страховки к стоимости аренды"
                            onClick={insuranceHandler}
                          >
                            Страхование
                          </span>
                        </div>
                        {insurance && (
                          <div
                            className="take-away-secondary-wrapper"
                            style={{ flexWrap: "wrap" }}
                          >
                            <div
                              className="add-item-radio-wrapper"
                              onChange={(e) => setInsuranceTime(e.target.value)}
                            >
                              <span class="form_radio_btn">
                                <input
                                  id="radio-3"
                                  type="radio"
                                  name="radio_choice_ins"
                                  value="PERIOD"
                                />
                                <label for="radio-3">За весь период</label>
                              </span>

                              <span class="form_radio_btn">
                                <input
                                  id="radio-4"
                                  type="radio"
                                  name="radio_choice_ins"
                                  value="DAY"
                                />
                                <label for="radio-4">За сутки</label>
                              </span>
                            </div>
                            {(insuranceTime === "PERIOD" ||
                              insuranceTime === "DAY") && (
                              <span>
                                <label className="add-item-input-label__lower">
                                  В сумме
                                </label>
                                <input
                                  type="number"
                                  max="9999"
                                  step="any"
                                  placeholder="0.00"
                                  className="add-item-input-number__secondary"
                                  value={insuranceSumma}
                                  onChange={(e) => setInsuranceSummaHandler(e)}
                                />
                                <span className="span-valuts">BYN</span>
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                      {insurance && (
                        <span className="take-away-secondary-wrapper">
                          <div className="checkbox-btn secondary">
                            <input
                              type="checkbox"
                              className="input-checkbox"
                              checked={franchise}
                            />
                            <span
                              title="Если страхование будет с франшизой – укажите сумму, чтобы мы смогли ее добавить к стоимости залога"
                              onClick={franchiseHandler}
                            >
                              Франшиза
                            </span>
                          </div>
                          {franchise && (
                            <span>
                              <label className="add-item-input-label__lower">
                                В сумме
                              </label>
                              <input
                                type="number"
                                max="9999"
                                step="any"
                                placeholder="0.00"
                                className="add-item-input-number__secondary"
                                value={franchiseSumma}
                                onChange={(e) => setFranchiseSummaHandler(e)}
                              />
                              <span className="span-valuts">BYN</span>
                            </span>
                          )}
                        </span>
                      )}
                    </div>
                  </div>

                  {/*  ЗАЛОГ  */}

                  <div className="take-away-secondary-wrapper">
                    <div className="checkbox-btn secondary">
                      <input
                        type="checkbox"
                        className="input-checkbox"
                        checked={pladge}
                      />
                      <span onClick={pladgeHandler}>Залог</span>
                    </div>
                    {pladge && (
                      <span>
                        <label className="add-item-input-label__lower">
                          В сумме
                        </label>
                        <input
                          className="add-item-input-number__secondary"
                          type="number"
                          max="9999"
                          step="any"
                          placeholder="0.00"
                          value={pledgePrice}
                          onChange={(e) => pledgePriceHandler(e)}
                        />
                        <span className="span-valuts">BYN</span>
                      </span>
                    )}
                  </div>

                  {/*  СЕРВИСНЫЙ СБОР  */}

                  <div
                    className="take-away-secondary-wrapper"
                    id="take_Away_komp"
                  >
                    <div className="checkbox-btn secondary">
                      <input
                        type="checkbox"
                        className="input-checkbox"
                        checked={serviceSbor}
                      />
                      <span
                        title="Если после возврата вещи вам придется ее обслужить – укажите тут сумму сервисного сбора – мы добавим ее к стоимости аренды"
                        onClick={serviceSborHandler}
                      >
                        Сервисный сбор
                      </span>
                    </div>
                    {serviceSbor && (
                      <span>
                        <div className="take-away-secondary-wrapper">
                          <div
                            className="add-item-radio-wrapper"
                            onChange={(e) =>
                              setOptionServiceSbor(e.target.value)
                            }
                          >
                            <span class="form_radio_btn">
                              <input
                                id="radio-5"
                                type="radio"
                                name="radio_choice_serv"
                                value="DRYCLEANING"
                              />
                              <label for="radio-5">Химчистка</label>
                            </span>

                            <span class="form_radio_btn">
                              <input
                                id="radio-6"
                                type="radio"
                                name="radio_choice_serv"
                                value="CLEANING"
                              />
                              <label for="radio-6">Уборка</label>
                            </span>

                            <span class="form_radio_btn">
                              <input
                                id="radio-7"
                                type="radio"
                                name="radio_choice_serv"
                                value="WASHINGUP"
                              />
                              <label for="radio-7">Мытьё</label>
                            </span>
                          </div>
                          {(optionServiceSbor === "DRYCLEANING" ||
                            optionServiceSbor === "CLEANING" ||
                            optionServiceSbor === "WASHINGUP") && (
                            <span>
                              <label className="add-item-input-label__lower">
                                В сумме
                              </label>
                              <input
                                type="number"
                                className="add-item-input-number__secondary"
                                max="9999"
                                step="any"
                                placeholder="0.00"
                                value={summaServiceSbor}
                                onChange={(e) => setSummaServiceSborHandler(e)}
                              />
                              <span className="span-valuts">BYN</span>
                            </span>
                          )}
                        </div>
                      </span>
                    )}
                  </div>

                  {/*  СЕРВИСНЫЙ СБОР - ПЛАНШЕТ ВЕРСИЯ  */}

                  <div
                    className="take-away-secondary-wrapper"
                    id="item_ipad"
                    style={{
                      flexDirection: "column",
                      alignItems: "flex-start",
                    }}
                  >
                    <div className="checkbox-btn secondary">
                      <input
                        type="checkbox"
                        className="input-checkbox"
                        checked={serviceSbor}
                      />
                      <span
                        title="Если после возврата вещи вам придется ее обслужить – укажите тут сумму сервисного сбора – мы добавим ее к стоимости аренды"
                        onClick={serviceSborHandler}
                      >
                        Сервисный сбор
                      </span>
                    </div>
                    {serviceSbor && (
                      <span>
                        <div
                          className="take-away-secondary-wrapper"
                          style={{ flexWrap: "wrap" }}
                        >
                          <div
                            className="add-item-radio-wrapper"
                            onChange={(e) =>
                              setOptionServiceSbor(e.target.value)
                            }
                          >
                            <span class="form_radio_btn">
                              <input
                                id="radio-5"
                                type="radio"
                                name="radio_choice_serv"
                                value="DRYCLEANING"
                              />
                              <label for="radio-5">Химчистка</label>
                            </span>

                            <span class="form_radio_btn">
                              <input
                                id="radio-6"
                                type="radio"
                                name="radio_choice_serv"
                                value="CLEANING"
                              />
                              <label for="radio-6">Уборка</label>
                            </span>

                            <span class="form_radio_btn">
                              <input
                                id="radio-7"
                                type="radio"
                                name="radio_choice_serv"
                                value="WASHINGUP"
                              />
                              <label for="radio-7">Мытьё</label>
                            </span>
                          </div>
                          {(optionServiceSbor === "DRYCLEANING" ||
                            optionServiceSbor === "CLEANING" ||
                            optionServiceSbor === "WASHINGUP") && (
                            <span>
                              <label className="add-item-input-label__lower">
                                В сумме
                              </label>
                              <input
                                type="number"
                                className="add-item-input-number__secondary"
                                max="9999"
                                step="any"
                                placeholder="0.00"
                                value={summaServiceSbor}
                                onChange={(e) => setSummaServiceSborHandler(e)}
                              />
                              <span className="span-valuts">BYN</span>
                            </span>
                          )}
                        </div>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}
            <ReCAPTCHA
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "20px",
              }}
              sitekey="6Lf5el4cAAAAAB-XdWip6AY2UiMzEekLzdUJN3ur"
              onChange={() => setCaptchaPassed(true)}
            />
            ,{/*  КНОПКИ ОТПРАВИТЬ / ОЧИСТИТЬ  */}
            <div className="button_load">
              <input
                disabled={requestActive}
                onClick={sendHandler}
                type="button"
                name="a"
                value={requestActive ? "ОТПРАВКА..." : "ОТПРАВИТЬ"}
                className={
                  requestActive ? "button_loading disabled" : "button_loading"
                }
              />{" "}
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PlaceItem;
