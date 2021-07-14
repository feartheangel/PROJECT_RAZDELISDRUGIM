import React, {useState} from 'react';
import './CardProduct.css';
import photoItem from '../../../img/SearchPage/photoItem.png';
import socialCar from '../../../img/SearchPage/social_car.png';
import socialGold from '../../../img/SearchPage/social_gold.png';
import socialPaper from '../../../img/SearchPage/social_paper.png';
import socialVector from '../../../img/SearchPage/social_vector.png';
import socialFire from '../../../img/SearchPage/social_fire.png';
import socialDollar from '../../../img/SearchPage/social_dollar.png';
import clock from '../../../img/SearchPage/clock.png';
import love from '../../../img/SearchPage/love.png';

const CardProduct =()=>{

    return(
        <div className="blocks_card_content">
            <div className="blocks_card_content_photo">
                <img src={photoItem} alt ="" />
            </div>

            <div className="blocks_card_social_img">
                <img src={socialCar} alt =" " />
                <img src={socialGold} alt =" " />
                <img src={socialPaper} alt =" " />
                <img src={socialVector} alt =" " />
                <img src={socialFire} alt =" " />
                <img src={socialDollar} alt =" " />
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
                <img src={clock} alt =""/>
                <p>Скоро освободится</p>
                <img src={love} alt =""/>
            </div>
        </div>
    )
}

export default CardProduct