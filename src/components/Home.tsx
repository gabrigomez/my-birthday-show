import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { login } from '../features/userSlice';
import { RootState } from '../store';
import { AUTH_FULL_ENDPOINT, REDIRECT_URI, TOKEN_ENDPOINT } from '../utils/endpoints';

import { SlSocialSpotify } from 'react-icons/sl';
import { BiCake } from 'react-icons/bi';
import { FaMusic } from 'react-icons/fa';

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
          navigate('/birthday-show');
        };    
      };

      getToken(code);     
    };
   
  }, [authorizationCode, token, haveAccess, navigate, dispacth]);

  return (
    <div className='flex flex-col h-full items-center justify-center bg-gradient-to-t from-white to-gray-300'>
      <div className='flex flex-col items-center'>
        <div className='flex mb-1'>
          <BiCake className='text-7xl' />
          <FaMusic className='text-2xl text-green-400'/>
        </div>
        <h1 className='text-5xl mb-2'>
          My Birthday Show
        </h1>
        <h3 className=''>
          E se sua festa de aniversário fosse um show?
        </h3>
      </div>
      <div>
        {!haveAccess && (
          <div className='flex flex-col items-center'>
            <a 
              className='flex mt-4 p-2 items-center border rounded-full bg-green-400 hover:bg-green-500 duration-200 group' 
              href={AUTH_FULL_ENDPOINT}>
                <SlSocialSpotify className='text-3xl text-white' />
                <p className='ml-1 group-hover:text-gray-800'>
                  Login to Spotify
                </p>
            </a>
            <Link className='text-xs mt-2 hover:text-blue-700 duration-300' to="/privacy">
              Termos de uso
            </Link>
          </div>
        )}      
      </div>
    </div>
  )
}