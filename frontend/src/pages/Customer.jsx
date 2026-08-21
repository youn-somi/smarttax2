import { useState } from "react";
import axios from "axios";
import "./Customer.css";


function Customer() {

  const [companyName, setCompanyName] = useState("");
  const [businessNumber, setBusinessNumber] = useState("");
  const [ceoName, setCeoName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  async function saveCustomer() {

    const token = localStorage.getItem("token");

    await axios.post(
      "http://localhost:8080/api/customers",
      {
        companyName: companyName,
        businessNumber: businessNumber,
        ceoName: ceoName,
        address: address,
        phone: phone,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    alert("거래처가 등록되었습니다.");
  }

 return (
  <div className="customer-page">

    <div className="customer-card">

      <h1 className="customer-title">
        거래처 등록
      </h1>

      <p className="customer-subtitle">
        SmartTax 거래처 관리
      </p>

      <div className="customer-form">

        <div className="customer-group">
          <label>거래처명</label>
          <input
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </div>

        <div className="customer-group">
          <label>사업자번호</label>
          <input
            value={businessNumber}
            onChange={(e) => setBusinessNumber(e.target.value)}
          />
        </div>

        <div className="customer-group">
          <label>대표자명</label>
          <input
            value={ceoName}
            onChange={(e) => setCeoName(e.target.value)}
          />
        </div>

        <div className="customer-group">
          <label>전화번호</label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="customer-group full">
          <label>주소</label>
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

      </div>

      <button
        className="customer-save-button"
        onClick={saveCustomer}
      >
        거래처 저장
      </button>

    </div>

  </div>
);
}

export default Customer;