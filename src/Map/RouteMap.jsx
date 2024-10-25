import React, { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const RouteMap = ({ 
  startCoords = { lat: 23.7270, lng: 90.3929 }, // Dhaka
  endCoords = { lat: 24.9048, lng: 91.8600 }    // Sylhet
}) => {
  const [routeInfo, setRouteInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Initialize map when component mounts
    const map = L.map('map').setView([startCoords.lat, startCoords.lng], 8);
    
    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Add markers for start and end points
    // L.marker([startCoords.lat, startCoords.lng]).addTo(map)
    //   .bindPopup("Start Location");
    // L.marker([endCoords.lat, endCoords.lng]).addTo(map)
    //   .bindPopup("End Location");
        // Custom icons for start and end points
        const startIcon = L.icon({
          iconUrl: icon,
          shadowUrl: iconShadow,
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41]
        });

      L.marker([startCoords.lat, startCoords.lng], { icon: startIcon })
      .addTo(map)
      .bindPopup("<b>Start:</b> Dhaka")
      .openPopup();

    L.marker([endCoords.lat, endCoords.lng], { icon: startIcon })
      .addTo(map)
      .bindPopup("<b>End:</b> Sylhet");

    // Fetch route from OSRM
    const fetchRoute = async () => {
      try {
        const response = await fetch(
          "https://router.project-osrm.org/route/v1/bycycle/${startCoords.lng},${startCoords.lat};${endCoords.lng},${endCoords.lat}?overview=full&geometries=polyline"
        );
        const data = await response.json();

        if (data.routes && data.routes.length > 0) {
          const route = data.routes[0];
          // Decode the polyline
          const routeCoords = decodePolyline(route.geometry);
          
          // Draw the route
          const polyline = L.polyline(routeCoords, {
            color: '#0066CC',
            weight: 5,
            opacity: 0.7
          }).addTo(map);

          // Set route information
          setRouteInfo({
            distance: (route.distance / 1000).toFixed(1),
            duration: Math.round(route.duration / 60)
          });

          // Fit map bounds to show entire route
          map.fitBounds(polyline.getBounds(), { padding: [50, 50] });
        }
      } catch (err) {
        setError("Failed to load route information");
        console.error("Error fetching route:", err);
      }
    };

    fetchRoute();

    // Cleanup function to remove map when component unmounts
    return () => {
      map.remove();
    };
  }, [startCoords, endCoords]); // Re-run when coordinates change

  return (
    <div className="route-map-container">
      <div className="info-card">
        <div className="route-info">
          <span className="title">Route Information</span>
          {/* {routeInfo && (
            <div className="stats">
              <span>Distance: {routeInfo.distance} km</span>
              <span>Duration: {routeInfo.duration} minutes</span>
            </div>
          )} */}
        </div>
        {/* {error && (
          <div className="error">{error}</div>
        )} */}
      </div>
      <div id="map" className="map-container" />

      <style jsx>{`
        .route-map-container {
          width: 100%;
          max-width: 1200px;
          margin: 20px auto;
          padding: 0 20px;
        }
        .info-card {
          background: white;
          border-radius: 8px;
          padding: 15px;
          margin-bottom: 20px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .route-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .title {
          font-size: 1.2rem;
          font-weight: bold;
        }
        .stats {
          display: flex;
          gap: 20px;
        }
        .error {
          color: red;
          margin-top: 10px;
        }
        .map-container {
          height: 500px;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
      `}</style>
    </div>
  );
};

// Polyline decoder helper function
function decodePolyline(str, precision = 5) {
  let index = 0,
      lat = 0,
      lng = 0,
      coordinates = [],
      shift = 0,
      result = 0,
      byte = null,
      factor = Math.pow(10, precision);

  while (index < str.length) {
    byte = null;
    shift = 0;
    result = 0;

    do {
      byte = str.charCodeAt(index++) - 63;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20);

    let latitude_change = ((result & 1) ? ~(result >> 1) : (result >> 1));
    shift = result = 0;

    do {
      byte = str.charCodeAt(index++) - 63;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20);

    let longitude_change = ((result & 1) ? ~(result >> 1) : (result >> 1));

    lat += latitude_change;
    lng += longitude_change;

    coordinates.push([lat / factor, lng / factor]);
  }

  return coordinates;
}

export default RouteMap;