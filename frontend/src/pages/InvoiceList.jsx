import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function InvoiceList() {
  const [invoiceList, setInvoiceList] = useState([]);

  async function getInvoiceList() {
    const response = await axios.get("http://localhost:8080/api/invoices");

    setInvoiceList(response.data);
  }

  // ★ 추가
  async function deleteInvoice(id) {
    await axios.delete(
      "http://localhost:8080/api/invoices/" + id
    );

    getInvoiceList();
  }

  useEffect(() => {
    getInvoiceList();
  }, []);

  return (
    <div>
      <h1>세금계산서 목록</h1>

      {invoiceList.map((invoice) => (
        <div key={invoice.id}>
          <p>
            번호 :
            <Link to={`/invoice/${invoice.id}`}>
              {invoice.invoiceNumber}
            </Link>
          </p>

          <p>공급자 : {invoice.supplierName}</p>

          <p>고객명 : {invoice.customerName}</p>

          <p>공급가액 : {invoice.supplyAmount}</p>

          <p>세액 : {invoice.taxAmount}</p>

          <p>총금액 : {invoice.totalAmount}</p>

         
          <button onClick={() => deleteInvoice(invoice.id)}>
            삭제
          </button>

        </div>
      ))}
    </div>
  );
}

export default InvoiceList;