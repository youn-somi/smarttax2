import { useState } from "react";
import axios from "axios";

function Invoice() {
  const [supplierName, setSupplierName] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [supplyAmount, setSupplyAmount] = useState("");
  const [taxAmount, setTaxAmount] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [memo, setMemo] = useState("");

  async function saveInvoice() {
    await axios.post("http://localhost:8080/api/invoices", {
      invoiceNumber: invoiceNumber,
      issueDate: issueDate,
      supplierName: supplierName,
      customerName: customerName,
      supplyAmount: supplyAmount,
      taxAmount: taxAmount,
      totalAmount: totalAmount,
      memo: memo,
    });
  }

  return (
    <div>
      <h1>세금계산서 등록</h1>

      <div>
        <label>세금계산서 번호</label>
        <br />
        <input
          type="text"
          value={invoiceNumber}
          onChange={(e) => setInvoiceNumber(e.target.value)}
        />
      </div>

      <br />

      <div>
        <label>발행일</label>
        <br />
        <input
          type="date"
          value={issueDate}
          onChange={(e) => setIssueDate(e.target.value)}
        />
      </div>

      <br />

      <div>
        <label>공급자</label>
        <br />
        <input
          type="text"
          value={supplierName}
          onChange={(e) => setSupplierName(e.target.value)}
        />
      </div>

      <br />

      <div>
        <label>고객명</label>
        <br />
        <input
          type="text"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />
      </div>

      <br />

      <div>
        <label>공급가액</label>
        <br />
        <input
          type="number"
          value={supplyAmount}
          onChange={(e) => setSupplyAmount(e.target.value)}
        />
      </div>

      <br />

      <div>
        <label>세액</label>
        <br />
        <input
          type="number"
          value={taxAmount}
          onChange={(e) => setTaxAmount(e.target.value)}
        />
      </div>

      <br />

      <div>
        <label>총금액</label>
        <br />
        <input
          type="number"
          value={totalAmount}
          onChange={(e) => setTotalAmount(e.target.value)}
        />
      </div>

      <br />

      <div>
        <label>메모</label>
        <br />
        <input
          type="text"
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
        />
      </div>
      <br />

      <button onClick={saveInvoice}>저장</button>
    </div>
  );
}

export default Invoice;
