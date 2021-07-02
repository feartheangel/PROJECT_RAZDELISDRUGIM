import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

const EmailSubmittionModule = () => {
  //состояния для валидации, хранения данных из полей
  const [code, setCode] = React.useState('');
  const [codeDirty, setCodeDirty] = React.useState(false);
  const [codeError, setCodeError] = React.useState('Поле не может быть пустым');
  const [formValid, setFormValid] = React.useState(false);
  const [redirect, setRedirect] = React.useState('');

  const { email } = useSelector(({ registration }) => registration);

  //проверка валидности полей
  React.useEffect(() => {
    if (codeError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [codeError]);

  //обработчики полей
  const codeHandler = (e) => {
    setCodeDirty(true);
    setCode(e.target.value);
    if (e.target.value.length === 0) {
      setCodeError('Поле не может быть пустым');
    } else {
      setCodeError('');
    }
  };

  //обработчик клика по кнопке регистрации
  const onClickSubmit = () => {
    console.log(email);
    console.log(code);
    axios({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        code: code,
        email: email,
      },
      url: `http://host140620211735.of.by/api/jwt/email/check/`,
    })
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          alert('Email подтвержден, перенаправляю на форму логина.');
          setRedirect(<Redirect to="/login" />);
        }
      })
      .catch(() => alert('Введен неверный код.'));
  };
  return (
    <div className="reg-auth-wrapper">
      <div className="reg-content">
        <div className="reg-form-wrapper-email-verification">
          <div className="reg-form-email-verification">
            <ul className="reg-form-action-type-list">
              <Link tag="li" to="/registration">
                <li
                  href="#"
                  className="reg-form-action-type-link reg-form-action-type-link__active">
                  Регистрация{redirect}
                </li>
              </Link>
              <li href="#" className="reg-form-action-type-link">
                Вход
              </li>
            </ul>
            <div className="log-form-text-label-p-email__upper">
              <p>Подтвердите почту</p>
            </div>
            <div className="reg-form-annotation-wrapper">
              <div className="reg-form-annotation__email">
                <p>(На указанный Email было отправлено письмо с кодом подтверждения)</p>
              </div>
            </div>
            <div className="reg-form-input-area">
              <form>
                <label htmlFor="login" className="log-form-text-label-l">
                  Код из письма
                </label>
                <input
                  name="code"
                  id="code"
                  type="text"
                  placeholder="..."
                  className="reg-form-contact-input"
                  value={code}
                  onChange={(e) => {
                    codeHandler(e);
                  }}
                />
                {codeDirty && codeError && (
                  <label className="reg-form-text-label-l__alert">{codeError}</label>
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
  );
};

export default EmailSubmittionModule;
