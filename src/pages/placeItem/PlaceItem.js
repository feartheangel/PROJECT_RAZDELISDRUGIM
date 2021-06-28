import React from 'react';
import {} from 'react-router-dom';
import classes from './PlaseItem.module.css';
import ImageUpload from "../../components/SubjectsComponents/UpLoader/ImageUpLoad";


const allDiv = {
    display: 'block',
    width: '700px',
    height: '100%',
    background: 'linear-gradient(to right, rgb(246, 239, 210), rgb(150 141 127))',
    borderRadius: '10px',
    padding: '30px 20px',
}


const PlaceItem = () =>{
    return(
        <div className={classes.PlaseItem} >

            <div style={allDiv} >

                <form >
                    <ol>
                        <li>
                            <label >
                                <span>*</span> Выберите категорию: {' '}
                                <select>
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
                                <input type ="text" name="maks" />
                            </label>
                        </li>



                        <li>
                            <label>
                                <span>*</span>  Загрузите фото: {' '}
                            </label>

                            <label>
                               <ImageUpload />
                            </label>
                        </li>


                        <li>
                            <label>
                                 Описание товара: {' '}
                            </label>
                        </li>


                         <textarea  />

                         <li>
                            <label>
                                     Год выпуска: {' '}
                                    <input type ="number" />
                            </label>
                         </li>

                        <li>
                            <label >
                                <span>*</span>  Срок аренды: {' '}
                                <select>
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
                                <select>
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
                                <select>
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
                                <select>
                                    <option>Самовывоз</option>
                                    <option>Привезу и заберу сам</option>
                                    <option>Отправлю почтой/курьером</option>
                                </select>
                            </label>
                        </li>

                        <li style={{marginLeft:'7px'}}>
                            <label >
                                Время получения(не ранее): {' '}
                                <select value="12ч">
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
                                <select value="12ч">
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
                                <select>
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