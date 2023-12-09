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
import { IoMdColorPalette } from 'react-icons/io';
import SpotifyLogo from '../assets/SpotifyLogo.png';

import html2canvas from 'html2canvas';


export const BirthdayShow = () => {
  const [tracks, setTracks] = useState<Array<Tracks>>([]);;
  const [allTracks, setAllTracks] = useState<Array<Tracks>>([]);
  const [monthTracks, setMonthTracks] = useState<Array<Tracks>>([]);
  const [semesterTracks, setSemesterTracks] = useState<Array<Tracks>>([]);
  const [backGround, setBackground] = useState('bg-default');

  const token = useSelector((state: RootState) => state.user.token);
  const haveAccess = useSelector((state: RootState) => state.user.token);
  const dispatch = useDispatch(); 
  const navigate = useNavigate();

  if(!haveAccess) {
    navigate('/');
  }

  const downloadSetlist = () => {
    const a = document.createElement('a');
    let imageToDownload: string = '';    
    //window.scrollTo(0, 0);   //prevent cut the final image

    html2canvas(document.querySelector("#setlist")!).then((canvas) => {
      imageToDownload = canvas.toDataURL("image/png", 1);      
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
      setTracks(data.items);
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

  const onlyAllTracks = (semesterTracks?.length > 0) && (monthTracks?.length > 0) ? false : true;

  return (
    <div className='flex flex-col mt-4 items-center'>
      {tracks.length > 0 ? (
        <div className={`bg-no-repeat ${backGround} bg-center w-11/12 h-[720px] xs:w-[500px] px-4 mx-1 border-slate-200 border`} id='setlist'>
          <div className='flex flex-col items-center my-1'>
            <h1 
              className={`setlist 
              ${backGround === 'bg-happy' || backGround === 'bg-black' ? 'text-white' : ''} 
              ${backGround === 'bg-psychadelic' ? 'text-lime-300' : ''}
              ${backGround === 'bg-happy' ? 'text-blue-500' : ''}`
              }
              >
                MY BIRTHDAY SHOW
            </h1>
          </div>
          <div className='py-1'>
            {tracks.length > 0 && (
              tracks.map((track) => {
                return (
                  <a className='flex flex-col items-center mb-1' target="blank" href={track.external_urls.spotify}>
                    <div 
                      className={`song text-2xl ${backGround === 'bg-black' ? 'text-white' : ''} 
                      ${backGround === 'bg-psychadelic' ? 'text-lime-300' : ''}
                      ${backGround === 'bg-happy' ? 'text-white' : ''}`} 
                      key={track.name}
                      >
                        {track.name.toUpperCase()}
                    </div>
                    <div 
                      className={`artist ${backGround === 'bg-happy' ? 'text-blue-500' : ''} ${backGround === 'bg-psychadelic' ? 'text-white' : ''} `}
                      >
                        {track.artists[0].name}
                    </div>
                  </a>
                )
              })
            )}
            <div className='flex justify-between mt-1'>
              <p className={`text-xxs sm:text-sm opacity-70 font-permanent mt-3 
              ${backGround === 'bg-black' ? 'text-white' : ''}
              ${backGround === 'bg-happy' ? 'text-purple-100' : ''}`}
              >
                mybirthdayshow.netlify.app
              </p>
              <a href='https://open.spotify.com/?' target="blank" className='mt-1'>
                <img src={SpotifyLogo} alt="" />
              </a>
            </div>
          </div>
          <div className='flex flex-col items-center mt-2'>
            <button className='save-button' onClick={downloadSetlist}>
                <MdSaveAlt className='text-lg mr-1'/>
                <p>SAVE</p>
            </button>
            <div>
              {monthTracks.length > 0 && (            
                <button className='range-buttons' onClick={() => setTracks(monthTracks)}>
                  ULTIMO MÊS
                </button>
              )}
              {semesterTracks.length > 0 && (
                <button className='range-buttons' onClick={() => setTracks(semesterTracks)}>
                  6 MESES
                </button>
              )} 
              <button className={`range-buttons ${onlyAllTracks ? 'hidden' : ''}`} 
                onClick={() => setTracks(allTracks)}>
                  SEMPRE
              </button>              
            </div>
            <div className='mt-2'>
              <div className='flex text-xs items-center justify-center font-permanent'>
                <IoMdColorPalette className='text-xl text-green-500 group-hover:text-green-600 duration-300'/>
                <p>
                  TEMAS
                </p>
              </div>
              <button className='theme-buttons' onClick={() => setBackground('bg-default')}>
                Default
              </button>
              <button className='theme-buttons' onClick={() => setBackground('bg-black')}>
                Black
              </button>                
              <button className='theme-buttons' onClick={() => setBackground('bg-psychadelic')}>
                Psychadelic
              </button>
              <button className='theme-buttons' onClick={() => setBackground('bg-happy')}>
                Happy
              </button>
            </div>          
            <button 
              className='flex mt-4 group' 
              onClick={handleLogout}>
                <RiLogoutCircleFill className='text-xl text-green-500 group-hover:text-green-600 duration-300' />
                <p className='font-permanent text-sm'>
                  Logout
                </p>
            </button>      
          </div>            
        </div>          
      ) : (
        <div className='flex justify-center items-center h-3/4'>
          <ImSpinner8 className='animate-spin text-9xl text-green-400' />
        </div>
      )}      
    </div>
  )
}