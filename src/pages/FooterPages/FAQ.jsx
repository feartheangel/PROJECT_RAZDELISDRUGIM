import React from 'react';
import { Header, Footer } from '../../components/index';
import './footer-pages.css';

const FAQ = () => {
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
              <h1 className="footer_pages_main_title">Вопросы и ответы</h1>
              <p className="footer_pages_underline">Можно ли купить арендованную вещь?</p>
              <p className="footer_pages_main_p">Да, если такая возможность указана Владельцем.</p>
              <p className="footer_pages_underline">
                Обязательна ли регистрация для того, чтобы арендовать объект?
              </p>
              <p className="footer_pages_main_p">
                Нет, регистрация обязательна только для публикации собственных объявлений.
              </p>
              <p className="footer_pages_underline">
                Можно ли одновременно арендовать и сдавать вещи?
              </p>
              <p className="footer_pages_main_p">
                Да, вы можете публиковать свои объекты и использовать тот же аккаунт для аренды
                вещей у других пользователей.
              </p>
              <p className="footer_pages_underline">
                Можно ли взять предмет всего на один день или час?
              </p>
              <p className="footer_pages_main_p">
                Если в объявлении не указана возможность почасовой и посуточной аренды, уточните
                этот вопрос у владельца напрямую.
              </p>
              <p className="footer_pages_underline">Какие есть гарантии у сделки?</p>
              <p className="footer_pages_main_p">
                У каждого пользователя на сайте есть рейтинг, который формируется в зависимости от
                предыдущей шеринговой истории
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FAQ;
