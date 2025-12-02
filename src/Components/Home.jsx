import Navbar from "./Navbar";
import Ad from "./Ad";
import Product from "./Product";
import Categories from "./Categories";

const Home=()=>{
     const products = ["Product1", "Product2", "Product3", "Product4"];
    return(
        <>
        <div className="min-h-screen bg-[whitesmoke]">
        
         <Navbar/>
         <Ad/>
         <Categories/>
         <Product/>
         
         </div>
       
        </>
    )
}
export default Home ;