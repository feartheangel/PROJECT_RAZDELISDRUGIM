import React from "react";
import "../../css/ReviewsInfoBlock.css";
import ReviewsComponent from "./ReviewsComponent";
import vectorLeft from "../../img/SearchPage/Vector3.png";
import vectorRight from "../../img/SearchPage/Vector4.png";

const ReviewsProfile = ({ reviews }) => {
  const [reviewsPage, setReviewsPage] = React.useState(1);
  const [reviewsPagesCount, setReviewsPagesCount] = React.useState(
    reviews && Math.ceil(reviews.length / 5)
  );

  React.useEffect(() => {
    reviews && setReviewsPagesCount(Math.ceil(reviews.length / 5));
  }, [reviews]);

  const pastPageHandler = () => {
    if (reviewsPage === 1) {
      return;
    } else {
      setReviewsPage(reviewsPage - 1);
    }
  };

  const nextPageHandler = () => {
    if (reviewsPage === reviewsPagesCount) {
      return;
    } else {
      setReviewsPage(reviewsPage + 1);
    }
  };

  return (
    <div className="cardthing_rewieus2">
      <div className="cardthing_rewieus_container">
        {reviews &&
          reviews.map((item, index) => {
            if (index < reviewsPage * 5 && index >= reviewsPage * 5 - 5) {
              return (
                <ReviewsComponent
                  item={item}
                  reviewsPage={reviewsPage}
                  index={index}
                />
              );
            }
          })}
        {reviews && reviews.length === 0 && (
          <div className="cardthing_rewieus_container_no_reviews_wrapper">
            <p className="cardthing_rewieus_container_no_reviews">
              Пока нет отзывов
            </p>
          </div>
        )}
        {reviews && reviews.length > 5 && (
          <div className="cardthing_rewieus_container_footer">
            <div
              onClick={() => pastPageHandler()}
              className="cardthing_rewieus_container_footer_left"
            >
              <img src={vectorLeft} alt="vector" className="vector_reviews" />
              <p className="cardthing_rewieus_container_footer_left-p">Назад</p>
            </div>
            <div className="cardthing_rewieus_container_footer_center">
              <p className="cardthing_rewieus_container_footer_center-p">
                {reviewsPage}/{reviewsPagesCount}
              </p>
            </div>
            <div
              onClick={() => nextPageHandler()}
              className="cardthing_rewieus_container_footer_right"
            >
              <p className="cardthing_rewieus_container_footer_right-p">
                Далее
              </p>
              <img src={vectorRight} alt="vector" className="vector_reviews" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewsProfile;
