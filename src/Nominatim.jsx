import { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import { addLocation } from './locationAPI';
import 'maplibre-gl/dist/maplibre-gl.css';
import './Sidebar.css';
// import Sidebar from './css';



export default function MapWithSearch() {
  const mapRef = useRef(null);
  const mapContainer = useRef(null);
  const [query, setQuery] = useState('');
  const [selectedPlace, setSelectedPlace] = useState('');
  const [locationName, setLocationName] = useState('');
  const [description, setDescription] = useState('');
  const [clickCoords, setClickCoords] = useState(null);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(5);
  const [reviews, setReviews] = useState([]);
//   const [selectedCoords, setSelectedCoords] = useState(null);

//   const markerRef = useRef(null);
  const [selectedCoords, setSelectedCoords] = useState(null);




  useEffect(() => {
    mapRef.current = new maplibregl.Map({
      container: mapContainer.current,
      style: 'https://api.maptiler.com/maps/streets-v2/style.json?key=sk5HXVaQ4ooe5hWdv8aV',
      center: [80.2335, 26.5123],
      zoom: 15
    //   maxBounds: [
    //     [80.2200, 26.5000], // SW
    //     [80.2450, 26.5250]  // NE
    //   ]
    });

    mapRef.current.on('click', (e) => {
        const { lng, lat } = e.lngLat;
        setClickCoords({ lat, lng });
      
        new maplibregl.Marker()
          .setLngLat([lng, lat])
          .addTo(mapRef.current);
      });
      

    return () => mapRef.current.remove();
  }, []);




  const [isOpen, setIsOpen] = useState(false);
  const [markers, setMarkers] = useState([]);
  
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };
//   const Sidebar = () => {
//     const [isOpen, setIsOpen] = useState(false);
  
//     const toggleSidebar = () => {
//       setIsOpen(!isOpen);
//     };
//   }

    

    const handleAddLocation = async () => {
    if (!locationName || !description || !clickCoords) {
      alert('Fill all fields + click on map');
      return;
    }
  
    const result = await addLocation({
      name: locationName,
      description,
      coordinates: clickCoords,
      image: ''
    });
  
    if (result) {
      alert('Location added successfully!');
      setLocationName('');
      setDescription('');
      setClickCoords(null);
    } else {
      alert('Something went wrong...');
    }
  };
  

  const searchPlace = async () => {
    console.log("Search function called");
    if (!query) return;
    console.log("query:", query);

    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`
    );
    const results = await res.json();

    if (results.length === 0) {
      alert('No results found');
      return;
    }

    const { lat, lon, display_name } = results[0];

    const coordinates = [parseFloat(lon), parseFloat(lat)];
    console.log("Display Name:", display_name);
    mapRef.current.flyTo({ center: coordinates, zoom: 14 });

    setSelectedCoords({ lat, lng: lon }); // Save coords for later

    // Remove previous markers if any
    markers.forEach(marker => marker.remove());

    const newMarker = new maplibregl.Marker()
      .setLngLat(coordinates)
      .setPopup(new maplibregl.Popup().setHTML(`<div style="color:black;">${display_name}</div>`))
      .addTo(mapRef.current);
    // Update the markers state with the new marker
    setMarkers([newMarker]); // Add the new marker to the state

    // new maplibregl.Marker()
    //   .setLngLat(coordinates)
    //   .setPopup(new maplibregl.Popup().setHTML(`<div style="color:black;">${display_name}</div>`))
    //   .addTo(mapRef.current)
    //   .Popup({ closeButton: false })
    //   .togglePopup();

    setSelectedPlace(display_name);
    toggleSidebar();
    
    // Sidebar(display_name);
  };

  const submitReview = async () => {

    if (!selectedCoords) {
        alert('No location selected!');
        return;
        }
    
    const res = await fetch('http://localhost:5000/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            locationName: selectedPlace,
            coordinates: selectedCoords,
            user: 'Anonymous',
            comment: reviewText,
            rating
        })
    });


    const newReview = await res.json();
        setReviews([...reviews, newReview]);
        setReviewText('');
        setRating(5);
    };
  
  return (
    <>
      <div style={{ position: 'absolute', top: 50, left: 10, zIndex: 999, background: 'white', padding: '10px', borderRadius: '8px' }}>
        <input
          type="text"
          placeholder="Search a place..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ padding: '6px', width: '200px', marginRight: '8px' }}
        />
        <button onClick={searchPlace} style={{ padding: '6px 12px' }}>
          Search
        </button>
      </div>

      <div style={{ position: 'absolute', top: 110, left: 10, zIndex: 999, background: 'white', padding: '10px', borderRadius: '8px' }}>
        <input
            type="text"
            placeholder="New Location Name"
            value={locationName}
            onChange={(e) => setLocationName(e.target.value)}
            style={{ marginBottom: '6px', display: 'block', width: '200px', padding: '6px' }}
        />
        <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ marginBottom: '6px', display: 'block', width: '200px', padding: '6px' }}
        />
        <button onClick={handleAddLocation} style={{ padding: '6px 12px' }}>
            Add Location
        </button>
       </div>

    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
    <h2>{selectedPlace || 'No location selected'}</h2>

    {selectedPlace && (
        <>
        <textarea
            placeholder="Write your review..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            style={{ display: 'block', width: '100%', marginBottom: '8px' }}
        />
        <input
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            style={{ width: '100%', marginBottom: '8px' }}
        />
        <button onClick={submitReview} style={{ marginBottom: '12px' }}>
            Submit Review
        </button>

        <h4>Reviews:</h4>
        {reviews.length > 0 ? (
            reviews.map((r, i) => (
            <div key={i} style={{ marginBottom: '10px', borderBottom: '1px solid #ccc', paddingBottom: '6px' }}>
                <strong>⭐ {r.rating}</strong>
                <p>{r.comment}</p>
                <span style={{ fontSize: '12px', color: '#666' }}>{r.user || 'Anonymous'}</span>
            </div>
            ))
        ) : (
            <p>No reviews yet.</p>
    )}
    </>
    )}

    <button onClick={toggleSidebar} style={{ marginTop: '12px' }}>Close</button>
    </div>


        
      {/* <div>
        <button onClick={toggleSidebar}>Toggle Sidebar</button>
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
          <h2>Sidebar Content</h2>
          {selectedPlace ? <p>Your're here, {selectedPlace}</p> : null}
          <button onClick={toggleSidebar}>Close</button>
        </div>
      </div> */}

      <div
        ref={mapContainer}
        style={{ height: '100vh', width: '100vw' }}
      />
      
    </>
  );
}

