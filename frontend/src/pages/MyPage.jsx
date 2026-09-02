import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./MyPage.css";

function MyPage() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
<<<<<<< HEAD
  const Location = useLocation();
=======
>>>>>>> 9d394975297a5c9c43ebf645daca86c7d230a39e

  useEffect(() => {
    const token = localStorage.getItem("token");
    if(!token) {
      alert("로그인이 필요합니다")
      navigate("/Login")
      return
    }

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
<<<<<<< HEAD
        console.log("마이페이지 응답 데이터:", data);
      setUser(data);
=======
        console.log("마이페이지 백엔드 응답 데이터:", data); // F12 콘솔창에서 실제 키값 확인용
        setUser(data);
>>>>>>> 9d394975297a5c9c43ebf645daca86c7d230a39e
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

<<<<<<< HEAD
      {user ? (
        <>
    
          <p>이름: {user.userName}</p>
          <p>이메일: {user.email}</p>
          <p>주소: {user.address} </p>

          <button onClick={()=> navigate("/mypage/edit")}>수정</button>
        </>
      ) : (
        <p>사용자 정보를 불러오는 중입니다...</p>
      )}
=======
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
>>>>>>> 9d394975297a5c9c43ebf645daca86c7d230a39e
    </div>
  );
}

export default MyPage;