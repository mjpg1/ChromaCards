import React from 'react';

// TODO - move styling into separate style sheet
const ProgressBar = ({ color, progress, mini }) => {
  const outlineStyleBig = {
    width: '400px',
    height: '15px',
    border: '2px solid black'
  };

  const outlineStyleMini = {
    width: '90%',
    height: '15px',
    border: '1px solid black'
  };

  const alpha = Math.floor(256 * (progress / 100)).toString(16);

  const fillStyle = {
    background: `linear-gradient(90deg, ${color}50, ${color}${alpha})`,
    height: '15px',
    width: `${progress}%`,
    animation: `barGrow ${0.2 + progress / 100}s ease-in-out`,
    transformOrigin: 'left'
  }

  return (
    <div style={mini ? outlineStyleMini : outlineStyleBig}>
      <div style={fillStyle}></div>
    </div>
  )
};

export default ProgressBar;