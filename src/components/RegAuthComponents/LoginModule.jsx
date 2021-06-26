import React from 'react';
import facebookLogo from '../../img/Facebook.png';
import vkLogo from '../../img/vk.png';
import googleLogo from '../../img/Google.png';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

const LoginModule = () => {
  const inputErrors = ['Поле не может быть пустым', 'Минимум 8 символов'];

  //состояния для валидации, хранения данных из полей
  const [login, setLogin] = React.useState();
  const [password, setPassword] = React.useState();
  const [loginDirty, setLoginDirty] = React.useState();
  const [passwordDirty, setPasswordDirty] = React.useState();
  const [loginError, setLoginError] = React.useState('Поле не может быть пустым');
  const [passwordError, setPasswordError] = React.useState('Поле не может быть пустым');
  const [formValid, setFormValid] = React.useState(false);
  const [successLogin, setSuccessLogin] = React.useState(false);

  //опции для запроса
  const data = {
    username: login,
    password: password,
  };

  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: data,
    url: 'http://host140620211735.of.by/api/jwt/token/',
  };

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
      setLoginError('');
    }
  };

  const passwordHandler = (e) => {
    setPasswordDirty(true);
    setPassword(e.target.value);
    if (e.target.value.length === 0) {
    } else if (e.target.value.length !== 0 && e.target.value.length < 8) {
      setPasswordError(inputErrors[1]);
    } else {
      setPasswordError('');
    }
  };

  //обработчик клика по кнопке регистрации
  const onClickSubmit = () => {
    axios(options)
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          console.log(response);
          alert('Авторизация прошла успешно');
          setSuccessLogin(<Redirect to="/" />);
        }
      })
      .catch((err) => alert('Ошибка авторизации (данные введены неверно)'));
  };
  return (
    <div className="reg-content">
      <div className="reg-form-wrapper">
        <div className="log-form">
          <ul className="reg-form-action-type-list">
            <Link tag="li" to="/registration">
              <li href="#" className="reg-form-action-type-link">
                Регистрация
              </li>
            </Link>
            <li href="#" className="reg-form-action-type-link reg-form-action-type-link__active">
              Вход
            </li>
          </ul>
          <div className="log-form-text-label-p__upper">
            <p>Войти через соцсети</p>
            {successLogin}
          </div>
          <div className="reg-form-socials">
            <img src={vkLogo} alt="VK" />
            <img src={facebookLogo} alt="Facebook" />
            <img src={googleLogo} alt="Google" />
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
                <label className="reg-form-text-label-l__alert">{loginError}</label>
              )}
              <label htmlFor="password" className="log-form-text-label-l">
                Пароль
              </label>
              <input
                name="password"
                id="password"
                type="password"
                placeholder="..."
                className="reg-form-contact-input"
                value={password}
                onChange={(e) => passwordHandler(e)}
              />
              {passwordDirty && passwordError && (
                <label className="reg-form-text-label-l__alert">{passwordError}</label>
              )}
              <div className="log-form-text-label-l__recover">
                <Link to="/login">
                  <label>Забыли пароль?</label>
                </Link>
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
    </div>
  );
};

export default LoginModule;
