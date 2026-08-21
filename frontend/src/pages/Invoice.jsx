import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Invoice.css";

function Invoice() {
  const navigate = useNavigate();

  const [supplierName, setSupplierName] = useState("");
  const [supplierBusinessNumber, setSupplierBusinessNumber] = useState("");
  const [supplierCeoName, setSupplierCeoName] = useState("");
  const [supplierPhone, setSupplierPhone] = useState("");
  const [supplierAddress, setSupplierAddress] = useState("");

  const [customerName, setCustomerName] = useState("");
  const [customerList, setCustomerList] = useState([]);
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

  // 거래처 목록 조회
  async function getCustomerList() {
    const token = localStorage.getItem("token");

    const response = await axios.get(
      "http://localhost:8080/api/customers",
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      },
    );

    console.log("거래처 목록:", response.data);

    setCustomerList(response.data);
  }

  // 화면이 처음 열릴 때 실행
  useEffect(() => {

    getCustomerList();

    if (id) {
      getInvoice();
    }

  }, []);

  // 공급자 선택
  function handleSupplierChange(e) {

    const selectedSupplierName = e.target.value;

    setSupplierName(selectedSupplierName);

    const selectedCustomer = customerList.find(
      (customer) =>
        customer.companyName === selectedSupplierName
    );

    if (selectedCustomer) {

      setSupplierBusinessNumber(
        selectedCustomer.businessNumber || ""
      );

      setSupplierCeoName(
        selectedCustomer.ceoName || ""
      );

      setSupplierPhone(
        selectedCustomer.phone || ""
      );

      setSupplierAddress(
        selectedCustomer.address || ""
      );

    } else {

      setSupplierBusinessNumber("");
      setSupplierCeoName("");
      setSupplierPhone("");
      setSupplierAddress("");

    }
  }

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

      navigate("/invoice-list");

    } catch (error) {
      console.log("세금계산서 저장 실패:", error);

      if (error.response) {
        console.log("상태 코드:", error.response.status);
        console.log("서버 응답:", error.response.data);

        alert(
          typeof error.response.data === "string"
            ? error.response.data
            : "세금계산서 저장 중 오류가 발생했습니다.",
        );
      } else {
        alert("서버에 연결할 수 없습니다.");
      }
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

              <label>
                세금계산서 번호
              </label>

              <input
                type="text"
                placeholder="번호 입력"
                value={invoiceNumber}
                onChange={(e) => setInvoiceNumber(e.target.value)}
              />

            </div>

            <div className="form-group">

              <label>
                발행일
              </label>

              <input
                type="date"
                value={issueDate}
                onChange={(e) => setIssueDate(e.target.value)}
              />

            </div>

            <div className="form-group">

              <label>
                공급자
              </label>

              <select
                value={supplierName}
                onChange={handleSupplierChange}
              >

                <option value="">
                  거래처를 선택하세요
                </option>

                {customerList.map((customer) => (

                  <option
                    key={customer.id}
                    value={customer.companyName}
                  >
                    {customer.companyName}
                  </option>

                ))}

              </select>

            </div>

            <div className="form-group">

              <label>
                고객명
              </label>

              <input
                type="text"
                placeholder="고객명"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />

            </div>

            <div className="form-group">

              <label>
                사업자번호
              </label>

              <input
                type="text"
                value={supplierBusinessNumber}
                readOnly
              />

            </div>

            <div className="form-group">

              <label>
                대표자명
              </label>

              <input
                type="text"
                value={supplierCeoName}
                readOnly
              />

            </div>

            <div className="form-group">

              <label>
                전화번호
              </label>

              <input
                type="text"
                value={supplierPhone}
                readOnly
              />

            </div>

            <div className="form-group full">

              <label>
                주소
              </label>

              <input
                type="text"
                value={supplierAddress}
                readOnly
              />

            </div>

            <div className="form-group">

              <label>
                공급가액
              </label>

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

              <label>
                세액
              </label>

              <input
                type="number"
                placeholder="세액"
                value={taxAmount}
                readOnly
              />

            </div>

            <div className="form-group full">

              <label>
                총금액
              </label>

              <input
                type="number"
                placeholder="총금액"
                value={totalAmount}
                readOnly
              />

            </div>

            <div className="form-group full">

              <label>
                메모
              </label>

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