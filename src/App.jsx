import "./App.css";
import Register from "./Components/Register";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./Components/LoginPage";
import Forgotpassword from "./Components/Forgotpassword";
import Home from "./Components/Home";
import Cart from "./Components/Cart";
import Productspage from "./Components/Productspage";
import Productdetail from "./Components/Productdetail";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/register" element={<Register />} />
        <Route path="/userlogin" element={<LoginPage />} />
        <Route path="/userlogin/forgotpassword" element={<Forgotpassword />} />
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/Productspage" element={<Productspage/>}/>
        <Route path="/Productdetail/:productId" element={<Productdetail />} />
      </Routes>
    </>
  );
}

export default App;
