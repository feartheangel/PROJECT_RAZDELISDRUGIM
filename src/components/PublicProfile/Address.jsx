import React from "react";
import "../../css/ComponentAddress.css";
import PhotoLocation from "..//../img/ProfilePage/location.png";

const Address = ({ addresses }) => {
  return (
    <div style={{ alignSelf: "flex-start" }} className="Component_Address">
      {addresses &&
        addresses.map((address, index) => {
          return (
            <div className="Component_Address_row2">
              <img
                alt="razdelisdrugim"
                src={PhotoLocation}
                className="Address_row_img"
              />
              <p>{address}</p>
            </div>
          );
        })}
    </div>
  );
};

export default Address;
