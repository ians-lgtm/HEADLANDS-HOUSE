import type { Coordinates } from '../types';

/**
 * Calculates the distance between two coordinates in kilometers using the Haversine formula.
 * @param coords1 - The first set of coordinates.
 * @param coords2 - The second set of coordinates.
 * @returns The distance in kilometers.
 */
export function calculateDistance(coords1: Coordinates, coords2: Coordinates): number {
  const R = 6371; // Radius of the Earth in km
  const dLat = (coords2.latitude - coords1.latitude) * (Math.PI / 180);
  const dLon = (coords2.longitude - coords1.longitude) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(coords1.latitude * (Math.PI / 180)) *
    Math.cos(coords2.latitude * (Math.PI / 180)) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance;
}
