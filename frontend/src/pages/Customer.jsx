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
  const [businessNumberChecked, setBusinessNumberChecked] = useState(false)
  const [businessNumberMessage, setBusinessNumberMessage] =useState("")
    

  // 주소 찾기 함수 (window.kakao 및 window.daum 모두 지원 예외처리)
  function findAddress() {
    const Postcode = window.kakao?.Postcode || window.daum?.Postcode;

    if (!Postcode) {
      alert("주소 검색 스크립트가 아직 로드되지 않았습니다. 잠시 후 다시 시도해 주세요.");
      return;
    }

    new Postcode({
      oncomplete: function (data) {
        let selectedAddress =
          data.userSelectedType === "R" ? data.roadAddress : data.jibunAddress;

        setAddress(selectedAddress);
      },
    }).open();
  }

  //사업자번호 중복 확인
  async function checkBusinessNumber() {
    if(businessNumber === "") {
      alert("사업자번호를 먼저 입력해주세요.")
      return
    } try {
      const response =  await axios.get(
        "http://localhost:8080/api/customers/check-businessNumber?businessNumber=" + businessNumber)
      if(response.data === true ) {
        setBusinessNumberChecked(false)
        alert("이미 등록된 사업자번호입니다.")
      }  else {
        setBusinessNumberChecked(true)
        alert("사용 가능한 사업자번호입니다.")
      }
    }
       catch (error) {
        console.log("중복확인 실패:", error)
        alert("중복확인에 실패했습니다.")
      }
    }
    
  

  async function saveCustomer() {
    if(businessNumber === "" ) {
      alert("사업자번호를 입력해주세요.")
      return
    }
    if(!businessNumberChecked) {
      alert("사업자번호 중복확인을 해주세요.")
      return
    }
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:8080/api/customers",
        {
          companyName: companyName,
          ceoName: ceoName,
          businessNumber: businessNumber,
          phone: phone,
          address: address,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
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
        <p className="customer-small-title">SMART TAX</p>

        <h1>거래처 등록</h1>

        <p className="customer-subtitle">거래처 정보를 입력하세요.</p>

        <div className="customer-form">
          <div className="customer-group">
            <label>회사명</label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>

          <div className="customer-group">
            <label>대표자명</label>
            <input
              type="text"
              value={ceoName}
              onChange={(e) => setCeoName(e.target.value)}
            />
          </div>

          <div className="customer-group">
            <label>사업자번호</label>
             <div className="address-row">
            <input
              type="text"
              value={businessNumber}
              onChange={(e) => setBusinessNumber(e.target.value)}
            />
            <button
            type="button"
            className="address-search-button"
            onClick={checkBusinessNumber}
            > 
            중복확인
            </button>
          </div>
        </div>
          <div className="customer-group">
            <label>전화번호</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="customer-group full">
            <label>주소</label>
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