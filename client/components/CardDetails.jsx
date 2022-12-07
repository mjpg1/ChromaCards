import React from 'react';
import ProgressBar from './ProgressBar.jsx';

const CardDetails = ({ colorDetails }) => {
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

  const type = colorDetails.progress < 100 ? 'gray' : 'color';

  return (
    <div style={containerStyle}>
      <img src={`client/assets/${type}-cards/${colorDetails.color}.png`} style={cardStyle} />
      <ProgressBar color={colorDetails.code} progress={colorDetails.progress} />
    </div>
  );
};

export default CardDetails;