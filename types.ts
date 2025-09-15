export enum Category {
  RESTAURANTS = "Restaurants",
  ATTRACTIONS = "Attractions",
}

export enum FilterType {
    RESTAURANTS_NEAR_HEADLANDS = "Restaurants Near Headlands House",
    ATTRACTIONS_NEAR_HEADLANDS = "Attractions Near Headlands House",
    RESTAURANTS_WATERFRONT = "Restaurants in Knysna Water Front",
    RESTAURANTS_THESEN_ISLAND = "Restaurants on Thesen Island",
    RESTAURANTS_OUTSIDE = "Restaurants Outside of Knysna",
    ATTRACTIONS_KNYSNA = "Attractions In Knysna and Outskirts"
}

export enum AppState {
    LOADING,
    READY,
    ERROR
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface Attraction {
  id: string;
  name: string;
  description: string;
  category: Category;
  subCategory?: 'Knysna Waterfront' | 'Thesen Island' | 'Outside Knysna' | 'In Knysna' | 'Outskirts' | 'Near Headlands House';
  phone?: string;
  address: string;
  bookingLink?: string;
  photoUrl: string;
  coordinates: Coordinates;
}

export interface GuestHouseDetails {
  name: string;
  logoUrl: string;
  nearbyRadiusKm: number;
}

export type AdminModalState = 
  | { view: 'NONE' }
  | { view: 'GUEST_HOUSE_DETAILS' }
  | { view: 'ATTRACTION_FORM'; attraction?: Attraction };
