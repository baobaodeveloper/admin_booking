import { yupResolver } from '@hookform/resolvers/yup';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { URLS } from '../../constants/common';

const schema = yup
  .object({
    username: yup.string().required('Please enter username'),
    password: yup.string().required('Please enter password'),
  })
  .required();

const theme = createTheme();

const Login = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [showpassword, setShowpassword] = useState(false);
  const { dispatch } = useContext(AuthContext);
  const navigator = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (event) => {
    try {
      const { data } = await axios.post(`${URLS}/auth/login`, event, {
        withCredentials: false,
      });
      if (data.isAdmin) {
        dispatch({ type: 'LOGIN_SUCCESS', payload: data });
        enqueueSnackbar('Login Success', { variant: 'success' });
        navigator('/');
      } else {
        dispatch({ type: 'LOGIN_FAIL' });
        enqueueSnackbar('Login Fail', { variant: 'error' });
        navigator('/login');
      }
    } catch (error) {
      dispatch({ type: 'LOGIN_FAIL' });
      enqueueSnackbar('Login Fail', { variant: 'error' });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component='main' sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light'
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component='h1' variant='h5'>
              Login
            </Typography>
            <Box
              component='form'
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              sx={{ mt: 1 }}
            >
              <FormControl
                sx={{ m: 1 }}
                variant='outlined'
                fullWidth
                error={errors.username ? true : false}
              >
                <InputLabel htmlFor='outlined-adornment-username'>
                  Username
                </InputLabel>
                <OutlinedInput
                  {...register('username')}
                  id='outlined-adornment-username'
                  label='Username'
                  placeholder='usename:baobaodev'
                />
                <FormHelperText>
                  {errors.username ? errors.username.message : ''}
                </FormHelperText>
              </FormControl>
              <FormControl
                sx={{ m: 1 }}
                variant='outlined'
                fullWidth
                error={errors.password ? true : false}
              >
                <InputLabel htmlFor='outlined-adornment-password'>
                  Password
                </InputLabel>
                <OutlinedInput
                  {...register('password')}
                  id='outlined-adornment-password'
                  type={showpassword ? 'text' : 'password'}
                  placeholder='password:123456'
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='toggle password visibility'
                        onClick={() => setShowpassword(!showpassword)}
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
                  label='Password'
                />
                <FormHelperText>
                  {errors.password ? errors.password.message : ''}
                </FormHelperText>
              </FormControl>

              <Button
                type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2 }}
              >
                Login
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Login;
