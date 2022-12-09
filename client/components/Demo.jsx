import React from 'react';
import ProgressBars from './ProgressBars.jsx';

const Demo = ({ handleCloseDemo, colorProgress, handleImgClick }) => {
  return (
    <div className='modal' id='demo-modal'>
      <div id='demo-img-container'>
        <img id='demo-img' src='client/assets/demo.png' onClick={handleImgClick} />
      </div>
      <div id='demo-progress'>
        <ProgressBars colorProgress={colorProgress} />
      </div>
      <i
        className="bi bi-x-lg"
        style={{ position: 'absolute', top: '5%', right: '5%' }}
        onClick={handleCloseDemo}
      ></i>
    </div>
  )
};

export default Demo;