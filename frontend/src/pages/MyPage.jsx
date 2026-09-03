import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./MyPage.css"

function MyPage() {
  const [user, setUser] = useState(null)
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
        setUser(data)
      })
      .catch((error) => console.error("MyPage fetch error:", error))
  }, [])

  return (
    <div className="mypage-wrapper">
      <div className="mypage-card">
        <h1 className="mypage-title">마이페이지</h1>

        {user ? (
          <div className="mypage-content">
            <div className="info-group">
              <span className="info-label">이름</span>
              <div className="info-box">{user.userName || user.name}</div>
            </div>

            <div className="info-group">
              <span className="info-label">이메일</span>
              <div className="info-box">{user.email}</div>
            </div>

            <div className="info-group">
              <span className="info-label">주소</span>
              <div className="info-box">
                {user.address || "등록된 주소가 없습니다."}
              </div>
            </div>

            <button
              className="btn-edit-action"
              onClick={() => navigate("/mypage/edit")}
            >
              정보 수정하기
            </button>
          </div>
        ) : (
          <p className="loading-text">사용자 정보를 불러오는 중입니다...</p>
        )}
      </div>
    </div>
  )
}

export default MyPage