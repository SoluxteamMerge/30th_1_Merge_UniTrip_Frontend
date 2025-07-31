// src/components/AlertModal/AlertModal.tsx

import React from 'react';
import './AlertModal.css';
import closeIcon from '../../assets/close.svg';

interface AlertModalProps {
  message: React.ReactNode;
  onClose: () => void;
  onConfirm?: () => void;
}

const AlertModal: React.FC<AlertModalProps> = ({ message, onClose, onConfirm }) => {
  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    } else {
      onClose();
    }
  };

  return (
    <div className="alert-overlay" onClick={onClose}>
      <div className="alert-box" onClick={(e) => e.stopPropagation()}>
        <button className="alert-close-button" onClick={onClose}>
          <img src={closeIcon} alt="닫기" />
        </button>
        <div style={{ color: 'black', textAlign: 'center' }}>{message}</div>
        <button className="alert-ok-btn" onClick={handleConfirm}>확인</button>
      </div>
    </div>
  );
};

export default AlertModal;
