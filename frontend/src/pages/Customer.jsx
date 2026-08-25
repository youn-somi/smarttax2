import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Customer.css";

function Customer() {
  const navigate = useNavigate();

  const [companyName, setCompanyName] = useState("");
  const [ceoName, setCeoName] = useState("");
  const [businessNumber, setBusinessNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  function findAddress() {
    new window.kakao.Postcode({
      oncomplete: function (data) {
        let selectedAddress = "";

        if (data.userSelectedType === "R") {
          selectedAddress = data.roadAddress;
        } else {
          selectedAddress = data.jibunAddress;
        }

        setAddress(selectedAddress);
      }
    }).open();
  }

  async function saveCustomer() {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:8080/api/customers",
        {
          companyName: companyName,
          ceoName: ceoName,
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
      console.log("거래처 등록 실패:", error);
      alert("거래처 등록 중 오류가 발생했습니다.");
    }
  }

  return (
    <div className="customer-page">

      <div className="customer-card">

        <p className="customer-small-title">
          SMART TAX
        </p>

        <h1>
          거래처 등록
        </h1>

        <p className="customer-subtitle">
          거래처 정보를 입력하세요.
        </p>

        <div className="customer-form">

          <div className="customer-group">
            <label>
              회사명
            </label>

            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>

          <div className="customer-group">
            <label>
              대표자명
            </label>

            <input
              type="text"
              value={ceoName}
              onChange={(e) => setCeoName(e.target.value)}
            />
          </div>

          <div className="customer-group">
            <label>
              사업자번호
            </label>

            <input
              type="text"
              value={businessNumber}
              onChange={(e) => setBusinessNumber(e.target.value)}
            />
          </div>

          <div className="customer-group">
            <label>
              전화번호
            </label>

            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="customer-group full">
            <label>
              주소
            </label>

            <div className="address-row">

              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />

              <button
                type="button"
                className="address-search-button"
                onClick={findAddress}
              >
                주소 찾기
              </button>

            </div>
          </div>

        </div>

        <div className="customer-actions">

          <button
            type="button"
            className="customer-save-button"
            onClick={saveCustomer}
          >
            등록하기
          </button>

          <button
            type="button"
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

export default Customer;