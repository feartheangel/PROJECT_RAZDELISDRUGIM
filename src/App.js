import { Route } from "react-router-dom";
import {
  Home,
  PlaceItem,
  PrivateProfile,
  SearchPage,
  CardThings,
  EditItem,
  MyItems,
  PublicProfile,
  Catalog,
  MyFavorites,
  HowItWorks,
  HelpPage,
  DeliveryAndPayment,
  FAQ,
  Collab,
  Guide,
  Disputs,
  Protection,
  HowToRentOut,
  HowToRent,
  ForBusiness,
  ConfidencePolicy,
  AccountDeletion,
  Contacts,
} from "./pages/index";
import { PasswordRecoverySubmit } from "./components/index";
import "./css/main-page.css";
import React from "react";
import Requests from "./http/axios-requests";
import { setUserData } from "./redux/actions/userData";
import { useDispatch, useSelector } from "react-redux";
import {
  setItems,
  setItemsLoaded,
  setItemsLoading,
} from "./redux/actions/items";
import {
  setAdresses,
  setUserSubjects,
  setFavorites,
} from "./redux/actions/userData";

import { setUserCoords } from "./redux/actions/search";

function App() {
  const YMetric = `<script async src="https://www.googletagmanager.com/gtag/js?id=G-L066HXCMFD"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-L066HXCMFD');
</script><noscript><div><img src="https://mc.yandex.ru/watch/83058148" style="position:absolute; left:-9999px;" alt="" /></div></noscript>`;

  const GMetric = `<script type="text/javascript" >
   (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
   m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
   (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

   ym(83058148, "init", {
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true
   });
</script>`;

  const { isLoggedIn, reload } = useSelector(({ userData }) => userData);
  const dispatch = useDispatch();

  React.useEffect(() => {
    isLoggedIn &&
      Requests.refresh(localStorage.getItem("refresh")).then((res) => {
        localStorage.setItem("key", res.data.access);
      });
  }, [window.location.href]);

  React.useEffect(() => {
    Requests.fetchItems().then((response) => {
      dispatch(setItems(response.data));
      dispatch(setItemsLoaded());
    });
    isLoggedIn &&
      Requests.fetchUserProfile().then((response) => {
        dispatch(setUserData(response.data));
        Requests.fetchAdresses()
          .then((response) => {
            dispatch(setAdresses(response.data));
          })
          .then(() => {
            Requests.fetchSubjects().then((response) => {
              dispatch(setUserSubjects(response.data));
            });
          })
          .then(() => {
            Requests.fetchFavorites().then((response) => {
              dispatch(setFavorites(response.data));
            });
          })

          .catch((err) => console.log(err));
      });
  }, [isLoggedIn, reload, localStorage.getItem("key")]);

  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        dispatch(
          setUserCoords(`${pos.coords.longitude} ${pos.coords.latitude}`)
        );
        console.log(pos.coords.accuracy);
      },
      () => alert("Ошибка получения местоположения!"),
      { maximumAge: 0, enableHighAccuracy: true }
    );
  }, []);

  return (
    <div className="wrapper">
      <div className="content">
        <Route path="/" component={Home} exact />
        <Route
          path="/recovery-submit"
          component={PasswordRecoverySubmit}
          exact
        />
        <Route path="/place-item" component={PlaceItem} exact />
        <Route path="/private-profile" component={PrivateProfile} exact />
        <Route path="/i-rent-out" component={MyItems} exact />
        <Route path="/search" component={SearchPage} exact />
        <Route path="/item-card" component={CardThings} exact />
        <Route path="/edit-item" component={EditItem} exact />
        <Route path="/public-profile" component={PublicProfile} exact />
        <Route path="/catalog" component={Catalog} exact />
        <Route path="/favorites" component={MyFavorites} exact />
        <Route path="/how-it-works" component={HowItWorks} exact />
        <Route path="/help" component={HelpPage} exact />
        <Route
          path="/delivery-and-payment"
          component={DeliveryAndPayment}
          exact
        />
        <Route path="/FAQ" component={FAQ} exact />
        <Route path="/collaboration" component={Collab} exact />
        <Route path="/guide" component={Guide} exact />
        <Route path="/disputs" component={Disputs} exact />
        <Route path="/protection" component={Protection} exact />
        <Route path="/how-to-rent-out" component={HowToRentOut} exact />
        <Route path="/how-to-rent" component={HowToRent} exact />
        <Route path="/for-business" component={ForBusiness} exact />
        <Route path="/confidence-policy" component={ConfidencePolicy} exact />
        <Route path="/account-deletion" component={AccountDeletion} exact />
        <Route path="/contacts" component={Contacts} exact />
        <div dangerouslySetInnerHTML={{ __html: YMetric }}></div>
        <div dangerouslySetInnerHTML={{ __html: GMetric }}></div>
      </div>
    </div>
  );
}

export default App;
