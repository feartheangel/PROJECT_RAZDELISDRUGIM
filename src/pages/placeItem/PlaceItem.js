import React, {useState} from 'react';
import  './PlaseItem.css';






const PlaceItem = () =>{


    const chekYourCost=()=>{
        setYourCost(!yourCost)
    }

    // ПУНКТ 16 СТРАХОВКА
    const insuranceHandler=()=>{
       setInsurance(!insurance)
    }
    //ПУНКТ 9 БЕСПЛАТНО
    const giveFreeHandler=()=>{
        setGiveFree(!giveFree)
    }
    const pladgeHandler =()=>{
        setPladge(!pladge)
    }

    const readySellHandler =()=>{
        setReadySell(!readySell)
    }

    const franchiseHandler =()=>{
        setFranchise(!franchise)
    }


    const serviceFeeHandler =()=>{
        setServiceFee(!serviceFee)
    }

    const serviceHandler =(e)=>{
        setOptionState(e.target.value)

    }

    //ВИД ДОСТАВКИ - ОПЦИИ
    const typeDeliveryHandler =(e)=>{
        setTypeDelivery(e.target.value)
    }
    //ВИД УСЛУГИ - ОПЦИИ
    const typeServiceHandler = (e)=>{
        setTypeService((e.target.value))
    }
    //КТО ДОСТАВЛЯЕТ - ОПЦИИ
    const WhoDeliveryHandler = (e)=>{
        setWhoDelivery((e.target.value))
    }








    //состояния для валидации, хранения данных из полей
    const[category, setCategory] = useState();
    const[nameItem, setNameItem] = useState();
    const[downloadPhoto1, setDownloadPhoto1] = useState();
    const[downloadPhoto2, setDownloadPhoto2] = useState();
    const[downloadPhoto3, setDownloadPhoto3] = useState();
    const[downloadPhoto4, setDownloadPhoto4] = useState();
    const[downloadPhoto5, setDownloadPhoto5] = useState();
    const[commentsItem, setCommentsItem] = useState();
    const[yearCreate, setYearCreate] = useState();
    const[mileAge, setMileAge] = useState();
    const[cost, setCost] = useState();
    const[costValuts, setCostValuts] = useState();

    const[timeArends, setTimeArends] = useState();
    const[costArends, setCostArends] = useState();
    const[howDay, setHowDay] = useState();
    const[giveFree, setGiveFree] = useState();
    const[readySell, setReadySell] = useState();


    const[yourCost, setYourCost]= useState();
    const[yourSum, setYourSum]= useState();
    const[valuts, setValuts] = useState();

    // ВИД ДОСТАВКИ - ТИП СЕРВИСА - КТО ДОСТАВЛЯЕТ
    const[typeDelivery, setTypeDelivery] = useState();
    const[typeService, setTypeService] = useState();
    const[whoDelivery, setWhoDelivery] = useState();

    const[timeReceipt, setTimeReceipt] = useState();
    const[returnTime, setReturnTime] = useState();
    const[contract, setContract] = useState();
    const[insurance,setInsurance] = useState();
    const[franchise, setFranchise] = useState();

    const[pladge, setPladge] = useState();
    const[serviceFee, setServiceFee] = useState();

    const[optionState, setOptionState] = useState();





    console.log(readySell)





    return(
        <div className= "PlaseItem" >

            <div className="conteiner">

                <form encType ="multipart/form-data" method="post">
                    <ol>
                        <h2> РАЗМЕСТИ СВОЮ ВЕЩЬ </h2>

                        {/*  КАТЕГОРИЯ  */}
                        <div>
                        <li>
                                <span>*</span> Выберите категорию: {' '}
                                    <select value={category}
                                    onChange={(e)=>setCategory(e.target.value)} >

                                    <option />
                                    <option>Недвижимость</option>
                                    <option>Авто и транспорт</option>
                                    <option>Бытовая техника</option>
                                    <option>Компьютерная техника</option>
                                    <option>Телефоны и планшеты</option>
                                    <option>Электроника</option>
                                    <option>Женский гардероб</option>
                                </select>
                        </li>
                        </div>



                        {/*  НАЗВАНИЕ ТОВАРА  */}
                        <div className="div111">
                        <li>
                                <span>*</span>  Название товара: {' '}
                                <input type ="text"
                                       value ={nameItem}
                                       onChange={(e)=>setNameItem(e.target.value)} />
                        </li>
                        </div>



                        {/*  ЗАГРУЗКА ФОТО  */}
                        <div>
                            <li>
                                    <span>*</span>  Загрузите фото: {' '}

                                    <div>
                                        <input
                                            type="file"
                                            multiple
                                            accept="image/*,image/jpeg"
                                            value={downloadPhoto1}
                                            onChange={(e)=>setDownloadPhoto1(e.target.value)}
                                        />
                                    </div>

                                    <div>
                                        <input
                                            type="file"
                                            multiple
                                            accept="image/*,image/jpeg"
                                            value={downloadPhoto2}
                                            onChange={(e)=>setDownloadPhoto2(e.target.value)}
                                        />
                                    </div>


                                    <div>
                                        <input
                                            type="file"
                                            multiple
                                            accept="image/*,image/jpeg"
                                            value={downloadPhoto3}
                                            onChange={(e)=>setDownloadPhoto3(e.target.value)}
                                        />
                                    </div>


                                    <div>
                                        <input
                                            type="file"
                                            multiple
                                            accept="image/*,image/jpeg"
                                            value={downloadPhoto4}
                                            onChange={(e)=>setDownloadPhoto4(e.target.value)}
                                        />
                                    </div>


                                    <div>
                                        <input
                                            type="file"
                                            multiple
                                            accept="image/*,image/jpeg"
                                            value={downloadPhoto5}
                                            onChange={(e)=>setDownloadPhoto5(e.target.value)}
                                        />
                                    </div>

                            </li>
                        </div>



                        {/*  ОПИСАНИЕ ТОВАРА  */}
                        <div>
                            <li>
                                     Описание товара: {' '}
                            </li>


                             <textarea value={commentsItem}
                                       onChange={(e)=>setCommentsItem(e.target.value)}  />
                        </div>


                        {/*  ГОД ВЫПУСКА  */}

                         <li>
                            <div>
                                     Год выпуска: {' '}
                                    <input type ="number"
                                           value={yearCreate}
                                           onChange={(e)=>setYearCreate(e.target.value)} />
                            </div>
                         </li>


                        {/*  ПРОБЕГ  */}
                        <li>
                            <div>
                                Пробег: {' '}
                                <input type ="number"
                                       value={mileAge}
                                       onChange={(e)=>setMileAge(e.target.value)} />
                            </div>
                        </li>


                        {/*  ПРОБЕГ  */}
                        <li>
                            <div>
                                Стоимость(если оценивается): {' '}
                                <input type ="number"
                                       value={cost}
                                       onChange={(e)=>setCost(e.target.value)}
                                />

                                {/*<select*/}
                                {/*    value={costValuts}*/}
                                {/*    onChange={(e)=>setCostValuts(e.target.value)}*/}

                                {/*>*/}
                                {/*    <option />*/}
                                {/*    <option>$</option>*/}
                                {/*    <option>€</option>*/}
                                {/*    <option>рубли</option>*/}
                                {/*    <option>Гривни</option>*/}
                                {/*</select>*/}
                            </div>
                        </li>




                        {/*  СТОИМОСТЬ АРЕНДЫ  */}
                        <li>
                            <div>
                                <span>*</span>  Стоимость аренды: {' '}
                                <input
                                    type ="number"
                                    value={costArends}
                                    disabled={giveFree||yourCost}
                                    onChange={(e)=>setCostArends(e.target.value)}
                                />

                                <select
                                    value={howDay}
                                    disabled={giveFree||yourCost}
                                    onChange={(e)=>setHowDay(e.target.value)}
                                >
                                    <option />
                                    <option>Час</option>
                                    <option>Сутки</option>
                                    <option>Неделя</option>
                                    <option>Месяц</option>
                                    <option>6 месяцев</option>
                                    <option>1 Год</option>
                                </select>
                            </div>


                            {/*  БЕСПЛАТНО  */}
                            <div>
                                Бесплатно {' '}
                                <input
                                    type="checkbox"
                                    disabled={yourCost}
                                    value={giveFree}
                                    onChange={giveFreeHandler}

                                /> {' '}
                            </div>


                            {/*  ПРЕДЛОЖИТЬ ЦЕНУ  */}
                            <div>
                                Предложить цену {' '}
                                <input
                                    type="checkbox"
                                    value={yourCost}
                                    disabled={giveFree}
                                    onChange={chekYourCost}

                                /> {' '}
                                {
                                    yourCost&&<div>
                                        Укажите сумму:{' '}
                                        <input
                                        type ="number"
                                        value={yourSum}
                                        onChange={(e)=>setYourSum(e.target.value)}
                                    />

                                    <select
                                    >
                                    <option />
                                    <option>Час</option>
                                    <option>Сутки</option>
                                    <option>Неделя</option>
                                    <option>Месяц</option>
                                    <option>6 месяцев</option>
                                    <option>1 Год</option>
                                    </select>
                                    </div>
                                }
                            </div>


                            {/*  Готов продать  */}
                            <div>
                                Готов продать {' '}
                                <input style={{display:'inline-block'}}
                                    type="checkbox"
                                    value={readySell}
                                    onChange={readySellHandler}

                                /> {' '}
                            </div>
                        </li>


                        {/*  СРОК АРЕНДЫ  */}
                        <li>
                            <div >
                                <span>*</span>  Срок аренды: {' '}
                                <select
                                    value={timeArends}
                                    onChange={(e)=>setTimeArends(e.target.value)}
                                >
                                    <option />
                                    <option>Час</option>
                                    <option>Сутки</option>
                                    <option>Неделя</option>
                                    <option>Месяц</option>
                                    <option>6 месяцев</option>
                                    <option>1 Год</option>
                                </select>
                            </div>
                        </li>



                        {/*  ВИД ВАЛЮТЫ  */}
                        <li style={{marginLeft:'7px'}}>
                            <div >
                                <span>*</span> Вид валюты: {' '}
                                <select
                                    value={valuts}
                                    onChange={(e)=>setValuts(e.target.value)}
                                >
                                    <option />
                                    <option>$</option>
                                    <option>€</option>
                                    <option>рубли</option>
                                    <option>Гривни</option>
                                </select>
                            </div>
                        </li>



                        {/*  ВРЕМЯ ПОЛУЧЕНИЯ  */}
                        <li style={{marginLeft:'7px'}}>
                            <div >
                                <span>*</span> Время получения(не ранее): {' '}
                                <select
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
                                    <option>12ч</option>
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
                        <li style={{marginLeft:'7px'}}>
                            <div >
                                <span>*</span> Время возврата(не позднее): {' '}
                                <select
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
                                    <option>12ч</option>
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
                        <li style={{marginLeft:'7px'}}>
                            <div >
                                  Укажите время подготовки товара: {' '}
                                <input type = "number"/>

                                <select
                                >
                                    <option />
                                    <option>Часы</option>
                                    <option>Сутки</option>
                                </select>
                            </div>
                        </li>


                        {/*  ВИД ДОСТАВКИ  */}
                        <li style={{marginLeft:'7px'}}>
                            <div>
                                 Вид доставки: {' '}
                                <select
                                    onChange={(e)=>typeDeliveryHandler(e)}
                                >
                                    <option />
                                    <option value="Самовывоз">Самовывоз</option>
                                    <option value="Привезу и заберу сам">Привезу и заберу сам</option>
                                    <option value="Отправлю"> Отправлю </option>
                                </select>

                                {typeDelivery ==="Самовывоз"&&
                                <p style={{marginTop:'20px'}}>
                                    Город:{'  '}
                                    <input type="text"/>
                                    {'  '} Улица:{'  '}
                                    <input type="text"/>
                                </p>
                                }


                                {typeDelivery ==="Привезу и заберу сам"&&
                                <p style={{marginTop:'20px'}}>
                                    Выберите услугу: {'  '}
                                    <select onChange={(e)=>typeServiceHandler(e)}>
                                        <option/>

                                        <option value="Указать стоимость">Указать стоимость</option>
                                        <option value="Бесплатно">Бесплатно</option>
                                    </select>
                                    {typeService ==="Указать стоимость"&&
                                    <p style={{marginTop:'20px'}}>
                                        Укажите стоимость:{'  '}
                                        <input type="text"/>

                                    </p>
                                    }
                                </p>
                                }


                                {typeDelivery ==="Отправлю"&&
                                <p style={{marginTop:'20px'}}>
                                    Выберите способ отправки: {'  '}
                                    <select onChange={(e)=>WhoDeliveryHandler(e)}>
                                        <option/>
                                        <option value="Такси">Такси</option>
                                        <option value="Курьер">Курьер</option>
                                        <option value="Почта">Почта</option>
                                    </select>

                                    {(whoDelivery ==="Такси" || whoDelivery ==="Курьер" || whoDelivery ==="Почта")
                                    &&
                                    <p style={{marginTop:'20px'}}>
                                        За счёт Владельца:{'  '}
                                        <input type="checkbox"/>
                                    </p>
                                    }

                                    {(whoDelivery ==="Такси" || whoDelivery ==="Курьер" || whoDelivery ==="Почта")
                                    &&
                                    <p style={{marginTop:'20px'}}>
                                        За счёт Рентера:{'  '}
                                        <input type="checkbox"/>
                                    </p>
                                    }

                                </p>
                                }
                            </div>
                        </li>


                        {/*  ДОГОВОР/РАСПИСКА  */}
                        <li style={{marginLeft:'7px'}}>
                            <div>
                                Договор/Расписка: {' '}
                                <select
                                    value={contract}
                                    onChange={(e)=>setContract(e.target.value)}
                                >

                                    <option />
                                    <option>Да</option>
                                    <option>Нет</option>
                                </select>
                            </div>
                        </li>



                        {/*  СТРАХОВАНИЕ  */}
                        <li style={{marginLeft:'7px'}}>
                            <div>
                            Страхование {' '}

                            <input
                                type="checkbox"
                                value={insurance}
                                onChange={insuranceHandler}
                            /> {' '}
                            </div>

                            {insurance&& <p style={{marginTop:'20px'}}>
                                    {' '}Введите сумму:{' '}
                                    <input
                                        type ="number" />

                                    <br/>
                                    Наличие франшизы:{' '}
                                    <input style={{marginTop:'20px'}}
                                        type="checkbox"
                                        value={franchise}
                                        onChange={franchiseHandler}
                                    /> {' '}

                                    {franchise&&<label>
                                        Укажите сумму франшизы:
                                        <input type="number"/>

                                    </label>}
                                </p>

                            }
                        </li>



                        {/*  ЗАЛОГ  */}
                        <li style={{marginLeft:'7px'}}>
                            <div>
                                Залог {' '}
                                <input
                                    type="checkbox"
                                    value={pladge}
                                    onChange={pladgeHandler}

                                /> {' '}

                                {pladge&&<p style={{marginTop:'10px'}}>
                                        {' '}Введите сумму:{' '}
                                        <input
                                            type ="number"
                                        />
                                    </p>
                                }
                            </div>
                        </li>


                        {/*  СЕРВИСНЫЙ СБОР  */}
                        <li style={{marginLeft:'7px'}}>
                            <div>
                                Сервисный сбор {' '}
                                <input
                                    type="checkbox"
                                    value={serviceFee}
                                    onChange={serviceFeeHandler}

                                /> {' '}

                                {serviceFee&&<p style={{marginTop:'10px'}}>

                                        <select
                                            onChange={(e)=>serviceHandler(e)}
                                        >
                                            <option />
                                            <option value="Всегда">Всегда</option>
                                            <option value="Возврат вещи">Возврат вещи</option>
                                        </select>

                                        {' '} Сумма:{' '}
                                        <input
                                            type ="number"
                                        />
                                    </p>
                                }
                            </div>
                        </li>


                        {/*  КНОПКИ ОТПРАВИТЬ / ОЧИСТИТЬ  */}

                        <div style={{margin:'30px auto'}}>
                            <input type="submit" name="a" value="Отправить" style={{width:'40%', height:'30px',
                                float:'left', marginRight:'50px', marginLeft: '20px',}}
                            /> {' '}
                            <input type="reset" name="a" value="Очистить" style={{width:'40%', float:'left',
                                height:'30px',}}
                            /> {' '}
                        </div>


                    </ol>
                </form>



            </div>
        </div>
    )
}

export default PlaceItem