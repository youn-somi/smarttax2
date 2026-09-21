import { useState } from "react"
import { data, useNavigate } from "react-router-dom"
import DaumPostcode from "react-daum-postcode"
import "./Signup.css"

function Signup() {
  const [formData, setFormData] = useState({
    userId: "",
    password: "",
    name: "",
    email: "",
    address: ""
  })
  const [isAddressOpen, setIsAddressOpen] = useState(false)
  const [userIdChecked, setUserIdChecked] = useState(false)
  const [userIdMessage, setUserIdMessage] = useState("")
  const navigate = useNavigate()

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
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
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

    fetch("/api/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
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
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
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