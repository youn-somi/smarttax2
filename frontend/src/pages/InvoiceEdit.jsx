import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function InvoiceEdit() {
  const { id } = useParams();
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`http://localhost:8080/api/invoices/${id}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token
      }
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setInvoice(data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const updateInvoice = () => {
    const token = localStorage.getItem("token");

    fetch(`http://localhost:8080/api/invoices/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify(invoice)
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setInvoice(data);
        alert("세금계산서가 수정되었습니다.");
      });
  };

  if (loading) {
    return <div>불러오는 중...</div>;
  }

  if (!invoice) {
    return <div>세금계산서가 없습니다.</div>;
  }

  return (
    <div>
      <h1>세금계산서 수정</h1>

      <input
        value={invoice.invoiceNumber}
        onChange={(e) => {
          setInvoice({
            ...invoice,
            invoiceNumber: e.target.value
          });
        }}
      />

      <input
        value={invoice.issueDate}
        onChange={(e) => {
          setInvoice({
            ...invoice,
            issueDate: e.target.value
          });
        }}
      />

      <input
        value={invoice.supplierName}
        onChange={(e) => {
          setInvoice({
            ...invoice,
            supplierName: e.target.value
          });
        }}
      />

      <input
        value={invoice.customerName}
        onChange={(e) => {
          setInvoice({
            ...invoice,
            customerName: e.target.value
          });
        }}
      />

      <input
        value={invoice.totalAmount}
        onChange={(e) => {
          setInvoice({
            ...invoice,
            totalAmount: e.target.value
          });
        }}
      />

      <input
        value={invoice.taxAmount}
        onChange={(e) => {
          setInvoice({
            ...invoice,
            taxAmount: e.target.value
          });
        }}
      />

      <input
        value={invoice.supplyAmount}
        onChange={(e) => {
          setInvoice({
            ...invoice,
            supplyAmount: e.target.value
          });
        }}
      />

      <input
        value={invoice.status}
        onChange={(e) => {
          setInvoice({
            ...invoice,
            status: e.target.value
          });
        }}
      />

      <input
        value={invoice.memo}
        onChange={(e) => {
          setInvoice({
            ...invoice,
            memo: e.target.value
          });
        }}
      />

      <button onClick={updateInvoice}>
        수정하기
      </button>
    </div>
  );
}

export default InvoiceEdit;