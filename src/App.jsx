import './App.css'
import Register from './Components/Register'
import {Routes,Route } from 'react-router-dom'
import LoginPage from './Components/LoginPage'


function App() {


  return (
    <>
   
            <Routes>
                <Route path="/" element={<Register />} />
                <Route path="/userlogin" element={<LoginPage />} />
            </Routes>
       
 
     
    </>
  )
}

export default App
