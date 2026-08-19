import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./CustomerEdit.css";

function CustomerEdit() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [companyName, setCompanyName] = useState("");
    const [contactName, setContactName] = useState("");
    const [businessNumber, setBusinessNumber] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    useEffect(() => {

        async function getCustomer() {

            try {

                const token = localStorage.getItem("token");

                const response = await axios.get(
                    "http://localhost:8080/api/customers/" + id,
                    {
                        headers: {
                            Authorization: "Bearer " + token
                        }
                    }
                );

                setCompanyName(response.data.companyName || "");
                setContactName(response.data.contactName || "");
                setBusinessNumber(response.data.businessNumber || "");
                setPhone(response.data.phone || "");
                setAddress(response.data.address || "");

            } catch (error) {

                console.log("고객 조회 실패:", error);

            }
        }

        getCustomer();

    }, [id]);

    async function updateCustomer() {

        try {

            const token = localStorage.getItem("token");

            await axios.put(
                "http://localhost:8080/api/customers/" + id,
                {
                    companyName: companyName,
                    contactName: contactName,
                    businessNumber: businessNumber,
                    phone: phone,
                    address: address
                },
                {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                }
            );

            navigate("/customers");

        } catch (error) {

            console.log("고객 수정 실패:", error);
            alert("고객 수정 중 오류가 발생했습니다.");

        }
    }

    return (

        <div className="customer-edit-page">

            <div className="customer-edit-card">

                <p className="customer-edit-small-title">
                    SMART TAX
                </p>

                <h1>
                    고객 수정
                </h1>

                <p className="customer-edit-subtitle">
                    고객 정보를 수정하세요.
                </p>

                <div className="customer-edit-form">

                    <div className="customer-edit-group">
                        <label>회사명</label>
                        <input
                            type="text"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                        />
                    </div>

                    <div className="customer-edit-group">
                        <label>담당자명</label>
                        <input
                            type="text"
                            value={contactName}
                            onChange={(e) => setContactName(e.target.value)}
                        />
                    </div>

                    <div className="customer-edit-group">
                        <label>사업자번호</label>
                        <input
                            type="text"
                            value={businessNumber}
                            onChange={(e) => setBusinessNumber(e.target.value)}
                        />
                    </div>

                    <div className="customer-edit-group">
                        <label>전화번호</label>
                        <input
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>

                    <div className="customer-edit-group full">
                        <label>주소</label>
                        <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>

                </div>

                <div className="customer-edit-actions">

                    <button
                        className="customer-save-button"
                        onClick={updateCustomer}
                    >
                        수정 저장
                    </button>

                    <button
                        className="customer-cancel-button"
                        onClick={() => navigate("/customers")}
                    >
                        취소
                    </button>

                </div>

            </div>

        </div>
    );
}

export default CustomerEdit;