
import React from 'react';

interface ErrorDisplayProps {
  message: string;
  onRetry: () => void;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message, onRetry }) => {
  return (
    <div className="text-center py-20 px-4">
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative max-w-md mx-auto" role="alert">
        <strong className="font-bold">Oops! </strong>
        <span className="block sm:inline">{message}</span>
      </div>
      <button
        onClick={onRetry}
        className="mt-6 bg-brand-teal text-white font-bold py-2 px-6 rounded-full hover:bg-opacity-90 transition-colors"
      >
        Try Again
      </button>
    </div>
  );
};

export default ErrorDisplay;
