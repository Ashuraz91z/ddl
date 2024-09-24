import axios from 'axios';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get('address');

  if (!address) {
    return new Response(JSON.stringify({ error: 'Adresse requise' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }

  try {
    const response = await axios.get('https://geocode.search.hereapi.com/v1/geocode', {
      params: {
        q: address,
        apiKey: process.env.NEXT_PUBLIC_HERE_API_KEY,
      },
    });

    if (response.data.items.length === 0) {
      return new Response(JSON.stringify({ error: 'Aucun résultat trouvé' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
    }

    const location = response.data.items[0].position;
    return new Response(JSON.stringify(location), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    console.error('Erreur de géocodage:', error);
    return new Response(JSON.stringify({ error: 'Erreur du serveur' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}