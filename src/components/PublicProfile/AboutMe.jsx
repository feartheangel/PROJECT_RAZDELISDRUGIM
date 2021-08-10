import React from 'react';

const AboutMe = ({ about }) => {
  return (
    <p>
      {about ? (
        about
      ) : (
        <span style={{ color: 'red' }}>Данный пользователь не указал информацию о себе.</span>
      )}
    </p>
  );
};

export default AboutMe;
