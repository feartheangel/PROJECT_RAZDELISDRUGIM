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
              <h1 className="footer_pages_main_title">Сотрудничество</h1>
              <p className="footer_pages_main_p">
                Шеринг-сервис <strong>#разделисдругим</strong> приглашает к сотрудничеству
                предприятия, компании и магазины. Приветствуется коллаборация с популярными
                блогерами, имеющими живую и активную аудиторию. Условия партнерства обсуждаются в
                индивидуальном порядке.
              </p>
              <p className="footer_pages_main_p">
                По вопросам рекламы и сотрудничества обращайтесь по адресу: mail@razdelisdrugim.by.
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
