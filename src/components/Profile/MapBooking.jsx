import React from "react";

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
      <div onClick={(e) => e.stopPropagation()}>
        <YMaps>
          <Map state={mapData} width={900} height={500}>
            <Placemark geometry={coords ? coords : [53.91, 27.55]} />
          </Map>
        </YMaps>
      </div>
    </div>
  );
};

export default MapBooking;
