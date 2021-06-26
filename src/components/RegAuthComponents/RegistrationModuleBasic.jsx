import React from 'react';
import facebookLogo from '../../img/Facebook.png';
import vkLogo from '../../img/vk.png';
import googleLogo from '../../img/Google.png';
import { Redirect, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { vkAuth } from '../../http/social-auth';
import '../../css/regAuth.css';

const RegistrationModuleBasic = () => {
  //указываем основные константы для интерфейса
  const contactErrors = ['Это поле не может быть пустым', 'Некорректный телефон/Email'];
  const passwordErrors = [
    'Пароли не совпадают',
    'Это поле не может быть пустым',
    'Пароль должен содержать минимум 8 символов',
  ];
  let number = '';
  let email = '';
  let access_token = '';
  //регулярные выражения для проверки телефона и почты
  const contactEmailRegExp =
    /^((([0-9A-Za-z]{1}[-0-9A-z\.]{0,30}[0-9A-Za-z]?)|([0-9А-Яа-я]{1}[-0-9А-я\.]{0,30}[0-9А-Яа-я]?))@([-A-Za-z]{1,}\.){1,}[-A-Za-z]{2,})$/;
  const contactNumberRegExp = /^(\+375|80)(29|25|44|33)(\d{3})(\d{2})(\d{2})$/;
  const dispatch = useDispatch();

  //состояния для контроля, записи, валидации полей и формы
  const [contact, setContact] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordSubmit, setPasswordSubmit] = React.useState('');
  const [contactError, setContactError] = React.useState('Это поле не может быть пустым');
  const [passwordError, setPasswordError] = React.useState('Это поле не может быть пустым');
  const [passwordSubmitError, setPasswordSubmitError] = React.useState(
    'Это поле не может быть пустым',
  );
  const [showPass, setShowPass] = React.useState(false);
  const [showSubmitPass, setShowSubmitPass] = React.useState(false);
  const [contactDirty, setContactDirty] = React.useState();
  const [passwordDirty, setPasswordDirty] = React.useState(false);
  const [passwordSubmitDirty, setPasswordSubmitDirty] = React.useState();
  const [referral, setReferral] = React.useState('');
  const [regType, setRegType] = React.useState('1');
  const [formValid, setFormValid] = React.useState(false);
  const [redirect, setRedirect] = React.useState();

  //проврека формы на валидность
  React.useEffect(() => {
    if (contactError || passwordError || passwordSubmitError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }

    if (window.location.href.split('#access_token=')[1]) {
      access_token = window.location.href.split('#access_token=')[1].split('&')[0];
      console.log(access_token);
      axios({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          grant_type: 'convert_token',
          client_id: 'y8uGYvFxuntIEnsU8FajpLukZpYzGwvtcJQCBwVx',
          backend: 'vk-oauth2',
          token: access_token,
        },
        url: `http://host140620211735.of.by/social/convert-token/`,
      });
    }
  }, [contactError, passwordError, passwordSubmitError, window.location.href]);

  //обработчики полей ввода
  const contactHandler = (e) => {
    setContactDirty(true);
    setContact(e.target.value);
    if (
      !contactEmailRegExp.test(String(e.target.value).toLowerCase()) &&
      !contactNumberRegExp.test(String(e.target.value).toLowerCase())
    ) {
      setContactError(contactErrors[1]);
      if (e.target.value.length === 0) setContactError(contactErrors[0]);
    } else {
      setContactError('');
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
      setPasswordError('');
    }
    if (e.target.value !== passwordSubmit) {
      setPasswordSubmitError(passwordErrors[0]);
    } else setPasswordSubmitError('');
  };

  const passwordSubmitHandler = (e) => {
    setPasswordSubmitDirty(true);
    setPasswordSubmit(e.target.value);
    if (e.target.value !== password && passwordDirty) {
      setPasswordSubmitError(passwordErrors[0]);
    } else {
      setPasswordSubmitError('');
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
    console.log(contact);
    axios({
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: {
        username: contact,
        email: email ? email : 'null',
        password: password,
        password2: passwordSubmit,
      },
      url: 'http://host140620211735.of.by/api/jwt/register/',
    })
      .then((response) => {
        console.log(response);
        if (response.status === 200 || response.status === 201) {
          axios({
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${response.data.token}`,
            },
            data: {
              status: regType,
              referral_code: referral ? referral : '',
            },
            url: `http://host140620211735.of.by/api/jwt/profile/update/${response.data.id}/`,
          })
            .then((response) => {
              console.log(response);
              if (response.status === 200 || response.status === 201) {
                setRedirect(<Redirect to="/" />);
              }
            })
            .catch(() => alert('Ошибка регистрации'));
        }
      })
      .catch(() =>
        alert(email ? 'Такой Email уже зарегистрирован' : 'Такой номер уже зарегистрирован'),
      );
  };

  return (
    <div className="reg-content">
      <div className="reg-form-wrapper">
        <div className="reg-form">
          <ul className="reg-form-action-type-list">
            <li href="#" className="reg-form-action-type-link reg-form-action-type-link__active">
              Регистрация
            </li>
            <Link to="/login">
              <li href="#" className="reg-form-action-type-link">
                Вход
              </li>
            </Link>
          </ul>
          <div className="reg-form-socials">
            <img onClick={vkAuth} src={vkLogo} alt="VK" />
            <img src={facebookLogo} alt="Facebook" />
            <img src={googleLogo} alt="Google" />
          </div>
          <div className="reg-form-text-label-p">
            <p>или</p>
          </div>
          <div className="reg-form-input-area">
            <form>
              <label htmlFor="contact" className="reg-form-text-label-l">
                Номер телефона или Email <span style={{ color: 'red' }}>*</span>
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
                <label className="reg-form-text-label-l__alert">{contactError}</label>
              )}
              <label htmlFor="password" className="reg-form-text-label-l">
                Введите пароль <span style={{ color: 'red' }}>*</span>
              </label>
              <input
                name="password"
                id="password"
                type={showPass ? 'text' : 'password'}
                placeholder="..."
                className="reg-form-contact-input"
                value={password}
                onChange={(e) => passwordHandler(e)}
              />
              <a onClick={() => setShowPass(!showPass)} class="password-control"></a>
              {passwordDirty && passwordError && (
                <label className="reg-form-text-label-l__alert-moved">{passwordError}</label>
              )}
              <label htmlFor="passwordSubmit" className="reg-form-text-label-l__moved">
                Подтвердите пароль <span style={{ color: 'red' }}>*</span>
                {redirect}
              </label>
              <input
                name="passwordSubmit"
                id="passwordSubmit"
                type={showSubmitPass ? 'text' : 'password'}
                placeholder="..."
                className="reg-form-contact-input"
                value={passwordSubmit}
                onChange={(e) => {
                  passwordSubmitHandler(e);
                }}
              />
              <a onClick={() => setShowSubmitPass(!showSubmitPass)} class="password-control"></a>
              {passwordSubmitDirty && passwordSubmitError && (
                <label className="reg-form-text-label-l__alert-moved">{passwordSubmitError}</label>
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

              <div className="reg-form-reg-type-choice" onChange={(e) => radioHandler(e)}>
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
                    className="reg-form-text-label-l__radio">
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
                    className="reg-form-text-label-l__radio">
                    Бизнес
                  </label>
                </div>
              </div>
              <input
                onClick={onClickSubmit}
                type="button"
                value="Зарегистрироваться"
                className="reg-form-submit-button"
                disabled={!formValid}
              />
            </form>
          </div>
          <div className="reg-form-annotation-wrapper">
            <div className="reg-form-annotation">
              <p>
                Нажимая «Зарегистрироваться», даю согласие на обработку персональных данных и
                принимаю условия пользовательского соглашения
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationModuleBasic;
