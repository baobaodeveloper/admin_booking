import React, { useContext } from 'react';
import LanguageIcon from '@mui/icons-material/Language';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import Brightness7OutlinedIcon from '@mui/icons-material/Brightness7Outlined';
import CropIcon from '@mui/icons-material/Crop';
import { Badge } from '@mui/material';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import { DarkmodeContext } from '../../context/Darkmode';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = ({ setSidebar }) => {
  const { dispatch, darkMode } = useContext(DarkmodeContext);
  return (
    <div className='flex justify-between items-center py-2 px-10 h-16 border-b'>
      <div
        className={`xl:hidden block cursor-pointer ${
          darkMode && 'text-white'
        }`}
        onClick={() => setSidebar(true)}
      >
        <MenuIcon sx={{ fontSize: 30 }} />
      </div>
      <div className='relative min-[830px]:block hidden'>
        <div className='absolute inset-y-0 right-4 flex items-center pointer-events-none cursor-pointer'>
          <svg
            aria-hidden='true'
            className='w-5 h-5 text-gray-500'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
            />
          </svg>
        </div>
        <input
          type='search'
          className='block p-2 min-w-[300px] px-4 text-sm text-gray-900 border border-gray-300 
          rounded-md bg-transparent outline-none input-text'
          placeholder='Search...'
        />
      </div>

      <div className='flex items-center justify-between gap-6 text-gray-400'>
        <div className='cursor-pointer'>
          <LanguageIcon />
          <span>English</span>
        </div>
        {darkMode ? (
          <DarkModeOutlinedIcon
            onClick={() => dispatch({ type: 'TOGGLE' })}
            className='cursor-pointer'
          />
        ) : (
          <Brightness7OutlinedIcon
            onClick={() => dispatch({ type: 'TOGGLE' })}
            className='cursor-pointer'
          />
        )}

        <CropIcon />
        <Badge
          color='error'
          badgeContent={0}
          showZero
          className='cursor-pointer'
        >
          <NotificationsOutlinedIcon />
        </Badge>
        <Badge
          color='error'
          badgeContent={0}
          showZero
          className='cursor-pointer'
        >
          <ChatBubbleOutlineOutlinedIcon />
        </Badge>
        <FormatListBulletedOutlinedIcon className='cursor-pointer' />

        <div className='w-10 h-10 rounded-full overflow-hidden cursor-pointer'>
          <img
            className='w-full h-full object-cover'
            src='https://images.unsplash.com/photo-1664575262619-b28fef7a40a4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1432&q=80'
            alt=''
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
