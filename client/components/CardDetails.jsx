import React from 'react';
import ProgressBar from './ProgressBar.jsx';

const CardDetails = ({ colorDetails, handleCancel }) => {
  const type = colorDetails.progress < 100 ? 'gray' : 'color';

  return (
    <div className="modal-overlay" onClick={handleCancel}>
      <div className="card-details-container" onClick={e => e.stopPropagation()}>
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
    </div>
  );
};

export default CardDetails;
