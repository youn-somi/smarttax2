import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./Login.css";

function Login() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function login() {
  if (!userId || !password) {
    alert("아이디와 비밀번호를 입력해주세요.");
    return;
  }

  try {
    const response = await axios.post(
      "http://localhost:8080/api/users/login",
      {
        userId: userId,
        password: password,
      }
    );

    console.log("로그인 응답 데이터:", response.data);

    // 토큰 값 추출 (문자열, token 키, accessToken 키 대응)
    let token =
      typeof response.data === "string"
        ? response.data
        : response.data?.token || response.data?.accessToken;

    if (token && token !== "undefined") {
      // "Bearer " 문구가 들어있다면 순수 토큰 값만 남기도록 정제
      token = token.replace("Bearer ", "").trim();
      
      localStorage.setItem("token", token);
      console.log("저장된 토큰:", localStorage.getItem("token"));
      
      navigate("/main");
    } else {
      alert("로그인은 성공했으나 토큰을 받아오지 못했습니다.");
    }
  } catch (error) {
    console.error("로그인 에러:", error);
    alert("아이디 또는 비밀번호가 올바르지 않습니다.");
  }
}
  return (
    <div className="login-page">
      <div className="login-left">
        <img
          src="/images/login_left_illustration.png"
          alt="login"
          className="login-image"
        />
      </div>

      <div className="login-right">
        <div className="login-card">
          <h1 className="logo">SmartTax</h1>

          <p className="sub-title">세금계산서 관리 시스템</p>

          <div className="input-box">
            <label>아이디</label>
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
          </div>

          <div className="input-box">
            <label>비밀번호</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="login-btn" onClick={login}>
            로그인
          </button>

          <div className="signup">
            계정이 없으신가요? <Link to="/signup">회원가입</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;