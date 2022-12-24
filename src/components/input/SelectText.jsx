import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import React from 'react';

const SelectText = ({
  name,
  label,
  register,
  errors,
  items,
  defaultValue = '',
  className = '',
}) => {
  return (
    <FormControl
      error={errors[name] ? true : false}
      fullWidth
      sx={{ m: 1, ...className }}
    >
      <InputLabel
        className='input-text'
        htmlFor='demo-simple-select-labelt'
      >
        {label}
      </InputLabel>
      <Select
        {...register(name)}
        labelId='demo-simple-select-label'
        id='demo-simple-select'
        label={name}
        defaultValue={defaultValue}
      >
        {items.map((item) => (
          <MenuItem key={item} value={`${item}`}>
            {`${item}`}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>
        {errors[name] ? errors[name].message : ''}
      </FormHelperText>
    </FormControl>
  );
};

export default SelectText;
