import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import CryptoJS from "crypto-js";
import MuiCard from "@mui/material/Card";
import SnackDemo from "./SnackDemo";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateContactList } from "../Store/Slice/ContactSlice";
import {
  getLocalStorageData,
  setSessionStorageIsLoggedIn,
  setSessionStorageEmail,
} from "./LocalStorageOperation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    width: "450px",
  },
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
  minHeight: "100%",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
    ...theme.applyStyles("dark", {
      backgroundImage:
        "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
    }),
  },
}));

const schema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Please enter an email address"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters long")
    .required("Please enter your password"),
});

export default function SignIn() {
  const [open, setOpen] = useState(true);
  const [authenticationMessage, setAuthenticationMessage] = React.useState(
    sessionStorage.getItem("message")
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    const { email, password } = data;
    const storedData = getLocalStorageData();
    const validEmail = storedData?.find((item) => item.email === email);
    if (validEmail) {
      const secretKey = "my-secret-key";
      const bytes = CryptoJS.AES.decrypt(validEmail.password, secretKey);
      const decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);
      if (decryptedPassword === password) {
        setSessionStorageEmail(email);
        setSessionStorageIsLoggedIn();
        sessionStorage.setItem("message", "Login successful");
        const contactData = getLocalStorageData();
        dispatch(updateContactList(contactData));
        navigate("/contactform");
      } else {
        setOpen(true);
        setAuthenticationMessage("Invalid user email address or password");
      }
    } else {
      setOpen(true);
      setAuthenticationMessage("Invalid user email address or password");
    }
  };
  return (
    <>
      <CssBaseline enableColorScheme />
      <SignInContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            Sign in
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: 2,
            }}
          >
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                error={!!errors.email}
                helperText={errors.email?.message}
                id="email"
                type="email"
                name="email"
                placeholder="your@email.com"
                autoComplete="email"
                autoFocus
                required
                fullWidth
                {...register("email")}
                variant="outlined"
                color={errors.email ? "error" : "primary"}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                error={!!errors.password}
                helperText={errors.password?.message}
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="current-password"
                autoFocus
                required
                fullWidth
                {...register("password")}
                variant="outlined"
                color={errors.password ? "error" : "primary"}
              />
            </FormControl>
            <Button type="submit" fullWidth variant="contained">
              Sign in
            </Button>
          </Box>
          <Divider>or</Divider>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography sx={{ textAlign: "center" }}>
              Don&apos;t have an account?
              <NavLink to="/signup"> Sign up</NavLink>
            </Typography>
          </Box>
        </Card>
      </SignInContainer>
      <SnackDemo open={open} set={setOpen} message={authenticationMessage} />
    </>
  );
}
