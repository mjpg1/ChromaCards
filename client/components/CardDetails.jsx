import React from 'react';

const CardDetails = ({ color, gray }) => {
  const style = {
    width: '350px',
    // boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px',
    boxShadow: 'rgba(0, 0, 0, 0.15) 0px 15px 25px, rgba(0, 0, 0, 0.05) 0px 5px 10px',
    borderRadius: '1.2em',
    zIndex: '1',
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  }

  const type = gray ? 'gray' : 'color';

  return <img src={`client/assets/${type}-cards/${color}.png`} style={style} />;
};

export default CardDetails;