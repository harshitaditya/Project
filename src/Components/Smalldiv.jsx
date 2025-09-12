import { useState } from "react"
import {useNavigate} from "react-router-dom"

const Smalldiv=({text})=>{
    const [hover,sethover]=useState(false);
   const navigate = useNavigate();
    const handleclick=()=>{
        if(text==="Login"){
            navigate("/userlogin")
        }
        else{
            navigate("/")
        }

    }
    return(
        
        <>
         <button style={ { 
                    margin: "10px",
                    borderRadius: "15px", 
                    width: "200px",
                    height: "60px",
                    marginRight: "25px",
                    display: 'flex',
                    alignItems: "center",
                    justifyContent: "center",
                    cursor:"pointer",
                    backgroundColor: hover ? "#E8F9FF" : "transparent",
                    border: hover ? "none" : "1px solid #89CFF3",
                    transition: "all 0.3s ease" 
                    }}
                    onMouseEnter={()=>sethover(true)} onMouseLeave={()=>sethover(false)}
                    onClick={handleclick}
                     >
                <h3  className="text-2xl m-0 p-0 font-semibold text-[rgb(51,150,211)] items-center "> {text}   </h3> </button>

              

               
           
        </>
    )
}
export default Smalldiv