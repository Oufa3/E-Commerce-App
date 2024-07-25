import React,{useContext, useEffect,useState} from "react"
import Style from "./ChekOut.module.css";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import * as Yup from "yup"



export default function CheckOut() {
  let formik = useFormik({
    initialValues:{
      details:'',
      phone:'',
      city:'',
    },
    onSubmit: ()=> handleCheckOut("6683a7a2ed0dc0016c6f94d6" , "http://localhost:5173")
  })
  const [apiError , setapiError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  let { CheckOut }  = useContext(CartContext)

  async function handleCheckOut( cartId , url ) {
    setIsLoading(true)
   let {data} = await CheckOut( cartId , url , formik.values )
   console.log(data);
   if (data.status === "success") 
    {
    window.location.href = data.session.url    
   }
   setIsLoading(false)
  }


    const [counter, setCounter] = useState(0)
    useEffect(()=>{}, [])
  return <>
  <div className="py-8 mx-auto max-w-lg">



  <h2 className="text-3xl font-bold mb-6 text-green-600">CheckOut Now</h2>
  <form onSubmit={formik.handleSubmit}>


  <div className="relative z-0 w-full mb-5 group">
      <input id="details" value={formik.values.details} onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" name="details"  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
      <label htmlFor="details" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Details Address :</label>
  </div>



  <div className="relative z-0 w-full mb-5 group">
      <input id="phone" value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} type="tel" name="phone"  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
      <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Phone :</label>
  </div>

  <div className="relative z-0 w-full mb-5 group">
      <input id="city" value={formik.values.city} onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" name="city"  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
      <label htmlFor="city" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your City :</label>
  </div>



  <div className="flex items-center ">
  <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
    {isLoading?<i className="fas fa-spinner fa-spin"></i>:'Pay Now'}
    </button>
  </div>
  </form>
  </div>
  </>
}
