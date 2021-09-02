import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Requests from '../../http/axios-requests';
import Burger from '../../img/MainPage/Burger.png';
import Logo from '../../img/MainPage/Logo.png';
import vector2 from '../../img/SearchPage/Vector2.png';
import { logoutAction, loginAction } from '../../redux/actions/userData';
import {
  setSearchWords,
  setSearchItems,
  setSearchCategory,
  setCategoryId,
} from '../../redux/actions/search';
import { ProfilePopUp, BaseModal } from '../index';
import Favorites from '../../img/MainPage/FavoritesDisabled.png';
import Notifications from '../../img/MainPage/Notifications.png';
import { setNews } from '../../redux/actions/items';
import MenuStroke from '../../img/MainPage/MenuStroke.png';
import Planet2 from '../../img/MainPage/Vector (Stroke2).png';
import Local2 from '../../img/MainPage/local2.png';
import Like_vector from '../../img/MainPage/like_vector.png';
import Bell2 from '../../img/MainPage/bell2.png';


const Header = () => {
  const searchButton = React.useRef(null);

  const [modalActive, setModalActive] = React.useState(false);
  const [currentLocation, setCurrentLocation] = React.useState(false);

  React.useEffect(() => {
    if (localStorage.getItem('key')) {
      dispatch(loginAction());
    } else dispatch(logoutAction());
  }, [localStorage.getItem('key')]);

  React.useEffect(() => {
    Requests.fetchMainPageBlocks().then((res) => {
      setCurrentLocation(res.data[0].city.city);
    });
  }, []);

  const [redirect, setRedirect] = React.useState();
  const [profilePopUpActive, setProfilePopUpActive] = React.useState(false);
  const [burgerActive, setBurgerActive] = React.useState(false);
  const [openedCategories, setOpenedCategories] = React.useState([]);
  const [ignored, forceUpdate] = React.useReducer((x) => x + 1, 0);


  const keyDownHandler = React.useCallback((event) => {
    if (
      event.keyCode === 13 &&
      (window.location.href.includes('search') || window.location.href.split('/')[1] === '')
    ) {
      searchButton.current.click();
    }
  });

  const dispatch = useDispatch();

  const { isLoggedIn, userData, subjects, reload } = useSelector(({ userData }) => userData);
  const { items, isLoaded, news } = useSelector(({ items }) => items);
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
    category_id,
  } = useSelector(({ search }) => search);

  const logout = () => {
    setProfilePopUpActive(false);
    localStorage.removeItem('key');
    localStorage.removeItem('refresh');
    localStorage.removeItem('social');
    dispatch(logoutAction());
    setRedirect(<Redirect to="/" />);
  };

  const addSubjectHandler = () => {
    if (isLoggedIn && subjects.length >= 10) {
      alert('Лимит вещей достигнут (10)');
      return;
    } else if (isLoggedIn && subjects.length >= 10) {
      alert('Лимит вещей достигнут (10)');
      return;
    } else if (!isLoggedIn) {
      alert('Сначала авторизуйтесь!');
      return;
    } else if (!userData.email_verify || !userData.phone_verify) {
      alert('У вас не подтвержден номер телефона либо почта. Подтвердите их в профиле.');
      setRedirect(<Redirect to="/private-profile" />);
      return;
    }
    window.location.href = '/place-item';
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

  const categorySetHandler = (category_id, category_name) => {
    setBurgerActive(false);
    dispatch(setCategoryId(category_id));
    dispatch(setSearchCategory(category_name));
    Requests.search(
      words,
      category_id,
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

  const openChapterHandler = (id) => {
    if (!(openedCategories === id)) {
      setOpenedCategories(id);
      forceUpdate();
    } else if (openedCategories === id) {
      setOpenedCategories(false);
      forceUpdate();
    }
  };

  React.useEffect(() => {
    Requests.fetchNews().then((res) => {
      dispatch(setNews(res.data));
    });
  }, []);

  //выделяем разделы
  const chapters = {};
  isLoaded &&
    items.length > 2 &&
    items.map((item, index) => {
      if (!chapters.hasOwnProperty(item.chapter_id.name_chapter)) {
        chapters[item.chapter_id.name_chapter] = item.chapter_id.id;
      }
    });

  //выделяем категории
  const categories = {};
  isLoaded &&
    items.length > 2 &&
    items.map((item, index) => {
      if (!categories[item.name_category]) {
        categories[item.name_category] = [[item.id, item.chapter_id.id]];
      }
    });

  return (
    <header className="header" onKeyDown={(e) => keyDownHandler(e)}>
      <div className="news-alert-block">
        <p className="news-alert-p">{news && news[0].news_description.split('.')[0]}</p>
      </div>
      <div className="header__inner">
        <div className="header-left-content">
          <Link to="/">
            <img src={Logo} alt="Global Sharing Platform" className="logo" />
          </Link>
          <div className="selector_header_items">
            <div className="location-selector">
              <img src={Local2} alt="" className="location-img" />
              <p className="location-p">{currentLocation && currentLocation}</p>
            </div>
            <div className="laguage-selector-wrapper">
            <img src={Planet2} alt="" className="language-planet-img" />
              <p className="language-selector">RU</p>
            </div>
          </div>
          {!isLoggedIn && (
            <input
              onClick={() => setModalActive(true)}
              type="button"
              value="Войти"
              className=" header-button login-button"
              id="login-button2"
            />
          )}
          {isLoggedIn && (
            <div className="header-right-content-logged-div-wrapper" id="logged-div-wrapper2">
              <div className="header-right-content-logged-div">
                <Link to="/favorites" style={{display:'flex'}}>
                  <img className="header-right-content-logged-img" src={Like_vector} id="favorites" />
                </Link>
                <img
                  className="header-right-content-logged-img"
                  src={Bell2}
                  id="notifications"
                />
                <div
                  onClick={() => setProfilePopUpActive(!profilePopUpActive)}
                  className="user-avatar-group">
                  <img
                    className="header-right-content-logged-img"
                    src={`https://razdelisdrugim.by${userData.image_profile}`}
                    id="logged-img_last_item"
                  />
                  <img
                    className="header-right-content-logged-img"
                    src={MenuStroke}
                    id="menuStroke"
                  />
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
        <div className="header-right-content">
          <div className="header-lower-table-left" id="header-lower-table-left2">
            <img
              onClick={() => setBurgerActive(!burgerActive)}
              src={Burger}
              alt=""
              className="burger-button"
              id="header-lower-table-left2"
            />
            <p className="header-lower-table-p">Каталог</p>
          </div>
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
              id="login-button1"
            />
          )}

          {isLoggedIn && (
            <div className="header-right-content-logged-div-wrapper" id="logged-div-wrapper1">
              <div className="header-right-content-logged-div">
                <Link to="/favorites">
                  <img className="header-right-content-logged-img" src={Favorites} />
                </Link>
                <img className="header-right-content-logged-img" src={Notifications} />
                <div
                  onClick={() => setProfilePopUpActive(!profilePopUpActive)}
                  className="user-avatar-group">
                  <img
                    style={{ width: '30px', height: '30px', borderRadius: '100%' }}
                    className="header-right-content-logged-img"
                    src={`https://razdelisdrugim.by${userData.image_profile}`}
                  />
                  <img src={MenuStroke} />
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
          <img
            onClick={() => setBurgerActive(!burgerActive)}
            src={Burger}
            alt=""
            className="burger-button"
            id="header-lower-table-left1"
          />
        </div>

        {burgerActive && (
          <div className={'burger_dropdown_menu'}>
            <div className="SearchPage_container_content_left">
              <ul>
                {isLoaded &&
                  [].concat.apply(Object.entries(chapters)).map((chapter, index) => {
                    return (
                      <li
                        style={{ display: 'flex', flexDirection: 'column' }}
                        className="content_left_optional_li">
                        <p onClick={() => openChapterHandler(chapter[1])}>
                          {chapter[0]}
                          <span>
                            <img src={vector2} alt="" />
                          </span>
                        </p>
                        {isLoaded &&
                          [].concat.apply(Object.entries(categories)).map((category, index) => {
                            if (
                              category[1][0][1] === chapter[1] &&
                              openedCategories === category[1][0][1]
                            ) {
                              return (
                                <p
                                  onClick={() => categorySetHandler(category[1][0][0], category[0])}
                                  className={
                                    category_id === category[1][0][0]
                                      ? 'content_left_optional_li__sub active'
                                      : 'content_left_optional_li__sub'
                                  }>
                                  {category[0]}
                                </p>
                              );
                            }
                          })}
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
        )}
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
              ref={searchButton}
            />
          </div>
        </div>
      </div>
      <BaseModal modalActive={modalActive} setModalActive={setModalActive} />
    </header>
  );
};

export default Header;
