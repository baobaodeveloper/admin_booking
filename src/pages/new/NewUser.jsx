import { yupResolver } from '@hookform/resolvers/yup';
import CloseIcon from '@mui/icons-material/Close';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Paper,
} from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { URLS } from '../../constants/common';
import HomeTemplate from '../../template/HomeTemlate';
import { useSnackbar } from 'notistack';
import InputText from '../../components/input/InputText';

const schema = yup
  .object({
    phone: yup.string().required('Please enter phone number'),
    city: yup.string().required('Please enter city'),
    username: yup.string().required('Please enter username'),
    email: yup
      .string()
      .email('Email isnot valid')
      .required('Please enter email'),
    password: yup
      .string()
      .min(6, 'Password at least 6 character')
      .required('Please enter password'),
    country: yup.string().required('Please enter country'),
  })
  .required();
const NewUser = () => {
  const [showpassword, setShowpassword] = useState(false);
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const navigator = useNavigate();
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm({
    defaultValues: {
      phone: '',
      city: '',
      username: '',
      email: '',
      password: '',
      country: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (values) => {
    let img = '';
    try {
      setLoading(true);
      if (image) {
        const data = new FormData();
        data.append('file', image);
        data.append('upload_preset', 'upload');
        const uploadRes = await axios.post(
          'https://api.cloudinary.com/v1_1/baobaodev/image/upload',
          data
        );
        const { url } = uploadRes.data;
        img = url;
      }
      const data = { ...values, image: img };
      await axios.post(`${URLS}/auth/register`, data);
      enqueueSnackbar('Create user success', { variant: 'success' });
      navigator('/user');
      setLoading(false);
    } catch (error) {
      setLoading(false);
      enqueueSnackbar('Create user fail', { variant: 'error' });
    }
  };
  return (
    <HomeTemplate>
      <Paper elevation={2} className='dark-paper p-4 mb-4'>
        <h1 className='text-2xl font-semibold text-gray-300'>
          Add New User
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
              type='file'
              onChange={(e) => {
                setImage(e.target.files[0]);
              }}
              accept='image/png, image/jpeg'
              className='absolute inset-0 z-20 opacity-0 cursor-pointer bg-transparent'
            />
          </div>
          {image && (
            <div className='h-[300px]'>
              <img
                className='absolute inset-0 bg-transparent z-30  object-cover w-full h-[300px]'
                src={image && URL.createObjectURL(image)}
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
              <InputText
                name='username'
                register={register}
                label='Username'
                errors={errors}
              />
              <InputText
                name='phone'
                register={register}
                label='Phone'
                errors={errors}
              />
              <InputText
                name='city'
                register={register}
                label='City'
                errors={errors}
              />
            </Box>
            <Box className='md:w-[45%] w-full'>
              <InputText
                name='email'
                register={register}
                label='Email'
                errors={errors}
              />

              <FormControl
                error={errors.password ? true : false}
                fullWidth
                sx={{ m: 1 }}
                variant='standard'
              >
                <InputLabel
                  className='input-text'
                  htmlFor='standard-adornment-amount'
                >
                  Password
                </InputLabel>
                <Input
                  className='input-text'
                  type={showpassword ? 'text' : 'password'}
                  {...register('password')}
                  id='standard-adornment-amount'
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='toggle password visibility'
                        onClick={() => setShowpassword(!showpassword)}
                        // onMouseDown={handleMouseDownPassword}
                        edge='end'
                      >
                        {showpassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                <FormHelperText>
                  {errors.password ? errors.password.message : ''}
                </FormHelperText>
              </FormControl>

              <InputText
                name='country'
                register={register}
                label='Country'
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

export default NewUser;
