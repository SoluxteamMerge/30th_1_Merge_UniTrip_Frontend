import React from 'react';
import './RouletteModal.css';

interface Props {
  onClose: () => void;
}

export default function RouletteModal({ onClose }: Props) {
  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <button className="close-btn" onClick={onClose}>✕</button>
        <h2>룰렛 모달창</h2>
        {/* 여기에 나중에 룰렛 컴포넌트 들어갈 예정 */}
      </div>
    </div>
  );
}
