import React from 'react';
import {} from 'react-router-dom';
import classes from './PlaseItem.module.css';
import ImageUpload from "../../components/SubjectsComponents/UpLoader/ImageUpLoad";

const allDiv = {
    display: 'block',
    width: '500px',
    height: '100%',
    background: '#fff',
    borderRadius: '10px',
    padding: '30px 20px',
}


const PlaceItem = () =>{
    return(
        <div className={classes.PlaseItem}>

            <div style={allDiv} >
                <form>
                    <label >
                        * 1. Выберите категорию: {' '}
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

                    <label>
                        * 2. Название товара: {' '}
                        <input type ="text" name="maks" />
                    </label>

                    <label>
                        * 3.  Загрузите фото: {' '}
                    </label>

                    <label>
                        <ImageUpload />
                    </label>

                    <label>
                         * 4. Описание товара: {' '}
                    </label>

                     <textarea  style={{
                         width: '100%',
                         height: '100px',
                     }}/>

                    <label>
                        * 5. Год выпуска: {' '}
                        <input type ="number" />
                    </label>

                    <label >
                        * 6. Срок аренды: {' '}
                        <select>
                            <option>Час</option>
                            <option>Сутки</option>
                            <option>Неделя</option>
                            <option>Месяц</option>
                            <option>6 месяцев</option>
                            <option>1 Год</option>
                        </select>
                    </label>

                    <label>
                        * 7. Стоимость аренды: {' '}
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

                    <label >
                        * 6. Вид валюты: {' '}
                        <select>
                            <option>$</option>
                            <option>€</option>
                            <option>рубли</option>
                            <option>Гривни</option>
                        </select>
                    </label>

                    <label >
                        * 8. Вид доставки: {' '}
                        <select>
                            <option>Самовывоз</option>
                            <option>Привезу и заберу сам</option>
                            <option>Отправлю почтой/курьером</option>
                        </select>
                    </label>

                    <label>
                        Отдам бесплатно: {' '}
                        <input type="checkbox" name="a" value="1417"/> {' '}
                    </label>
                    <label>
                        Готов продать: {' '}
                        <input type="checkbox" name="a" value="1417"/> {' '}
                    </label>

                    <label >
                        <input type="submit" name="a" value="Отправить" style={{width:'50%', float:'left'}}/> {' '}
                        <input type="reset" name="a" value="Очистить" style={{width:'50%', float:'left'}}/> {' '}
                    </label>


                </form>

            </div>

        </div>
    )
}

export default PlaceItem