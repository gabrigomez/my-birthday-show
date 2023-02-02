import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

export const BirthdayFestival = () => {
  const token  = useSelector((state: RootState) => state.user.token);
  const haveAccess  = useSelector((state: RootState) => state.user.token);

  console.log(token);

  useEffect(() => {

    if(haveAccess) {
      const getTopTracks = async () => {
        const TOP_TRACKS_ENDPOINT = `https://api.spotify.com/v1/me/top/tracks`
    
        const response = await fetch(TOP_TRACKS_ENDPOINT, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
    
        const tracks = await response.json();
        console.log(tracks);  
      };
      getTopTracks()
    }
    
  }, [token, haveAccess]);

  return (
    <div>
      <h1>My Birthday Festival</h1>
    </div>
  )
}