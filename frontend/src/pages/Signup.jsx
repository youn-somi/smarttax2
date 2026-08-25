import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Signup.css";
import { Link } from "react-router-dom";

function Signup() {

    // 아이디 입력값
    const [userId, setUserId] = useState("");

    // 비밀번호 입력값
    const [password, setPassword] = useState("");

    // 이름 입력값
    const [name, setName] = useState("");

    // 이메일 입력값
    const [email, setEmail] = useState("");

    // 아이디 중복확인 결과 메시지
    const [checkMessage, setCheckMessage] = useState("");

    // 페이지 이동 기능
    const navigate = useNavigate();


    // 아이디 중복확인
    const checkUserId = async () => {

        // Spring에 아이디 중복확인 요청
        const response = await axios.get(
            "http://localhost:8080/api/users/check-userId",
            {
                params: {
                    userId: userId,
                },
            }
        );

        // 아이디가 이미 존재하는 경우
        if (response.data) {

            setCheckMessage("이미 존재하는 아이디입니다.");

        } else {

            // 아이디가 존재하지 않는 경우
            setCheckMessage("");

        }
    };


    // 회원가입
    const signup = async () => {

        // Spring 회원가입 API 호출
        const response = await axios.post(
            "http://localhost:8080/api/users/signup",
            {
                userId: userId,
                password: password,
                name: name,
                email: email,
            }
        );

        // Spring에서 받은 결과 확인
        console.log(response.data);

        // 회원가입 성공 후 메인으로 이동
        navigate("/main");
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

                    <h1 className="logo">
                        SmartTax
                    </h1>

                    <p className="sub-title">
                        회원가입
                    </p>


                    {/* 아이디 입력 */}
                    <div className="input-box">

                        <label>
                            아이디
                        </label>

                        {/* 아이디 입력창 + 중복확인 버튼 */}
                        <div className="id-input-row">

                            <input
                                type="text"
                                value={userId}
                                onChange={(e) => setUserId(e.target.value)}
                            />

                            <button
                                type="button"
                                onClick={checkUserId}
                            >
                                중복확인
                            </button>

                        </div>

                        {/* 중복확인 결과 메시지 */}
                        <p className="check-message">
                            {checkMessage}
                        </p>

                    </div>


                    {/* 비밀번호 입력 */}
                    <div className="input-box">

                        <label>
                            비밀번호
                        </label>

                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                    </div>


                    {/* 이름 입력 */}
                    <div className="input-box">

                        <label>
                            이름
                        </label>

                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                    </div>


                    {/* 이메일 입력 */}
                    <div className="input-box">

                        <label>
                            이메일
                        </label>

                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                    </div>


                    {/* 회원가입 버튼 */}
                    <button
                        className="signup-btn"
                        onClick={signup}
                    >
                        회원가입
                    </button>


                    {/* 로그인 페이지 이동 */}
                    <div className="login-link">

                        이미 계정이 있으신가요?

                        <Link to="/">
                            로그인
                        </Link>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Signup;