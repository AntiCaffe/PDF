import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import logo from "assets/images/logo.png";
import "./index.css";
import { IconButton, Button } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import { animateScroll as scroll } from "react-scroll";
import NormalImageGallery from "components/normalGallery";
import DefectImageGallery from "components/defectGallery";

function handleLogout() {
  // 로그아웃 기능 구현
  // 필요한 로직을 추가해야 합니다.
}

function Dashboard() {
  const [total, setTotal] = useState(0);
  const [normal, setNormal] = useState(0);
  const [bad, setBad] = useState(0);
  const [imageList, setImageList] = useState([]);

  const movePage = useNavigate();

  const normalRef = useRef(null);
  const defectRef = useRef(null);

  const handleScrollToNormal = () => {
    const offset = window.innerHeight / 2; // 중간에 보이도록 스크롤
    scroll.scrollTo(normalRef.current.offsetTop - offset, {
      duration: 500,
      smooth: true,
    });
  };

  const handleScrollToDefect = () => {
    scroll.scrollTo(defectRef.current.offsetTop, {
      duration: 500,
      smooth: true,
    });
  };

  return (
    <div>
      <div className="menu-bar">
        <div className="menu-set">
          <a className="menu-item" onClick={handleScrollToNormal}>
            정상항목
          </a>
          <a className="menu-item" onClick={handleScrollToDefect}>
            결함항목
          </a>
        </div>
      </div>
      <div className="container position-relative">
        <img
          className="logo"
          src={logo}
          alt="PDF Logo"
          title="PCB 결함 탐지 서비스"
        ></img>
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
            onClick={() => movePage("/profile")} //있으면 로그인으로 돌아가도록
          >
            profile
          </Button>
        </div>
      </div>
      <div className="hero"></div>
      <h1 className="color-set">
        PCB 결함 탐지 <br /> 실시간 상황판
      </h1>
      <div className="container">
        <p className="color-set text-center">
          <span className="last-updated">
            마지막 업데이트: 2023. 5. 16 오전 09:40
            <IconButton>
              <RefreshIcon className="refresh-icon" />
            </IconButton>
          </span>
        </p>
      </div>
      <div className="top container">
        <h2>상태 현황</h2>
        <div className="row">
          <div className="text-box text-center">
            <p className="number">50,000</p>
            <p>Total</p>
          </div>
          <div className="text-box text-center">
            <p className="number red">7</p>
            <p>Defect</p>
          </div>
          <div className="text-box text-center">
            <p className="number green">49,993</p>
            <p>Normal</p>
          </div>
        </div>
      </div>
      <div className="alert-top">
        <div className="container">
          <div className="new-feature">
            <div class="alert alert-defect">신규 발견 결함품: +2</div>
          </div>
        </div>
      </div>
      <div ref={normalRef}>
        <NormalImageGallery />
      </div>
      <div className="divider"></div>
      <div ref={defectRef}>
        <DefectImageGallery />
      </div>
    </div>
  );
}

export default Dashboard;
