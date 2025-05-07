// src/components/FilePreview/FilePreview.tsx
import React from 'react';
import './FilePreview.css';

interface FilePreviewProps {
  file: {
    name: string;
    type: string;
    url: string;
  } | null;
  onClose: () => void;
}

const FilePreview: React.FC<FilePreviewProps> = ({ file, onClose }) => {
  if (!file) return (
    <div className="preview-placeholder">
      <p>Select a file to preview</p>
    </div>
  );

  const renderPreview = () => {
    if (file.type.startsWith('image/')) {
      return (
        <img 
          src={file.url} 
          alt={file.name} 
          className="preview-image"
        />
      );
    } else if (file.type === 'application/pdf') {
      return (
        <iframe
          src={file.url}
          title={file.name}
          className="preview-pdf"
        />
      );
    } else if (file.type.includes('powerpoint') || file.type.includes('presentation')) {
      return (
        <div className="preview-pptx">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16 13H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16 17H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10 9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <p>PowerPoint Preview</p>
          <a href={file.url} target="_blank" rel="noopener noreferrer" className="preview-download">
            Download to View
          </a>
        </div>
      );
    }
    return <div>Preview not available</div>;
  };

  return (
    <div className="preview-container">
      <div className="preview-header">
        <h3>{file.name}</h3>
        <button className="close-btn" onClick={onClose}>×</button>
      </div>
      <div className="preview-content">
        {renderPreview()}
      </div>
    </div>
  );
};

export default FilePreview;