import React from 'react';
import ProgressBar from './ProgressBar.jsx';

// const ProgressBars = ({ colorProgress, handleCloseProgress }) => {
//   const progressBars = colorProgress.map(({code, progress}) => {
//     if (0 < progress && progress < 100) {
//       return <ProgressBar key={code} color={code} progress={progress} mini/>
//     }
//   });
  
//   return (
//     <div className='modal' id='progress-modal'>
//       <div id='progress-container'>
//         {progressBars}
//       </div>
//       <i
//         className="bi bi-x-lg"
//         style={{ position: 'absolute', top: '5%', right: '5%' }}
//         onClick={handleCloseProgress}
//       ></i>

//     </div>
//   )
// };

const ProgressBars = ({ colorProgress }) => {
  const progressBars = colorProgress.map(({code, progress}) => {
    if (0 < progress && progress < 100) {
      return <ProgressBar key={code} color={code} progress={progress} mini/>
    }
  });
  
  return <div id='progress-container'>{progressBars}</div>;
};

export default ProgressBars;