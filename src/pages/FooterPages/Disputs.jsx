import React from 'react';
import { Header, Footer } from '../../components/index';
import './footer-pages.css';

const Disputs = () => {
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
              <h1 className="footer_pages_main_title">Спорные ситуации </h1>
              <p className="footer_pages_main_p">
                Все спорные моменты решаются через переговоры между сторонами. Для защиты прав
                Владельцев и Ренторов от недобросовестных пользователей составляются типовые
                договоры с указанием Прав и Обязанностей сторон.
              </p>
              <p className="footer_pages_main_p">
                Не откладывайте подписание документов в долгий ящик даже при долгосрочной аренде и
                постоянном сотрудничестве.<br></br>
                Относитесь друг к другу с пониманием и уважением.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Disputs;
