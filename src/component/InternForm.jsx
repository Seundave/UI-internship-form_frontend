import React, { useState, useRef, useEffect } from "react";
import {
  Paper,
  Stack,
  Typography,
  Box,
  Grid,
  TextField,
  Select,
  MenuItem,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  InputLabel,
  OutlinedInput,
  Button,
  Chip,
  IconButton,
} from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import universityLogo from "../assets/university.png";
import { useDispatch } from "react-redux";
import { useTheme } from "@mui/material/styles";
import { Controller, useForm } from "react-hook-form";
import { CloudArrowUp } from "@phosphor-icons/react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { formSchema } from "../validation/formSchema";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import axios from "axios";

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

const names = [
  "Network Design",
  "Hardware",
  "Software",
  "Graphic Design",
  "Cybersecurity",
  "Web design",
  "Broadcasting",
];

function getStyles(name, specialty, theme) {
  return {
    fontWeight:
      specialty.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const InternForm = () => {
  const [radioOption, setRadioOption] = useState("");
  const [gender, setGender] = useState("");
  const theme = useTheme();
  const dispatch = useDispatch()
  const [specialty, setSpecialty] = React.useState([]);

  const [image, setImage] = useState();
  const inputRef = useRef(null);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSpecialty(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    console.log(specialty);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setImage(event.dataTransfer.files[0]);
  };

  const handleImageClick = () => {
    inputRef.current.click();
  };

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

  const {
    reset,
    register,
    setError,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors },
  } = methods;

  useEffect(() => {
    register("firstInternship");
  }, [register]);

  const firstintern = watch("firstinternship", "");
  const photo = watch("photo", "");
  const interest = watch("interest", []);
  const yearofbirth = watch("yearofbirth");

  // console.log(data)

  const handleImageChange = (event) => {
    setValue("photo", event.target.files[0]);
  };

  const onSubmit = async (data) => {
    try {
      let formattedData = {
        surname: data.surname,
        firstName: data.firstName,
        middleName: data.middleName,
        gender: data.gender,
        dateofbirth: data.dateofbirth,
        email: data.email,
        stateoforigin: data.stateoforigin,
        address: data.address,
        interest: data.interest,
        institution: data.institution,
        course: data.course,
        level: data.level,
        firstInternship: data.firstInternship,
        internshipDetails: {
          year: data.year || "",
          duration: data.duration || "",
          organization: data.organization || "",
        },
        reasonitems: data.reasonitems,
        expectations: data.expectations,
        explainInterest: data.explainInterest,
        skills: data.skills,
      };
      const res = await axios.post(
        "http://localhost:5000/register",
        formattedData
      );
      console.log(res);
      toast.success("Form submitted successfully!");
      window.location.reload();
      if (res) {
        reset();
        window.location.reload();
        setValue("gender", "placeholder");
        setRadioOption("");
      }
    } catch (error) {
      toast.error(error.response.data.message)
      console.log("Error submitting internship form", error);
    }
  };
  const handleRadioChange = (e) => {
    const radioValue = e.target.value;
    setRadioOption(radioValue);
    setValue("firstInternship", radioValue);
  };

  // const handleSelectGender = (e) => {
  //   setGender(e.target.value);
  //   setValue("gender", e.target.value);
  // };

  return (
    <>
      <Stack
        sx={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "auto",
          width: { xs: "100%", sm: "75%", md: "50%" },
          marginX: "auto",
        }}
      >
        <Stack
          sx={{
            // width: "600px",
            // marginX: "auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: "250px",
              height: "250px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <img src={universityLogo} alt="UI-logo" style={{ width: "100%" }} />
          </Box>
          <Box>
            <Typography variant="h4" sx={{ textAlign: "center" }}>
              Internship IT & Media Service University of Ibadan
            </Typography>
          </Box>
        </Stack>
        <Box sx={{ width: "100%" }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container>
              {/* <Grid item xs={12} sm={12}>
                <Stack
                  spacing={{ xs: 1, sm: 0 }}
                  direction="row"
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  sx={{
                    border: "1px dashed #DCE0E4",
                    borderRadius: "10px",
                    marginTop: "50px",
                    marginRight: "auto",
                    marginLeft: "auto",
                    justifyContent: "center",
                    alignItems: "center",
                    maxWidth: "100%",
                    paddingY: "40px",
                  }}
                >
                  <Box
                    sx={{
                      height: { xs: "50px", sm: "115px" },
                      width: { xs: "50px", sm: "125px" },
                      pl: { xs: 1, sm: 0 },
                      alignItems: "center",
                      marginRight: { xs: "0px", sm: "30px" },
                    }}
                  >
                    {photo ? (
                      <img
                        style={{ width: "100%", height: "100%" }}
                        src={URL.createObjectURL(photo)}
                        alt="school-logo"
                      />
                    ) : (
                      <img
                        style={{ width: "100%", height: "100%" }}
                        src={universityLogo}
                        alt="brighton-logo"
                      />
                    )}
                  </Box>
                  <Stack
                    // spacing={3}
                    style={{
                      // width: "318.9px",
                      alignItems: "center",
                      maxWidth: "100%",
                    }}
                  >
                    <IconButton
                      sx={{ width: "fit-content", bgcolor: "white" }}
                      onChange={handleImageChange}
                      onClick={handleImageClick}
                    >
                      <CloudArrowUp size={32} color="black" />
                      <input
                        // name="photo"
                        {...register("photo")}
                        type="file"
                        ref={inputRef}
                        hidden
                        accept="image/*"
                      />
                    </IconButton>
                    <Typography
                      fontSize={{ xs: "8px", sm: "13px" }}
                      sx={{ textAlign: "center" }}
                    >
                      Click to upload or drag and drop your image (JPG){" "}
                    </Typography>
                  </Stack>
                </Stack>
                <Typography color="red">{errors.photo?.message}</Typography>
              </Grid> */}
              <Grid item xs={12} sm={12} sx={{ marginTop: "20px" }}>
                {/* <label>Surname</label> */}
                <TextField
                  placeholder="Surname"
                  sx={{ marginTop: "10px" }}
                  {...register("surname")}
                  fullWidth
                />
                <Typography sx={{ color: "red" }}>
                  {errors.surname?.message}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} sx={{ marginTop: "20px" }}>
                {/* <label>First name</label> */}
                <TextField
                  placeholder="First name"
                  sx={{ marginTop: "10px" }}
                  {...register("firstName")}
                  fullWidth
                />
                <Typography sx={{ color: "red" }}>
                  {errors.firstName?.message}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} sx={{ marginTop: "20px" }}>
                {/* <label>Middle name</label> */}
                <TextField
                  placeholder="Middle name"
                  sx={{ marginTop: "10px" }}
                  {...register("middleName")}
                  fullWidth
                />
                <Typography sx={{ color: "red" }}>
                  {errors.middleName?.message}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} sx={{ marginTop: "20px" }}>
                <Select
                  defaultValue="placeholder"
                  // sx={{ color: "#CDCDCD" }}

                  // onChange={handleSelectGender}
                  {...register("gender")}
                  fullWidth
                >
                  <MenuItem value="placeholder">Gender</MenuItem>
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                </Select>
                <Typography sx={{ color: "red" }}>
                  {errors.gender?.message}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} sx={{ marginTop: "20px" }}>
                {/* <label>Middle name</label> */}
                <TextField
                  placeholder="Email address"
                  sx={{ marginTop: "10px" }}
                  {...register("email")}
                  fullWidth
                />
                <Typography sx={{ color: "red" }}>
                  {errors.email?.message}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={12}>
                <Controller
                  name="dateofbirth"
                  control={control} // Pass the control object from useForm()
                  render={({ field }) => (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        {...field}
                        sx={{ width: "100%", marginTop: "20px" }}
                        slotProps={{
                          textField: {
                            placeholder: "Date of birth",
                          },
                        }}
                        format="DD/MM/YYYY"
                        fullWidth
                      />
                    </LocalizationProvider>
                  )}
                />
                <Typography sx={{ color: "red" }}>
                  {errors.dateofbirth?.message}
                </Typography>
                {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    sx={{ width: "100%", marginTop: "20px" }}
                    slotProps={{
                      textField: {
                        ...register("dateofbirth"),
                        placeholder: "Date of birth",
                      },
                    }}
                    format="DD/MM/YYYY"
                    fullWidth
                  />
                </LocalizationProvider>
                <Typography sx={{ color: "red" }}>
                  {errors.dateofbirth?.message}
                </Typography> */}
              </Grid>

              <Grid item xs={12} sm={12} sx={{ marginTop: "20px" }}>
                {/* <label>State of Origin</label> */}
                <TextField
                  placeholder="State of Origin"
                  sx={{ marginTop: "10px" }}
                  {...register("stateoforigin")}
                  fullWidth
                />
                <Typography sx={{ color: "red" }}>
                  {errors.stateoforigin?.message}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={12} sx={{ marginTop: "20px" }}>
                {/* <label>Contact Address</label> */}
                <TextField
                  placeholder="Contact Address"
                  sx={{ marginTop: "10px" }}
                  {...register("address")}
                  fullWidth
                />
                <Typography sx={{ color: "red" }}>
                  {errors.address?.message}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={12} sx={{ marginTop: "20px" }}>
                {/* <label>Institution</label> */}
                <TextField
                  placeholder="Institution"
                  sx={{ marginTop: "10px" }}
                  {...register("institution")}
                  fullWidth
                />
                <Typography sx={{ color: "red" }}>
                  {errors.institution?.message}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={12} sx={{ marginTop: "20px" }}>
                {/* <label>Course</label> */}
                <TextField
                  placeholder="Course"
                  sx={{ marginTop: "10px" }}
                  {...register("course")}
                  fullWidth
                />
                <Typography sx={{ color: "red" }}>
                  {errors.course?.message}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={12} sx={{ marginTop: "20px" }}>
                {/* <label>Level</label> */}
                <Select
                  defaultValue="placeholder"
                  sx={{ color: "#CDCDCD" }}
                  {...register("level")}
                  fullWidth
                >
                  <MenuItem value="placeholder">Level</MenuItem>
                  <MenuItem value="200">200</MenuItem>
                  <MenuItem value="300">300</MenuItem>
                  <MenuItem value="400">400</MenuItem>
                </Select>
                <Typography sx={{ color: "red" }}>
                  {errors.level?.message}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={12}>
                <Typography sx={{ marginTop: "20px" }}>
                  Is this your first Internship as an Undergraduate?
                </Typography>

                <FormControl>
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={radioOption}
                    onChange={handleRadioChange}
                  >
                    <FormControlLabel
                      value="yes"
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value="no"
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                </FormControl>

                <Typography sx={{ color: "red" }}>
                  {errors.firstInternship?.message}
                </Typography>
              </Grid>

              {radioOption === "no" && (
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      placeholder="Year"
                      {...register("year")}
                      // sx={{ marginTop: "10px" }}
                      fullWidth
                    />
                  </Grid>
                  <Typography sx={{ color: "red" }}>
                    {errors.year?.message}
                  </Typography>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      placeholder="Company/Organization"
                      // sx={{ marginTop: "10px" }}
                      {...register("organization")}
                      fullWidth
                    />
                    <Typography sx={{ color: "red" }}>
                      {errors.company?.message}
                    </Typography>
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <Select
                      defaultValue="placeholder"
                      sx={{ color: "#CDCDCD" }}
                      {...register("duration")}
                      fullWidth
                    >
                      <MenuItem value="placeholder">Duration (weeks)</MenuItem>
                      <MenuItem value="1week">1 week</MenuItem>
                      <MenuItem value="2weeks">2 weeks</MenuItem>
                      <MenuItem value="3weeks">3 weeks</MenuItem>
                      <MenuItem value="4weeks">4 weeks</MenuItem>
                      <MenuItem value="5weeks">5 weeks</MenuItem>
                      <MenuItem value="6weeks">6 weeks</MenuItem>
                      <MenuItem value="7weeks">7 weeks</MenuItem>
                    </Select>
                    <Typography sx={{ color: "red" }}>
                      {errors.duration?.message}
                    </Typography>
                  </Grid>
                </Grid>
              )}

              <Grid item xs={12} sm={12}>
                <TextField
                  placeholder="What is your reason for choosing ITeMS?"
                  multiline
                  rows={6}
                  sx={{ marginTop: "30px" }}
                  {...register("reasonitems")}
                  fullWidth
                />
                <Typography sx={{ color: "red" }}>
                  {errors.reasonitems?.message}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={12}>
                <TextField
                  placeholder="What are your expectations or goals for this internship?"
                  multiline
                  rows={6}
                  sx={{ marginTop: "30px" }}
                  {...register("expectations")}
                  fullWidth
                />
                <Typography sx={{ color: "red" }}>
                  {errors.expectations?.message}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={12}>
                <FormControl sx={{ marginTop: "20px" }} fullWidth>
                  <InputLabel id="demo-multiple-name-label">
                    Special Interest
                  </InputLabel>
                  <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    multiple
                    value={interest}
                    // value={specialty}
                    // onChange={handleChange}
                    // name="interest"
                    {...register("interest")}
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
                    {names.map((name) => (
                      <MenuItem
                        key={name}
                        value={name}
                        style={getStyles(name, specialty, theme)}
                      >
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Typography variant="body2">
                  Pick three top area of interest
                </Typography>
                <Typography sx={{ color: "red" }}>
                  {errors.interest?.message}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={12}>
                <TextField
                  placeholder="Provide brief explanation why you selected the three area above"
                  multiline
                  rows={6}
                  sx={{ marginTop: "30px" }}
                  {...register("explainInterest")}
                  fullWidth
                />
                <Typography sx={{ color: "red" }}>
                  {errors.explainInterest?.message}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={12}>
                <TextField
                  placeholder="What special skills do you have?"
                  multiline
                  rows={6}
                  sx={{ marginTop: "30px" }}
                  {...register("skills")}
                  fullWidth
                />
                <Typography sx={{ color: "red" }}>
                  {errors.skills?.message}
                </Typography>
              </Grid>
            </Grid>

            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{
                marginTop: "20px",
                marginBottom: "20px",
              }}
              fullWidth
            >
              {" "}
              Submit
            </Button>
          </form>
        </Box>
      </Stack>
    </>
  );
};

export default InternForm;
