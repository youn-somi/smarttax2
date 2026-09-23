import  {useState} from "react"
import {Link} from "react-router-dom"
import axios from "axios"
import "./Login.css"

function FindId() {
  const [email, setEmail] = useState("")
  const [foundId, setFoundId] = useState("")

  async function findId() {
    if (!email) {
      alert("이메일을 입력해주세요.")
      return
    }
    try {
      const response = await axios.post (
        "http://localhost:8080/api/users/find-id",
        {params : {email: email}}
      )

      setFoundId(response.data)

    } catch(error) {
      alert("해당 이메일로 가입된 아이디가 없습니다.")
    }
  }

  return (
    <div className="login-page">

      <div className="login-left">
        <img
        src="/images/login_left_illustration.png"
        alt="find id"
        className="login-image"
        />
      </div>
      <div className="login-right">
      <div className="login-card">

        <h1 className="logo">SmartTax</h1>
        <p className="sub-title">아이디 찾기</p>

        <div className="input-box">
          <label>이메일</label>
          <input 
          type="text"
          value={email}
          onChange={(e)=> setEmail(e.target.value)}
          />
        
        </div>

        <button className="login-btn" onClick={findId}>
         확인
        </button>

        {foundId && (
          <p className="sub-title">
            가입된 아이디: {foundId}
          </p>
        )}
        <div className="back-link-box">
       <Link to="/login">로그인으로 돌아가기 </Link>
       </div>
        </div>
        </div>
        </div>
  )
}

export default FindId