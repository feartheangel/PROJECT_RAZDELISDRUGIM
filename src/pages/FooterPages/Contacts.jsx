import React from "react";
import { Header, Footer } from "../../components/index";
import "./footer-pages.css";

const Contacts = () => {
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
              <h1 className="footer_pages_main_title">Контакты</h1>
              <p className="footer_pages_main_p">
                Вы всегда можете связаться с нами по электронной почте:
                admin@razdelisdrugim.by<br></br>
                Вы можете написать или позвонить нам в мессенджере Telegram
                сюда: @razdelisdrugim<br></br>
                Приглашаем Вам принять участие в разработке нашего проекта, и
                внести все свои предложения и пожелания тут:{" "}
                <a href="https://forms.gle/p3LjbTYphj1QCLK5A" target="_blank">
                  https://forms.gle/p3LjbTYphj1QCLK5A
                </a>
                <br></br>
              </p>
              <p className="footer_pages_main_p">
                По вопросам рекламы и сотрудничества обращайтесь по адресу:
                mail@razdelisdrugim.by.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contacts;
