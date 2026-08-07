import { useEffect, useState } from "react";
import axios from "axios";
import "./Invoice.css";

function Invoice() {

  const [supplierName, setSupplierName] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [supplyAmount, setSupplyAmount] = useState("");
  const [taxAmount, setTaxAmount] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [memo, setMemo] = useState("");

  const { id } = useParams();

  async function getInvoice() {

    const response = await axios.get(
      "http://localhost:8080/api/invoices/" + id
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


  useEffect(() => {
    if (id) {
      getInvoice();

    alert("세금계산서가 저장되었습니다.");
    }
  }, []);

  
  async function saveInvoice() {

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
            }
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
            }
        );

    }

}

  

  return(

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
                onChange={(e)=>setInvoiceNumber(e.target.value)}
              />

            </div>

            <div className="form-group">

              <label>발행일</label>

              <input
                type="date"
                value={issueDate}
                onChange={(e)=>setIssueDate(e.target.value)}
              />

            </div>

            <div className="form-group">

              <label>공급자</label>

              <input
                type="text"
                placeholder="공급자"
                value={supplierName}
                onChange={(e)=>setSupplierName(e.target.value)}
              />

            </div>

            <div className="form-group">

              <label>고객명</label>

              <input
                type="text"
                placeholder="고객명"
                value={customerName}
                onChange={(e)=>setCustomerName(e.target.value)}
              />

            </div>

            <div className="form-group">

              <label>공급가액</label>

              <input
                type="number"
                placeholder="공급가액"
                value={supplyAmount}
                onChange={(e)=>setSupplyAmount(e.target.value)}
              />

            </div>

            <div className="form-group">

              <label>세액</label>

              <input
                type="number"
                placeholder="세액"
                value={taxAmount}
                onChange={(e)=>setTaxAmount(e.target.value)}
              />

            </div>

            <div className="form-group full">

              <label>총금액</label>

              <input
                type="number"
                placeholder="총금액"
                value={totalAmount}
                onChange={(e)=>setTotalAmount(e.target.value)}
              />

            </div>

            <div className="form-group full">

              <label>메모</label>

              <textarea
                rows="4"
                placeholder="메모를 입력하세요."
                value={memo}
                onChange={(e)=>setMemo(e.target.value)}
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