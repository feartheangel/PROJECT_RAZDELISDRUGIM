import React from "react";
import Review from "../../img/MainPage/Review.png";

const ReviewsBlock = () => {
  return (
    <section className="reviews">
      <p className="reviews-main-title">Отзывы о нас</p>
      <div className="reviews-blocks">
        <div className="reviews-block">
          <img alt="picture1" src={Review} className="review-img" />
          <p className="review-name">Андрей Васильевич</p>
          <p className="review-date">20.06.2021</p>
          <p className="review-text">
            Брал в аренду детское автокресло на данном сайте. Быстро и удобно.
            спасибо за отличный сервис!
          </p>
        </div>
        <div className="reviews-block">
          <img alt="picture1" src={Review} className="review-img" />
          <p className="review-name">Андрей Васильевич</p>
          <p className="review-date">20.06.2021</p>
          <p className="review-text">
            Брал в аренду детское автокресло на данном сайте. Быстро и удобно.
            спасибо за отличный сервис!
          </p>
        </div>
        <div className="reviews-block">
          <img alt="picture1" src={Review} className="review-img" />
          <p className="review-name">Андрей Васильевич</p>
          <p className="review-date">20.06.2021</p>
          <p className="review-text">
            Брал в аренду детское автокресло на данном сайте. Быстро и удобно.
            спасибо за отличный сервис!
          </p>
        </div>
        <div className="reviews-block">
          <img alt="picture1" src={Review} className="review-img" />
          <p className="review-name">Андрей Васильевич</p>
          <p className="review-date">20.06.2021</p>
          <p className="review-text">
            Брал в аренду детское автокресло на данном сайте. Быстро и удобно.
            спасибо за отличный сервис!
          </p>
        </div>
      </div>
      <div className="reviews-buttons">
        <input
          type="button"
          value="Написать разработчикам"
          className="reviews-button-write-dev"
        />
        <input
          type="button"
          value="Написать отзыв"
          className="reviews-button-write-review"
        />
      </div>
    </section>
  );
};

export default ReviewsBlock;
