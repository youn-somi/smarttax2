import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./InvoiceDetail.css";

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
    return <div className="invoice-detail-page">불러오는 중...</div>;
  }

  if (!invoice) {
    return <div className="invoice-detail-page">세금계산서가 없습니다.</div>;
  }

  return (
    <div className="invoice-detail-page">
      <div className="invoice-detail-container">
        
        {/* 상단 헤더 */}
        <div className="invoice-detail-header">
          <p className="invoice-detail-small-title">SMART TAX</p>
          <h1>세금계산서 상세</h1>
        </div>

        {/* 상세 정보 카드 */}
        <div className="invoice-detail-card">
          <div className="invoice-info-grid">
            <div className="invoice-info-item">
              <span>세금계산서 번호</span>
              <strong>{invoice.invoiceNumber}</strong>
            </div>
            <div className="invoice-info-item">
              <span>발행일</span>
              <strong>{invoice.issueDate}</strong>
            </div>
            <div className="invoice-info-item">
              <span>공급자</span>
              <strong>{invoice.supplierName}</strong>
            </div>
            <div className="invoice-info-item">
              <span>공급받는자</span>
              <strong>{invoice.customerName}</strong>
            </div>
            <div className="invoice-info-item">
              <span>공급가액</span>
              <strong>{Number(invoice.supplyAmount || 0).toLocaleString()} 원</strong>
            </div>
            <div className="invoice-info-item">
              <span>세액</span>
              <strong>{Number(invoice.taxAmount || 0).toLocaleString()} 원</strong>
            </div>
            <div className="invoice-info-item">
              <span>총금액</span>
              <strong>{Number(invoice.totalAmount || 0).toLocaleString()} 원</strong>
            </div>
            <div className="invoice-info-item">
              <span>상태</span>
              <strong>{invoice.status}</strong>
            </div>
            <div className="invoice-info-item invoice-memo-box">
              <span>메모</span>
              <strong>{invoice.memo || "없음"}</strong>
            </div>
          </div>

          {/* 품목 섹션 */}
          <div className="invoice-products-section">
            <h2>품목 목록</h2>
            {invoice.products && invoice.products.length > 0 ? (
              invoice.products.map((product) => (
                <div className="product-item-card" key={product.id}>
                  <div className="product-field">
                    <span>상품명</span>
                    <strong>{product.productName}</strong>
                  </div>
                  <div className="product-field">
                    <span>수량</span>
                    <strong>{product.quantity}</strong>
                  </div>
                  <div className="product-field">
                    <span>단가</span>
                    <strong>{Number(product.unitPrice || 0).toLocaleString()} 원</strong>
                  </div>
                  <div className="product-field">
                    <span>공급가액</span>
                    <strong>{Number(product.supplyAmount || 0).toLocaleString()} 원</strong>
                  </div>
                  <div className="product-field">
                    <span>세액</span>
                    <strong>{Number(product.taxAmount || 0).toLocaleString()} 원</strong>
                  </div>
                </div>
              ))
            ) : (
              <p style={{ color: "#b7a38f", fontSize: "13px" }}>등록된 품목이 없습니다.</p>
            )}
          </div>
        </div>

        {/* 하단 버튼 */}
        <div className="invoice-detail-actions">
          <button 
            className="invoice-detail-edit-btn" 
            onClick={() => navigate(`/invoice/${id}/edit`)}
          >
            수정
          </button>
          <button 
            className="invoice-detail-back-btn" 
            onClick={() => navigate(-1)}
          >
            목록으로
          </button>
        </div>

      </div>
    </div>
  );
}

export default InvoiceDetail;