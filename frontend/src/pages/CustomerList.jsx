import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function CustomerList() {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:8080/api/customers", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setCustomers(data);
      });
  }, []);

  return (
    <div>
      <h1>고객 목록</h1>

      {customers.map((customer) => (
        <div
          key={customer.id}
          onClick={() => navigate(`/customers/${customer.id}`)}
        >
          {customer.id}
          {customer.companyName}
          {customer.conName}
          {customer.businessNumber}
          {customer.phone}
          {customer.address}
        </div>
      ))}
    </div>
  );
}

export default CustomerList;