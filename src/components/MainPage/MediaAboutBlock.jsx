import React from 'react';
import Press from '../../img/MainPage/Press.png';

const MediaAbout = () => {
  return (
    <section className="writting-about-us">
      <div className="writting-about-us-content">
        <p className="writting-about-us-title">Медиа о нас</p>
        <div className="writting-about-us-imgs">
          <img src={Press} alt="" className="writting-about-us-img" />
          <img src={Press} alt="" className="writting-about-us-img" />
          <img src={Press} alt="" className="writting-about-us-img" />
          <img src={Press} alt="" className="writting-about-us-img" />
          <img src={Press} alt="" className="writting-about-us-img" />
        </div>
        <input type="button" value="Написать разработчикам" className="writting-about-us-button" />
      </div>
    </section>
  );
};

export default MediaAbout;
