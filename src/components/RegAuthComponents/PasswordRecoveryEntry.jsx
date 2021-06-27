import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

const PasswordRecoveryEntry = () => {
  const inputErrors = ['Поле не может быть пустым', 'Некорректный Email'];
  const contactEmailRegExp =
    /^((([0-9A-Za-z]{1}[-0-9A-z\.]{0,30}[0-9A-Za-z]?)|([0-9А-Яа-я]{1}[-0-9А-я\.]{0,30}[0-9А-Яа-я]?))@([-A-Za-z]{1,}\.){1,}[-A-Za-z]{2,})$/;

  //состояния для валидации, хранения данных из полей
  const [email, setEmail] = React.useState();
  const [emailDirty, setEmailDirty] = React.useState();
  const [emailError, setEmailError] = React.useState('Поле не может быть пустым');
  const [formValid, setFormValid] = React.useState();
  const [redirect, setRedirect] = React.useState('');

  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: {
      email: email,
    },
    url: 'http://host140620211735.of.by/api/password_reset/',
  };

  //проверка валидности полей
  React.useEffect(() => {
    if (emailError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [emailError]);

  //обработчики полей
  const emailHandler = (e) => {
    setEmailDirty(true);
    setEmail(e.target.value);
    if (e.target.value.length === 0) {
      setEmailError(inputErrors[0]);
    } else if (!contactEmailRegExp.test(String(e.target.value).toLowerCase())) {
      setEmailError(inputErrors[1]);
    } else {
      setEmailError('');
    }
  };

  //обработчик клика по кнопке регистрации
  const onClickSubmit = () => {
    axios(options)
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          console.log(response);
          alert('Письмо со ссылкой на восставновление пароля отправлено на Email');
          setRedirect(<Redirect to="/" />);
        }
      })
      .catch((err) => alert('Ошибка авторизации (такой почты нет в базе)'));
  };
  return (
    <div className="reg-content">
      <div className="reg-form-wrapper-email-verification">
        <div className="reg-form-email-verification">
          <ul className="reg-form-action-type-list">
            <Link tag="li" to="/registration">
              <li href="#" className="reg-form-action-type-link">
                Регистрация{redirect}
              </li>
            </Link>
            <li href="#" className="reg-form-action-type-link reg-form-action-type-link__active">
              Вход
            </li>
          </ul>
          <div className="log-form-text-label-p-email__upper">
            <p>Укажите почту</p>
          </div>
          <div className="reg-form-annotation-wrapper">
            <div className="reg-form-annotation__email">
              <p>(На указанный Email будет отправлена ссылка для восстановления пароля)</p>
            </div>
          </div>
          <div className="reg-form-input-area">
            <form>
              <label htmlFor="login" className="log-form-text-label-l">
                Введите Email
              </label>
              <input
                name="code"
                id="code"
                type="text"
                placeholder="..."
                className="reg-form-contact-input"
                value={email}
                onChange={(e) => {
                  emailHandler(e);
                }}
              />
              {emailDirty && emailError && (
                <label className="reg-form-text-label-l__alert">{emailError}</label>
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
  );
};

export default PasswordRecoveryEntry;
