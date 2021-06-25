import React from 'react';
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import facebookLogo from '../img/Facebook.png';
import vkLogo from '../img/vk.png';
import googleLogo from '../img/Google.png';
import { setLastEmail } from '../redux/actions/registration';

const RegistrationModuleIndividual = () => {
  const dispatch = useDispatch();
  const { sentNumber, sentEmail, password, passwordSubmit, regType } = useSelector(
    ({ registration }) => registration,
  );
  const inputErrors = [
    'Слишком короткая запись',
    'Поле не может быть пустым',
    'Некорректный Email',
    'Некорректный номер телефона',
  ];
  const contactEmailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const contactNumberRegExp = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;

  const [name, setName] = React.useState('');
  const [surname, setSurname] = React.useState('');
  const [birth, setBirth] = React.useState('');
  const [email, setEmail] = React.useState(sentEmail);
  const [number, setNumber] = React.useState(sentNumber);
  const [promo, setPromo] = React.useState();
  const [nameDirty, setNameDirty] = React.useState();
  const [surnameDirty, setSurnameDirty] = React.useState();
  const [birthDirty, setBirthDirty] = React.useState();
  const [emailDirty, setEmailDirty] = React.useState();
  const [numberDirty, setNumberDirty] = React.useState();
  const [nameError, setNameError] = React.useState(inputErrors[1]);
  const [surnameError, setSurnameError] = React.useState('Это поле не может быть пустым');
  const [birthError, setBirthError] = React.useState('Это поле не может быть пустым');
  const [emailError, setEmailError] = React.useState();
  const [numberError, setNumberError] = React.useState();
  const [formValid, setFormValid] = React.useState(false);
  const [successRegister, setSuccessRegister] = React.useState(false);

  const data_register = {
    username: number,
    email: email,
    password: password,
    password2: passwordSubmit,
  };

  const data_register_profile = {
    first_name: name,
    last_name: surname,
    date_birthday: birth,
    referral_code: promo,
    regType: regType,
    email: email,
    phone: number,
  };

  const options_register = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: data_register,
    url: 'http://host140620211735.of.by/api/jwt/register/',
  };

  const options_register_profile = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer `,
    },
    data: data_register_profile,
    url: 'http://host140620211735.of.by/api/jwt/register/',
  };

  React.useEffect(() => {
    if (nameError || surnameError || birthError || emailError || numberError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [nameError, surnameError, birthError, emailError, numberError]);

  const nameHandler = (e) => {
    setNameDirty(true);
    setName(e.target.value);
    if (e.target.value.length === 0) {
      setNameError(inputErrors[1]);
    } else if (e.target.value.length < 2) {
      setNameError(inputErrors[0]);
    } else {
      setNameError('');
    }
  };

  const surnameHandler = (e) => {
    setSurnameDirty(true);
    setSurname(e.target.value);
    if (e.target.value.length === 0) {
      setSurnameError(inputErrors[1]);
    } else if (e.target.value.length < 2) {
      setSurnameError(inputErrors[0]);
    } else {
      setSurnameError('');
    }
  };

  const birthHandler = (e) => {
    setBirthDirty(true);
    setBirth(e.target.value);
    if (e.target.value.length === 0) {
      setBirthError(inputErrors[1]);
    } else {
      setBirthError('');
    }
  };

  const emailHandler = (e) => {
    setEmailDirty(true);
    setEmail(e.target.value);
    if (e.target.value.length === 0) {
      setEmailError(inputErrors[1]);
    } else if (!contactEmailRegExp.test(String(e.target.value))) {
      setEmailError(inputErrors[2]);
    } else {
      setEmailError('');
    }
  };

  const numberHandler = (e) => {
    setNumberDirty(true);
    setNumber(e.target.value);
    if (e.target.value.length === 0) {
      setNumberError(inputErrors[1]);
    } else if (!contactNumberRegExp.test(String(e.target.value))) {
      setNumberError(inputErrors[3]);
    } else {
      setNumberError('');
    }
  };

  const onClickSubmit = () => {
    if (email.length === 0 || number.length === 0) {
      if (email.length === 0) {
        setEmailDirty(true);
        setEmailError(inputErrors[1]);
      } else if (number.length === 0) {
        setNumberDirty(true);
        setNumberError(inputErrors[1]);
      }
    } else {
      dispatch(setLastEmail(email));
      axios(options_register)
        .then((response) => {
          console.log(response);
          if (response.status === 200 || response.status === 201) {
            const acessToken = response.data.token;
            const id = response.data.id;
            axios({
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${acessToken}`,
              },
              data: {
                first_name: name,
                last_name: surname,
                date_birthday: birth,
                referral_code: promo,
                status: regType,
                email: email,
                phone: number,
              },
              url: `http://host140620211735.of.by/api/jwt/profile/update/${id}/`,
            })
              .then((response) => {
                console.log(response);
                if (response.status === 200 || response.status === 201) {
                  alert('Регистрация прошла успешно!');
                }
              })
              .then(
                axios({
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  data: {
                    email: email,
                  },
                  url: `http://host140620211735.of.by/api/jwt/email/send/`,
                }).then((response) => {
                  console.log(response);
                  if (response.status === 200 || response.status === 201) {
                    setSuccessRegister(<Redirect to="/registration-email-verification" />);
                  }
                }),
              )
              .catch(() => alert('Ошибка регистрации!'));
          }
        })
        .catch(() => alert('Ошибка регистрации (такая почта/телефон уже существуют)'));
    }
  };
  return (
    <div className="reg-content">
      <div className="reg-form-wrapper">
        <div className="reg-form__second">
          <ul className="reg-form-action-type-list">
            <Link to="/registration">
              <li href="#" className="reg-form-action-type-link reg-form-action-type-link__active">
                Регистрация{successRegister}
              </li>
            </Link>
            <Link to="/login">
              <li href="#" className="reg-form-action-type-link">
                Вход
              </li>
            </Link>
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
                name="name"
                id="name"
                type="text"
                placeholder="..."
                className="reg-form-contact-input"
                value={name}
                onChange={(e) => {
                  nameHandler(e);
                }}
              />
              {nameDirty && nameError && (
                <label className="reg-form-text-label-l__alert">{nameError}</label>
              )}
              <label htmlFor="surname" className="reg-form-text-label-l">
                Фамилия
              </label>
              <input
                name="surname"
                id="surname"
                type="text"
                placeholder="..."
                className="reg-form-contact-input"
                value={surname}
                onChange={(e) => surnameHandler(e)}
              />
              {surnameDirty && surnameError && (
                <label className="reg-form-text-label-l__alert">{surnameError}</label>
              )}
              <label htmlFor="birth" className="reg-form-text-label-l">
                Дата рождения
              </label>
              <input
                name="birth"
                id="birth"
                type="date"
                className="reg-form-contact-input"
                value={birth}
                onChange={(e) => birthHandler(e)}
              />
              {birthDirty && birthError && (
                <label className="reg-form-text-label-l__alert">{birthError}</label>
              )}
              <label htmlFor="email" className="reg-form-text-label-l">
                Email
              </label>
              <input
                name="email"
                id="email"
                type="text"
                className="reg-form-contact-input"
                value={email}
                onChange={(e) => emailHandler(e)}
              />
              {emailDirty && emailError && (
                <label className="reg-form-text-label-l__alert">{emailError}</label>
              )}
              <label htmlFor="number" className="reg-form-text-label-l">
                Номер телефона (с кодом страны)
              </label>
              <input
                name="number"
                id="number"
                type="text"
                className="reg-form-contact-input"
                value={number}
                onChange={(e) => numberHandler(e)}
              />
              {numberDirty && numberError && (
                <label className="reg-form-text-label-l__alert">{numberError}</label>
              )}
              <label htmlFor="promo" className="reg-form-text-label-l">
                Промокод
              </label>
              <input
                name="promo"
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
                disabled={!formValid}
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

export default RegistrationModuleIndividual;
