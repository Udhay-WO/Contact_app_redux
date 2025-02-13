import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setLocalStorageData } from "./LocalStorageOperation";
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

const SignUpContainer = styled(Stack)(({ theme }) => ({
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

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [confirmError, setConfirmError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [confirmErrorMessage, setConfirmErrorMessage] = React.useState("");
  const [nameError, setNameError] = React.useState(false);
  const [nameErrorMessage, setNameErrorMessage] = React.useState("");

  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const validateInputs = (e) => {
    e.preventDefault();
    let isValid = true;
    if (!name || name.length < 1) {
      setNameError(true);
      setNameErrorMessage("Name is required.");
      isValid = false;
    } else {
      setNameError(false);
      setNameErrorMessage("");
    }
    if (!email) {
      setEmailError(true);
      setEmailErrorMessage("Please enter  email address.");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address.");
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }
    if (!password || password.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 6 characters long.");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }
    
    if (password !== confirmPassword) {
      setConfirmError(true);
      setConfirmErrorMessage("password and confirm password does not match");
      isValid = false;
    } else {
      setConfirmError(false);
      setConfirmErrorMessage("");
    }
    
    if (isValid) {
      const data = {
        name,
        email,
        password,
        contact: [],
      };
      const formdata = JSON.parse(localStorage.getItem("users") || "[]");
      formdata.push(data);
      setLocalStorageData(formdata);
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      navigate("/");
    }
  };

  return (
    <>
      <CssBaseline enableColorScheme />
      <SignUpContainer
        direction="column"
        justifyContent="space-between"
        height="100vh"
      >
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "1.5rem" }}
          >
            Sign up
          </Typography>
          <Box
            component="form"
            sx={{ display: "flex", flexDirection: "column", gap: 1 }}
          >
            <FormControl>
              <FormLabel htmlFor="name">Full name</FormLabel>
              <TextField
                autoComplete="name"
                name="name"
                required
                fullWidth
                id="name"
                placeholder="Enter name"
                error={nameError}
                value={name}
                onChange={handleName}
                helperText={nameErrorMessage}
                color={nameError ? "error" : "primary"}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                required
                fullWidth
                id="email"
                placeholder="your@email.com"
                name="email"
                autoComplete="email"
                variant="outlined"
                value={email}
                onChange={handleEmail}
                error={emailError}
                helperText={emailErrorMessage}
                color={emailError ? "error" : "primary"}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                required
                fullWidth
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                variant="outlined"
                value={password}
                onChange={handlePassword}
                error={passwordError}
                helperText={passwordErrorMessage}
                color={passwordError ? "error" : "primary"}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="confirmpassword">Confirm Password</FormLabel>
              <TextField
                required
                fullWidth
                name="confirmpassword"
                placeholder="••••••"
                type="password"
                id="confirmpassword"
                variant="outlined"
                value={confirmPassword}
                onChange={handleConfirmPassword}
                error={confirmError}
                helperText={confirmErrorMessage}
                color={confirmError ? "error" : "primary"}
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={validateInputs}
            >
              Sign up
            </Button>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography sx={{ textAlign: "center" }}>
              Already have an account? <NavLink to="/">Sign in</NavLink>
            </Typography>
          </Box>
        </Card>
      </SignUpContainer>
    </>
  );
}
