// src/components/AlertModal/AlertModal.tsx

import React from 'react';
import './AlertModal.css';

interface AlertModalProps {
  message: React.ReactNode;
  onClose: () => void;
  onConfirm?: () => void;
}

const AlertModal: React.FC<AlertModalProps> = ({ message, onClose }) => {
  return (
    <div className="alert-overlay" onClick={onClose}>
      <div className="alert-box" onClick={(e) => e.stopPropagation()}>
        <button className="alert-close-button" onClick={onClose}>✕</button>
        <div style={{ color: 'black', textAlign: 'center' }}>{message}</div>
        <button className="alert-ok-btn" onClick={onClose}>확인</button>
      </div>
    </div>
  );
};

export default AlertModal;
