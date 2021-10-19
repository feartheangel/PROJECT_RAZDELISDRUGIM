import React from "react";
import { Link, Redirect } from "react-router-dom";
import FirstImage from "../../img/MainPage/first_block_image.webp";
import { useSelector } from "react-redux";

const FirstBlockNavigation = () => {
  const { userData, subjects, isLoggedIn } = useSelector(
    ({ userData }) => userData
  );
  const { maxItemsToPlaceFree } = useSelector(({ settings }) => settings);
  const [redirect, setRedirect] = React.useState();

  const addSubjectHandler = () => {
    if (isLoggedIn && subjects.length >= maxItemsToPlaceFree) {
      alert(`Лимит вещей достигнут (${maxItemsToPlaceFree})`);
      return;
    } else if (isLoggedIn && subjects.length >= maxItemsToPlaceFree) {
      alert(`Лимит вещей достигнут (${maxItemsToPlaceFree})`);
      return;
    } else if (!isLoggedIn) {
      alert("Сначала авторизуйтесь!");
      return;
    } else if (!userData.email_verify || !userData.phone_verify) {
      alert(
        "У вас не подтвержден номер телефона либо почта. Подтвердите их в профиле."
      );
      setRedirect(<Redirect to="/private-profile" />);
      return;
    }
    window.location.href = "/place-item";
  };

  return (
    <section className="recent-wrapper">
      <div className="main_page_first_content">
        <div className="main_page_fris_block_left">
          <p className="main_page_fris_block_left_main_p">#РАЗДЕЛИСДРУГИМ</p>
          <p className="main_page_fris_block_left_second_p">
            Платформа, где делятся вещами<br></br> друг с другом в аренду, и не
            только...
          </p>
          <img alt="picture1" src={FirstImage} className="FirstImage2" />
          <div
            style={{ justifyContent: "flex-start" }}
            className="main_page_first_block_left_bottons"
          >
            <Link style={{ textDecoration: "none" }} to="/search">
              <input
                type="button"
                value="Найти вещь"
                className="header-button add-subject2"
                id="add-subject2"
              />
            </Link>
            <input
              onClick={addSubjectHandler}
              type="button"
              value="Предложить своё"
              className="header-button add-subject"
              id="add-subject2"
            />
          </div>
          {redirect}
        </div>
        <img alt="picture1" src={FirstImage} className="FirstImage1" />
      </div>
    </section>
  );
};

export default FirstBlockNavigation;
