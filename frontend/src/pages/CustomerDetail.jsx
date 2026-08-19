import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";


function CustomerDetail() {
  const [customer, setCustomer] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`http://localhost:8080/api/customers/${id}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token
      }
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setCustomer(data);
      });
  }, [id]);

  return (
    <div>
      <h1>고객 상세</h1>

      {customer && (
        <div>
          {customer.companyName}
          {customer.conName}
          {customer.businessNumber}
          {customer.phone}
          {customer.address}

          <button
            onClick={() => navigate(`/customers/${customer.id}/edit`)}
          >
            수정하기
          </button>
        </div>
      )}
    </div>
  );
}

export default CustomerDetail;