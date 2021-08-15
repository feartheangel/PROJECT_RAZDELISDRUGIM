import React from 'react';
import { ItemCard } from '../index';
import Requests from '../../http/axios-requests';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

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
    <section className="recent-wrapper">
      <div className="recent-content">
        <p className="recent-p">Недавно добавленные</p>
        <div className="recent-blocks-wrapper">
          <div className="recent-blocks-slider-container">
            <Swiper
              spaceBetween={50}
              slidesPerView={4}
              pagination={{ clickable: true }}
              scrollbar={{ draggable: true }}>
              {recentItems &&
                recentItems.map((item, index) => (
                  <SwiperSlide style={{ display: 'flex' }}>
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
