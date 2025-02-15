import React from "react";
import Requests from "../../../http/axios-requests";
import "./CardProduct.css";
import photoItem from "../../../img/SearchPage/photoItem.png";
import socialCar from "../../../img/SearchPage/social_car.png";
import socialGold from "../../../img/SearchPage/social_gold.png";
import socialPaper from "../../../img/SearchPage/social_paper.png";
import socialVector from "../../../img/SearchPage/social_vector.png";
import socialFire from "../../../img/SearchPage/social_fire.png";
import socialDollar from "../../../img/SearchPage/social_dollar.png";
import clock from "../../../img/SearchPage/clock.png";
import love from "../../../img/SearchPage/love.png";

const CardProduct = () => {
  React.useEffect(() => {
    Requests.getSingleItem(window.location.href.split("?id=")[1]).then(
      (response) => {
        setItemData(response.data);
      }
    );
  }, [window.location.href]);

  const [itemData, setItemData] = React.useState();

  return (
    <div className="blocks_card_content">
      <div className="blocks_card_content_inner">
        <div className="blocks_card_content_photo">
          <img alt="razdelisdrugim" src={photoItem} />
        </div>

        <div className="blocks_card_social_img">
          <img alt="razdelisdrugim" src={socialCar} className="img_socialCar" />
          <img
            alt="razdelisdrugim"
            src={socialGold}
            className="img_socialGold"
          />
          <img
            alt="razdelisdrugim"
            src={socialPaper}
            className="img_socialPaper"
          />
          <img
            alt="razdelisdrugim"
            src={socialVector}
            className="img_socialVector"
          />
          <img
            alt="razdelisdrugim"
            src={socialFire}
            className="img_socialFire"
          />
          <img
            alt="razdelisdrugim"
            src={socialDollar}
            className="img_socialDollar"
          />
        </div>

        <div className="blocks_card_text">
          <p>Ноутбук Apple MacBook Air 13" M1</p>
        </div>

        <div className="blocks_card_time">
          <p className="blocks_card_time_cost"> 5 BYN</p>
          <p> 1 Час</p>
        </div>

        <div className="blocks_card_name">
          <p>Андрей</p>
        </div>

        <div className="blocks_card_freeTime">
          <img alt="razdelisdrugim" src={clock} className="img_clock_block" />
          <p>Скоро освободится</p>
          <img alt="razdelisdrugim" src={love} className="img_love_block" />
        </div>
      </div>
    </div>
  );
};

export default CardProduct;
