// src/app/api/route/route.js
import axios from 'axios';
import polyline from 'polyline-encoded';

export async function POST(request) {
  try {
    const { start, end } = await request.json();

    if (!start || !end) {
      return new Response(JSON.stringify({ error: 'Positions de départ et d\'arrivée requises' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    const response = await axios.get('https://router.hereapi.com/v8/routes', {
      params: {
        transportMode: 'pedestrian',
        origin: `${start.lat},${start.lng}`,
        destination: `${end.lat},${end.lng}`,
        return: 'polyline',
        apiKey: process.env.NEXT_PUBLIC_HERE_API_KEY,
      },
    });

    if (response.data.routes.length === 0) {
      return new Response(JSON.stringify({ error: 'Aucune route trouvée' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
    }

    const routeData = response.data.routes[0];
    const decodedRoute = polyline.decode(routeData.sections[0].polyline);
    const formattedRoute = decodedRoute.map(coord => [coord[0], coord[1]]);
    return new Response(JSON.stringify({ route: formattedRoute }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    console.error('Erreur lors de la récupération de la route:', error);
    return new Response(JSON.stringify({ error: 'Erreur du serveur' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}