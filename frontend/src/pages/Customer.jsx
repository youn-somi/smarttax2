import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./CustomerList.css";

function CustomerList() {
  const [customerList, setCustomerList] = useState([]);

  // 고객 목록 조회
  async function getCustomerList() {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:8080/api/customers",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      if (Array.isArray(response.data)) {
        setCustomerList(response.data);
      } else {
        setCustomerList([]);
      }
    } catch (error) {
      console.log("고객 목록 조회 실패:", error);
      setCustomerList([]);
    }
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
  }, []);

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
              전체 {customerList.length}건
            </p>

          </div>

          <Link
            to="/customers/new"
            className="customer-add-button"
          >
            + 거래처 등록
          </Link>

        </div>

        <div className="customer-list-card">

          {customerList.length === 0 ? (

            <div className="customer-empty">
              등록된 고객이 없습니다.
            </div>

          ) : (

            customerList.map((customer) => (

              <div
                className="customer-item"
                key={customer.id}
              >

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
                    onClick={() =>
                      deleteCustomer(customer.id)
                    }
                  >
                    삭제
                  </button>

                </div>

              </div>

            ))

          )}

        </div>

      </div>

    </div>
  );
}

export default CustomerList;