import React, { useState } from 'react';
import type { Attraction } from '../types';
import { Category } from '../types';
import Modal from './Modal';

interface AttractionFormModalProps {
  attraction?: Attraction;
  onSave: (attraction: Attraction) => void;
  onClose: () => void;
  nearbyRadiusKm: number;
}

const AttractionFormModal: React.FC<AttractionFormModalProps> = ({ attraction, onSave, onClose, nearbyRadiusKm }) => {
  const [formData, setFormData] = useState<Omit<Attraction, 'id'>>({
    name: attraction?.name || '',
    description: attraction?.description || '',
    category: attraction?.category || Category.RESTAURANTS,
    subCategory: attraction?.subCategory || undefined,
    phone: attraction?.phone || '',
    address: attraction?.address || '',
    bookingLink: attraction?.bookingLink || '',
    photoUrl: attraction?.photoUrl || '',
    coordinates: attraction?.coordinates || { latitude: 0, longitude: 0 },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCoordsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
        ...prev,
        coordinates: {
            ...prev.coordinates,
            [name]: parseFloat(value) || 0
        }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newAttraction: Attraction = {
        id: attraction?.id || `${Date.now()}-new`,
        ...formData
    };
    onSave(newAttraction);
  };
  
  const title = attraction ? 'Edit Attraction' : 'Add New Attraction';

  const restaurantSubCategories = ['Near Headlands House', 'Knysna Waterfront', 'Thesen Island', 'Outside Knysna'];
  const attractionSubCategories = ['In Knysna', 'Outskirts'];

  return (
    <Modal title={title} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Form fields */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-teal focus:ring-brand-teal sm:text-sm"/>
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea name="description" id="description" value={formData.description} onChange={handleChange} required rows={3} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-teal focus:ring-brand-teal sm:text-sm"/>
        </div>
        <div className="grid grid-cols-2 gap-4">
            <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                <select name="category" id="category" value={formData.category} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-teal focus:ring-brand-teal sm:text-sm">
                    <option value={Category.RESTAURANTS}>Restaurants</option>
                    <option value={Category.ATTRACTIONS}>Attractions</option>
                </select>
            </div>
            <div>
                <label htmlFor="subCategory" className="block text-sm font-medium text-gray-700">Sub-Category</label>
                <select name="subCategory" id="subCategory" value={formData.subCategory} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-teal focus:ring-brand-teal sm:text-sm">
                    <option value="">Select a sub-category</option>
                    {(formData.category === Category.RESTAURANTS ? restaurantSubCategories : attractionSubCategories).map(sub => (
                        <option key={sub} value={sub}>{sub}</option>
                    ))}
                </select>
            </div>
        </div>
        <div>
          <label htmlFor="photoUrl" className="block text-sm font-medium text-gray-700">Photo URL</label>
          <input type="url" name="photoUrl" id="photoUrl" value={formData.photoUrl} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-teal focus:ring-brand-teal sm:text-sm"/>
        </div>
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
          <input type="text" name="address" id="address" value={formData.address} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-teal focus:ring-brand-teal sm:text-sm"/>
        </div>
        <div className="grid grid-cols-2 gap-4">
            <div>
                <label htmlFor="latitude" className="block text-sm font-medium text-gray-700">Latitude</label>
                <input type="number" step="any" name="latitude" id="latitude" value={formData.coordinates.latitude} onChange={handleCoordsChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-teal focus:ring-brand-teal sm:text-sm"/>
            </div>
            <div>
                <label htmlFor="longitude" className="block text-sm font-medium text-gray-700">Longitude</label>
                <input type="number" step="any" name="longitude" id="longitude" value={formData.coordinates.longitude} onChange={handleCoordsChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-teal focus:ring-brand-teal sm:text-sm"/>
            </div>
        </div>

        <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
            <p>
                <strong>Note:</strong> "Nearby" attractions are determined by the {nearbyRadiusKm}km radius setting. For restaurants, please use the "Near Headlands House" sub-category to have them appear in that filter.
            </p>
        </div>
        
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone (Optional)</label>
          <input type="tel" name="phone" id="phone" value={formData.phone} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-teal focus:ring-brand-teal sm:text-sm"/>
        </div>
        <div>
          <label htmlFor="bookingLink" className="block text-sm font-medium text-gray-700">Booking Link (Optional)</label>
          <input type="url" name="bookingLink" id="bookingLink" value={formData.bookingLink} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-teal focus:ring-brand-teal sm:text-sm"/>
        </div>
        
        {/* Actions */}
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
                Save
            </button>
        </div>
      </form>
    </Modal>
  );
};

export default AttractionFormModal;
