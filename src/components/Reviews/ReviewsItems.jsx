import React from "react";
import "../../css/ReviewsInfoBlock.css";
import ReviewsComponent from "./ReviewsComponent";
import vectorLeft from "../../img/SearchPage/Vector3.png";
import vectorRight from "../../img/SearchPage/Vector4.png";

const ReviewsItems = () => {
  return (
    <div className="cardthing_rewieus">
      <div className="cardthing_rewieus_container">
        <div className="cardthing_rewieus_container_head">
          <p className="cardthing_rewieus_container_head-p1">Отзывы</p>
          <p className="cardthing_rewieus_container_head-p2">14</p>
        </div>
        <ReviewsComponent />
        <ReviewsComponent />
        <div className="cardthing_rewieus_container_footer">
          <div className="cardthing_rewieus_container_footer_left">
            <img src={vectorLeft} alt="vector" className="vector_reviews" />
            <p className="cardthing_rewieus_container_footer_left-p">Назад</p>
          </div>
          <div className="cardthing_rewieus_container_footer_center">
            <p className="cardthing_rewieus_container_footer_center-p">1</p>
            <p className="cardthing_rewieus_container_footer_center-p">2</p>
            <p className="cardthing_rewieus_container_footer_center-p">3</p>
            <p className="cardthing_rewieus_container_footer_center-p">...</p>
            <p className="cardthing_rewieus_container_footer_center-p">10</p>
          </div>
          <div className="cardthing_rewieus_container_footer_right">
            <p className="cardthing_rewieus_container_footer_right-p">Далее</p>
            <img src={vectorRight} alt="vector" className="vector_reviews" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewsItems;
