import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { FormHelperText } from '@mui/material';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelect({
  list,
  name,
  register,
  errors,
  label,
  defaultValue,
}) {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      typeof value === 'string' ? value.split(',') : value
    );
  };

  return (
    <div>
      <FormControl
        sx={{ m: 1, mt: 4 }}
        fullWidth
        error={errors[name] ? true : false}
      >
        <InputLabel id='demo-multiple-name-label'>{label}</InputLabel>
        <Select
          {...register(name)}
          labelId='demo-multiple-name-label'
          id='demo-multiple-name'
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label={label} />}
          MenuProps={MenuProps}
        >
          {list.map((item) => (
            <MenuItem
              key={item.id}
              value={item.id}
              style={getStyles(name, personName, theme)}
            >
              {item.title}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>
          {errors[name] ? errors[name].message : ''}
        </FormHelperText>
      </FormControl>
    </div>
  );
}
