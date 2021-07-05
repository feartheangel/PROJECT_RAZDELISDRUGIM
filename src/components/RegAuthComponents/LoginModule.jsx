import React from 'react';
import facebookLogo from '../../img/Facebook.png';
import vkLogo from '../../img/vk.png';
import googleLogo from '../../img/Google.png';
import { Link, Redirect } from 'react-router-dom';
import { vkAuth } from '../../http/social-auth';
import Requests from '../../http/axios-requests';

const LoginModule = ({ setModalActive, setActiveForm, setLoggedIn, setIsLoggedIn }) => {
  let code = '';
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

  //проверка валидности полей
  React.useEffect(() => {
    if (loginError || passwordError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }

    if (window.location.href.split('?code=')[1]) {
      code = window.location.href.split('?code=')[1];
      console.log(code);
      Requests.sendVKCode(code).then((response) => {
        console.log(response);
        Requests.convertToken(response.data.access_token).then((response) => {
          if (response.status === 200 || response.status === 201) {
            localStorage.setItem('key', response.data.access_token);
            setIsLoggedIn(true);
            setModalActive(false);
          }
        });
      });
    }
  }, [loginError, passwordError, window.location.href]);

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
    Requests.login(login, password)
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          console.log(response);
          alert('Авторизация прошла успешно');
          setModalActive(false);
        }
      })
      .catch((err) => alert('Ошибка авторизации (данные введены неверно)'));
  };
  return (
    <div className="log-form">
      <ul className="reg-form-action-type-list">
        <li
          onClick={() => setActiveForm('register')}
          href="#"
          className="reg-form-action-type-link">
          Регистрация
        </li>
        <li href="#" className="reg-form-action-type-link reg-form-action-type-link__active">
          Вход
        </li>
      </ul>
      <div className="log-form-text-label-p__upper">
        <p>Войти через соцсети</p>
      </div>
      <div className="reg-form-socials">
        <img onClick={vkAuth} src={vkLogo} alt="VK" />
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
            <label onClick={() => setActiveForm('passwordRecoveryEntry')}>Забыли пароль?</label>
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
  );
};

export default LoginModule;
