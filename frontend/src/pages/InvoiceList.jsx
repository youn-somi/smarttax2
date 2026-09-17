import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./InvoiceList.css";

function InvoiceList() {
  const [invoiceList, setInvoiceList] = useState([]);
  const [allInvoiceList, setAllInvoiceList] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [supplierName, setSupplierName] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [searchList, setSearchList] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const [year, setYear] = useState(String(new Date().getFullYear()));
  const [quarter, setQuarter] = useState("all");
  const [quarterAmount, setQuarterAmount] = useState(0);

  // 세금계산서 전체 목록 조회
  async function getInvoiceList() {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get("http://localhost:8080/api/invoices", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      const list = Array.isArray(response.data) ? response.data : [];
      //최신순 정렬
      const sortedList = list
        .slice()
        .sort(
          (a, b) => new Date(b.issueDate || 0) - new Date(a.issueDate || 0),
        );

      setAllInvoiceList(sortedList);

      const currentYearList = sortedList.filter((invoice) => {
        if (!invoice.issueDate) {
          return false;
        }

        return new Date(invoice.issueDate).getFullYear() === Number(year);
      });

      const amount = currentYearList.reduce(
        (sum, invoice) => sum + Number(invoice.totalAmount || 0),
        0,
      );

      setQuarterAmount(amount);
    } catch (error) {
      console.log("세금계산서 목록 조회 실패:", error);
      setInvoiceList([]);
      setQuarterAmount(0);
    }
  }

  // 세금 계산서 페이징 조회
  async function getInvoicePage(currentPage = 0) {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:8080/api/invoices/page",
        {
          params: { page: currentPage, size: 10 },
          headers: {
            Authorization: "Bearer " + token,
          },
        },
      );
      setInvoiceList(response.data.content);
      setPage(response.data.number);
      setTotalPages(response.data.totalPages);
      setTotalElements(response.data.totalElements);
    } catch (error) {
      console.log("세금계산서 페이징 조회 실패:", error);
    }
  }

  function changePage(newPage) {
    getInvoicePage(newPage);
  }

  // 하나의 조회 버튼으로 조건 조회
  function searchQuarter() {
    const filteredList = allInvoiceList.filter((invoice) => {
      if (!invoice.issueDate) {
        return false;
      }

      const invoiceDate = new Date(invoice.issueDate);
      const invoiceYear = invoiceDate.getFullYear();
      const invoiceMonth = invoiceDate.getMonth() + 1;

      // 연도 조건
      if (invoiceYear !== Number(year)) {
        return false;
      }

      // 분기 조건
      if (quarter === "1" && (invoiceMonth < 1 || invoiceMonth > 3)) {
        return false;
      }

      if (quarter === "2" && (invoiceMonth < 4 || invoiceMonth > 6)) {
        return false;
      }

      if (quarter === "3" && (invoiceMonth < 7 || invoiceMonth > 9)) {
        return false;
      }

      if (quarter === "4" && (invoiceMonth < 10 || invoiceMonth > 12)) {
        return false;
      }

      // 공급자 조건
      if (
        supplierName.trim() !== "" &&
        !invoice.supplierName?.includes(supplierName.trim())
      ) {
        return false;
      }

      // 구매자 조건
      if (
        customerName.trim() !== "" &&
        !invoice.customerName?.includes(customerName.trim())
      ) {
        return false;
      }

      return true;
    });

    const amount = filteredList.reduce(
      (sum, invoice) => sum + Number(invoice.totalAmount || 0),
      0,
    );

    setSearchList(filteredList);
    setQuarterAmount(amount);
    setIsSearching(true);
  }

  // 전체 목록
  function showAllInvoice() {
    setSupplierName("");
    setCustomerName("");
    setYear(String(new Date().getFullYear()));
    setQuarter("all");
    setSearchList([]);
    setIsSearching(false);

    const currentYear = new Date().getFullYear();

    const currentYearList = allInvoiceList.filter((invoice) => {
      if (!invoice.issueDate) {
        return false;
      }

      return new Date(invoice.issueDate).getFullYear() === currentYear;
    });

    const amount = currentYearList.reduce(
      (sum, invoice) => sum + Number(invoice.totalAmount || 0),
      0,
    );

    setQuarterAmount(amount);
  }

  // 세금계산서 삭제
  async function deleteInvoice(id) {
    try {
      const token = localStorage.getItem("token");

      await axios.delete("http://localhost:8080/api/invoices/" + id, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      getInvoiceList();
    } catch (error) {
      console.log("세금계산서 삭제 실패:", error);
    }
  }

  useEffect(() => {
    getInvoiceList();
    getInvoicePage();
  }, []);

  const displayList = (isSearching ? searchList : invoiceList)
    .slice()
    .sort((a, b) => new Date(b.issueDate || 0) - new Date(a.issueDate || 0));

  return (
    <div className="invoice-list-page">
      <div className="invoice-list-container">
        {/* 제목 */}

        <div className="invoice-list-header">
          <div>
            <p className="invoice-list-small-title">SMART TAX</p>

            <h1>세금계산서 목록</h1>

            <p className="invoice-list-count">전체 {displayList.length}건</p>
          </div>

          <Link to="/invoice" className="invoice-add-button">
            + 새 세금계산서
          </Link>
        </div>

        {/* 통합 조회 영역 */}

        <div className="invoice-list-search-card">
          <input
            type="text"
            value={supplierName}
            onChange={(e) => setSupplierName(e.target.value)}
            placeholder="공급자명을 입력하세요."
          />

          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="구매자명을 입력하세요."
          />

          <select value={year} onChange={(e) => setYear(e.target.value)}>
            {Array.from(
              { length: 5 },
              (_, index) => new Date().getFullYear() - index,
            ).map((yearOption) => (
              <option key={yearOption} value={yearOption}>
                {yearOption}년
              </option>
            ))}
          </select>

          <select value={quarter} onChange={(e) => setQuarter(e.target.value)}>
            <option value="all">전체</option>

            <option value="1">1분기</option>

            <option value="2">2분기</option>

            <option value="3">3분기</option>

            <option value="4">4분기</option>
          </select>

          <button className="invoice-search-button" onClick={searchQuarter}>
            조회
          </button>

          <button className="invoice-all-button" onClick={showAllInvoice}>
            전체 목록
          </button>

          <div className="invoice-total-amount">
            <span>
              {year}년 {quarter === "all" ? "전체" : `${quarter}분기`} 누적액 :
            </span>

            <strong>{Number(quarterAmount).toLocaleString()}원</strong>
          </div>
        </div>

        {/* 목록 */}

        {displayList.map((invoice, index) => (
          <div className="invoice-item" key={invoice.id}>
            <span className="invoice-no">{page * 10 + index + 1}</span>

            <div className="invoice-number-box">
              <span>세금계산서 번호</span>

              <Link to={`/invoice/${invoice.id}`}>{invoice.invoiceNumber}</Link>

              <span>{invoice.issueDate}</span>
            </div>

            <div className="invoice-info">
              <div>
                <span>공급자</span>
                <strong>{invoice.supplierName}</strong>
              </div>

              <div>
                <span>고객명</span>
                <strong>{invoice.customerName}</strong>
              </div>

              <div>
                <span>공급가액</span>
                <strong>{invoice.supplyAmount}</strong>
              </div>

              <div>
                <span>세액</span>
                <strong>{invoice.taxAmount}</strong>
              </div>

              <div>
                <span>총금액</span>
                <strong>{invoice.totalAmount}</strong>
              </div>
            </div>

            <div className="invoice-actions">
              <Link
                to={`/invoice/${invoice.id}/edit`}
                className="invoice-edit-button"
              >
                수정
              </Link>

              <button
                className="invoice-delete-button"
                onClick={() => deleteInvoice(invoice.id)}
              >
                삭제
              </button>
            </div>
          </div>
        ))}
        <div className="invoice-pagination">
          {/* 이전 버튼 */}
          <button
            className="invoice-page-btn"
            disabled={page === 0}
            onClick={() => changePage(page - 1)}
          >
            이전
          </button>

          {Array.from({ length: totalPages }, (_, index) => (
            <button
              className={`invoice-page-btn ${page === index ? "active" : ""}`}
              onClick={() => changePage(index)}
              key={index}
            >
              {index + 1}
            </button>
          ))}
          {/* 다음 버튼 */}
          <button
            className="invoice-page-btn"
            disabled={page >= totalPages - 1}
            onClick={() => changePage(page + 1)}
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
}

export default InvoiceList;
