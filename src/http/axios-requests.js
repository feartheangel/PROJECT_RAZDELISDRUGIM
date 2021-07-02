import axios from 'axios';

class Requests {
  constructor() {}

  static register(contact, email, password, passwordSubmit) {
    return axios({
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: {
        username: contact,
        email: email ? email : 'null',
        password: password,
        password2: passwordSubmit,
      },
      url: 'http://178.172.136.88/api/jwt/register/',
    }).then((response) => {
      return response;
    });
  }

  static updateProfile(status, referral, id, token) {
    return axios({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: {
        status: status,
        referral_code: referral ? referral : '',
      },
      url: `http://178.172.136.88/api/jwt/profile/update/${id}/`,
    }).then((response) => {
      return response;
    });
  }

  static login(username, password) {
    return axios({
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: {
        username: username,
        password: password,
      },
      url: 'http://178.172.136.88/api/jwt/token/',
    }).then((response) => {
      localStorage.setItem('key', response.data.access);
      return response;
    });
  }

  static passwordRecoveryEntry(email) {
    return axios({
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: {
        email: email,
      },
      url: 'http://178.172.136.88/api/password_reset/',
    }).then((response) => {
      return response;
    });
  }

  static passwordRecoverySubmit(token, password) {
    axios({
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: {
        token: token,
        password: password,
      },
      url: 'http://178.172.136.88/api/password_reset/confirm/',
    }).then((response) => {
      return response;
    });
  }

  static convertToken(access_token) {
    return axios({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        grant_type: 'convert_token',
        client_id: 'zyE2kzBjyp0PtLhGV1ulQWQOmpBM3v6u03nj2fdF',
        backend: 'vk-oauth2',
        token: access_token,
      },
      url: `http://178.172.136.88/social/convert-token/`,
    }).then((response) => {
      return response;
    });
  }

  static sendVKCode(code) {
    return axios({
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      url: `http://178.172.136.88/api/jwt/access-token-vk/${code}/`,
    }).then((response) => {
      return response;
    });
  }
}

export default Requests;
