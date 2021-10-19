import React from "react";
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
          <div id="swiper_comp">
            <Swiper
              spaceBetween={50}
              slidesPerView={4}
              pagination={{ clickable: true }}
              id="swiper_comp"
              style={{
                display: "flex",
                width: "1150px",
              }}
            >
              {partners &&
                partners.map((item, index) => (
                  <SwiperSlide
                    key={index}
                    style={{
                      display: "flex",
                      width: "25%",
                      justifyContent: "center",
                    }}
                  >
                    <a href={item.link_partner} target="_blank">
                      <img
                        src={`https://razdelisdrugim.by${item.image_partner}`}
                      />
                    </a>
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
          {/* мобилка */}
          <div id="swiper_mobile">
            <Swiper
              spaceBetween={0}
              slidesPerView={1}
              pagination={{ clickable: true }}
              id="swiper_mobile"
            >
              {partners &&
                partners.map((item, index) => (
                  <SwiperSlide
                    key={index}
                    style={{
                      display: "flex",
                      width: "250px",
                      minHeight: "150px",
                      justifyContent: "center",
                    }}
                  >
                    <a href={item.link_partner} target="_blank">
                      <img
                        src={`https://razdelisdrugim.by${item.image_partner}`}
                      />
                    </a>
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>

          {/* планшеты 768 */}
          <div id="global_ipad" style={{ width: "100%" }}>
            <Swiper
              style={{
                display: "flex",
                width: "768px",
                justifyContent: "center",
              }}
              spaceBetween={0}
              slidesPerView={3}
              pagination={{ clickable: true }}
              id="swiper_mobile"
            >
              {partners &&
                partners.map((item, index) => (
                  <SwiperSlide key={index} style={{ width: "25%" }}>
                    <a href={item.link_partner} target="_blank">
                      <img
                        src={`https://razdelisdrugim.by${item.image_partner}`}
                      />
                    </a>
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>

          {/* планшеты 1024 */}
          <div id="global_ipad_1024" style={{ width: "100%" }}>
            <Swiper
              style={{
                display: "flex",
                width: "1024px",
                justifyContent: "center",
              }}
              spaceBetween={20}
              slidesPerView={4}
              pagination={{ clickable: true }}
              id="swiper_mobile"
            >
              {partners &&
                partners.map((item, index) => (
                  <SwiperSlide key={index} style={{ width: "25%" }}>
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
