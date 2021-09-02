import React from 'react';
import Requests from '../../http/axios-requests';
import { ItemCard } from '../index';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

const RandomItemsSlider = () => {
  // install Swiper modules
  SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);
  const [randomItems, setRandomItems] = React.useState([]);

  React.useEffect(() => {
    Requests.fetchPopular().then((res) => {
      setRandomItems(res.data);
    });
  }, []);

  return (
    <section className="popular-wrapper">
      <p className="popular-p">Самые просматриваемые</p>
      <div className="recent-blocks-wrapper">
        <div className="recent-blocks-slider-container">
          <Swiper
            spaceBetween={-8}
            slidesPerView={4}
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            id="swiper_comp">
            {randomItems &&
              randomItems.map((item, index) => (
                <SwiperSlide style={{ display: 'flex' }}>
                  {' '}
                  <ItemCard key={index} item={item} />
                </SwiperSlide>
              ))}
          </Swiper>
          {/* копия для адаптива */}
          <Swiper
            spaceBetween={0}
            slidesPerView={2}
            pagination={{ clickable: true }}
            
            // scrollbar={{ draggable: true }}
            id="swiper_mobile">
            {randomItems &&
              randomItems.map((item, index) => (
                <SwiperSlide style={{ display: 'flex', width: '150px' }}>
                  {' '}
                  <ItemCard key={index} item={item} />
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>
      <Link style={{ textDecoration: 'none' }} to="/catalog" style={{marginTop:'5px'}}>
        <input type="button" value="Смотреть каталог" className="popular-button" />
      </Link>
    </section>
  );
};

export default RandomItemsSlider;
