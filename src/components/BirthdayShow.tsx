import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { RootState } from '../store';
import { Tracks } from '../utils/interfaces';
import { getTracks, logout } from '../features/userSlice';
import { TOP_TRACKS_LONG, TOP_TRACKS_MEDIUM, TOP_TRACKS_SHORT } from '../utils/endpoints';

import { MdSaveAlt } from 'react-icons/md';
import { ImSpinner8 } from 'react-icons/im';
import { RiLogoutCircleFill } from 'react-icons/ri';
import html2canvas from 'html2canvas';

export const BirthdayShow = () => {
  const [tracks, setTracks] = useState<Array<Tracks>>([]);;
  const [allTracks, setAllTracks] = useState<Array<Tracks>>([]);
  const [monthTracks, setMonthTracks] = useState<Array<Tracks>>([]);
  const [semesterTracks, setSemesterTracks] = useState<Array<Tracks>>([]);

  const token = useSelector((state: RootState) => state.user.token);
  const haveAccess = useSelector((state: RootState) => state.user.token);
  
  const setlist: HTMLCanvasElement = document.querySelector('#setlist')!;
  const dispatch = useDispatch(); 
  const navigate = useNavigate();

  if(!haveAccess) {
    navigate('/');
  }

  const downloadSetlist = () => {
    const a = document.createElement('a');
    let imageToDownload:string = '';    
    window.scrollTo(0, 0);   //prevent cut the final image

    html2canvas(setlist).then(function(canvas) {
      imageToDownload = canvas.toDataURL("image/png", 0.9);      
      document.body.appendChild(a);

      a.href = imageToDownload;
      a.download = 'my-birthday-party.png';
      a.click();
      document.body.removeChild(a);
    });
  };  
  
  useEffect(() => {   
    const getMonthTracks = async () => {    
      const response = await fetch(TOP_TRACKS_SHORT, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      const data = await response.json();
      dispatch(getTracks(data.items));
      setMonthTracks(data.items);
      setTracks(data.items);
    };
  
    const getAllTracks = async() => {    
      const response = await fetch(TOP_TRACKS_LONG, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setAllTracks(data.items);
    };  
  
    const getSemesterTracks = async() => {  
      const response = await fetch(TOP_TRACKS_MEDIUM, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setSemesterTracks(data.items);
    };

    getMonthTracks();               
    getAllTracks();      
    getSemesterTracks();      
  }, [dispatch, token]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  }

  return (
    <div>
      {tracks.length > 0 ? (
        <div className='flex flex-col mt-10 items-center'>
          <div className='bg-no-repeat bg-paper bg-center w-11/12 h-[620px] xs:w-[500px] px-4 mx-1 border-slate-200 border' id='setlist'>
            <div className='flex flex-col items-center my-2'>
              <h1 className='text-2xl font-permanent text-green-600'>
                MY BIRTHDAY SHOW
              </h1>
            </div>
            <div>
              {tracks && (
                tracks.map((track) => {
                  return (
                    <a className='flex flex-col items-center' target="blank" href={track.external_urls.spotify}>
                      <div 
                        className={`text-md max-w-[320px] sm:max-w-[450px] h-6 font-permanent truncate `} 
                        key={track.name}>
                          {track.name.toUpperCase()}
                      </div>
                      <div className='text-xs font-permanent text-green-500'>
                        {track.artists[0].name}
                      </div>
                    </a>
                  )
                })
              )}
              <div className='flex flex-col items-start mt-5'>
                <p className='text-sm opacity-70 font-permanent'>
                  mybirthdayshow.netlify.app
                </p>
              </div>
            </div>            
          </div>
          <div className='flex flex-col items-center'>
            <button 
              className='flex items-center text-white text-sm border-b rounded-full 
              bg-green-500 hover:bg-green-400 duration-300 mt-4 p-2' 
              onClick={downloadSetlist}>
                <MdSaveAlt className='text-lg mr-1'/>
                <p>
                  SAVE
                </p>
            </button>
            <div>            
              <button
                className='text-md border-b focus:border-black text-green-500
                hover:text-green-400 duration-300 mt-4 mr-2 p-1' 
                onClick={() => setTracks(monthTracks)}
              >
                ULTIMO MÊS
              </button>
              <button
                className='text-md border-b focus:border-black text-green-500
                hover:text-green-400 duration-300 mt-4 mr-2 p-1'  
                onClick={() => setTracks(semesterTracks)}>
                6 MESES
              </button> 
              <button 
                className='text-md border-b focus:border-black text-green-500
                hover:text-green-400 duration-300 mt-4 mr-2 p-1' 
                onClick={() => setTracks(allTracks)}>
                SEMPRE
              </button>              
            </div>          
            <button 
              className='flex mt-10 group' 
              onClick={handleLogout}>
                <RiLogoutCircleFill className='text-xl text-green-500 group-hover:text-green-600 duration-300' />
                <p className='font-permanent text-sm'>
                  Logout
                </p>
            </button>      
          </div>
        </div>
      ) : (
        <div className='flex justify-center'>
          <ImSpinner8 className='animate-spin text-7xl text-green-400' />
        </div>
      )}      
    </div>
  )
}