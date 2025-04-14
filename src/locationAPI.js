const BASE_URL = 'http://localhost:5000/api/locations'; // change if hosted

// GET all locations
export const fetchLocations = async () => {
  try {
    const response = await fetch(BASE_URL);
    return await response.json();
  } catch (error) {
    console.error('Error fetching locations:', error);
    return [];
  }
};

// POST a new location
export const addLocation = async (locationData) => {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(locationData),
    });

    if (!response.ok) {
      throw new Error('Failed to add location');
    }

    return await response.json();
  } catch (error) {
    console.error('Error adding location:', error);
    return null;
  }
};
