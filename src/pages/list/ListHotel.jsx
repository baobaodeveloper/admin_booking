import HomeTemplate from '../../template/HomeTemlate';
import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { URLS } from '../../constants/common';
import useFetch from '../../hooks/useFetch';

const ListHotel = () => {
  const navigator = useNavigate();
  const { pathname } = useLocation();
  const [list, setList] = useState([]);
  const { data, reFetch } = useFetch(`${URLS}/hotel`);
  const { enqueueSnackbar } = useSnackbar();

  const handleClicKView = (e) => {
    navigator(`${pathname}/${e}`);
  };
  const handleCreateNew = () => {
    navigator(`${pathname}/new`);
  };
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${URLS}/hotel/${id}`);
      enqueueSnackbar('Delete user success', { variant: 'success' });
      reFetch();
    } catch (error) {
      enqueueSnackbar('Delete user fail', { variant: 'error' });
    }
  };

  const columns = [
    { field: '_id', headerName: 'ID', width: 230 },
    {
      field: 'name',
      headerName: 'Name',
      width: 300,
    },
    { field: 'type', headerName: 'Type', width: 100 },
    {
      field: 'title',
      headerName: 'Title',
      width: 300,
    },
    {
      field: 'city',
      headerName: 'City',
      sortable: true,
      width: 160,
    },
    {
      field: 'address',
      headerName: 'Address',
      sortable: true,
      width: 160,
    },
    {
      field: 'action',
      sortable: false,
      width: 200,
      headerName: 'Action',
      renderCell: (row) => (
        <div className='flex items-center gap-x-4 flex-1'>
          <div
            onClick={() => handleClicKView(row.id)}
            className='text-purple-600 border rounded-lg border-purple-600 w-[60px] h-[32px]
        font-semibold flex justify-center items-center leading-8 cursor-pointer hover:scale-105 transition-all'
          >
            View
          </div>
          <div
            onClick={() => handleDelete(row.id)}
            className='text-red-600 border rounded-lg border-red-600 w-[60px] h-[32px]
        font-semibold flex justify-center items-center leading-8 cursor-pointer hover:scale-105 transition-all'
          >
            Delete
          </div>
        </div>
      ),
    },
  ];
  useEffect(() => {
    if (data) {
      setList(data);
    }
  }, [data]);
  return (
    <HomeTemplate>
      <div
        style={{ height: 580, width: '100%' }}
        className='dark-table'
      >
        <div
          onClick={handleCreateNew}
          className='flex justify-end p-3'
        >
          <Button variant='contained'>Add new hotel</Button>
        </div>
        <DataGrid
          className='dark-table'
          rows={list}
          columns={columns}
          pageSize={9}
          rowsPerPageOptions={[9]}
          checkboxSelection
          disableColumnMenu={true}
          getRowId={(row) => row._id}
        />
      </div>
    </HomeTemplate>
  );
};

export default ListHotel;
