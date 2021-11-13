import React from "react";
import Address from "./Address";
import { useSelector } from "react-redux";
import telephone from "../../img/BookingPage/telephone.png";
import gmailImg from "../../img/BookingPage/gmailimg.png";
import tgImg from "../../img/BookingPage/tgimg.png";
import viberImg from "../../img/BookingPage/viberimg.png";
import miniMobile from "../../img/BookingPage/minimobile.png";
import WhatsAppLogo from "../../img/CardThings/RightContent/Component 38.png";
import InstagramLogo from "../../img/CardThings/RightContent/Component 39.png";
import VkLogo from "../../img/CardThings/RightContent/Component 42.png";
import OkLogo from "../../img/ProfilePage/ok.png";
import FbLogo from "../../img/ProfilePage/facebook2.png";

const AboutMe = ({ about, addresses, profileData }) => {
  const { isLoggedIn } = useSelector(({ userData }) => userData);

  return (
    <div style={{ width: "100%" }}>
      <div className="public_profile_about_wrapper">
        <p className="public_profile_about_upper_p">О себе</p>
        <p className="public_profile_about_main_p">
          {about ? (
            about
          ) : (
            <span style={{ color: "rgba(9, 29, 32, 0.4)" }}>
              Данный пользователь не указал информацию о себе.
            </span>
          )}
        </p>
      </div>

      <div className="public_profile_about_wrapper">
        <p className="public_profile_about_upper_p">Адреса</p>
        {isLoggedIn ? (
          <Address addresses={addresses} />
        ) : !isLoggedIn ? (
          <p style={{ color: "#4CC9F0" }} className="block_up_address-p">
            Адреса доступны после регистрации
          </p>
        ) : (
          ""
        )}
      </div>

      <div className="public_profile_about_wrapper">
        <p className="public_profile_about_upper_p">Контакты</p>
        <div className="body_allblock_header_left_contacts">
          <div className="left_contacts_row">
            <img width="30px" height="30px" src={telephone} alt="vectors" />
            <p> {profileData && profileData.phone}</p>
          </div>
          {profileData && profileData.google_account && (
            <div className="left_contacts_row">
              <img width="30px" height="30px" src={gmailImg} alt="vectors" />
              <p>{profileData && profileData.google_account}</p>
            </div>
          )}
          {profileData && profileData.telegram_account && (
            <div className="left_contacts_row">
              <img width="30px" height="30px" src={tgImg} alt="vectors" />
              <p>@{profileData && profileData.telegram_account}</p>
            </div>
          )}
          {profileData && profileData.viber_account && (
            <div className="left_contacts_row">
              <img width="30px" height="30px" src={viberImg} alt="vectors" />
              <p>+{profileData && profileData.viber_account}</p>
            </div>
          )}
          {profileData && profileData.whatsapp_account && (
            <div className="left_contacts_row">
              <img
                width="30px"
                height="30px"
                src={WhatsAppLogo}
                alt="vectors"
              />
              <p>+{profileData && profileData.whatsapp_account}</p>
            </div>
          )}
          {profileData && profileData.link_instagram && (
            <div className="left_contacts_row">
              <img
                width="30px"
                height="30px"
                src={InstagramLogo}
                alt="vectors"
              />
              <p>{`${
                profileData &&
                profileData.link_instagram.includes("https://www.instagram.com")
                  ? profileData.link_instagram
                  : profileData.link_instagram.includes("instagram.com") &&
                    !profileData.link_instagram.includes("https://")
                  ? `https://${profileData.link_instagram}/`
                  : `https://www.instagram.com/${profileData.link_instagram}/`
              }`}</p>
            </div>
          )}
          {profileData && profileData.ok_account && (
            <div className="left_contacts_row">
              <img width="30px" height="30px" src={OkLogo} alt="vectors" />
              <p>{profileData && profileData.ok_account}</p>
            </div>
          )}
          {profileData && profileData.vk_account && (
            <div className="left_contacts_row">
              <img width="30px" height="30px" src={VkLogo} alt="vectors" />
              <p>{profileData && profileData.vk_account}</p>
            </div>
          )}
          {profileData && profileData.link_facebook && (
            <div className="left_contacts_row">
              <img width="30px" height="30px" src={FbLogo} alt="vectors" />
              <p>{profileData && profileData.link_facebook}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
