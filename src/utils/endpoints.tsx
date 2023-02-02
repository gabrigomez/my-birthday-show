const clientId = process.env.REACT_APP_CLIENT_ID;  

export const TOP_TRACKS_SHORT = 'https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=16';
export const TOP_TRACKS_MEDIUM = 'https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=16';
export const TOP_TRACKS_LONG = 'https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=16';

export const AUTH_ENDPOINT = 'https://accounts.spotify.com/en/authorize';
export const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
export const REDIRECT_URI = 'http://localhost:3000/';

export const AUTH_FULL_ENDPOINT = `${AUTH_ENDPOINT}?client_id=${clientId}&response_type=code&redirect_uri=${REDIRECT_URI}&
scope=user-read-currently-playing%20user-top-read`;