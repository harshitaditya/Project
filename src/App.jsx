import "./App.css";
import Register from "./Components/Register";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./Components/LoginPage";
import Forgotpassword from "./Components/Forgotpassword";

function App() {
  return (
    <>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/userlogin" element={<LoginPage />} />
        <Route path="/userlogin/forgotpassword" element={<Forgotpassword />} />
      </Routes>
    </>
  );
}

export default App;
