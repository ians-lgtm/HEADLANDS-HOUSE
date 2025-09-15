
import React, { useState, useEffect, useMemo } from 'react';
import { Attraction, AppState, GuestHouseDetails, AdminModalState, FilterType, Category } from './types';
import { fetchKnysnaAttractions } from './services/geminiService';
import { getAttractions, saveAttractions, getGuestHouseDetails, saveGuestHouseDetails } from './services/storageService';
import { calculateDistance } from './utils/location';
import Header from './components/Header';
import FilterButtons from './components/FilterButtons';
import AttractionList from './components/AttractionList';
import Spinner from './components/Spinner';
import ErrorDisplay from './components/ErrorDisplay';
import AdminPanel from './components/AdminPanel';
import AttractionFormModal from './components/AttractionFormModal';

const HEADLANDS_HOUSE_COORDS = { latitude: -34.078222, longitude: 23.064778 };

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.LOADING);
  const [attractions, setAttractions] = useState<Attraction[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<FilterType | null>(null);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [guestHouseDetails, setGuestHouseDetails] = useState<GuestHouseDetails>({ name: 'Knysna Guest Guide', logoUrl: '', nearbyRadiusKm: 2 });
  const [adminModalState, setAdminModalState] = useState<AdminModalState>({ view: 'NONE' });

  const loadInitialData = async () => {
    try {
      setAppState(AppState.LOADING);
      const savedDetails = getGuestHouseDetails();
      if (savedDetails) {
        // Provide a default radius if it's missing from storage for backward compatibility
        setGuestHouseDetails({ nearbyRadiusKm: 2, ...savedDetails });
      }

      const savedAttractions = getAttractions();
      if (savedAttractions && savedAttractions.length > 0) {
        setAttractions(savedAttractions);
      } else {
        const fetchedData = await fetchKnysnaAttractions();
        setAttractions(fetchedData);
        saveAttractions(fetchedData);
      }
      setAppState(AppState.READY);
    } catch (err) {
      console.error(err);
      setError('Sorry, we couldn\'t fetch local attractions at the moment. Please try again later.');
      setAppState(AppState.ERROR);
    }
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  const handleSaveGuestHouseDetails = (details: GuestHouseDetails) => {
    setGuestHouseDetails(details);
    saveGuestHouseDetails(details);
    setAdminModalState({ view: 'NONE' });
  };

  const handleSaveAttraction = (attractionToSave: Attraction) => {
    const existingIndex = attractions.findIndex(a => a.id === attractionToSave.id);
    let updatedAttractions;
    if (existingIndex > -1) {
      updatedAttractions = [...attractions];
      updatedAttractions[existingIndex] = attractionToSave;
    } else {
      updatedAttractions = [...attractions, attractionToSave];
    }
    setAttractions(updatedAttractions);
    saveAttractions(updatedAttractions);
    setAdminModalState({ view: 'NONE' });
  };
  
  const handleDeleteAttraction = (id: string) => {
    if (window.confirm('Are you sure you want to delete this attraction?')) {
        const updatedAttractions = attractions.filter(a => a.id !== id);
        setAttractions(updatedAttractions);
        saveAttractions(updatedAttractions);
    }
  };

  const filteredAttractions = useMemo(() => {
    if (!activeFilter) return [];

    switch (activeFilter) {
      case FilterType.RESTAURANTS_NEAR_HEADLANDS:
        return attractions.filter(attr => 
            attr.category === Category.RESTAURANTS &&
            attr.subCategory === 'Near Headlands House'
        );
      case FilterType.ATTRACTIONS_NEAR_HEADLANDS:
        return attractions.filter(attr => 
            attr.category === Category.ATTRACTIONS &&
            calculateDistance(HEADLANDS_HOUSE_COORDS, attr.coordinates) <= guestHouseDetails.nearbyRadiusKm
        );
      case FilterType.RESTAURANTS_WATERFRONT:
        return attractions.filter(attr => attr.subCategory === 'Knysna Waterfront');
      case FilterType.RESTAURANTS_THESEN_ISLAND:
        return attractions.filter(attr => attr.subCategory === 'Thesen Island');
      case FilterType.RESTAURANTS_OUTSIDE:
        return attractions.filter(attr => attr.subCategory === 'Outside Knysna');
      case FilterType.ATTRACTIONS_KNYSNA:
        return attractions.filter(attr => attr.subCategory === 'In Knysna' || attr.subCategory === 'Outskirts');
      default:
        return [];
    }
  }, [attractions, activeFilter, guestHouseDetails.nearbyRadiusKm]);

  const renderContent = () => {
    switch (appState) {
      case AppState.LOADING:
        return <Spinner />;
      case AppState.ERROR:
        return <ErrorDisplay message={error || 'An unknown error occurred.'} onRetry={loadInitialData} />;
      case AppState.READY:
        return (
          <>
            <FilterButtons activeFilter={activeFilter} setFilter={setActiveFilter} />
            
            {activeFilter ? (
              <AttractionList
                attractions={filteredAttractions}
                isAdminMode={isAdminMode}
                onAddAttraction={() => setAdminModalState({ view: 'ATTRACTION_FORM' })}
                onEditAttraction={(attraction) => setAdminModalState({ view: 'ATTRACTION_FORM', attraction })}
                onDeleteAttraction={handleDeleteAttraction}
              />
            ) : (
                <div className="text-center py-10 px-4">
                    <h2 className="text-xl font-semibold text-brand-blue">Welcome!</h2>
                    <p className="text-gray-600 mt-2">Please select a category above to start exploring Knysna.</p>
                </div>
            )}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-brand-light font-sans text-brand-blue">
      <Header
        guestHouseDetails={guestHouseDetails}
        isAdminMode={isAdminMode}
        onToggleAdminMode={() => setIsAdminMode(!isAdminMode)}
        onOpenAdminPanel={() => setAdminModalState({ view: 'GUEST_HOUSE_DETAILS' })}
      />
      <main className="pb-8">
        {renderContent()}
      </main>

      {adminModalState.view === 'GUEST_HOUSE_DETAILS' && (
        <AdminPanel
          details={guestHouseDetails}
          onSave={handleSaveGuestHouseDetails}
          onClose={() => setAdminModalState({ view: 'NONE' })}
        />
      )}

      {adminModalState.view === 'ATTRACTION_FORM' && (
         <AttractionFormModal
            attraction={adminModalState.attraction}
            onSave={handleSaveAttraction}
            onClose={() => setAdminModalState({ view: 'NONE' })}
            nearbyRadiusKm={guestHouseDetails.nearbyRadiusKm}
         />
      )}
    </div>
  );
};

export default App;
