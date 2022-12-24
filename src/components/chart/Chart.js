import { Paper } from '@mui/material';
import React from 'react';
import {
  AreaChart,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
} from 'recharts';

const data = [
  { name: 'January', Total: 1200 },
  { name: 'February', Total: 2100 },
  { name: 'March', Total: 800 },
  { name: 'April', Total: 1600 },
  { name: 'May', Total: 900 },
  { name: 'June', Total: 1700 },
];

const Chart = ({ aspect = 2 }) => {
  return (
    <div className='lg:col-span-7 col-span-12 lg:h-full chart lg:mb-0 mb-10'>
      <Paper className='dark-paper h-full'>
        <p className='text-lg font-semibold text-gray-400 mb-6 p-4'>
          Last 6 Months(Revenue)
        </p>
        <ResponsiveContainer
          aspect={aspect / 1}
          width='100%'
          height='100%'
        >
          <AreaChart
            width={730}
            height='100%'
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs className='h-full'>
              <linearGradient
                id='colorUv'
                x1='0'
                y1='0'
                x2='0'
                y2='1'
              >
                <stop
                  offset='5%'
                  stopColor='#8884d8'
                  stopOpacity={0.8}
                />
                <stop
                  offset='95%'
                  stopColor='#8884d8'
                  stopOpacity={0}
                />
              </linearGradient>
              <linearGradient
                id='colorPv'
                x1='0'
                y1='0'
                x2='0'
                y2='1'
              >
                <stop
                  offset='5%'
                  stopColor='#82ca9d'
                  stopOpacity={0.8}
                />
                <stop
                  offset='95%'
                  stopColor='#82ca9d'
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            <XAxis dataKey='name' stroke='gray' />
            <CartesianGrid
              strokeDasharray='3 3'
              className='opacity-50'
            />
            <Tooltip />
            <Area
              type='monotone'
              dataKey='Total'
              stroke='#8884d8'
              fillOpacity={1}
              fill='url(#colorUv)'
            />
          </AreaChart>
        </ResponsiveContainer>
      </Paper>
    </div>
  );
};

export default Chart;
