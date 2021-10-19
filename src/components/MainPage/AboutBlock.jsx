import React from "react";
import jacket from "../../img/MainPage/jacket.webp";

const AboutBlock = () => {
  const [showContent, setShowContent] = React.useState();
  return (
    <section className="about">
      <div className="about-content">
        <p
          onClick={() => setShowContent(!showContent)}
          className="main-about-title"
        >
          О нашем сервисе{"  "}
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
            <div className="about-middle-part">
              <div className="about-middle-left">
                <img alt="picture1" src={jacket} className="about-jacket" />
              </div>
              <div className="about-middle-right">
                <p className="about-main-p">
                  <img alt="picture1" src={jacket} className="about-jacket2" />
                  Все началось с моего смокинга. Это такая часть гардероба,
                  которая в шкафу обычного современного человека если 
                  и присутствует, то используется крайне редко, может быть
                  1–2 раза в год, а иногда и того реже. Я давно хотел найти
                  механизм монетизировать его, не избавляясь при этом,
                  предоставляя возможность другим людям облачиться в него, когда
                  это будет необходимо. Когда я посмотрел на мои строительные
                  и музыкальные инструменты, автоаксессуары, моющий пылесос,
                  садовую технику — я понял, что таких вещей может быть много.
                  В разговоре с моими друзьями и знакомыми я понял, что у них
                  стоит та же проблема, причём с одной стороны, у них пылятся
                  вещи, которые могли бы служить другим, с другой стороны,
                  им иногда нужны другие вещи, для разового или редкого
                  использования. Да, есть компании, которые занимаются арендой
                  одежды, инструментов, аксессуаров и т.п. Однако наша идея
                  заключается в том, чтобы дать простым людям простой инструмент
                  выхода на рынок краткосрочной аренды вещей, как в качестве
                  Владельцев, так в качестве Рентеров чужих вещей. И об этом
                  наша платформа…
                </p>
                <p className="about-lower-p">Дмитрий, автор проекта</p>
              </div>
            </div>
            <div className="main_page_first_block_left_bottons">
              <a
                target="_blank"
                rel="noreferrer"
                href="https://forms.gle/p3LjbTYphj1QCLK5A"
              >
                <input
                  type="button"
                  value="Связаться с нами"
                  className="header-button add-subject2 abilities_button"
                  id="abilities_button"
                />
              </a>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://forms.gle/p3LjbTYphj1QCLK5A"
              >
                <input
                  type="button"
                  value="Оставить отзыв"
                  className="header-button add-subject"
                  id="abilities_button2"
                />
              </a>
            </div>
          </div>
        ) : window.screen.width > 480 && !showContent ? (
          <div>
            <div className="about-middle-part">
              <div className="about-middle-left">
                <img alt="picture1" src={jacket} className="about-jacket" />
              </div>
              <div className="about-middle-right">
                <p className="about-main-p">
                  <img alt="picture1" src={jacket} className="about-jacket2" />
                  Все началось с моего смокинга. Это такая часть гардероба,
                  которая в шкафу обычного современного человека если 
                  и присутствует, то используется крайне редко, может быть
                  1–2 раза в год, а иногда и того реже. Я давно хотел найти
                  механизм монетизировать его, не избавляясь при этом,
                  предоставляя возможность другим людям облачиться в него, когда
                  это будет необходимо. Когда я посмотрел на мои строительные
                  и музыкальные инструменты, автоаксессуары, моющий пылесос,
                  садовую технику — я понял, что таких вещей может быть много.
                  В разговоре с моими друзьями и знакомыми я понял, что у них
                  стоит та же проблема, причём с одной стороны, у них пылятся
                  вещи, которые могли бы служить другим, с другой стороны,
                  им иногда нужны другие вещи, для разового или редкого
                  использования. Да, есть компании, которые занимаются арендой
                  одежды, инструментов, аксессуаров и т.п. Однако наша идея
                  заключается в том, чтобы дать простым людям простой инструмент
                  выхода на рынок краткосрочной аренды вещей, как в качестве
                  Владельцев, так в качестве Рентеров чужих вещей. И об этом
                  наша платформа…
                </p>
                <p className="about-lower-p">Дмитрий, автор проекта</p>
              </div>
            </div>
            <div className="main_page_first_block_left_bottons">
              <a
                target="_blank"
                rel="noreferrer"
                href="https://forms.gle/p3LjbTYphj1QCLK5A"
              >
                <input
                  type="button"
                  value="Связаться с нами"
                  className="header-button add-subject2 abilities_button"
                  id="abilities_button"
                />
              </a>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://forms.gle/p3LjbTYphj1QCLK5A"
              >
                <input
                  type="button"
                  value="Оставить отзыв"
                  className="header-button add-subject"
                  id="abilities_button2"
                />
              </a>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </section>
  );
};

export default AboutBlock;
