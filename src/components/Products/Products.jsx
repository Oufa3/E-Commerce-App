import React,{useContext, useEffect,useState} from "react"
import Style from "./Products.module.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ClimbingBoxLoader } from "react-spinners";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";



export default function RecentProducts() {
  const [currentProdcutId, setCurrentProdcutId] = useState(0)
  const [loding, setisLoding] = useState(false)
  let { addProductToCart , setCart} = useContext(CartContext)

  async function addProduct(productId){
    setCurrentProdcutId(productId)
    setisLoding(true)
    let  response = await addProductToCart(productId);
    if (response.data.status == "success")
    {
      console.log(response.data);
      setCart(response.data)
      setisLoding(false)
     toast.success(response.data.message ,{
      duration:1500 
     }) 
    }else
    {
      setisLoding(false)
      toast.error(response.data.message ,{
        duration:1500
      })
    }
    console.log(response);
  }

  function getRecent(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
  }
  let {data , isError , error , isLoading , isFetching } = useQuery({
    queryKey:["recentProducts"],
    queryFn:getRecent,
    // refetchInterval:3000,
    // refetchIntervalInBackground:true
    // staleTime:8000,
    // retry:6,
    // retryDelay:5000
    // refetchOnWindowFocus:true,
    // gcTime:4000
    select:(data)=> data.data.data
  })
  
  if (isLoading){
    return<div className="">
      <div className="py-96 w-full h-full flex justify-center items-center">
        <ClimbingBoxLoader color='green'/>
      </div>
      
    </div>
  }

  return <> 
  <div className="row">
  {data.map((product) => <div key={product.id} className="w-1/6 px-4">
      <div className="product py-4">
        <Link to={`/productdetails/ /${product.category.name}`}>
        <img className="w-full" src={product.imageCover} alt="" />
        <span className="block font-sans mt-2 text-green-500">{product.category.name}</span>
        <h3 className="text-lg font-normal text-gray-800 mb-4">{product.title.split(' ').slice(0,2).join(" ")}</h3>
        <div className="flex justify-between">
          <span className="">{product.price} EGP</span>
          <span className="">{product.ratingAverage} <i className="fas fa-star text-yellow-400"></i></span>
        </div>
        </Link>
        <button onClick={()=>addProduct(product.id)} className="btn"> 
          {currentProdcutId === product.id && loding?<i className="fas fa-spinner fa-spin"></i>:"Add To Cart"}
        </button>

      </div>
    </div>)}
    
  </div>
   </>
}
