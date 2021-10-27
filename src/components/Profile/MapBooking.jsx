import React from "react";
import Shape from "../../img/Shape.png";

import { YMaps, Map, Placemark } from "react-yandex-maps";

const MapBooking = ({ setModalActiveMap, modalActiveMap, coords }) => {
  let mapData = {
    center: coords ? coords : [53.91, 27.55],
    zoom: 13,
  };

  React.useEffect(() => {
    mapData = {
      center: coords ? coords : [53.91, 27.55],
      zoom: 20,
    };
  }, [coords]);

  document.onkeydown = function (evt) {
    evt = evt || window.event;
    if (evt.keyCode == 27) {
      setModalActiveMap(false);
    }
  };

  return (
    <div
      className={
        modalActiveMap ? "reg-auth-wrapper active" : "reg-auth-wrapper"
      }
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      onClick={() => setModalActiveMap(false)}
    >
      <div className="map_booking_wrapper">
        <div onClick={(e) => e.stopPropagation()}>
          <YMaps>
            <Map
              state={mapData}
              width={window.screen.width > 480 ? 900 : 300}
              height={window.screen.width > 480 ? 500 : 150}
            >
              <Placemark geometry={coords ? coords : [53.91, 27.55]} />
            </Map>
          </YMaps>
        </div>
        <img
          onClick={() => setModalActiveMap(false)}
          className="map_booking_shape_img"
          src={Shape}
        />
      </div>
    </div>
  );
};

export default MapBooking;
