import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "assets/images/TaeApril22.jpg";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import "./index.css";
//import Dashboard from "layouts/dashboard/main-page";

export default function SignIn() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [loginText, setLoginText] = useState(""); // loginText변수는 로그인 placeholder로 합니다.
  const movePage = useNavigate();
  const [showSignUp, setShowSignUp] = useState(false);
  const [hideSignUp, setHideSignUp] = useState(false);

  const onClickLogin = () => {
    console.log("click login");
    console.log("ID : ", id);
    console.log("PW : ", password);
    axios
      .post("http://localhost:8080/authentication/sign-in", {
        id: id,
        pw: password,
      })
      .then((res) => {
        console.log(res);
        console.log("res.data.userId :: ", res.data.userId);
        console.log("res.data.msg :: ", res.data.msg);
        if (res.data.id === undefined) {
          // id 일치하지 않는 경우 userId = undefined, msg = '입력하신 id 가 일치하지 않습니다.'
          console.log("======================", res.data.msg);
          alert("입력하신 id 가 일치하지 않습니다.");
        } else if (res.data.id === null) {
          // id는 있지만, pw 는 다른 경우 userId = null , msg = undefined
          console.log(
            "======================",
            "입력하신 비밀번호 가 일치하지 않습니다."
          );
          alert("입력하신 비밀번호 가 일치하지 않습니다.");
        } else if (res.data.id === id) {
          // id, pw 모두 일치 userId = userId1, msg = undefined
          console.log("======================", "로그인 성공");
          sessionStorage.setItem("user_id", id); // sessionStorage에 id를 user_id라는 key 값으로 저장
          sessionStorage.setItem("name", res.data.name); // sessionStorage에 id를 user_id라는 key 값으로 저장
        }
        // 작업 완료 되면 페이지 이동(새로고침)
        document.location.href = "dashboard/main-page";
      })
      .catch();
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!id || !password) {
      alert("ID, 비밀번호를 입력해주세요!");
    } else {
      axios
        .post("/api/login", { id, password })
        .then((response) => {
          // 로그인 성공 처리
          movePage("/");
        })
        .catch((error) => {
          // 로그인 실패 처리
          alert("잘못된 ID 또는 비밀번호입니다.");
          console.error(error);
        });
    }
  };

  /*
  const handleSignup = () => {
    movePage("/authentication/sign-up");
  };
 */
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
          onSubmit={handleLogin}
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
            type="submit"
            variant="contained"
            style={{
              margin: "15px 0",
              padding: "10px",
              borderRadius: "5px",
              backgroundColor: "#1976d2",
              color: "white",
            }}
            //onClick={onClickLogin}
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
                class="signup-link"
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
                  class={hideSignUp ? "slide-out-opacity" : "slide-in-opacity"}
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
