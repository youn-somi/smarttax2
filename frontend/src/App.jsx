import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Main from "./pages/Main";
import InvoiceList from "./pages/InvoiceList";
import Invoice from "./pages/Invoice";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import InvoiceDetail from "./pages/InvoiceDetail";
import CustomerList from "./pages/CustomerList";
import CustomerDetail from "./pages/CustomerDetail";
import CustomerEdit from "./pages/CustomerEdit";
import "./App.css";

function HomeButton() {
  const navigate = useNavigate();
  const location = useLocation();

  if (location.pathname === "/main") {
    return null;
  }

  return (
    <button
      className="home-button"
      onClick={() => navigate("/main")}
    >
      🏠
    </button>
  );
}

function App() {
  return (
    <>
      <HomeButton />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/main" element={<Main />} />

        <Route path="/invoice-list" element={<InvoiceList />} />

        <Route path="/invoice" element={<Invoice />} />
        <Route path="/invoice/:id" element={<InvoiceDetail />} />

        <Route path="/customers" element={<CustomerList />} />
        <Route path="/customers/:id" element={<CustomerDetail />} />
        <Route path="/customers/:id/edit" element={<CustomerEdit />} />
      </Routes>
    </>
  );
}

export default App;