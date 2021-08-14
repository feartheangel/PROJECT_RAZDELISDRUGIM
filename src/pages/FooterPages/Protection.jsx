import React from 'react';
import { Header, Footer } from '../../components/index';
import './footer-pages.css';

const Protection = () => {
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
              <h1 className="footer_pages_main_title">Защита и гарантии</h1>
              <p className="footer_pages_main_p">
                Для собственной защиты как владельцам, так и арендаторам необходимо заключать
                договоры. Классический способ разрешения конфликта – это следовать условиям в
                документе, подписанном обеими сторонами.
              </p>
              <p className="footer_pages_main_p">
                Перед тем, как взять какую-либо вещь в аренду, зафиксируйте ее состояние в договоре
                либо используйте фотофиксацию (повреждения, сколы, нарушения функций, если таковые
                имеются).
              </p>
              <p className="footer_pages_main_p">
                <strong>Какие моменты стоит обсудить перед арендой?</strong>
              </p>
              <p className="footer_pages_main_p">
                1. Действия в случае поломки или повреждения предмета.<br></br>
                2. Наличие залога за предмет.<br></br>
                3. Сроки сдачи арендованного имущества.<br></br>
                4. Условия возврата и ответственность сторон.<br></br>
              </p>
              <p className="footer_pages_main_p">
                Сервис #Разделисдругим внимательно контролирует недобросовестных Владельцев и
                Рентеров. Для этого на сайте используется рейтинговая система. Все отзывы
                модерируются и сортируются. Аккаунты с низким рейтингом будут заблокированы.{' '}
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Protection;
