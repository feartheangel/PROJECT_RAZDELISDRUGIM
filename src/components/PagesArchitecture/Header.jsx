import React from 'react';
import { Link } from 'react-router-dom';

import LanguagePlanet from '../../img/MainPage/Language-planet.png';
import Burger from '../../img/MainPage/Burger.png';
import Logo from '../../img/MainPage/Logo.png';
import mark from '../../img/MainPage/Mark.png';

const Header = ({ isLoggedIn, setModalActive, setIsLoggedIn }) => {
  const logout = () => {
    localStorage.removeItem('key');
    setIsLoggedIn(false);
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
          <img src={Logo} alt="Global Sharing Platform" className="logo" />
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
          <Link to="/place-item">
            <input type="button" value="Предложить вещь" className="header-button add-subject" />
          </Link>
          {!isLoggedIn && (
            <input
              onClick={() => setModalActive(true)}
              type="button"
              value="Войти"
              className=" header-button login-button"
            />
          )}

          {isLoggedIn && (
            <input
              onClick={logout}
              type="button"
              value="Выйти"
              className=" header-button login-button"
            />
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
