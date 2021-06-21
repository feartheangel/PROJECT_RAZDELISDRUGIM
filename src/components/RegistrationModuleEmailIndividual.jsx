import React from 'react';
import axios from 'axios';
import qs from 'qs';
import { useDispatch, useSelector } from 'react-redux';
import facebookLogo from '../img/Facebook.png';
import vkLogo from '../img/vk.png';
import googleLogo from '../img/Google.png';

const RegistrationModuleEmailIndividual = () => {
  const dispatch = useDispatch();
  const { sentNumber, sentEmail, password } = useSelector(({ registration }) => registration);

  const [name, setName] = React.useState();
  const [surname, setSurname] = React.useState();
  const [birth, setBirth] = React.useState();
  const [email, setEmail] = React.useState(sentEmail);
  const [number, setNumber] = React.useState(sentNumber);
  const [promo, setPromo] = React.useState();

  const onClickSubmit = () => {
    password ? alert('Все ок!') : alert('Заполните первую форму!');
  };
  return (
    <div className="reg-content">
      <div className="reg-form-wrapper">
        <div className="reg-form__second">
          <ul className="reg-form-action-type-list">
            <li href="#" className="reg-form-action-type-link reg-form-action-type-link__active">
              Регистрация
            </li>
            <li href="#" className="reg-form-action-type-link">
              Вход
            </li>
          </ul>
          <div className="reg-form-text-label-p">
            <p>Вы регистрируетесь как частное лицо</p>
          </div>
          <div className="reg-form-text-label-p">
            <p>Заполните, пожалуйста, регистрационные данные</p>
          </div>
          <div className="reg-form-input-area">
            <form>
              <label htmlFor="name" className="reg-form-text-label-l">
                Имя
              </label>
              <input
                id="name"
                type="text"
                placeholder="..."
                className="reg-form-contact-input"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <label htmlFor="surname" className="reg-form-text-label-l">
                Фамилия
              </label>
              <input
                id="surname"
                type="text"
                placeholder="..."
                className="reg-form-contact-input"
                value={surname}
                onChange={(e) => {
                  setSurname(e.target.value);
                }}
              />
              <label htmlFor="birth" className="reg-form-text-label-l">
                Дата рождения
              </label>
              <input
                id="birth"
                type="date"
                className="reg-form-contact-input"
                value={birth}
                onChange={(e) => {
                  setBirth(e.target.value);
                }}
              />
              <label htmlFor="email" className="reg-form-text-label-l">
                Email
              </label>
              <input
                id="email"
                type="text"
                className="reg-form-contact-input"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <label htmlFor="number" className="reg-form-text-label-l">
                Номер телефона
              </label>
              <input
                id="number"
                type="text"
                className="reg-form-contact-input"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
              <label htmlFor="promo" className="reg-form-text-label-l">
                Промокод
              </label>
              <input
                id="promo"
                type="text"
                className="reg-form-contact-input"
                value={promo}
                onChange={(e) => {
                  setPromo(e.target.value);
                }}
              />
              <input
                type="button"
                value="Зарегистрироваться"
                className="reg-form-submit-button"
                onClick={onClickSubmit}
              />
            </form>
          </div>
          <div className="reg-form-annotation-wrapper">
            <div className="reg-form-annotation__second">
              <p>
                <b>Продолжая, я соглашаюсь с условиями</b> Пользовательского соглашения и{' '}
                <b>даю согласие на обработку моих персональных данных в соответсвии с</b> Политикой
                конфиденциальности
              </p>
            </div>
          </div>
          <div className="reg-form-text-label-p">
            <p>или</p>
          </div>
          <div className="reg-form-socials">
            <img src={vkLogo} alt="VK" />
            <img src={facebookLogo} alt="Facebook" />
            <img src={googleLogo} alt="Google" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationModuleEmailIndividual;
