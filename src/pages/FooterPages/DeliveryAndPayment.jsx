import React from 'react';
import { Header, Footer } from '../../components/index';
import './footer-pages.css';

const DeliveryAndPayment = () => {
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
              <h1 className="footer_pages_main_title">Доставка и оплата</h1>
              <p className="footer_pages_main_p">
                Все вопросы по доставке и оплате товаров решаются в индивидуальном порядке между
                Владельцем и Рентором.
              </p>
              <p className="footer_pages_main_p">
                Варианты получения, которые можно указать при бронировании: <br></br>
                1. Самовывоз.<br></br>
                2. Доставка почтовыми и курьерскими службами.<br></br>
              </p>
              <p className="footer_pages_main_p">
                Также возможна личная встреча в условленном месте с целью подписания договора и
                передачи имущества.
              </p>
              <p className="footer_pages_main_p">
                Все важные нюансы по доставке и оплате товара должны быть зафиксированы в договоре!
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DeliveryAndPayment;
