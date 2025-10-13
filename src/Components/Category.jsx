import Product from "./Product"
const categories=["category1","category2","category3","category4"]

const Category=()=>{
    return(
        <>
        <Product text="Categories" item={categories} />

        </>
    )
}
export default Category