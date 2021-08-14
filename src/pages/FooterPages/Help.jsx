import React from 'react';
import { Header, Footer } from '../../components/index';
import './footer-pages.css';

const HelpPage = () => {
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
              <h1 className="footer_pages_main_title">Помощь</h1>
              <p className="footer_pages_underline">Не нашли ответ на свой вопрос?</p>
              <p className="footer_pages_main_p">
                Для получения консультации или при обнаружении ошибок в работе сервиса свяжитесь с
                нами по адресу support@razdelisdrugim.by. <br></br> В обращении подробно опишите
                возникающую проблему. При необходимости приложите скриншоты экрана.<br></br>{' '}
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HelpPage;
