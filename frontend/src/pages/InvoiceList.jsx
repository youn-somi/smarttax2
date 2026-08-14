import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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

                    <p>
                        공급자 : {invoice.supplierName}
                    </p>

                    <p>
                        고객명 : {invoice.customerName}
                    </p>

                    <p>
                        공급가액 : {invoice.supplyAmount}
                    </p>

                    <p>
                        세액 : {invoice.taxAmount}
                    </p>

                    <p>
                        총금액 : {invoice.totalAmount}
                    </p>

                    <Link to={`/invoice/${invoice.id}/edit`}>
                        <button>
                            수정
                        </button>
                    </Link>

                    <button
                        onClick={() => deleteInvoice(invoice.id)}
                    >
                        삭제
                    </button>

                </div>

            ))}

        </div>
    );
}

export default InvoiceList;