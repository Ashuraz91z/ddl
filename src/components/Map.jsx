// components/Map.jsx
'use client';

import { useEffect, useState } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { fetchStreetLights } from '../utils/api';
import MarkerClusterGroup from 'react-leaflet-cluster';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/lamp.png',
  iconUrl: '/lamp.png',
  shadowUrl: '/lamp.png',
});

const MapComponent = ({ itinerary }) => {
  const [streetLights, setStreetLights] = useState([]);

  useEffect(() => {
    const loadStreetLights = async () => {
      const data = await fetchStreetLights();
      setStreetLights(data);
    };

    loadStreetLights();
  }, []);

  return (
    <div className="w-full h-full">
      <MapContainer
        center={[38.9072, -77.0369]}
        zoom={13}
        className="w-full h-full"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkerClusterGroup>
          {streetLights.map((light) => (
            <Marker key={light.id} position={[light.latitude, light.longitude]}>
              <Popup>
                <div>
                  <h2>Lampadaire #{light.id}</h2>
                  <p>{light.description}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
        {itinerary && <Polyline positions={itinerary} color="blue" />}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
