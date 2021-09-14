import React from "react";
import { ItemCard } from "../index";
import Requests from "../../http/axios-requests";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";

const RecentItemsSlider = () => {
  // install Swiper modules
  SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

  const [recentItems, setRecentItems] = React.useState([]);

  React.useEffect(() => {
    Requests.getRecentItems().then((res) => {
      setRecentItems(res.data);
    });
  }, []);

  return (
    <section className="recent-wrapper" id="wrapper_slider">
      <div className="recent-content">
        <p className="recent-p">Недавно добавленные</p>
        <div className="recent-blocks-wrapper">
          <div className="recent-blocks-slider-container">
            <Swiper
              spaceBetween={-8}
              slidesPerView={4}
              pagination={{ clickable: true }}
              id="swiper_comp"
            >
              {recentItems &&
                recentItems.map((item, index) => (
                  <SwiperSlide style={{ display: "flex" }}>
                    {" "}
                    <ItemCard key={index} item={item} />
                  </SwiperSlide>
                ))}
            </Swiper>
            {/* копия для адаптива 480 */}
            <Swiper
              spaceBetween={0}
              slidesPerView={2}
              pagination={{ clickable: true }}
              // scrollbar={{ draggable: true }}
              id="swiper_mobile"
            >
              {recentItems &&
                recentItems.map((item, index) => (
                  <SwiperSlide style={{ display: "flex", width: "150px" }}>
                    {" "}
                    <ItemCard key={index} item={item} />
                  </SwiperSlide>
                ))}
            </Swiper>

            {/* копия для планшета 800 */}
            <Swiper
              spaceBetween={0}
              slidesPerView={3}
              pagination={{ clickable: true }}
              
              // scrollbar={{ draggable: true }}
              id ="swiper_mobile_768"
              >
              {recentItems &&
                recentItems.map((item, index) => (
                  <SwiperSlide style={{ display: 'flex', width:'auto' }}>
                    {' '}
                    <ItemCard key={index} item={item} />
                  </SwiperSlide>
                ))}
            </Swiper>

                        {/* копия для планшета 800 */}
              <Swiper
              spaceBetween={0}
              slidesPerView={4}
              pagination={{ clickable: true }}
              
              // scrollbar={{ draggable: true }}
              id ="swiper_mobile_1024"
              >
              {recentItems &&
                recentItems.map((item, index) => (
                  <SwiperSlide style={{ display: 'flex', width:'auto' }}>
                    {' '}
                    <ItemCard key={index} item={item} />
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecentItemsSlider;
