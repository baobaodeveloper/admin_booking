import React, { useContext } from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import SettingsSystemDaydreamIcon from '@mui/icons-material/SettingsSystemDaydream';
import PsychologyIcon from '@mui/icons-material/Psychology';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { DarkmodeContext } from '../../context/Darkmode';
import { Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigator = useNavigate();
  const { dispatch } = useContext(DarkmodeContext);

  const handleLogout = (value) => {
    if (value === 'Logout') {
      localStorage.removeItem('user');
      navigator('/login');
    }
  };
  const menus = [
    {
      menu: 'Main',
      list: [
        { item: 'Dashboard', icon: <DashboardIcon />, link: '/' },
      ],
    },
    {
      menu: 'List',
      list: [
        { item: 'Users', icon: <DashboardIcon />, link: '/user' },
        {
          item: 'Hotels',
          icon: <PersonIcon />,
          link: '/hotel',
        },
        {
          item: 'Rooms',
          icon: <ProductionQuantityLimitsIcon />,
          link: '/room',
        },
        { item: 'Delivery', icon: <LocalShippingIcon /> },
      ],
    },
    {
      menu: 'Userful',
      list: [
        {
          item: 'Stats',
          icon: <SignalCellularAltIcon />,
          link: '/',
        },
        {
          item: 'Notifications',
          icon: <NotificationsNoneIcon />,
          link: '/',
        },
      ],
    },
    {
      menu: 'Service',
      list: [
        {
          item: 'System Health',
          icon: <SettingsSystemDaydreamIcon />,
          link: '/',
        },
        { item: 'Logs', icon: <PsychologyIcon /> },
        {
          item: 'Settings',
          icon: <SettingsApplicationsIcon />,
          link: '/',
        },
      ],
    },
    {
      menu: 'User',
      list: [
        { item: 'Profile', icon: <AccountCircleIcon />, link: '/' },
        { item: 'Logout', icon: <LogoutIcon />, link: '/' },
      ],
    },
  ];
  return (
    <Paper
      elevation={1}
      className={`p-3 flex flex-col gap-6 bg-sidebar dark-paper h-full
      }`}
    >
      {menus.map((item, i) => (
        <div key={i}>
          <span className='capitalize text-lg text-gray-400 font-semibold'>
            {item.menu}
          </span>
          <div className='flex flex-col gap-3'>
            {item.list.map((icon, j) => (
              <div
                onClick={() => {
                  navigator(icon.link);
                  handleLogout(icon.item);
                }}
                key={j}
                className='pl-4 flex items-center gap-x-3 cursor-pointer hover:translate-x-3 
                transition-all h-8 hover:bg-gray-300 text-gray-400 hover:text-white'
              >
                <span className='text-purple-500'>{icon.icon}</span>
                <span className='text-md font-semibold '>
                  {icon.item}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
      <div className='flex items-center gap-3 pl-4'>
        <div
          onClick={() => dispatch({ type: 'LIGHT' })}
          className=' w-8 h-8 border-2 border-black bg-white rounded-lg cursor-pointer'
        ></div>
        <div
          onClick={() => dispatch({ type: 'DARK' })}
          className='w-8 h-8 border-2 border-black bg-black rounded-lg cursor-pointer'
        ></div>
      </div>
    </Paper>
  );
};

export default Sidebar;
