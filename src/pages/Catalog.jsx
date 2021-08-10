import React, { useState } from 'react';
import '..//css/Catalog.css';
import { Footer, Header } from '../components/index.js';
import CatalogComponent from '../components/Catalog/CatalogComponent.jsx';
import Vector1 from '../img/SearchPage/Vector1.png';
import Key from '../img/Catalog/key-o.png';
import Plug from '../img/Catalog/plug.png';
import Truck from '../img/Catalog/truck.png';
import Camera from '../img/Catalog/camera.png';
import Doctor from '../img/Catalog/doctor-briefcase.png';
import Family from '../img/Catalog/family.png';
import Bed from '../img/Catalog/bed.png';
import Houme from '../img/Catalog/home.png';
import Paint from '../img/Catalog/paint-roll.png';
import Lifebuoy from '../img/Catalog/lifebuoy.png';
import Diploma from '../img/Catalog/diploma-scroll.png';
import Frame300 from '../img/Catalog/Frame 300.png';
import Toolbox from '../img/Catalog/toolbox.png';
import Book from '../img/Catalog/open-book.png';
import UserCheck from '../img/Catalog/user-check.png';
import Frame296 from '../img/Catalog/Frame 296.png';
import Frame297 from '../img/Catalog/Frame 297.png';
import Frame299 from '../img/Catalog/Frame 299.png';
import Frame295 from '../img/Catalog/Frame 295.png';
import Frame293 from '../img/Catalog/Frame 293.png';

const Catalog = () => {
  const [activeForm3, setActiveForm3] = useState('house');

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="Catalog">
      <Header />
      <div className="Catalog_wrapper">
        <div className="Catalog_wrapper_container">
          <div className="Catalog_wrapper_container_up">
            {/* ТЕКС ПУТЕЙ ПО КАТЕГОРИЯМ ( с cardthings взято ) */}
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
                <p className="card_shapka_hover"> Недвижимость </p>
              </div>
            </div>
          </div>

          {/* КОНТЕЙНЕР С КОНТЕНТОМ */}
          <div className="Catalog_wrapper_container_down">
            <div className="container_down_left">
              <p className="container_down_left-p">Весь каталог</p>

              <div className="container_down_left_category">
                <div className="left_category_global_div">
                  <img src={Key} alt="" className="category_img" />
                  <p
                    className={
                      activeForm3 === 'house'
                        ? 'left_category_global_div_active'
                        : 'left_category_global_div'
                    }
                    onClick={() => setActiveForm3('house')}>
                    Недвижимость
                  </p>
                </div>
                <div className="left_category_global_div">
                  <img src={Truck} alt="" className="category_img" />
                  <p>Авто и транспорт</p>
                </div>
                <div className="left_category_global_div">
                  <img src={Plug} alt="" className="category_img" />
                  <p>Бытовая техника</p>
                </div>
                <div className="left_category_global_div">
                  <img src={Frame297} alt="" className="category_img" />
                  <p>Компьютерная техника</p>
                </div>
                <div className="left_category_global_div">
                  <img src={Frame296} alt="" className="category_img" />
                  <p>Телефоны и планшеты</p>
                </div>
                <div className="left_category_global_div">
                  <img src={Camera} alt="" className="category_img" />
                  <p>Электроника</p>
                </div>
                <div className="left_category_global_div">
                  <img src={Frame299} alt="" className="category_img" />
                  <p>Женский гардероб</p>
                </div>
                <div className="left_category_global_div">
                  <img src={Frame295} alt="" className="category_img" />
                  <p>Мужской гардероб</p>
                </div>
                <div className="left_category_global_div">
                  <img src={Doctor} alt="" className="category_img" />
                  <p>Красота и здоровье</p>
                </div>
                <div className="left_category_global_div">
                  <img src={Family} alt="" className="category_img" />
                  <p>Для мам и детей</p>
                </div>
                <div className="left_category_global_div">
                  <img src={Bed} alt="" className="category_img" />
                  <p>Мебель</p>
                </div>
                <div className="left_category_global_div">
                  <img src={Houme} alt="" className="category_img" />
                  <p>Все для дома</p>
                </div>
                <div className="left_category_global_div">
                  <img src={Paint} alt="" className="category_img" />
                  <p>Ремонт и стройка</p>
                </div>
                <div className="left_category_global_div">
                  <img src={Frame293} alt="" className="category_img" />
                  <p>Сад и огород</p>
                </div>
                <div className="left_category_global_div">
                  <img src={Lifebuoy} alt="" className="category_img" />
                  <p>Хобби, спорт и туризм</p>
                </div>
                <div className="left_category_global_div">
                  <img src={Diploma} alt="" className="category_img" />
                  <p>Свадьба и праздники</p>
                </div>
                <div className="left_category_global_div">
                  <img src={Frame300} alt="" className="category_img" />
                  <p>Животные</p>
                </div>
                <div className="left_category_global_div">
                  <img src={Toolbox} alt="" className="category_img" />
                  <p>Бизнес и оборудование</p>
                </div>
                <div className="left_category_global_div">
                  <img src={Book} alt="" className="category_img" />
                  <p>Книги</p>
                </div>
                <div className="left_category_global_div">
                  <img src={UserCheck} alt="" className="category_img" />
                  <p>Услуги</p>
                </div>
              </div>
            </div>

            {/* ПРАВАЯ СТОРОНА КОНТЕНТА */}
            <div className="container_down_right">
              {activeForm3 === 'house' && <CatalogComponent />}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Catalog;
