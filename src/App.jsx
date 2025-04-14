import MapComponent from './MapComponent';
import MapWithSearch from './Nominatim';
function App() {
  return (
    <div className="App">
      {/* <MapComponent /> */}
      <MapWithSearch />
    </div>
  );
}

export default App;

// function App() {
//   return (
//     <div className="App">
//       <MapWithSearch />
//     </div>
//   );
// }

// export default App;

// import { useEffect, useRef } from 'react';
// import maplibregl from 'maplibre-gl';
// import 'maplibre-gl/dist/maplibre-gl.css';

// function App() {
//   const mapRef = useRef(null);

//   useEffect(() => {
//     const map = new maplibregl.Map({
//       container: mapRef.current,
//       style: 'https://demotiles.maplibre.org/style.json', // ✅ this one works
//       center: [33.6387648205994,46.0779767847853],
//       zoom: 9.5,
//     });

//     return () => map.remove();
//   }, []);

//   return (
//     <div
//       ref={mapRef}
//       style={{ width: '100%', height: '100vh', backgroundColor: 'hotpink' }}
//     />
//   );
// }

// export default App;
