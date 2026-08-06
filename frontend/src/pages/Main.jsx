import { useNavigate } from "react-router-dom";

function Main() {
    const navigate = useNavigate();

    return (
        <div>
            <h1>SmartTax</h1>
            <p>메인 화면</p>

            <button
                style={{ marginLeft: "10px" }}
                onClick={() => navigate("/invoice")}
            >
                세금계산서 등록
            </button>

            <button
                style={{ marginLeft: "10px" }}
                onClick={() => {
                    localStorage.removeItem("token");
                    navigate("/");
                }}
            >
                로그아웃
            </button>

            <button
                style={{ marginLeft: "10px" }}
                onClick={() => navigate("/invoice-list")}
            >
                세금계산서 조회
            </button>
        </div>
    );
}

export default Main;