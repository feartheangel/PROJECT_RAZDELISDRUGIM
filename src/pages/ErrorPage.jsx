import React from "react";
import { Footer, Header } from "../components/index.js";
import "../css/ErrorPage.css";
import ErrorImage from "../img/errorImage.png";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  //устанавливаем заголовок вкладки и делаем скролл наверх
  React.useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Страница не найдена: #разделисдругим";
  }, []);

  return (
    <div className="error_page_wrapper">
      <Header />
      <div className="error_inner_container">
        <div className="error_inner_content">
          <img className="error_image_404" alt="error image" src={ErrorImage} />
          <p className="error_inner_p">
            Ой! Похоже мы не можем найти нужную Вам страницу.
          </p>
          <p className="error_inner_p">Приносим свои извинения.</p>
          <p className="error_inner_p">
            Но у нас есть много другой полезной информации:)
          </p>
          <div className="error_inner_button_wrapper">
            <Link to="/catalog" style={{ textDecoration: "none" }}>
              <input
                className="error_inner_yellow_button"
                type="button"
                value="Смотреть каталог"
              />
            </Link>
            <Link to="/" style={{ textDecoration: "none" }}>
              <input
                className="error_inner_blue_button"
                type="button"
                value="Вернуться на главную"
              />
            </Link>
          </div>
        </div>
      </div>
      {window.screen.width > 480 && <Footer />}
    </div>
  );
};

export default ErrorPage;
