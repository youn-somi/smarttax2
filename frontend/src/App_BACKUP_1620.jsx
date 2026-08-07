import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Main from "./pages/Main";
import InvoiceList from "./pages/InvoiceList";
import Invoice from "./pages/Invoice";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/main" element={<Main />} />
<<<<<<< HEAD
      <Route path="/invoice-list" element={<InvoiceList />} />
      <Route path="/invoice" element={<Invoice />} />
=======
        <Route
            path="/invoice-list"
            element={<InvoiceList />}
        />
        <Route path="/invoice" element={<Invoice />} />
        <Route path="/invoice/:id" element={<Invoice />} />
        
>>>>>>> main
    </Routes>
  );
}

export default App;