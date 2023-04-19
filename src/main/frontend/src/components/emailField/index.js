import { useState } from "react";
import TextField from "@mui/material/TextField";

const EmailField = () => {
  const [su_email, setSignupEm] = useState("");
  const [emailError, setEmailError] = useState(false);

  const handleEmailChange = (e) => {
    const email = e.target.value;
    setSignupEm(email);

    // 이메일 유효성 검사를 위한 정규표현식
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;

    if (!emailRegex.test(email)) {
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
      sx={{ width: "80%", marginBottom: "1vh" }}
    />
  );
};

export default EmailField;
