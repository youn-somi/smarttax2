import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function InvoiceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`http://localhost:8080/api/invoices/${id}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
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
        console.log("상세 조회 데이터:", data);
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

        <h2>품목</h2>

        {invoice.products &&
          invoice.products.map((product) => (
            <div key={product.id}>
              <p>상품명: {product.productName}</p>
              <p>수량: {product.quantity}</p>
              <p>단가: {product.unitPrice}</p>
              <p>공급가액: {product.supplyAmount}</p>
              <p>세액: {product.taxAmount}</p>
            </div>
          ))}
      </div>

      <button onClick={() => navigate(`/invoice/${id}/edit`)}>
  수정
</button>

<button onClick={() => navigate(-1)}>
  목록으로
</button>
    </div>
  );
}

export default InvoiceDetail;