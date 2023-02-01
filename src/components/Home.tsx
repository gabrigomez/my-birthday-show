import { useEffect, useState } from 'react';
import './Home.css';

export const Home = () => {
  const [userToken] = useState(localStorage.getItem("token"));
  const clientId = process.env.REACT_APP_CLIENT_ID;
  
  const authEndpoint = 'https://accounts.spotify.com/en/authorize';
  const redirectUri = 'http://localhost:3000';

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

  return (
    <div className='home-container'>
      <h1>
        HOME
      </h1>
      <div>
        {userToken && (
          <a href={`${authEndpoint}?response_type=token&redirect_uri=${redirectUri}&client_id=${clientId}&scope=user-top-read&state=96r77`}>
            Login to Spotify
          </a>
        )}      
      </div>
    </div>
  )
}