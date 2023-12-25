import React, { useState } from "react";
import { Stack, Typography, Box, Grid, TextField, Button } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../../validation/loginSchema";
import universityLogo from "../../../assets/university.png";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {useDispatch, useSelector} from "react-redux"
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios'
import { signInFailure, signInStart, signInSuccess } from "../../../redux/user/user";

function LoginPage() {
  // const [loading, setLoading] = useState(false);
  const { loading, error, currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const methods = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(loginSchema),
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

  const onSubmit = async (data) => {
    try {
      dispatch(signInStart())
      const res = await axios.post("http://localhost:5000/signin", data);
      dispatch(signInSuccess(res.data))
      toast.success("Login successfully!");
      navigate("/intern");
      console.log("User logged in successfully", res.data);
    } catch (error) {
      console.log(error.response.data.message)
      dispatch(signInFailure(error))
      toast.error(error.response.data.message);
    }
  };

 
  if (currentUser) {
    return <Navigate to="/intern" />;
  }

  return (
    <Stack
      sx={{
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "auto",
        width: { xs: "100%", sm: "75%", md: "30%" },
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
            Login to check Interns
          </Typography>
        </Box>
      </Stack>
      <Box sx={{ width: "100%" }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container>
            <Grid item xs={12} sm={12} sx={{ marginTop: "20px" }}>
              <TextField
                name="email"
                placeholder="Email address"
                sx={{ marginTop: "10px" }}
                {...register("email")}
                fullWidth
              />
              <Typography sx={{ color: "red" }}>
                {errors.email?.message}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} sx={{ marginTop: "20px" }}>
              <TextField
                name="password"
                placeholder="Password"
                sx={{ marginTop: "10px" }}
                {...register("password")}
                fullWidth
              />
              <Typography sx={{ color: "red" }}>
                {errors.password?.message}
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
            Login
          </Button>
        </form>
      </Box>
    </Stack>
  );
}

export default LoginPage;
