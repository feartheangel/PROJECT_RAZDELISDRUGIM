import React from "react";
import "../css/main-page.css";
import { useDispatch, useSelector } from "react-redux";
import {
  Header,
  Footer,
  FirstBlockNavigation,
  RecentItemsSlider,
  MapBlock,
  RandomItemsSlider,
  AbilitiesBlock,
  ReviewsBlock,
  AboutBlock,
  News,
  Categories,
  Partners,
  Adverts,
  MediaAbout,
} from "../components/index";
import LazyLoad from "react-lazyload";

const Home = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (window.location.href.includes("?referral=")) {
      localStorage.setItem("ref", window.location.href.split("?referral=")[1]);
    }
  }, []);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Главная: #разделисдругим";
  }, []);

  return (
    <div className="Main_page">
      <div class="content">
        <LazyLoad once>
          <Header />
        </LazyLoad>
        <LazyLoad once>
          <FirstBlockNavigation />
        </LazyLoad>
        <LazyLoad once>
          <RecentItemsSlider />
        </LazyLoad>
        <LazyLoad once offset={100}>
          <MapBlock />
        </LazyLoad>
        <LazyLoad once offset={100}>
          <RandomItemsSlider />
        </LazyLoad>
        <LazyLoad once offset={100}>
          <AbilitiesBlock />
        </LazyLoad>
        <LazyLoad once offset={100}>
          {false && <ReviewsBlock />}
        </LazyLoad>
        <LazyLoad once offset={100}>
          <AboutBlock />
        </LazyLoad>
        <LazyLoad once offset={100}>
          <Partners />
        </LazyLoad>
        <LazyLoad once offset={100}>
          <News />
        </LazyLoad>
        <LazyLoad once offset={100}>
          <Categories />
        </LazyLoad>
        <LazyLoad once offset={100}>
          {false && <Adverts />}
        </LazyLoad>
        <LazyLoad once offset={100}>
          {false && <MediaAbout />}
        </LazyLoad>
        <LazyLoad once offset={100}>
          <Footer />
        </LazyLoad>
      </div>
    </div>
  );
};

export default Home;
