import React from 'react';
import { Header, Footer } from '../../components/index';
import './footer-pages.css';
import Requests from '../../http/axios-requests';

const AccountDeletion = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const deleteAccountHandler = () => {
    if (localStorage.getItem('social') !== 'facebook') {
      alert('Вы авторизованы не через Facebook!');
      return;
    }
    Requests.deleteAccount('facebook')
      .then(() => {
        localStorage.removeItem('key');
        localStorage.removeItem('social');
        alert('Аккаунт успешно удален!');
      })
      .catch(() => alert('Ошибка удаления аккаунта!'));
  };

  return (
    <div className="CardThings">
      <Header />
      <div className="CardThings_Wrapper">
        <div className="CardThings_Wrapper_container">
          <div className="container_content_card">
            <div className="card_content_footer_pages">
              <h1 className="footer_pages_main_title">Удаление аккаунта</h1>
              <p className="footer_pages_main_p">
                Вы можете удалить свой аккаунт, который был создан посредством социальной сети
                Facebook.<br></br>
                Для этого нажмите кнопку ниже.<br></br>
                <strong>
                  Важно: удаление аккаунта является необратимым действием. Все учетные данные, а
                  также ваш баланс, объявления, будут удалены.
                </strong>
              </p>
              <input
                onClick={deleteAccountHandler}
                type="button"
                value="Удалить аккаунт"
                className="header-button add-subject"
                id="add-subject2"
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AccountDeletion;
