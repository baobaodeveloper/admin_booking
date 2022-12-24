import React from 'react';
import { Paper } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const rows = [
  {
    id: 1143155,
    product: 'Acer Nitro 5',
    img: 'https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_UY327_FMwebp_QL65_.jpg',
    customer: 'John Smith',
    date: '1 March',
    amount: 785,
    method: 'Cash on Delivery',
    status: 'Approved',
  },
  {
    id: 2235235,
    product: 'Playstation 5',
    img: 'https://m.media-amazon.com/images/I/31JaiPXYI8L._AC_UY327_FMwebp_QL65_.jpg',
    customer: 'Michael Doe',
    date: '1 March',
    amount: 900,
    method: 'Online Payment',
    status: 'Pending',
  },
  {
    id: 2342353,
    product: 'Redragon S101',
    img: 'https://m.media-amazon.com/images/I/71kr3WAj1FL._AC_UY327_FMwebp_QL65_.jpg',
    customer: 'John Smith',
    date: '1 March',
    amount: 35,
    method: 'Cash on Delivery',
    status: 'Pending',
  },
  {
    id: 2357741,
    product: 'Razer Blade 15',
    img: 'https://m.media-amazon.com/images/I/71wF7YDIQkL._AC_UY327_FMwebp_QL65_.jpg',
    customer: 'Jane Smith',
    date: '1 March',
    amount: 920,
    method: 'Online',
    status: 'Approved',
  },
  {
    id: 2342355,
    product: 'ASUS ROG Strix',
    img: 'https://m.media-amazon.com/images/I/81hH5vK-MCL._AC_UY327_FMwebp_QL65_.jpg',
    customer: 'Harold Carol',
    date: '1 March',
    amount: 2000,
    method: 'Online',
    status: 'Pending',
  },
];
const List = () => {
  return (
    <div className='mt-10'>
      <Paper elevation={2} className='p-3 dark-paper'>
        <span className='text-lg font-semibold text-gray-400 inline-block mb-3'>
          Latest Transactions
        </span>
        <TableContainer component={Paper} className='dark-paper'>
          <Table sx={{ minWidth: 650 }} aria-label='simple table '>
            <TableHead>
              <TableRow>
                <TableCell className='money-paper'>
                  Tracking ID
                </TableCell>
                <TableCell className='money-paper' align='left'>
                  Product
                </TableCell>
                <TableCell className='money-paper' align='left'>
                  Customer
                </TableCell>
                <TableCell className='money-paper' align='left'>
                  Date
                </TableCell>
                <TableCell className='money-paper' align='left'>
                  Amount
                </TableCell>
                <TableCell className='money-paper' align='left'>
                  Payment Methob
                </TableCell>
                <TableCell className='money-paper' align='left'>
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                  }}
                >
                  <TableCell
                    className='money-paper'
                    component='th'
                    scope='row'
                  >
                    {row.id}
                  </TableCell>
                  <TableCell className='money-paper' align='left'>
                    <div className='flex items-center gap-x-2 '>
                      <img
                        className='w-10 h-10 rounded-full object-cover'
                        src={row.img}
                        alt={row.product}
                      />
                      <span>{row.product}</span>
                    </div>
                  </TableCell>
                  <TableCell className='money-paper' align='left'>
                    {row.customer}
                  </TableCell>
                  <TableCell className='money-paper' align='left'>
                    {row.date}
                  </TableCell>
                  <TableCell className='money-paper' align='left'>
                    {row.amount}
                  </TableCell>
                  <TableCell className='money-paper' align='left'>
                    {row.method}
                  </TableCell>
                  <TableCell className='money-paper' align='left'>
                    <span
                      className={`${
                        row.status === 'Pending'
                          ? 'text-red-600 bg-red-200'
                          : 'text-green-600 bg-green-200'
                      } inline-block px-2 py-1 rounded-sm font-semibold`}
                    >
                      {row.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};

export default List;
