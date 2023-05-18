import React from "react";
import "./index.css";
import bgImage from "src/assets/images/wave-blue-1.png";
import { TextField, Grid, Box } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton, Button } from "@mui/material";

function handleLogout() {
  // 로그아웃 기능 구현
  // 필요한 로직을 추가해야 합니다.
}

const ProfilePage = () => {
  // 프로필 정보
  const profile = {
    name: "이름",
    username: "아이디",
    phoneNumber: "전화번호",
    email: "이메일",
  };

  return (
    <div>
      <div>
        <div>
          <ArrowBackIcon />
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
        <img src={bgImage}></img>
      </div>
    </div>
  );
};

export default ProfilePage;
