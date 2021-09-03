import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import "swiper/swiper.scss";
// Import Swiper styles
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/scrollbar/scrollbar.scss";

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const News = () => {
  const dispatch = useDispatch();
  const { news } = useSelector(({ items }) => items);

  return (
    <section className="news-reviews">
      <div className="news-reviews-content">
        <p className="main-news-reviews-title">Новости и обзоры</p>
        <div className="news-reviews-blocks">
          <Swiper
            spaceBetween={50}
            slidesPerView={3}
            pagination={{ clickable: true }}
            id="swiper_comp"
          >
            {news &&
              news.map((item) => {
                return (
                  <SwiperSlide style={{ display: "flex" }}>
                    <div className="news-reviews-block">
                      <p className="news-reviews-date">
                        {news && item.news_title}
                      </p>
                      <p
                        style={{ display: "none" }}
                        className="news-reviews-title"
                      >
                        У нас появилась доставка!
                      </p>
                      <p className="news-reviews-text">
                        {news && item.news_description}
                      </p>
                    </div>
                  </SwiperSlide>
                );
              })}
          </Swiper>
          {/* мобильный адаптив */}
          <Swiper
            spaceBetween={70}
            slidesPerView={1}
            pagination={{ clickable: true }}
            // scrollbar={{ draggable: true }}
            id="swiper_mobile"
          >
            {news &&
              news.map((item) => {
                return (
                  <SwiperSlide
<<<<<<< HEAD
                    style={{
                      display: "flex",
                      width: "250px",
                      justifyContent: "center",
                    }}
                  >
=======
                    style={{ display: 'flex', width: '250px', justifyContent: 'center'}}>
>>>>>>> 2942bf8380f836a0c41b2b2fbcddeeba585e602d
                    <div className="news-reviews-block">
                      <p className="news-reviews-date">
                        {news && item.news_title}
                      </p>
                      <p
                        style={{ display: "none" }}
                        className="news-reviews-title"
                      >
                        У нас появилась доставка!
                      </p>
                      <p className="news-reviews-text">
                        {news && item.news_description}
                      </p>
                    </div>
                  </SwiperSlide>
                );
              })}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default News;
