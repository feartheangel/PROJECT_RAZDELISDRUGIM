import React from "react";
import { YMaps, Map, Placemark, Clusterer } from "react-yandex-maps";
import { useSelector } from "react-redux";
import Requests from "../../http/axios-requests";
import { rootAddress } from "../../http/axios-requests";

const MapBlock = () => {
  //координаты меток карты
  const [marks, setMarks] = React.useState();
  const { userCoordinates } = useSelector(({ search }) => search);

  const getPointOptions = (index) => {
    return {
      preset: `islands#blueDotIcon`,
    };
  };

  const getPointData = (index) => {
    return {
      balloonContentBody: [
        `
        <div style=display:flex;justify-content:center;overflow:hidden><strong><p style=font-size:18px;margin-top:0 class="recent-block-title-p">${
          marks[index][2]
        }</p></strong></div>
        <div style=display:flex;flex-direction:column;align-items:center class="recent-block-wrapper">
        <a style=display:flex;flex-direction:column;align-items:center target="_blank">
          <div style=display:flex;flex-direction:column;align-items:center className="recent-block">
           <img alt="razdelisdrugim"  style=width:108px src=${`${rootAddress}${marks[index][1]}`}  class="block-image" />
              ${
                !marks[index][6] && !marks[index][7]
                  ? `<div style=justify-content:flex-start;margin-top:7px class="recent-time-cost-wrapper">
                <p style=margin-right:5px;font-size:13px  class="recent-cost-p">${marks[index][3]} BYN</p>
                <p class="recent-time-p">
                ${marks[index][4]}
                </p>
              </div>`
                  : ""
              }
              ${
                marks[index][7]
                  ? `<div style=marginTop:13px  class="recent-time-cost-wrapper">
                  <p style=font-size:14px class="recent-time-p">
                    Предложить свою цену
                  </p>
                </div>`
                  : ""
              }
              ${
                marks[index][6]
                  ? `<div
                  style={{ justifyContent: 'flex-start', marginTop: '5px' }}
                  class="recent-time-cost-wrapper">
                  <p class="recent-time-p">
                    Бесплатно
                  </p>
                </div>`
                  : ""
              }
              <a href=/item-card?id=${marks[index][5]} target='_blank'>
            <p
            style='margin-top:7px;font-size:16px'
              class="recent-block-title-p">
              Подробнее
            </p>
            </a>
          </div>
        </a>
      </div>
          `,
      ].join(""),
    };
  };

  const [mapData, setMapData] = React.useState();

  //определение координат последних вещей
  React.useEffect(() => {
    //параметры карты
    setMapData({
      center: userCoordinates
        ? userCoordinates.split(" ").reverse()
        : [53.91, 27.55],
      zoom: 12,
      behaviors: ["default", "scrollZoom"],
      controls: ["zoomControl", "fullscreenControl", "rulerControl"],
    });

    Requests.getLastNearestItems(
      userCoordinates ? userCoordinates.split(" ").join(" ") : `27.55 53.91`
    ).then((response) => {
      setMarks(
        response.data.map((item) => {
          return [
            item.items_coordinates
              .split("(")[1]
              .split(")")[0]
              .split(" ")
              .reverse(),
            item.image_1,
            item.name_item,
            item.price_rent,
            item.rent,
            item.id,
            item.free_rent,
            item.offer_price_rent,
          ];
        })
      );
    });
  }, [userCoordinates]);

  return (
    <section className="map">
      <div
        style={
          window.screen.width > 1024
            ? { width: 1150 }
            : window.screen.width < 1024 && window.screen.width > 480
            ? { width: 1150 }
            : { width: "100%" }
        }
      >
        <YMaps>
          <Map
            state={mapData}
            width={window.screen.width > 1024 ? 1150 : "auto"}
            height={window.screen.width > 480 ? 500 : 300}
            modules={["package.full"]}
          >
            <Clusterer
              options={{
                preset: "islands#invertedBlueClusterIcons",
                groupByCoordinates: false,
                clusterDisableClickZoom: true,
                clusterHideIconOnBalloonOpen: true,
                geoObjectHideIconOnBalloonOpen: true,
                hasBalloon: true,
                clusterBalloonContentLayout: "cluster#balloonCarousel",
                clusterBalloonPagerSize: 5,
                clusterBalloonContentLayoutHeight: 270,
                clusterBalloonContentLayoutWidth: 200,
                clusterBalloonPanelMaxMapArea: 0,
              }}
            >
              {marks &&
                marks.map((mark, index) => (
                  <Placemark
                    key={index}
                    geometry={mark[0]}
                    modules={[
                      "geoObject.addon.balloon",
                      "geoObject.addon.hint",
                    ]}
                    properties={getPointData(index)}
                    options={getPointOptions(index)}
                  />
                ))}
            </Clusterer>
            {userCoordinates && (
              <Placemark
                key={"own_geo"}
                geometry={userCoordinates.split(" ").reverse()}
                modules={["geoObject.addon.balloon", "geoObject.addon.hint"]}
                options={{ preset: `islands#redDotIcon` }}
                properties={{
                  iconCaption: "Я тут!",
                }}
              />
            )}
          </Map>
        </YMaps>
      </div>
    </section>
  );
};

export default MapBlock;
