import React from 'react';
import facebookLogo from '../img/Facebook.png';
import vkLogo from '../img/vk.png';
import googleLogo from '../img/Google.png';
import { Redirect, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setRegEntries } from '../redux/actions/registration';
import classNames from 'classnames';

const RegistrationModuleBasic = () => {
  const dispatch = useDispatch();

  const [contact, setContact] = React.useState();
  const [password, setPassword] = React.useState();
  const [passwordSubmit, setPasswordSubmit] = React.useState();
  const [redirect, setRedirect] = React.useState();
  const [passMatch, setPassMatch] = React.useState();
  const [isGoodLength, setIsGoodLength] = React.useState(false);

  const onClickSubmit = () => {
    if (password === passwordSubmit) {
      dispatch(setRegEntries(contact, password));
      setRedirect(<Redirect to="/registration-step-2" />);
    } else {
      alert('Ошибка!');
    }
  };

  const passwordHandle = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="reg-content">
      <div className="reg-form-wrapper">
        <div className="reg-form">
          <ul className="reg-form-action-type-list">
            <li href="#" className="reg-form-action-type-link reg-form-action-type-link__active">
              Регистрация
            </li>
            <li href="#" className="reg-form-action-type-link">
              Вход
            </li>
          </ul>
          <div className="reg-form-socials">
            <img src={vkLogo} alt="VK" />
            <img src={facebookLogo} alt="Facebook" />
            <img src={googleLogo} alt="Google" />
          </div>
          <div className="reg-form-text-label-p">
            <p>или</p>
          </div>
          <div className="reg-form-input-area">
            <form>
              <label htmlFor="contact" className="reg-form-text-label-l">
                Номер телефона или Email
              </label>
              <input
                id="contact"
                type="text"
                placeholder="..."
                className="reg-form-contact-input"
                value={contact}
                onChange={(e) => {
                  setContact(e.target.value);
                }}
              />
              <label htmlFor="password" className="reg-form-text-label-l">
                Введите пароль
              </label>
              <input
                id="password"
                type="password"
                placeholder="..."
                className="reg-form-contact-input"
                value={password}
                onChange={passwordHandle}
              />
              <label
                className={classNames({
                  'reg-form-text-label-l__alert': true,
                  'reg-form-text-label-l__invisible': isGoodLength,
                })}>
                Минимум 8 символов
              </label>
              <label htmlFor="submittion_pass" className="reg-form-text-label-l">
                Подтвердите пароль{redirect}
              </label>
              <input
                id="submittion_pass"
                type="password"
                placeholder="..."
                className="reg-form-contact-input"
                value={passwordSubmit}
                onChange={(e) => {
                  setPasswordSubmit(e.target.value);
                }}
              />
              <label className="reg-form-text-label-l__alert">Пароли не совпадают</label>
              <input
                onClick={onClickSubmit}
                type="button"
                value="Зарегистрироваться"
                className="reg-form-submit-button"
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
