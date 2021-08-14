import React from 'react';
import { Header, Footer } from '../../components/index';
import './footer-pages.css';

const ForBusiness = () => {
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
              <h1 className="footer_pages_main_title">Аренда для бизнеса</h1>
              <p className="footer_pages_main_p">
                Сервис <strong>#разделисдругим</strong> – это открытая площадка, где вы сможете
                арендовать все для своего предприятия. Даже готовый бизнес-проект под ключ.
              </p>
              <p className="footer_pages_main_p">
                Аренда оборудования и помещений для бизнеса проводится с заключением договоров между
                физическим и юридическим лицом либо между юридическими лицами.{' '}
              </p>
              <p className="footer_pages_main_p">
                Обратите внимание, что некоторые объекты доступны для выкупа после аренды.{' '}
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ForBusiness;
