import React from "react";
import * as yup from "yup";
import PopUpModal from "../../PopupModal";
import FormProvider from "../../hook-form/FormProvider";
import {
  Stack,
  Grid,
  FormControl,
  InputLabel,
  Select,
  Typography,
  Box,
  Chip,
} from "@mui/material";
import RHFTextField from "../../hook-form/RHFTextField";
import RHFSelectField from "../../hook-form/RHFSelectField";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

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

const formSchema = yup.object().shape({
  surname: yup.string().required("Surname is required"),
  firstName: yup.string().required("First name is required"),
  middleName: yup.string().required("Middle name is required"),
  gender: yup.string().required("Gender is required"),
  email: yup.string().required("Email address is required"),
  dateofbirth: yup.date().typeError("Date of birth is required"),
  // dateofbirth: yup.date()
  //   .transform(function (value, originalValue) {
  //     if (isType(value)) {
  //       return value;
  //     }
  //     const result = parse(originalValue, "dd.MM.yyyy", new Date());
  //     return result;
  //   })
  //   .typeError("please enter a valid date")
  //   .required()
  //   .min("1969-11-13", "Date is too early"),
  stateoforigin: yup.string().required("State of origin is required"),
  address: yup.string().required("Contact address is required"),
  institution: yup.string().required("Institution is required"),
  course: yup.string().required("Course is required"),
  level: yup.number().required("Level is required"),
  // firstInternship: yup.string().required("Pick an option"),
  year: yup.number().when("firstInternship", {
    is: (value) => value === "no",
    then: () => yup.number().required(),
    otherwise: () => yup.string(),
  }),
  duration: yup.string().when("firstInternship", {
    is: (value) => value === "no",
    then: () => yup.string().required(),
    // otherwise: () => yup.string(),
  }),
  organization: yup.string().when("firstInternship", {
    is: (value) => value === "no",
    then: () => yup.string().required(),
    // otherwise: () => yup.string(),
  }),
  // duration: yup.string().required("Duration is required"),
  // organization: yup.string().required("Organization is required"),
  interest: yup
    .array()
    .min(1, "Please select at least one option.")
    .max(3, "You can only select up to three options."),
  reasonitems: yup
    .string()
    .required("Your reason for choosing ITeMS is required"),
  expectations: yup.string().required("This field is required"),
  explainInterest: yup.string().required("This field is required"),
  skills: yup.string().required("This field is required"),
});
function ShowInternDetails({ activeIntern, handleClose, showDetails }) {
  console.log(activeIntern);
  const methods = useForm({
    defaultValues: {
      // photo: "",
      surname: "",
      firstName: "",
      middleName: "",
      gender: "placeholder",
      // dateofbirth: dayjs(Date.now()),
      dateofbirth: undefined,
      email: "",
      stateoforigin: "",
      address: "",
      interest: [],
      institution: "",
      course: "",
      year: "",
      organization: "",
      duration: "",
      level: "",
      firstInternship: "",
      reasonitems: "",
      expectations: "",
      explainInterest: "",
      skills: "",
    },
    resolver: yupResolver(formSchema),
  });
  const inputFieldColor = {
    textColor: "black",
    boxShadow: "0px 2px 2px 0px #00000040, 0px 2px 2px 0px #00000040 inset",
    color: "#E6E6E6",
  };
  return (
    <PopUpModal
      openPopUp={showDetails}
      handleClose={handleClose}
      borderRadius="15px"
      maxWidth="md"
    >
      <FormProvider methods={methods}>
        <Stack spacing={{ xs: 3, sm: 5 }}>
          <Grid
            container
            sx={{ maxWidth: "100%" }}
            spacing={{ md: 5 }}
            rowSpacing={{ xs: 3, md: 0 }}
          >
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              <RHFTextField
                textColor={inputFieldColor.textColor}
                boxShadow={inputFieldColor.boxShadow}
                color={inputFieldColor.color}
                name="email"
                placeholder={activeIntern.email}
                label="Email"
                inputProps={{
                    readOnly: true,
                  }}
              />

              <RHFTextField
                textColor={inputFieldColor.textColor}
                boxShadow={inputFieldColor.boxShadow}
                color={inputFieldColor.color}
                placeholder={activeIntern.expectations}
                name="expectation"
                label="Expectations"
                multiline
                rows={6}
                inputProps={{
                    readOnly: true,
                  }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              <RHFTextField
                textColor={inputFieldColor.textColor}
                boxShadow={inputFieldColor.boxShadow}
                color={inputFieldColor.color}
                name="title"
                placeholder={activeIntern.stateoforigin}
                label="State of origin"
                inputProps={{
                    readOnly: true,
                  }}
              />

              <RHFTextField
                textColor={inputFieldColor.textColor}
                boxShadow={inputFieldColor.boxShadow}
                color={inputFieldColor.color}
                placeholder={activeIntern.reasonitems}
                label="Reason(s) for chossing ITeMS"
                name="message"
                multiline
                rows={6}
                inputProps={{
                    readOnly: true,
                  }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              <RHFTextField
                textColor={inputFieldColor.textColor}
                boxShadow={inputFieldColor.boxShadow}
                color={inputFieldColor.color}
                name="internship"
                placeholder={activeIntern.firstInternship}
                label="First Internship?"
                inputProps={{
                    readOnly: true,
                  }}
              />
              <RHFTextField
                textColor={inputFieldColor.textColor}
                boxShadow={inputFieldColor.boxShadow}
                color={inputFieldColor.color}
                name="title"
                placeholder={activeIntern.internshipDetails.year}
                label="Internship (year)"
                inputProps={{
                    readOnly: true,
                  }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              <RHFTextField
                textColor={inputFieldColor.textColor}
                boxShadow={inputFieldColor.boxShadow}
                color={inputFieldColor.color}
                name="title"
                placeholder={activeIntern.internshipDetails.organization}
                label="Internship (Organization)"
                inputProps={{
                    readOnly: true,
                  }}
              />
              <RHFTextField
                textColor={inputFieldColor.textColor}
                boxShadow={inputFieldColor.boxShadow}
                color={inputFieldColor.color}
                name="title"
                placeholder={activeIntern.internshipDetails.duration}
                label="Internship (duration)"
                inputProps={{
                    readOnly: true,
                  }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              <Grid item xs={12} sm={12}>
                <FormControl sx={{ marginTop: "20px" }} fullWidth>
                  <InputLabel id="demo-multiple-name-label">
                    Special Interest
                  </InputLabel>
                  <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    multiple
                    value={activeIntern.interest}
                    inputProps={{
                        readOnly: true,
                      }}
                    // value={specialty}
                    // onChange={handleChange}
                    // name="interest"
                    // {...register("interest")}
                    // {...register("interest")}
                    renderValue={(selected, index) => (
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {selected?.map((value, index) => (
                          <Chip
                            key={value}
                            label={index + 1 + "." + " " + value}
                          />
                        ))}
                      </Box>
                    )}
                    // input={<OutlinedInput label="Special Interest" />}
                    MenuProps={MenuProps}
                  >
                    {/* {names.map((name) => (
                      <MenuItem
                        key={name}
                        value={name}
                        style={getStyles(name, specialty, theme)}
                      >
                        {name}
                      </MenuItem>
                    ))} */}
                  </Select>
                </FormControl>
                <Typography variant="body2">
                  Top three area of interest
                </Typography>
                {/* <Typography sx={{ color: "red" }}>
                  {errors.interest?.message}
                </Typography> */}
              </Grid>

              <RHFTextField
                textColor={inputFieldColor.textColor}
                boxShadow={inputFieldColor.boxShadow}
                color={inputFieldColor.color}
                placeholder={activeIntern.explainInterest}
                name="expectation"
                label="Reason(s) for selecting your interests"
                multiline
                rows={6}
                inputProps={{
                    readOnly: true,
                  }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              <RHFTextField
                textColor={inputFieldColor.textColor}
                boxShadow={inputFieldColor.boxShadow}
                color={inputFieldColor.color}
                name="level"
                placeholder={activeIntern.level}
                label="Level"
                inputProps={{
                    readOnly: true,
                  }}
              />

              <RHFTextField
                textColor={inputFieldColor.textColor}
                boxShadow={inputFieldColor.boxShadow}
                color={inputFieldColor.color}
                placeholder={activeIntern.address}
                label="Address"
                name="address"
                multiline
                inputProps={{
                    readOnly: true,
                  }}
                rows={6}
              />
            </Grid>
          </Grid>
        </Stack>
      </FormProvider>
    </PopUpModal>
  );
}

export default ShowInternDetails;
