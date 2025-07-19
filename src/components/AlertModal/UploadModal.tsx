import React from 'react';
import './UploadModal.css'; 

interface UploadModalProps {
  fileName: string;
  onConfirm: () => void;
  onClose: () => void;
}

const UploadModal: React.FC<UploadModalProps> = ({ fileName, onConfirm, onClose }) => {
  return (
    <div className="upload-overlay" onClick={onClose}>
      <div className="upload-box" onClick={(e) => e.stopPropagation()}>
        <div className="upload-header">
          <span>이미지</span>
          <button onClick={onClose}>✕</button>
        </div>
        <div className="upload-content">
          <span className="file-name">{fileName || '선택된 파일 없음'}</span>
          <button className="upload-btn" onClick={onConfirm}>확인</button>
        </div>
        <div className="upload-underline"></div>
      </div>
    </div>
  );
};

export default UploadModal;
