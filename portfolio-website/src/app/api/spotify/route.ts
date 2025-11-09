import { NextResponse } from "next/server";

const client_id = process.env.SPOTIFY_CLIENT_ID as string;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET as string;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN as string;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");

interface SpotifyTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope?: string;
}

interface SpotifyArtist {
  name: string;
}

interface SpotifyImage {
  url: string;
}

interface SpotifyTrack {
  name: string;
  artists: SpotifyArtist[];
  album: { images: SpotifyImage[] };
  external_urls: { spotify: string };
}

async function getAccessToken(): Promise<SpotifyTokenResponse> {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to refresh Spotify token");
  }

  return response.json();
}

export async function GET() {
  try {
    const { access_token } = await getAccessToken();

    const nowPlaying = await fetch(
      "https://api.spotify.com/v1/me/player/currently-playing",
      {
        headers: { Authorization: `Bearer ${access_token}` },
      }
    );

    if (nowPlaying.status === 204 || nowPlaying.status > 400) {
      const lastPlayed = await fetch(
        "https://api.spotify.com/v1/me/player/recently-played?limit=1",
        { headers: { Authorization: `Bearer ${access_token}` } }
      );

      const recent = await lastPlayed.json();
      if (!recent.items || recent.items.length === 0) {
        return NextResponse.json({ isPlaying: false });
      }

      const track: SpotifyTrack = recent.items[0].track;
      return NextResponse.json({
        isPlaying: false,
        title: track.name,
        artist: track.artists.map((a) => a.name).join(", "),
        albumImageUrl: track.album.images[0].url,
        songUrl: track.external_urls.spotify,
        lastPlayed: true,
      });
    }

    const song = await nowPlaying.json();
    return NextResponse.json({
      isPlaying: true,
      title: song.item.name,
      artist: song.item.artists.map((a: SpotifyArtist) => a.name).join(", "),
      albumImageUrl: song.item.album.images[0].url,
      songUrl: song.item.external_urls.spotify,
      lastPlayed: false,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ isPlaying: false }, { status: 500 });
  }
}
