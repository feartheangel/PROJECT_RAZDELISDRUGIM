import React, {useState} from 'react';
import classes from './PlaseItem.module.css';
// import {ImageUpload} from "../../components/SubjectsComponents/UpLoader/ImageUpLoad";



const allDiv = {
    display: 'block',
    width: '700px',
    height: '100%',
    background: 'linear-gradient(to right, rgb(246, 239, 210), rgb(150 141 127))',
    borderRadius: '10px',
    padding: '30px 20px',
}





const PlaceItem = () =>{

    //состояния для валидации, хранения данных из полей
    const [category, setCategory] = useState();
    const[nameItem, setNameItem] = useState();
    const[downloadPhoto1, setDownloadPhoto1] = useState();
    const[downloadPhoto2, setDownloadPhoto2] = useState();
    const[downloadPhoto3, setDownloadPhoto3] = useState();
    const[downloadPhoto4, setDownloadPhoto4] = useState();
    const[downloadPhoto5, setDownloadPhoto5] = useState();
    const[commentsItem, setCommentsItem] = useState();
    const[yearCreate, setYearCreate] = useState();
    const[timeArends, setTimeArends] = useState();
    const[costArends, setCostArends] = useState();
    const[valuts, setValuts] = useState();
    const[typeDelivery, setTypeDelivery] = useState();
    const[timeReceipt, setTimeReceipt] = useState();
    const[returnTime, setReturnTime] = useState();
    const[contract, setContract] = useState();

    console.log(category)



    return(
        <div className={classes.PlaseItem} >

            <div style={allDiv} >

                <form encType ="multipart/form-data" method="post">
                    <ol>
                        <li>
                            <label >
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
                            </label>
                        </li>


                        <li>
                            <label>
                                <span>*</span>  Название товара: {' '}
                                <input type ="text" value ={nameItem}
                                       onChange={(e)=>setNameItem(e.target.value)} />
                            </label>
                        </li>



                        <li>
                            <label>
                                <span>*</span>  Загрузите фото: {' '}
                            </label>

                            <label>
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*,image/jpeg"
                                    value={downloadPhoto1}
                                    onChange={(e)=>setDownloadPhoto1(e.target.value)}
                                />
                            </label>

                            <label>
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*,image/jpeg"
                                    value={downloadPhoto2}
                                    onChange={(e)=>setDownloadPhoto2(e.target.value)}
                                />
                            </label>

                            <label>
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*,image/jpeg"
                                    value={downloadPhoto3}
                                    onChange={(e)=>setDownloadPhoto3(e.target.value)}
                                />
                            </label>

                            <label>
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*,image/jpeg"
                                    value={downloadPhoto4}
                                    onChange={(e)=>setDownloadPhoto4(e.target.value)}
                                />
                            </label>

                            <label>
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*,image/jpeg"
                                    value={downloadPhoto5}
                                    onChange={(e)=>setDownloadPhoto5(e.target.value)}
                                />

                            </label>
                        </li>


                        <li>
                            <label>
                                 Описание товара: {' '}
                            </label>
                        </li>


                         <textarea value={commentsItem}
                                   onChange={(e)=>setCommentsItem(e.target.value)}  />

                         <li>
                            <label>
                                     Год выпуска: {' '}
                                    <input type ="number"
                                           value={yearCreate}
                                           onChange={(e)=>setYearCreate(e.target.value)} />
                            </label>
                         </li>

                        <li>
                            <label >
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
                            </label>
                        </li>

                        <li>
                            <label>
                                <span>*</span>  Стоимость аренды: {' '}
                                <input type ="number"  />
                                <select
                                    value={costArends}
                                    onChange={(e)=>setCostArends(e.target.value)}
                                >

                                    <option />
                                    <option>Час</option>
                                    <option>Сутки</option>
                                    <option>Неделя</option>
                                    <option>Месяц</option>
                                    <option>6 месяцев</option>
                                    <option>1 Год</option>
                                </select>
                            </label>
                        </li>

                        <li>
                            <label >
                                <span>*</span>  Вид валюты: {' '}
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
                            </label>
                        </li>

                        <li>
                            <label>
                                 Вид доставки: {' '}
                                <select
                                    value={typeDelivery}
                                    onChange={(e)=>setTypeDelivery(e.target.value)}

                                >
                                    <option />
                                    <option>Самовывоз</option>
                                    <option>Привезу и заберу сам</option>
                                    <option>Отправлю почтой/курьером</option>
                                </select>
                            </label>
                        </li>

                        <li style={{marginLeft:'7px'}}>
                            <label >
                                Время получения(не ранее): {' '}
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
                            </label>
                        </li>

                        <li style={{marginLeft:'7px'}}>
                            <label >
                                Время возврата(не позднее): {' '}
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
                            </label>
                        </li>

                        <li style={{marginLeft:'7px'}}>
                            <label >
                                Договор/Расписка: {' '}
                                <select
                                    value={contract}
                                    onChange={(e)=>setContract(e.target.value)}
                                >

                                    <option />
                                    <option>Да</option>
                                    <option>Нет</option>
                                </select>
                            </label>
                        </li>

                        <label>
                            Страхование {' '}
                            <input type="checkbox" name="a" value="1417"/> {' '}
                        </label>

                        <label>
                            Залог {' '}
                            <input type="checkbox" name="a" value="1417"/> {' '}
                        </label>



                        <label>
                            Сервисный сбор {' '}
                            <input type="checkbox" name="a" value="1417"/> {' '}
                        </label>


                        <label>
                            Отдам бесплатно {' '}
                            <input type="checkbox" name="a" value="1417"/> {' '}
                        </label>


                        <label>
                            Готов продать {' '}
                            <input type="checkbox" name="a" value="1417"/> {' '}
                        </label>

                        <label style={{margin:'30px auto'}}>
                            <input type="submit" name="a" value="Отправить" style={{width:'40%', height:'30px',
                                float:'left', marginRight:'50px', marginLeft: '20px',}}
                            /> {' '}
                            <input type="reset" name="a" value="Очистить" style={{width:'40%', float:'left',
                                height:'30px',}}
                            /> {' '}
                        </label>

                    </ol>
                </form>


            </div>

        </div>
    )
}

export default PlaceItem