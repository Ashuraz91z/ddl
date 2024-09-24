// src/components/DynamicMap.jsx
'use client';

import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fonction pour générer un Data URL SVG
const createSvgIcon = (fillColor) => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20">
      <circle cx="10" cy="10" r="8" stroke="black" stroke-width="1" fill="${fillColor}" />
    </svg>
  `;
  return encodeURI(`data:image/svg+xml;base64,${btoa(svg)}`);
};

// Définir les icônes pour les lampadaires actifs et inactifs
const inactiveIcon = new L.Icon({
  iconUrl: createSvgIcon('#808080'), // Gris
  iconSize: [10, 10],
  iconAnchor: [10, 10],
  popupAnchor: [0, -10],
  className: '', // Supprimez la classe par défaut si nécessaire
});

const activeIcon = new L.Icon({
  iconUrl: createSvgIcon('#FFA500'), // Orange (ou #FFFF00 pour Jaune)
  iconSize: [10, 10],
  iconAnchor: [10, 10],
  popupAnchor: [0, -10],
  className: '',
});

const DynamicMap = ({ lampadaires, route }) => {
  return (
    <MapContainer center={[38.9072, -77.0369]} zoom={13} style={{ height: "100vh", width: "100%" }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {lampadaires.map((lampadaire) => (
        <Marker
          key={lampadaire.attributes.OBJECTID}
          position={[lampadaire.geometry.y, lampadaire.geometry.x]}
          icon={lampadaire.active ? activeIcon : inactiveIcon}
        >
          <Popup>
            Lampadaire ID: {lampadaire.attributes.OBJECTID}<br />
            {lampadaire.active ? 'Actif' : 'Inactif'}
          </Popup>
        </Marker>
      ))}
      {route && <Polyline positions={route} color="blue" />}
    </MapContainer>
  );
};

export default DynamicMap;