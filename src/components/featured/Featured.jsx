import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { Paper } from '@mui/material';
import React, { useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';

const lists = [
  {
    name: 'Target',
    sales: 12.4,
    up: true,
  },
  {
    name: 'Last Week',
    sales: 112.2,
    up: false,
  },
  {
    name: 'Last Month',
    sales: 142,
    up: true,
  },
];
const Featured = () => {
  const [progress, setProgress] = useState(70);
  return (
    <div className='lg:col-span-5 col-span-12 items-stretch'>
      <Paper elevation={2} className='p-3  px-6 h-full dark-paper'>
        <div className='flex justify-between items-center text-gray-400'>
          <span className='text-lg font-semibold'>Total Revenue</span>
          <MoreVertOutlinedIcon />
        </div>
        <div className='flex flex-col gap-4 items-center p-6 text-gray-400'>
          <div className='max-w-[200px] '>
            <CircularProgressbar
              strokeWidth={4}
              maxValue={100}
              minValue={0}
              value={progress}
              text={`${progress}%`}
            />
          </div>
          <p className='text-xl font-semibold'>
            Total sales made today
          </p>
          <span className='text-black text-4xl money-paper'>
            $420
          </span>
          <p className='text-center'>
            Previous transactions processing.Last payments may not be
            included.
          </p>
          <div className='flex justify-between w-full'>
            {lists.map((item, i) => (
              <div
                key={i}
                className='flex flex-col items-center gap-2'
              >
                <span className='text-md text-gray-400 font-medium'>
                  {item.name}
                </span>
                {item.up ? (
                  <div className='flex gap-x-1 items-center text-green-600 font-semibold'>
                    <KeyboardArrowUpOutlinedIcon />
                    <span>${item.sales}k</span>
                  </div>
                ) : (
                  <div className='flex gap-x-1  items-center text-red-600 font-semibold'>
                    <KeyboardArrowDownOutlinedIcon />
                    <span>${item.sales}k</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default Featured;
