import React from 'react';
import { CloseIcon } from './icons/Icons';

interface ModalProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ title, onClose, children }) => {
  return (
    <div 
        className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center p-4"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
    >
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 id="modal-title" className="text-xl font-bold text-brand-blue">{title}</h2>
          <button 
            onClick={onClose} 
            className="p-1 rounded-full hover:bg-gray-200"
            aria-label="Close modal"
          >
            <CloseIcon className="w-6 h-6 text-gray-600" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
