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
                <strong>
                  <a
                    href="mailto:admin@razdelisdrugim.by"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {" "}
                    admin@razdelisdrugim.by
                  </a>{" "}
                </strong>
                <br></br>
                <br></br>
                Вы можете написать или позвонить нам в мессенджере Telegram
                сюда:{" "}
                <strong>
                  <a
                    href="https://telegram.me/razdelisdrugim"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {" "}
                    @razdelisdrugim
                  </a>
                </strong>
                <br></br>
                <br></br>
                Приглашаем Вам принять участие в разработке нашего проекта, и
                внести все свои предложения и пожелания тут:{" "}
                <a
                  href="https://forms.gle/p3LjbTYphj1QCLK5A"
                  target="_blank"
                  rel="noreferrer"
                >
                  <strong>https://forms.gle/p3LjbTYphj1QCLK5A</strong>
                </a>
                <br></br>
                <br></br>
              </p>
              <p className="footer_pages_main_p">
                По вопросам рекламы и сотрудничества обращайтесь по адресу:
                <strong>
                  <a
                    href="mailto:mail@razdelisdrugim.by"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {" "}
                    mail@razdelisdrugim.by.
                  </a>
                </strong>
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
