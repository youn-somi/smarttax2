import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import DaumPostcode from "react-daum-postcode"
import "./MyPageEdit.css"

function MyPageEdit() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    address: "",
    password: ""
  })
  const [isAddressOpen, setIsAddressOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("token")

    fetch("/api/mypage", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("불러온 마이페이지 데이터:", data)
       setUser({
  name: data.userName || "", 
  email: data.email || "",
  address: data.address || "",
  password: ""
})
      })
      .catch((err) => console.error("마이페이지 정보 조회 에러:", err))
  }, [])

  // 카카오 주소 선택 완료 시 실행
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

    setUser((prevUser) => ({
      ...prevUser,
      address: fullAddress
    }))

    setIsAddressOpen(false)
  }

  // [PUT] 수정 완료 버튼 동작
  const handleUpdate = () => {
    const token = localStorage.getItem("token")

    // 백엔드로 보낼 데이터 정리 (비밀번호를 입력 안 한 경우 전송 객체에서 제외)
    const updatePayload = {
      name: user.name,
      email: user.email,
      address: user.address
    }

    if (user.password && user.password.trim() !== "") {
      updatePayload.password = user.password
    }

    fetch("/api/mypage", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(updatePayload)
    })
      .then(async (response) => {
        if (response.ok) {
          alert("수정이 완료되었습니다!")
          navigate("/mypage")
        } else {
          const errorData = await response.json().catch(() => null)
          alert(
            `수정에 실패했습니다. ${
              errorData?.message ? "(" + errorData.message + ")" : ""
            }`
          )
        }
      })
      .catch((error) => console.error("Update error:", error))
  }

  // [DELETE] 회원 탈퇴 동작
  const handleDelete = () => {
    if (!window.confirm("정말로 탈퇴하시겠습니까?")) return

    const token = localStorage.getItem("token")

    fetch("/api/mypage", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => {
        if (response.ok) {
          alert("회원 탈퇴가 완료되었습니다.")
          localStorage.removeItem("token") // 탈퇴 시 토큰 파기
          navigate("/")
        } else {
          alert("탈퇴 처리에 실패했습니다.")
        }
      })
      .catch((error) => console.error("Delete error:", error))
  }

  return (
    <div className="mypage-container">
      <h1 className="mypage-title">마이페이지 수정</h1>

      {user && (
        <>
          <div className="input-group">
            {/* 이름 입력 항목 */}
            <div className="input-field">
              <label className="input-label">이름</label>
              <input
                type="text"
                className="mypage-input"
                placeholder="이름을 입력하세요"
                value={user.name || ""}
                onChange={(e) =>
                  setUser({
                    ...user,
                    name: e.target.value
                  })
                }
              />
            </div>

            {/* 비밀번호 입력 항목 */}
            <div className="input-field">
              <label className="input-label">비밀번호 (변경 시에만 입력)</label>
              <input
                type="password"
                className="mypage-input"
                placeholder="새 비밀번호를 입력하세요"
                value={user.password || ""}
                onChange={(e) =>
                  setUser({
                    ...user,
                    password: e.target.value
                  })
                }
              />
            </div>

            {/* 이메일 입력 항목 */}
            <div className="input-field">
              <label className="input-label">이메일</label>
              <input
                type="email"
                className="mypage-input"
                placeholder="이메일을 입력하세요"
                value={user.email || ""}
                onChange={(e) =>
                  setUser({
                    ...user,
                    email: e.target.value
                  })
                }
              />
            </div>

            {/* 주소 입력 항목 + 주소 검색 버튼 */}
            <div className="input-field">
              <label className="input-label">주소</label>
              <div className="address-input-wrapper">
                <input
                  type="text"
                  className="mypage-input address-input"
                  placeholder="주소를 검색하세요"
                  value={user.address || ""}
                  readOnly
                />
                <button
                  type="button"
                  className="btn-address-search"
                  onClick={() => setIsAddressOpen(!isAddressOpen)}
                >
                  {isAddressOpen ? "닫기" : "주소 검색"}
                </button>
              </div>

              {/* 카카오 주소 검색 팝업창 레이어 */}
              {isAddressOpen && (
                <div className="postcode-container">
                  <DaumPostcode onComplete={handleCompleteAddress} />
                </div>
              )}
            </div>
          </div>

          <div className="button-group">
            <button type="button" className="btn btn-update" onClick={handleUpdate}>
              수정 완료
            </button>

            <button type="button" className="btn btn-delete" onClick={handleDelete}>
              회원 탈퇴
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default MyPageEdit