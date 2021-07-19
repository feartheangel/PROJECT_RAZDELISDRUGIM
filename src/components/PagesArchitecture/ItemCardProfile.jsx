import React from 'react';
import Requests from '../../http/axios-requests';
import { reloadData } from '../../redux/actions/userData';
import { useSelector, useDispatch } from 'react-redux';

const ItemCardProfile = ({ title, image, id }) => {
  const dispatch = useDispatch();
  const { reload } = useSelector(({ userData }) => userData);

  const removeSubjectHandler = () => {
    Requests.deleteSubject(id)
      .then(() => {
        alert('Вещь успешно удалена!');
        dispatch(reloadData(!reload));
      })
      .catch(() => alert('Ошибка удаления вещи.'));
  };

  return (
    <div className="recent-block-wrapper">
      <div className="recent-block__profile">
        <img src={`http://razdelisdrugim.by${image}`} alt="" className="block-image" />
        <p className="recent-block-title-p">{title}</p>
        <div style={{ marginTop: '20px' }} className={'item-card-profile-buttons'}>
          <input value="Изменить" type="button" className="item-card-profile-button" />
          <input
            onClick={removeSubjectHandler}
            value="Удалить"
            type="button"
            className="item-card-profile-button"
          />
          <input value="Скрыть" type="button" className="item-card-profile-button" />
          <input value="Копировать" type="button" className="item-card-profile-button" />
        </div>
      </div>
    </div>
  );
};

export default ItemCardProfile;
