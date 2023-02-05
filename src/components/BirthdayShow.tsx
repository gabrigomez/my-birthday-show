import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { getTracks } from '../features/userSlice';
import { TOP_TRACKS_SHORT } from '../utils/endpoints';

export const BirthdayShow = () => {
  const token = useSelector((state: RootState) => state.user.token);
  const haveAccess = useSelector((state: RootState) => state.user.token);
  const tracks = useSelector((state: RootState) => state.user.tracks);
  const dispacth = useDispatch();

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
          <h1 className='sm:text-4xl text-xl font-permanent text-red-600'>
            MY BIRTHDAY SHOW
          </h1>
        </div>
        <div>
          {tracks && (
            tracks.map((track, index) => {
              return (
                <div className='flex flex-col items-center mb-2'>
                  <div 
                    className={`text-lg max-w-[280px] font-permanent truncate sm:max-w-[450px]`} 
                    key={track.name}>
                      {track.name.toUpperCase()}
                  </div>
                  <div className='text-xs font-permanent text-red-500'>
                    {track.artists[0].name}
                  </div>
                </div>
              )
            })
          )}
          <div className='flex justify-center text-lg mt-2'>
            <p className='text-sm font-permanent'>2023</p>
          </div>
        </div>
      </div>
    </div>
  )
}