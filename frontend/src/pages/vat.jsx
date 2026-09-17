import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Vat.css";

function Vat() {

  const navigate = useNavigate();

  const [vatList, setVatList] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [year, setYear] = useState("2026");
  const [quarter, setQuarter] = useState("");
  //등록일시 분까지만 나오게 보여주는 함수 적용
  const formatDateTime= (dateString) => {
    
    if (!dateString) return "-"

    if(Array.isArray(dateString)) {
      const [y, m, d, h, min ] = dateString

      return `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")} ${String(h || 0).padStart(2, "0")}:${String(min || 0).padStart(2, "0")}`;
    }
    return String(dateString)
    .replace("T", " ")
    .substring(0,16)
  }

  // 부가세 목록 데이터 불러오기
  const fetchVatList = async (currentPage = 0) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:8080/api/vats",
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
          params: {
            year: year || null,
            quarter: quarter || null,
            page: currentPage,
            size: 10
          }
        }
      );

      setVatList(response.data.content || []);
      setTotalPages(response.data.totalPages || 0);
      setPage(currentPage);

    } catch (error) {
      console.error(
        "부가세 목록을 불러오는 중 에러가 발생했습니다:",
        error
      );
    }
  };

  useEffect(() => {
    fetchVatList(0);
  }, []);

  return (
    <div className="vat-page">

      <h2>부가세 조회</h2>

      {/* 조회 조건 */}
      <div className="vat-filter-box">

        {/* 연도 선택 */}
        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
        >
          <option value="2026">2026년</option>
          <option value="2025">2025년</option>
          <option value="2024">2024년</option>
          <option value="2023">2023년</option>
          <option value="2022">2022년</option>
          <option value="2021">2021년</option>
          <option value="2020">2020년</option>
        </select>

        {/* 분기 선택 */}
        <select
          value={quarter}
          onChange={(e) => setQuarter(e.target.value)}
        >
          <option value="">전체 분기</option>
          <option value="1">1분기</option>
          <option value="2">2분기</option>
          <option value="3">3분기</option>
          <option value="4">4분기</option>
        </select>

        {/* 조회 버튼 */}
        <button onClick={() => fetchVatList(0)}>
          조회
        </button>

      </div>

      {/* 부가세 목록 */}
      <table className="vat-table">

        <thead>
          <tr>
            <th className="no-column">NO</th>
            <th>연도</th>
            <th>분기</th>
            <th>공급가액</th>
            <th>세액 (부가세)</th>
            <th>등록일시</th>
          </tr>
        </thead>

        <tbody>

          {vatList.length > 0 ? (

            vatList.map((item, index) => (

              <tr key={item.id}>
                <td className="no-column">
                  {page * 10 + index + 1}
                </td>

                <td>
                  {item.year}년
                </td>

                <td>
                  {item.quarter}분기
                </td>

                <td>
                  {item.amount?.toLocaleString()}원
                </td>

                <td>
                  {item.vatAmount?.toLocaleString()}원
                </td>

                <td>
                  {formatDateTime(item.createdAt)
                  }
                </td>

              </tr>

            ))

          ) : (

            <tr>
              <td colSpan="6" className="no-data">
                조회된 부가세 내역이 없습니다.
              </td>
            </tr>

          )}

        </tbody>

      </table>

     {/* 페이징 버튼 영역 */}
<div className="pagination">

  {/* 이전 버튼 */}
  <button
    disabled={page === 0}
    onClick={() => fetchVatList(page - 1)}
  >
    이전
  </button>

  {/* 페이지 번호 버튼 */}
  {Array.from({ length: totalPages }, (_, index) => (
    <button
      key={index}
      onClick={() => fetchVatList(index)}
      className={page === index ? "active" : ""}
    >
      {index + 1}
    </button>
  ))}

  {/* 다음 버튼 */}
  <button
    disabled={page >= totalPages - 1}
    onClick={() => fetchVatList(page + 1)}
  >
    다음
  </button>

</div>

      {/* 홈으로 돌아가기 버튼 */}
      <button
        className="back-btn"
        onClick={() => navigate("/main")}
      >
        홈으로
      </button>

    </div>
  );
}

export default Vat;