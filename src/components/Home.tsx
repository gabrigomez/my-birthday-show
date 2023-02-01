import { useEffect, useState } from 'react';
import './Home.css';

interface Token {
  access_token: string;
}
interface Artist {
  id: string,
}
interface Tracks {
  name: string
}

export const Home = () => {
  const [publicToken, setPublicToken] = useState<Token>({access_token: ''}); 
  const [artist, setArtist] = useState<Artist>({id: ''});
  const [tracks, setTracks] = useState<Tracks[]>([]);
  const [userToken] = useState(localStorage.getItem("token"));

  const [userTracks, setUserTracks] = useState<Tracks[]>([])
  
  const clientSecret = process.env.REACT_APP_CLIENT_SECRET;
  const clientId = process.env.REACT_APP_CLIENT_ID;
  
  const authEndpoint = 'https://accounts.spotify.com/en/authorize';
  const redirectUri = 'http://localhost:3000';
  const responseType = 'token';

  useEffect(() => {
    const hash = window.location.hash 
    let token = localStorage.getItem("token")

    if (!token && hash) {
      const tokenHash = hash.substring(1).split("&").find(elem => elem.startsWith("access_token"))?.split("=")[1];
      window.location.hash = "";
      
      if(tokenHash) {
        localStorage.setItem("token", tokenHash);
      }
    };

  }, []);

  const getAccessToken = async() => {      
    const result = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
        headers: {
          'Content-Type' : 'application/x-www-form-urlencoded', 
          'Authorization' : 'Basic ' + btoa(clientId + ':' + clientSecret)
        },
        body: 'grant_type=client_credentials'
    });

    const data = await result.json();
    setPublicToken(data);
  }

  const getArtist = async() => {
    const url = 'https://api.spotify.com/v1/search?q=Tool&type=artist&limit=1'    
    const result = await fetch(url, {
      method: 'GET',
      headers: { 'Authorization' : 'Bearer ' + publicToken.access_token}      
    });

    const data = await result.json();
    if(data.artists.items[0]) {
      setArtist(data.artists.items[0].id)
    }
  }

  const getTopSongs = async() => {
    const url = `https://api.spotify.com/v1/artists/${artist}/top-tracks?country=BR`    
    const result = await fetch(url, {
      method: 'GET',
      headers: { 'Authorization' : 'Bearer ' + publicToken.access_token}      
    });

    const data = await result.json();
    setTracks(data.tracks);
  }

  const getUserTracks = async() => {
    const url = 'https://api.spotify.com/v1/me/top/tracks'

    const result = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization' : 'Bearer ' + userToken,
      }
    });

    const data = await result.json();
    setUserTracks(data.items);    
  }

  return (
    <div className='home-container'>
      <h1>
        HOME
      </h1>
      <div>
        <button onClick={getAccessToken}>
          Connect
        </button>
        <button onClick={getArtist}>
          Get Artist
        </button>
        <button onClick={getTopSongs}>
          Get to songs
        </button>
        {userToken && (
          <button onClick={getUserTracks}>
            Get my top tracks!
          </button>
        )}
        {userToken && (
          <a href={`${authEndpoint}?response_type=token&redirect_uri=${redirectUri}&client_id=${clientId}&scope=user-top-read&state=96r77`}>
            Login to Spotify
          </a>
        )}
        <div>
          {publicToken && (
            <div>
              {publicToken.access_token}
            </div>
          )}
        </div>
        <div>
          {tracks && (
            tracks.map((track) => {
              return (
                <p key={track.name}>
                  {track.name}
                </p>
              )
            })
          )}          
        </div>
        <div>
        {userTracks && (
          userTracks.map((track) => {
            return (
              <p key={track.name}>
                {track.name}
              </p>
              )
            })
        )}          
        </div>
      </div>
    </div>
  )
}