import React from 'react';
import { GuestHouseDetails } from '../types';
import { SettingsIcon } from './icons/Icons';

interface HeaderProps {
    guestHouseDetails: GuestHouseDetails;
    isAdminMode: boolean;
    onToggleAdminMode: () => void;
    onOpenAdminPanel: () => void;
}

const Header: React.FC<HeaderProps> = ({ guestHouseDetails, isAdminMode, onToggleAdminMode, onOpenAdminPanel }) => {
  return (
    <header className="bg-brand-blue text-white shadow-lg sticky top-0 z-20">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            {guestHouseDetails.logoUrl && (
                <img src={guestHouseDetails.logoUrl} alt={`${guestHouseDetails.name} Logo`} className="h-10 w-10 rounded-full object-cover bg-white"/>
            )}
            <div>
                 <h1 className="text-xl sm:text-2xl font-bold tracking-tight">{guestHouseDetails.name}</h1>
                 { guestHouseDetails.name === 'Knysna Guest Guide' && <p className="text-xs sm:text-sm text-brand-sand">Your personal guide to the best of Knysna</p> }
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {isAdminMode && (
                <button
                 onClick={onOpenAdminPanel}
                 className="hidden sm:block bg-white/20 hover:bg-white/30 text-white font-semibold text-xs px-3 py-1.5 rounded-full transition-colors"
                >
                    Edit Details
                </button>
            )}
            <button
              onClick={onToggleAdminMode}
              title="Toggle Admin Mode"
              className={`p-2 rounded-full transition-colors ${isAdminMode ? 'bg-brand-teal' : 'hover:bg-white/20'}`}
              aria-label="Toggle Admin Mode"
            >
              <SettingsIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
        {isAdminMode && (
             <div className="sm:hidden mt-3">
                <button
                 onClick={onOpenAdminPanel}
                 className="w-full bg-white/20 hover:bg-white/30 text-white font-semibold text-sm py-2 rounded-lg transition-colors"
                >
                    Edit Guest House Details
                </button>
            </div>
        )}
      </div>
    </header>
  );
};

export default Header;
