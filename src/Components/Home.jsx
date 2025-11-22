import Navbar from "./Navbar";
import Ad from "./Ad";
import Product from "./Product";

const Home=()=>{
     const products = ["Product1", "Product2", "Product3", "Product4"];
    return(
        <>
        <div className="min-h-screen bg-[whitesmoke]">
        
         <Navbar/>
         <Ad/>
         <Product/>
         
         </div>
       
        </>
    )
}
export default Home ;