import React from "react";
import "../../css/Reviews.css";
import Shape from "../../img/Shape.png";
import ReviewSentImage from "../../img/ProfilePage/reviewsent.png";

const ReviewSent = ({ modalActiveReviewSent, setModalActiveReviewSent }) => {
  return (
    <div
      className={
        modalActiveReviewSent ? "reg-auth-wrapper active" : "reg-auth-wrapper"
      }
      style={{ display: "flex" }}
      onClick={() => setModalActiveReviewSent(false)}
    >
      <div className="reg-content">
        <div onClick={(e) => e.stopPropagation()} className="reg-form-wrapper">
          <div className="review_sent_modal">
            <div className="review_sent_modal_header">
              <img
                alt="razdelisdrugim"
                onClick={() => setModalActiveReviewSent(false)}
                src={Shape}
                className="img_krestik"
                style={{ justifySelf: "flex-end" }}
              />
            </div>
            <div className="review_sent_modal_content">
              <p className="review_sent_p">Благодарим за ваш отзыв!</p>
              <img
                src={ReviewSentImage}
                className="review_sent_image"
                alt="review sent image"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewSent;
