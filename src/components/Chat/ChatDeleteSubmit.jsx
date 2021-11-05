import React from "react";

const ChatDeleteSubmit = ({
  deleteChatId,
  setModalActiveSubmit,
  modalActiveSubmit,
  chatSocket,
}) => {
  //обработчики кнопок

  const noHandler = () => {
    setModalActiveSubmit(false);
  };

  const yesHandler = () => {
    chatSocket.current.send(
      JSON.stringify({
        command: "delete_chat",
        chat_id: deleteChatId,
      })
    );
    setModalActiveSubmit(false);
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
              <p> Вы уверены, что хотите удалить чат?</p>
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

export default ChatDeleteSubmit;
