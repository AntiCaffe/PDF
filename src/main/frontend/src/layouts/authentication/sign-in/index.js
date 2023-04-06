import { useState } from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "assets/images/bg-login.jpg";

export default function SignIn() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const movePage = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!id || !password) {
      alert("ID, 비밀번호를 입력해주세요!");
    } else if (id === "user01" && password === "password01") {
      movePage("/dashboard/main-page");
    } else {
      alert("잘못된 ID 또는 비밀번호입니다.");
    }
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
            backgroundColor: "rgba(200, 200, 200, 0.6)",
            borderRadius: "10px",
            padding: "20px",
          }}
          onSubmit={handleLogin}
        >
          <h1
            style={{
              textAlign: "center",
              backgroundColor: "green",
              color: "white",
              borderRadius: "10px",
              marginTop: "-40px",
              padding: "10px",
            }}
          >
            Sign In
          </h1>
          <input
            type="text"
            placeholder="ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
            style={{ margin: "10px", padding: "10px" }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ margin: "10px", padding: "10px" }}
          />
          <button
            type="submit"
            style={{ margin: "10px", padding: "10px", borderRadius: "5px" }}
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
