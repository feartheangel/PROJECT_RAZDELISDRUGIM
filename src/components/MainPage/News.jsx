import React from 'react';
import Requests from '../../http/axios-requests';
import { useSelector, useDispatch } from 'react-redux';
import { setNews } from '../../redux/actions/items';
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
  const dispatch = useDispatch();
  const { news } = useSelector(({ items }) => items);

  React.useEffect(() => {
    Requests.fetchNews().then((res) => {
      dispatch(setNews(res.data));
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
            scrollbar={{ draggable: true }}
            id="swiper_comp">
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
          {/* мобильный адаптив */}
          <Swiper
            spaceBetween={70}
            slidesPerView={1}
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            id="swiper_mobile">
            {news &&
              news.map((item) => {
                return (
                  <SwiperSlide
                    style={{ display: 'flex', width: '250px', justifyContent: 'center' }}>
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
