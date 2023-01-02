import React from 'react';
import ProgressBar from './ProgressBar.jsx';

const ProgressBars = ({ colorProgress }) => {
  const progressBars = colorProgress.map(({code, progress}) => {
    if (0 < progress && progress < 100) {
      return <ProgressBar key={code} color={code} progress={progress} mini/>
    }
  });
  
  return <div id='progress-container'>{progressBars}</div>;
};

export default ProgressBars;