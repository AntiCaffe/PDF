import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { TextField, Grid, Box, InputAdornment } from "@mui/material";
import {
  Person as PersonIcon,
  PhoneIphone as PhoneIphoneIcon,
  Badge as BadgeIcon,
} from "@mui/icons-material";
import Button from "@mui/material/Button";
import EmailtextField from "components/emailField";
import ToglePasswordtextField from "components/toglePassword";

export default function SignUp() {
  const [su_id, setSignupId] = useState("");
  const [su_pw, setSignupPw] = useState("");
  const [su_name, setSignupName] = useState("");
  const [su_email, setSignupEm] = useState("");
  const [su_ad, setSignupAdid] = useState("");
  const [su_phone, setSignupPh] = useState("");

  const movePage = useNavigate();

  /* handleMouse 구현 */
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const onClickSignup = () => {
    console.log("click signup");
    console.log("ID : ", su_id);
    console.log("PW : ", su_pw);
    console.log("Name : ", su_name);
    console.log("Admin : ", su_ad);
    console.log("Email: ", su_email);
    console.log("Phone : ", su_phone);
    axios
      .post("http://localhost:8080/authentication/sign-up", {
        su_nickname: su_id,
        su_password: su_pw,
        su_name: su_name,
        su_adminId: su_ad,
        su_email: su_email,
        su_phone: su_phone,
      })
      .then((res) => {
        console.log("Response : ", res);
        if (res.data.su_nickname === null && res.data.su_adminId !== null) {
          alert("이미 등록되어있거나 올바르지 않은 아이디입니다.");
        } else if (
          res.data.su_nickname !== null &&
          res.data.su_adminId === null
        ) {
          alert("올바르지 않은 관리자 번호입니다.");
        } else if (
          res.data.su_nickname === null &&
          res.data.su_adminId === null
        ) {
          alert("올바르지 않은 아이디, 관리자 번호입니다.");
        } else {
          alert("회원가입이 완료되었습니다.");
          movePage("/authentication/");
        }
      })
      .catch((error) => {
        console.error("API 호출 중 오류가 발생했습니다.", error);
        alert("회원가입 중 오류가 발생했습니다. 다시 시도해주세요.");
      });
  };

  const handlePwValue = (value) => {
    setSignupPw(value);
  };

  const handleEmailValue = (value) => {
    setSignupEm(value);
  };

  return (
    <div style={{ marginTop: "8vh" }}>
      <h2 className="response-header">관리자 계정을 만들어주세요!</h2>
      <div className="signup-form-style">
        <TextField
          id="setID"
          label="ID"
          value={su_id}
          onChange={(e) => setSignupId(e.target.value)}
          variant="standard"
          margin="normal"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon />
              </InputAdornment>
            ),
          }}
          sx={{ width: "80%", marginBottom: "1vh" }}
        />

        <ToglePasswordtextField onChange={handlePwValue} />

        <EmailtextField onChange={handleEmailValue} />

        <TextField
          id="setPhone"
          label="Phone"
          value={su_phone}
          onChange={(e) => setSignupPh(e.target.value)}
          variant="standard"
          margin="normal"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PhoneIphoneIcon />
              </InputAdornment>
            ),
          }}
          sx={{ width: "80%", marginBottom: "1vh" }}
        />
        <Grid
          container
          spacing={1}
          alignItems="center"
          sx={{ width: "82%", marginBottom: "1vh" }}
          // width %로 위의 textField와 가로 길이 맞추었음
        >
          <Grid item xs={6}>
            <TextField
              id="setName"
              label="Name"
              value={su_name}
              onChange={(e) => setSignupName(e.target.value)}
              variant="standard"
              margin="normal"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="setAdminID"
              label="관리자 ID"
              value={su_ad}
              onChange={(e) => setSignupAdid(e.target.value)}
              variant="standard"
              margin="normal"
            />
          </Grid>
        </Grid>

        <Button
          type="button"
          variant="contained"
          onClick={onClickSignup}
          sx={{ width: "80%", marginTop: "4vh" }}
        >
          회원가입
        </Button>
        <hr />
        <div style={{ marginTop: "3vh" }}>
          이미 회원가입을 하셨나요? &nbsp;
          <a
            className="blue-emphasis"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={() => movePage("/authentication/")} //있으면 로그인으로 돌아가도록
          >
            로그인
          </a>
        </div>
      </div>
    </div>
  );
}
