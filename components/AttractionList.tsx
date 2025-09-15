import React from 'react';
import type { Attraction } from '../types';
import AttractionCard from './AttractionCard';
import { PlusIcon } from './icons/Icons';

interface AttractionListProps {
  attractions: Attraction[];
  isAdminMode: boolean;
  onAddAttraction: () => void;
  onEditAttraction: (attraction: Attraction) => void;
  onDeleteAttraction: (id: string) => void;
}

const AttractionList: React.FC<AttractionListProps> = ({ attractions, isAdminMode, onAddAttraction, onEditAttraction, onDeleteAttraction }) => {

  return (
    <div className="container mx-auto px-4">
      {isAdminMode && (
        <div className="mb-6 text-center">
            <button 
              onClick={onAddAttraction}
              className="bg-brand-teal text-white font-bold py-3 px-6 rounded-full hover:bg-opacity-90 transition-colors shadow-lg flex items-center justify-center mx-auto"
            >
              <PlusIcon className="w-5 h-5 mr-2" />
              Add New Attraction
            </button>
        </div>
      )}

      {attractions.length === 0 ? (
         <p className="text-center text-gray-500 mt-8">No attractions found in this category.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {attractions.map((attraction) => (
            <AttractionCard 
              key={attraction.id} 
              attraction={attraction} 
              isAdminMode={isAdminMode}
              onEdit={() => onEditAttraction(attraction)}
              onDelete={() => onDeleteAttraction(attraction.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AttractionList;