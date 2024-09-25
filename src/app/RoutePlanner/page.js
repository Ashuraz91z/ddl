// app/route-planner/page.js
'use client';

import { useState } from 'react';
import MapComponent from '../../components/Map';
import { useForm } from 'react-hook-form';
import { fetchRoute } from '../../utils/api';

export default function RoutePlannerPage() {
  const { register, handleSubmit } = useForm();
  const [routeData, setRouteData] = useState(null);

  const onSubmit = async (data) => {
    const startCoords = [parseFloat(data.startLng), parseFloat(data.startLat)];
    const endCoords = [parseFloat(data.endLng), parseFloat(data.endLat)];

    const route = await fetchRoute(startCoords, endCoords);

    if (route) {
      setRouteData(route);
    }
  };

  return (
    <div className="p-4 h-screen flex">
      <div className="w-1/3 p-4 bg-white shadow-md dark:bg-gray-800">
        <h2 className="text-xl font-bold mb-4">Planifier un Itinéraire</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block">Latitude de départ</label>
            <input
              type="text"
              {...register('startLat')}
              className="w-full border p-2"
              required
            />
          </div>
          <div>
            <label className="block">Longitude de départ</label>
            <input
              type="text"
              {...register('startLng')}
              className="w-full border p-2"
              required
            />
          </div>
          <div>
            <label className="block">Latitude d'arrivée</label>
            <input
              type="text"
              {...register('endLat')}
              className="w-full border p-2"
              required
            />
          </div>
          <div>
            <label className="block">Longitude d'arrivée</label>
            <input
              type="text"
              {...register('endLng')}
              className="w-full border p-2"
              required
            />
          </div>
          <button type="submit" className="bg-blue-800 text-white px-4 py-2">
            Générer l'Itinéraire
          </button>
        </form>
        {routeData && (
          <div className="mt-4">
            <h3 className="text-lg font-bold">Informations sur l'itinéraire</h3>
            <p>
              Distance :{' '}
              {(routeData.features[0].properties.summary.distance / 1000).toFixed(2)} km
            </p>
            <p>
              Durée :{' '}
              {(routeData.features[0].properties.summary.duration / 60).toFixed(2)} minutes
            </p>
          </div>
        )}
      </div>
      <div className="flex-1 ml-4">
        <MapComponent routeData={routeData} />
      </div>
    </div>
  );
}
