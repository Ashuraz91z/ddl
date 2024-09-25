// utils/api.js
import axios from 'axios';

export const fetchStreetLights = async () => {
  try {
    const response = await axios.get(
      'https://maps2.dcgis.dc.gov/dcgis/rest/services/DCGIS_DATA/Transportation_Signs_Signals_Lights_WebMercator/MapServer/90/query',
      {
        params: {
          where: '1=1', // Pas de condition pour récupérer tous les lampadaires
          outFields: '*',
          outSR: '4326',
          f: 'json',
        },
      }
    );

    console.log("Réponse de l'API :", response.data);

    if (response.data.features) {
      return response.data.features.map((feature) => ({
        id: feature.attributes.OBJECTID,
        latitude: feature.geometry.y,
        longitude: feature.geometry.x,
        description: feature.attributes.LIGHTTYPE_DESC,
      }));
    } else {
      console.error("Aucune donnée reçue de l'API.");
      return [];
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des lampadaires :", error);
    return [];
  }
};
