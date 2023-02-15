import React from 'react';
import ProgressBars from './ProgressBars.jsx';

const ProgressModal = ({ colorProgress, handleCloseProgress }) => {
  return (
    <div className='modal' id='progress-modal'>
      <ProgressBars colorProgress={colorProgress} />
      <i className="bi bi-x-lg" onClick={handleCloseProgress}></i>

    </div>
  )
};

export default ProgressModal;