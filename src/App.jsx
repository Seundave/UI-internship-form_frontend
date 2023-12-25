import InternForm from "./component/InternForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./component/pages/Login/LoginPage";
import Dashboard from "./component/pages/Dashboard/Dashboard";


function App() {
  return (
    <Router>
      <>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<InternForm />} />
          <Route path="/intern" element={<Dashboard />} />
        </Routes>

        <ToastContainer />
      </>
    </Router>
  );
}

export default App;
