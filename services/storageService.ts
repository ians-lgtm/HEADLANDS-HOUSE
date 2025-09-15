import type { Attraction, GuestHouseDetails } from '../types';

const ATTRACTIONS_KEY = 'knysnaGuestGuide_attractions';
const GUEST_HOUSE_DETAILS_KEY = 'knysnaGuestGuide_details';

export function saveAttractions(attractions: Attraction[]): void {
  try {
    localStorage.setItem(ATTRACTIONS_KEY, JSON.stringify(attractions));
  } catch (error) {
    console.error("Could not save attractions to local storage", error);
  }
}

export function getAttractions(): Attraction[] | null {
  try {
    const storedAttractions = localStorage.getItem(ATTRACTIONS_KEY);
    return storedAttractions ? JSON.parse(storedAttractions) : null;
  } catch (error) {
    console.error("Could not retrieve attractions from local storage", error);
    return null;
  }
}

export function saveGuestHouseDetails(details: GuestHouseDetails): void {
  try {
    localStorage.setItem(GUEST_HOUSE_DETAILS_KEY, JSON.stringify(details));
  } catch (error) {
    console.error("Could not save guest house details to local storage", error);
  }
}

export function getGuestHouseDetails(): GuestHouseDetails | null {
  try {
    const storedDetails = localStorage.getItem(GUEST_HOUSE_DETAILS_KEY);
    return storedDetails ? JSON.parse(storedDetails) : null;
  } catch (error) {
    console.error("Could not retrieve guest house details from local storage", error);
    return null;
  }
}
