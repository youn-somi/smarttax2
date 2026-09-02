import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./Signup.css";

function Signup() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  
  // ★ 주소 state 추가
  const [address, setAddress] = useState("");

<<<<<<< HEAD
    // 아이디 입력값
    const [userId, setUserId] = useState("");

    // 비밀번호 입력값
    const [password, setPassword] = useState("");

    // 이름 입력값
    const [name, setName] = useState("");

    // 이메일 입력값
    const [email, setEmail] = useState("");

    // 아이디 중복확인 결과 메시지
    const [checkMessage, setCheckMessage] = useState("");

    // 페이지 이동 기능
    const navigate = useNavigate();

    const [address, setAddress] = useState("")

    //카카오 /다음 주소 검색함수
    const findAddress = () => {
    const Postcode = window.kakao?.Postcode || window.daum?.Postcode;

    if(!Postcode) {
        alert("주소 검색 스크립트를 불러오는 중입니다. 잠시 후 다시 시도해주세요 .")
        return
    }

    new Postcode({ 
        oncomplete: function (data) {
            let fullAddress = data.address
            let extraAddress= "";

         if (data.addressType === "R") {
            if (data.bname !== "") {
                extraAddress += data.bname;
            }
            if  (data.buildingName !== "") {
                extraAddress += extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
                    }
                    fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
                }

                setAddress(fullAddress); // ★ 주소 State 업데이트
            },
            
    }).open();
    }


    // 아이디 중복확인
    const checkUserId = async () => {

        // Spring에 아이디 중복확인 요청
        const response = await axios.get(
            "http://localhost:8080/api/users/check-userId",
            {
                params: {
                    userId: userId,
                },
            }
        );

        // 아이디가 이미 존재하는 경우
        if (response.data) {

            setCheckMessage("이미 존재하는 아이디입니다.");

        } else {

            // 아이디가 존재하지 않는 경우
            setCheckMessage("");
=======
  const [checkMessage, setCheckMessage] = useState("");
  const navigate = useNavigate();
  // 주소 검색 팝업 열기
const handleAddressSearch = () => {
  new window.daum.Postcode({
    oncomplete: (data) => {
      setAddress(data.roadAddress); // 선택한 도로명 주소를 address에 저장
    }
  }).open();
};
>>>>>>> 9d394975297a5c9c43ebf645daca86c7d230a39e

  // 아이디 중복확인
  const checkUserId = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/users/check-userId",
        {
          params: { userId: userId },
        }
      );

      if (response.data) {
        setCheckMessage("이미 존재하는 아이디입니다.");
      } else {
        setCheckMessage("사용 가능한 아이디입니다.");
      }
    } catch (error) {
      console.error("중복확인 에러:", error);
    }
  };

  // 회원가입
  const signup = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/users/signup",
        {
          userId: userId,
          password: password,
          name: name,
          email: email,
          address: address, // ★ 백엔드로 주소 전달
        }
      );

<<<<<<< HEAD
        // Spring 회원가입 API 호출
        const response = await axios.post(
            "http://localhost:8080/api/users/signup",
            {
                userId: userId,
                password: password,
                name: name,
                email: email,
                address: address
            }
        );
=======
      console.log(response.data);
      alert("회원가입이 완료되었습니다.");
      navigate("/");
    } catch (error) {
      console.error("회원가입 에러:", error);
      alert("회원가입 중 오류가 발생했습니다.");
    }
  };
>>>>>>> 9d394975297a5c9c43ebf645daca86c7d230a39e

  return (
    <div className="signup-page">
      <div className="signup-left">
        <img
          src="/images/login_left_illustration.png"
          alt="signup"
          className="signup-image"
        />
      </div>

      <div className="signup-right">
        <div className="signup-card">
          <h1 className="logo">SmartTax</h1>
          <p className="sub-title">회원가입</p>

          {/* 아이디 입력 */}
          <div className="input-box">
            <label>아이디</label>
            <div className="id-input-row">
              <input
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
              />
              <button type="button" onClick={checkUserId}>
                중복확인
              </button>
            </div>
            <p className="check-message">{checkMessage}</p>
          </div>

          {/* 비밀번호 입력 */}
          <div className="input-box">
            <label>비밀번호</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* 이름 입력 */}
          <div className="input-box">
            <label>이름</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* 이메일 입력 */}
          <div className="input-box">
            <label>이메일</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* ★ 주소 입력 추가 */}
         <div className="input-box">
  <label>주소</label>
  <div className="id-input-row">
    <input
      type="text"
      value={address}
      readOnly
      placeholder="주소 검색 버튼을 눌러주세요"
    />
    <button type="button" onClick={handleAddressSearch}>
      주소 검색
    </button>
  </div>
</div>

<<<<<<< HEAD
                    <p className="sub-title">
                        회원가입
                    </p>


                    {/* 아이디 입력 */}
                    <div className="input-box">

                        <label>
                            아이디
                        </label>

                        {/* 아이디 입력창 + 중복확인 버튼 */}
                        <div className="id-input-row">

                            <input
                                type="text"
                                value={userId}
                                onChange={(e) => setUserId(e.target.value)}
                            />

                            <button
                                type="button"
                                onClick={checkUserId}
                            >
                                중복확인
                            </button>

                        </div>

                        {/* 중복확인 결과 메시지 */}
                        <p className="check-message">
                            {checkMessage}
                        </p>

                    </div>


                    {/* 비밀번호 입력 */}
                    <div className="input-box">

                        <label>
                            비밀번호
                        </label>

                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                    </div>


                    {/* 이름 입력 */}
                    <div className="input-box">

                        <label>
                            이름
                        </label>

                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                    </div>


                    {/* 이메일 입력 */}
                    <div className="input-box">

                        <label>
                            이메일
                        </label>

                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                    </div>

                    <div className="input-box">
                        <label>
                            주소 
                        </label>
                        <div className="id-input-row">
                            <input
                            type="text"
                            value={address}
                            readOnly
                            placeholder="주소를 검색하세요"
                            />

                            <button
                            type="button"
                            onClick={findAddress}
                            >
                                주소검색
                            </button>
                        </div>
                    </div>


                    {/* 회원가입 버튼 */}
                    <button
                        className="signup-btn"
                        onClick={signup}
                    >
                        회원가입
                    </button>


                    {/* 로그인 페이지 이동 */}
                    <div className="login-link">

                        이미 계정이 있으신가요?

                        <Link to="/">
                            로그인
                        </Link>

                    </div>

                </div>

            </div>
=======
          {/* 회원가입 버튼 */}
          <button className="signup-btn" onClick={signup}>
            회원가입
          </button>
>>>>>>> 9d394975297a5c9c43ebf645daca86c7d230a39e

          {/* 로그인 페이지 이동 */}
          <div className="login-link">
            이미 계정이 있으신가요? <Link to="/">로그인</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;