#!/usr/bin/env node
/*
 * One-time helper to get a Spotify refresh token with `user-top-read` scope.
 *
 * Usage:
 *   SPOTIFY_CLIENT_ID=xxx SPOTIFY_CLIENT_SECRET=yyy node scripts/get-spotify-refresh-token.js
 *
 * Before running: in your Spotify Developer Dashboard app settings, add
 * "http://127.0.0.1:8888/callback" as a Redirect URI.
 */
const http = require('http');
const { exec } = require('child_process');

const PORT = 8888;
const REDIRECT_URI = `http://127.0.0.1:${PORT}/callback`;
const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } = process.env;

if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET) {
  console.error('Set SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET env vars before running this script.');
  process.exit(1);
}

const authUrl = `https://accounts.spotify.com/authorize?${new URLSearchParams({
  client_id: SPOTIFY_CLIENT_ID,
  response_type: 'code',
  redirect_uri: REDIRECT_URI,
  scope: 'user-top-read',
})}`;

const server = http.createServer(async (req, res) => {
  if (!req.url.startsWith('/callback')) {
    res.writeHead(404);
    res.end();
    return;
  }

  const code = new URL(req.url, REDIRECT_URI).searchParams.get('code');
  if (!code) {
    res.writeHead(400);
    res.end('Missing authorization code.');
    return;
  }

  try {
    const basic = Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64');
    const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${basic}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: REDIRECT_URI,
      }),
    });
    const data = await tokenRes.json();

    if (data.refresh_token) {
      console.log('\nSuccess! Add this to .env.local:\n');
      console.log(`SPOTIFY_REFRESH_TOKEN=${data.refresh_token}\n`);
      res.end('Done — check your terminal. You can close this tab.');
    } else {
      console.error('No refresh_token in response:', data);
      res.end('Something went wrong — check your terminal.');
    }
  } catch (err) {
    console.error(err);
    res.end('Something went wrong — check your terminal.');
  } finally {
    server.close();
    process.exit(0);
  }
});

server.listen(PORT, () => {
  console.log(`Opening browser for Spotify authorization...\nIf it doesn't open, visit:\n${authUrl}\n`);
  exec(`open "${authUrl}"`);
});
