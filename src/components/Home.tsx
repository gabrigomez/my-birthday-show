import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../features/userSlice';
import { RootState } from '../store';
import './Home.css';

export const Home = () => {
  const clientId = process.env.REACT_APP_CLIENT_ID;  
  const clientSecret = process.env.REACT_APP_CLIENT_SECRET
  const authEndpoint = 'https://accounts.spotify.com/en/authorize';
  const redirectUri = 'http://localhost:3000/';
  const authorizationCode = window.btoa(`${clientId}:${clientSecret}`);

  const token  = useSelector((state: RootState) => state.user.token);
  const haveAccess = useSelector((state: RootState) => state.user.haveAccess);
  const navigate = useNavigate();
  const dispacth = useDispatch();
  
  useEffect(() => {
    const href = window.location.href;
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
          dispacth(login(token.access_token));
          navigate('/birthday-festival');
        };    
      };

      getToken(code);     
    };
   
  }, [authorizationCode, token, haveAccess, navigate, dispacth]);

  return (
    <div className='home-container'>
      <h1>
        HOME
      </h1>
      <div>
        {!haveAccess && (
          <a href={`${authEndpoint}?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=user-read-currently-playing%20user-top-read`}>
            Login to Spotify
          </a>
        )}      
      </div>
    </div>
  )
}