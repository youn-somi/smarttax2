import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function CustomerDetail() {
  const [customer, setCustomer] = useState(null);

  const { id } = useParams();

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
        </div>
      )}
    </div>
  );
}

export default CustomerDetail;