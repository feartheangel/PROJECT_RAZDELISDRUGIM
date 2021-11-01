import React from "react";

import Requests from "../../http/axios-requests";

const StatusUpdateSubmit = ({
  reserveId,
  reserveUpdateBool,
  setModalActiveSubmit,
  modalActiveSubmit,
  toggleReloadReservations,
}) => {
  //обработчики кнопок

  const noHandler = () => {
    setModalActiveSubmit(false);
  };

  const yesHandler = () => {
    Requests.updateReservationStatus(reserveId, reserveUpdateBool)
      .then(() => {
        toggleReloadReservations();
        setModalActiveSubmit(false);
      })
      .catch((err) => {
        setModalActiveSubmit(false);
        alert(err.response.data);
      });
  };

  return (
    <div
      className={
        modalActiveSubmit ? "reg-auth-wrapper active" : "reg-auth-wrapper"
      }
      style={{ display: "flex" }}
      onClick={() => setModalActiveSubmit(false)}
    >
      <div className="reg-content">
        <div onClick={(e) => e.stopPropagation()} className="reg-form-wrapper">
          <div
            style={{
              display: "flex",
              width: "100%",
              borderRadius: "10px",
              padding: "35px",
            }}
            className="reg-form-email-verification"
          >
            <div className="log-form-text-label-p-email__upper">
              <p>
                {reserveUpdateBool === "DENIED"
                  ? "Вы уверены, что хотите отклонить бронирование?"
                  : reserveUpdateBool === "SUBMITTED"
                  ? "Вы уверены, что хотите подтвердить бронирование?"
                  : reserveUpdateBool === "CANCELED"
                  ? "Вы уверены, что хотите отменить бронирование?"
                  : ""}
              </p>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: "20px",
              }}
              className="reg-form-input-area"
            >
              <input
                style={{ marginRight: "20px" }}
                type="button"
                value="Нет"
                className="reg-form-contact-input__delete"
                onClick={noHandler}
              />

              <input
                style={{
                  backgroundColor: "red",
                  boxShadow: "3px 3px 22px rgba(219, 13, 13, 0.24)",
                }}
                type="button"
                className="reg-form-contact-input__delete"
                value="Да"
                onClick={yesHandler}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusUpdateSubmit;
