import React from 'react';
import { FilterType } from '../types';
import { WaterfrontIcon, IslandIcon, MountainIcon, CameraIcon, RestaurantIcon, MapPinIcon } from './icons/Icons';

interface FilterButtonsProps {
  activeFilter: FilterType | null;
  setFilter: (filter: FilterType) => void;
}

interface FilterButtonConfig {
    type: FilterType;
    icon: React.FC<{className?: string}>;
}

const filterConfig: FilterButtonConfig[] = [
    { type: FilterType.RESTAURANTS_NEAR_HEADLANDS, icon: RestaurantIcon },
    { type: FilterType.ATTRACTIONS_NEAR_HEADLANDS, icon: MapPinIcon },
    { type: FilterType.RESTAURANTS_WATERFRONT, icon: WaterfrontIcon },
    { type: FilterType.RESTAURANTS_THESEN_ISLAND, icon: IslandIcon },
    { type: FilterType.RESTAURANTS_OUTSIDE, icon: MountainIcon },
    { type: FilterType.ATTRACTIONS_KNYSNA, icon: CameraIcon },
];

const FilterButtons: React.FC<FilterButtonsProps> = ({ activeFilter, setFilter }) => {
  return (
    <div className="p-4">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 max-w-4xl mx-auto">
        {filterConfig.map(({ type, icon: Icon }) => {
            const isActive = activeFilter === type;

            return (
                <button
                    key={type}
                    onClick={() => setFilter(type)}
                    className={`
                        p-4 rounded-xl text-center font-semibold transition-all duration-300 ease-in-out
                        flex flex-col items-center justify-center space-y-2
                        transform focus:outline-none focus:ring-2 focus:ring-brand-teal focus:ring-opacity-70
                        ${isActive 
                            ? 'bg-brand-teal text-white shadow-lg scale-105' 
                            : 'bg-white text-brand-blue shadow-md hover:shadow-xl hover:scale-105'
                        }
                    `}
                    title={type}
                >
                    <Icon className="w-8 h-8" />
                    <span className="text-xs sm:text-sm">{type}</span>
                </button>
            );
        })}
      </div>
    </div>
  );
};

export default FilterButtons;