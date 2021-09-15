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
import { YMInitializer } from "react-yandex-metrika";

const Home = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (window.location.href.includes("?referral=")) {
      localStorage.setItem("ref", window.location.href.split("?referral=")[1]);
    }
  }, []);

  const GMetric = `<script async src="https://www.googletagmanager.com/gtag/js?id=G-L066HXCMFD"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-L066HXCMFD');
</script>`;

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
      <div>
        <YMInitializer accounts={[83058148]} />
      </div>
      <div dangerouslySetInnerHTML={{ __html: GMetric }}></div>
    </div>
  );
};

export default Home;
