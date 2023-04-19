import React, { useState } from "react";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function ToglePasswordField() {
  const [showPassword, setShowPassword] = useState(false);
  const [su_pw, setSignupPw] = useState("");

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChangePassword = (event) => {
    setSignupPw(event.target.value);
  };

  return (
    <TextField
      id="setPW"
      label="Password"
      type={showPassword ? "text" : "password"}
      value={su_pw}
      onChange={handleChangePassword}
      margin="normal"
      variant="standard"
      sx={{ width: "80%", marginBottom: "1vh" }}
      InputProps={{
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
