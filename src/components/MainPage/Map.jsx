import React from 'react';
import { YMaps, Map, Placemark, Clusterer } from 'react-yandex-maps';
import { useSelector } from 'react-redux';
import Requests from '../../http/axios-requests';

const MapBlock = () => {
  //координаты меток карты
  const [marks, setMarks] = React.useState([]);
  const { userCoordinates } = useSelector(({ search }) => search);

  const getPointOptions = () => {
    return {
      preset: 'islands#violetIcon',
    };
  };

  const getPointData = (index) => {
    return {
      balloonContentBody: [
        `
        <div class="recent-block-wrapper">
        <a style={{ textDecoration: 'none' }} target="_blank">
          <div style={{ cursor: 'pointer' }} className="recent-block">
           <img style=width:220px height:200px src=${`https://razdelisdrugim.by${marks[index][1]}`} alt="" class="block-image" />
            <div class="recent-block-up">
              <strong><p class="recent-block-title-p">${marks[index][2]}</p></strong>
            </div>
              ${
                !marks[index][6] && !marks[index][7]
                  ? `<div class="recent-time-cost-wrapper">
                <p  class="recent-cost-p">${marks[index][3]} BYN</p>
                <p class="recent-time-p">
                ${marks[index][4]}
                </p>
              </div>`
                  : ''
              }
              ${
                marks[index][7]
                  ? `<div style={{ marginTop: '10px' }} class="recent-time-cost-wrapper">
                  <p class="recent-time-p">
                    Предложить свою цену
                  </p>
                </div>`
                  : ''
              }
              ${
                marks[index][6]
                  ? `<div
                  style={{ justifyContent: 'flex-start', marginTop: '10px' }}
                  class="recent-time-cost-wrapper">
                  <p class="recent-time-p">
                    Бесплатно
                  </p>
                </div>`
                  : ''
              }
              <a href=/item-card?id=${marks[index][5]} target='_blank'>
            <p
              class="recent-block-title-p">
              Подробнее
            </p>
            </a>
          </div>
        </a>
      </div>
          `,
      ].join(''),
      clusterCaption: `${marks[index][2]}`,
    };
  };

  //параметры карты
  const mapData = {
    center: userCoordinates ? userCoordinates.split(' ').reverse() : [53.91, 27.55],
    zoom: 12,
    behaviors: ['default', 'scrollZoom'],
  };

  //определение координат последних вещей
  React.useEffect(() => {
    Requests.getRecentItems().then((response) => {
      setMarks(
        response.data.map((item) => {
          return [
            item.items_coordinates.split('(')[1].split(')')[0].split(' ').reverse(),
            item.image_1,
            item.name_item,
            item.price_rent,
            item.rent,
            item.id,
            item.free_rent,
            item.offer_price_rent,
          ];
        }),
      );
    });
  }, []);

  return (
    <section className="map">
      <div id="map_komp">
        <YMaps>
          <Map state={mapData} width={1180} height={500} modules={['package.full']}>
            <Clusterer
              options={{
                preset: 'islands#invertedVioletClusterIcons',
                groupByCoordinates: false,
                clusterDisableClickZoom: true,
                clusterHideIconOnBalloonOpen: true,
                geoObjectHideIconOnBalloonOpen: true,
                hasBalloon: true,
              }}>
              {marks &&
                marks.map((mark, index) => (
                  <Placemark
                    key={index}
                    geometry={mark[0]}
                    modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
                    properties={getPointData(index)}
                    options={getPointOptions()}
                  />
                ))}
            </Clusterer>
          </Map>
        </YMaps>
      </div>
      {/* МОБИЛЬНЫЙ ДИЗАЙН */}
      <div id="map_adaptiv">
        <div style={{width:'100%'}}>
        <YMaps>
          <Map state={mapData} width={'auto'} height={300} modules={['package.full']}>
            <Clusterer
              options={{
                preset: 'islands#invertedVioletClusterIcons',
                groupByCoordinates: false,
                clusterDisableClickZoom: true,
                clusterHideIconOnBalloonOpen: true,
                geoObjectHideIconOnBalloonOpen: true,
                hasBalloon: true,
              }}>
              {marks &&
                marks.map((mark, index) => (
                  <Placemark
                    key={index}
                    geometry={mark[0]}
                    modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
                    properties={getPointData(index)}
                    options={getPointOptions()}
                  />
                ))}
            </Clusterer>
          </Map>
        </YMaps>
        </div>
      </div>
    </section>
  );
};

export default MapBlock;
