import React from "react";
import partner1 from "../../img/MainPage/partner1.png";
import partner2 from "../../img/MainPage/partner2.png";
import partner3 from "../../img/MainPage/partner3.png";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import Requests from "../../http/axios-requests";

const Partners = () => {
  const [partners, setPartners] = React.useState();

  React.useEffect(() => {
    Requests.getPartners().then((res) => {
      setPartners(res.data);
    });
  }, []);

  // install Swiper modules
  SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);
  return (
    <section className="partners">
      <div className="partners-content">
        <p className="partners-main-title">С нами сотрудничают</p>
        <div className="partners-slider-container">
          <Swiper
            spaceBetween={180}
            slidesPerView={3}
            pagination={{ clickable: true }}
            id="swiper_comp"
          >
            {partners &&
              partners.map((item, index) => (
                <SwiperSlide key={index}>
                  <a href={item.link_partner} target="_blank">
                    <img
                      src={`https://razdelisdrugim.by${item.image_partner}`}
                    />
                  </a>
                </SwiperSlide>
              ))}
          </Swiper>
          <div id="swiper_mobile">
            <Swiper
              style={{
                display: "flex",
                width: "250px",
                justifyContent: "center",
              }}
              spaceBetween={20}
              slidesPerView={1}
              pagination={{ clickable: true }}
              id="swiper_mobile"
            >
              {partners &&
                partners.map((item, index) => (
                  <SwiperSlide key={index}>
                    <a href={item.link_partner} target="_blank">
                      <img
                        src={`https://razdelisdrugim.by${item.image_partner}`}
                      />
                    </a>
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partners;
