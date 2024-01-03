/* eslint-disable react/prop-types */
import {
    FormControl,
    FormHelperText,
    MenuItem,
    Select,
    Stack,
    Typography,
  } from "@mui/material";
  // import { makeStyles } from '@mui/styles';
  import { Controller, useFormContext } from "react-hook-form";
  
  const RHFSelectField = ({
    width,
    name,
    height,
    label,
    boxShadow,
    color,
    textColor,
    data = [],
    placeholder,
    helperText,
    ...other
  }) => {
    const { control } = useFormContext();
  
    const ITEM_HEIGHT = 36;
    const ITEM_PADDING_TOP = 8;
  
  
    const menuProps = {
      PaperProps: {
        style: {
          maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
          width: width
        },
      },
    };
  
    const selectStyle = {
      "& .MuiMenuList-root": {
        height: "150px",
      },
  
      "& .MuiOutlinedInput-root": {
        boxShadow: boxShadow,
        borderRadius: "10px",
      },
      "& .MuiSelect-select": {
        color: textColor,
        padding: "11px 13px",
        boxSizing: "border-box",
        height: height ? height : "auto",
        fontSize: "12px",
      },
      "& .MuiInputLabel-outlined.Mui-focused": {
        color: textColor,
      },
      "& .MuiSvgIcon-root": {
        color: textColor,
      },
  
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: color,
        borderRadius: "10px",
      },
  
      "& .MuiInputBase-formControl": {
        "&.Mui-focused fieldset": {
          borderColor: color,
          color: textColor,
        },
        "&:hover fieldset": {
          borderColor: color,
        },
      },
    };
    return (
      <Stack spacing={0.5} width="100%">
        <Typography fontSize={{ xs: "12px", sm: "14px" }} variant="subtitle1">
          {label}
        </Typography>
  
        <Controller
          name={name}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <FormControl
              error={!!error}
              sx={{ ...selectStyle, borderRadius: "10px" }}
              size="small"
            >
              <Select
                MenuProps={menuProps}
                {...other}
                {...field}
                displayEmpty={true}
              >
                <MenuItem sx={{fontSize: "12px"}} value="" disabled>
                  {placeholder}
                </MenuItem>
                {data?.map((el) => (
                  <MenuItem sx={{fontSize: "12px"}} key={el} value={el}>
                    {el}
                  </MenuItem>
                ))}
              </Select>
  
              <FormHelperText>
                {error ? error?.message : helperText}
              </FormHelperText>
            </FormControl>
          )}
        />
      </Stack>
    );
  };
  
  export default RHFSelectField;
  