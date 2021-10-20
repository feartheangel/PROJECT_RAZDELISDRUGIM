import React from "react";
import abil1 from "../../img/MainPage/abil1.webp";
import abil2 from "../../img/MainPage/abil2.webp";
import abil3 from "../../img/MainPage/abil3.webp";
import abil4 from "../../img/MainPage/abil4.webp";
import abil5 from "../../img/MainPage/abil5.webp";

import { useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";

const AbilitiesBlock = () => {
  const { userData, subjects, isLoggedIn } = useSelector(
    ({ userData }) => userData
  );
  const { maxItemsToPlaceFree, maxItemsToPlaceFreeLegal } = useSelector(
    ({ settings }) => settings
  );
  const [redirect, setRedirect] = React.useState();

  const [showContent, setShowContent] = React.useState();

  const addSubjectHandler = () => {
    if (
      (isLoggedIn &&
        subjects.length >= maxItemsToPlaceFree &&
        userData.status === 1) ||
      (subjects.length >= maxItemsToPlaceFreeLegal && userData.status === 2)
    ) {
      alert(
        `Лимит вещей достигнут (${
          userData.status === 1 ? maxItemsToPlaceFree : maxItemsToPlaceFreeLegal
        })`
      );
      return;
    } else if (
      (isLoggedIn &&
        subjects.length >= maxItemsToPlaceFree &&
        userData.status === 1) ||
      (subjects.length >= maxItemsToPlaceFreeLegal && userData.status === 2)
    ) {
      alert(
        `Лимит вещей достигнут (${
          userData.status === 1 ? maxItemsToPlaceFree : maxItemsToPlaceFreeLegal
        })`
      );
      return;
    } else if (!isLoggedIn) {
      alert("Сначала авторизуйтесь!");
      return;
    } else if (!userData.phone_verify) {
      alert("У вас не подтвержден номер телефона. Подтвердите его в профиле.");
      setRedirect(<Redirect to="/private-profile" />);
      return;
    }
    window.location.href = "/place-item";
  };

  return (
    <section className="abilities">
      <div className="abilities-content" id="info_block">
        <p
          onClick={() => setShowContent(!showContent)}
          className="abilities-mail-title"
        >
          Возможности с платформой #разделисдругим
          {window.screen.width < 480 ? (
            <span style={{ fontSize: "18px", marginLeft: "5px" }}>
              {" "}
              &#5167;
            </span>
          ) : (
            ""
          )}
        </p>
        {window.screen.width < 480 && showContent ? (
          <div>
            <div className="abilities-cards-upper">
              <div className="abilities-card">
                {redirect}
                <p className="main-abilities-card-title">Делитесь с другими</p>
                <img
                  alt="picture1"
                  src={abil1}
                  className="abilities-card-img"
                />
                <p className="abilities-card-p">
                  У каждого из нас есть такие вещи, которые нам жалко продать,
                  но мы могли бы поделиться ими с другими, оказав им услугу,
                  получив за это некоторую сумму. И для этого наша платформа… Мы
                  поддерживаем шеринговую экономику!
                </p>
              </div>
              <div className="abilities-card">
                <p className="main-abilities-card-title">
                  Арендуйте что хотите
                </p>
                <img
                  alt="picture1"
                  src={abil2}
                  className="abilities-card-img"
                />
                <p className="abilities-card-p">
                  Вам нужно воспользоваться чем-то, но покупать не имеет смысла?
                  Найдите нужную вещь через поиск или на карте, возможно, вы уже
                  сегодня возьмете ее в аренду у соседа по подъезду
                </p>
              </div>
              <div className="abilities-card">
                <p className="main-abilities-card-title">
                  Расширяйте свой бизнес
                </p>
                <img
                  alt="picture1"
                  src={abil3}
                  className="abilities-card-img"
                />
                <p className="abilities-card-p">
                  Вы компания или предприниматель, который работает в сфере
                  аренды инструментов, одежды, аксессуаров? Наша платформа
                  поможет продвинуть ваш бизнес и автоматизирует процесс аренды.
                  Закажи у нас мобильное приложение для своей компании!
                </p>
              </div>
            </div>
            <div className="abilities-cards">
              <div className="abilities-card">
                <p className="main-abilities-card-title">Экономьте время</p>
                <img
                  alt="picture1"
                  src={abil4}
                  className="abilities-card-img"
                />
                <p className="abilities-card-p">
                  Вам не нужно тратить много времени на поиск нужной вещь – наш
                  интеллектуальный поиск, карта и фильтры в один клик помогут
                  найти нужное с любого устройства
                </p>
              </div>
              <div className="abilities-card">
                <p className="main-abilities-card-title">Будьте спокойны</p>
                <img
                  alt="picture1"
                  src={abil5}
                  className="abilities-card-img"
                />
                <p className="abilities-card-p">
                  Мы сделали все возможное, для проверки и обеспечения
                  конфиденциальности наших пользователей, а также для
                  обеспечения безопасности сделок, защиты данных, страхования и
                  составления необходимых бумаг. И еще… Мы не храним у себя
                  данные ваших банковских карт!
                </p>
              </div>
            </div>
            <div className="main_page_first_block_left_bottons">
              <Link style={{ textDecoration: "none" }} to="/search">
                <input
                  type="button"
                  value="Найти вещь"
                  className="header-button add-subject2"
                />
              </Link>
              <input
                onClick={addSubjectHandler}
                type="button"
                value="Предложить своё"
                className="header-button add-subject"
              />
            </div>
          </div>
        ) : window.screen.width > 480 && !showContent ? (
          <div>
            <div className="abilities-cards-upper">
              <div className="abilities-card">
                {redirect}
                <p className="main-abilities-card-title">Делитесь с другими</p>
                <img
                  alt="picture1"
                  src={abil1}
                  className="abilities-card-img"
                />
                <p className="abilities-card-p">
                  У каждого из нас есть такие вещи, которые нам жалко продать,
                  но мы могли бы поделиться ими с другими, оказав им услугу,
                  получив за это некоторую сумму. И для этого наша платформа… Мы
                  поддерживаем шеринговую экономику!
                </p>
              </div>
              <div className="abilities-card">
                <p className="main-abilities-card-title">
                  Арендуйте что хотите
                </p>
                <img
                  alt="picture1"
                  src={abil2}
                  className="abilities-card-img"
                />
                <p className="abilities-card-p">
                  Вам нужно воспользоваться чем-то, но покупать не имеет смысла?
                  Найдите нужную вещь через поиск или на карте, возможно, вы уже
                  сегодня возьмете ее в аренду у соседа по подъезду
                </p>
              </div>
              <div className="abilities-card">
                <p className="main-abilities-card-title">
                  Расширяйте свой бизнес
                </p>
                <img
                  alt="picture1"
                  src={abil3}
                  className="abilities-card-img"
                />
                <p className="abilities-card-p">
                  Вы компания или предприниматель, который работает в сфере
                  аренды инструментов, одежды, аксессуаров? Наша платформа
                  поможет продвинуть ваш бизнес и автоматизирует процесс аренды.
                  Закажи у нас мобильное приложение для своей компании!
                </p>
              </div>
            </div>
            <div className="abilities-cards">
              <div className="abilities-card">
                <p className="main-abilities-card-title">Экономьте время</p>
                <img
                  alt="picture1"
                  src={abil4}
                  className="abilities-card-img"
                />
                <p className="abilities-card-p">
                  Вам не нужно тратить много времени на поиск нужной вещь – наш
                  интеллектуальный поиск, карта и фильтры в один клик помогут
                  найти нужное с любого устройства
                </p>
              </div>
              <div className="abilities-card">
                <p className="main-abilities-card-title">Будьте спокойны</p>
                <img
                  alt="picture1"
                  src={abil5}
                  className="abilities-card-img"
                />
                <p className="abilities-card-p">
                  Мы сделали все возможное, для проверки и обеспечения
                  конфиденциальности наших пользователей, а также для
                  обеспечения безопасности сделок, защиты данных, страхования и
                  составления необходимых бумаг. И еще… Мы не храним у себя
                  данные ваших банковских карт!
                </p>
              </div>
            </div>
            <div className="main_page_first_block_left_bottons">
              <Link style={{ textDecoration: "none" }} to="/search">
                <input
                  type="button"
                  value="Найти вещь"
                  className="header-button add-subject2"
                />
              </Link>
              <input
                onClick={addSubjectHandler}
                type="button"
                value="Предложить сво"
                className="header-button add-subject"
              />
            </div>
          </div>
        ) : (
          ""
        )}

        {/* планшет версия */}
        <div className="abilities-content" id="swiper_mobile_800">
          <p className="abilities-mail-title">
            Возможности с платформой #разделисдругим
          </p>
          <div>
            <div className="abilities-cards-upper" id="abilities_upper">
              <div className="abilities-card" id="abilities_upper">
                <p className="main-abilities-card-title">Делитесь с другими</p>
                <img
                  alt="picture1"
                  src={abil1}
                  className="abilities-card-img"
                />
                <p className="abilities-card-p" id="abilities_upper">
                  У каждого из нас есть такие вещи, которые нам жалко продать,
                  но мы могли бы поделиться ими с другими, оказав им услугу,
                  получив за это некоторую сумму. И для этого наша платформа… Мы
                  поддерживаем шеринговую экономику!
                </p>
              </div>
            </div>

            <div className="abilities-cards-upper">
              <div className="abilities-card">
                <p className="main-abilities-card-title">
                  Арендуйте что хотите
                </p>
                <img
                  loading="lazy"
                  src={abil2}
                  alt=""
                  className="abilities-card-img"
                />
                <p className="abilities-card-p">
                  Вам нужно воспользоваться чем-то, но покупать не имеет смысла?
                  Найдите нужную вещь через поиск или на карте, возможно, вы уже
                  сегодня возьмете ее в аренду у соседа по подъезду
                </p>
              </div>
              <div className="abilities-card">
                <p className="main-abilities-card-title">
                  Расширяйте свой бизнес
                </p>
                <img
                  loading="lazy"
                  src={abil3}
                  alt=""
                  className="abilities-card-img"
                />
                <p className="abilities-card-p">
                  Вы компания или предприниматель, который работает в сфере
                  аренды инструментов, одежды, аксессуаров? Наша платформа
                  поможет продвинуть ваш бизнес и автоматизирует процесс аренды.
                  Закажи у нас мобильное приложение для своей компании!
                </p>
              </div>
              <div className="abilities-card">
                <p className="main-abilities-card-title">Экономьте время</p>
                <img
                  loading="lazy"
                  src={abil4}
                  alt=""
                  className="abilities-card-img"
                />
                <p className="abilities-card-p">
                  Вам не нужно тратить много времени на поиск нужной вещь – наш
                  интеллектуальный поиск, карта и фильтры в один клик помогут
                  найти нужное с любого устройства
                </p>
              </div>
              <div className="abilities-card">
                <p className="main-abilities-card-title">Будьте спокойны</p>
                <img
                  loading="lazy"
                  src={abil5}
                  alt=""
                  className="abilities-card-img"
                />
                <p className="abilities-card-p">
                  Мы сделали все возможное, для проверки и обеспечения
                  конфиденциальности наших пользователей, а также для
                  обеспечения безопасности сделок, защиты данных, страхования и
                  составления необходимых бумаг. И еще… Мы не храним у себя
                  данные ваших банковских карт!
                </p>
              </div>
            </div>

            <div
              className="main_page_first_block_left_bottons"
              style={{ marginTop: "30px", marginBottom: "0" }}
            >
              <Link style={{ textDecoration: "none" }} to="/search">
                <input
                  type="button"
                  value="Найти вещь"
                  className="header-button add-subject2"
                />
              </Link>
              <input
                onClick={addSubjectHandler}
                type="button"
                value="Предложить сво"
                className="header-button add-subject"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AbilitiesBlock;
