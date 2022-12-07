import React from 'react';

const ProgressBar = ({ color, progress }) => {
  const outlineStyle = {
    width: '400px',
    height: '15px',
    border: '2px solid black'
  };

  const fillStyle = {
    backgroundColor: color,
    height: '15px',
    width: `${progress}%`
  }

  return (
    <div style={outlineStyle}>
      <div style={fillStyle}></div>
    </div>
  )
};

export default ProgressBar;