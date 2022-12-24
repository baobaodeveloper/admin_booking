import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';
import Sidebar from '../components/sidebar/Sidebar';
import { AuthContext } from '../context/AuthContext';
import { DarkmodeContext } from '../context/Darkmode';

const HomeTemplate = ({ children }) => {
  const [sidebar, setSidebar] = useState(false);
  const { darkMode } = useContext(DarkmodeContext);
  const { user } = useContext(AuthContext);
  const navigator = useNavigate();

  const handleClick = (e) => {
    setSidebar(false);
  };

  useEffect(() => {
    if (!user || !user.isAdmin) {
      navigator('/login');
    }
  }, [user?.id]);
  return (
    <div>
      <div
        className={`grid grid-cols-12 min-h-screen relative z-10 items-stretch`}
      >
        {sidebar && (
          <div
            onClick={handleClick}
            className='fixed inset-0 z-20 bg-[rgba(0,0,0,0.13)]'
          ></div>
        )}
        <div
          className={`col-span-2  absolute xl:relative z-40 
          -translate-x-[120%] transition-all duration-300 xl:translate-x-0 ${
            sidebar && 'translate-x-[0%]'
          } ${darkMode ? 'bg-[rgba(0,0,0,0.13)]' : 'bg-white'}`}
        >
          <div className='flex justify-center items-center h-16 border-b text-xl font-semibold text-purple-600'>
            <Link to='/'>BaoBaoAdmin</Link>
          </div>
          <Sidebar />
        </div>
        <div className='xl:col-span-10 col-span-12 h-full '>
          <Navbar setSidebar={setSidebar} />
          <div className='p-10 h-full bg-sidebar'>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default HomeTemplate;
