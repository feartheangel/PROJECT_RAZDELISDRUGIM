import React from 'react';
import { Header, Footer } from '../../components/index';
import './footer-pages.css';

const HowToRentOut = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="CardThings">
      <Header />
      <div className="CardThings_Wrapper">
        <div className="CardThings_Wrapper_container">
          <div className="container_content_card">
            <div className="card_content_footer_pages">
              <h1 className="footer_pages_main_title">Как сдать в аренду?</h1>
              <p className="footer_pages_main_p">
                На сайте #разделисдругим вы можете сдать любое имущество в аренду. Для этого
                пройдите простую процедуру регистрации и заполните всю информацию об объекте.
              </p>
              <p className="footer_pages_underline">Какие данные нужно указывать?</p>
              <p className="footer_pages_main_p">
                1. Рекомендуется загрузить в свое объявление фотографии, на которых видно состояние
                объекта и его основные характеристики.<br></br>
                2. Отметить стоимость и длительность аренды.<br></br>
                3. Сделать подробное описание (функции, состояние, внешний вид и другие
                характеристики, которые помогут пользователям сделать выбор).<br></br>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HowToRentOut;
