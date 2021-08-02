import React from "react";
import '../../css/ComponentAddress.css';
import PhotoLocation from '..//../img/ProfilePage/location.png';
import map from '../../img//ProfilePage/map.png';

const Address = () => {
  return (
    <div className="Component_Address">
      <div className="Component_Address_row1">
      <img src={PhotoLocation} alt=""  className="Address_row_img"/>
        <p>Минск, Центральный р-н, пр-т Победителей, д. 144</p>
      </div>

      <div className="Component_Address_row2">
          <img src={PhotoLocation} alt="" className="Address_row_img"/>
        <p>Минск, Центральный р-н, пр-т Дзержинского, д. 117</p>
      </div>

      <div>
        <img src={map} alt="" />
      </div>
    </div>
  );
};

export default Address;
