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

        localStorage.setItem("token", response.data);

        navigate("/main");

    } catch (error) {

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

          <button
            className="login-btn"
            onClick={login}
          >
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