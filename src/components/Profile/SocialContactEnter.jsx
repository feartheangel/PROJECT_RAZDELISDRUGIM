import React from 'react';
import Requests from '../../http/axios-requests';
import { reloadData } from '../../redux/actions/userData';
import { useDispatch, useSelector } from 'react-redux';

const SocialContactEnter = ({ activeSocial, setSocialPopUpActive, setActiveSocial }) => {
  const dispatch = useDispatch();
  const { reload, userData } = useSelector(({ userData }) => userData);

  const saveSocialHandler = () => {
    if (activeSocial === 'tg') {
      Requests.updateTG(
        contact.includes('@')
          ? contact
              .split('')
              .splice(contact.indexOf('@') + 1, contact.length - 1)
              .join('')
          : contact,
      ).then(() => {
        alert('Telegram аккаунт успешно обновлен!');
        setSocialPopUpActive(false);
        setActiveSocial(false);
        dispatch(reloadData(!reload));
      });
    } else if (activeSocial === 'viber') {
      Requests.updateViber(
        contact.includes('+')
          ? contact
              .split('')
              .splice(contact.indexOf('+') + 1, contact.length - 1)
              .join('')
          : contact,
      ).then(() => {
        alert('Viber аккаунт успешно обновлен!');
        setSocialPopUpActive(false);
        setActiveSocial(false);
        dispatch(reloadData(!reload));
      });
    } else if (activeSocial === 'wa') {
      Requests.updateWhatsapp(
        contact.includes('+')
          ? contact
              .split('')
              .splice(contact.indexOf('+') + 1, contact.length - 1)
              .join('')
          : contact,
      ).then(() => {
        alert('WhatsApp аккаунт успешно обновлен!');
        setSocialPopUpActive(false);
        setActiveSocial(false);
        dispatch(reloadData(!reload));
      });
    } else if (activeSocial === 'google') {
      Requests.updateGoogle(contact).then(() => {
        alert('Google аккаунт успешно обновлен!');
        setSocialPopUpActive(false);
        setActiveSocial(false);
        dispatch(reloadData(!reload));
      });
    } else if (activeSocial === 'fb') {
      Requests.updateFacebook(contact).then(() => {
        alert('Facebook аккаунт успешно обновлен!');
        setSocialPopUpActive(false);
        setActiveSocial(false);
        dispatch(reloadData(!reload));
      });
    } else if (activeSocial === 'vk') {
      Requests.updateVK(contact).then(() => {
        alert('VK аккаунт успешно обновлен!');
        setSocialPopUpActive(false);
        setActiveSocial(false);
        dispatch(reloadData(!reload));
      });
    } else if (activeSocial === 'inst') {
      Requests.updateInstagram(contact).then(() => {
        alert('Instagram аккаунт успешно обновлен!');
        setSocialPopUpActive(false);
        setActiveSocial(false);
        dispatch(reloadData(!reload));
      });
    } else if (activeSocial === 'ok') {
      Requests.updateOK(contact).then(() => {
        alert('OK аккаунт успешно обновлен!');
        setSocialPopUpActive(false);
        setActiveSocial(false);
        dispatch(reloadData(!reload));
      });
    }
  };

  const deleteSocialHandler = () => {
    if (activeSocial === 'tg') {
      Requests.updateTG('').then(() => {
        alert('Telegram аккаунт успешно удален!');
        setSocialPopUpActive(false);
        setActiveSocial(false);
        dispatch(reloadData(!reload));
      });
    } else if (activeSocial === 'viber') {
      Requests.updateViber('').then(() => {
        alert('Viber аккаунт успешно удален!');
        setSocialPopUpActive(false);
        setActiveSocial(false);
        dispatch(reloadData(!reload));
      });
    } else if (activeSocial === 'wa') {
      Requests.updateWhatsapp('').then(() => {
        alert('WhatsApp аккаунт успешно удален!');
        setSocialPopUpActive(false);
        setActiveSocial(false);
        dispatch(reloadData(!reload));
      });
    } else if (activeSocial === 'google') {
      Requests.updateGoogle('').then(() => {
        alert('Google аккаунт успешно удален!');
        setSocialPopUpActive(false);
        setActiveSocial(false);
        dispatch(reloadData(!reload));
      });
    } else if (activeSocial === 'fb') {
      Requests.updateFacebook('').then(() => {
        alert('Facebook аккаунт успешно удален!');
        setSocialPopUpActive(false);
        setActiveSocial(false);
        dispatch(reloadData(!reload));
      });
    } else if (activeSocial === 'vk') {
      Requests.updateVK('').then(() => {
        alert('VK аккаунт успешно удален!');
        setSocialPopUpActive(false);
        setActiveSocial(false);
        dispatch(reloadData(!reload));
      });
    } else if (activeSocial === 'inst') {
      Requests.updateInstagram('').then(() => {
        alert('Instagram аккаунт успешно удален!');
        setSocialPopUpActive(false);
        setActiveSocial(false);
        dispatch(reloadData(!reload));
      });
    } else if (activeSocial === 'ok') {
      Requests.updateOK('').then(() => {
        alert('OK аккаунт успешно удален!');
        setSocialPopUpActive(false);
        setActiveSocial(false);
        dispatch(reloadData(!reload));
      });
    }
  };

  React.useEffect(() => {
    if (activeSocial === 'tg') {
      userData.telegram_account ? setContact(userData.telegram_account) : setContact('');
    } else if (activeSocial === 'viber') {
      userData.viber_account ? setContact(userData.viber_account) : setContact('');
    } else if (activeSocial === 'wa') {
      userData.whatsapp_account ? setContact(userData.whatsapp_account) : setContact('');
    } else if (activeSocial === 'google') {
      userData.google_account ? setContact(userData.google_account) : setContact('');
    } else if (activeSocial === 'fb') {
      userData.link_facebook ? setContact(userData.link_facebook) : setContact('');
    } else if (activeSocial === 'vk') {
      userData.vk_account ? setContact(userData.vk_account) : setContact('');
    } else if (activeSocial === 'inst') {
      userData.link_instagram ? setContact(userData.link_instagram) : setContact('');
    } else if (activeSocial === 'ok') {
      userData.ok_account ? setContact(userData.ok_account) : setContact('');
    }
  }, [activeSocial]);

  const [contact, setContact] = React.useState();

  return (
    <div className="social-contact-enter-form">
      <div className="social-contact-enter-content">
        <div
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          className="social-contact-enter-p">
          <p>{`${
            activeSocial === 'tg'
              ? 'Ваш ник-нейм в Telegram без "@"'
              : activeSocial === 'google' ||
                activeSocial === 'fb' ||
                activeSocial === 'vk' ||
                activeSocial === 'inst' ||
                activeSocial === 'ok'
              ? 'Полная ссылка на ваш профиль'
              : activeSocial === 'viber' || activeSocial === 'wa'
              ? 'Ваш номер телефона без "+"'
              : ''
          }`}</p>
        </div>
        <input
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          className="social-contact-enter-text-input"
          type="text"
        />
        <input
          onClick={saveSocialHandler}
          className="social-contact-enter-button-input"
          type="button"
          value="Изменить"
        />
        <input
          onClick={deleteSocialHandler}
          className="social-contact-enter-button-input"
          type="button"
          value="Удалить"
        />
      </div>
    </div>
  );
};

export default SocialContactEnter;
