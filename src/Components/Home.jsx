import Navbar from "./Navbar";
import Ad from "./Ad";
import Category from "./Category";
import Product from "./Product";

const Home=()=>{
     const products = ["Product1", "Product2", "Product3", "Product4"];
    return(
        <>
        <div className="min-h-screen bg-[whitesmoke]">
        
         <Navbar/>
         <Ad/>
         <Category/>
         <Product text="All Products" item={products}/>
         
         </div>
       
        </>
    )
}
export default Home ;