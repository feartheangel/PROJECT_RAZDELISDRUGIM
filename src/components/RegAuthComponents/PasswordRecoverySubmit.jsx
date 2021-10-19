import React from "react";
import { Link, Redirect } from "react-router-dom";
import Requests from "../../http/axios-requests";
import Shape from "../../img/Shape.png";

const PasswordRecoverySubmit = ({ setModalActive }) => {
  const passwordErrors = [
    "Пароли не совпадают",
    "Это поле не может быть пустым",
    "Пароль должен содержать минимум 8 символов",
  ];

  //состояния для валидации, хранения данных из полей
  const [password, setPassword] = React.useState();
  const [passwordSubmit, setPasswordSubmit] = React.useState();
  const [passwordDirty, setPasswordDirty] = React.useState();
  const [passwordSubmitDirty, setPasswordSubmitDirty] = React.useState();
  const [passwordError, setPasswordError] = React.useState();
  const [passwordSubmitError, setPasswordSubmitError] = React.useState();
  const [token, setToken] = React.useState("");
  const [showPass, setShowPass] = React.useState(false);
  const [showSubmitPass, setShowSubmitPass] = React.useState(false);
  const [formValid, setFormValid] = React.useState();
  const [redirect, setRedirect] = React.useState("");

  React.useEffect(() => {
    if (window.location.href.split("token=")[1]) {
      setToken(window.location.href.split("token=")[1]);
      console.log(token);
    }
  }, [window.location.href]);

  //проверка валидности полей
  React.useEffect(() => {
    if (passwordError || passwordSubmitError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [passwordError, passwordSubmitError]);

  //обработчики полей
  const passwordHandler = (e) => {
    setPasswordDirty(true);
    setPassword(e.target.value);
    if (e.target.value.length === 0) {
      setPasswordError(passwordErrors[1]);
    } else if (e.target.value.length !== 0 && e.target.value.length < 8) {
      setPasswordError(passwordErrors[2]);
    } else {
      setPasswordError("");
    }
    if (e.target.value !== passwordSubmit) {
      setPasswordSubmitError(passwordErrors[0]);
    } else setPasswordSubmitError("");
  };

  const passwordSubmitHandler = (e) => {
    setPasswordSubmitDirty(true);
    setPasswordSubmit(e.target.value);
    if (e.target.value !== password && passwordDirty) {
      setPasswordSubmitError(passwordErrors[0]);
    } else {
      setPasswordSubmitError("");
    }
  };

  //обработчик клика по кнопке регистрации
  const onClickSubmit = () => {
    Requests.passwordRecoverySubmit(token, password)
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          console.log(response);
          alert("Пароль успешно обновлен!");
          setRedirect(<Redirect to="/" />);
        }
      })
      .catch((err) => alert("Ошибка сброса пароля!"));
  };
  return (
    <div>
      <div className="reg-auth-wrapper" id="globaldata_pk">
        <div className="reg-content">
          <div className="reg-form-wrapper-email-verification">
            <div
              className="reg-form-email-verification"
              style={{ height: "400px" }}
            >
              <img
                alt="picture1"
                onClick={() => setModalActive(false)}
                style={{
                  marginTop: "25px",
                  marginLeft: "485px",
                  height: "14px",
                  width: "14px",
                  cursor: "pointer",
                }}
                src={Shape}
              />
              <ul className="reg-form-action-type-list">
                <Link tag="li" to="/registration">
                  <li
                    href="#"
                    className="reg-form-action-type-link"
                    style={{ fontSize: "25px" }}
                    style={{
                      width: "50%",
                      justifyContent: "center",
                      display: "flex",
                    }}
                  >
                    Регистрация{redirect}
                  </li>
                </Link>
                <li
                  href="#"
                  className="reg-form-action-type-link reg-form-action-type-link__active"
                  style={{ fontSize: "25px" }}
                  style={{
                    width: "50%",
                    justifyContent: "center",
                    display: "flex",
                  }}
                >
                  Вход
                </li>
              </ul>
              <div className="log-form-text-label-p-email__upper">
                <p>Придумайте новый пароль</p>
              </div>
              <div className="reg-form-annotation-wrapper"></div>
              <div className="reg-form-input-area">
                <form>
                  <label htmlFor="password" className="log-form-text-label-l">
                    Введите новый пароль
                  </label>
                  <input
                    name="password"
                    id="passsword"
                    type={showPass ? "text" : "password"}
                    placeholder="..."
                    className="reg-form-contact-input"
                    value={password}
                    onChange={(e) => {
                      passwordHandler(e);
                    }}
                  />
                  <a
                    onClick={() => setShowPass(!showPass)}
                    class="password-control"
                  ></a>
                  {passwordDirty && passwordError && (
                    <label className="reg-form-text-label-l__alert-moved">
                      {passwordError}
                    </label>
                  )}
                  <label
                    htmlFor="passwordSubmit"
                    className="reg-form-text-label-l__moved"
                  >
                    Подтвердите новый пароль
                  </label>
                  <input
                    name="passwordSubmit"
                    id="passwordSubmit"
                    type={showSubmitPass ? "text" : "password"}
                    placeholder="..."
                    className="reg-form-contact-input"
                    value={passwordSubmit}
                    onChange={(e) => {
                      passwordSubmitHandler(e);
                    }}
                  />
                  <a
                    onClick={() => setShowSubmitPass(!showSubmitPass)}
                    class="password-control"
                  ></a>
                  {passwordSubmitDirty && passwordSubmitError && (
                    <label className="reg-form-text-label-l__alert-moved">
                      {passwordSubmitError}
                    </label>
                  )}
                  <input
                    onClick={onClickSubmit}
                    type="button"
                    value="Продолжить"
                    className="reg-form-submit-button"
                    disabled={!formValid}
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* МОБИЛЬНАЯ ВЕРСИЯ */}
      <div
        // className={modalActiveNumber ? 'reg-auth-wrapper active' : 'reg-auth-wrapper'}
        // onClick={() => setModalActiveNumber(false)}
        id="globaldata_mobile"
      >
        <div className="reg-content">
          <div className="reg-form-wrapper-email-verification">
            <div className="reg-form-email-verification">
              <div className="div_for_krestik">
                <img
                  alt="picture1"
                  onClick={() => setModalActive(false)}
                  src={Shape}
                  className="img_krestik"
                  style={{ marginRight: "15px" }}
                />
              </div>
              <ul className="reg-form-action-type-list">
                <Link tag="li" to="/registration">
                  <li
                    href="#"
                    className="reg-form-action-type-link"
                    style={{ fontSize: "16px" }}
                    style={{
                      width: "50%",
                      justifyContent: "center",
                      display: "flex",
                    }}
                  >
                    Регистрация{redirect}
                  </li>
                </Link>
                <li
                  href="#"
                  className="reg-form-action-type-link reg-form-action-type-link__active"
                  style={{ fontSize: "16px" }}
                  style={{
                    width: "50%",
                    justifyContent: "center",
                    display: "flex",
                  }}
                >
                  Вход
                </li>
              </ul>
              <div className="log-form-text-label-p-email__upper">
                <p>Придумайте новый пароль</p>
              </div>
              <div className="reg-form-annotation-wrapper"></div>
              <div className="reg-form-input-area">
                <form>
                  <label htmlFor="password" className="log-form-text-label-l">
                    Введите новый пароль
                  </label>
                  <input
                    name="password"
                    id="passsword"
                    type={showPass ? "text" : "password"}
                    placeholder="..."
                    className="reg-form-contact-input"
                    value={password}
                    onChange={(e) => {
                      passwordHandler(e);
                    }}
                  />
                  <a
                    onClick={() => setShowPass(!showPass)}
                    class="password-control"
                  ></a>
                  {passwordDirty && passwordError && (
                    <label className="reg-form-text-label-l__alert-moved">
                      {passwordError}
                    </label>
                  )}
                  <label
                    htmlFor="passwordSubmit"
                    className="reg-form-text-label-l__moved"
                  >
                    Подтвердите новый пароль
                  </label>
                  <input
                    name="passwordSubmit"
                    id="passwordSubmit"
                    type={showSubmitPass ? "text" : "password"}
                    placeholder="..."
                    className="reg-form-contact-input"
                    value={passwordSubmit}
                    onChange={(e) => {
                      passwordSubmitHandler(e);
                    }}
                  />
                  <a
                    onClick={() => setShowSubmitPass(!showSubmitPass)}
                    class="password-control"
                  ></a>
                  {passwordSubmitDirty && passwordSubmitError && (
                    <label className="reg-form-text-label-l__alert-moved">
                      {passwordSubmitError}
                    </label>
                  )}
                  <input
                    onClick={onClickSubmit}
                    type="button"
                    value="Продолжить"
                    className="reg-form-submit-button"
                    disabled={!formValid}
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordRecoverySubmit;
