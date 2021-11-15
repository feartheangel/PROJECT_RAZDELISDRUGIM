import React from "react";
import facebookLogo from "../../img/Facebook.png";
import vkLogo from "../../img/vk.png";
import googleLogo from "../../img/Google.png";
import { Redirect } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import Requests from "../../http/axios-requests";
import { loginAction } from "../../redux/actions/userData";
import { useDispatch } from "react-redux";
import { vkAuth, googleAuth, facebookAuth } from "../../http/social-auth";
import "../../css/regAuth.css";
import Shape from "../../img/Shape.png";
const RegistrationModuleBasic = ({ setActiveForm, setModalActive }) => {
  const dispatch = useDispatch();

  //указываем основные константы для интерфейса
  const contactErrors = [
    "Это поле не может быть пустым",
    "Некорректный телефон/Email",
  ];
  const passwordErrors = [
    "Пароли не совпадают",
    "Это поле не может быть пустым",
    "Пароль должен содержать минимум 8 символов",
  ];
  let number = "";
  let email = "";
  //регулярные выражения для проверки телефона и почты
  const contactEmailRegExp =
    /^((([0-9A-Za-z]{1}[-0-9A-z.]{0,30}[0-9A-Za-z]?)|([0-9А-Яа-я]{1}[-0-9А-я.]{0,30}[0-9А-Яа-я]?))@([-A-Za-z]{1,}\.){1,}[-A-Za-z]{2,})$/;
  const contactNumberRegExp = /^(\+375)(29|25|44|33)(\d{3})(\d{2})(\d{2})$/;

  //состояния для контроля, записи, валидации полей и формы
  const [contact, setContact] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordSubmit, setPasswordSubmit] = React.useState("");
  const [contactError, setContactError] = React.useState(
    "Это поле не может быть пустым"
  );
  const [passwordError, setPasswordError] = React.useState(
    "Это поле не может быть пустым"
  );
  const [passwordSubmitError, setPasswordSubmitError] = React.useState(
    "Это поле не может быть пустым"
  );
  const [showPass, setShowPass] = React.useState(false);
  const [showSubmitPass, setShowSubmitPass] = React.useState(false);
  const [contactDirty, setContactDirty] = React.useState();
  const [passwordDirty, setPasswordDirty] = React.useState(false);
  const [passwordSubmitDirty, setPasswordSubmitDirty] = React.useState();
  const [referral, setReferral] = React.useState("");
  const [regType, setRegType] = React.useState("1");
  const [agree, setAgree] = React.useState(false);
  const [formValid, setFormValid] = React.useState(false);
  const [captchaPassed, setCaptchaPassed] = React.useState(false);
  const [redirect, setRedirect] = React.useState();

  //проврека формы на валидность
  React.useEffect(() => {
    if (
      contactError ||
      passwordError ||
      passwordSubmitError ||
      !agree ||
      !captchaPassed
    ) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [contactError, passwordError, passwordSubmitError, agree, captchaPassed]);

  React.useEffect(() => {
    localStorage.getItem("ref") && setReferral(localStorage.getItem("ref"));
  }, []);

  //обработчики полей ввода
  const contactHandler = (e) => {
    if (e.target.value.includes(" ")) {
      return;
    }
    setContactDirty(true);
    setContact(e.target.value);
    if (
      !contactEmailRegExp.test(String(e.target.value).toLowerCase()) &&
      !contactNumberRegExp.test(String(e.target.value).toLowerCase())
    ) {
      setContactError(contactErrors[1]);
      if (e.target.value.length === 0) setContactError(contactErrors[0]);
    } else {
      setContactError("");
    }
  };

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

  const radioHandler = (e) => {
    setRegType(e.target.value);
  };

  const onClickSubmit = () => {
    if (contactEmailRegExp.test(String(contact).toLowerCase())) {
      email = contact;
    } else if (contactNumberRegExp.test(String(contact).toLowerCase())) {
      number = contact;
    }
    Requests.register(contact, email, password, passwordSubmit)
      .then((response) => {
        console.log(response);
        if (response.status === 200 || response.status === 201) {
          Requests.updateProfile(
            regType,
            referral,
            response.data.id,
            response.data.token,
            contact
          )
            .then((response) => {
              if (response.status === 200 || response.status === 201) {
                Requests.login(contact, password).then((res) => {
                  localStorage.setItem("key", res.data.access);
                  localStorage.setItem("refresh", res.data.refresh);
                  dispatch(loginAction());
                  setModalActive(false);
                  setContact("");
                  setPassword("");
                  setPasswordSubmit("");
                });
              }
            })
            .catch(() => alert("Ошибка регистрации"));
        }
      })
      .catch((err) => alert(Object.values(err.response.data)));
  };

  return (
    <div className="reg-form">
      <div className="div_for_krestik">
        <img
          alt="razdelisdrugim"
          onClick={() => setModalActive(false)}
          src={Shape}
          className="img_krestik"
          style={{
            marginRight: "15px",
            marginTop: "10px",
            justifyContent: "center",
            display: "flex",
          }}
        />
      </div>
      <ul className="reg-form-action-type-list">
        <li
          href="#"
          className="reg-form-action-type-link reg-form-action-type-link__active"
          style={{ width: "50%", justifyContent: "center", display: "flex" }}
        >
          Регистрация
        </li>
        <li
          onClick={() => setActiveForm("login")}
          href="#"
          className="reg-form-action-type-link"
          style={{ width: "50%", justifyContent: "center", display: "flex" }}
        >
          Вход
        </li>
      </ul>
      <div className="reg-form-socials">
        <img
          // style={localStorage.getItem("ref") ? { display: "none" } : {}}
          onClick={vkAuth}
          src={vkLogo}
          alt="VK"
          style={{ display: "none" }}
        />
        <img
          style={localStorage.getItem("ref") ? { display: "none" } : {}}
          onClick={facebookAuth}
          src={facebookLogo}
          alt="Facebook"
        />
        <img
          style={localStorage.getItem("ref") ? { display: "none" } : {}}
          onClick={googleAuth}
          src={googleLogo}
          alt="Google"
        />
      </div>
      <div
        style={localStorage.getItem("ref") ? { display: "none" } : {}}
        className="reg-form-text-label-p"
      >
        <p id="regform_pk">или</p>
        <p id="regform_mobile" style={{ display: "none" }}>
          или
        </p>
        <p id="regform_ipad">или</p>
      </div>
      <div className="reg-form-input-area">
        <form>
          <label htmlFor="contact" className="reg-form-text-label-l">
            Номер телефона или Email <span style={{ color: "red" }}>*</span>
          </label>
          <input
            name="contact"
            id="contact"
            type="text"
            placeholder="..."
            className="reg-form-contact-input"
            value={contact}
            onChange={(e) => {
              contactHandler(e);
            }}
          />
          {contactDirty && contactError && (
            <label className="reg-form-text-label-l__alert">
              {contactError}
            </label>
          )}
          <label htmlFor="password" className="reg-form-text-label-l">
            Введите пароль <span style={{ color: "red" }}>*</span>
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
            <label className="reg-form-text-label-l__alert-moved">
              {passwordError}
            </label>
          )}
          <label
            htmlFor="passwordSubmit"
            className="reg-form-text-label-l__moved"
          >
            Подтвердите пароль <span style={{ color: "red" }}>*</span>
            {redirect}
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
          <span
            onClick={() => setShowSubmitPass(!showSubmitPass)}
            class="password-control"
          ></span>
          {passwordSubmitDirty && passwordSubmitError && (
            <label className="reg-form-text-label-l__alert-moved">
              {passwordSubmitError}
            </label>
          )}
          <label htmlFor="referral" className="reg-form-text-label-l__moved">
            Реферальный код{redirect}
          </label>
          <input
            name="referral"
            id="referral"
            type="text"
            placeholder="..."
            className="reg-form-contact-input"
            value={referral}
            onChange={(e) => {
              setReferral(e.target.value);
            }}
          />

          <div
            className="reg-form-reg-type-choice"
            onChange={(e) => radioHandler(e)}
          >
            <div>
              <input
                type="radio"
                className="reg-form-radio-button"
                name="type_choice"
                id="reg-form-reg-type-choice__individual"
                value="1"
                defaultChecked
              />
              <label
                htmlFor="reg-form-reg-type-choice__individual"
                className="reg-form-text-label-l__radio"
              >
                Частное лицо
              </label>
            </div>
            <div>
              <input
                type="radio"
                name="type_choice"
                id="reg-form-reg-type-choice__entity"
                value="2"
                className="reg-form-radio-button"
              />
              <label
                htmlFor="reg-form-reg-type-choice__entity"
                className="reg-form-text-label-l__radio"
              >
                Бизнес
              </label>
            </div>
          </div>
          <div className="reg-form-annotation-wrapper">
            <div className="reg-form-annotation">
              <input
                type="checkbox"
                name="agree"
                id="agree"
                className="reg-form-checkbox-button"
                checked={agree}
                onChange={() => setAgree(!agree)}
              />
              <label
                htmlFor="agree"
                className="reg-form-text-label-l__radio"
              ></label>
              <p>
                Даю согласие на{" "}
                <a
                  className="reg_form_link"
                  href="/confidence-policy"
                  rel="noreffer"
                  target="_blank"
                >
                  обработку персональных данных
                </a>{" "}
                и принимаю{" "}
                <a
                  className="reg_form_link"
                  href="/users-agreement"
                  rel="noreffer"
                  target="_blank"
                >
                  условия пользовательского соглашения
                </a>
              </p>
            </div>
          </div>
          <ReCAPTCHA
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
            sitekey="6Lf5el4cAAAAAB-XdWip6AY2UiMzEekLzdUJN3ur"
            onChange={() => setCaptchaPassed(true)}
          />
          <input
            style={!formValid ? { opacity: "0.6", pointerEvents: "none" } : {}}
            onClick={onClickSubmit}
            type="button"
            value="Зарегистрироваться"
            className="reg-form-submit-button"
          />
        </form>
      </div>
    </div>
  );
};

export default RegistrationModuleBasic;
