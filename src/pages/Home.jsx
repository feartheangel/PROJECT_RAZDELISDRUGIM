import React from 'react';
import '../css/main-page.css';
import { useDispatch } from 'react-redux';
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
} from '../components/index';

import { loginAction, logoutAction } from '../redux/actions/userData';

const Home = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (localStorage.getItem('key')) {
      dispatch(loginAction());
    } else dispatch(logoutAction());
  }, [localStorage.getItem('key')]);

  React.useEffect(() => {
    window.scrollTo(0, 0);
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
        <News />
        <Categories />
        {false && <Partners />}
        {false && <Adverts />}
        {false && <MediaAbout />}
        <Footer />
      </div>
    </div>
  );
};

export default Home;
