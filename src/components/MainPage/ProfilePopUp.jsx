import React from 'react';
import { Link } from 'react-router-dom';

const ProfilePopUp = ({ logout, profilePopUpActive, setProfilePopUpActive }) => {
  return (
    <div
      className={
        profilePopUpActive
          ? 'dropdown-profile-menu-wrapper active'
          : 'dropdown-profile-menu-wrapper'
      }>
      <div className="dropdown-profile-menu-content">
        <Link to="/private-profile">
          <p onClick={() => setProfilePopUpActive(false)} className="dropdown-profile-menu-p">
            Профиль
          </p>
        </Link>
        <Link to="/favorites">
          <p onClick={() => setProfilePopUpActive(false)} className="dropdown-profile-menu-p">
            Избранное
          </p>
        </Link>
        <Link to="/i-rent-out">
          <p onClick={() => setProfilePopUpActive(false)} className="dropdown-profile-menu-p">
            Я сдаю
          </p>
        </Link>
        <p onClick={logout} className="dropdown-profile-menu-p logout">
          Выйти
        </p>
      </div>
    </div>
  );
};

export default ProfilePopUp;
