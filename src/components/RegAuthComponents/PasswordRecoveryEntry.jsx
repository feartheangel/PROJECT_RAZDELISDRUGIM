import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import Requests from '../../http/axios-requests';

const PasswordRecoveryEntry = ({ setModalActive, setActiveForm }) => {
  const inputErrors = ['Поле не может быть пустым', 'Некорректный логин'];
  const contactEmailRegExp =
    /^((([0-9A-Za-z]{1}[-0-9A-z\.]{0,30}[0-9A-Za-z]?)|([0-9А-Яа-я]{1}[-0-9А-я\.]{0,30}[0-9А-Яа-я]?))@([-A-Za-z]{1,}\.){1,}[-A-Za-z]{2,})$/;
  const contactNumberRegExp = /^(\+375|80)(29|25|44|33)(\d{3})(\d{2})(\d{2})$/;

  //состояния для валидации, хранения данных из полей
  const [contact, setContact] = React.useState();
  const [contactDirty, setContactDirty] = React.useState();
  const [contactError, setContactError] = React.useState('Поле не может быть пустым');
  const [formValid, setFormValid] = React.useState();
  const [redirect, setRedirect] = React.useState('');

  //проверка валидности полей
  React.useEffect(() => {
    if (contactError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [contactError]);

  //обработчики полей
  const contactHandler = (e) => {
    setContactDirty(true);
    setContact(e.target.value);
    if (e.target.value.length === 0) {
      setContactError(inputErrors[0]);
    } else if (
      !contactEmailRegExp.test(String(e.target.value).toLowerCase()) &&
      !contactNumberRegExp.test(String(e.target.value).toLowerCase())
    ) {
      setContactError(inputErrors[1]);
    } else {
      setContactError('');
    }
  };

  //обработчик клика по кнопке регистрации
  const onClickSubmit = () => {
    if (contactEmailRegExp.test(String(contact).toLowerCase())) {
      Requests.passwordRecoveryEmail(contact).then(() => {
        alert('Новый пароль отправлен на почту!');
        setModalActive(false);
      });
    } else if (contactNumberRegExp.test(String(contact).toLowerCase())) {
      Requests.passwordRecoveryPhone(contact).then(() => {
        alert('Новый пароль отправлен на ваш телефон!');
        setModalActive(false);
      });
    } else alert('Произошла ошибка!');
  };
  return (
    <div className="reg-form-email-verification">
      <ul className="reg-form-action-type-list">
        <li
          onClick={() => setActiveForm('register')}
          href="#"
          className="reg-form-action-type-link">
          Регистрация
        </li>
        <li
          onClick={() => setActiveForm('login')}
          href="#"
          className="reg-form-action-type-link reg-form-action-type-link__active">
          Вход
        </li>
      </ul>
      <div className="log-form-text-label-p-email__upper">
        <p>Укажите свой логин</p>
      </div>
      <div className="reg-form-annotation-wrapper">
        <div className="reg-form-annotation__email">
          <p>(На указанный логин (почта или телефон) будет отправлен Ваш новый пароль)</p>
        </div>
      </div>
      <div className="reg-form-input-area">
        <form>
          <label htmlFor="login" className="log-form-text-label-l">
            Введите логин
          </label>
          <input
            name="code"
            id="code"
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
  );
};

export default PasswordRecoveryEntry;
