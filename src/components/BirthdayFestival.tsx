import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { getTracks } from '../features/userSlice';
import { TOP_TRACKS_SHORT } from '../utils/endpoints';

export const BirthdayFestival = () => {
  const token = useSelector((state: RootState) => state.user.token);
  const haveAccess = useSelector((state: RootState) => state.user.token);
  const tracks = useSelector((state: RootState) => state.user.tracks);
  const dispacth = useDispatch();

  function getRandomIndex(min: number = 0, max: number = 12) {
    return Math.floor (Math.random() * (max - min) + min);
  };

  function conditionalClasses (index: number) {
    return index === getRandomIndex() ? 'sm:text-3xl' :  'sm:text-xl'    
  }
 
  useEffect(() => {
    if(haveAccess && tracks.length < 13) {
      const getTopTracks = async () => {    
        const response = await fetch(TOP_TRACKS_SHORT, {
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
  }, [token, haveAccess, tracks, dispacth]);
  console.log(tracks)

  return (
    <div className='flex flex-col mt-10 items-center'>
      <div className='px-4 bg-paper w-[300px] sm:w-[500px] md:h-[800px]'>
        <div className='flex flex-col items-center my-4'>
          <h1 className='sm:text-4xl text-xl font-rock-salty text-red-600'>
            My Birthday Festival
          </h1>
        </div>
        <div>
          {tracks && (
            tracks.map((track, index) => {
              return (
                <div className='flex flex-col items-center mb-2'>
                  <div 
                    className={`text-lg max-w-[280px] ${conditionalClasses(index)} font-unbounded truncate md:max-w-[450px]`} 
                    key={track.name}>
                      {track.name.toUpperCase()}
                  </div>
                  <div className='text-xs'>
                    {track.artists[0].name}
                  </div>
                </div>
              )
            })
          )}
          <div className='flex justify-center text-lg mt-3'>
            2023
          </div>
        </div>
      </div>
    </div>
  )
}