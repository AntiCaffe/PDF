import { useState } from "react";
import { TextField, InputAdornment } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";

function EmailField({ onChange }) {
  const [su_email, setSignupEm] = useState("");
  const [emailError, setEmailError] = useState(false);

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setSignupEm(value);
    onChange(value);

    // 이메일 유효성 검사를 위한 정규표현식
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;

    if (!emailRegex.test(value)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  };

  return (
    <TextField
      id="setEmail"
      label="E-mail"
      value={su_email}
      onChange={handleEmailChange}
      variant="standard"
      margin="normal"
      error={emailError}
      helperText={emailError ? "유효한 이메일 주소를 입력하세요." : ""}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <EmailIcon />
          </InputAdornment>
        ),
      }}
      sx={{ width: "80%", marginBottom: "1vh" }}
    />
  );
}

export default EmailField;
