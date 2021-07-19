import React from 'react';
import { ItemCardProfile } from '../../../components/index';
import { useSelector } from 'react-redux';
import './MyItems.css';

const MyItems = () => {
  const { subjects } = useSelector(({ userData }) => userData);

  return (
    <div className="container_profile">
      <div className="container_profile_content__myItems">
        {subjects &&
          subjects.map((subject, index) => (
            <ItemCardProfile
              key={index}
              title={subject.name_item}
              image={subject.image_1}
              id={subject.id}
            />
          ))}
      </div>
    </div>
  );
};

export default MyItems;
