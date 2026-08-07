import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Signup.css";
import { Link } from "react-router-dom";

function Signup() {
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const navigate = useNavigate();

    const signup = async () => {
        const response = await axios.post(
            "http://localhost:8080/api/users/signup",
            {
                userId: userId,
                password: password,
                name: name,
                email: email,
            }
        );

        console.log(response.data);

        navigate("/");
    };

    return (
    <div className="signup-page">

        <div className="signup-left">

            <img
                src="/images/login_left_illustration.png"
                alt="signup"
                className="signup-image"
            />

        </div>

        <div className="signup-right">

            <div className="signup-card">

                <h1 className="logo">SmartTax</h1>

                <p className="sub-title">
                    회원가입
                </p>

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

                <div className="input-box">

                    <label>이름</label>

                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                </div>

                <div className="input-box">

                    <label>이메일</label>

                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                </div>

                <button
                    className="signup-btn"
                    onClick={signup}
                >
                    회원가입
                </button>

                <div className="login-link">
                    이미 계정이 있으신가요?
                    <Link to="/"> 로그인</Link>
                </div>

            </div>

        </div>

    </div>
    );
}

export default Signup;