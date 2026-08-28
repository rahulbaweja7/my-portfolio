const TOKEN_URL = 'https://accounts.spotify.com/api/token';
const TOP_TRACKS_URL = 'https://api.spotify.com/v1/me/top/tracks?limit=5&time_range=short_term';

async function getAccessToken() {
  const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN } = process.env;
  const basic = Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64');

  const res = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: SPOTIFY_REFRESH_TOKEN,
    }),
  });

  if (!res.ok) throw new Error(`Token refresh failed: ${res.status}`);
  const data = await res.json();
  return data.access_token;
}

export default async function handler(req, res) {
  try {
    const accessToken = await getAccessToken();
    const tracksRes = await fetch(TOP_TRACKS_URL, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!tracksRes.ok) throw new Error(`Top tracks fetch failed: ${tracksRes.status}`);
    const data = await tracksRes.json();

    const tracks = (data.items || []).map(t => ({
      name: t.name,
      artist: t.artists.map(a => a.name).join(', '),
      albumArt: t.album.images?.[2]?.url || t.album.images?.[0]?.url || null,
      url: t.external_urls.spotify,
    }));

    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
    res.status(200).json({ tracks });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
