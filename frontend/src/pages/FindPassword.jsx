import {useState} from "react"
import {Link} from "react-router-dom"
import axios from "axios"
import "./Login.css"

function FindPassword() {
  const [userId, setUserId] = useState("")
  const [email, setEmail] = useState("")
  const [tempPassword, setTempPassword] = useState("")

  async function findPassword() {
    if(!userId || !email) {
      alert("아이디와 이메일을 모두 입력해주세요.")
      return
    }
    try { 
      const response = await axios.post(
        "http://localhost:8080/api/users/find-password",
        {userId : userId, email: email}
        
      )
      setTempPassword(response.data)

    } catch(error) {
      alert( "아이디 또는 이메일이 일치하지 않습니다.")
    }
  }

  return (
      <div className="login-page">
        
        <div className="login-left">
          <img
            src="/images/login_left_illustration.png"
            alt="find password"
            className="login-image"
          />
        </div>

        <div className="login-right">
          <div className="login-card">
            <h1 className="logo">SmartTax</h1>
            <p className="sub-title">비밀번호 찾기</p>

            <div className="input-box">
              <label>아이디</label>
              <input
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
              />
            </div>

            <div className="input-box">
              <label>이메일</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button className="login-btn" onClick={findPassword}>
              확인
            </button>
            {tempPassword && (
              <p className="sub-title">
                임시 비밀번호: {tempPassword}
              </p>
            )}

           <div className="back-link-box">
       <Link to="/login">로그인으로 돌아가기 </Link>
       </div>
          </div>
        </div>
      </div>
  );
}

export default FindPassword;