import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Invoice.css";

function Invoice() {
  const navigate = useNavigate();

  const [supplierName, setSupplierName] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [supplyAmount, setSupplyAmount] = useState("");
  const [taxAmount, setTaxAmount] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [memo, setMemo] = useState("");

  const { id } = useParams();

  // 기존 세금계산서 조회
  async function getInvoice() {
    const token = localStorage.getItem("token");

    const response = await axios.get(
      "http://localhost:8080/api/invoices/" + id,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      },
    );

    setInvoiceNumber(response.data.invoiceNumber);
    setIssueDate(response.data.issueDate);
    setSupplierName(response.data.supplierName);
    setCustomerName(response.data.customerName);
    setSupplyAmount(response.data.supplyAmount);
    setTaxAmount(response.data.taxAmount);
    setTotalAmount(response.data.totalAmount);
    setMemo(response.data.memo);
  }

  // 수정 화면으로 들어왔을 때 기존 데이터 조회
  useEffect(() => {
    if (id) {
      getInvoice();
    }
  }, []);

  // 세금계산서 저장 / 수정
  async function saveInvoice() {
    const token = localStorage.getItem("token");

    try {
      if (id) {
        await axios.put(
          "http://localhost:8080/api/invoices/" + id,
          {
            invoiceNumber: invoiceNumber,
            issueDate: issueDate,
            supplierName: supplierName,
            customerName: customerName,
            supplyAmount: supplyAmount,
            taxAmount: taxAmount,
            totalAmount: totalAmount,
            memo: memo,
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          },
        );
      } else {
        await axios.post(
          "http://localhost:8080/api/invoices",
          {
            invoiceNumber: invoiceNumber,
            issueDate: issueDate,
            supplierName: supplierName,
            customerName: customerName,
            supplyAmount: supplyAmount,
            taxAmount: taxAmount,
            totalAmount: totalAmount,
            memo: memo,
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          },
        );
      }

      // 저장 성공했을 때만 목록으로 이동
      navigate("/invoice-list");

    } catch (error) {

      const message =
        error.response?.data || "이미 등록된 세금계산서입니다.세금계산서 번호를 확인해주세요.";

      alert(message);
    }
  }

  return (
    <div className="invoice-page">

      <div className="invoice-left">
        <img
          src="/images/login_left_illustration.png"
          alt="invoice"
          className="invoice-image"
        />
      </div>

      <div className="invoice-right">

        <div className="invoice-card">

          <h1 className="invoice-title">
            SmartTax
          </h1>

          <p className="invoice-sub">
            세금계산서 등록
          </p>

          <div className="form-grid">

            <div className="form-group">
              <label>세금계산서 번호</label>

              <input
                type="text"
                placeholder="번호 입력"
                value={invoiceNumber}
                onChange={(e) => setInvoiceNumber(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>발행일</label>

              <input
                type="date"
                value={issueDate}
                onChange={(e) => setIssueDate(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>공급자</label>

              <input
                type="text"
                placeholder="공급자"
                value={supplierName}
                onChange={(e) => setSupplierName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>고객명</label>

              <input
                type="text"
                placeholder="고객명"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>공급가액</label>

              <input
                type="number"
                placeholder="공급가액"
                value={supplyAmount}
                onChange={(e) => {
                  const value = e.target.value;

                  setSupplyAmount(value);

                  const tax = value
                    ? Math.round(Number(value) * 0.1)
                    : "";

                  setTaxAmount(tax);

                  const total = value
                    ? Number(value) + tax
                    : "";

                  setTotalAmount(total);
                }}
              />
            </div>

            <div className="form-group">
              <label>세액</label>

              <input
                type="number"
                placeholder="세액"
                value={taxAmount}
              />
            </div>

            <div className="form-group full">
              <label>총금액</label>

              <input
                type="number"
                placeholder="총금액"
                value={totalAmount}
              />
            </div>

            <div className="form-group full">
              <label>메모</label>

              <textarea
                rows="4"
                placeholder="메모를 입력하세요."
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
              />
            </div>

          </div>

          <button
            className="save-btn"
            onClick={saveInvoice}
          >
            💾 저장하기
          </button>

        </div>
      </div>
    </div>
  );
}

export default Invoice;