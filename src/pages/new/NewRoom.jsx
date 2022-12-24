import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, CircularProgress, Paper } from '@mui/material';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import InputText from '../../components/input/InputText';
import SelectText from '../../components/input/SelectText';
import SelectTextNew from '../../components/input/SelectTextNew';
import { URLS } from '../../constants/common';
import useFetch from '../../hooks/useFetch';
import HomeTemplate from '../../template/HomeTemlate';

const listFeatured = [false, true];
const schema = yup
  .object({
    title: yup.string().required('Please enter title'),
    hotel: yup.string().required('Please choose one hotel'),
    priceNumber: yup
      .number()
      .min(1, 'Price at least 1$')
      .positive('Price must have a positive')
      .typeError('Price at least 1$, positive')
      .required('Please enter price'),
    maxPeople: yup
      .number()
      .min(1, 'Max people at least 1$')
      .positive('Max people must have a positive')
      .typeError('Max people at least 1, positive')
      .required('Please enter max people'),
    desc: yup.string().required('Please enter description'),
  })
  .required();
const NewRoom = () => {
  const { data } = useFetch(`${URLS}/hotel`);
  const [listHotel, setListHotel] = useState([]);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const navigator = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      priceNumber: '',
      title: '',
      desc: '',
      maxPeople: '',
      hotel: '',
    },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (data) {
      const news = data.map((item) => ({
        key: item._id,
        value: item.name,
      }));
      setListHotel(news);
    }
  }, [data]);

  const onSubmit = async (values) => {
    try {
      setLoading(true);

      await axios.post(`${URLS}/room/${values.hotel}`, values);
      setLoading(false);
      enqueueSnackbar('Create hotel success', { variant: 'success' });
      navigator('/room');
    } catch (error) {
      setLoading(false);
      enqueueSnackbar('Create hotel fail', { variant: 'error' });
    }
  };
  return (
    <HomeTemplate>
      <Paper elevation={2} className='dark-paper p-4 mb-4'>
        <h1 className='text-2xl font-semibold text-gray-300'>
          Add New Room
        </h1>
      </Paper>
      <Paper className=' p-4 dark-paper'>
        <Box
          className='w-full'
          onSubmit={handleSubmit(onSubmit)}
          component='form'
          sx={{
            '& > :not(style)': { m: 1 },
          }}
          noValidate
          autoComplete='off'
        >
          <Box className='md:flex justify-between gap-3'>
            <Box className='md:w-[45%] w-full'>
              <InputText
                name='title'
                register={register}
                label='Title'
                errors={errors}
              />
              <InputText
                name='priceNumber'
                register={register}
                label='Price'
                errors={errors}
              />
              <SelectTextNew
                className={{ mt: 4 }}
                name='hotel'
                register={register}
                errors={errors}
                label='Choose a hotel'
                items={listHotel}
              />
            </Box>
            <Box className='md:w-[45%] w-full'>
              <InputText
                name='desc'
                register={register}
                label='Description'
                errors={errors}
              />
              <InputText
                name='maxPeople'
                register={register}
                label='Max people'
                errors={errors}
              />
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Button
              type='submit'
              sx={{ marginTop: 5, width: '150px' }}
              variant='contained'
            >
              {loading && (
                <CircularProgress
                  sx={{ marginRight: 2 }}
                  size={20}
                  color='error'
                />
              )}
              Send
            </Button>
          </Box>
        </Box>
      </Paper>
    </HomeTemplate>
  );
};

export default NewRoom;
