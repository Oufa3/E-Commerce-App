import React,{useEffect,useState} from "react"
import Style from "./Brands.module.css";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Brands() {
    const [recentBrandsProduct, setRecentBrandsProduct] = useState([])
    
    function allBrands(){
     return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
     .then(({data})=> {
      console.log(data.data);
      setRecentBrandsProduct(data.data)
     })
     .catch((error)=> {
      console.log(error);
})
    }
    useEffect(()=>{
      allBrands()
    }, [])
  return <>
  <div className="row my-8">
    {recentBrandsProduct.map((product)=>
      <div key={product._id} className="w-1/6 px-4">
          <div className="product py-4">
            <Link to={`filterbrands/${product._id}`}>
            <img className="w-full" src={product.image} alt={product.name} />
            <span className="block  font-medium text-center mt-2 text-green-600">{product.name}</span>
            </Link>
          </div>
      </div>
      )}
  </div>
  </>
}
