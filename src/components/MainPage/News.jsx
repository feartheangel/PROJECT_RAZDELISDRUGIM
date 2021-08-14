import React from 'react';
import Requests from '../../http/axios-requests';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import 'swiper/swiper.scss';
// Import Swiper styles
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const News = () => {
  const [news, setNews] = React.useState();

  React.useEffect(() => {
    Requests.fetchNews().then((res) => {
      setNews(res.data);
    });
  }, []);

  return (
    <section className="news-reviews">
      <div className="news-reviews-content">
        <p className="main-news-reviews-title">Новости и обзоры</p>
        <div className="news-reviews-blocks">
          <Swiper
            spaceBetween={50}
            slidesPerView={3}
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}>
            {news &&
              news.map((item) => {
                return (
                  <SwiperSlide style={{ display: 'flex' }}>
                    <div className="news-reviews-block">
                      <p className="news-reviews-date">{news && item.news_title}</p>
                      <p style={{ display: 'none' }} className="news-reviews-title">
                        У нас появилась доставка!
                      </p>
                      <p className="news-reviews-text">{news && item.news_description}</p>
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
