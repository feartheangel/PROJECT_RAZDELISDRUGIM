import React, {useState} from 'react';
import  './PlaseItem.css';




const PlaceItem = () =>{


    // СОСТОЯНИЯ ЧЕКБОКСОВ

    // ПУНКТ 6  ПРЕДЛОЖИТЬ ЦЕНУ
    const chekYourCost=()=>{
        setYourCost(!yourCost)
    }
    // ПУНКТ 16 СТРАХОВКА
    const insuranceHandler =()=>{
        setInsurance(!insurance)
    }
    //ПУНКТ 9 БЕСПЛАТНО
    const giveFreeHandler =()=>{
        setGiveFree(!giveFree)
    }
    // ПУНКТ 17  ПРЕДУСМОТРЕН ЗАЛОГ
    const pladgeHandler =()=>{
        setPladge(!pladge)
    }
    //ПУНКТ САМОВЫВОЗ / ПРИВЕЗУ ЗАБЕРУ / ОТПРАВЛЮ
    const pickupHandler=()=>{
        setPickUp(!pickUp)
    }
    const takeAwayHandler =()=>{
        setTakeAway(!takeAway)
    }
    const yourSendHandler =()=>{
        setYourSend(!yourSend)
    }


    const readySellHandler =()=>{
        setReadySell(!readySell)
    }
    //  ФРАНШИЗА
    const franchiseHandler =()=>{
        setFranchise(!franchise)
    }
    // СЕРВИСНЫЙ СБОР
    const serviceFeeHandler =()=>{
        setServiceFee(!serviceFee)
    }
    const showHandler =()=>{
        setShowFunctions(!showFunctions)
    }


    // ОТПРАВКА - ВЛАДЕЛЕЦ - РЕНТЕР
    const vladelecHandler =()=>{
        setVladelec(!vladelec)
    }
    const renterHandler =()=>{
        setRenter(!renter)
    }







    // СОСТОЯНИЯ ОПЦИЙ


    //ВИД КАТЕГОРИИ - ОПЦИИ
    const categoryHandler =(e)=>{
        setCategory((e.target.value))
    }


    //ВИД УСЛУГИ - ОПЦИИ
    const typeServiceHandler = (e)=>{
        setTypeService((e.target.value))
    }

    //КТО ДОСТАВЛЯЕТ - ОПЦИИ
    const WhoDeliveryHandler = (e)=>{
        setWhoDelivery((e.target.value))
    }

    //СЕРВИСНЫЙ СБОР  - ОПЦИИ
    const serviceHandler =(e)=>{
        setOptionServiceSbor(e.target.value)
    }






    //СОСТОЯНИЯ ДЛЯ ХРАНЕНИЯ ДАННЫХ ИЗ ПОЛЕЙ

    //РАЗДЕЛ
    const[category, setCategory] = useState();
    //ВЫБОР КАТЕГОРИИ
    const[viborCategory, setViborCategory]= useState();
    //НАИМЕНОВАНИЕ ВЕЩИ
    const[nameItem, setNameItem] = useState();
    // Я ПРЕДЛАГАЮ(ОПИСАНИЕ)
    const[description, setDescription] = useState();
    //ЗАГРУЗКА ФОТО
    const[downloadPhoto1, setDownloadPhoto1] = useState();
    const[downloadPhoto2, setDownloadPhoto2] = useState();
    const[downloadPhoto3, setDownloadPhoto3] = useState();
    const[downloadPhoto4, setDownloadPhoto4] = useState();
    const[downloadPhoto5, setDownloadPhoto5] = useState();

    const[yearCreate, setYearCreate] = useState();
    const[mileAge, setMileAge] = useState();
    const[cost, setCost] = useState();


    const[timeArends, setTimeArends] = useState();
    const[costArends, setCostArends] = useState();
    const[giveFree, setGiveFree] = useState();
    const[readySell, setReadySell] = useState();


    const[yourCost, setYourCost]= useState();
    const[yourSum, setYourSum]= useState();

    // ВИД ДОСТАВКИ - ТИП СЕРВИСА - КТО ДОСТАВЛЯЕТ
    const[pickUp, setPickUp] = useState();
    const[takeAway,setTakeAway]=useState();
    const[yourSend, setYourSend]=useState();

    const[typeDelivery, setTypeDelivery] = useState();
    const[typeService, setTypeService] = useState();

    const[whoDelivery, setWhoDelivery] = useState();
    const[vladelec, setVladelec] = useState();
    const[renter, setRenter] = useState();


    //ВРЕМЯ ПОЛУЧЕНИЯ И ВОЗВРАТА
    const[timeReceipt, setTimeReceipt] = useState();
    const[returnTime, setReturnTime] = useState();

    // ВРЕМЯ ПОДГОТОВКИ ТОВАРА - ЧИСЛО

    //ДОГОВОР - СТРАХОВКА - ФРАНШИЗА
    const[contract, setContract] = useState();
    const[insurance,setInsurance] = useState();
    const[franchise, setFranchise] = useState();

    //ПРЕДУСМОТРЕН ЗАЛОГ
    const[pladge, setPladge] = useState();

    // СЕРВИСНЫЙ СБОР - ЧЕКБОКС
    const[serviceFee, setServiceFee] = useState();
    const[optionServiceSbor, setOptionServiceSbor] = useState();

    // ДОПОЛНИТЕЛЬНЫЕ ПАРАМЕТРЫ - ОТКРЫТЬ/ЗАКРЫТЬ
    const[showFunctions, setShowFunctions] = useState();






    console.log(category)
    // console.log(vladelec)





    return(
        <div className= "PlaseItem" >

            <div className="conteiner">

                <form encType ="multipart/form-data" method="post">
                    <ol>
                        <h2> РАЗМЕСТИ СВОЮ ВЕЩЬ </h2>


                        {/*  РАЗДЕЛ  */}
                        <div>
                            <li>

                                <span className="span-zvezda">*</span> Выберите раздел: {' '}

                                <select
                                    onChange={(e)=>categoryHandler(e)}
                                    className="option-razdel"
                                >
                                    <option />
                                    <option value="property" style={{textAlign:'center', marginLeft:'10px'}}>Недвижимость</option>
                                    <option value="auto">Авто и транспорт</option>
                                    <option>Бытовая техника</option>
                                    <option>Компьютерная техника</option>
                                    <option>Телефоны и планшеты</option>
                                    <option>Электроника</option>
                                    <option>Женский гардероб</option>
                                </select>
                            </li>
                        </div>



                        {/*  КАТЕГОРИЯ  */}
                        <div>
                            <li>
                                <span className="span-zvezda">*</span> Выберите категорию: {' '}

                                {category==="property"&&
                                <select
                                    className="option-razdel"
                                    value={viborCategory}
                                    onChange={(e) => setViborCategory(e.target.value)}
                                >

                                    <option/>
                                    <option>Дома</option>
                                    <option>Квартиры</option>
                                    <option>Помещения</option>
                                    <option>Гараж</option>
                                </select>
                                }
                                {category==="auto"&&
                                <select
                                    className="option-razdel"
                                    value={viborCategory}
                                    onChange={(e) => setViborCategory(e.target.value)}>

                                    <option/>
                                    <option>Легковые</option>
                                    <option>Грузовые</option>
                                    <option>Мото</option>
                                </select>
                                }

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
                                    onChange={(e)=>setNameItem(e.target.value)}
                                />
                            </li>
                        </div>


                        {/*  Я ПРЕДЛАГАЮ  */}
                        <div className="div111">
                            <li>
                                <span className="span-zvezda">*</span>  Я предлагаю: {' '}
                                <p>
                                <textarea type ="text"
                                          title="Опишите кратко наименование того, что предлагаете..."
                                          minLength="2"
                                          maxLength="10"
                                          value ={description}
                                          onChange={(e)=>setDescription(e.target.value)}
                                />
                                </p>
                            </li>
                        </div>



                        {/*  ЗАГРУЗКА ФОТО  */}
                        <div>
                            <li>
                                <span className="span-zvezda">*</span>  Загрузите фото: {' '}

                                <div>
                                    <input
                                        className="input_photo"
                                        type="file"
                                        multiple
                                        accept="image/*,image/jpeg"
                                        value={downloadPhoto1}
                                        onChange={(e)=>setDownloadPhoto1(e.target.value)}
                                    />
                                </div>


                                {downloadPhoto1 && <div>
                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*,image/jpeg"
                                        value={downloadPhoto2}
                                        onChange={(e) => setDownloadPhoto2(e.target.value)}
                                    />
                                </div>
                                }


                                {downloadPhoto2 &&
                                <div>
                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*,image/jpeg"
                                        value={downloadPhoto3}
                                        onChange={(e) => setDownloadPhoto3(e.target.value)}
                                    />
                                </div>
                                }


                                {downloadPhoto3 &&
                                <div>
                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*,image/jpeg"
                                        value={downloadPhoto4}
                                        onChange={(e) => setDownloadPhoto4(e.target.value)}
                                    />
                                </div>
                                }


                                {downloadPhoto4 &&
                                <div>
                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*,image/jpeg"
                                        value={downloadPhoto5}
                                        onChange={(e) => setDownloadPhoto5(e.target.value)}
                                    />
                                </div>
                                }

                            </li>
                        </div>




                        {/*  СТОИМОСТЬ АРЕНДЫ  */}
                        <li>
                            <div>
                                <span className="span-zvezda">*</span>  Стоимость аренды: {' '}
                                <input
                                    className="input-number"
                                    type ="number"
                                    min="0"
                                    max="999999999"
                                    step="0.1"
                                    value={costArends}
                                    disabled={giveFree}
                                    onChange={(e)=>setCostArends(e.target.value)}
                                />
                                <span className="span-valuts"><b>BYN</b></span>

                                <select
                                    className="option-razdel"
                                    value={timeArends}
                                    onChange={(e)=>setTimeArends(e.target.value)}
                                >
                                    <option />
                                    <option>Час</option>
                                    <option>Сутки</option>
                                    <option>Неделя</option>
                                    <option>Месяц</option>
                                </select>
                            </div>


                            {/*  БЕСПЛАТНО  */}
                            <div>
                                Бесплатно {' '}
                                <input
                                    className="input-checkbox"
                                    type="checkbox"
                                    value={giveFree}
                                    onChange={giveFreeHandler}

                                /> {' '}
                            </div>


                            {/*  ПРЕДЛОЖИТЬ ЦЕНУ  */}
                            <div>
                                Предложить цену {' '}
                                <input
                                    className="input-checkbox"
                                    type="checkbox"
                                    value={yourCost}
                                    onChange={chekYourCost}

                                /> {' '}

                                {/*{*/}
                                {/*    yourCost&&<div>*/}
                                {/*        Укажите сумму:{' '}*/}
                                {/*        <input*/}
                                {/*            className="input-number"*/}
                                {/*            min="0"*/}
                                {/*            max="999999999"*/}
                                {/*            step="0.1"*/}
                                {/*            type ="number"*/}
                                {/*            value={yourSum}*/}
                                {/*            onChange={(e)=>setYourSum(e.target.value)}*/}
                                {/*        />*/}
                                {/*        <span className="span-valuts"><b>BYN</b></span>*/}
                                {/*    </div>*/}
                                {/*}*/}
                            </div>

                        </li>


                        <hr style={{marginBottom:'10px'}}/>


                        {/*--------------------------------- ДОПОЛНИТЕЛЬНЫЕ ПАРАМЕТРЫ ---------------------------------------*/}



                        <div id="dop_parametr">
                            <p > Дополнительные параметры{'  '}
                                <input
                                    id="dop_parametr"
                                    className="input-checkbox"
                                    type="checkbox"
                                    value={showFunctions}
                                    onClick={showHandler} />
                            </p>
                        </div>



                        {/*  КЛЮЧЕВЫЕ СЛОВА  */}

                        {showFunctions&&<div>

                            <li>
                                <div>
                                    Ключевые слова:{'  '}
                                    <input
                                        title="Укажите через запятую ключевые слова..."
                                        type="text"
                                        className="input-text"
                                    />
                                </div>
                            </li>

                            {/*  ГОД ВЫПУСКА  */}

                            <li>
                                <div>
                                    Год выпуска: {' '}
                                    <input type ="number"
                                           min="0"
                                           max="999999999"
                                           className="input-number"
                                           value={yearCreate}
                                           onChange={(e)=>setYearCreate(e.target.value)} />
                                </div>
                            </li>


                            {/*  ПРОБЕГ  */}
                            <li>
                                <div>
                                    Пробег: {' '}
                                    <input type ="number"
                                           min="0"
                                           max="999999999"
                                           step="0.1"
                                           className="input-number"
                                           value={mileAge}
                                           onChange={(e)=>setMileAge(e.target.value)} />
                                </div>
                            </li>


                            {/*  СТОИМОСТЬ ЕСЛИ ОЦЕНИВАЕТСЯ  */}
                            <li>
                                <div>
                                    Стоимость(если оценивается): {' '}
                                    <input type ="number"
                                           min="0"
                                           max="999999999"
                                           step="0.1"
                                           className="input-number"
                                           value={cost}
                                           onChange={(e)=>setCost(e.target.value)}
                                    />
                                    <span className="span-valuts"><b>BYN</b></span>

                                </div>
                            </li>





                            {/*  ВРЕМЯ ПОЛУЧЕНИЯ  */}
                            <li>
                                <div >
                                    Время получения(не ранее): {' '}
                                    <select
                                        className="select-clock"
                                        value={timeReceipt}
                                        onChange={(e)=>setTimeReceipt(e.target.value)}

                                    >
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
                                        <option selected value="12ч">12ч</option>
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
                                <div >
                                    Время возврата(не позднее): {' '}
                                    <select
                                        className="select-clock"
                                        value={returnTime}
                                        onChange={(e)=>setReturnTime(e.target.value)}

                                    >
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
                                        <option selected value={setReturnTime} >12ч</option>
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
                                <div >
                                    Укажите время подготовки товара: {' '}
                                    <input
                                        type = "number"
                                        min="0"
                                        max="999"
                                        className="input-number"
                                    />

                                    <select
                                        className="select-clock"
                                        value={timeArends}
                                        onChange={(e)=>setTimeArends(e.target.value)}
                                    >
                                        <option />
                                        <option>Час</option>
                                        <option>Сутки</option>
                                        <option>Неделя</option>
                                        <option>Месяц</option>
                                    </select>
                                </div>
                            </li>


                            {/*  ВИД ДОСТАВКИ  */}
                            <li>
                                <div>
                                    Вид доставки: {' '}
                                    <div>
                                        Самовывоз {' '}
                                    <input
                                        type="checkbox"
                                        className="input-checkbox"
                                        value={pickUp}
                                        onChange={(e)=>pickupHandler(e.target.value)}
                                    >
                                    </input>
                                    </div>

                                    {pickUp&&
                                    <div>
                                        Город:{'  '}
                                        <input
                                            type="text"
                                            className="input-text"
                                        />
                                        {'  '} Улица:{'  '}
                                        <input
                                            type="text"
                                            className="input-text"
                                        />
                                    </div>
                                    }
                                </div>



                                <div>
                                    Привезу и заберу сам {' '}
                                    <input
                                        type="checkbox"
                                        className="input-checkbox"
                                        value={takeAway}
                                        onChange={(e)=>takeAwayHandler(e.target.value)}
                                    >
                                    </input>
                                </div>


                                    {takeAway&&
                                <div>
                                        Выберите услугу: {'  '}
                                        <select
                                            className="option-razdel"
                                            onChange={(e)=>typeServiceHandler(e)}
                                        >
                                            <option/>
                                            <option value="Указать стоимость">Указать стоимость</option>
                                            <option value="Бесплатно">Бесплатно</option>
                                        </select>


                                        {typeService ==="Указать стоимость"&&
                                        <div>
                                            Укажите стоимость:{'  '}
                                            <input
                                                type="number"
                                                min="0"
                                                max="999999999"
                                                step="0.1"
                                                className="input-number"
                                            />
                                        </div>
                                        }
                                </div>
                                    }

                                <div>
                                    Отправлю {' '}
                                    <input
                                        type="checkbox"
                                        className="input-checkbox"
                                        value={yourSend}
                                        onChange={(e)=>yourSendHandler(e.target.value)}
                                    >
                                    </input>
                                </div>


                                    {yourSend&&
                                    <div>
                                        Выберите способ отправки: {'  '}
                                        <select
                                            className="option-razdel"
                                            onChange={(e)=>WhoDeliveryHandler(e)}
                                        >
                                            <option/>
                                            <option value="Такси">Такси</option>
                                            <option value="Курьер">Курьер</option>
                                            <option value="Почта">Почта</option>
                                        </select>

                                        {(whoDelivery ==="Такси" || whoDelivery ==="Курьер" ||
                                            whoDelivery ==="Почта")
                                        && <div>
                                            За счёт Владельца:{'  '}
                                            <input
                                                type="checkbox"
                                                className="input-checkbox"
                                                value={vladelec}
                                                disabled={renter}
                                                onChange={(e)=> vladelecHandler(e.target.value)}

                                            />

                                            <div>
                                                За счёт Рентера:{'  '}
                                                <input
                                                    type="checkbox"
                                                    className="input-checkbox"
                                                    value={renter}
                                                    disabled={vladelec}
                                                    onChange={(e)=> renterHandler(e.target.value)}
                                                />
                                            </div>
                                        </div>

                                        }
                                    </div>
                                    }

                            </li>

                            <hr/>


                            {/*  ДОГОВОР/РАСПИСКА  */}
                            <li>
                                <div>
                                    Договор/Расписка: {' '}
                                    <input
                                        type="checkbox"
                                        className="input-checkbox"
                                        value={contract}
                                        onChange={(e)=>setContract(e.target.value)}
                                    >
                                    </input>
                                </div>
                            </li>



                            {/*  СТРАХОВАНИЕ  */}
                            <li>
                                <div>
                                    Страхование {' '}

                                    <input
                                        type="checkbox"
                                        className="input-checkbox"
                                        value={insurance}
                                        onChange={insuranceHandler}
                                    /> {' '}
                                </div>

                                {insurance&& <p style={{marginTop:'20px'}}>
                                    <select
                                        className="option-razdel"
                                    >
                                        <option/>
                                        <option>За весь период</option>
                                        <option>За сутки</option>
                                    </select>

                                    {' '}Введите сумму:{' '}
                                    <input
                                        className="input-number"
                                        min="0"
                                        max="999999999"
                                        step="0.1"
                                        type ="number"
                                    />
                                    <span className="span-valuts"><b>BYN</b></span>

                                    <br/>
                                    Франшиза{' '}
                                    <input style={{marginTop:'20px'}}
                                           type="checkbox"
                                           className="input-checkbox"
                                           value={franchise}
                                           onChange={franchiseHandler}
                                    /> {' '}

                                </p>

                                }
                            </li>



                            {/*  ЗАЛОГ  */}
                            <li>
                                <div>
                                    Предусмотрен залог {' '}
                                    <input
                                        type="checkbox"
                                        className="input-checkbox"
                                        value={pladge}
                                        onChange={pladgeHandler}

                                    /> {' '}

                                    {pladge&&<p style={{marginTop:'10px'}}>
                                        {' '}Введите сумму:{' '}
                                        <input
                                            className="input-number"
                                            type ="number"
                                            min="0"
                                            max="999999999"
                                            step="0.1"
                                        />
                                        <span className="span-valuts"><b>BYN</b></span>
                                    </p>
                                    }
                                </div>
                            </li>


                            {/*  СЕРВИСНЫЙ СБОР  */}
                            <li>
                                <div>
                                    Сервисный сбор {' '}
                                    <input
                                        type="checkbox"
                                        className="input-checkbox"
                                        value={serviceFee}
                                        onChange={serviceFeeHandler}

                                    /> {' '}

                                    {serviceFee&&<p style={{marginTop:'10px'}}>

                                        <select
                                            onChange={(e)=>serviceHandler(e)}
                                            className="option-razdel "
                                        >
                                            <option />
                                            <option value="Всегда">Всегда</option>
                                            <option value="Возврат вещи">Возврат вещи</option>
                                        </select>

                                        {' '} Сумма:{' '}
                                        <input
                                            type ="number"
                                            className="input-number"
                                            min="0"
                                            max="999999999"
                                            step="0.1"
                                        />
                                        <span className="span-valuts"><b>BYN</b></span>
                                    </p>
                                    }
                                </div>

                                {/*  Готов продать  */}
                                <div>
                                    Готов продать {' '}
                                    <input
                                        className="input-checkbox"
                                        type="checkbox"
                                        value={readySell}
                                        onChange={readySellHandler}

                                    /> {' '}
                                </div>
                            </li>
                        </div> }


                        {/*  КНОПКИ ОТПРАВИТЬ / ОЧИСТИТЬ  */}

                        <div>
                            <input type="submit" name="a"  value="ОТПРАВИТЬ" className="button_loading"
                            /> {' '}
                            <input type="reset" name="a" value="ОЧИСТИТЬ" className="button_loading"
                            /> {' '}
                        </div>


                    </ol>
                </form>



            </div>
        </div>
    )
}

export default PlaceItem


// >>>>>>> cfdfc54e3d075bb2fa81276bb3d8580b63dcd5bc
// >>>>>>> c1e5f603489f2723f82055383cba07427b1b9267