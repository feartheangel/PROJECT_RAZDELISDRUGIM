import axios from "axios";

export const rootAddress = "https://razdelisdrugim.by:444";

//регулярные выражения для проверки телефона и почты
const contactEmailRegExp =
  /^((([0-9A-Za-z]{1}[-0-9A-z.]{0,30}[0-9A-Za-z]?)|([0-9А-Яа-я]{1}[-0-9А-я.]{0,30}[0-9А-Яа-я]?))@([-A-Za-z]{1,}\.){1,}[-A-Za-z]{2,})$/;
const contactNumberRegExp = /^(\+375|80)(29|25|44|33)(\d{3})(\d{2})(\d{2})$/;

class Requests {
  constructor() {}

  static register(contact, email, password, passwordSubmit) {
    return axios({
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: {
        username: contact,
        email: email ? email : "null",
        password: password,
        password2: passwordSubmit,
      },
      url: `${rootAddress}/api/jwt/register/`,
    }).then((response) => {
      return response;
    });
  }

  static updateProfile(status, referral, id, token, login) {
    return axios({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: {
        status: status,
        ref_code: referral ? referral : "",
        phone: contactNumberRegExp.test(login) ? login : "",
        email: contactEmailRegExp.test(login) ? login : "",
      },
      url: `${rootAddress}/api/jwt/profile/update/${id}/`,
    }).then((response) => {
      return response;
    });
  }

  static login(username, password) {
    return axios({
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: {
        username: username,
        password: password,
      },
      url: `${rootAddress}/api/jwt/token/`,
    });
  }

  static refresh(token) {
    return axios({
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: {
        refresh: token,
      },
      url: `${rootAddress}/api/jwt/token/refresh/`,
    }).then((response) => {
      return response;
    });
  }

  static passwordRecoveryEmail(email) {
    return axios({
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: {
        email: email,
        username: email,
      },
      url: `${rootAddress}/api/jwt/reset-password-email/`,
    }).then((response) => {
      return response;
    });
  }

  static passwordRecoveryPhone(phone) {
    return axios({
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: {
        phone: phone,
        username: phone,
      },
      url: `${rootAddress}/api/jwt/reset-password-phone/`,
    }).then((response) => {
      return response;
    });
  }

  static fetchItems() {
    return axios({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      url: `${rootAddress}/api/items/category/`,
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
    image_1,
    image_2,
    image_3,
    image_4,
    image_5,
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
    coords,
    prepare_time_choice,
    items_address
  ) {
    return axios({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("key")}`,
      },
      data: {
        category_id: category_id,
        name_item: name_item,
        description: description ? description : "",
        rent: rent,
        price_rent: price_rent,
        image_1: image_1 ? image_1 : null,
        image_2: image_2 ? image_2 : null,
        image_3: image_3 ? image_3 : null,
        image_4: image_4 ? image_4 : null,
        image_5: image_5 ? image_5 : null,
        key_words: key_words ? key_words : "",
        year_release: year_release ? year_release : null,
        mileage: mileage ? mileage : "",
        price_item: price_item ? price_item : null,
        receive_time: receive_time ? receive_time : "",
        return_time: return_time ? return_time : "",
        prepare_time: prepare_time ? prepare_time : null,
        delivery: delivery ? delivery : "NONE",
        delivery_free: delivery_free ? delivery_free : false,
        self_delivery_price: delivery_free
          ? null
          : self_delivery_price
          ? self_delivery_price
          : null,
        will_send: will_send,
        will_send_choice: will_send_choice ? will_send_choice : "NONE",
        send_payer: send_payer ? send_payer : "NONE",
        servicefee: servicefee ? servicefee : false,
        servicefee_choice: servicefee_choice ? servicefee_choice : "NONE",
        servicefee_price: servicefee_price ? servicefee_price : null,
        pledge: pledge ? pledge : false,
        pledge_price: pledge_price ? pledge_price : null,
        insurance: insurance ? insurance : false,
        insurance_choice: insurance_choice ? insurance_choice : "NONE",
        insurance_price: insurance_price ? insurance_price : null,
        sell: sell ? sell : false,
        contract: contract ? contract : false,
        appointment: appointment ? appointment : "",
        structure: structure ? structure : " ",
        free_rent: free_rent ? free_rent : false,
        offer_price_rent: offer_price_rent ? offer_price_rent : false,
        color: color ? color : "",
        franchise: franchise ? franchise : false,
        franchise_price: franchise_price ? franchise_price : null,
        article: article ? article : "",
        inventory_number: inventory_number ? inventory_number : "",
        items_coordinates: coords,
        prepare_time_choice: prepare_time_choice ? prepare_time_choice : "NONE",
        items_address: items_address,
      },
      url: `${rootAddress}/api/items/create/`,
    }).then((response) => response);
  }

  static getCords(area, locality, street, house, room, index) {
    return axios({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
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
    coordinates
  ) {
    return axios({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("key")}`,
      },
      data: {
        area: area ? area : "",
        region: region ? region : "",
        index: index ? index : null,
        city: city ? city : "",
        street: street ? street : "",
        house: house ? house : null,
        corpus: corpus ? corpus : "",
        apartment: apartment ? apartment : null,
        space_room: space_room ? space_room : "",
        office: office ? office : "",
        building: building ? building : "",
        coordinates: `${Number(coordinates[0])} ${Number(coordinates[1])}`,
      },
      url: `${rootAddress}/api/jwt/profile/create/address/`,
    }).then((response) => {
      console.log(response);
      return response;
    });
  }

  static fetchAdresses() {
    return axios({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("key")}`,
      },
      url: `${rootAddress}/api/jwt/profile/address/`,
    }).then((response) => {
      return response;
    });
  }

  static fetchUserProfile() {
    return axios({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("key")}`,
      },
      url: `${rootAddress}/api/jwt/profile/`,
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
    legal_address
  ) {
    return axios({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("key")}`,
      },
      data: {
        first_name: name ? name : "",
        last_name: surname ? surname : "",
        company_name: companyName ? companyName : "",
        unp_inn_company: unpUnn ? unpUnn : "",
        legal_address: address ? address : "",
        bank_account: iban ? iban : "",
        name_bank: bank ? bank : "",
        bank_code: bic ? bic : "",
        email: email ? email : "",
        phone: number ? number : "",
        sex: gender ? gender : null,
        date_birthday: birth === "YYYY-MM-DD" ? "0000-00-00" : birth,
        about: about ? about : "",
        legal_address: legal_address ? legal_address : "",
      },
      url: `${rootAddress}/api/jwt/profile/update/`,
    }).then((response) => {
      return response;
    });
  }
  static updatePassword(old_password, new_password1, new_password2) {
    return axios({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("key")}`,
      },
      data: {
        old_password: old_password,
        new_password1: new_password1,
        new_password2: new_password2,
      },
      url: `${rootAddress}/api/jwt/update-password/`,
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
    id
  ) {
    return axios({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("key")}`,
      },
      data: {
        area: area ? area : "",
        region: region ? region : "",
        index: index ? index : null,
        city: city ? city : "",
        street: street ? street : "",
        house: house ? house : null,
        corpus: corpus ? corpus : "",
        apartment: apartment ? apartment : null,
        space_room: space_room ? space_room : "",
        office: office ? office : "",
        building: building ? building : "",
        coordinates: `${Number(coordinates[0])} ${Number(coordinates[1])}`,
      },
      url: `${rootAddress}/api/jwt/profile/address/update/${id}/`,
    }).then((response) => {
      console.log(response);
      return response;
    });
  }

  static sendVerifyNumberCode() {
    return axios({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("key")}`,
      },
      url: `${rootAddress}/api/jwt/sms/send/`,
    }).then((response) => {
      console.log(response);
      return response;
    });
  }

  static checkVerifyNumberCode(code) {
    return axios({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("key")}`,
      },
      data: {
        code: code,
      },
      url: `${rootAddress}/api/jwt/sms/check/`,
    }).then((response) => {
      console.log(response);
      return response;
    });
  }

  static sendVerifyEmailCode() {
    return axios({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("key")}`,
      },
      url: `${rootAddress}/api/jwt/email/send/`,
    }).then((response) => {
      console.log(response);
      return response;
    });
  }

  static checkVerifyEmailCode(code) {
    return axios({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("key")}`,
      },
      data: {
        code: code,
      },
      url: `${rootAddress}/api/jwt/email/check/`,
    }).then((response) => {
      console.log(response);
      return response;
    });
  }

  static removeAddress(id) {
    return axios({
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("key")}`,
      },
      url: `${rootAddress}/api/jwt/profile/address/delete/${id}/`,
    }).then((response) => {
      return response;
    });
  }

  static fetchSubjects() {
    return axios({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("key")}`,
      },
      url: `${rootAddress}/api/items/profile-items/`,
    }).then((response) => {
      return response;
    });
  }

  static deleteSubject(id) {
    return axios({
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("key")}`,
      },
      url: `${rootAddress}/api/items/delete/${id}/`,
    }).then((response) => {
      return response;
    });
  }

  static copySubject(id) {
    return axios({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("key")}`,
      },
      url: `${rootAddress}/api/items/copy/${id}/`,
    }).then((response) => {
      return response;
    });
  }

  static hideSubject(id) {
    return axios({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("key")}`,
      },
      data: {
        is_hidden: true,
      },
      url: `${rootAddress}/api/items/update/${id}/`,
    }).then((response) => {
      return response;
    });
  }

  static showSubject(id) {
    return axios({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("key")}`,
      },
      data: {
        is_hidden: false,
      },
      url: `${rootAddress}/api/items/update/${id}/`,
    }).then((response) => {
      return response;
    });
  }

  static updateItem(
    category_id,
    name_item,
    description,
    rent,
    price_rent,
    image_1,
    image_2,
    image_3,
    image_4,
    image_5,
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
    coords,
    prepare_time_choice,
    items_address,
    id
  ) {
    return axios({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("key")}`,
      },
      data: {
        category_id: category_id,
        name_item: name_item,
        description: description ? description : " ",
        rent: rent,
        price_rent: price_rent,
        image_1: image_1 ? image_1 : null,
        image_2: image_2 ? image_2 : null,
        image_3: image_3 ? image_3 : null,
        image_4: image_4 ? image_4 : null,
        image_5: image_5 ? image_5 : null,
        key_words: key_words ? key_words : " ",
        year_release: year_release ? year_release : null,
        mileage: mileage ? mileage : " ",
        price_item: price_item ? price_item : null,
        receive_time: receive_time ? receive_time : " ",
        return_time: return_time ? return_time : " ",
        prepare_time: prepare_time ? prepare_time : null,
        delivery: delivery ? delivery : "NONE",
        delivery_free: delivery_free ? delivery_free : false,
        self_delivery_price: delivery_free
          ? null
          : self_delivery_price
          ? self_delivery_price
          : null,
        will_send: will_send,
        will_send_choice: will_send_choice ? will_send_choice : "NONE",
        send_payer: send_payer ? send_payer : "NONE",
        servicefee: servicefee ? servicefee : false,
        servicefee_choice: servicefee_choice ? servicefee_choice : "NONE",
        servicefee_price: servicefee_price ? servicefee_price : null,
        pledge: pledge ? pledge : false,
        pledge_price: pledge_price ? pledge_price : null,
        insurance: insurance ? insurance : false,
        insurance_choice: insurance_choice ? insurance_choice : "NONE",
        insurance_price: insurance_price ? insurance_price : null,
        sell: sell ? sell : false,
        contract: contract ? contract : false,
        appointment: appointment ? appointment : "",
        structure: structure ? structure : "",
        free_rent: free_rent ? free_rent : false,
        offer_price_rent: offer_price_rent ? offer_price_rent : false,
        color: color ? color : "",
        franchise: franchise ? franchise : false,
        franchise_price: franchise_price ? franchise_price : null,
        article: article ? article : "",
        inventory_number: inventory_number ? inventory_number : "",
        items_coordinates: coords,
        prepare_time_choice: prepare_time_choice ? prepare_time_choice : "NONE",
        items_address: items_address,
      },
      url: `${rootAddress}/api/items/update/${id}/`,
    }).then((response) => response);
  }

  static loadImage(url) {
    return axios({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("key")}`,
      },
      url: `${url}`,
    }).then((response) => {
      return response;
    });
  }

  static updateTG(telegram_account, email, phone) {
    return axios({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("key")}`,
      },
      data: {
        telegram_account: telegram_account,
        email: email,
        phone: phone,
      },
      url: `${rootAddress}/api/jwt/profile/update/`,
    }).then((response) => {
      return response;
    });
  }

  static updateViber(viber_account, email, phone) {
    return axios({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("key")}`,
      },
      data: {
        viber_account: viber_account,
        email: email,
        phone: phone,
      },
      url: `${rootAddress}/api/jwt/profile/update/`,
    }).then((response) => {
      return response;
    });
  }

  static updateWhatsapp(whatsapp_account, email, phone) {
    return axios({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("key")}`,
      },
      data: {
        whatsapp_account: whatsapp_account,
        email: email,
        phone: phone,
      },
      url: `${rootAddress}/api/jwt/profile/update/`,
    }).then((response) => {
      return response;
    });
  }

  static updateGoogle(google_account, email, phone) {
    return axios({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("key")}`,
      },
      data: {
        google_account: google_account,
        email: email,
        phone: phone,
      },
      url: `${rootAddress}/api/jwt/profile/update/`,
    }).then((response) => {
      return response;
    });
  }

  static updateFacebook(link_facebook, email, phone) {
    return axios({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("key")}`,
      },
      data: {
        link_facebook: link_facebook,
        email: email,
        phone: phone,
      },
      url: `${rootAddress}/api/jwt/profile/update/`,
    }).then((response) => {
      return response;
    });
  }

  static updateVK(vk_account, email, phone) {
    return axios({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("key")}`,
      },
      data: {
        vk_account: vk_account,
        email: email,
        phone: phone,
      },
      url: `${rootAddress}/api/jwt/profile/update/`,
    }).then((response) => {
      return response;
    });
  }

  static updateInstagram(link_instagram, email, phone) {
    return axios({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("key")}`,
      },
      data: {
        link_instagram: link_instagram,
        email: email,
        phone: phone,
      },
      url: `${rootAddress}/api/jwt/profile/update/`,
    }).then((response) => {
      return response;
    });
  }

  static updateOK(ok_account, email, phone) {
    return axios({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("key")}`,
      },
      data: {
        ok_account: ok_account,
        email: email,
        phone: phone,
      },
      url: `${rootAddress}/api/jwt/profile/update/`,
    }).then((response) => {
      return response;
    });
  }

  static updateProfileImageReq(formData) {
    return axios({
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("key")}`,
      },
      data: formData,
      url: `${rootAddress}/api/jwt/profile/update/`,
    }).then((response) => {
      return response;
    });
  }

  static search(
    search_words,
    category,
    min_price,
    max_price,
    free_rent,
    status,
    will_send,
    insurance,
    contract,
    pledge,
    coordinates,
    distance,
    page
  ) {
    return axios({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      url: `${rootAddress}/api/items/search/?${
        search_words ? `search_words=${search_words}&` : ""
      }${category ? `category_name=${category}&` : ""}${
        min_price ? `min_price=${min_price}&` : ""
      }${max_price ? `max_price=${max_price}&` : ""}${
        free_rent ? `free_rent=1&` : ""
      }${status ? `status=${status}&` : ""}${will_send ? `delivery=1&` : ""}${
        insurance ? `insurance=1&` : ""
      }${contract ? `contract=1&` : ""}${pledge ? `pledge=1&` : ""}${
        coordinates ? `coordinates=${coordinates}&` : ""
      }${distance ? `distance=${distance}&` : ""}${page ? `page=${page}&` : ""}
      `,
    }).then((response) => {
      return response;
    });
  }

  static updateProfileImage(formData) {
    return axios({
      method: "GET",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("key")}`,
      },
      data: formData,
      url: `${rootAddress}/api/jwt/profile/update/`,
    }).then((response) => {
      return response;
    });
  }

  static getSingleItem(id) {
    return axios({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("key")
          ? `Bearer ${localStorage.getItem("key")}`
          : "",
      },
      url: `${rootAddress}/api/items/${id}/`,
    }).then((response) => {
      return response;
    });
  }

  static getPublicProfile(id) {
    return axios({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("key")
          ? `Bearer ${localStorage.getItem("key")}`
          : "",
      },
      url: `${rootAddress}/api/jwt/profile/${id}/`,
    }).then((response) => {
      return response;
    });
  }

  static getPublicProfileItems(id) {
    return axios({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      url: `${rootAddress}/api/items/profile-items/${id}/`,
    }).then((response) => {
      return response;
    });
  }

  static getPublicProfileAddresses(id) {
    return axios({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      url: `${rootAddress}/api/jwt/profile/address/${id}/`,
    }).then((response) => {
      return response;
    });
  }

  static getRecentItems() {
    return axios({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      url: `${rootAddress}/api/items/recent/`,
    }).then((response) => {
      return response;
    });
  }

  static getRandomItems() {
    return axios({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      url: `${rootAddress}/api/items/random/`,
    }).then((response) => {
      return response;
    });
  }

  static fetchFavorites(id) {
    return axios({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("key")}`,
      },
      url: `${rootAddress}/api/items/favorite/`,
    });
  }

  static addFavoriteItem(id) {
    return axios({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("key")}`,
      },
      data: {
        item: id,
      },
      url: `${rootAddress}/api/items/favorite/create/`,
    }).then((response) => {
      return response;
    });
  }

  static deleteFavoriteItem(id) {
    return axios({
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("key")}`,
      },
      url: `${rootAddress}/api/items/favorite/delete/${id}/`,
    }).then((response) => {
      return response;
    });
  }

  static fetchNews() {
    return axios({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      url: `${rootAddress}/api/additional_entities/news/`,
    }).then((response) => {
      return response;
    });
  }

  static fetchMainPageBlocks() {
    return axios({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      url: `${rootAddress}/api/additional_entities/blocks/`,
    }).then((response) => {
      return response;
    });
  }

  static vkAuth(code) {
    return axios({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      url: `${rootAddress}/api/jwt/access-token-vk/?code=${code}`,
    }).then((response) => {
      console.log(code);
      return response;
    });
  }

  static googleAuth(code) {
    return axios({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      url: `${rootAddress}/api/jwt/access-token-google/?code=${code}/`,
    }).then((response) => {
      return response;
    });
  }

  static facebookAuth(code) {
    return axios({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      url: `${rootAddress}/api/jwt/access-token-facebook/?code=${code}/`,
    }).then((response) => {
      return response;
    });
  }

  static fetchPopular() {
    return axios({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      url: `${rootAddress}/api/items/popular/`,
    }).then((response) => {
      return response;
    });
  }

  static deleteAccount(type) {
    return axios({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("key")}`,
      },
      data: {
        login_type: type,
      },
      url: `${rootAddress}/api/jwt/delete-account-facebook/`,
    }).then((response) => {
      return response;
    });
  }

  static createNewChatRoom(sender, receiver, item) {
    return axios({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("key")}`,
      },
      data: {
        receiver_id: receiver,
        sender_id: sender,
        item: item,
      },
      url: `${rootAddress}/api/chat/create/`,
    }).then((response) => {
      return response;
    });
  }

  static getUsersChats() {
    return axios({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("key")}`,
      },
      url: `${rootAddress}/api/chat/`,
    }).then((response) => {
      return response;
    });
  }

  static getLastNearestItems(coords) {
    return axios({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      url: `${rootAddress}/api/items/more_n_km/${
        coords ? `?coordinates=${coords}` : ""
      }`,
    }).then((response) => {
      return response;
    });
  }

  static changeLogin(old_login, new_login) {
    return axios({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        username: old_login,
        new_username: new_login,
      },

      url: `${rootAddress}/api/jwt/change-login/`,
    }).then((response) => {
      return response;
    });
  }

  static getPartners() {
    return axios({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      url: `${rootAddress}/api/additional_entities/partners/`,
    }).then((response) => {
      return response;
    });
  }

  static getSiteSettings() {
    return axios({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      url: `${rootAddress}/api/site_settings/settings/`,
    }).then((response) => {
      return response;
    });
  }

  static createBooking({
    reservation_user_name,
    reservation_user_phone,
    reservation_text_sender,
    reservation_start_time,
    item_id,
    owner_id,
    delivery_choice,
    reservation_time,
    count_date_object,
    reserve_rent,
    reserve_price_rent,
    reserve_offer_price_rent,
    reserve_self_delivery_price,
    reserve_servicefee_price,
    reserve_pledge_price,
    reserve_insurance_price,
    reserve_franchise_price,
    reservation_address_delivery,
    reserve_name_item,
    reserve_delivery_free,
    reserve_contract,
  }) {
    return axios({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("key")}`,
      },
      data: {
        reservation_user_name: reservation_user_name
          ? reservation_user_name
          : "",
        reservation_user_phone: reservation_user_phone,
        reservation_text_sender: reservation_text_sender,
        reservation_start_time: `${reservation_start_time}`,
        item_id: item_id,
        owner_id: owner_id,
        delivery_choice: delivery_choice,
        reservation_time: reservation_time,
        count_date_object: count_date_object,
        reserve_rent: reserve_rent ? reserve_rent : 0.0,
        reserve_price_rent: reserve_price_rent ? reserve_price_rent : null,
        reserve_offer_price_rent: reserve_offer_price_rent
          ? reserve_offer_price_rent
          : null,
        reserve_self_delivery_price: reserve_self_delivery_price
          ? reserve_self_delivery_price
          : 0.0,
        reserve_servicefee_price: reserve_servicefee_price
          ? reserve_servicefee_price
          : 0.0,
        reserve_pledge_price: reserve_pledge_price ? reserve_pledge_price : 0.0,
        reserve_insurance_price: reserve_insurance_price
          ? reserve_insurance_price
          : 0.0,
        reserve_franchise_price: reserve_franchise_price
          ? reserve_franchise_price
          : 0.0,
        reserve_name_item: reserve_name_item,
        reserve_delivery_free: reserve_delivery_free,
        reserve_contract: reserve_contract,
        reservation_address_delivery: reservation_address_delivery
          ? reservation_address_delivery
          : "",
      },

      url: `${rootAddress}/api/items/reservation/create/`,
    }).then((response) => {
      return response;
    });
  }

  static getOutgoingReservations() {
    return axios({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("key")}`,
      },
      url: `${rootAddress}/api/items/outgoing_reservation/`,
    }).then((response) => {
      return response;
    });
  }

  static getIncomingReservations() {
    return axios({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("key")}`,
      },
      url: `${rootAddress}/api/items/incoming_reservation/`,
    }).then((response) => {
      return response;
    });
  }

  static updateReservationStatus(id, bool) {
    return axios({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("key")}`,
      },
      data: {
        reservation_status: bool,
      },

      url: `${rootAddress}/api/items/update_reservation_status/${id}/ `,
    }).then((response) => {
      return response;
    });
  }

  static deleteReservation(id) {
    return axios({
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("key")}`,
      },
      url: `${rootAddress}/api/items/delete_reservation/${id}/`,
    }).then((response) => {
      return response;
    });
  }
}

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      error.config &&
      !error.config._isRetry &&
      localStorage.getItem("refresh")
    ) {
      originalRequest._isRetry = true;
      Requests.refresh(localStorage.getItem("refresh"))
        .then((response) => {
          localStorage.setItem("key", response.data.access);
          originalRequest.headers.Authorization = `Bearer ${localStorage.getItem(
            "key"
          )}`;
          return axios.request(originalRequest).then((res) => {
            return res;
          });
        })
        .catch(() => {
          localStorage.removeItem("key");
          localStorage.removeItem("refresh");
          localStorage.removeItem("social");
          localStorage.removeItem("ref");
          setTimeout(() => {
            window.location.href = "/";
          }, 2000);
          return;
        });
    }

    if (
      error.response.status === 401 &&
      error.config &&
      !localStorage.getItem("refresh")
    ) {
      localStorage.removeItem("key");
      localStorage.removeItem("refresh");
      localStorage.removeItem("social");
      localStorage.removeItem("ref");
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
      return;
    }

    if (error.response.status === 304) {
      return error;
    }
    throw error;
  }
);

export default Requests;
