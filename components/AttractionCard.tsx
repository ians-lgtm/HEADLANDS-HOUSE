import React from 'react';
import type { Attraction } from '../types';
import { MapPinIcon, PhoneIcon, EditIcon, TrashIcon } from './icons/Icons';

interface AttractionCardProps {
  attraction: Attraction;
  isAdminMode: boolean;
  onEdit: () => void;
  onDelete: () => void;
}

const AttractionCard: React.FC<AttractionCardProps> = ({ attraction, isAdminMode, onEdit, onDelete }) => {
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${attraction.coordinates.latitude},${attraction.coordinates.longitude}`;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-[1.02] transition-transform duration-300 flex flex-col relative">
      {isAdminMode && (
        <div className="absolute top-2 right-2 z-10 flex space-x-2">
            <button onClick={onEdit} className="bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-white" aria-label="Edit"><EditIcon className="w-4 h-4 text-brand-blue" /></button>
            <button onClick={onDelete} className="bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-white" aria-label="Delete"><TrashIcon className="w-4 h-4 text-red-600" /></button>
        </div>
      )}
      <img className="w-full h-48 object-cover" src={attraction.photoUrl} alt={attraction.name} onError={(e) => e.currentTarget.src = 'https://picsum.photos/seed/placeholder/800/600'} />
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-brand-blue mb-2">{attraction.name}</h3>
        <p className="text-gray-600 text-sm mb-4 flex-grow">{attraction.description}</p>
        
        <div className="space-y-2 text-sm text-gray-700 mb-4">
            <div className="flex items-start">
                <MapPinIcon className="w-4 h-4 mr-2 mt-1 flex-shrink-0" />
                <span>{attraction.address}</span>
            </div>
            {attraction.phone && (
                <div className="flex items-center">
                    <PhoneIcon className="w-4 h-4 mr-2" />
                    <a href={`tel:${attraction.phone}`} className="hover:text-brand-teal">{attraction.phone}</a>
                </div>
            )}
        </div>

        <div className="mt-auto grid grid-cols-2 gap-3 text-sm">
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="col-span-1 w-full bg-brand-blue text-white font-semibold py-2 px-4 rounded-lg text-center hover:bg-opacity-90 transition-colors"
          >
            Directions
          </a>
          {attraction.bookingLink ? (
             <a
             href={attraction.bookingLink}
             target="_blank"
             rel="noopener noreferrer"
             className="col-span-1 w-full bg-brand-teal text-white font-semibold py-2 px-4 rounded-lg text-center hover:bg-opacity-90 transition-colors"
           >
             Book Now
           </a>
          ) : (
            <div className="col-span-1 w-full bg-gray-200 text-gray-500 font-semibold py-2 px-4 rounded-lg text-center cursor-not-allowed">
              Booking N/A
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AttractionCard;