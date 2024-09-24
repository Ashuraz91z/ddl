import React from 'react';
import HomeClient from '../components/HomeClient';
import axios from 'axios';

const HomePage = async () => {
  const initialLampadaires = await fetchLampadaires();
  return <HomeClient initialLampadaires={initialLampadaires} />;
};

async function fetchLampadaires() {
  try {
    const response = await axios.get(
      'https://maps2.dcgis.dc.gov/dcgis/rest/services/DCGIS_DATA/Transportation_Signs_Signals_Lights_WebMercator/MapServer/90/query',
      {
        params: {
          where: '1=1',
          outFields: '*',
          outSR: 4326,
          f: 'json',
        },
      }
    );

    const lampadairesData = response.data.features.map(feature => ({
      ...feature,
      active: false,
    }));

    return lampadairesData;
  } catch (error) {
    console.error('Erreur lors de la récupération des lampadaires:', error);
    return [];
  }
}

export default HomePage;