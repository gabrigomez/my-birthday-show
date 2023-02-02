import { useEffect, useState } from 'react';
import './Home.css';

export const Home = () => {
  const [userToken, setUserToken] = useState<Object>({});
  const clientId = process.env.REACT_APP_CLIENT_ID;  
  const clientSecret = process.env.REACT_APP_CLIENT_SECRET
  const authEndpoint = 'https://accounts.spotify.com/en/authorize';
  const redirectUri = 'http://localhost:3000/';

  const authorizationCode = window.btoa(`${clientId}:${clientSecret}`);
  
  useEffect(() => {
    const href = window.location.href
    const code = href.substring(1)?.split("=")[1];

    if(code) {
      const getToken = async(code:string) => {
        const headers = {
          Authorization: `Basic ${authorizationCode}`,
          'Content-Type' : 'application/x-www-form-urlencoded',
        };
    
        const data = new URLSearchParams();
        data.append('code', code);
        data.append('redirect_uri', redirectUri)
        data.append('grant_type', 'authorization_code');
    
        const response = await fetch('https://accounts.spotify.com/api/token', {
          headers,
          method: 'POST',
          body: data,
        });
    
        if(response.ok) {
          const token = await response.json();    
          setUserToken(token);
        };    
      };

      getToken(code);     
    };
    
  }, [authorizationCode]);

  console.log(userToken)

  return (
    <div className='home-container'>
      <h1>
        HOME
      </h1>
      <div>
        {userToken && (
          <a href={`${authEndpoint}?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=user-read-currently-playing%20user-top-read`}>
            Login to Spotify
          </a>
        )}      
      </div>
    </div>
  )
}