import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { getTracks } from '../features/userSlice';
import { TOP_TRACKS_SHORT } from '../utils/endpoints';

import { MdSaveAlt } from 'react-icons/md';
import html2canvas from 'html2canvas';

export const BirthdayShow = () => {
  const token = useSelector((state: RootState) => state.user.token);
  const haveAccess = useSelector((state: RootState) => state.user.token);
  const tracks = useSelector((state: RootState) => state.user.tracks);
  const dispacth = useDispatch();
  
  const setlist: HTMLCanvasElement = document.querySelector('#setlist')!;

  const downloadSetlist = () => {
    const a = document.createElement('a');
    let imageToDownload:string = '';
    
    html2canvas(setlist).then(function(canvas) {
      imageToDownload = canvas.toDataURL("image/png", 0.9);
      console.log(imageToDownload)
      
      document.body.appendChild(a);
      a.href = imageToDownload;
      a.download = 'my-birthday-party.png';
      a.click();
      document.body.removeChild(a);
    });
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
      <image className='bg-no-repeat bg-paper bg-center w-11/12 h-[620px] xs:w-[500px] px-4 mx-1 border-slate-200 border' id='setlist'>
        <div className='flex flex-col items-center my-2'>
          <h1 className='text-2xl font-permanent text-red-600'>
            MY BIRTHDAY SHOW
          </h1>
        </div>
        <div>
          {tracks && (
            tracks.map((track, index) => {
              return (
                <div className='flex flex-col items-center'>
                  <div 
                    className={`text-md max-w-[320px] sm:max-w-[450px] h-6 font-permanent truncate `} 
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
          <div className='flex justify-end mt-4'>
            <p className='text-sm font-permanent'>2023</p>
          </div>
        </div>
      </image>
      <button 
        className='flex text-white text-sm border-b rounded-full 
        bg-green-500 hover:bg-green-400 duration-300 mt-4 p-2' 
        onClick={downloadSetlist}>
          <MdSaveAlt className='text-lg mr-1' />
          <p>
            SAVE
          </p>
      </button>
    </div>
  )
}