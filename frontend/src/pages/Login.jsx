import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login(){
    let [userId, setUserId] = useState("");
    let [password, setPassword] = useState(""); 
    const navigate = useNavigate();

  async function login() {
    const response = await axios.post(
        "http://localhost:8080/api/users/login",
        {
            userId: userId,
            password: password,
        }
    );

    console.log(response.data);
    localStorage.setItem("token", response.data);
    navigate("/main");
}
    

    return(
        <>
            <div>

                <h1>SmartTax</h1>
                <p>세금계산서 관리 시스템</p>

                <div>
                    <label>아이디</label>
                    <br/>
                    <input
                        type="text"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                    />
                </div>

                <br/>


                <div>
                    <label>비밀번호</label>
                    <br/>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <br/>

                <button onClick={login}>
                    로그인
                </button>

                <button
                    style={{ marginLeft: "10px" }}
                    onClick={() => navigate("/signup")}
                >
                    회원가입
                </button>

            </div>
        </>
    )
}

export  default Login