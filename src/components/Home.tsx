import { useState } from 'react';
import './Home.css';

interface Token {
  access_token: string;
}
interface Artist {
  id: string,
}

export const Home = () => {
  const [publicToken, setPublicToken] = useState<Token>({access_token: ''}); 
  const [artist, setArtist] = useState<Artist>({id: ''});
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
    console.log(data.artists.items[0])
    if(data.artists.items[0]) {
      setArtist(artist.id = data.artists.items[0].id)
    }
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
        {publicToken ? (
          <div>
            {publicToken.access_token}
          </div>
        ) : (
          <>
          </>
        )}
      </div>
    </div>
  )
}