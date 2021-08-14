import React from 'react';
import { Header, Footer } from '../../components/index';
import './footer-pages.css';

const HowToRent = () => {
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
              <h1 className="footer_pages_main_title">Как взять в аренду?</h1>
              <p className="footer_pages_main_p">
                Сервис #Разделисдругим прост и удобен в использовании. Вам не нужно тратить свое
                время на длительный поиск в прокатных центрах города. <br></br> 1. Воспользуйтесь
                поисковой строкой в шапке сайта или перейдите в необходимый раздел каталога.
                <br></br>2. Выберите объект и свяжитесь с владельцем.<br></br>3. Свяжитесь с
                владельцем, заключите соглашение, пользуйтесь на здоровье.{' '}
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HowToRent;
