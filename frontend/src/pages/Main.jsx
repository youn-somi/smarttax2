import "./main.css";
import { useNavigate } from "react-router-dom";

function Main() {
  const navigate = useNavigate();

  return (
    <div className="main-page">

      {/* 상단 헤더 */}
      <header className="main-header">

        <div className="header-logo">
          <div className="header-home">
            🏠
          </div>

          <div>
            <h1>SmartTax</h1>
            <span>세금계산서 관리</span>
          </div>
        </div>

        <div className="header-user">
          <span>SmartTax와 함께해요 ♡</span>
        </div>

      </header>


      {/* 전체 내용 */}
      <div className="main-content">

        {/* 왼쪽 메뉴 */}
        <aside className="side-menu">

          <div
            className="side-menu-item active"
            onClick={() => navigate("/main")}
          >
            <span className="side-icon">⌂</span>
            <span>홈</span>
          </div>

          <div
            className="side-menu-item"
            onClick={() => navigate("/invoice")}
          >
            <span className="side-icon">🧾</span>
            <span>세금계산서 등록</span>
          </div>

          <div
            className="side-menu-item"
            onClick={() => navigate("/invoice-list")}
          >
            <span className="side-icon">📋</span>
            <span>세금계산서 조회</span>
          </div>

          <div
            className="side-menu-item"
            onClick={() => navigate("/customers")}
          >
            <span className="side-icon">👥</span>
            <span>고객 관리</span>
          </div>

          <div className="side-line"></div>

          <div
            className="side-menu-item logout-side"
            onClick={() => navigate("/login", { replace: true })}
          >
            <span className="side-icon">🚪</span>
            <span>로그아웃</span>
          </div>


          {/* 왼쪽 아래 일러스트 */}
          <div className="side-image-box">
            <img
              src="/images/login_left_illustration.png"
              alt="SmartTax"
            />
          </div>

        </aside>


        {/* 오른쪽 메인 */}
        <main className="main-body">

          {/* 환영 영역 */}
          <section className="main-hero">

            <div className="hero-text">

              <p className="hero-small">
                S M A R T T A X
              </p>

              <h2>
                쉽고 빠른
                <br />
                <strong>세금계산서 관리</strong>
              </h2>

              <p className="hero-description">
                SmartTax와 함께 세금계산서 업무를
                <br />
                더 쉽고 편하게 관리해보세요.
              </p>

            </div>

            <div className="hero-image">
              <img
                src="/images/login_left_illustration.png"
                alt="세금계산서 관리"
              />
            </div>

          </section>


          {/* 기능 카드 */}
          <section className="menu-grid">

            {/* 세금계산서 등록 */}
            <div
              className="feature-card invoice-card"
              onClick={() => navigate("/invoice")}
            >

              <div className="feature-icon">
                🧾
              </div>

              <h3>세금계산서 등록</h3>

              <p>
                새로운 세금계산서를
                <br />
                등록합니다.
              </p>

              <button>
                바로가기 →
              </button>

            </div>


            {/* 세금계산서 조회 */}
            <div
              className="feature-card search-card"
              onClick={() => navigate("/invoice-list")}
            >

              <div className="feature-icon">
                🔎
              </div>

              <h3>세금계산서 조회</h3>

              <p>
                등록된 세금계산서를
                <br />
                조회합니다.
              </p>

              <button>
                바로가기 →
              </button>

            </div>


            {/* 고객 목록 */}
            <div
              className="feature-card customer-card"
              onClick={() => navigate("/customers")}
            >

              <div className="feature-icon">
                👥
              </div>

              <h3>고객 목록</h3>

              <p>
                등록된 고객을
                <br />
                조회합니다.
              </p>

              <button>
                바로가기 →
              </button>

            </div>


            {/* 로그아웃 */}
            <div
              className="feature-card logout-card"
              onClick={() => navigate("/login", { replace: true })}
            >

              <div className="feature-icon">
                🚪
              </div>

              <h3>로그아웃</h3>

              <p>
                시스템에서
                <br />
                로그아웃합니다.
              </p>

              <button>
                로그아웃
              </button>

            </div>

          </section>


          {/* 하단 안내 */}
          <div className="main-footer">

            <span className="footer-lightbulb">
              💡
            </span>

            <span>
              SmartTax는 쉽고 편리한 세금계산서 관리를 도와드립니다.
            </span>

            <span className="footer-right">
              SmartTax
            </span>

          </div>

        </main>

      </div>

    </div>
  );
}

export default Main;