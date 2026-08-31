import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MyPage.css";

function MyPage() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("/api/mypage", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("데이터를 불러오는데 실패했습니다.");
        }
        return response.json();
      })
      .then((data) => {
        console.log("마이페이지 백엔드 응답 데이터:", data); // F12 콘솔창에서 실제 키값 확인용
        setUser(data);
      })
      .catch((error) => {
        console.error("Error fetching mypage:", error);
      });
  }, []);

  return (
    <div className="mypage">
      <h1>마이페이지</h1>

      <div className="mypage-card">
        <h2>내 정보</h2>

        {user ? (
          <>
            {/* ⬇️ 백엔드 필드명에 맞추어 유연하게 처리한 위치 */}
      <p>아이디: {user.userId || "-"}</p>
<p>이름: {user.name || "-"}</p>
<p>이메일: {user.email || "-"}</p>
<p>주소: {user.address || "-"}</p>
            <button onClick={() => navigate("/mypage/edit")}>수정</button>
          </>
        ) : (
          <p>사용자 정보를 불러오는 중입니다...</p>
        )}
      </div>
    </div>
  );
}

export default MyPage;