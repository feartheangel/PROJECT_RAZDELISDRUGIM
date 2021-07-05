import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LanguagePlanet from '../../img/MainPage/Language-planet.png';
import Burger from '../../img/MainPage/Burger.png';
import Logo from '../../img/MainPage/Logo.png';
import mark from '../../img/MainPage/Mark.png';
import { logoutAction } from '../../redux/actions/userData';
import { ProfilePopUp } from '../index';
import Favorites from '../../img/MainPage/Favorites.png';
import Notifications from '../../img/MainPage/Notifications.png';
import UserAvatar from '../../img/MainPage/UserAvatar.png';
import MenuStroke from '../../img/MainPage/MenuStroke.png';

const Header = ({ setModalActive }) => {
  const [redirect, setRedirect] = React.useState();
  const [profilePopUpActive, setProfilePopUpActive] = React.useState(false);

  const dispatch = useDispatch();

  const { isLoggedIn } = useSelector(({ userData }) => userData);

  const logout = () => {
    localStorage.removeItem('key');
    dispatch(logoutAction());
    setRedirect(<Redirect to="/" />);
  };

  const addSubjectHandler = () => {
    if (isLoggedIn) setRedirect(<Redirect to="/place-item" />);
    else alert('Сначала авторизуйтесь!');
  };

  return (
    <header className="header">
      <div className="news-alert-block-wrapper">
        <div className="news-alert-block">
          <p className="news-alert-p">Теперь вы можете искать вещь в аренду на карте!</p>
        </div>
      </div>
      <div className="header__inner">
        <div className="header-left-content">
          <Link to="/">
            <img src={Logo} alt="Global Sharing Platform" className="logo" />
          </Link>
          <div className="location-selector">
            <img src={mark} alt="" className="location-img" />
            <p className="location-p">Минск</p>
          </div>
          <div className="laguage-selector-wrapper">
            <img src={LanguagePlanet} alt="" className="language-planet-img" />
            <p className="language-selector">RU</p>
          </div>
        </div>
        <div className="header-right-content">
          <input
            onClick={addSubjectHandler}
            type="button"
            value="Предложить вещь"
            className="header-button add-subject"
          />
          {redirect}
          {!isLoggedIn && (
            <input
              onClick={() => setModalActive(true)}
              type="button"
              value="Войти"
              className=" header-button login-button"
            />
          )}

          {isLoggedIn && (
            <div className="header-right-content-logged-div-wrapper">
              <div className="header-right-content-logged-div">
                <img className="header-right-content-logged-img" src={Favorites} />
                <img className="header-right-content-logged-img" src={Notifications} />
                <div
                  onClick={() => setProfilePopUpActive(!profilePopUpActive)}
                  className="user-avatar-group">
                  <img className="header-right-content-logged-img" src={UserAvatar} />
                  <img className="header-right-content-logged-img" src={MenuStroke} />
                </div>
              </div>
              {profilePopUpActive && (
                <ProfilePopUp profilePopUpActive={profilePopUpActive} logout={logout} />
              )}
            </div>
          )}
        </div>
      </div>
      <div className="header-lower-table">
        <div className="header-lower-table-left">
          <img src={Burger} alt="" className="burger-button" />
        </div>
        <div className="header-lower-table-right">
          <div className="search-wrapper">
            <input type="text" value="Хочу взять в аренду..." className="search-input" />
            <input type="button" className="search-button" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
