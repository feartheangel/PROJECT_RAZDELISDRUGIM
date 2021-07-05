import React from 'react';

const ProfilePopUp = ({ logout, profilePopUpActive }) => {
  return (
    <div
      className={
        profilePopUpActive
          ? 'dropdown-profile-menu-wrapper active'
          : 'dropdown-profile-menu-wrapper'
      }>
      <div className="dropdown-profile-menu-content">
        <p className="dropdown-profile-menu-p">Профиль</p>
        <p onClick={logout} className="dropdown-profile-menu-p logout">
          Выйти
        </p>
      </div>
    </div>
  );
};

export default ProfilePopUp;
