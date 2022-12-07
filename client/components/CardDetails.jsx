import React from 'react';
import ProgressBar from './ProgressBar.jsx';

const CardDetails = ({ color, gray }) => {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '15px',
    zIndex: '1',
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  }

  const cardStyle = {
    width: '350px',
    boxShadow: 'rgba(0, 0, 0, 0.15) 0px 15px 25px, rgba(0, 0, 0, 0.05) 0px 5px 10px',
    borderRadius: '1.2em',
  }

  const type = gray ? 'gray' : 'color';

  return (
    <div style={containerStyle}>
      <img src={`client/assets/${type}-cards/${color}.png`} style={cardStyle} />
      <ProgressBar color={color} progress={50} /> {/* PROGRESS PROP HARD CODED RN */}
    </div>
  );
};

export default CardDetails;