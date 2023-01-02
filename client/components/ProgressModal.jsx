import React from 'react';
import ProgressBars from './ProgressBars.jsx';

// TODO - move styling into separate style sheet
const ProgressModal = ({ colorProgress, handleCloseProgress }) => {
  return (
    <div className='modal' id='progress-modal'>
      <ProgressBars colorProgress={colorProgress} />
      <i
        className="bi bi-x-lg"
        style={{ position: 'absolute', top: '5%', right: '5%' }}
        onClick={handleCloseProgress}
      ></i>

    </div>
  )
};

export default ProgressModal;