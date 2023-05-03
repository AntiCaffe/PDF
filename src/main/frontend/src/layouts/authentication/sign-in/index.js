import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";
import { TextField, Grid, Box, InputAdornment } from "@mui/material";
import {
  Person as PersonIcon,
  PhoneIphone as PhoneIphoneIcon,
  Badge as BadgeIcon,
} from "@mui/icons-material";
import EmailField from "components/emailField";
import ToglePasswordField from "components/toglePassword";
import bgImage from "assets/images/TaeApril22.jpg";
import "./index.css";

export default function SignIn() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const [su_id, setSignupId] = useState("");
  const [su_pw, setSignupPw] = useState("");
  const [su_name, setSignupName] = useState("");
  const [su_email, setSignupEm] = useState("");
  const [su_ad, setSignupAdid] = useState("");
  const [su_phone, setSignupPh] = useState("");

  const movePage = useNavigate();
  const [showSignUp, setShowSignUp] = useState(false);
  const [hideSignUp, setHideSignUp] = useState(false);

  const onClickLogin = () => {
    console.log("click login");
    console.log("nickname : ", id);
    console.log("PW : ", password);
    axios
      .post("http://localhost:8080/authentication/sign-in", {
        nickname: id,
        pw: password,
      })
      .then((res) => {
        console.log(res);
        if (res.data.nickname === undefined) {
          // id 일치하지 않는 경우 userId = undefined, msg = '입력하신 id 가 일치하지 않습니다.'
          alert("입력하신 id 가 일치하지 않습니다.");
        } else if (res.data.nickname === null) {
          // id는 있지만, pw 는 다른 경우 userId = null , msg = undefined
          alert("입력하신 비밀번호 가 일치하지 않습니다.");
        } else if (res.data.nickname === id) {
          sessionStorage.setItem("user_id", id); // sessionStorage에 id를 user_id라는 key 값으로 저장
          movePage("/dashboard/main-page");
        }
      })
      .catch((error) => {
        console.error("API 호출 중 오류가 발생했습니다.", error);
        alert("로그인 중 오류가 발생했습니다. 다시 시도해주세요.");
      });
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
        su_pw: su_pw,
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

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handlePwValue = (value) => {
    setSignupPw(value);
  };

  const handleEmailValue = (value) => {
    setSignupEm(value);
  };

  return (
    <Box className="bg-image" style={{ backgroundImage: `url(${bgImage})` }}>
      <Grid className="signin-form-style">
        <Grid item>
          <h1 className="banner-center">Sign In</h1>
        </Grid>
        <Grid item sx={{ marginTop: "2vh" }}>
          <TextField
            id="id-input"
            label="ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
            variant="outlined"
            margin="normal"
            fullWidth
            sx={{ zIndex: 0 }}
          />
        </Grid>
        <Grid item sx={{ marginTop: "1vh" }}>
          <TextField
            id="password-input"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
            margin="normal"
            fullWidth
            sx={{ zIndex: 0 }}
          />
        </Grid>
        <Grid item sx={{ marginTop: "2.5vh" }}>
          <Button
            type="button"
            variant="contained"
            onClick={onClickLogin}
            sx={{ width: "100%" }}
          >
            로그인
          </Button>
        </Grid>

        <Grid item sx={{ marginTop: "1vh" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-end",
            }}
          >
            <p style={{ margin: "1.5vh", textAlign: "center" }}>
              아직 회원이 아니신가요? &nbsp;
              <a
                className="blue-emphasis"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={() => setShowSignUp(true)}
              >
                회원가입
              </a>
              {showSignUp && (
                <div
                  className={`sign-up ${
                    hideSignUp
                      ? "slide-out-opacity"
                      : showSignUp
                      ? "slide-in-opacity"
                      : ""
                  }`}
                  onAnimationEnd={() => {
                    if (hideSignUp) {
                      setShowSignUp(false);
                      setHideSignUp(false);
                    }
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      marginBottom: "10px",
                    }}
                  >
                    <span
                      className="close-btn"
                      onClick={() => {
                        setHideSignUp(true);
                      }}
                    >
                      &times;
                    </span>
                  </div>
                  <div style={{ marginTop: "8vh" }}>
                    <h2 className="response-header">
                      관리자 계정을 만들어주세요!
                    </h2>
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

                      <ToglePasswordField onChange={handlePwValue} />

                      <EmailField onChange={handleEmailValue} />

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
                      <Grid container spacing={1} alignItems="flex-end">
                        <Grid item xs={6}>
                          <TextField
                            id="setName"
                            label="Name"
                            value={su_name}
                            onChange={(e) => setSignupName(e.target.value)}
                            variant="standard"
                            margin="normal"
                            sx={{ width: "100%", marginBottom: "1vh" }}
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
                            sx={{ width: "100%", marginBottom: "1vh" }}
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
                        Already have an account? &nbsp;
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
                </div>
              )}
            </p>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
