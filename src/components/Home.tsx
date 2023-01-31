import { useState } from 'react';
import './Home.css';

interface Token {
  access_token: string;
}

export const Home = () => {
  const [publicToken, setPublicToken] = useState<Token>({access_token: ''});  

  const getAccessToken = async() => {
    const clientSecret = process.env.REACT_APP_CLIENT_SECRET;
    const clientId = process.env.REACT_APP_CLIENT_ID;
      
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

  return (
    <div className='home-container'>
      <h1>
        HOME
      </h1>
      <div>
        <button onClick={getAccessToken}>
          Connect
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