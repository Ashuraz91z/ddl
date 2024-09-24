// src/components/HomeClient.jsx
'use client';

import React, { useState } from 'react';
import axios from 'axios';
import MapComponent from './MapComponent';
import * as turf from '@turf/turf';

const HomeClient = ({ initialLampadaires }) => {
  const [lampadaires, setLampadaires] = useState(initialLampadaires);
  const [route, setRoute] = useState(null);
  const [startAddress, setStartAddress] = useState('');
  const [endAddress, setEndAddress] = useState('');

  const geocodeAddress = async (address) => {
    try {
      const response = await axios.get('/api/geocode', {
        params: { address },
      });
      return response.data;
    } catch (error) {
      console.error('Erreur de géocodage:', error);
      return null;
    }
  };

  const handleUserRequest = async (start, end) => {
    try {
      const response = await axios.post('/api/route', {
        start,
        end,
      });

      const formattedRoute = response.data.route;
      setRoute(formattedRoute);
      activateLampadaires(formattedRoute);
    } catch (error) {
      console.error('Erreur lors de la récupération de la route:', error);
    }
  };

  const calculateDistance = (route, point) => {
    const line = turf.lineString(route.map(coord => [coord[1], coord[0]]));
    const pt = turf.point(point);
    const distance = turf.pointToLineDistance(pt, line, { units: 'kilometers' });
    return distance;
  };

  const activateLampadaires = (route) => {
    const currentHour = new Date().getHours();
    if (currentHour >= 21 || currentHour < 6) {
      const activated = lampadaires.map((lampadaire) => {
        const distance = calculateDistance(
          route,
          [lampadaire.geometry.y, lampadaire.geometry.x]
        );
        return {
          ...lampadaire,
          active: distance < 0.0005, // ajustez le seuil selon vos besoins
        };
      });
      setLampadaires(activated);
    } else {
      const deactivated = lampadaires.map((lampadaire) => ({
        ...lampadaire,
        active: false,
      }));
      setLampadaires(deactivated);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const start = await geocodeAddress(startAddress);
    const end = await geocodeAddress(endAddress);
    if (start && end) {
      handleUserRequest(start, end);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ position: 'absolute', top: 10, left: 10, zIndex: 1000, background: 'white', padding: '10px', borderRadius: '5px' }}>
        <div>
          <label>Départ:</label>
          <input type="text" value={startAddress} onChange={(e) => setStartAddress(e.target.value)} required />
        </div>
        <div>
          <label>Arrivée:</label>
          <input type="text" value={endAddress} onChange={(e) => setEndAddress(e.target.value)} required />
        </div>
        <button type="submit">Obtenir la Route</button>
      </form>
      <MapComponent lampadaires={lampadaires} route={route} />
    </div>
  );
};

export default HomeClient;