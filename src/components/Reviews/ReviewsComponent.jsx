import React from "react";
import "../../css/ReviewsInfoBlock.css";
import Star from "../../img/ProfilePage/Star 5.png";
import disableStar from "../../img/ProfilePage/Star 1.png";
import logoPhoto from "../../img/ProfilePage/photoMan.png";

const ReviewsComponent = ({ item }) => {
  return (
    <div className="cardthing_rewieus_container_content">
      <img
        src={`data:image/png;base64,${item.author_photo}`}
        alt="logo"
        className="logo_photo_rewieus_block"
      />
      <div className="rewieus_container_content_info">
        <div className="rewieus_container_content_info_firstblock">
          <p className="rewieus_container_content_info_firstblock-p1">
            {item.author_name}
          </p>
          <p className="rewieus_container_content_info_firstblock-p2">
            {`${item.comment_date
              .split("")
              .splice(8, 2)
              .join("")}.${item.comment_date
              .split("")
              .splice(5, 2)
              .join("")}.${item.comment_date.split("").splice(0, 4).join("")}`}
          </p>
        </div>
        <div className="rewieus_container_content_info_rating">
          <img
            src={item.mark >= 1 ? Star : disableStar}
            alt="disable_star"
            className="rewieus_star"
          />
          <img
            src={item.mark >= 2 ? Star : disableStar}
            alt="disable_star"
            className="rewieus_star"
          />
          <img
            src={item.mark >= 3 ? Star : disableStar}
            alt="disable_star"
            className="rewieus_star"
          />
          <img
            src={item.mark >= 4 ? Star : disableStar}
            alt="disable_star"
            className="rewieus_star"
          />
          <img
            src={item.mark >= 5 ? Star : disableStar}
            alt="disable_star"
            className="rewieus_star"
          />
        </div>
        <p className="rewieus_container_content_info_text">{item.content}</p>
      </div>
    </div>
  );
};

export default ReviewsComponent;
