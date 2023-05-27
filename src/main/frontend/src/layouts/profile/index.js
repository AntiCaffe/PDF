import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import axios from "axios";
import bgImage from "src/assets/images/wave-blue-1.png";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton, Button, TextField } from "@mui/material";
import { AuthContext } from "src/contexts/AuthContext";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function handleLogout() {
  // 로그아웃 기능 구현
  // 필요한 로직을 추가해야 합니다.
}

const ProfilePage = () => {
  // 프로필 정보
  const { id, password, setPassword } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [adminId, setIsAdmin] = useState("");

  const [passwordField, setPasswordField] = useState("");

  const movePage = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    movePage("/dashboard/main-page/");
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
            logout
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
                  type="password"
                  value={passwordField}
                  onChange={(e) => setPasswordField(e.target.value)}
                />
              </div>
              <div className="divider"></div>
              <div className="info-text">
                <p className="font-title">이메일</p>
                <TextField
                  variant="standard"
                  size="small"
                  defaultValue={email}
                  fullWidth
                />
              </div>
              <div className="divider"></div>
              <div className="info-text">
                <p className="font-title">전화번호</p>
                <TextField
                  variant="standard"
                  size="small"
                  defaultValue={phone}
                  fullWidth
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
                onClick={profileEditToggle}
                size="small"
                sx={{ margin: "0 1vw 0 1vw" }}
              >
                변경내용 저장
              </Button>
              <Button
                variant="outlined"
                color="error"
                size="small"
                onClick={profileEditToggle}
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
