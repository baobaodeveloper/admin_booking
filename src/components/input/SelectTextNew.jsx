import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  OutlinedInput,
} from '@mui/material';
import React from 'react';

const SelectTextNew = ({
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
        htmlFor='demo-simple-select-label'
      >
        {label}
      </InputLabel>
      <Select
        {...register(name)}
        labelId='demo-simple-select-label'
        id='demo-simple-select'
        input={<OutlinedInput label={label} />}
        defaultValue={defaultValue}
      >
        {items.map((item) => (
          <MenuItem key={item.key} value={`${item.key}`}>
            {`${item.value}`}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>
        {errors[name] ? errors[name].message : ''}
      </FormHelperText>
    </FormControl>
  );
};

export default SelectTextNew;
