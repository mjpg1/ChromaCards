import React from 'react';

const Modal = ({ handleCancel, children }) => {
  return (
    <div className="modal-overlay" onClick={handleCancel}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        {children}
        <i className="bi bi-x-lg" onClick={handleCancel}></i>
      </div>
    </div>
  );
};

export default Modal;