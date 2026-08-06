import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
        <div>
            <h1>SmartTax</h1>
            <p>회원가입</p>

            <div>
                <label>아이디</label>
                <br />
                <input
                    type="text"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                />
            </div>

            <br />

            <div>
                <label>비밀번호</label>
                <br />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <br />

            <div>
                <label>이름</label>
                <br />
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>

            <br />

            <div>
                <label>이메일</label>
                <br />
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <br />

            <button onClick={signup}>
                회원가입
            </button>
        </div>
    );
}

export default Signup;