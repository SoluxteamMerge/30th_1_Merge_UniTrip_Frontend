import React from 'react';
import './AlertModal.css';

interface AlertModalProps {
  message: string;
  onClose: () => void;
}

const AlertModal: React.FC<AlertModalProps> = ({ message, onClose }) => {
  return (
    <div className="alert-overlay" onClick={onClose}>
      <div className="alert-box" onClick={(e) => e.stopPropagation()}>
        <p style={{ color: 'black'}}>{message}</p>
        <button onClick={onClose}>확인</button>
      </div>
    </div>
  );
};

export default AlertModal;
