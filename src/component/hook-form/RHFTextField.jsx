import PropTypes from "prop-types";
import { useFormContext, Controller } from "react-hook-form";
import { Stack, TextField, Typography } from "@mui/material";

const RHFTextField = ({
  textColor,
  boxShadow,
  label,
  name,
  helperText,
  color,
  ...other
}) => {
  const { control } = useFormContext();

  const textFieldStyles = {
    "& .MuiFormControl-root": {
      borderRadius: "10px",
    },
    "& .MuiInputBase-input": {
      padding: "11px  13px",
      boxSizing: "border-box",
      boxShadow: boxShadow,
      borderRadius: "10px",
      height: "max-content"
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: color,
      borderRadius: "10px",
    },

    "& input": {
      color: textColor ? textColor : color,
    },

    "& .MuiOutlinedInput-root": {
      padding: 0,
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
    <Stack spacing={0.5}>
      <Typography fontSize={{ xs: "12px", sm: "14px" }} variant="subtitle1">
        {label}
      </Typography>

      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            fullWidth
            sx={textFieldStyles}
            value={
              typeof field.value === "number" && field.value === 0
                ? " "
                : field.value
            }
            error={!!error}
            helperText={error ? error?.message : helperText}
            {...other}
          />
        )}
      />
    </Stack>
  );
};

export default RHFTextField;

RHFTextField.propTypes = {
  label: PropTypes.string,
  textColor: PropTypes.string,
  height: PropTypes.string,
  name: PropTypes.string,
  styles: PropTypes.object,
  color: PropTypes.string,
  boxShadow: PropTypes.string,
  helperText: PropTypes.node,
};
