import { useState } from 'react';
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
  const [tracks, setTracks] = useState<Tracks[]>([])
  
  const clientSecret = process.env.REACT_APP_CLIENT_SECRET;
  const clientId = process.env.REACT_APP_CLIENT_ID;

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
    console.log(artist)
    const url = `https://api.spotify.com/v1/artists/${artist}/top-tracks?country=BR`    
    const result = await fetch(url, {
      method: 'GET',
      headers: { 'Authorization' : 'Bearer ' + publicToken.access_token}      
    });

    const data = await result.json();
    setTracks(data.tracks);
  }

  console.log(tracks)

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
        <div>
          {publicToken ? (
            <div>
              {publicToken.access_token}
            </div>
          ) : (
            <>
            </>
          )}
        </div>
        <div>
          {tracks? (
            tracks.map((track) => {
              return (
                <p key={track.name}>
                  {track.name}
                </p>
              )
            })
          ) : (
            <>
            </>
          )}          
        </div>
      </div>
    </div>
  )
}