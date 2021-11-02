import React from "react";
import facebookLogo from "../../img/Facebook.png";
import vkLogo from "../../img/vk.png";
import googleLogo from "../../img/Google.png";
import { Redirect } from "react-router-dom";
import { vkAuth, googleAuth, facebookAuth } from "../../http/social-auth";
import Requests from "../../http/axios-requests";
import { useDispatch } from "react-redux";
import { loginAction } from "../../redux/actions/userData";
import Shape from "../../img/Shape.png";

const LoginModule = ({ setModalActive, setActiveForm }) => {
  const dispatch = useDispatch();
  let code = "";
  const inputErrors = ["Поле не может быть пустым", "Минимум 8 символов"];

  //состояния для валидации, хранения данных из полей
  const [login, setLogin] = React.useState();
  const [password, setPassword] = React.useState();
  const [loginDirty, setLoginDirty] = React.useState();
  const [passwordDirty, setPasswordDirty] = React.useState();
  const [loginError, setLoginError] = React.useState(
    "Поле не может быть пустым"
  );
  const [passwordError, setPasswordError] = React.useState(
    "Поле не может быть пустым"
  );
  const [formValid, setFormValid] = React.useState(false);
  const [successLogin, setSuccessLogin] = React.useState(false);
  const [showPass, setShowPass] = React.useState(false);

  //проверка валидности полей
  React.useEffect(() => {
    if (loginError || passwordError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [loginError, passwordError]);

  //обработчики полей
  const loginHandler = (e) => {
    setLoginDirty(true);
    setLogin(e.target.value);
    if (e.target.value.length === 0) {
      setLoginError(inputErrors[0]);
    } else {
      setLoginError("");
    }
  };

  const passwordHandler = (e) => {
    setPasswordDirty(true);
    setPassword(e.target.value);
    if (e.target.value.length === 0) {
    } else if (e.target.value.length !== 0 && e.target.value.length < 8) {
      setPasswordError(inputErrors[1]);
    } else {
      setPasswordError("");
    }
  };

  //обработчик клика по кнопке регистрации
  const onClickSubmit = () => {
    Requests.login(login, password)
      .then((response) => {
        localStorage.setItem("key", response.data.access);
        localStorage.setItem("refresh", response.data.refresh);
        dispatch(loginAction());
        setModalActive(false);
        setLogin("");
        setPassword("");
      })
      .catch(() => alert("Ошибка авторизации (данные введены неверно)"));
  };
  return (
    <div className="log-form">
      <div className="log-form" id="regform_pk">
        <div className="div_for_krestik">
          <img
            alt="razdelisdrugim"
            onClick={() => setModalActive(false)}
            src={Shape}
            className="img_krestik"
            style={{ marginRight: "15px" }}
          />
        </div>
        <ul className="reg-form-action-type-list">
          <li
            onClick={() => setActiveForm("register")}
            href="#"
            style={{
              fontSize: "25px",
              width: "50%",
              justifyContent: "center",
              display: "flex",
            }}
            className="reg-form-action-type-link"
          >
            Регистрация{successLogin}
          </li>
          <li
            href="#"
            className="reg-form-action-type-link reg-form-action-type-link__active"
            style={{
              fontSize: "25px",
              width: "50%",
              justifyContent: "center",
              display: "flex",
            }}
          >
            Вход
          </li>
        </ul>
        <div className="log-form-text-label-p__upper">
          <p>Войти через соцсети</p>
        </div>
        <div className="reg-form-socials">
          <img
            style={{ display: "none" }}
            onClick={vkAuth}
            src={vkLogo}
            alt="VK"
          />
          <img onClick={facebookAuth} src={facebookLogo} alt="Facebook" />
          <img onClick={googleAuth} src={googleLogo} alt="Google" />
        </div>
        <div className="log-form-text-label-p__lower">
          <p>или</p>
        </div>
        <div className="reg-form-input-area">
          <form>
            <label htmlFor="login" className="log-form-text-label-l">
              Номер телефона или Email
            </label>
            <input
              name="login"
              id="login"
              type="text"
              placeholder="..."
              className="reg-form-contact-input"
              value={login}
              onChange={(e) => {
                loginHandler(e);
              }}
            />
            {loginDirty && loginError && (
              <label className="reg-form-text-label-l__alert">
                {loginError}
              </label>
            )}
            <label htmlFor="password" className="log-form-text-label-l">
              Пароль
            </label>
            <input
              name="password"
              id="password"
              type={showPass ? "text" : "password"}
              placeholder="..."
              className="reg-form-contact-input"
              value={password}
              onChange={(e) => passwordHandler(e)}
            />
            <span
              onClick={() => setShowPass(!showPass)}
              class="password-control"
            ></span>
            {passwordDirty && passwordError && (
              <label className="reg-form-text-label-l__alert">
                {passwordError}
              </label>
            )}
            <div className="log-form-text-label-l__recover">
              <label
                className="reg_form_link"
                onClick={() => setActiveForm("passwordRecoveryEntry")}
              >
                Забыли пароль?
              </label>
            </div>
            <input
              onClick={onClickSubmit}
              type="button"
              value="Войти"
              className="reg-form-submit-button"
              disabled={!formValid}
            />
          </form>
        </div>
      </div>

      {/* mobile */}
      <div className="log-form" id="regform_mobile">
        <div className="div_for_krestik">
          <img
            alt="razdelisdrugim"
            onClick={() => setModalActive(false)}
            src={Shape}
            className="img_krestik"
            style={{ marginRight: "15px" }}
          />
        </div>
        <ul className="reg-form-action-type-list">
          <li
            onClick={() => setActiveForm("register")}
            href="#"
            style={{
              fontSize: "16px",
              width: "50%",
              justifyContent: "center",
              display: "flex",
            }}
            className="reg-form-action-type-link"
          >
            Регистрация{successLogin}
          </li>
          <li
            href="#"
            className="reg-form-action-type-link reg-form-action-type-link__active"
            style={{
              fontSize: "16px",
              width: "50%",
              justifyContent: "center",
              display: "flex",
            }}
          >
            Вход
          </li>
        </ul>
        <div className="reg-form-socials">
          <img onClick={vkAuth} src={vkLogo} alt="VK" />
          <img onClick={facebookAuth} src={facebookLogo} alt="Facebook" />
          <img onClick={googleAuth} src={googleLogo} alt="Google" />
        </div>
        <div className="reg-form-input-area">
          <form>
            <label htmlFor="login" className="log-form-text-label-l">
              Номер телефона или Email
            </label>
            <input
              name="login"
              id="login"
              type="text"
              placeholder="..."
              className="reg-form-contact-input"
              value={login}
              onChange={(e) => {
                loginHandler(e);
              }}
            />
            {loginDirty && loginError && (
              <label className="reg-form-text-label-l__alert">
                {loginError}
              </label>
            )}
            <label htmlFor="password" className="log-form-text-label-l">
              Пароль
            </label>
            <input
              name="password"
              id="password"
              type={showPass ? "text" : "password"}
              placeholder="..."
              className="reg-form-contact-input"
              value={password}
              onChange={(e) => passwordHandler(e)}
            />
            <span
              onClick={() => setShowPass(!showPass)}
              class="password-control"
            ></span>
            {passwordDirty && passwordError && (
              <label className="reg-form-text-label-l__alert">
                {passwordError}
              </label>
            )}
            <div className="log-form-text-label-l__recover">
              <label
                className="reg_form_link"
                onClick={() => setActiveForm("passwordRecoveryEntry")}
              >
                Забыли пароль?
              </label>
            </div>
            <input
              onClick={onClickSubmit}
              type="button"
              value="Войти"
              className="reg-form-submit-button"
              disabled={!formValid}
            />
          </form>
        </div>
      </div>

      {/* planshet  */}
      <div className="log-form" id="regform_ipad">
        <div className="div_for_krestik">
          <img
            alt="razdelisdrugim"
            onClick={() => setModalActive(false)}
            src={Shape}
            className="img_krestik"
            style={{ marginRight: "15px" }}
          />
        </div>
        <ul className="reg-form-action-type-list">
          <li
            onClick={() => setActiveForm("register")}
            href="#"
            style={{ fontSize: "25px" }}
            className="reg-form-action-type-link"
          >
            Регистрация{successLogin}
          </li>
          <li
            href="#"
            className="reg-form-action-type-link reg-form-action-type-link__active"
            style={{ fontSize: "25px" }}
          >
            Вход
          </li>
        </ul>
        <div className="log-form-text-label-p__upper">
          <p>Войти через соцсети</p>
        </div>
        <div className="reg-form-socials">
          <img onClick={vkAuth} src={vkLogo} alt="VK" />
          <img onClick={facebookAuth} src={facebookLogo} alt="Facebook" />
          <img onClick={googleAuth} src={googleLogo} alt="Google" />
        </div>
        <div className="log-form-text-label-p__lower">
          <p>или</p>
        </div>
        <div className="reg-form-input-area">
          <form>
            <label htmlFor="login" className="log-form-text-label-l">
              Номер телефона или Email
            </label>
            <input
              name="login"
              id="login"
              type="text"
              placeholder="..."
              className="reg-form-contact-input"
              value={login}
              onChange={(e) => {
                loginHandler(e);
              }}
            />
            {loginDirty && loginError && (
              <label className="reg-form-text-label-l__alert">
                {loginError}
              </label>
            )}
            <label htmlFor="password" className="log-form-text-label-l">
              Пароль
            </label>
            <input
              name="password"
              id="password"
              type={showPass ? "text" : "password"}
              placeholder="..."
              className="reg-form-contact-input"
              value={password}
              onChange={(e) => passwordHandler(e)}
            />
            <span
              onClick={() => setShowPass(!showPass)}
              class="password-control"
            ></span>
            {passwordDirty && passwordError && (
              <label className="reg-form-text-label-l__alert">
                {passwordError}
              </label>
            )}
            <div className="log-form-text-label-l__recover">
              <label
                className="reg_form_link"
                onClick={() => setActiveForm("passwordRecoveryEntry")}
              >
                Забыли пароль?
              </label>
            </div>
            <input
              onClick={onClickSubmit}
              type="button"
              value="Войти"
              className="reg-form-submit-button"
              disabled={!formValid}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginModule;
