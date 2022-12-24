import { Paper } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';

const list = [
  {
    name: 'users',
    isMoney: false,
    percentage: 20,
    color: 'text-red-600',
    bg: 'bg-red-300',
    icon: <PersonOutlineOutlinedIcon />,
  },
  {
    name: 'orders',
    isMoney: false,
    percentage: 30,
    color: 'text-yellow-600',
    bg: 'bg-yellow-300',
    icon: <ShoppingCartOutlinedIcon />,
  },
  {
    name: 'earnings',
    isMoney: true,
    percentage: -20,
    color: 'text-green-600',
    bg: 'bg-green-300',
    icon: <MonetizationOnOutlinedIcon />,
  },
  {
    name: 'balance',
    isMoney: true,
    percentage: 20,
    color: 'text-purple-600',
    bg: 'bg-purple-300',
    icon: <AccountBalanceWalletOutlinedIcon />,
  },
];
const Widget = () => {
  return (
    <div className='flex justify-between gap-x-4 flex-wrap '>
      {list.map((item, i) => (
        <Paper
          key={i}
          elevation={2}
          className='lg:flex-1 w-[48%] gap-5 dark-paper lg:mb-0 mb-5'
        >
          <div className='p-3 flex justify-between '>
            <div className='flex flex-col gap-3'>
              <span className='text-lg text-gray-400 font-semibold uppercase '>
                {item.name}
              </span>
              <span className='text-4xl money-paper'>
                {item.isMoney ? `$${100}` : 100}
              </span>
              <Link
                className='text-gray-600 font-semibold underline'
                to='/users'
              >
                See all users
              </Link>
            </div>

            <div className='flex flex-col justify-between items-end '>
              {item.percentage > 0 ? (
                <div className='flex items-center text-lg font-medium text-green-500'>
                  <KeyboardArrowUpIcon />
                  <span>{item.percentage}%</span>
                </div>
              ) : (
                <div className='flex items-center text-lg font-medium text-red-500'>
                  <KeyboardArrowDownIcon />
                  <span>{item.percentage}%</span>
                </div>
              )}

              <div
                className={`w-10 h-10 flex items-center justify-center rounded-lg ${item.bg}`}
              >
                <span className={item.color}>{item.icon}</span>
              </div>
            </div>
          </div>
        </Paper>
      ))}
    </div>
  );
};

export default Widget;
