import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import axios from "axios";
import bgImage from "src/assets/images/wave-blue-1.png";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton, Button, TextField, InputAdornment } from "@mui/material";
import { AuthContext } from "src/contexts/AuthContext";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Close } from "@mui/icons-material";

function handleLogout() {
  // 로그아웃 기능 구현
  // 필요한 로직을 추가해야 합니다.
}

const ProfilePage = () => {
  // 프로필 정보
  const { id, password, setPassword, logout } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [adminId, setIsAdmin] = useState("");

  const [passwordField, setPasswordField] = useState("");
  const [emailField, setEmailField] = useState(email);
  const [phoneField, setPhoneField] = useState(phone);

  const [error, setError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const movePage = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const handleClick = () => {
    movePage("/dashboard/main-page/");
  };

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/profile/${id}`);
        const { data } = response;

        console.log(data); // 서버의 response 확인

        // name, phone, email, adminId만 추출하여 변수에 저장
        const { name, phone, email, adminId } = data;

        setName(name);
        setEmail(email);
        setPhone(phone);
        setIsAdmin(adminId);

        setEmailField(email);
        setPhoneField(phone);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  const [showFullNumber, setShowFullNumber] = useState(false);
  const handleToggleVisibility = () => {
    setShowFullNumber(!showFullNumber);
  };

  const [showEditForm, setShowEdit] = useState(true);

  const profileEditToggle = () => {
    setShowEdit(!showEditForm);
  };

  const handlePasswordUpdate = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/profile/updatePW",
        {
          pw: passwordField,
          nickname: id,
        }
      );
      const { pw } = response.data;

      setPassword(pw);
      setPasswordField("");
      alert("비밀번호가 성공적으로 변경되었습니다!");
    } catch (error) {
      console.log(error);
    }
  };

  const handleMemberUpdate = async () => {
    if (password === passwordField) {
      try {
        const response = await axios.post(
          "http://localhost:8080/profile/updateMember",
          {
            nickname: id,
            email: emailField,
            phone: phoneField,
          }
        );

        const { email, phone } = response.data;

        // 클라이언트의 email과 phone 상태를 업데이트
        setEmail(email);
        setPhone(phone);

        alert("회원정보가 성공적으로 변경되었습니다!");
        profileEditToggle();
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("비밀번호가 일치하지 않습니다");
    }
  };

  const handleMemberWithdrawal = async () => {
    if (password === passwordField) {
      try {
        const response = await axios.get(`/delete/${id}`);
        alert(
          "탈퇴가 완료되었습니다. 확인을 누르시면 로그인 페이지로 돌아갑니다."
        );
        movePage("/authentication/sign-in");
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("비밀번호가 일치하지 않습니다");
    }
  };

  function validatePassword(password) {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{10,}$/;
    return regex.test(password);
  }

  function handlePasswordChange(e) {
    const password = e.target.value;
    setPasswordField(password);
    const isValid = validatePassword(password);
    setError(!isValid);
    console.log("Is valid password:", isValid);
  }

  const handleEmailChange = (e) => {
    const email = e.target.value;
    setEmailField(email);
    setEmailError(!validateEmail(email)); // 이메일 유효성 검사 결과에 따라 에러 상태 업데이트
  };

  // 이메일 주소의 유효성을 검사하는 함수
  const validateEmail = (email) => {
    // 이메일 주소에 대한 정규식 패턴
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email); // 정규식 패턴에 일치하는지 확인
  };

  function handleLogout() {
    // context에서 id와 password를 초기화하는 작업 수행
    logout();
    // 인증/로그인 페이지로 이동
    movePage("/authentication/sign-in");
  }

  return (
    <div className="set-maxheight">
      <div>
        <div className="icon-container">
          <IconButton
            aria-label="back"
            sx={{ color: "white" }}
            onClick={handleClick}
          >
            <ArrowBackIcon />
          </IconButton>
        </div>
        <div className="menu-selector">
          <Button
            variant="outlined"
            size="small"
            sx={{
              color: "white",
              borderColor: "white",
              margin: "0 10px",
              "&:hover": {
                borderColor: "white",
                backgroundColor: "rgba(255, 255, 255, 0.5)",
              },
            }}
            onClick={handleLogout}
          >
            로그아웃
          </Button>
        </div>
      </div>
      <div>
        <div className="background-hero"></div>
        <div className="image-container">
          <img
            className="background-img disable-select"
            src={bgImage}
            alt="Background Image"
          ></img>
        </div>
      </div>

      <div className="set-top">
        <div className="title-container">
          <div className="name-id-text">
            <h1>{name}님</h1>
            <h2>안녕하세요 !</h2>
          </div>
        </div>
        {showEditForm ? (
          <div className="top profile-container">
            <div className="typo-container">
              <div className="info-text">
                <p className="font-title">아이디</p>
                <p className="font-body">{id}</p>
              </div>
              <div className="divider"></div>
              <div className="info-text">
                <p className="font-title">이메일</p>
                <p className="font-body">{email}</p>
              </div>
              <div className="divider"></div>
              <div className="info-text">
                <p className="font-title">전화번호</p>
                <p className="font-body">
                  {phone.slice(0, 3)}-{phone.slice(3, 7)}-{phone.slice(7)}
                </p>
              </div>
              <div className="divider"></div>
              <div className="info-text">
                <p className="font-title">관리자 번호</p>
                <p className="font-body">
                  {showFullNumber
                    ? adminId
                    : adminId.substr(0, 4) +
                      (adminId.length > 4
                        ? "*".repeat(adminId.length - 4)
                        : "no admin id")}
                </p>

                <span
                  style={{ float: "right", cursor: "pointer", color: "gray" }}
                  onClick={handleToggleVisibility}
                >
                  {showFullNumber ? <VisibilityOff /> : <Visibility />}
                </span>
              </div>
              <div className="divider"></div>
            </div>
            <div className="set-to-center set-to-bottom">
              <Button variant="outlined" onClick={profileEditToggle}>
                회원정보 수정
              </Button>
            </div>
          </div>
        ) : (
          <div className="top edit-container">
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <IconButton
                onClick={profileEditToggle}
                sx={{
                  left: "5.5vw", // 현재 위치에서 오른쪽으로 이동시키는 속성
                }}
              >
                <Close />
              </IconButton>
            </div>
            <div className="typo-container">
              <div className="info-text">
                <p className="font-title">아이디</p>
                <TextField
                  variant="standard"
                  size="small"
                  defaultValue={id}
                  fullWidth
                  disabled
                />
              </div>
              <div className="divider"></div>
              <div className="info-text">
                <p className="font-title">비밀번호</p>
                <TextField
                  variant="standard"
                  size="small"
                  fullWidth
                  type={showPassword ? "text" : "password"}
                  value={passwordField}
                  onChange={handlePasswordChange}
                  error={error}
                  helperText={
                    error
                      ? "비밀번호는 10자리 이상의 영어와 숫자만 입력해주세요."
                      : ""
                  }
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
              </div>
              <div className="divider"></div>
              <div className="info-text">
                <p className="font-title">이메일</p>
                <TextField
                  variant="standard"
                  size="small"
                  fullWidth
                  value={emailField}
                  onChange={handleEmailChange}
                  error={emailError}
                  helperText={
                    emailError ? "유효한 이메일 주소를 입력하세요." : ""
                  }
                />
              </div>
              <div className="divider"></div>
              <div className="info-text">
                <p className="font-title">전화번호</p>
                <TextField
                  variant="standard"
                  size="small"
                  fullWidth
                  value={phoneField}
                  onChange={(e) => setPhoneField(e.target.value)}
                />
              </div>
              <div className="divider"></div>
              <div className="info-text">
                <p className="font-title">관리자 번호</p>
                <TextField
                  variant="standard"
                  size="small"
                  defaultValue={adminId}
                  fullWidth
                  disabled
                />
              </div>
              <div className="divider"></div>
            </div>
            <div className="set-to-center set-to-bottom">
              <Button
                variant="outlined"
                size="small"
                sx={{ margin: "0 1vw 0 1vw" }}
                onClick={handlePasswordUpdate}
              >
                비밀번호 수정
              </Button>
              <Button
                variant="outlined"
                onClick={handleMemberUpdate}
                size="small"
                sx={{ margin: "0 1vw 0 1vw" }}
              >
                변경내용 저장
              </Button>
              <Button
                variant="outlined"
                color="error"
                size="small"
                onClick={handleMemberWithdrawal}
                sx={{ margin: "0 1vw 0 1vw" }}
              >
                회원탈퇴
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
