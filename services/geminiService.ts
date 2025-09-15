import { GoogleGenAI, Type } from "@google/genai";
import type { Attraction } from '../types';
import { Category } from '../types';


const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const responseSchema = {
    type: Type.ARRAY,
    items: {
      type: Type.OBJECT,
      properties: {
        name: { type: Type.STRING, description: "Name of the place." },
        description: { type: Type.STRING, description: "A brief, enticing description (2-3 sentences)." },
        category: { type: Type.STRING, enum: [Category.RESTAURANTS, Category.ATTRACTIONS], description: "The main category of the place." },
        subCategory: { 
            type: Type.STRING, 
            enum: ['Knysna Waterfront', 'Thesen Island', 'Outside Knysna', 'In Knysna', 'Outskirts', 'Near Headlands House'],
            description: "For Restaurants: 'Knysna Waterfront', 'Thesen Island', 'Outside Knysna', or 'Near Headlands House'. For Attractions: 'In Knysna' or 'Outskirts'." 
        },
        phone: { type: Type.STRING, description: "Contact phone number, if available.", nullable: true },
        address: { type: Type.STRING, description: "Full physical address." },
        bookingLink: { type: Type.STRING, description: "A direct URL for booking or reservations, if available.", nullable: true },
        photoUrl: { type: Type.STRING, description: "A placeholder image URL from `https://picsum.photos/seed/{unique_seed}/800/600` where {unique_seed} is a unique word related to the place." },
        coordinates: {
          type: Type.OBJECT,
          properties: {
            latitude: { type: Type.NUMBER, description: "Latitude coordinate." },
            longitude: { type: Type.NUMBER, description: "Longitude coordinate." }
          },
          required: ["latitude", "longitude"]
        }
      },
      required: ["name", "description", "category", "subCategory", "address", "photoUrl", "coordinates"]
    }
};

type AttractionDTO = Omit<Attraction, 'id'>;

export async function fetchKnysnaAttractions(): Promise<Attraction[]> {
  const prompt = `
    Generate a list of 12 popular local attractions for a tourist visiting Knysna, Western Cape, South Africa.
    The guest house, Headlands House, is located at latitude -34.078222, longitude 23.064778.
    Include a mix of top-rated restaurants and must-see attractions.
    For each place, provide all the required details as per the response schema.
    Specifically classify each location into a subCategory:
    - For Restaurants, use one of: 'Knysna Waterfront', 'Thesen Island', 'Outside Knysna', or 'Near Headlands House'. Use 'Near Headlands House' for restaurants within about 2km of the guest house. Distribute them realistically.
    - For Attractions, use one of: 'In Knysna', 'Outskirts'.
    Ensure descriptions are appealing to tourists.
    Generate a unique, relevant seed for each picsum.photos URL.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });

    const jsonText = response.text;
    const attractionsDTO = JSON.parse(jsonText) as AttractionDTO[];
    
    if (!Array.isArray(attractionsDTO)) {
        throw new Error("Gemini API did not return an array.");
    }

    // Add a unique ID to each attraction for state management
    const attractions: Attraction[] = attractionsDTO.map((dto, index) => ({
      ...dto,
      id: `${Date.now()}-${index}`
    }));

    return attractions;

  } catch (error) {
    console.error("Error fetching data from Gemini API:", error);
    throw new Error("Failed to fetch attraction data.");
  }
}
