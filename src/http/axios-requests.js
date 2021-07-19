import axios from 'axios';
import { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } from 'react-dom';

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
    delivery,
    delivery_free,
    self_delivery_price,
    will_send,
    will_send_choice,
    send_payer,
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
    color,
    franchise,
    franchise_price,
    article,
    inventory_number,
    formData,
    coords,
    prepare_time_choice,
    items_address,
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
        description: description ? description : ' ',
        rent: rent,
        price_rent: price_rent,
        key_words: key_words ? key_words : ' ',
        year_release: year_release ? year_release : null,
        mileage: mileage ? mileage : ' ',
        price_item: price_item ? price_item : null,
        receive_time: receive_time ? receive_time : ' ',
        return_time: return_time ? return_time : ' ',
        prepare_time: prepare_time ? prepare_time : null,
        delivery: delivery ? delivery : 'NONE',
        delivery_free: delivery_free ? delivery_free : false,
        self_delivery_price: delivery_free
          ? null
          : self_delivery_price
          ? self_delivery_price
          : null,
        will_send: will_send,
        will_send_choice: will_send_choice ? will_send_choice : 'NONE',
        send_payer: send_payer ? send_payer : 'NONE',
        servicefee: servicefee ? servicefee : false,
        servicefee_choice: servicefee_choice ? servicefee_choice : 'NONE',
        servicefee_price: servicefee_price ? servicefee_price : null,
        pledge: pledge ? pledge : false,
        pledge_price: pledge_price ? pledge_price : null,
        insurance: insurance ? insurance : false,
        insurance_choice: insurance_choice ? insurance_choice : 'NONE',
        insurance_price: insurance_price ? insurance_price : null,
        sell: sell ? sell : false,
        contract: contract ? contract : false,
        appointment: appointment ? appointment : ' ',
        structure: structure ? structure : ' ',
        free_rent: free_rent ? free_rent : false,
        offer_price_rent: offer_price_rent ? offer_price_rent : false,
        color: color ? color : ' ',
        franchise: franchise ? franchise : false,
        franchise_price: franchise_price ? franchise_price : null,
        article: article ? article : ' ',
        inventory_number: inventory_number ? inventory_number : '',
        items_coordinates: coords,
        prepare_time_choice: prepare_time_choice ? prepare_time_choice : 'NONE',
        items_address: items_address,
      },
      url: 'http://178.172.136.88/api/items/create/',
    }).then((response) => {
      if (response.status === 200 || response.status === 201) {
        return axios({
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('key')}`,
          },
          data: formData,
          url: `http://178.172.136.88/api/items/update/${response.data.id}/`,
        }).then((response) => {
          return response;
        });
      }
    });
  }

  static getCords(area, locality, street, house, room, index) {
    return axios({
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      url: `https://geocode-maps.yandex.ru/1.x/?apikey=28e5fc84-32d6-402e-a231-cefeaccfcf85&format=json&geocode=Беларусь, ${area} область, ${locality}, ${street}, д. ${
        house ? house : room
      }, индекс ${index}`,
    }).then((response) => {
      return response;
    });
  }

  static createAdress(
    area,
    region,
    index,
    city,
    street,
    house,
    corpus,
    apartment,
    space_room,
    office,
    building,
    coordinates,
  ) {
    return axios({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('key')}`,
      },
      data: {
        area: area ? area : '',
        region: region ? region : '',
        index: index ? index : null,
        city: city ? city : '',
        street: street ? street : '',
        house: house ? house : null,
        corpus: corpus ? corpus : '',
        apartment: apartment ? apartment : null,
        space_room: space_room ? space_room : '',
        office: office ? office : '',
        building: building ? building : '',
        coordinates: `${Number(coordinates[0])} ${Number(coordinates[1])}`,
      },
      url: `http://178.172.136.88/api/jwt/profile/create/address/`,
    }).then((response) => {
      console.log(response);
      return response;
    });
  }

  static fetchAdresses() {
    return axios({
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('key')}`,
      },
      url: `http://178.172.136.88/api/jwt/profile/address/`,
    }).then((response) => {
      return response;
    });
  }

  static fetchUserProfile() {
    return axios({
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('key')}`,
      },
      url: 'http://178.172.136.88/api/jwt/profile/',
    }).then((response) => {
      return response;
    });
  }

  static updateProfileMain(
    name,
    surname,
    companyName,
    unpUnn,
    address,
    iban,
    bank,
    bic,
    email,
    number,
    gender,
    birth,
    about,
    legal_address,
  ) {
    return axios({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('key')}`,
      },
      data: {
        first_name: name ? name : '',
        last_name: surname ? surname : '',
        company_name: companyName ? companyName : '',
        unp_inn_company: unpUnn ? unpUnn : '',
        legal_address: address ? address : '',
        bank_account: iban ? iban : '',
        name_bank: bank ? bank : '',
        bank_code: bic ? bic : '',
        email: email ? email : '',
        phone: number ? number : '',
        sex: gender ? gender : null,
        date_birthday: birth === 'YYYY-MM-DD' ? '0000-00-00' : birth,
        about: about ? about : '',
        legal_address: legal_address ? legal_address : '',
      },
      url: `http://178.172.136.88/api/jwt/profile/update/`,
    }).then((response) => {
      return response;
    });
  }
  static updatePassword(old_password, new_password1, new_password2) {
    return axios({
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('key')}`,
      },
      data: {
        old_password: old_password,
        new_password1: new_password1,
        new_password2: new_password2,
      },
      url: `http://178.172.136.88/api/jwt/update-password/`,
    }).then((response) => {
      return response;
    });
  }

  static updateAddress(
    area,
    region,
    index,
    city,
    street,
    house,
    corpus,
    apartment,
    space_room,
    office,
    building,
    coordinates,
    id,
  ) {
    return axios({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('key')}`,
      },
      data: {
        area: area ? area : '',
        region: region ? region : '',
        index: index ? index : null,
        city: city ? city : '',
        street: street ? street : '',
        house: house ? house : null,
        corpus: corpus ? corpus : '',
        apartment: apartment ? apartment : null,
        space_room: space_room ? space_room : '',
        office: office ? office : '',
        building: building ? building : '',
        coordinates: `${Number(coordinates[0])} ${Number(coordinates[1])}`,
      },
      url: `http://178.172.136.88/api/jwt/profile/address/update/${id}/`,
    }).then((response) => {
      console.log(response);
      return response;
    });
  }

  static sendVerifyNumberCode() {
    return axios({
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('key')}`,
      },
      url: `http://178.172.136.88/api/jwt/sms/send/`,
    }).then((response) => {
      console.log(response);
      return response;
    });
  }

  static checkVerifyNumberCode(code) {
    return axios({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('key')}`,
      },
      data: {
        code: code,
      },
      url: `http://178.172.136.88/api/jwt/sms/check/`,
    }).then((response) => {
      console.log(response);
      return response;
    });
  }

  static sendVerifyEmailCode() {
    return axios({
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('key')}`,
      },
      url: `http://178.172.136.88/api/jwt/email/send/`,
    }).then((response) => {
      console.log(response);
      return response;
    });
  }

  static checkVerifyEmailCode(code) {
    return axios({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('key')}`,
      },
      data: {
        code: code,
      },
      url: `http://178.172.136.88/api/jwt/email/check/`,
    }).then((response) => {
      console.log(response);
      return response;
    });
  }

  static removeAddress(id) {
    return axios({
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('key')}`,
      },
      url: `http://178.172.136.88/api/jwt/profile/address/delete/${id}/`,
    }).then((response) => {
      return response;
    });
  }

  static fetchSubjects() {
    return axios({
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('key')}`,
      },
      url: `http://178.172.136.88/api/items/profile-items/`,
    }).then((response) => {
      return response;
    });
  }

  static deleteSubject(id) {
    return axios({
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('key')}`,
      },
      url: `http://178.172.136.88/api/items/delete/${id}/`,
    }).then((response) => {
      return response;
    });
  }
}

export default Requests;
