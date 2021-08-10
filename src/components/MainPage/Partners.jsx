import React from 'react';
import partner1 from '../../img/MainPage/partner1.png';
import partner2 from '../../img/MainPage/partner2.png';
import partner3 from '../../img/MainPage/partner3.png';
import ArrowLeft from '../../img/MainPage/Arrow_left.png';
import ArrowRight from '../../img/MainPage/Arrow_right.png';

const Partners = () => {
  return (
    <section className="partners">
      <div className="partners-content">
        <p className="partners-main-title">С нами сотрудничают</p>
        <div className="partners-middle-part">
          <img src={ArrowLeft} alt="" className="partners-arrow-left" />
          <div className="partners-images">
            <img src={partner1} alt="" className="partner-image" />
            <img src={partner2} alt="" className="partner-image" />
            <img src={partner3} alt="" className="partner-image" />
          </div>
          <img src={ArrowRight} alt="" className="partners-arrow-right" />
        </div>
      </div>
    </section>
  );
};

export default Partners;
