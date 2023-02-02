import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../features/userSlice';
import { RootState } from '../store';
import { AUTH_FULL_ENDPOINT, REDIRECT_URI, TOKEN_ENDPOINT } from '../utils/endpoints';

export const Home = () => {
  const clientId = process.env.REACT_APP_CLIENT_ID;  
  const clientSecret = process.env.REACT_APP_CLIENT_SECRET;
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
        data.append('redirect_uri', REDIRECT_URI)
        data.append('grant_type', 'authorization_code');
    
        const response = await fetch(TOKEN_ENDPOINT, {
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
    <div className='flex flex-col items-center'>
      <div>
        <h1 className='text-5xl'>
          My Birthday Festival
        </h1>
        <h3>E se sua festa de aniversário fosse um festival?</h3>
      </div>
      <div>
        {!haveAccess && (
          <a href={AUTH_FULL_ENDPOINT}>
            Login to Spotify
          </a>
        )}      
      </div>
    </div>
  )
}