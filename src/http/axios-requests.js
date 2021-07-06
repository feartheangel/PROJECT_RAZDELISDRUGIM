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

  static sendGoogleCode(code) {
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

  static fetchItems() {
    return axios({
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      url: `http://178.172.136.88/api/items/category/`,
    }).then((response) => {
      return response;
    });
  }

  static createItem(
    category_id,
    name_item,
    description,
    rent,
    price_rent,
    key_words,
    year_release,
    mileage,
    price_item,
    receive_time,
    return_time,
    prepare_time,
    servicefee,
    servicefee_choice,
    servicefee_price,
    pledge,
    pledge_price,
    insurance,
    insurance_choice,
    insurance_price,
    sell,
    contract,
    appointment,
    structure,
    free_rent,
    offer_price_rent,
  ) {
    return axios({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('key')}`,
      },
      data: {
        category_id: category_id,
        name_item: name_item,
        description: description,
        rent: rent,
        price_rent: price_rent,
        key_words: key_words ? key_words : ' ',
        year_release: year_release ? year_release : ' ',
        mileage: mileage ? mileage : ' ',
        price_item: price_item ? price_item : ' ',
        receive_time: receive_time ? receive_time : ' ',
        return_time: return_time ? return_time : ' ',
        prepare_time: prepare_time ? prepare_time : ' ',
        servicefee: servicefee ? servicefee : false,
        servicefee_choice: servicefee_choice,
        servicefee_price: servicefee_price ? servicefee_price : ' ',
        pledge: pledge ? pledge : false,
        pledge_price: pledge_price ? pledge_price : ' ',
        insurance: insurance ? insurance : false,
        insurance_choice: insurance_choice,
        insurance_price: insurance_price ? insurance_price : ' ',
        sell: sell ? sell : false,
        contract: contract ? contract : false,
        appointment: appointment ? structure : ' ',
        structure: structure ? structure : ' ',
        free_rent: free_rent ? free_rent : false,
        offer_price_rent: offer_price_rent ? offer_price_rent : false,
      },
      url: 'http://178.172.136.88/api/items/create/',
    }).then((response) => {
      return response;
    });
  }
}

export default Requests;
