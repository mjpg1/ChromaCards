import React from 'react';

const ProgressBar = ({ color, progress }) => {
  const outlineStyle = {
    width: '400px',
    height: '15px',
    border: '2px solid black'
  };

  const alpha = Math.floor(256 * (progress / 100)).toString(16);
  console.log(alpha);

  const fillStyle = {
    background: `linear-gradient(90deg, ${color}1C, ${color}${alpha})`,
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