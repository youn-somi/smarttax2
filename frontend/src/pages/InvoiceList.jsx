import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./InvoiceList.css";

function InvoiceList() {
    const [invoiceList, setInvoiceList] = useState([]);
    const [supplierName, setSupplierName] = useState("");
    const [customerName, setCustomerName] = useState("");
    const [searchList, setSearchList] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    const [year, setYear] = useState("2026");
    const [quarter, setQuarter] = useState("3");
    const [quarterAmount, setQuarterAmount] = useState(0);

    // 전체 목록 조회
    async function getInvoiceList() {
        try {
            const token = localStorage.getItem("token");

            const response = await axios.get(
                "http://localhost:8080/api/invoices",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setInvoiceList(response.data);

        } catch (error) {
            console.log("세금계산서 목록 조회 실패:", error);
        }
    }


    // 공급자 조회
    async function searchSupplier() {
        try {
            const token = localStorage.getItem("token");

            const response = await axios.get(
                "http://localhost:8080/api/invoices/search",
                {
                    params: {
                        supplierName: supplierName
                    },
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            

            const filteredList = response.data.filter(
                (invoice) =>
                    invoice.supplierName === supplierName.trim()
            );

            setSearchList(filteredList);
            setIsSearching(true);

        } catch (error) {
            console.log("공급자 조회 실패:", error);
            setSearchList([]);
            setIsSearching(true);
        }
    }

    // 구매자 조회
    async function searchCustomer() {
        try {
            const token = localStorage.getItem("token");

            const response = await axios.get(
                "http://localhost:8080/api/invoices/search/customer",
                {
                    params: {
                        customerName: customerName
                    },
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setSearchList(response.data);
            setIsSearching(true);

        } catch (error) {
            console.log("구매자 조회 실패:", error);
            setSearchList([]);
            setIsSearching(true);
        }
    }

    // 전체 목록
    function showAllInvoice() {
        setSearchList([]);
        setIsSearching(false);
    }

    // 분기 누적액 조회
    async function searchQuarter() {
        try {
            const token = localStorage.getItem("token");

            const response = await axios.get(
                "http://localhost:8080/api/invoices/quarter",
                {
                    params: {
                        year: year,
                        quarter: quarter
                    },
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setQuarterAmount(response.data);

        } catch (error) {
            console.log("분기 누적액 조회 실패:", error);
            setQuarterAmount(0);
        }
    }

    // 세금계산서 삭제
    async function deleteInvoice(id) {
        try {
            const token = localStorage.getItem("token");

            await axios.delete(
                `http://localhost:8080/api/invoices/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            getInvoiceList();

        } catch (error) {
            console.log("삭제 실패:", error);
        }
    }

    useEffect(() => {
        getInvoiceList();
    }, []);

    const displayList = isSearching
    ? searchList.filter(
        (invoice) =>
            String(invoice.supplierName ?? "").trim() === supplierName.trim()
      )
    : invoiceList;

    return (
        <div className="invoice-list-page">

            <div className="invoice-list-container">

                <div className="invoice-list-header">

                    <div>

                        <p className="invoice-list-small-title">
                            SMART TAX
                        </p>

                        <h1>세금계산서 목록</h1>

                        <p className="invoice-list-count">
                            전체 {displayList.length}건
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

                    <input
                        type="text"
                        value={supplierName}
                        onChange={(e) => setSupplierName(e.target.value)}
                        placeholder="공급자명을 입력하세요."
                    />

                    <button onClick={searchSupplier}>
                        공급자 조회
                    </button>

                    <input
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="구매자명을 입력하세요."
                    />

                    <button onClick={searchCustomer}>
                        구매자 조회
                    </button>

                    <button onClick={showAllInvoice}>
                        전체 목록
                    </button>

                </div>

               <div
    className="invoice-list-card"
    style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
        padding: "18px 24px",
        marginTop: "14px",
        flexWrap: "wrap"
    }}
>
    {/* 연도 */}
    <div
        style={{
            position: "relative"
        }}
    >
        <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            style={{
                appearance: "none",
                WebkitAppearance: "none",
                minWidth: "120px",
                height: "42px",
                padding: "0 38px 0 18px",
                border: "1px solid #e6c77b",
                borderRadius: "10px",
                background: "#fffaf0",
                color: "#5c4a2d",
                fontSize: "14px",
                fontWeight: "600",
                textAlign: "center",
                cursor: "pointer",
                outline: "none"
            }}
        >
            <option value="2026">
                2026년 목록
            </option>

            <option value="2027">
                2027년 목록
            </option>
        </select>

        <span
            style={{
                position: "absolute",
                right: "14px",
                top: "50%",
                transform: "translateY(-55%)",
                color: "#b57900",
                fontSize: "12px",
                pointerEvents: "none"
            }}
        >
            ▼
        </span>
    </div>

    {/* 분기 */}
    <div
        style={{
            position: "relative"
        }}
    >
        <select
            value={quarter}
            onChange={(e) => setQuarter(e.target.value)}
            style={{
                appearance: "none",
                WebkitAppearance: "none",
                minWidth: "120px",
                height: "42px",
                padding: "0 38px 0 18px",
                border: "1px solid #e6c77b",
                borderRadius: "10px",
                background: "#fffaf0",
                color: "#5c4a2d",
                fontSize: "14px",
                fontWeight: "600",
                textAlign: "center",
                cursor: "pointer",
                outline: "none"
            }}
        >
            <option value="1">
                1분기 목록
            </option>

            <option value="2">
                2분기 목록
            </option>

            <option value="3">
                3분기 목록
            </option>

            <option value="4">
                4분기 목록
            </option>
        </select>

        <span
            style={{
                position: "absolute",
                right: "14px",
                top: "50%",
                transform: "translateY(-55%)",
                color: "#b57900",
                fontSize: "12px",
                pointerEvents: "none"
            }}
        >
            ▼
        </span>
    </div>

    {/* 조회 버튼 */}
    <button
        onClick={searchQuarter}
        style={{
            height: "42px",
            padding: "0 20px",
            border: "1px solid #e0ae3b",
            borderRadius: "10px",
            background: "#fffaf0",
            color: "#8a5d00",
            fontSize: "14px",
            fontWeight: "700",
            cursor: "pointer"
        }}
    >
        조회
    </button>

    {/* 분기 누적액 */}
    <div
        style={{
            minWidth: "275px",
            height: "42px",
            padding: "0 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            border: "1px solid #e6c77b",
            borderRadius: "10px",
            background: "#fffaf0",
            boxSizing: "border-box"
        }}
    >
        <span
            style={{
                color: "#555",
                fontSize: "14px",
                fontWeight: "500"
            }}
        >
            {year}년 {quarter}분기 누적액 :
        </span>

        <strong
            style={{
                color: "#b57900",
                fontSize: "17px",
                fontWeight: "700"
            }}
        >
            {Number(quarterAmount).toLocaleString()}원
        </strong>
    </div>
</div>

                {displayList.map((invoice) => (

                    <div
                        className="invoice-item"
                        key={invoice.id}
                    >

                        <div className="invoice-number-box">

                            <span>세금계산서 번호</span>

                            <Link to={`/invoice/${invoice.id}`}>
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

                ))}

            </div>

        </div>
    );
}

export default InvoiceList;