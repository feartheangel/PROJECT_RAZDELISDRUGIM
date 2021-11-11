import React from "react";
import "../../css/ReviewsInfoBlock.css";
import disableStar from "../../img/ProfilePage/Star 1.png";
import logoPhoto from "../../img/ProfilePage/photoMan.png";

const ReviewsComponent = () => {
  return (
    <div className="cardthing_rewieus_container_content">
      <img src={logoPhoto} alt="logo" className="logo_photo_rewieus_block" />
      <div className="rewieus_container_content_info">
        <div className="rewieus_container_content_info_firstblock">
          <p className="rewieus_container_content_info_firstblock-p1">
            Пупкин Василий
          </p>
          <p className="rewieus_container_content_info_firstblock-p2">
            7.11.2021
          </p>
        </div>
        <div className="rewieus_container_content_info_rating">
          <img src={disableStar} alt="disable_star" className="rewieus_star" />
          <img src={disableStar} alt="disable_star" className="rewieus_star" />
          <img src={disableStar} alt="disable_star" className="rewieus_star" />
          <img src={disableStar} alt="disable_star" className="rewieus_star" />
          <img src={disableStar} alt="disable_star" className="rewieus_star" />
        </div>
        <p className="rewieus_container_content_info_text">
          Отличное качество! Цвет красивый!
        </p>
      </div>
    </div>
  );
};

export default ReviewsComponent;
