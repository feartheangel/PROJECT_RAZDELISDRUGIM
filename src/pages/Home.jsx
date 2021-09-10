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
        <Header />
        <FirstBlockNavigation />
        <RecentItemsSlider />
        <MapBlock />
        <RandomItemsSlider />
        <AbilitiesBlock />
        {false && <ReviewsBlock />}
        <AboutBlock />
        <Partners />
        <News />
        <Categories />
        {false && <Adverts />}
        {false && <MediaAbout />}
        <Footer />
      </div>
    </div>
  );
};

export default Home;
