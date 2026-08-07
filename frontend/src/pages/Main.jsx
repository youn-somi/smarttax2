import "./main.css";
import { useNavigate } from "react-router-dom";

function Main() {
  const navigate = useNavigate();

  return (
    <div className="main-page">

      {/* 왼쪽 */}
      <div className="main-left">
        <img
          src="/images/login_left_illustration.png"
          alt="main"
          className="main-image"
        />
      </div>

      {/* 오른쪽 */}
      <div className="main-right">
        <div className="main-card">

          <h1 className="logo">SmartTax</h1>

          <p className="sub-title">
            쉽고 빠른 세금계산서 관리
          </p>

          <div className="welcome-box">
            <h2>환영합니다 👋</h2>
            <p>원하는 메뉴를 선택하세요.</p>
          </div>

          {/* 세금계산서 등록 */}
          <div
            className="menu-item"
            onClick={() => navigate("/invoice")}
          >
            <div className="menu-icon">🧾</div>

            <div className="menu-text">
              <h3>세금계산서 등록</h3>
              <p>새로운 세금계산서를 등록합니다.</p>
            </div>

            <div className="arrow">›</div>
          </div>

          {/* 세금계산서 조회 */}
          <div
            className="menu-item"
            onClick={() => navigate("/invoice-list")}
          >
            <div className="menu-icon">📋</div>

            <div className="menu-text">
              <h3>세금계산서 조회</h3>
              <p>등록된 세금계산서를 조회합니다.</p>
            </div>

            <div className="arrow">›</div>
          </div>

          {/* 로그아웃 */}
          <div
            className="menu-item logout"
            onClick={() => navigate("/login")}
          >
            <div className="menu-icon">🚪</div>

            <div className="menu-text">
              <h3>로그아웃</h3>
              <p>시스템에서 로그아웃합니다.</p>
            </div>

            <div className="arrow">›</div>
          </div>

        </div>
      </div>

    </div>
  );
}

export default Main;