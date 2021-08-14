import React from 'react';
import { Header, Footer } from '../../components/index';
import './footer-pages.css';

const HowItWorks = () => {
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
              <h1 className="footer_pages_main_title">Как это работает?</h1>
              <p className="footer_pages_main_p">
                Современному человеку гораздо проще и удобнее заплатить за временный доступ к
                объекту, чем сразу его купить.<br></br> #Разделисдругим - это глобальная
                шеринг-платформа, где люди могут делиться друг с другом любыми вещами. Наш сайт
                выступает посредником для заключения договоренностей между пользователями.<br></br>{' '}
                В шеринговом “гипермаркете” вы можете одновременно сдавать свои вещи в аренду и
                брать напрокат другие, которые вам нужны на данный момент.<br></br>{' '}
                Зарегистрируйтесь на сайте, отслеживайте в личном кабинете состояние вашего заказа и
                обменивайтесь сообщениями с другими пользователями.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HowItWorks;
