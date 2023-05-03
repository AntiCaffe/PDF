import React, { useState } from "react";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import LockIcon from "@mui/icons-material/Lock";

function ToglePasswordField({ onChange }) {
  const [showPassword, setShowPassword] = useState(false);
  const [su_pw, setSignupPw] = useState("");

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChangePassword = (event) => {
    const value = event.target.value;
    setSignupPw(value);
    onChange(value);
  };

  return (
    <TextField
      id="setPW"
      label="Password"
      value={su_pw}
      onChange={handleChangePassword}
      type={showPassword ? "text" : "password"}
      margin="normal"
      variant="standard"
      sx={{ width: "80%", marginBottom: "1vh" }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <LockIcon />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handlePasswordVisibility}>
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}

export default ToglePasswordField;
