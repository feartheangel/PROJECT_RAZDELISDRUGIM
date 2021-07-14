import React from 'react';
import { Link } from 'react-router-dom';

const ProfilePopUp = ({ logout, profilePopUpActive }) => {
  return (
    <div
      className={
        profilePopUpActive
          ? 'dropdown-profile-menu-wrapper active'
          : 'dropdown-profile-menu-wrapper'
      }>
      <div className="dropdown-profile-menu-content">
        <Link to="/private-profile">
          <p className="dropdown-profile-menu-p">Профиль</p>
        </Link>
        <p onClick={logout} className="dropdown-profile-menu-p logout">
          Выйти
        </p>
      </div>
    </div>
  );
};

export default ProfilePopUp;
