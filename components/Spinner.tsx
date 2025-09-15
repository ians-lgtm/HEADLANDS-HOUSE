
import React from 'react';

const Spinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-brand-teal"></div>
      <p className="mt-4 text-brand-blue font-semibold">Discovering Knysna for you...</p>
    </div>
  );
};

export default Spinner;
