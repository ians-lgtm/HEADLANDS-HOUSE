import React, { useState } from 'react';
import type { GuestHouseDetails } from '../types';
import Modal from './Modal';

interface AdminPanelProps {
  details: GuestHouseDetails;
  onSave: (details: GuestHouseDetails) => void;
  onClose: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ details, onSave, onClose }) => {
  const [name, setName] = useState(details.name);
  const [logoUrl, setLogoUrl] = useState(details.logoUrl);
  const [radius, setRadius] = useState(details.nearbyRadiusKm);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ name, logoUrl, nearbyRadiusKm: radius });
  };

  return (
    <Modal title="Edit Guest House Details" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="guest-house-name" className="block text-sm font-medium text-gray-700">
            Guest House Name
          </label>
          <input
            type="text"
            id="guest-house-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-teal focus:border-brand-teal sm:text-sm"
            required
          />
        </div>
        <div>
          <label htmlFor="logo-url" className="block text-sm font-medium text-gray-700">
            Logo Image URL
          </label>
          <input
            type="url"
            id="logo-url"
            value={logoUrl}
            onChange={(e) => setLogoUrl(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-teal focus:border-brand-teal sm:text-sm"
            placeholder="https://example.com/logo.png"
          />
        </div>
        <div>
          <label htmlFor="nearby-radius" className="block text-sm font-medium text-gray-700">
            "Nearby" Radius (km)
          </label>
          <input
            type="number"
            id="nearby-radius"
            value={radius}
            onChange={(e) => setRadius(Number(e.target.value) || 0)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-teal focus:border-brand-teal sm:text-sm"
            required
            step="0.5"
            min="0"
          />
        </div>
        <div className="flex justify-end pt-2 space-x-2">
            <button
                type="button"
                onClick={onClose}
                className="bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
            >
                Cancel
            </button>
            <button
                type="submit"
                className="bg-brand-teal text-white font-bold py-2 px-4 rounded-lg hover:bg-opacity-90 transition-colors"
            >
                Save Changes
            </button>
        </div>
      </form>
    </Modal>
  );
};

export default AdminPanel;