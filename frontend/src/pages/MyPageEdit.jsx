import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./MyPageEdit.css" //css 파일연결

function MyPageEdit() {
  // 재료 준비: 유저 정보 담을 그릇과 화면 이동 도구
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  // [GET] 먼저 실행: 화면 열리자마자 기존 유저 정보 불러오기
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
  }, [])

  // [PUT] 나중에 실행: 수정 완료 버튼 눌렀을 때만 작동하는 함수
  const handleUpdate = () => {
    const token = localStorage.getItem("token")

    fetch("/api/mypage", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        name: user.name,
        email: user.email
      })
    })
      .then((response) => {
        if (response.ok) {
          alert("수정이 완료되었습니다!")
          navigate("/mypage")
        } else {
          alert("수정에 실패했습니다.")
        }
      })
      .catch((error) => console.error("Update error:", error))
  }

  // [DELETE] 회원 탈퇴 버튼 눌렀을 때 작동하는 함수 (오타 수정: L -> l)
  const handleDelete = () => {
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
          navigate("/")
        } else {
          alert("탈퇴 처리에 실패했습니다.")
        }
      })
      .catch((error) => console.error("Delete error:", error))
  }

  // [UI] 화면에 그려지는 부분
  return (
    
    <div className="mypage-container">
      <h1 className="mypage-title">마이페이지 수정</h1>

      {user && (
        <>
          <div className="input-group">
            <input
              type="text"
              className="mypage-input"
              value={user.name}
              onChange={(e) =>
                setUser({
                  ...user,
                  name: e.target.value
                })
              }
            />

            <input
              type="email"
              className="mypage-input"
              value={user.email}
              onChange={(e) =>
                setUser({
                  ...user,
                  email: e.target.value
                })
              }
            />
          </div>

          <div className="button-group">
            <button className="btn btn-update" onClick={handleUpdate}>
              수정 완료
            </button>

            <button className="btn btn-delete" onClick={handleDelete}>
              회원 탈퇴
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default MyPageEdit