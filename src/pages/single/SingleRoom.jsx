import { Paper } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Chart from '../../components/chart/Chart';
import List from '../../components/table/Table';
import { URLS } from '../../constants/common';
import useFetch from '../../hooks/useFetch';
import HomeTemplate from '../../template/HomeTemlate';

const SingleRoom = () => {
  const { roomId } = useParams();
  const { data } = useFetch(`${URLS}/room/${roomId}`);
  const [room, setRoom] = useState({});
  useEffect(() => {
    if (data?.room) {
      setRoom(data?.room);
    }
  }, [data?.room]);

  return (
    <HomeTemplate>
      <div className='grid grid-cols-12 w-full justify-between gap-4 justify-items-stretch '>
        <Paper
          elevation={2}
          className='lg:col-span-5 col-span-12 p-4 dark-paper '
        >
          <span className='text-lg font-semibold text-gray-400 mb-6 p-4 inline-block'>
            Information
          </span>
          <div className='flex gap-4'>
            <img
              className='w-[120px] h-[120px] object-cover rounded-full'
              src={
                'https://images.unsplash.com/photo-1670105791108-718c8d4b738e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
              }
              alt=''
            />
            <div className='flex flex-col gap-3 text-lg font-semibold text-gray-400'>
              <span className='text-gray-600 text-4xl font-semibold'>
                {room.title}
              </span>
              <span>
                Price:{' '}
                <span className='text-lg font-normal'>
                  ${room.priceNumber}
                </span>
              </span>
              <span>
                Max people:{' '}
                <span className='text-lg font-normal'>
                  {room.maxPeople}
                </span>
              </span>
              <span>
                Room number:{' '}
                <span className='text-lg font-normal'>
                  {room?.roomNumbers?.length || 0}
                </span>
              </span>
            </div>
          </div>
        </Paper>
        <Chart aspect={3} />
      </div>
      <List />
    </HomeTemplate>
  );
};

export default SingleRoom;
