import React from 'react';
import Requests from '../../http/axios-requests';
import ArrowLeft from '../../img/MainPage/Arrow_left.png';
import ArrowRight from '../../img/MainPage/Arrow_right.png';
import { ItemCard } from '../index';
import { Link } from 'react-router-dom';

const RandomItemsSlider = () => {
  const [randomItems, setRandomItems] = React.useState([]);
  const [randomSliderPos, setRandomSliderPos] = React.useState(0);

  const randomSliderPosHandler = (dir) => {
    if (dir === 'less' && randomSliderPos !== 0) {
      setRandomSliderPos(randomSliderPos + 293);
    }

    if (dir === 'more' && randomSliderPos !== -1758) {
      setRandomSliderPos(randomSliderPos - 293);
    }
  };

  React.useEffect(() => {
    Requests.getRandomItems().then((res) => {
      setRandomItems(res.data.reverse());
    });
  }, []);

  return (
    <section className="popular-wrapper">
      <p className="popular-p">Случаные вещи, услуги</p>
      <div className="recent-blocks-wrapper">
        <img
          onClick={() => randomSliderPosHandler('less')}
          src={ArrowLeft}
          alt=""
          className="recent-arrow-left"
        />
        <div className="recent-blocks-slider-container">
          <div
            style={{ transform: `translate(${randomSliderPos}px, 0px)` }}
            className="home_slider_track">
            {randomItems && randomItems.map((item, index) => <ItemCard key={index} item={item} />)}
          </div>
        </div>
        <img
          onClick={() => randomSliderPosHandler('more')}
          src={ArrowRight}
          alt=""
          className="recent-arrow-right"
        />
      </div>
      <Link style={{ textDecoration: 'none' }} to="/catalog">
        <input type="button" value="Смотреть каталог" className="popular-button" />
      </Link>
    </section>
  );
};

export default RandomItemsSlider;
