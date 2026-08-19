import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./InvoiceList.css";

function InvoiceList() {

    const [invoiceList, setInvoiceList] = useState([]);

    // 세금계산서 목록 조회
    async function getInvoiceList() {

        try {

            const token = localStorage.getItem("token");

            const response = await axios.get(
                "http://localhost:8080/api/invoices",
                {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                }
            );

            if (Array.isArray(response.data)) {
                setInvoiceList(response.data);
            } else {
                setInvoiceList([]);
            }

        } catch (error) {

            console.log("세금계산서 목록 조회 실패:", error);
            setInvoiceList([]);

        }
    }

    // 세금계산서 삭제
    async function deleteInvoice(id) {

        try {

            const token = localStorage.getItem("token");

            await axios.delete(
                "http://localhost:8080/api/invoices/" + id,
                {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                }
            );

            getInvoiceList();

        } catch (error) {

            console.log("세금계산서 삭제 실패:", error);

        }
    }

    // 화면이 처음 열릴 때 목록 조회
    useEffect(() => {

        getInvoiceList();

    }, []);

    return (

        <div className="invoice-list-page">

            <div className="invoice-list-container">

                <div className="invoice-list-header">

                    <div>
                        <p className="invoice-list-small-title">
                            SMART TAX
                        </p>

                        <h1>
                            세금계산서 목록
                        </h1>

                        <p className="invoice-list-count">
                            전체 {invoiceList.length}건
                        </p>
                    </div>

                    <Link
                        to="/invoice"
                        className="invoice-add-button"
                    >
                        + 새 세금계산서
                    </Link>

                </div>

                <div className="invoice-list-card">

                    {invoiceList.length === 0 ? (

                        <div className="invoice-empty">
                            등록된 세금계산서가 없습니다.
                        </div>

                    ) : (

                        invoiceList.map((invoice) => (

                            <div
                                className="invoice-item"
                                key={invoice.id}
                            >

                                <div className="invoice-number-box">

                                    <span>
                                        세금계산서 번호
                                    </span>

                                    <Link
                                        to={`/invoice/${invoice.id}`}
                                    >
                                        {invoice.invoiceNumber}
                                    </Link>

                                </div>

                                <div className="invoice-info">

                                    <div>
                                        <span>공급자</span>
                                        <strong>
                                            {invoice.supplierName}
                                        </strong>
                                    </div>

                                    <div>
                                        <span>고객명</span>
                                        <strong>
                                            {invoice.customerName}
                                        </strong>
                                    </div>

                                    <div>
                                        <span>공급가액</span>
                                        <strong>
                                            {invoice.supplyAmount}
                                        </strong>
                                    </div>

                                    <div>
                                        <span>세액</span>
                                        <strong>
                                            {invoice.taxAmount}
                                        </strong>
                                    </div>

                                    <div>
                                        <span>총금액</span>
                                        <strong>
                                            {invoice.totalAmount}
                                        </strong>
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

                        ))

                    )}

                </div>

            </div>

        </div>
    );
}

export default InvoiceList;