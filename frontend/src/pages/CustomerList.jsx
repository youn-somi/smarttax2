import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./CustomerList.css";

function CustomerList() {
  const [customerList, setCustomerList] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [searchName, setSearchName] =useState("")
  const [isSearching, setIsSearching] = useState(false)


  // 고객 목록 조회
  async function getCustomerList() {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:8080/api/customers",
        {
          params: {
            page: page,
            size: 10,
          },

          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      setCustomerList(response.data.content || []);
      setTotalPages(response.data.totalPages || 0);
      setTotalElements(response.data.totalElements || 0);

    } catch (error) {
      console.log("고객 목록 조회 실패:", error);
      setCustomerList([]);
    }
  }
  //고객명 검색
  async function searchCustomer() {
    if(searchName ==="") {
      alert("검색할 고객명을 입력해주세요.")
      return
    }
    try {
      const token = localStorage.getItem("token")

      const response = await axios.get(
        "http://localhost:8080/api/customers/search?companyName=" + searchName,
        {
          headers : {
            Authorization: "Bearer " + token,
          },
        }
      );

      setCustomerList(response.data)
      setIsSearching(true)
      setPage(0)
    } catch(error) {
      console.log("고객 검색 실패:", error)
      alert("검색에 실패했습니다.")
    }
  }

  // 검색 초기화
  async function clearSearch() {
    setSearchName("")
    setIsSearching(false)
    setPage(0)
    getCustomerList()
  }



  // 고객 삭제
  async function deleteCustomer(id) {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        "http://localhost:8080/api/customers/" + id,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      getCustomerList();

    } catch (error) {
      console.log("고객 삭제 실패:", error);
    }
  }

  // 화면이 처음 열릴 때 고객 목록 조회
  useEffect(() => {
    getCustomerList();
  }, [page]);

  return (
    <div className="customer-list-page">

      <div className="customer-list-container">

        <div className="customer-list-header">

          <div>

            <p className="customer-list-small-title">
              SMART TAX
            </p>

            <h1>고객 목록</h1>

            <p className="customer-list-count">
              전체 {totalElements}건
            </p>

          </div>

          <Link
            to="/customers/new"
            className="customer-add-button"
          >
            + 거래처 등록
          </Link>

        </div>

        {/* 고개명검색 */}
        <div className="customer-search-bar">
          <input
          type="text"
          placeholder="고객명을 입력하세요"
          value={searchName}
          onChange={(e)=> setSearchName(e.target.value)}
          />
          <button onClick= {searchCustomer} > 검색 </button>
          {isSearching && (
            <button onClick={clearSearch}>전체목록</button>
          )
          }
        </div>

        <div className="customer-list-card">

          {customerList.length === 0 ? (

            <div className="customer-empty">
              등록된 고객이 없습니다.
            </div>

          ) : (

            customerList.map((customer, index) => (

              <div
                className="customer-item"
                key={customer.id}
              >
                  <div className="customer-sequence">
                    <span> NO </span>
                    <strong>
                      {page * 10 + index +1}
            
                    </strong>
                    </div>

                <div className="customer-number">

                  <span>고객번호</span>

                  <strong>
                    {customer.id}
                  </strong>

                </div>

                <div className="customer-info">

                  <div>
                    <span>고객명</span>
                    <strong>
                      {customer.companyName}
                    </strong>
                  </div>

                  <div>
                    <span>사업자번호</span>
                    <strong>
                      {customer.businessNumber}
                    </strong>
                  </div>

                  <div>
                    <span>대표자명</span>
                    <strong>
                      {customer.ceoName}
                    </strong>
                  </div>

                  <div>
                    <span>전화번호</span>
                    <strong>
                      {customer.phone}
                    </strong>
                  </div>

                  <div>
                    <span>주소</span>
                    <strong>
                      {customer.address}
                    </strong>
                  </div>

                </div>

                <div className="customer-actions">

                  <Link
                    to={`/customers/${customer.id}/edit`}
                    className="customer-edit-button"
                  >
                    수정하기
                  </Link>

                  <button
                    className="customer-delete-button"
                    onClick={() => deleteCustomer(customer.id)}
                  >
                    삭제
                  </button>

                </div>

              </div>

            ))

          )}

        </div>
        {!isSearching && (
      
        <div className="customer-pagination">
             {/* 페이지 버튼 */}
          {/* 이전 버튼 */}
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 0}
          >
            이전
          </button>

          {/* 페이지 번호 */}
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setPage(index)}
              className={`customer-page-btn ${page === index ? "active" : ""}`}
            >
              {index + 1}
            </button>
          ))}

          <button
          onClick={()=> setPage(page +1)}
          disabled={page >= totalPages -1}
          > 다음
          </button>

        </div>
        )}
      </div>

    </div>
  );

}

export default CustomerList;