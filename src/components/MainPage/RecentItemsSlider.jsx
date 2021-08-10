import React from 'react';
import { ItemCard } from '../index';
import ArrowLeft from '../../img/MainPage/Arrow_left.png';
import ArrowRight from '../../img/MainPage/Arrow_right.png';
import Requests from '../../http/axios-requests';

const RecentItemsSlider = () => {
  const [recentItems, setRecentItems] = React.useState([]);
  const [recentSliderPos, setRecentSliderPos] = React.useState(0);

  const recentSliderPosHandler = (dir) => {
    if (dir === 'less' && recentSliderPos !== 0) {
      setRecentSliderPos(recentSliderPos + 293);
    }

    if (dir === 'more' && recentSliderPos !== -1758) {
      setRecentSliderPos(recentSliderPos - 293);
      console.log(recentSliderPos);
    }
  };

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
          <img
            onClick={() => recentSliderPosHandler('less')}
            src={ArrowLeft}
            alt=""
            className="recent-arrow-left"
          />
          <div className="recent-blocks-slider-container">
            <div
              style={{ transform: `translate(${recentSliderPos}px, 0px)` }}
              className="home_slider_track">
              {recentItems &&
                recentItems.map((item, index) => <ItemCard key={index} item={item} />)}
            </div>
          </div>
          <img
            onClick={() => recentSliderPosHandler('more')}
            src={ArrowRight}
            alt=""
            className="recent-arrow-right"
          />
        </div>
      </div>
    </section>
  );
};

export default RecentItemsSlider;
