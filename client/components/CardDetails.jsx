import React from 'react';
import ProgressBar from './ProgressBar.jsx';

const CardDetails = ({ colorDetails }) => {
  const type = colorDetails.progress < 100 ? 'gray' : 'color';

  return (
    <div className="card-details-container">
      <img
        src={
          require(`../assets/${type}-cards/${colorDetails.color}.png`).default
        }
        className="card-detailed"
      />
      {colorDetails.progress < 100 && (
        <ProgressBar
          color={colorDetails.code}
          progress={colorDetails.progress}
        />
      )}
    </div>
  );
};

export default CardDetails;
