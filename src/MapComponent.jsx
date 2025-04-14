import { useRef, useEffect, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import './Sidebar.css';
import { addLocation } from './locationAPI';

export default function MapComponent() {
  const mapRef = useRef(null);
  const mapContainer = useRef(null);

  const [locationName, setLocationName] = useState('');
  const [description, setDescription] = useState('');
  const [coordinates, setCoordinates] = useState(null);

  useEffect(() => {
    mapRef.current = new maplibregl.Map({
      container: mapContainer.current,
      style: 'https://api.maptiler.com/maps/streets-v2/style.json?key=sk5HXVaQ4ooe5hWdv8aV',
      center: [77.5946, 12.9716],
      zoom: 5,
    });

    mapRef.current.on('click', (e) => {
      const { lng, lat } = e.lngLat;
      setCoordinates({ lng, lat });

      new maplibregl.Marker()
        .setLngLat([lng, lat])
        .addTo(mapRef.current);
    });

    return () => mapRef.current.remove();
  }, []);

  const handleSubmit = async () => {
    if (!locationName || !description || !coordinates) {
      alert('Please fill in all fields and click on the map to set coordinates!');
      return;
    }

    const newLocation = {
      name: locationName,
      description,
      coordinates,
    };

    const result = await addLocation(newLocation);
    if (result) {
      alert('Location added!');
      setLocationName('');
      setDescription('');
      setCoordinates(null);
    } else {
      alert('Something went wrong!');
    }
  };

  return (
    <>
      <div style={{
        position: 'absolute',
        top: 10,
        left: 10,
        background: 'white',
        padding: '12px',
        borderRadius: '8px',
        zIndex: 999
      }}>
        <input
          type="text"
          placeholder="Location Name"
          value={locationName}
          onChange={(e) => setLocationName(e.target.value)}
          style={{ marginBottom: '8px', display: 'block', width: '200px', padding: '6px' }}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ marginBottom: '8px', display: 'block', width: '200px', padding: '6px' }}
        />
        <button onClick={handleSubmit} style={{ padding: '8px 12px' }}>
          Submit Location
        </button>
        <div style={{ fontSize: '12px', marginTop: '6px' }}>
          {coordinates ? `Coords: ${coordinates.lat.toFixed(4)}, ${coordinates.lng.toFixed(4)}` : 'Click on map to select location'}
        </div>
      </div>

      <div ref={mapContainer} style={{ width: '100vw', height: '100vh' }} />
    </>
  );
}


// import { useRef, useEffect } from 'react';
// import maplibregl from 'maplibre-gl';
// import 'maplibre-gl/dist/maplibre-gl.css';

// export default function MapComponent() {
//   const mapContainer = useRef(null);

//   useEffect(() => {
//     const map = new maplibregl.Map({
//         container: mapContainer.current,
//         style: 'https://demotiles.maplibre.org/style.json',
//         center: [33.6387648205994,46.0779767847853],
//         zoom: 9.5,
//       });

//     return () => map.remove(); // clean up
//   }, []);

//   return (
//     <div
//       ref={mapContainer}
//       style={{ height: '100vh', width: '100%' }}
//     />
//   );
// }

//     // if (!mapContainer.current) return;

//     // const map = new maplibregl.Map({
//     //   container: mapContainer.current,
//     //   style: 'https://api.maptiler.com/maps/streets/style.json?key=sk5HXVaQ4ooe5hWdv8aV',
//     //   center: [13.388, 52.517],
//     //   zoom: 9.5,
//     // });