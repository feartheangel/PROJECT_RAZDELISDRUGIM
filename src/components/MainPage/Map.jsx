import React from 'react';
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import { useSelector } from 'react-redux';
import Requests from '../../http/axios-requests';

const MapBlock = () => {
  const { userCoordinates } = useSelector(({ search }) => search);

  //параметры карты
  const mapData = {
    center: userCoordinates ? userCoordinates.split(' ').reverse() : [53.54, 27.33],
    zoom: 12,
  };

  //координаты меток карты
  const [marks, setMarks] = React.useState([]);

  //определение координат последних вещей
  React.useEffect(() => {
    Requests.getRecentItems().then((response) => {
      setMarks(
        response.data.map((item) => {
          return item.items_coordinates.split('(')[1].split(')')[0].split(' ').reverse();
        }),
      );
    });
  }, []);

  return (
    <section className="map">
      <YMaps>
        <Map width={1180} height={500} defaultState={mapData}>
          {marks && marks.map((mark) => <Placemark geometry={mark} />)}
        </Map>
      </YMaps>
    </section>
  );
};

export default MapBlock;
