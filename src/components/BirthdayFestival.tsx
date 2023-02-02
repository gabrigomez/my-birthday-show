import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { getTracks } from '../features/userSlice';

export const BirthdayFestival = () => {
  const token = useSelector((state: RootState) => state.user.token);
  const haveAccess = useSelector((state: RootState) => state.user.token);
  const tracks = useSelector((state: RootState) => state.user.tracks);
  const dispacth = useDispatch();

  useEffect(() => {
    if(haveAccess) {
      const getTopTracks = async () => {
        const TOP_TRACKS_ENDPOINT = `https://api.spotify.com/v1/me/top/tracks`;
    
        const response = await fetch(TOP_TRACKS_ENDPOINT, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
    
        const tracks = await response.json();
        dispacth(getTracks(tracks.items));
      };
      getTopTracks()
    };    
  }, [token, haveAccess, dispacth]);

  return (
    <div>
      <h1>My Birthday Festival</h1>
      <div>
        {tracks && (
          tracks.map((track) => {
            return (
              <ul key={track.name}>
                {track.name}
              </ul>
            )
          })
        )}
      </div>
    </div>
  )
}