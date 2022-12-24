import {
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
} from '@mui/material';
import React from 'react';

const InputText = ({ errors, name, register, label }) => {
  return (
    <FormControl
      error={errors[name] ? true : false}
      fullWidth
      sx={{ m: 1 }}
      variant='standard'
    >
      <InputLabel
        className='input-text'
        htmlFor='standard-adornment-amount'
      >
        {label}
      </InputLabel>
      <Input
        className='input-text'
        {...register(name)}
        id='standard-adornment-amount'
      />
      <FormHelperText>
        {errors[name] ? errors[name].message : ''}
      </FormHelperText>
    </FormControl>
  );
};

export default InputText;
