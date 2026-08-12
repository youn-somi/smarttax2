import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function InvoiceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/invoices/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("세금계산서를 불러오지 못했습니다.");
        }

        return response.json();
      })
      .then((data) => {
        setInvoice(data);
      })
      .catch((error) => {
        console.error(error);
        alert("세금계산서를 불러오지 못했습니다.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div>불러오는 중...</div>;
  }

  if (!invoice) {
    return <div>세금계산서가 없습니다.</div>;
  }

  return (
    <div>
      <h1>세금계산서 상세</h1>

      <div>
        <p>세금계산서 번호: {invoice.invoiceNumber}</p>
        <p>발행일: {invoice.issueDate}</p>
        <p>공급자: {invoice.supplierName}</p>
        <p>공급받는자: {invoice.customerName}</p>
        <p>공급가액: {invoice.supplyAmount}</p>
        <p>세액: {invoice.taxAmount}</p>
        <p>총금액: {invoice.totalAmount}</p>
        <p>상태: {invoice.status}</p>
        <p>메모: {invoice.memo}</p>
      </div>

      <button onClick={() => navigate(-1)}>
        목록으로
      </button>
    </div>
  );
}

export default InvoiceDetail;