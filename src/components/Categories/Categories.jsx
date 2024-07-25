import React,{useEffect,useState} from "react"
import Style from "./Categories.module.css";
import useProducts from "../../Hooks/useProducts";
import axios from "axios";
import { Link } from "react-router-dom";


export default function Categories() {
const [allCategories, setAllCategories] = useState([])
    function getAllCategories(){
      return axios.get("https://ecommerce.routemisr.com/api/v1/categories")
      .then(({data})=>{
        // console.log(data.data);
        setAllCategories(data.data)
      })
      .catch((error)=>{})
      
    }
    useEffect(()=>{
      getAllCategories()
    }, [])
    let {data , isError , error , isLoading , isFetching } = useProducts()
    // console.log(x);
  return <>
  <div className="row my-8">
    {allCategories.map((product)=><div key={product._id} className="w-1/5 px-5">
    <div className="product py-4">
      <Link to={`filtercategory`}>
      {/* <h1>OufaCategory</h1>/ */}
      <img src={product.image} alt={product.name} />
      <span className="font-medium text-center mt-2 text-green-600">{product.name}</span>
      </Link>
    </div>
    </div>)}
  </div>
  </>
}
