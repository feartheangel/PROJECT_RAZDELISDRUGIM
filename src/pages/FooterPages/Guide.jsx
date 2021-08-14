import React from 'react';
import { Header, Footer } from '../../components/index';
import './footer-pages.css';

const Guide = () => {
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
              <h1 className="footer_pages_main_title">Как подать объявление?</h1>
              <p className="footer_pages_main_p">
                1. Проходите простую процедуру регистрации (для этого необходим актуальный номер
                телефона или электронная почта). <br></br> 2. Делаете качественные фотографии,
                которые наиболее полно показывают состояние объекта. Далее заполняете всю
                необходимую информацию о предмете и указываете стоимость.<br></br>3. Публикуете свое
                объявление и собираете заявки в автоматическом режиме.{' '}
              </p>
              <p className="footer_pages_main_p">
                Сервис #разделисдругим был создан для людей. Мы постарались сделать его простым и
                понятным каждому.
              </p>
              <p className="footer_pages_main_p">Пользуйтесь и зарабатывайте!</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Guide;
