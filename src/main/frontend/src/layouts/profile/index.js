import React, { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import bgImage from "src/assets/images/wave-blue-1.png";
import { TextField, Grid, Box, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton, Button } from "@mui/material";
import { AuthContext } from "src/contexts/AuthContext";

function handleLogout() {
  // 로그아웃 기능 구현
  // 필요한 로직을 추가해야 합니다.
}

const ProfilePage = () => {
  // 프로필 정보
  const { id, password } = useContext(AuthContext);

  const movePage = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    movePage("/dashboard/main-page/");
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
            <h1>홍길동님</h1>
            <h2>안녕하세요 !</h2>
          </div>
        </div>
        <div className="top profile-container">
          <div className="typo-container">
            <Typography>ID: {id}</Typography>
            <Typography>Email</Typography>
            <Typography>Phone</Typography>
          </div>
          <Button sx={{ color: "black" }}>회원정보 수정</Button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
