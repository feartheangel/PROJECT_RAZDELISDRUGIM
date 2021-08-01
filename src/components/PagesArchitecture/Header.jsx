import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Requests from '../../http/axios-requests';
import LanguagePlanet from '../../img/MainPage/Language-planet.png';
import Burger from '../../img/MainPage/Burger.png';
import Logo from '../../img/MainPage/Logo.png';
import mark from '../../img/MainPage/Mark.png';
import { logoutAction, loginAction } from '../../redux/actions/userData';
import { setSearchWords, setSearchItems } from '../../redux/actions/search';
import { ProfilePopUp } from '../index';
import Favorites from '../../img/MainPage/Favorites.png';
import Notifications from '../../img/MainPage/Notifications.png';
import UserAvatar from '../../img/MainPage/UserAvatar.png';
import MenuStroke from '../../img/MainPage/MenuStroke.png';

const Header = ({ setModalActive }) => {
  React.useEffect(() => {
    if (localStorage.getItem('key')) {
      dispatch(loginAction());
    } else dispatch(logoutAction());
  }, [localStorage.getItem('key')]);

  const [redirect, setRedirect] = React.useState();
  const [profilePopUpActive, setProfilePopUpActive] = React.useState(false);
  const [search, setSearch] = React.useState();
  const [ignored, forceUpdate] = React.useReducer((x) => x + 1, 0);

  const dispatch = useDispatch();

  const { isLoggedIn, userData } = useSelector(({ userData }) => userData);
  const {
    searchItems,
    words,
    category,
    min_price,
    max_price,
    userCoordinates,
    free,
    status,
    delivery,
    insurance,
    contract,
    pledge,
    distance,
  } = useSelector(({ search }) => search);

  const logout = () => {
    setProfilePopUpActive(false);
    localStorage.removeItem('key');
    dispatch(logoutAction());
    setRedirect(<Redirect to="/" />);
  };

  const addSubjectHandler = () => {
    if (isLoggedIn) setRedirect(<Redirect to="/place-item" />);
    else alert('Сначала авторизуйтесь!');
  };

  const searchRedirect = () => {
    if (words === [] && window.location.href === 'http://localhost:3000/') {
      setRedirect(<Redirect to={`/search`} />);
      return;
    }
    Requests.search(
      words,
      category,
      min_price,
      max_price,
      free,
      status,
      delivery,
      insurance,
      contract,
      pledge,
      userCoordinates,
      distance,
    ).then((res) => {
      dispatch(setSearchItems(res.data));
    });
    setRedirect(<Redirect to={`/search`} />);
  };

  return (
    <header className="header">
      <div className="news-alert-block">
        <p style={{ color: 'white', width: '100%' }} className="news-alert-p">
          Теперь вы можете искать вещь в аренду на карте!
        </p>
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
                  <img
                    style={{ width: '30px', height: '30px', borderRadius: '100%' }}
                    className="header-right-content-logged-img"
                    src={`https://razdelisdrugim.by${userData.image_profile}`}
                  />
                  <img className="header-right-content-logged-img" src={MenuStroke} />
                </div>
              </div>
              {profilePopUpActive && (
                <ProfilePopUp
                  setProfilePopUpActive={setProfilePopUpActive}
                  profilePopUpActive={profilePopUpActive}
                  logout={logout}
                />
              )}
            </div>
          )}
        </div>
      </div>
      <div className="header-lower-table">
        <div className="header-lower-table-left">
          <img style={{ marginRight: '355px' }} src={Burger} alt="" className="burger-button" />
        </div>
        <div className="header-lower-table-right">
          <div className="search-wrapper">
            <input
              value={words}
              onChange={(e) => dispatch(setSearchWords(e.target.value))}
              type="text"
              placeholder="Хочу взять в аренду..."
              className="search-input"
            />
            <input
              style={{ cursor: 'pointer' }}
              onClick={searchRedirect}
              type="button"
              className="search-button"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
