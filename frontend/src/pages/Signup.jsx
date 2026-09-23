import { useState } from "react" 
import { useNavigate } from "react-router-dom" 
import DaumPostcode from "react-daum-postcode" 
import "./Signup.css" 
 
function Signup() { 
  const [formData, setFormData] = useState({ 
    userId: "", 
    password: "", 
    confirmPassword:"",
    name: "", 
    email: "", 
    address: "" 
  }) 
  const [isAddressOpen, setIsAddressOpen] = useState(false) 
  const [userIdChecked, setUserIdChecked] = useState(false) 
  const [userIdMessage, setUserIdMessage] = useState("") 
  const navigate = useNavigate() 
  const [emailDomain, setEmailDomain] = useState("naver.com")
  const [emailLocal, setEmailLocal] = useState("")
  const [isCustomDomain, setIsCustomDomain] = useState(false)
 
  const handleCheckUserId = () => { 
    if (formData.userId === "") { 
      alert ("아이디를 먼저 입력해주세요.") 
      return 
    } 
 
    fetch(`/api/users/check-userId?userId=${formData.userId}`) 
    .then ((res)=> res.json()) 
    .then ((data) =>  { 
      if(data === true) { 
        setUserIdChecked(false) 
        setUserIdMessage("이미 사용 중인 아이디입니다.") 
        alert("이미 사용 중인 아이디입니다.") 
      } else { 
        setUserIdChecked(true) 
        setUserIdMessage("사용 가능한 아이디입니다.") 
        alert("사용 가능한 아이디입니다.") 
      } 
    }) 
    .catch((err) => console.error("check error:", err)) 
  } 
 
 
  const handleChange = (e) => { 
    const { name, value } = e.target 
 
    if( name === "userId") { 
      setUserIdChecked(false) 
      setUserIdMessage("") 
    } 
    setFormData((prev) => ({ 
      ...prev, 
      [name]: value 
    })) 
  } 

  const handleDomainChange = (e) => {
    const value = e.target.value

    if(value ==="직접입력") {
      setEmaillDomain("")
    } else {
      setIsCustomDomain(false)
      setEmailDomain(value)
    }
  }
 
  const handleCompleteAddress = (data) => { 
    let fullAddress = data.address 
    let extraAddress = "" 
 
    if (data.addressType === "R") { 
      if (data.bname !== "") { 
        extraAddress += data.bname 
      } 
      if (data.buildingName !== "") { 
        extraAddress += extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName 
      } 
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "" 
    } 
 
    setFormData((prev) => ({ 
      ...prev, 
      address: fullAddress 
    })) 
 
    setIsAddressOpen(false) 
  } 
 
  const handleSubmit = (e) => { 
    e.preventDefault() 
    if (formData.password !== formData.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.")
      return
    }
    const passwordRegex =  /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/

    if(!passwordRegex.test(formData.password)) {
      alert("비밀번호는 8자 이상, 특수문자를 포함해야 합니다.")
      return
    }
    const fullEmail = `${emailLocal}@${emailDomain}`
 
    fetch("/api/users/signup", { 
      method: "POST", 
      headers: { 
        "Content-Type": "application/json" 
      }, 
      body: JSON.stringify({...formData, email: fullEmail}) 
    }) 
      .then((res) => { 
        if (res.ok) { 
          alert("회원가입이 완료되었습니다!") 
          navigate("/login") 
        } else { 
          alert("회원가입에 실패했습니다.") 
        } 
      }) 
      .catch((err) => console.error("Signup error:", err)) 
  } 

 
  return ( 
    <div className="signup-container"> 
      <h1>회원가입</h1> 
      <form onSubmit={handleSubmit}> 
        <div className="input-field"> 
          <label>아이디</label> 
          <input 
            type="text" 
            name="userId" 
            value={formData.userId} 
            onChange={handleChange} 
            required 
          /> 

          <button type="button" onClick={handleCheckUserId}> 
            중복확인 
          </button> 

        </div> 
 
        <div className="input-field"> 
          <label>비밀번호</label> 
          <input 
            type="password" 
            name="password" 
            value={formData.password} 
            onChange={handleChange} 
            required 
          /> 
        </div>

        <div className="input-field">
          <label>비밀번호 확인 </label>
          <input 
          type="password" 
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          
          />
          </div> 
 
        <div className="input-field"> 
          <label>이름</label> 
          <input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            required 
          /> 
        </div> 
 
        <div className="input-field"> 
          <label>이메일</label> 
          <div className="email-wrapper">
            <input 
            type="text" 
            placeholder="이메일 앞부분"
            value={emailLocal}
            onChange={(e)=> setEmailLocal(e.target.value)}
            required
            />
            <span>@</span>
            {isCustomDomain ? (
              <input
              type="text"
              placeholder="도메인 입력"
              value={emailDomain}
              onChange={(e)=> setEmailDomain(e.target.value)}
              required
              />

            ) : (
              <select 
              value={emailDomain}
              onChange={handleDomainChange}
              > 
               <option value="naver.com">naver.com</option>
                   <option value="gmail.com">gmail.com</option>
        <option value="daum.net">daum.net</option>
        <option value="kakao.com">kakao.com</option>
        <option value="직접입력">직접입력</option>
              </select>

            )}
 
            </div>
          
        </div> 
 
        <div className="input-field"> 
          <label>주소</label> 
          <div className="address-wrapper"> 
            <input 
              type="text" 
              name="address" 
              value={formData.address} 
              readOnly 
              placeholder="주소를 검색하세요" 
            /> 
            <button 
              type="button" 
              onClick={() => setIsAddressOpen(!isAddressOpen)} 
            > 
              {isAddressOpen ? "닫기" : "주소 검색"} 
            </button> 
          </div> 
 
          {isAddressOpen && ( 
            <div className="postcode-container"> 
              <DaumPostcode onComplete={handleCompleteAddress} /> 
            </div> 
          )} 
        </div> 
 
        <button type="submit" className="btn-submit"> 
          가입하기 
        </button> 
      </form> 
    </div> 
  ) 
} 
 
export default Signup