import { useEffect, useState } from "react";

function MyPage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/api/users/me")
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
      });
  }, []);

  return (
    <div className="mypage">

      <h1>마이페이지</h1>

      <div className="mypage-card">
        <h2>내 정보</h2>

        {user && (
          <>
            <p>아이디: {user.userId}</p>
            <p>이름: {user.name}</p>
            <p>이메일: {user.email}</p>
          </>
        )}

      </div>

    </div>
  );
}

export default MyPage;