import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "assets/images/TaeApril22.jpg";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import "./index.css";

export default function SignIn() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
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

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0)",
      }}
    >
      <div>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "rgba(250, 250, 250, 0.9)",
            borderRadius: "10px",
            padding: "20px",
            width: "350px",
            height: "300px",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
          }}
        >
          <h1
            style={{
              textAlign: "center",
              backgroundColor: "green",
              color: "white",
              borderRadius: "10px",
              margin: "-55px auto 0 auto",
              padding: "15px",
              width: "180px",
            }}
          >
            Sign In
          </h1>

          <input
            id="id-input"
            label="ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
            variant="outlined"
            margin="normal"
            fullWidth
            sx={{ zIndex: 0 }}
          />

          <input
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

          <button
            type="button"
            variant="contained"
            style={{
              margin: "15px 0",
              padding: "10px",
              borderRadius: "5px",
              backgroundColor: "#1976d2",
              color: "white",
            }}
            onClick={onClickLogin}
          >
            Sign In
          </button>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-end",
              height: "100%",
            }}
          >
            <p style={{ margin: "10px", textAlign: "center" }}>
              아직 회원이 아니신가요?{" "}
              <span
                className="signup-link"
                style={{
                  color: "blue",
                  cursor: "pointer",
                  fontSize: isHovered ? "1.1em" : "1em",
                  transition: "font-size 0.2s ease-in-out",
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={() => setShowSignUp(true)}
              >
                회원가입
              </span>
              {showSignUp && (
                <div //sign-up
                  className={
                    hideSignUp ? "slide-out-opacity" : "slide-in-opacity"
                  }
                  style={{
                    position: "absolute",
                    right: showSignUp ? "0" : "-100%",
                    top: "0",
                    height: "100%",
                    width: "90%",
                    backgroundColor: "white",
                    borderRadius: "10px",
                    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.4)",
                    padding: "20px",
                  }}
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
                      style={{ cursor: "pointer", fontSize: "1.5em" }}
                      onClick={() => {
                        setHideSignUp(true);
                      }}
                    >
                      &times;
                    </span>
                  </div>
                  <div></div>
                </div>
              )}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
