import React from "react";
import "../../css/Reviews.css";
import Requests from "../../http/axios-requests";
import Shape from "../../img/Shape.png";
import Star from "../../img/Star.png";
import StarDisabled from "../../img/Star_disabled.png";
import logoItem from "../../img/ProfilePage/itemslogo.png";

const SendReviewModal = ({
  modalActiveSendReview,
  setModalActiveSendReview,
  reviewItemId,
  reviewPersonId,
  reviewType,
  reviewItemImage,
  reviewItemName,
  reviewPersonName,
}) => {
  const [personMark, setPersonMark] = React.useState(0);
  const [itemMark, setItemMark] = React.useState(0);
  const [itemReview, setItemReview] = React.useState();
  const [ownerReview, setOwnerReview] = React.useState();
  const [renterReview, setRenterReview] = React.useState();

  //обработчик отправки отзыва

  const sendReviewHandler = () => {
    if (reviewType === 1) {
      Requests.sendProfileReview(ownerReview, reviewPersonId, personMark)
        .then(() => {
          Requests.sendItemReview(itemReview, reviewItemId, itemMark)
            .then(() => {
              alert("Отзыв успешно отправлен!");
              setPersonMark(0);
              setItemMark(0);
              setItemReview("");
              setOwnerReview("");
              setRenterReview("");
            })
            .catch((e) => alert(e.response.data))
            .finally(() => setModalActiveSendReview(false));
        })
        .catch((e) => alert(e.response.data));
    } else if (reviewType === 2) {
      Requests.sendProfileReview(renterReview, reviewPersonId, personMark)
        .then(() => {
          alert("Отзыв успешно отправлен!");
          setPersonMark(0);
          setItemMark(0);
          setItemReview("");
          setOwnerReview("");
          setRenterReview("");
        })
        .catch((e) => alert(e.response.data))
        .finally(() => setModalActiveSendReview(false));
    }
  };

  return (
    <div
      className={
        modalActiveSendReview ? "reg-auth-wrapper active" : "reg-auth-wrapper"
      }
      style={{ display: "flex" }}
      onClick={() => setModalActiveSendReview(false)}
    >
      <div className="reg-content">
        <div onClick={(e) => e.stopPropagation()} className="reg-form-wrapper">
          <div className="reviews_form">
            <div className="reviews_modal_header">
              <h1 className="reviews_main_title">Оставить отзыв</h1>
              <img
                alt="razdelisdrugim"
                onClick={() => setModalActiveSendReview(false)}
                src={Shape}
                className="img_krestik"
                style={{ marginLeft: "0" }}
              />
            </div>
            <div className="reviews_mark_wrapper">
              <p className="reviews_mark_p">Поставьте оценку</p>
              <div className="reviews_stars_wrapper">
                <img
                  onClick={() => setPersonMark(1)}
                  src={personMark >= 1 ? Star : StarDisabled}
                  alt="star_mark"
                />
                <img
                  onClick={() => setPersonMark(2)}
                  src={personMark >= 2 ? Star : StarDisabled}
                  alt="star_mark"
                />
                <img
                  onClick={() => setPersonMark(3)}
                  src={personMark >= 3 ? Star : StarDisabled}
                  alt="star_mark"
                />
                <img
                  onClick={() => setPersonMark(4)}
                  src={personMark >= 4 ? Star : StarDisabled}
                  alt="star_mark"
                />
                <img
                  onClick={() => setPersonMark(5)}
                  src={personMark >= 5 ? Star : StarDisabled}
                  alt="star_mark"
                />
              </div>
            </div>
            {reviewType === 1 && (
              <div>
                <div className="reviews_owner_review_wrapper">
                  <p className="reviews_owner_review_p">
                    Напишите свой<br></br> отзыв о владельце<br></br>
                    <span className="reviews_owner_review_p_name">
                      {reviewPersonName}
                    </span>
                  </p>
                  <textarea
                    value={ownerReview}
                    onChange={(e) => setOwnerReview(e.target.value)}
                    placeholder="Ваши впечатления о владельце?"
                    className="reviews_owner_review_textarea"
                  />
                </div>
                <div className="reviews_mark_wrapper2">
                  <p className="reviews_mark_p">Поставьте оценку вещи/услуге</p>
                  <div className="reviews_stars_wrapper">
                    <img
                      onClick={() => setItemMark(1)}
                      src={itemMark >= 1 ? Star : StarDisabled}
                      alt="star_mark"
                    />
                    <img
                      onClick={() => setItemMark(2)}
                      src={itemMark >= 2 ? Star : StarDisabled}
                      alt="star_mark"
                    />
                    <img
                      onClick={() => setItemMark(3)}
                      src={itemMark >= 3 ? Star : StarDisabled}
                      alt="star_mark"
                    />
                    <img
                      onClick={() => setItemMark(4)}
                      src={itemMark >= 4 ? Star : StarDisabled}
                      alt="star_mark"
                    />
                    <img
                      onClick={() => setItemMark(5)}
                      src={itemMark >= 5 ? Star : StarDisabled}
                      alt="star_mark"
                    />
                  </div>
                </div>
                <div className="reviews_item_review_wrapper">
                  <div className="reviews_item_review_wrapper_leftside">
                    <p className="reviews_item_review_p">
                      Напишите свой<br></br> отзыв о вещи/услуге
                    </p>

                    <div className="review_logo_block">
                      <img
                        className="review_logo_items"
                        src={`data:image/png;base64,${reviewItemImage}`}
                        alt="logo"
                      />
                      <p className="reviews_item_review_p2">{reviewItemName}</p>
                    </div>
                  </div>
                  <textarea
                    value={itemReview}
                    onChange={(e) => setItemReview(e.target.value)}
                    className="reviews_item_review_textarea"
                    placeholder="Что Вам понравилось? Кому бы Вы порекомендовали данную вещь/услугу?"
                  />
                </div>
              </div>
            )}

            {reviewType === 2 && (
              <div>
                <div className="reviews_owner_review_wrapper">
                  <p className="reviews_owner_review_p">
                    Напишите свой<br></br> отзыв об арендаторе
                  </p>
                  <textarea
                    value={renterReview}
                    onChange={(e) => setRenterReview(e.target.value)}
                    placeholder="Ваши впечатления об арендаторе?"
                    className="reviews_owner_review_textarea"
                  />
                </div>
              </div>
            )}

            <div className="reviews_buttons_wrapper">
              <input
                onClick={() => setModalActiveSendReview(false)}
                type="button"
                className="reviews_button_cancel"
                value="Отмена"
              />
              <input
                type="button"
                className="reviews_button_send"
                value="Оставить отзыв"
                onClick={sendReviewHandler}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendReviewModal;
