import { yupResolver } from '@hookform/resolvers/yup';
import CloseIcon from '@mui/icons-material/Close';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { Box, Button, CircularProgress, Paper } from '@mui/material';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import InputText from '../../components/input/InputText';
import MultipleSelect from '../../components/input/MutiSelectText';
import SelectText from '../../components/input/SelectText';
import { URLS } from '../../constants/common';
import useFetch from '../../hooks/useFetch';
import HomeTemplate from '../../template/HomeTemlate';
import { useNavigate } from 'react-router-dom';

const items = ['hotel', 'villa', 'apartment', 'resort', 'cabin'];
const listFeatured = [false, true];
const schema = yup
  .object({
    type: yup.string().required('Please enter type hotel'),
    cheapestPrice: yup
      .number()
      .min(1, 'Price at least 1$')
      .positive('Price must have a positive')
      .typeError('Price at least 1$, positive')
      .required('Please enter price'),
    address: yup.string().required('Please enter address hotel'),
    title: yup.string().required('Please enter title hotel'),
    name: yup.string().required('Please enter name hotel'),
    city: yup.string().required('Please enter city hotel'),
    distance: yup
      .string()
      .required('Please enter distance from city center'),
    desc: yup.string().required('Please enter description'),
    rooms: yup.array().min(1, 'Please choose rooms'),
  })
  .required();
const NewHotel = () => {
  const [image, setImage] = useState('');
  const { data } = useFetch(`${URLS}/room`);
  const [listRoom, setListRoom] = useState([]);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const navigator = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      type: '',
      cheapestPrice: '',
      title: '',
      desc: '',
      distance: '',
      city: '',
      name: '',
      address: '',
      rooms: [],
      featured: false,
    },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (data?.rooms) {
      const news = data.rooms.map((item) => ({
        id: item._id,
        title: item.title,
      }));
      setListRoom(news);
    }
  }, [data?.rooms]);

  const onSubmit = async (values) => {
    try {
      setLoading(true);
      const list = await Promise.all(
        Object.values(image).map(async (file) => {
          const data = new FormData();
          data.append('file', file);
          data.append('upload_preset', 'upload');
          const uploadRes = await axios.post(
            'https://api.cloudinary.com/v1_1/baobaodev/image/upload',
            data
          );
          const { url } = uploadRes.data;
          return url;
        })
      );
      const data = { ...values, photos: list };
      await axios.post(`${URLS}/hotel`, data);
      setLoading(false);
      enqueueSnackbar('Create hotel success', { variant: 'success' });
      navigator('/hotel');
    } catch (error) {
      setLoading(false);
      enqueueSnackbar('Create hotel fail', { variant: 'error' });
    }
  };
  return (
    <HomeTemplate>
      <Paper elevation={2} className='dark-paper p-4 mb-4'>
        <h1 className='text-2xl font-semibold text-gray-300'>
          Add New Hotel
        </h1>
      </Paper>
      <Paper className='lg:flex justify-between p-4 dark-paper'>
        <div className='lg:w-[25%] flex justify-center relative money-paper w-full '>
          {image && (
            <span
              onClick={() => {
                setImage('');
              }}
              className='absolute top-1 right-2 cursor-pointer z-50'
            >
              <CloseIcon sx={{ color: 'white' }} />
            </span>
          )}
          <div
            className='w-[120px] h-[120px]  rounded-full 
              bg-gray-200 flex justify-center items-center relative z-10'
          >
            <PhotoCameraIcon sx={{ fontSize: 80, opacity: 0.3 }} />
            <input
              multiple
              type='file'
              onChange={(e) => {
                setImage(e.target.files);
              }}
              accept='image/png, image/jpeg'
              className='absolute inset-0 z-20 opacity-0 cursor-pointer bg-transparent'
            />
          </div>
          {image && (
            <div className='h-[300px]'>
              <img
                className='absolute inset-0 bg-transparent z-30  object-cover w-full h-[300px]'
                src={image && URL.createObjectURL(image[0])}
                alt=''
              />
            </div>
          )}
        </div>
        <Box
          className='lg:w-[75%] w-full'
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
              <SelectText
                name='type'
                register={register}
                errors={errors}
                label='Type'
                items={items}
                defaultValue='hotel'
              />
              <InputText
                name='address'
                register={register}
                label='Address'
                errors={errors}
              />
              <InputText
                name='title'
                register={register}
                label='Title'
                errors={errors}
              />
              <InputText
                name='cheapestPrice'
                register={register}
                label='Price'
                errors={errors}
              />
              <MultipleSelect
                name='rooms'
                register={register}
                errors={errors}
                label='Rooms'
                list={listRoom}
                defaultValue=''
              />
            </Box>
            <Box className='md:w-[45%] w-full'>
              <InputText
                name='name'
                register={register}
                label='Name'
                errors={errors}
              />
              <InputText
                name='city'
                register={register}
                label='City'
                errors={errors}
              />
              <InputText
                name='distance'
                register={register}
                label='Distance'
                errors={errors}
              />
              <InputText
                name='desc'
                register={register}
                label='Description'
                errors={errors}
              />
              <SelectText
                className={{ mt: 4 }}
                name='featured'
                register={register}
                errors={errors}
                label='Featured'
                items={listFeatured}
                defaultValue={false}
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

export default NewHotel;
